package kr.ap.amt.guide;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HtmlGuideController {

    @GetMapping("/html")
    public String htmlList() {
        return "html/html-list";
    }

    @GetMapping("/html/**")
    public String pages(Model model, HttpServletRequest request) {

        model.addAttribute("pageConnType", "directHtml"); //HTML 직접 접근시 Floating 메뉴에서 퍼플리싱용 메뉴를 오픈하기 위한 용도
        return request.getRequestURI();
    }
}