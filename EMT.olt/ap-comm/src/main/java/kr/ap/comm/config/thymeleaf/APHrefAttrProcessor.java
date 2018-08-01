package kr.ap.comm.config.thymeleaf;

import org.thymeleaf.templatemode.TemplateMode;

import java.util.Arrays;
import java.util.List;

/**
 * link 태그의 href 속성에서 css 경로를 지정 할 때 사용하는 processor
 * <p>
 * <pre>
 * ex)
 * 사용
 * &#60;link rel="stylesheet" type="text/css" ap:href="@{/css/default.css}">
 *
 * 결과
 * &#60;link rel="stylesheet" type="text/css" href="/pc/ko/css/default.css">
 * </pre>
 * </p>
 * @author ryan
 */
public class APHrefAttrProcessor extends APSrcAttrProcessor {

    public APHrefAttrProcessor(TemplateMode templateMode, String dialectPrefix) {
        super(templateMode, dialectPrefix, "href");
    }

    @Override
    protected List<String> availableTagNames() {
        return Arrays.asList("link");
    }
}
