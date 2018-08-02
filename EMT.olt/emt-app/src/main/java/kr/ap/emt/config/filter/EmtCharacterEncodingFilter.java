package kr.ap.emt.config.filter;

import org.springframework.boot.web.filter.OrderedCharacterEncodingFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class EmtCharacterEncodingFilter extends OrderedCharacterEncodingFilter {

	private List<String> skipEncodingUris = Arrays.asList("/order/orderStore");

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

		if (!skipEncodingUris.contains(request.getRequestURI())) {
			String encoding = getEncoding();
			if (encoding != null) {
				if (isForceRequestEncoding() || request.getCharacterEncoding() == null) {
					request.setCharacterEncoding(encoding);
				}
				if (isForceResponseEncoding()) {
					response.setCharacterEncoding(encoding);
				}
			}
		}

		filterChain.doFilter(request, response);
	}
}
