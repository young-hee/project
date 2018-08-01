package kr.ap.comm.support.common;

import kr.ap.comm.support.constants.PathConstants;
import net.g1project.ecp.api.model.ap.ap.ApMember;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

import java.util.regex.Matcher;

/**
 * AbstractViewController
 */
public class AbstractViewController  extends AbstractController{

    private static final String FORWARD_PREFIX = UrlBasedViewResolver.FORWARD_URL_PREFIX;

    private static final String REDIRECT_PREFIX = UrlBasedViewResolver.REDIRECT_URL_PREFIX;

    /** The braces pattern. */
    private final static String BRACES_PATTERN = "\\{([^}]*.?)\\}";

	/**
	 * The constant PARAM_KEY_NONMEMBER.
	 */
	public static final String PARAM_KEY_NONMEMBER = "nonmember";
	
    
    /**
     * is Member
     *
     * @return
     */
    protected boolean isMember() {
        return getMemberSn() > 0L;
    }

    /**
     * getMember
     *
     * @return
     */
    protected ApMember getMember() {
        return getMemberSession().getMember();
    }

    /**
     * Gets the forward path.
     *
     * @param path the path
     * @return the forward path
     */
    protected String getForwardPath(String path) {
        return FORWARD_PREFIX.concat(path);
    }

    /**
     * Gets the forward variable path.
     *
     * @param path          the path
     * @param pathVariables the path variables
     * @return the forward variable path
     */
    protected String getForwardVariablePath(String path, String... pathVariables) {
        return FORWARD_PREFIX.concat(getVariablePath(path, pathVariables));
    }

    /**
     * Gets the redirect path.
     *
     * @param path the path
     * @return the redirect path
     */
    protected String getRedirectPath(String path) {
        return REDIRECT_PREFIX.concat(path);
    }

    /**
     * return redirect phrase with given path and pathVariables
     * path relate with {@link PathConstants}.
     *
     * @param path          the path
     * @param pathVariables the path variables
     * @return the redirect variable path
     */
    protected String getRedirectVariablePath(String path, String... pathVariables) {
        return REDIRECT_PREFIX.concat(getVariablePath(path, pathVariables));
    }

    /**
     * Gets the variable path.
     *
     * @param path          the path
     * @param pathVariables the path variables
     * @return the variable path
     */
    private String getVariablePath(String path, String... pathVariables) {
        StringBuffer sb = new StringBuffer();
        Matcher m = java.util.regex.Pattern.compile(BRACES_PATTERN).matcher(path);

        for (String variable : pathVariables) {
            if (StringUtils.isEmpty(variable)) {
                throw new IllegalArgumentException("exist empty arguments");
            }

            if (m.find()) {
                m.appendReplacement(sb, variable);
            }
        }
        m.appendTail(sb);

        if (m.find()) {
            throw new IllegalArgumentException("required more arguments");
        }

        return sb.toString();
    }

    /**
     * Gets the view name.
     *
     * @param path the path
     * @return the view name
     */
    protected String getViewName(String path) {
        String viewPath = "";
        if (!path.startsWith("/")) {
            viewPath = viewPath.concat("/");
        }
        return viewPath.concat(path);
    }
    
}
