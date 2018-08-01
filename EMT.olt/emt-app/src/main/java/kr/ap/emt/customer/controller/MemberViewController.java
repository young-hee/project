package kr.ap.emt.customer.controller;

import kr.ap.comm.api.CaptchaAPI;
import kr.ap.comm.api.vo.CicuemCuInfTotTcVo;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.util.G1SecureRandom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/customer")
public class MemberViewController extends AbstractController {

	@Autowired
	CaptchaAPI captchaAPI;

	@GetMapping("/find/find-pwd")
	@PageTitle(title = "비밀번호 변경")
	public String changePwd(Model model) {
		model.addAttribute("captchaKey", G1SecureRandom.getRandomText(5));
		return "customer/customernew/find-pwd.1";
	}
	@PostMapping("/findPwd/complete")
	@PageTitle(title = "비밀번호 변경")
	public String findPwdComplete(Model model, String joinType, String incsNo) {

		if("00".equals(joinType) || "05".equals(joinType)) {
			return "/customer/customernew/find-id.3";
		}
		if("02".equals(joinType)) {
			return "/customer/customernew/find-id.4";
		}
		
		CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
		cicuemCuInfTotTcVo.setIncsNo(incsNo);
		cicuemCuInfTotTcVo = amoreAPIService.getcicuemcuinfrbyincsno(cicuemCuInfTotTcVo);
		StringBuffer sb = new StringBuffer();
		sb.append(cicuemCuInfTotTcVo.getCellTidn());
		sb.append("-");
		sb.append(cicuemCuInfTotTcVo.getCellTexn());
		sb.append("-");
		sb.append(cicuemCuInfTotTcVo.getCellTlsn());
		sb.replace(sb.length() - 2, sb.length(), "**");
		
		model.addAttribute("incsNo", incsNo);
		model.addAttribute("phone", sb.toString());
		
		return "customer/customernew/find-pwd.2";
	}

	@PostMapping("/findId/complete")
	@PageTitle(title = "아이디 찾기")
	public String findIdComplete(Model model, String joinType, String userId) {
		switch (joinType) {
		case "00":
			return "/customer/customernew/find-id.3";
		case "01":
			model.addAttribute("userId", userId);
			return "/customer/customernew/find-id.2";
		case "02":
			return "/customer/customernew/find-id.4";
		case "03":
        case "04": //통합ID회원 정보
			model.addAttribute("userId", userId);
			return "/customer/customernew/find-id.2";
        case "05": //통합비ID회원 정보 //FIXME 나중에 수정.
			return "/customer/customernew/find-id.3";

		default:
			break;
		}

		return "customer/customernew/find-id.3";
	}
	
	@GetMapping("/find/find-id")
	@PageTitle(title = "아이디 찾기")
	public String find(Model model) {

		model.addAttribute("captchaKey", G1SecureRandom.getRandomText(5));
		
		return "customer/customernew/find-id.1";
		
	}
}