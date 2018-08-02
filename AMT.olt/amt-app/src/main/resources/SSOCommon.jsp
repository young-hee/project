<%@page import="com.pacific.sso.util.SsoUtil"%>
<%@page import="com.pacific.common.SITEProperty"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@	page import = "java.io.*,java.net.*,
					com.ufo.common.*,
					com.ufo.common.utility.*,
					com.ufo.member.UFOMemberMgmtWB,
					com.ap.common.sso.SsoLoginWB,
					com.ap.common.sso.entity.SsoLoginEntity,
					com.ufo.member.entity.MemberMstEntity"
%><%!
	// SSO renewal 이전에 사용한 소스를 위해 유지한 method
	public SsoLoginEntity isLogin(UFORequest req, SsoLoginEntity ssoLoginEntity) throws Exception {
		return SsoUtil.isLogin(req.getString("siteCd"), req, ssoLoginEntity);
	}
	public SsoLoginEntity isLogin(String siteCd, UFORequest req, SsoLoginEntity ssoLoginEntity) throws Exception {
		return SsoUtil.isLogin(siteCd, req, ssoLoginEntity);
	}
%><%
	UFORequest req_SSO = JSPHelper.getRequestInfo(request);
	String refererSource = req_SSO.getString("source");
	// ---------------------------------------------------------------------------------------------------
	// SSO DB 제외 초기화 sample code
	//SsoUtil.initDBFilterList(SITEProperty.getProperty("SITE_CD"), "/event /about /eventplatform /sns");
	// ---------------------------------------------------------------------------------------------------

	SsoLoginEntity ssoLoginEntity = new SsoLoginEntity();
	ssoLoginEntity.siteCd = req_SSO.getString("siteCd");
	ssoLoginEntity.act = "".equals(req_SSO.getString("act")) ? "login" : req_SSO.getString("act");
	ssoLoginEntity.mst.cstmId = CmUtil.nullTrim(req_SSO.getString("cstmId"));
	ssoLoginEntity.mst.pswd = CmUtil.nullTrim(req_SSO.getString("pswd"));
	ssoLoginEntity.sessionKey = req_SSO.getString("sessionKey");
	ssoLoginEntity.ip = request.getRemoteAddr();
	ssoLoginEntity.isLogin = false;
	
	String SSO_sessionKey = SsoUtil.getSessionKeyStr(request);  //sessionObj.getAttribute("SSO_SESSION_KEY") == null ? "" : (String)sessionObj.getAttribute("SSO_SESSION_KEY");
	String SSO_CHECK_FL	  = req_SSO.getString("SSO_CHECK_FL");
	String returnUrl      = SsoUtil.getCurrentURL(request);	// return URL
	String SSO_referer    = SsoUtil.getReferer(request);    // REFERER URL
	
	HttpSession sessionObj = request.getSession(true); // for old source
	
	SsoUtil.println("@@@@@@@@@@@@@@@@@@@@ ver 0523.1150 SSO_sessionKey="+SSO_sessionKey+"  SSO_CHECK_FL="+SSO_CHECK_FL);

	if( "".equals(SSO_sessionKey) ){
		// session key가 없는경우. 최초 접속인 경우임
	    if( !"Y".equals( SSO_CHECK_FL ) ){

			String gwSiteCd =  SITEProperty.getProperty("SITE_CD");
			String gatewayUrl =  SITEProperty.getProperty("SSO_GW_URL");
			
			boolean validGW = false;
			boolean isRealBrowser = SsoUtil.isRealBrowser(request);
			if(isRealBrowser) {
				validGW = SsoUtil.validSsoGateway(gwSiteCd, gatewayUrl, request);
			}
    		SsoUtil.println("@@@@@@@@@@@@@@@@ SSOCommon ["+gwSiteCd+"] : gatewayUrl="+gatewayUrl+"  validGW="+validGW+"  isRealBrowser="+isRealBrowser);
    		
    		if(validGW) {
    			// GW에서 세션생성
    			SsoUtil.println("@@@@@@@@@@@@@@@@ SSOCommon : GW 사용 @@@@@@");
			    StringBuffer responseUrl = new StringBuffer();
			    responseUrl.append(gatewayUrl+"/sso/sessioncheck.jsp");
			    responseUrl.append("?returnUrl=" + URLEncoder.encode(returnUrl,"UTF-8"));
			    
			    SsoUtil.println("@@@@@@@@@@@@@@@@ sendRedirect to ver1 : "+responseUrl.toString());
			    
			    response.sendRedirect( responseUrl.toString() );
			    
			}else {
				// GW 사용불가한 경우
				SsoUtil.println("@@@@@@@@@@@@@@@@ SSOCommon : GW 사용불가 !!!!!");
				
				SSO_sessionKey = SsoUtil.makeSessionKey(request);
				ssoLoginEntity.sessionKey = SSO_sessionKey;
			    
			    SsoUtil.setSessionKeyStr(request, SSO_sessionKey);  //sessionObj.setAttribute("SSO_SESSION_KEY", SSO_sessionKey);
			}
	    }
	    else {
		    SSO_sessionKey = ssoLoginEntity.sessionKey;
		    SsoUtil.setSessionKeyStr(request, SSO_sessionKey); //sessionObj.setAttribute("SSO_SESSION_KEY", SSO_sessionKey);
	    }
	}
	else {
		ssoLoginEntity.sessionKey = SSO_sessionKey;
	}
	
	SsoUtil.println("@ Page:"+returnUrl+"  REFERER|"+ SSO_referer+"  source|"+refererSource);

%>
