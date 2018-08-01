package kr.ap.comm.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.Serializable;
import java.security.InvalidParameterException;
import java.util.Date;

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
    
}
