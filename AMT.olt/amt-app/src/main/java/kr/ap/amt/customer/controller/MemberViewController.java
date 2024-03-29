package kr.ap.amt.customer.controller;

import java.util.Map;

import kr.ap.comm.api.CaptchaAPI;
import kr.ap.comm.api.vo.CicuemCuInfTotTcVo;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.util.G1SecureRandom;
import kr.ap.comm.util.SessionUtils;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.ap.ap.ApIssueTemporaryPassword;
import net.g1project.ecp.api.model.ap.ap.CheckResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.WebUtils;

@Controller
@RequestMapping("/customer")
public class MemberViewController extends AbstractController {

	@Autowired
	CaptchaAPI captchaAPI;

	@GetMapping("/find/find-pwd")
	@PageTitle(title = "비밀번호 변경")
	public String changePwd(Model model) {
		model.addAttribute("captchaKey", G1SecureRandom.getRandomText(5));
		WebUtils.setSessionAttribute(getRequest(), "TEMP_PW_CHANGE", null);
		return "customer/find-pwd.1";
	}
	@PostMapping("/findPwd/complete")
	@PageTitle(title = "비밀번호 변경")
	public String findPwdComplete(Model model, String phoneNo) {

		Map<String, Object> result = (Map<String, Object>) SessionUtils.getAttribute(getRequest(), "FIND_INFO");
		String joinType = (String) result.get("joinType");
		String incsNo = (String) result.get("incsNo");
		if("00".equals(joinType) || "05".equals(joinType)) {
			return "/customer/find-id.3";
		}
		if("02".equals(joinType)) {
			return "/customer/find-id.4";
		}

		StringBuffer sb = new StringBuffer(phoneNo);
		sb.replace(sb.length() - 2, sb.length(), "**");
		
		ApIssueTemporaryPassword issueTemporaryPassword = new ApIssueTemporaryPassword();
		issueTemporaryPassword.setIncsNo(Long.parseLong(incsNo));
		EmbeddableTel phoneNoVo = new EmbeddableTel();
		phoneNoVo.setPhoneNo(phoneNo);
		issueTemporaryPassword.setPhoneNo(phoneNoVo);
		
		model.addAttribute("phone", sb.toString());
		WebUtils.setSessionAttribute(getRequest(), "TEMP_PW_CHANGE", issueTemporaryPassword);
		
		return "customer/find-pwd.2";
	}

	@PostMapping("/findId/complete")
	@PageTitle(title = "아이디 찾기")
	public String findIdComplete(Model model, String phoneNo) {

		Map<String, Object> result = (Map<String, Object>) SessionUtils.getAttribute(getRequest(), "FIND_INFO");
		String joinType = (String) result.get("joinType");
		String userId = (String) result.get("chcsNo");
		switch (joinType) {
		case "00":
			return "/customer/find-id.3";
		case "01":
			model.addAttribute("userId", userId.substring(0, userId.length() - 2) + "**");
			model.addAttribute("phoneNo", phoneNo);
			return "/customer/find-id.2";
		case "02":
			return "/customer/find-id.4";
		case "03":
        case "04": //통합ID회원 정보
			model.addAttribute("userId", userId.substring(0, userId.length() - 2) + "**");
			model.addAttribute("phoneNo", phoneNo);
			return "/customer/find-id.2";
        case "05": //통합비ID회원 정보 //FIXME 나중에 수정.
			return "/customer/find-id.3";

		default:
			break;
		}

		return "customer/find-id.3";
	}
	
	@GetMapping("/find/find-id")
	@PageTitle(title = "아이디 찾기")
	public String find(Model model) {

		model.addAttribute("captchaKey", G1SecureRandom.getRandomText(5));
		
		return "customer/find-id.1";
		
	}

}