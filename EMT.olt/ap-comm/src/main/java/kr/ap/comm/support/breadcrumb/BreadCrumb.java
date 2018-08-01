package kr.ap.comm.support.breadcrumb;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * BreadCrumb 생성을 위한 식별 정보를 선언
 * <p>
 *     BreadCrumb 정보생성을 위해 controller(view) 의 method 에서 사용한다.
 *     <pre>
 *     <code>@BreadCrumb("EH.DP.01")
 *     public String main() {...}
 *     </code></pre>
 * </p>
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface BreadCrumb {

    /**
     * 화면 ID
     */
    String value();
}
