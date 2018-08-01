package kr.ap.comm.config;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Order(Integer.MIN_VALUE)
public class ExcludeSessionRepositoryFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
									FilterChain filterChain) throws ServletException, IOException {
		if (isStaticResources(httpRequest)) {
			httpRequest.setAttribute("org.springframework.session.web.http.SessionRepositoryFilter.FILTERED", Boolean.TRUE);
		}
		filterChain.doFilter(httpRequest, httpResponse);
	}

	private boolean isStaticResources(HttpServletRequest request) {
		String url = request.getRequestURL().toString();
		String[] staticResources = {".js", ".css", ".json", ".eot", ".otf", "woff", ".png", ".jpg", ".gif", ".ico"};
		for (String s: staticResources) {
			if (url.endsWith(s)) {
				return true;
			}
		}
		return false;
	}
}