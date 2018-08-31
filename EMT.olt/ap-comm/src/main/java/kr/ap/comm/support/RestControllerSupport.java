package kr.ap.comm.support;

import net.g1project.ecp.api.exception.ApiException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import javax.annotation.Priority;
import java.io.Serializable;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

@Priority(1)
@RestControllerAdvice(
	annotations = {RestController.class}
)
public class RestControllerSupport {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@ModelAttribute
	public void gnbAndSubGnb(final Model model) {
		model.addAttribute(ControllerSupport.GNB_NOT_REQUIRED, "");
	}

	@ExceptionHandler({
		Exception.class
	})
	protected ResponseEntity<?> handleException(final WebRequest request, final Exception e) {
		final Map<String, Object> responseAttributes = new LinkedHashMap<>();

		//기본 응답 500으로 지정
		HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		if (e instanceof ApiException) {
			//API예외의 경우 해당 예외에서 정의한 Http응답코드로 변환
			httpStatus = HttpStatus.valueOf(ApiException.class.cast(e).getStatus());
			responseAttributes.put("errorData", new ErrorData((ApiException) e));
		} else {
			responseAttributes.put("errorData", new ErrorData("처리중 에러가 발생했습니다."));
		}

		//5xx응답코드의 경우는 에러로그를 출력
		if (httpStatus.is5xxServerError()) {
			logger.error(e.getMessage(), e);
		}
		//4xx응답코드는 info 레벨로 로깅
		else if (httpStatus.is4xxClientError()) {
			logger.info(e.getMessage());
		}
		return new ResponseEntity<>(responseAttributes, new HttpHeaders(), httpStatus);
	}

	public static class ErrorData implements Serializable {
		private String errorCode;
		private String message;
		private Map<String, Object> additional;

		public ErrorData() {
			//Default constructor
		}

		public ErrorData(final ApiException e) {
			this.errorCode = e.getErrorCode();
			this.message = e.getMessage();
			this.additional = e.getAdditional();
		}

		public ErrorData(final String message) {
			this.message = message;
		}


		public String getErrorCode() {
			return errorCode;
		}

		public void setErrorCode(String errorCode) {
			this.errorCode = errorCode;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}

		public Map<String, Object> getAdditional() {
			return this.additional != null ? Collections.unmodifiableMap(this.additional) : Collections.emptyMap();
		}

		public void setAdditional(final Map<String, Object> additional) {
			this.additional = additional != null ? new LinkedHashMap<>(additional) : null;
		}
	}
}
