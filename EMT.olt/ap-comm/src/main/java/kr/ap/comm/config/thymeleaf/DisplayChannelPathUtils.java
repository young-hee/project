package kr.ap.comm.config.thymeleaf;

import kr.ap.comm.support.APRequestContext;
import nz.net.ultraq.thymeleaf.expressions.ExpressionProcessor;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.standard.expression.FragmentExpression;

import javax.servlet.http.HttpServletRequest;

/**
 * DisplayChannelPathUtils
 * @author ryan
 */
public class DisplayChannelPathUtils {

    /**
     * 전시채널 path 를 경로에 붙여준다.
     * <p>
     * thymeleaf 의 href, src, replace 등에 사용되는 LinkExpression or FragmentExpression 의 값에 전시채널 path 경로를 붙여준다.
     * <pre>
     *     &#64;{/css/default.css} ==> &#64;{/mo/ko/css/default.css}
     *     ~{fragment/default} ==> ~{mo/ko/fragment/default}
     * </pre>
     * </p>
     *
     * @param attributeValue
     * @return path
     */
    public static String addDisplayPathValues(String attributeValue) {

    	String contextPath = contextPath();
		String displayPath = getDisplayPath(false);
		String _attrValue = attributeValue.replace(contextPath, "");

        StringBuilder result = new StringBuilder(contextPath).append(displayPath).append(_attrValue);
        return result.toString();
    }

    public static String getDisplayPath(boolean fragmentExpr) {
        if (fragmentExpr) {
            if (APRequestContext.isMobileDevice() || APRequestContext.isMobileApp()) {
                return "mo/ko/";
            } else {
                return "pc/ko/";
            }
        } else {
            if (APRequestContext.isMobileDevice() || APRequestContext.isMobileApp()) {
                return "/mo/ko";
            } else {
                return "/pc/ko";
            }
        }
    }

    private static String contextPath() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		String contextPath = request.getContextPath();
		return contextPath;
    }

    /**
     * fragment expression 에 display channel 과 lang code 내용을 추가 해서 표현식을 재생성한다.
     * @param context
     * @param attributeValue
     * @return re-builded expression value
     */
    public static String rebuildExpr(ITemplateContext context, String attributeValue) {
        FragmentExpression expr = new ExpressionProcessor(context).parseFragmentExpression(attributeValue);

        // eval the expr
        String exprStr = expr.getTemplateName().execute(context).toString();

        // rebuild fragment expr
        StringBuilder sb = new StringBuilder("~{");
        sb.append(getDisplayPath(true)).append(exprStr);
        if (expr.hasFragmentSelector()) {
            sb.append("::").append(expr.getFragmentSelector());
        }
        if (expr.hasParameters()) {
            sb.append("(").append(expr.getParameters()).append(")");
        }
        sb.append("}");

        return sb.toString();
    }
}
