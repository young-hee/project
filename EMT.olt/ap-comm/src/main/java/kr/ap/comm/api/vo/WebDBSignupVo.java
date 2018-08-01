package kr.ap.comm.api.vo;

public class WebDBSignupVo {
	private	String	agree1;				//	약관동의 : [필수] 뷰티포인트 서비스 이용약관	Y
	private	String	agree2;				//	약관동의 : [필수] 개인정보 이용 및 수집에 대한 동의	Y
	private	String	apAgree;			//	약관동의 : 개인정보 제3자 제공동의	N
	private	String	appChCd;			//	유입경로 (W : Web, M : Mobile, A : App)	W
	private	String	atclCd;				//	휴대전화 인증정보 (1:본인/소유, 2:타인/점유)	
	private	String	birthDate01;		//	생년 (YYYY)	
	private	String	birthDate02;		//	생월 (MM)	
	private	String	birthDate03;		//	생일 (DD)	
	private	String	certCi;				//	CI	
	private	String	cstmId;				//	웹ID	
	private	String	emailReceiveType;	//	이메일 수신동의 (030 채널)	N
	private	String	emailReceiveTypeBp;	//	이메일 수신동의 (000 채널)	N
	private	String	frtroptfl;			//	약관동의 : 국외이전동의(선택)여부	N
	private	String	genderFlg;			//	0: 남자, 1: 여자	
	private	String	infoProvide;		//	약관동의 : 개인정보 선택 이용동의	N
	private	String	mktuseinfsupfl;		//	약관동의 : 외부컨텐츠마케팅활용_제3자제공동의(선택)여부	N
	private	String	mobileNo1;			//	휴대전화 번호 1 (ex: 010)	
	private	String	mobileNo2;			//	휴대전화 번호 2 (ex: 49958425)	
	private	String	nation;				//	0 : 내국인, 1 : 외국인	
	private	String	paramSiteCd;		//	유입채널 Site Code	CMC
	private	String	pswd;				//	비밀번호	
	private	String	res1;				//	주민등록번호 앞 6자리	
	private	String	res2;				//	주민등록번호 뒷 1자리	
	private	String	sex;				//	0 : 여자, 1 : 남자	
	private	String	smsReceiveType;		//	SMS 수신동의 (030 채널)	N
	private	String	smsReceiveTypeBp;	//	SMS 수신동의 (000 채널)	N
	private	String	userName;			//	고객명	
	public String getAgree1() {
		return agree1;
	}
	public void setAgree1(String agree1) {
		this.agree1 = agree1;
	}
	public String getAgree2() {
		return agree2;
	}
	public void setAgree2(String agree2) {
		this.agree2 = agree2;
	}
	public String getApAgree() {
		return apAgree;
	}
	public void setApAgree(String apAgree) {
		this.apAgree = apAgree;
	}
	public String getAppChCd() {
		return appChCd;
	}
	public void setAppChCd(String appChCd) {
		this.appChCd = appChCd;
	}
	public String getAtclCd() {
		return atclCd;
	}
	public void setAtclCd(String atclCd) {
		this.atclCd = atclCd;
	}
	public String getBirthDate01() {
		return birthDate01;
	}
	public void setBirthDate01(String birthDate01) {
		this.birthDate01 = birthDate01;
	}
	public String getBirthDate02() {
		return birthDate02;
	}
	public void setBirthDate02(String birthDate02) {
		this.birthDate02 = birthDate02;
	}
	public String getBirthDate03() {
		return birthDate03;
	}
	public void setBirthDate03(String birthDate03) {
		this.birthDate03 = birthDate03;
	}
	public String getCertCi() {
		return certCi;
	}
	public void setCertCi(String certCi) {
		this.certCi = certCi;
	}
	public String getCstmId() {
		return cstmId;
	}
	public void setCstmId(String cstmId) {
		this.cstmId = cstmId;
	}
	public String getEmailReceiveType() {
		return emailReceiveType;
	}
	public void setEmailReceiveType(String emailReceiveType) {
		this.emailReceiveType = emailReceiveType;
	}
	public String getEmailReceiveTypeBp() {
		return emailReceiveTypeBp;
	}
	public void setEmailReceiveTypeBp(String emailReceiveTypeBp) {
		this.emailReceiveTypeBp = emailReceiveTypeBp;
	}
	public String getFrtroptfl() {
		return frtroptfl;
	}
	public void setFrtroptfl(String frtroptfl) {
		this.frtroptfl = frtroptfl;
	}
	public String getGenderFlg() {
		return genderFlg;
	}
	public void setGenderFlg(String genderFlg) {
		this.genderFlg = genderFlg;
	}
	public String getInfoProvide() {
		return infoProvide;
	}
	public void setInfoProvide(String infoProvide) {
		this.infoProvide = infoProvide;
	}
	public String getMktuseinfsupfl() {
		return mktuseinfsupfl;
	}
	public void setMktuseinfsupfl(String mktuseinfsupfl) {
		this.mktuseinfsupfl = mktuseinfsupfl;
	}
	public String getMobileNo1() {
		return mobileNo1;
	}
	public void setMobileNo1(String mobileNo1) {
		this.mobileNo1 = mobileNo1;
	}
	public String getMobileNo2() {
		return mobileNo2;
	}
	public void setMobileNo2(String mobileNo2) {
		this.mobileNo2 = mobileNo2;
	}
	public String getNation() {
		return nation;
	}
	public void setNation(String nation) {
		this.nation = nation;
	}
	public String getParamSiteCd() {
		return paramSiteCd;
	}
	public void setParamSiteCd(String paramSiteCd) {
		this.paramSiteCd = paramSiteCd;
	}
	public String getPswd() {
		return pswd;
	}
	public void setPswd(String pswd) {
		this.pswd = pswd;
	}
	public String getRes1() {
		return res1;
	}
	public void setRes1(String res1) {
		this.res1 = res1;
	}
	public String getRes2() {
		return res2;
	}
	public void setRes2(String res2) {
		this.res2 = res2;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getSmsReceiveType() {
		return smsReceiveType;
	}
	public void setSmsReceiveType(String smsReceiveType) {
		this.smsReceiveType = smsReceiveType;
	}
	public String getSmsReceiveTypeBp() {
		return smsReceiveTypeBp;
	}
	public void setSmsReceiveTypeBp(String smsReceiveTypeBp) {
		this.smsReceiveTypeBp = smsReceiveTypeBp;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	
}
