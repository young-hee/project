package kr.ap.comm.util;

import kr.ap.comm.cart.CartSession;
import kr.ap.comm.member.vo.BeautyPointSummary;
import kr.ap.comm.member.vo.CushionPointSummary;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.order.OrderSession;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.support.tagging.TaggingInfo;
import net.g1project.ecp.api.client.sales.PointApi;
import net.g1project.ecp.api.model.sales.point.BeautyPoint;
import net.g1project.ecp.api.model.sales.point.CushionPoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.Serializable;
import java.security.InvalidParameterException;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * Helper class for session generation
 *
 * @author nes@g1project.net
 * @since 1.0
 **/

public class SessionUtils {
	private static Logger logger = LoggerFactory.getLogger(SessionUtils.class);
	private final static String BLSESSION_LOCK_OBJECT = "BLSESSION_LOCK_OBJECT";

	/**
	 * Determine the session id of the given request, if any.
	 *
	 * @param request current HTTP request
	 * @return the session id, or {@code null} if none
	 */
	public static String getSessionId(HttpServletRequest request) {
		if (request == null) {
			throw new InvalidParameterException("Request must not be null");
		}
		HttpSession session = request.getSession(false);
		return (session != null ? session.getId() : null);
	}

	/**
	 * Invalidates this session then unbinds any objects bound to it.
	 *
	 * @param request current HTTP request
	 */
	public static void invalidate(HttpServletRequest request) {
		if (request == null) {
			throw new InvalidParameterException("Request must not be null");
		}
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate();
			if (logger.isDebugEnabled()) {
				logger.debug("Invalidates session");
			}
		}
	}

	/**
	 * Check the given request for a session attribute of the given name.
	 * Returns null if there is no session or if the session has no such attribute.
	 * Does not create a new session if none has existed before!
	 *
	 * @param request current HTTP request
	 * @param name    the name of the session attribute
	 * @return the value of the session attribute, or {@code null} if not found
	 */
	public static Object getAttribute(HttpServletRequest request, String name) {
		if (request == null) {
			throw new InvalidParameterException("Request must not be null");
		}
		HttpSession session = request.getSession(false);
		return (session != null ? session.getAttribute(name) : null);
	}

	/**
	 * Check the given request for a session attribute of the given name.
	 * Throws an exception if there is no session or if the session has no such
	 * attribute. Does not create a new session if none has existed before!
	 *
	 * @param request current HTTP request
	 * @param name    the name of the session attribute
	 * @return the value of the session attribute, or {@code null} if not found
	 * @throws InvalidParameterException if the session attribute could not be found
	 */
	public static Object getRequiredAttribute(HttpServletRequest request, String name)
		throws InvalidParameterException {

		Object attr = getAttribute(request, name);
		if (attr == null) {
			throw new InvalidParameterException("No session attribute '" + name + "' found");
		}
		return attr;
	}

	/**
	 * Set the session attribute with the given name to the given value.
	 * Removes the session attribute if value is null, if a session existed at all.
	 * Does not create a new session if not necessary!
	 *
	 * @param request current HTTP request
	 * @param name    the name of the session attribute
	 * @param value   the value of the session attribute
	 */
	public static void setAttribute(HttpServletRequest request, String name, Object value) {
		if (request == null) {
			throw new InvalidParameterException("Request must not be null");
		}
		if (value != null) {
			request.getSession().setAttribute(name, value);
			if (logger.isDebugEnabled()) {
				logger.debug("Set session with name [{}]", name);
			}
		} else {
			removeAttribute(request, name);
		}
	}

	/**
	 * Remove the session attribute with the given name
	 *
	 * @param request current HTTP request
	 * @param name    the name of the session attribute
	 */
	public static void removeAttribute(HttpServletRequest request, String name) {
		if (request == null) {
			throw new InvalidParameterException("Request must not be null");
		}
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.removeAttribute(name);
			if (logger.isDebugEnabled()) {
				logger.debug("Remove session with name [{}]", name);
			}
		}
	}

	/**
	 * Get the specified session attribute, creating and setting a new attribute if
	 * no existing found. The given class needs to have a public no-arg constructor.
	 * Useful for on-demand state objects in a web tier, like shopping carts.
	 *
	 * @param request current HTTP request
	 * @param name    the name of the session attribute
	 * @param clazz   the class to instantiate for a new attribute
	 * @return the value of the session attribute, newly created if not found
	 * @throws InvalidParameterException if the session attribute could not be instantiated
	 */
	public static Object getOrCreateAttribute(HttpServletRequest request, String name, Class<?> clazz)
		throws InvalidParameterException {

		if (request == null) {
			throw new InvalidParameterException("Request must not be null");
		}

		if (StringUtils.isEmpty(name)) {
			throw new InvalidParameterException("Session key name must not be null");
		}

		if (clazz == null) {
			throw new InvalidParameterException("Session attribute object class must not be null");
		}

		HttpSession session = request.getSession();

		Object sessionObject = session.getAttribute(name);

		if (sessionObject == null) {
			try {
				sessionObject = clazz.newInstance();
			} catch (InstantiationException ex) {
				throw new InvalidParameterException("Could not instantiate class [" + clazz.getName()
					+ "] for session attribute '" + name + "': " + ex.getMessage());
			} catch (IllegalAccessException ex) {
				throw new InvalidParameterException("Could not access default constructor of class ["
					+ clazz.getName() + "] for session attribute '" + name + "': " + ex.getMessage());
			}

			session.setAttribute(name, sessionObject);
		}
		return sessionObject;
	}

	/**
	 * Get object that alternate of session for using synchronized(session){}.
	 *
	 * @param request current HTTP request
	 * @return lock object
	 */
	public static Object getLockObject(HttpServletRequest request) {
		synchronized (request.getSession()) {
			return getOrCreateAttribute(request, BLSESSION_LOCK_OBJECT, LockObject.class);
		}
	}

	/**
	 * LockObject
	 * <p>
	 * session lock object
	 * </p>
	 *
	 * @author j.jey@g1project.net
	 */
	private static class LockObject implements Serializable {
		private static final long serialVersionUID = 4907942363689828017L;

		private final Date createdTime;

		@SuppressWarnings("unused")
		LockObject() {
			this.createdTime = new Date();
		}

		@SuppressWarnings("unused")
		private Date getCreatedTime() {
			return this.createdTime;
		}
	}

	/**
	 * {@code HttpSession}의 속성을 추출한다.
	 *
	 * @param session Http Session
	 * @return 추출된 {@code HttpSession}의 속성
	 */
	public static Map<String, Object> extractSessionAttributes(final HttpSession session) {
		final Map<String, Object> extracted = new HashMap<>();
		final Enumeration<String> names = session.getAttributeNames();
		while (names.hasMoreElements()) {
			final String key = names.nextElement();
			extracted.put(key, session.getAttribute(key));
		}
		return extracted;
	}

	/**
	 * Session Fixation Protection을 적용한다.
	 *
	 * @param request Http Request
	 */
	public static void applyFixationProtection(final HttpServletRequest request) {
		final HttpSession session = request.getSession(false);
		if (session != null) {
			final Map<String, Object> transfer = extractSessionAttributes(session);
			session.invalidate();
			//새로운 세션 생성
			final HttpSession newSession = request.getSession(true);
			transfer.forEach((key, value) -> newSession.setAttribute(key, value));
		}
	}

	public static MemberSession getMemberSession() {
		final HttpServletRequest request = getRequest();
		return getMemberSession(request);
	}

	public static MemberSession getMemberSession(HttpServletRequest request) {
		return getMemberSession(request.getSession());
	}

	public static MemberSession getMemberSession(final HttpSession session) {
		synchronized (WebUtils.getSessionMutex(session)) {
			MemberSession memberSession = (MemberSession) session.getAttribute(SessionKey.LOGIN_USER);
			if (ObjectUtils.isEmpty(memberSession)) {
				memberSession = new MemberSession();
				session.setAttribute(SessionKey.LOGIN_USER, memberSession);
			}
			return memberSession;
		}
	}

	public static boolean isMemberLoggedIn(final HttpServletRequest request) {
		return getMemberSession(request).getMember_sn() != null;
	}

	public static CartSession getCartSession() {
		final HttpServletRequest request = getRequest();
		return getCartSession(request);
	}

	private static HttpServletRequest getRequest() {
		return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
	}

	public static CartSession getCartSession(HttpServletRequest request) {
		final HttpSession session = request.getSession();
		synchronized (WebUtils.getSessionMutex(session)) {
			CartSession cartSession = (CartSession) WebUtils.getSessionAttribute(request, SessionKey.CART);
			if (ObjectUtils.isEmpty(cartSession)) {
				cartSession = new CartSession();
				WebUtils.setSessionAttribute(request, SessionKey.CART, cartSession);
			}
			return cartSession;
		}
	}

	public static OrderSession getOrderSession() {
		return getOrderSession(getRequest());
	}

	public static OrderSession getOrderSession(HttpServletRequest request) {
		final HttpSession session = request.getSession();
		synchronized (WebUtils.getSessionMutex(session)) {
			OrderSession orderSession = (OrderSession) WebUtils.getSessionAttribute(request, SessionKey.ORDER);
			if (ObjectUtils.isEmpty(orderSession)) {
				orderSession = new OrderSession();
				WebUtils.setSessionAttribute(request, SessionKey.ORDER, orderSession);
			}
			return orderSession;
		}
	}

	public static String getMallId() {
		HttpServletRequest request = getRequest();
		return (String) WebUtils.getSessionAttribute(request, SessionKey.MALL_ID);
	}

	public static BeautyPointSummary getBeautyPoint(final HttpServletRequest request, final PointApi pointApi) {
		return getBeautyPoint(request.getSession(false), pointApi);
	}

	public static BeautyPointSummary getBeautyPoint(final HttpSession session, final PointApi pointApi) {
		if (session == null) {
			throw new IllegalStateException();
		}
		BeautyPointSummary beautyPoint;
		synchronized (WebUtils.getSessionMutex(session)) {
			beautyPoint = (BeautyPointSummary) session.getAttribute(SessionKey.BEAUTY_POINT);
		}

		if (beautyPoint == null) {
			beautyPoint = getBeautyPointInternal(session, pointApi);
		}
		return beautyPoint;
	}

	public static BeautyPointSummary refreshBeautyPoint(final HttpServletRequest request, final PointApi pointApi) {
		final HttpSession session = request.getSession(false);
		if (session == null) {
			throw new IllegalStateException();
		}
		final BeautyPointSummary beautyPoint = getBeautyPointInternal(session, pointApi);
		synchronized (WebUtils.getSessionMutex(session)) {
			session.setAttribute(SessionKey.BEAUTY_POINT, beautyPoint);
		}
		return beautyPoint;
	}

	private static BeautyPointSummary getBeautyPointInternal(final HttpSession session, final PointApi pointApi) {
		final MemberSession memberSession = getMemberSession(session);
		if (!memberSession.isMember()) {
			throw new IllegalStateException();
		}
		final BeautyPoint retrieved = pointApi.getBeautyPoint(memberSession.getMember_sn());
		BeautyPointSummary beautyPoint = new BeautyPointSummary(retrieved.getRemainBeautyPoint());
		synchronized (WebUtils.getSessionMutex(session)) {
			session.setAttribute(SessionKey.BEAUTY_POINT, beautyPoint);
		}
		return beautyPoint;
	}

	public static void clearBeautyPoint(final HttpServletRequest request) {
		final HttpSession session = request.getSession(false);
		if (session != null) {
			synchronized (WebUtils.getSessionMutex(session)) {
				session.removeAttribute(SessionKey.BEAUTY_POINT);
			}
		}
	}

	public static CushionPointSummary getCushionPoint(final HttpServletRequest request, final PointApi pointApi) {
		return getCushionPoint(request.getSession(false), pointApi);
	}

	public static CushionPointSummary getCushionPoint(final HttpSession session, final PointApi pointApi) {
		if (session == null) {
			throw new IllegalStateException();
		}
		CushionPointSummary cushionPoint;
		synchronized (WebUtils.getSessionMutex(session)) {
			cushionPoint = (CushionPointSummary) session.getAttribute(SessionKey.CUSHION_POINT);
		}

		if (cushionPoint == null) {
			cushionPoint = getCushionPointInternal(session, pointApi);
		}
		return cushionPoint;
	}

	public static CushionPointSummary refreshCushionPoint(final HttpServletRequest request, final PointApi pointApi) {
		final HttpSession session = request.getSession(false);
		if (session == null) {
			throw new IllegalStateException();
		}
		final CushionPointSummary cushionPoint = getCushionPointInternal(session, pointApi);
		synchronized (WebUtils.getSessionMutex(session)) {
			session.setAttribute(SessionKey.CUSHION_POINT, cushionPoint);
		}
		return cushionPoint;
	}

	private static CushionPointSummary getCushionPointInternal(final HttpSession session, final PointApi pointApi) {
		final MemberSession memberSession = getMemberSession(session);
		if (!memberSession.isMember()) {
			throw new IllegalStateException();
		}
		final CushionPoint retrieved = pointApi.getCushionPoint(memberSession.getMember_sn());
		final CushionPointSummary cushionPoint = new CushionPointSummary(retrieved.getRemainCushionPoint());
		synchronized (WebUtils.getSessionMutex(session)) {
			session.setAttribute(SessionKey.CUSHION_POINT, cushionPoint);
		}
		return cushionPoint;
	}

	public static void clearCushionPoint(final HttpServletRequest request) {
		final HttpSession session = request.getSession(false);
		if (session != null) {
			synchronized (WebUtils.getSessionMutex(session)) {
				session.removeAttribute(SessionKey.CUSHION_POINT);
			}
		}
	}

	public static TaggingInfo getTaggingInfo() {
		return getTaggingInfo(getRequest());
	}

	public static TaggingInfo getTaggingInfo(HttpServletRequest request) {
		final HttpSession session = request.getSession();
		synchronized (WebUtils.getSessionMutex(session)) {
			TaggingInfo taggingInfo = (TaggingInfo) WebUtils.getSessionAttribute(request, SessionKey.TAGGING_INFO);
			if (ObjectUtils.isEmpty(taggingInfo)) {
				taggingInfo = new TaggingInfo();
				WebUtils.setSessionAttribute(request, SessionKey.TAGGING_INFO, taggingInfo);
			}
			return taggingInfo;
		}
	}

	public static void setTaggingInfo(HttpServletRequest request, TaggingInfo taggingInfo) {
		HttpSession session = request.getSession();
		synchronized (WebUtils.getSessionMutex(session)) {
			session.setAttribute(SessionKey.TAGGING_INFO, taggingInfo);
		}
	}
}
