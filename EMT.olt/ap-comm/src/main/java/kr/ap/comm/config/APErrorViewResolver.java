package kr.ap.comm.config;

import kr.ap.comm.support.ControllerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ErrorViewResolver;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Component
public class APErrorViewResolver implements ErrorViewResolver {

	@Autowired
	ControllerSupport controllerSupport;

    @Override
    public ModelAndView resolveErrorView(HttpServletRequest request,
                                         HttpStatus status, Map<String, Object> model) {
        // Use the request or status to optionally return a ModelAndView
        ModelAndView mv = null;
		Map<String, Object> errModel = new HashMap<>();

		if (status.is5xxServerError()) {
			mv = new ModelAndView("error/error-03", errModel);
		}

		// gnb 데에터 설정
		errModel.putAll(controllerSupport.getGnbMap());
		errModel.putAll(model);

        switch (status) {
        case FORBIDDEN:
        case UNAUTHORIZED:
            mv = new ModelAndView("error/error-01", errModel);
            break;
        case NOT_FOUND:
            mv = new ModelAndView("error/error-02", errModel);
            break;
        case METHOD_NOT_ALLOWED:
            mv = new ModelAndView("error/error-02", errModel);
            break;
        default:
            break;
        }
        return mv;
    }

}