package kr.ap.comm.util;

import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;

public class WebUtils {

	public static final String[] PROXY_HEADERS = {
		"X-Forwarded-For"
		, "Proxy-Client-IP"
		, "WL-Proxy-Client-IP"
		, "HTTP_CLIENT_IP"
		, "HTTP_X_FORWARDED_FOR"
	};

	/**
	 * Get client IP
	 *
	 * @param request
	 * @return ip address
	 */
	public static String getClientIP(HttpServletRequest request) {
		String connectIP = null;
		for (String header : PROXY_HEADERS) {
			connectIP = request.getHeader(header);
			if (!StringUtils.hasText(connectIP)) {
				continue;
			}
			if (connectIP.contains(",")) {
				String[] splitted = connectIP.split(",");
				if (splitted.length > 0) {
					String split = splitted[0];
					if (StringUtils.hasText(split)) {
						connectIP = split.trim();
					}
				}
			}
			break;
		}

		if (StringUtils.isEmpty(connectIP)) {
			connectIP = request.getRemoteAddr();
		}

		if (connectIP != null && connectIP.length() > 23) { // IPv6
			connectIP = connectIP.substring(0, 23);
		}
		return connectIP;
	}
}
