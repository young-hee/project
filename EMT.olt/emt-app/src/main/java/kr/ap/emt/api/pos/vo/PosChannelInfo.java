package kr.ap.emt.api.pos.vo;

public class PosChannelInfo {
	private String ucstmId;		//통합고객번호
	private String cstmNm;		//고객명
	private String cstmDelFl;	//통합회원탈퇴여부.
	private String residno1;	//주민번호1_생년월일.
	private String residno2;	//주민번호2_뒷번호.
	private String crtGb;		//생성구분.
	private String bDayFl;		//양음구분.
	private String bDay;		//생일.
	private String zip1;		//우편번호.
	private String zip2;		//우편본호2/
	private String addr1;		//우편주소.
	private String addr2;		//상세주소.
	private String mblno1;		//휴대전화번호1
	private String mblno2;		//휴대전화번호2
	private String mblno3;		//휴대전화번호3
	private String skinTpCd;	//피부타입.
	private String emailId;		//이메일주소.
	private String emailCmpy;	//이메일주소 도메인.
	private String cstmLvl;		//고객등급.
	private String cstmCardNo;	//맴버십카드번호.
	private String dmSendCd;	//우편물수신처.
	private String ciNo;		//Ci번호.
	private String addrTpCd;	//주소구분.
	private String addrGetCd;	//주소입수구분.
	private String unqBldMno;	//건물관리번호.
	private String xCordNat;	//X좌표
	private String yCordNat;	//Y좌표.
	private String addrrefRst;	//정제결과코드.
	private String ucstmInfoGtFl;//약관(뷰티통합)-개인정보수집동의선택.
	private String ecstmInfoGtFl;//약관(에뛰드)-개인정보수집동의선택.
	private String chCd;		//경로구분.
	private String webId;		//온라인ID
	private String partnrId;	//매장코드.
	private String smsRcvFl;	//SMS수신동의.
	private String joinDate;	//가입일.
	private String rnmAuthFl;	//실명인증여부.
	private String rnmAuthDate;	//실명인증일자.
	public String getUcstmId() {
		return ucstmId;
	}
	public void setUcstmId(String ucstmId) {
		this.ucstmId = ucstmId;
	}
	public String getCstmNm() {
		return cstmNm;
	}
	public void setCstmNm(String cstmNm) {
		this.cstmNm = cstmNm;
	}
	public String getCstmDelFl() {
		return cstmDelFl;
	}
	public void setCstmDelFl(String cstmDelFl) {
		this.cstmDelFl = cstmDelFl;
	}
	public String getResidno1() {
		return residno1;
	}
	public void setResidno1(String residno1) {
		this.residno1 = residno1;
	}
	public String getResidno2() {
		return residno2;
	}
	public void setResidno2(String residno2) {
		this.residno2 = residno2;
	}
	public String getCrtGb() {
		return crtGb;
	}
	public void setCrtGb(String crtGb) {
		this.crtGb = crtGb;
	}
	public String getbDayFl() {
		return bDayFl;
	}
	public void setbDayFl(String bDayFl) {
		this.bDayFl = bDayFl;
	}
	public String getbDay() {
		return bDay;
	}
	public void setbDay(String bDay) {
		this.bDay = bDay;
	}
	public String getZip1() {
		return zip1;
	}
	public void setZip1(String zip1) {
		this.zip1 = zip1;
	}
	public String getZip2() {
		return zip2;
	}
	public void setZip2(String zip2) {
		this.zip2 = zip2;
	}
	public String getAddr1() {
		return addr1;
	}
	public void setAddr1(String addr1) {
		this.addr1 = addr1;
	}
	public String getAddr2() {
		return addr2;
	}
	public void setAddr2(String addr2) {
		this.addr2 = addr2;
	}
	public String getMblno1() {
		return mblno1;
	}
	public void setMblno1(String mblno1) {
		this.mblno1 = mblno1;
	}
	public String getMblno2() {
		return mblno2;
	}
	public void setMblno2(String mblno2) {
		this.mblno2 = mblno2;
	}
	public String getMblno3() {
		return mblno3;
	}
	public void setMblno3(String mblno3) {
		this.mblno3 = mblno3;
	}
	public String getSkinTpCd() {
		return skinTpCd;
	}
	public void setSkinTpCd(String skinTpCd) {
		this.skinTpCd = skinTpCd;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getEmailCmpy() {
		return emailCmpy;
	}
	public void setEmailCmpy(String emailCmpy) {
		this.emailCmpy = emailCmpy;
	}
	public String getCstmLvl() {
		return cstmLvl;
	}
	public void setCstmLvl(String cstmLvl) {
		this.cstmLvl = cstmLvl;
	}
	public String getCstmCardNo() {
		return cstmCardNo;
	}
	public void setCstmCardNo(String cstmCardNo) {
		this.cstmCardNo = cstmCardNo;
	}
	public String getDmSendCd() {
		return dmSendCd;
	}
	public void setDmSendCd(String dmSendCd) {
		this.dmSendCd = dmSendCd;
	}
	public String getCiNo() {
		return ciNo;
	}
	public void setCiNo(String ciNo) {
		this.ciNo = ciNo;
	}
	public String getAddrTpCd() {
		return addrTpCd;
	}
	public void setAddrTpCd(String addrTpCd) {
		this.addrTpCd = addrTpCd;
	}
	public String getAddrGetCd() {
		return addrGetCd;
	}
	public void setAddrGetCd(String addrGetCd) {
		this.addrGetCd = addrGetCd;
	}
	public String getUnqBldMno() {
		return unqBldMno;
	}
	public void setUnqBldMno(String unqBldMno) {
		this.unqBldMno = unqBldMno;
	}
	public String getxCordNat() {
		return xCordNat;
	}
	public void setxCordNat(String xCordNat) {
		this.xCordNat = xCordNat;
	}
	public String getyCordNat() {
		return yCordNat;
	}
	public void setyCordNat(String yCordNat) {
		this.yCordNat = yCordNat;
	}
	public String getAddrrefRst() {
		return addrrefRst;
	}
	public void setAddrrefRst(String addrrefRst) {
		this.addrrefRst = addrrefRst;
	}
	public String getUcstmInfoGtFl() {
		return ucstmInfoGtFl;
	}
	public void setUcstmInfoGtFl(String ucstmInfoGtFl) {
		this.ucstmInfoGtFl = ucstmInfoGtFl;
	}
	public String getEcstmInfoGtFl() {
		return ecstmInfoGtFl;
	}
	public void setEcstmInfoGtFl(String ecstmInfoGtFl) {
		this.ecstmInfoGtFl = ecstmInfoGtFl;
	}
	public String getChCd() {
		return chCd;
	}
	public void setChCd(String chCd) {
		this.chCd = chCd;
	}
	public String getWebId() {
		return webId;
	}
	public void setWebId(String webId) {
		this.webId = webId;
	}
	public String getPartnrId() {
		return partnrId;
	}
	public void setPartnrId(String partnrId) {
		this.partnrId = partnrId;
	}
	public String getSmsRcvFl() {
		return smsRcvFl;
	}
	public void setSmsRcvFl(String smsRcvFl) {
		this.smsRcvFl = smsRcvFl;
	}
	public String getJoinDate() {
		return joinDate;
	}
	public void setJoinDate(String joinDate) {
		this.joinDate = joinDate;
	}
	public String getRnmAuthFl() {
		return rnmAuthFl;
	}
	public void setRnmAuthFl(String rnmAuthFl) {
		this.rnmAuthFl = rnmAuthFl;
	}
	public String getRnmAuthDate() {
		return rnmAuthDate;
	}
	public void setRnmAuthDate(String rnmAuthDate) {
		this.rnmAuthDate = rnmAuthDate;
	}
	
	
}
