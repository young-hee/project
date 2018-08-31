package kr.ap.comm.config.filter;

import kr.ap.comm.support.constants.SessionKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.util.Assert;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class MallIdFilter extends OncePerRequestFilter {

	@Autowired
	private Environment env;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

		try {
			WebUtils.getRequiredSessionAttribute(request, SessionKey.MALL_ID);
		} catch (IllegalStateException e) {
			// needs set mallId to session.
			String mallId = env.getProperty("platform.frontend.mall-id");
			Assert.notNull(mallId, "Please check property value 'platform.frontend.mall-id'.");
			WebUtils.setSessionAttribute(request, SessionKey.MALL_ID, mallId);
		}

		filterChain.doFilter(request, response);

	}
}
