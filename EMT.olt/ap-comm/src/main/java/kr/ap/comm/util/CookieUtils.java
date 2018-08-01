/*
 * This software is the confidential and proprietary information of UZEN
 * Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.comm.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Helper class for cookie generation
 *
 * @author nes@g1project.net
 * @see #createCookie
 * @see #addCookie(HttpServletResponse, Cookie)
 * @see #removeCooke(HttpServletResponse, Cookie)
 * @since 1.0
 */
public class CookieUtils {
    private static Logger logger = LoggerFactory.getLogger(CookieUtils.class);
    private static final String DEFAULT_COOKIE_PATH = "/";

    /**
     * Create a cookie with the given value, using the cookie descriptor
     *
     * @param cookieName  the name of the cookie to crate
     * @param cookieValue the value of the cookie to crate
     * @return the cookie
     */
    public static Cookie createCookie(String cookieName, String cookieValue) {
        Cookie cookie;
		try {
			cookie = new Cookie(cookieName, EncryptionUtils.encAES(cookieValue));
	        return cookie;
		} catch (Exception e) {
            throw new RuntimeException("encryption error");
		}
    }

    /**
     * Create a cookie with the given value, using the cookie descriptor
     *
     * @param cookieName   the name of the cookie to crate
     * @param cookieValue  the value of the cookie to crate
     * @param cookieMaxAge the max age of the cookie to crate
     * @return the cookie
     * @see #createCookie
     */
    public static Cookie createCookie(String cookieName, String cookieValue, Integer cookieMaxAge) {
        Cookie cookie = createCookie(cookieName, cookieValue);
        cookie.setMaxAge(cookieMaxAge);
        return cookie;
    }

    /**
     * Add a cookie with the given cookie to the response,
     * <p>Delegates to {@link #createCookie} for cookie creation.
     *
     * @param response the HTTP response to crate
     * @param cookie   the cookie to crate
     * @see #createCookie
     */
    public static void addCookie(HttpServletResponse response, Cookie cookie) {
        if (response == null) {
            throw new RuntimeException("HttpServletResponse must not be null");
        }
        if (cookie == null) {
            throw new RuntimeException("Cookie must not be null");
        }
        if (cookie.getPath() == null || cookie.getPath().isEmpty()) {
            cookie.setPath(DEFAULT_COOKIE_PATH);
        }
        response.addCookie(cookie);
        if (logger.isDebugEnabled()) {
            logger.debug("Added cookie with name [{}] and value [{}]", cookie.getName(), cookie.getValue());
        }
    }

    /**
     * Add a cookie with the given name & value to the response,
     *
     * @param response    the HTTP response to crate
     * @param cookieName  the name of the cookie to crate
     * @param cookieValue the value of the cookie to crate
     * @see #createCookie(String, String)
     * @see #addCookie(HttpServletResponse, Cookie)
     */
    public static void addCookie(HttpServletResponse response, String cookieName, String cookieValue) {
        addCookie(response, createCookie(cookieName, cookieValue));
    }

    /**
     * Add a cookie with the given name, value & max age to the response,
     *
     * @param response     the HTTP response to crate
     * @param cookieName   the name of the cookie to crate
     * @param cookieValue  the value of the cookie to crate
     * @param cookieMaxAge the max age of the cookie to crate
     * @see #createCookie(String, String)
     * @see #addCookie(HttpServletResponse, Cookie)
     */
    public static void addCookie(HttpServletResponse response, String cookieName, String cookieValue, Integer cookieMaxAge) {
        addCookie(response, createCookie(cookieName, cookieValue, cookieMaxAge));
    }

    /**
     * Remove the cookie from the response.
     * Will generate a cookie with empty value and max age 0.
     *
     * @param response the HTTP response to remove the cookie
     * @param cookie   remove the cookie
     */
    public static void removeCooke(HttpServletResponse response, Cookie cookie) {
        if (response == null) {
            throw new RuntimeException("HttpServletResponse must not be null");
        }
        if (cookie == null) {
            throw new RuntimeException("Cookie must not be null");
        }
        cookie.setValue("");
        cookie.setMaxAge(0);
        if (cookie.getPath() == null || cookie.getPath().isEmpty()) {
            cookie.setPath(DEFAULT_COOKIE_PATH);
        }
        response.addCookie(cookie);
        if (logger.isDebugEnabled()) {
            logger.debug("Removed cookie with name [{}]", cookie.getName());
        }
    }

    /**
     * Remove the cookies from the response.
     *
     * @param request     the HTTP request
     * @param response    the HTTP response
     * @param cookieNames remove the name of the cookies
     */
    public static void removeCookie(HttpServletRequest request, HttpServletResponse response, String... cookieNames) {
        if (request == null) {
            throw new RuntimeException("HttpServletRequest must not be null");
        }
        if (response == null) {
            throw new RuntimeException("HttpServletResponse must not be null");
        }
        Cookie cookies[] = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                String cookieName = cookie.getName();
                for (String checkCookieName : cookieNames) {
                    if (checkCookieName.equals(cookieName)) {
                        removeCooke(response, cookie);
                    }
                }
            }
        }
    }

    /**
     * Return cookies
     *
     * @param request    the HTTP request
     * @param cookieName the name of the cookie
     * @return the cookie
     */
    public static Cookie getCookie(HttpServletRequest request, String cookieName) {
        if (request == null) {
            throw new RuntimeException("HttpServletRequest must not be null");
        }
        Cookie cookies[] = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookieName.equals(cookie.getName())) {
                	try {
						cookie.setValue(EncryptionUtils.decAES(cookie.getValue()));
					} catch (Exception e) {
					}
                    return cookie;
                }
            }
        }
        return null;
    }

    /**
     * Return the given value for cookies
     *
     * @param request    the HTTP request
     * @param cookieName the name of the cookie
     * @return the given value for cookies
     */
    public static String getCookieValue(HttpServletRequest request, String cookieName) {
        Cookie cookie = getCookie(request, cookieName);
        if (cookie != null) {
            try {
				return EncryptionUtils.decAES(cookie.getValue());
			} catch (Exception e) {
	            throw new RuntimeException("decryption error");
			}
        }
        return null;
    }

}
