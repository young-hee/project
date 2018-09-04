package kr.ap.amt.customer.controller;

import com.pacific.sso.util.SsoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;


@Controller
@RequestMapping("/sso")
public class SSOLoginController {

	@Autowired
	private Environment env;

	@RequestMapping("/ssoControl")
	public String ssoControl(Model model, HttpServletRequest request, HttpServletResponse response) throws UnknownHostException {

		response.setHeader("Pragma", "No-cache");
		response.setDateHeader("Expires", 0);
		response.setHeader("Cache-Control", "no-cache");


		SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		Date curDt = new Date();

		String siteCd = env.getProperty("webdb.sso.site-cd", "CMC"); //SITEProperty.getProperty("SITE_CD");

		// -------------------------------------------------------------

		String act = request.getParameter("act");
		String applySsoDbParam = request.getParameter("appldb");

		try {
			if ("save".equals(act)) {
				if ("true".equals(applySsoDbParam)) {
					SsoUtil.setSSODBApply(siteCd, true);
				}

				if ("false".equals(applySsoDbParam)) {
					SsoUtil.setSSODBApply(siteCd, false);
				}
			}

			if ("saveFilter".equals(act)) {
				String filterStr = request.getParameter("filterlist");
				SsoUtil.setDBFilterList(siteCd, filterStr);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		/*
		SSO 처리 정보를 확인 / 수정하는 페이지
		*/


		boolean applySsoDb = SsoUtil.isSSODBApply(siteCd);
		String gatewayUrl = env.getProperty("webdb.sso.gateway-url"); //SITEProperty.getProperty("SSO_GW_URL");
		Assert.notNull(gatewayUrl, "Please check the property value: 'webdb.sso.gateway-url'.");
		String filterList = SsoUtil.getDBFilterList(siteCd, "\n");

		boolean validGW = SsoUtil.validSsoGateway(siteCd, gatewayUrl, request);
		String ctxPath = request.getContextPath();

		InetAddress address = InetAddress.getLocalHost();

		model.addAttribute("applySsoDb", applySsoDb);
		model.addAttribute("gatewayUrl", gatewayUrl);
		model.addAttribute("filterList", filterList);
		model.addAttribute("validGW", validGW);
		model.addAttribute("ctxPath", ctxPath);
		model.addAttribute("address", address);
		model.addAttribute("siteCd", siteCd);

		model.addAttribute("propDir", SsoUtil.getSsoProperty().getPropDirectory());

		return "customer/sso/sso_control";
	}

}
