package kr.ap.comm.support.breadcrumb;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * BreadCrumbs
 * <p>
 * 페이지에서 보여줄 breadcrumb 정보를 지니고 있는 클래스
 * </p>
 *
 * @author ryan
 */
public class BreadCrumbs {

    private static Logger logger = LoggerFactory.getLogger(BreadCrumbs.class);

    /**
     * BreadCrumb
     * <p>
     * breadcrumb 정보로 화면 ID, 타이틀, URI 내용을 담고 있다.
     * </p>
     *
     * @author ryan
     */
    public static class BreadCrumb {

        private String id;
        private String title;
        private String uri;

        public BreadCrumb(String id, String title, String uri) {
            this.id = id;
            this.title = title;
            this.uri = uri;
        }

        public String getTitle() {
            return title;
        }
        public void setTitle(String title) {
            this.title = title;
        }
        public String getUri() {
            return uri;
        }
        public void setUri(String uri) {
            this.uri = uri;
        }
        public String getId() {
            return id;
        }
        public void setId(String id) {
            this.id = id;
        }
    }

    /**
     * BreadCrumb 정보를 획득
     * @param screenId
     */
    public static List<BreadCrumb> getBreadCrumbs(String screenId) {
        List<BreadCrumb> breadCrumbs = createBreadCrumbs();
        String[] depth = screenId.split("\\.");
        StringBuilder upperId = new StringBuilder("EH");
        for (int i = 1; i < depth.length; i++) {
            upperId.append(".").append(depth[i]);
            BreadCrumb breadCrumb = getBreadCrumb(upperId.toString());
            if (breadCrumb != null) {
                breadCrumbs.add(breadCrumb);
            }
        }
        return breadCrumbs;
    }

    private static List<BreadCrumb> createBreadCrumbs() {
        List<BreadCrumb> breadCrumbs = new ArrayList<>();
        breadCrumbs.add(new BreadCrumb("EH","HOME", "/"));
        return breadCrumbs;
    }

    private static BreadCrumb getBreadCrumb(String screenId) {
        return breadCrumbMap.get(screenId);
    }

    private static Map<String, BreadCrumb> breadCrumbMap = new ConcurrentHashMap<>();

    public static void add(String id, String title, String uri) {
        if (logger.isDebugEnabled()) {
            logger.debug("Add bread crumb for '{}'. [ title : {}, uri : {} ]", id, title, uri);
        }
        breadCrumbMap.put(id, new BreadCrumb(id, title, uri));
    }
}
