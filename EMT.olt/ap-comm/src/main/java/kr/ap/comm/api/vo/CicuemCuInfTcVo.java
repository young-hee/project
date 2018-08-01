package kr.ap.comm.api.vo;

public class CicuemCuInfTcVo {
	private	String	incsNo;			//	통합고객번호	고객의유일한식별번호
	private	String	custNm;			//	고객명	고객이름
	private	String	athtDtbr;		//	인증생년월일	주민등록번호앞6자리
	private	String	frclCd;			//	내외국인구분코드	내국인:K,외국인:F
	private	String	sxclCd;			//	성별구분코드	여성:F,남성:M
	private	String	pmdcCd;			//	우편물수신처구분코드	자택:H,직장:C,기타:E
	private	String	homeZip;		//	자택우편번호	고객의자택우편번호
	private	String	homeBscsAddr;	//	자택기본주소	고객의자택우편주소
	private	String	tncAgrYn;		//	약관동의여부	고객의자택상세주소
	private	String	homeDtlAddr;	//	자택상세주소	고객의휴대전화번호1
	private	String	cellTidn;		//	휴대폰식별전화번호	고객의휴대전화번호2
	private	String	cellTexn;		//	휴대폰국전화번호	고객의휴대전화번호3
	private	String	cellTlsn;		//	휴대폰끝전화번호	고객이메일주소계정
	private	String	custEmid;		//	고객이메일계정	고객이메일주소번지
	private	String	custEmdn;		//	고객이메일번지	고객의개인식별번호
	private	String	ciNo;			//	CI번호	고객의회원탈퇴일시
	private	String	custWtDttm;		//	고객탈퇴일시	아모레퍼시픽고객회원가입일자
	private	String	mbrJoinDt;		//	회원가입일시	실명인증기관에서반환하는값(실명인증성공:1,실명인증실패:2,3,5,50,30/60번대)
	private	String	rnarCd;			//	실명인증결과코드	실명인증결과코드(COMCATCD:10155)
	private	String	rnmAthtDt;		//	실명인증일자	고객의실명인증확인된일자
	private	String	custWtYn;		//	고객탈퇴여부	고객의회원탈퇴여부
	private	String	ofcBscsAddr;	//	직장기본주소	고객의직장우편주소
	private	String	ofcDtlAddr;		//	직장상세주소	고객의직장상세주소
	private	String	ofcZip;			//	직장우편번호	고객의직장우편번호
	private	String	addrXcrd;		//	주소X좌표	도로명주소체계에서의관리항목중하나
	private	String	addrYcrd;		//	주소Y좌표	도로명주소체계에서의관리항목중하나
	private	String	rfrsCd;			//	정제결과코드	주소변환결과코드값
	private	String	blmnNo;			//	건물관리번호	도로명주소체계에서건물관리를위해부여한관리번호
	private	String	adclCd;			//	주소구분코드	1:입력지번,2:입력도로명,3:표준지번,4:표준도로명
	private	String	adocCd;			//	주소입수구분코드	1:온라인,2:일괄전환,3:대외,4:기타
	private	String	drccCd;			//	휴면고객구분코드	Y:휴면,A:예정
	private	String	drcsRegDt;		//	휴면고객등록일자	휴면고객으로등록되는날짜(휴면고객구분값이예정인경우는휴면고객등록예정일자)
	private	String	joinChCd;		//	가입경로구분코드	고객이회원가입을한경로구분코드
	private	String	joinPrtnId;		//	가입거래처ID	고객이회원가입을한거래처ID
	private	String	jndvCd;			//	가입디바이스코드	고객이회원가입시사용한등록매체[W:WEB,M:MOBILE,A:APP]
	private	String	rsltMsg;		//	결과메시지	최초생성ID
	private	String	rsltCd;			//	결과코드	최초생성시각
	private	String	chCd;			//	경로코드	최종변경ID
	private	String	returnUrl;		//	리턴url	최종변경시각
	private	String	icsgCd;			//	전사고객등급코드	양음력구분코드(COMCATCD:10020)
	private	String	fscrId;			//	최초생성ID	개인생년월일
	private	String	fscrTsp;		//	최초생성시각	결혼기념일자
	private	String	lschId;			//	최종변경ID	직업코드(COMCATCD:10085)
	private	String	lschTsp;		//	최종변경시각	최초포인트적립일자
	private	String	slccCd;			//	양음력구분코드	최종포인트적립일자
	private	String	psnDtbr;		//	개인생년월일	최초구매일자
	private	String	wdanDt;			//	결혼기념일자	최종구매일자
	private	String	jobCd;			//	직업코드	유선식별전화번호
	private	String	fstPtAcmlDt;	//	최초포인트적립일자	유선국전화번호
	private	String	lstPtAcmlDt;	//	최종포인트적립일자	유선끝전화번호
	private	String	fstPurDt;		//	최초구매일자	최종접촉일자
	private	String	lstPurDt;		//	최종구매일자	전사고객등급코드(COMCATCD:10104)
	private	String	wireTidn;		//	유선식별전화번호	최종경로구분코드(COMCATCD:10098)
	private	String	wireTexn;		//	유선국전화번호	경로구분
	private	String	wireTlsn;		//	유선끝전화번호	온라인ID
	private	String	lstCnttDt;		//	최종접촉일자	카드번호
	private	String	lstChCd;		//	최종경로구분코드	인증구분
	private	String	chcsNo;			//	경로고객번호	인증일자
	private	String	sdtpCd;			//	표준시간대코드	인증휴대폰식별전화번호
	private	String	chk;			//	상태	인증휴대폰국전화번호
	private	String	incsCardNoEc;	//	카드번호	인증휴대폰끝전화번호
	private	String	dmOptiYn;		//	우편발송여부	경로구분
	private	String	smsOptiYn;		//	SMS발송여부	우편물수신동의
	private	String	rnarCdYn;		//	실명인증여부	SMS수신동의
	private	String	atclCdNm;		//	인증구분(점유/소유)	TM수신동의
	private	String	csstCd;			//	고객상태	이메일수신동의
	private	String	athtCellTidn;	//	인증휴대폰식별전화번호	최초접촉거래처ID
	private	String	dlplZip;		//	배송지우편번호	거래처명
	private	String	dlplBscsAddr;	//	배송지기본주소	약관동의일자
	private	String	dlplDtAddr;		//	배송지상세주소	
	private	String	delYTn;			//	고객삭제여부	
	private	String	athtCellTexn;	//	인증휴대폰국전화번호	외국인약관동의여부
	private	String	athtCellTlsn;	//	인증휴대폰끝전화번호	외국인약관동의일자
	private	String	chCdNm;			//	경로구분	
	private	String	tmOptiYn;		//	TM수신동의여부	
	private	String	emlOptiYn;		//	이메일수신동의여부	제3자정보제공약관동의
	private	String	csstCdYn;		//	경로고객상태여부	제3자정보제공약관동의일자
	private	String	athtDt;			//	인증일자	뷰티포인트약관동의여부
	private	String	userPwdEc;		//	사용자비밀번호	뷰티포인트약관동의일자
	private	String	custInfrChgSn;	//	고객공통변경순번	
	private	String	tncaDttm;		//	약관동의일자	
	private	String	hqEmpId;		//	본사직원ID	개인정보이용동의여부
	private	String	fstCnttPrtnId;	//	거래처ID	개인정보이용동의일자
	private	String	prtnNm;			//	거래처명	
	private	String	chgChCd;		//	변경경로구분코드	경로가입수
	private	String	joinCnt;		//	고객경로cnt	포인트
	public String getIncsNo() {
		return incsNo;
	}
	public void setIncsNo(String incsNo) {
		this.incsNo = incsNo;
	}
	public String getCustNm() {
		return custNm;
	}
	public void setCustNm(String custNm) {
		this.custNm = custNm;
	}
	public String getAthtDtbr() {
		return athtDtbr;
	}
	public void setAthtDtbr(String athtDtbr) {
		this.athtDtbr = athtDtbr;
	}
	public String getFrclCd() {
		return frclCd;
	}
	public void setFrclCd(String frclCd) {
		this.frclCd = frclCd;
	}
	public String getSxclCd() {
		return sxclCd;
	}
	public void setSxclCd(String sxclCd) {
		this.sxclCd = sxclCd;
	}
	public String getPmdcCd() {
		return pmdcCd;
	}
	public void setPmdcCd(String pmdcCd) {
		this.pmdcCd = pmdcCd;
	}
	public String getHomeZip() {
		return homeZip;
	}
	public void setHomeZip(String homeZip) {
		this.homeZip = homeZip;
	}
	public String getHomeBscsAddr() {
		return homeBscsAddr;
	}
	public void setHomeBscsAddr(String homeBscsAddr) {
		this.homeBscsAddr = homeBscsAddr;
	}
	public String getTncAgrYn() {
		return tncAgrYn;
	}
	public void setTncAgrYn(String tncAgrYn) {
		this.tncAgrYn = tncAgrYn;
	}
	public String getHomeDtlAddr() {
		return homeDtlAddr;
	}
	public void setHomeDtlAddr(String homeDtlAddr) {
		this.homeDtlAddr = homeDtlAddr;
	}
	public String getCellTidn() {
		return cellTidn;
	}
	public void setCellTidn(String cellTidn) {
		this.cellTidn = cellTidn;
	}
	public String getCellTexn() {
		return cellTexn;
	}
	public void setCellTexn(String cellTexn) {
		this.cellTexn = cellTexn;
	}
	public String getCellTlsn() {
		return cellTlsn;
	}
	public void setCellTlsn(String cellTlsn) {
		this.cellTlsn = cellTlsn;
	}
	public String getCustEmid() {
		return custEmid;
	}
	public void setCustEmid(String custEmid) {
		this.custEmid = custEmid;
	}
	public String getCustEmdn() {
		return custEmdn;
	}
	public void setCustEmdn(String custEmdn) {
		this.custEmdn = custEmdn;
	}
	public String getCiNo() {
		return ciNo;
	}
	public void setCiNo(String ciNo) {
		this.ciNo = ciNo;
	}
	public String getCustWtDttm() {
		return custWtDttm;
	}
	public void setCustWtDttm(String custWtDttm) {
		this.custWtDttm = custWtDttm;
	}
	public String getMbrJoinDt() {
		return mbrJoinDt;
	}
	public void setMbrJoinDt(String mbrJoinDt) {
		this.mbrJoinDt = mbrJoinDt;
	}
	public String getRnarCd() {
		return rnarCd;
	}
	public void setRnarCd(String rnarCd) {
		this.rnarCd = rnarCd;
	}
	public String getRnmAthtDt() {
		return rnmAthtDt;
	}
	public void setRnmAthtDt(String rnmAthtDt) {
		this.rnmAthtDt = rnmAthtDt;
	}
	public String getCustWtYn() {
		return custWtYn;
	}
	public void setCustWtYn(String custWtYn) {
		this.custWtYn = custWtYn;
	}
	public String getOfcBscsAddr() {
		return ofcBscsAddr;
	}
	public void setOfcBscsAddr(String ofcBscsAddr) {
		this.ofcBscsAddr = ofcBscsAddr;
	}
	public String getOfcDtlAddr() {
		return ofcDtlAddr;
	}
	public void setOfcDtlAddr(String ofcDtlAddr) {
		this.ofcDtlAddr = ofcDtlAddr;
	}
	public String getOfcZip() {
		return ofcZip;
	}
	public void setOfcZip(String ofcZip) {
		this.ofcZip = ofcZip;
	}
	public String getAddrXcrd() {
		return addrXcrd;
	}
	public void setAddrXcrd(String addrXcrd) {
		this.addrXcrd = addrXcrd;
	}
	public String getAddrYcrd() {
		return addrYcrd;
	}
	public void setAddrYcrd(String addrYcrd) {
		this.addrYcrd = addrYcrd;
	}
	public String getRfrsCd() {
		return rfrsCd;
	}
	public void setRfrsCd(String rfrsCd) {
		this.rfrsCd = rfrsCd;
	}
	public String getBlmnNo() {
		return blmnNo;
	}
	public void setBlmnNo(String blmnNo) {
		this.blmnNo = blmnNo;
	}
	public String getAdclCd() {
		return adclCd;
	}
	public void setAdclCd(String adclCd) {
		this.adclCd = adclCd;
	}
	public String getAdocCd() {
		return adocCd;
	}
	public void setAdocCd(String adocCd) {
		this.adocCd = adocCd;
	}
	public String getDrccCd() {
		return drccCd;
	}
	public void setDrccCd(String drccCd) {
		this.drccCd = drccCd;
	}
	public String getDrcsRegDt() {
		return drcsRegDt;
	}
	public void setDrcsRegDt(String drcsRegDt) {
		this.drcsRegDt = drcsRegDt;
	}
	public String getJoinChCd() {
		return joinChCd;
	}
	public void setJoinChCd(String joinChCd) {
		this.joinChCd = joinChCd;
	}
	public String getJoinPrtnId() {
		return joinPrtnId;
	}
	public void setJoinPrtnId(String joinPrtnId) {
		this.joinPrtnId = joinPrtnId;
	}
	public String getJndvCd() {
		return jndvCd;
	}
	public void setJndvCd(String jndvCd) {
		this.jndvCd = jndvCd;
	}
	public String getRsltMsg() {
		return rsltMsg;
	}
	public void setRsltMsg(String rsltMsg) {
		this.rsltMsg = rsltMsg;
	}
	public String getRsltCd() {
		return rsltCd;
	}
	public void setRsltCd(String rsltCd) {
		this.rsltCd = rsltCd;
	}
	public String getChCd() {
		return chCd;
	}
	public void setChCd(String chCd) {
		this.chCd = chCd;
	}
	public String getReturnUrl() {
		return returnUrl;
	}
	public void setReturnUrl(String returnUrl) {
		this.returnUrl = returnUrl;
	}
	public String getIcsgCd() {
		return icsgCd;
	}
	public void setIcsgCd(String icsgCd) {
		this.icsgCd = icsgCd;
	}
	public String getFscrId() {
		return fscrId;
	}
	public void setFscrId(String fscrId) {
		this.fscrId = fscrId;
	}
	public String getFscrTsp() {
		return fscrTsp;
	}
	public void setFscrTsp(String fscrTsp) {
		this.fscrTsp = fscrTsp;
	}
	public String getLschId() {
		return lschId;
	}
	public void setLschId(String lschId) {
		this.lschId = lschId;
	}
	public String getLschTsp() {
		return lschTsp;
	}
	public void setLschTsp(String lschTsp) {
		this.lschTsp = lschTsp;
	}
	public String getSlccCd() {
		return slccCd;
	}
	public void setSlccCd(String slccCd) {
		this.slccCd = slccCd;
	}
	public String getPsnDtbr() {
		return psnDtbr;
	}
	public void setPsnDtbr(String psnDtbr) {
		this.psnDtbr = psnDtbr;
	}
	public String getWdanDt() {
		return wdanDt;
	}
	public void setWdanDt(String wdanDt) {
		this.wdanDt = wdanDt;
	}
	public String getJobCd() {
		return jobCd;
	}
	public void setJobCd(String jobCd) {
		this.jobCd = jobCd;
	}
	public String getFstPtAcmlDt() {
		return fstPtAcmlDt;
	}
	public void setFstPtAcmlDt(String fstPtAcmlDt) {
		this.fstPtAcmlDt = fstPtAcmlDt;
	}
	public String getLstPtAcmlDt() {
		return lstPtAcmlDt;
	}
	public void setLstPtAcmlDt(String lstPtAcmlDt) {
		this.lstPtAcmlDt = lstPtAcmlDt;
	}
	public String getFstPurDt() {
		return fstPurDt;
	}
	public void setFstPurDt(String fstPurDt) {
		this.fstPurDt = fstPurDt;
	}
	public String getLstPurDt() {
		return lstPurDt;
	}
	public void setLstPurDt(String lstPurDt) {
		this.lstPurDt = lstPurDt;
	}
	public String getWireTidn() {
		return wireTidn;
	}
	public void setWireTidn(String wireTidn) {
		this.wireTidn = wireTidn;
	}
	public String getWireTexn() {
		return wireTexn;
	}
	public void setWireTexn(String wireTexn) {
		this.wireTexn = wireTexn;
	}
	public String getWireTlsn() {
		return wireTlsn;
	}
	public void setWireTlsn(String wireTlsn) {
		this.wireTlsn = wireTlsn;
	}
	public String getLstCnttDt() {
		return lstCnttDt;
	}
	public void setLstCnttDt(String lstCnttDt) {
		this.lstCnttDt = lstCnttDt;
	}
	public String getLstChCd() {
		return lstChCd;
	}
	public void setLstChCd(String lstChCd) {
		this.lstChCd = lstChCd;
	}
	public String getChcsNo() {
		return chcsNo;
	}
	public void setChcsNo(String chcsNo) {
		this.chcsNo = chcsNo;
	}
	public String getSdtpCd() {
		return sdtpCd;
	}
	public void setSdtpCd(String sdtpCd) {
		this.sdtpCd = sdtpCd;
	}
	public String getChk() {
		return chk;
	}
	public void setChk(String chk) {
		this.chk = chk;
	}
	public String getIncsCardNoEc() {
		return incsCardNoEc;
	}
	public void setIncsCardNoEc(String incsCardNoEc) {
		this.incsCardNoEc = incsCardNoEc;
	}
	public String getDmOptiYn() {
		return dmOptiYn;
	}
	public void setDmOptiYn(String dmOptiYn) {
		this.dmOptiYn = dmOptiYn;
	}
	public String getSmsOptiYn() {
		return smsOptiYn;
	}
	public void setSmsOptiYn(String smsOptiYn) {
		this.smsOptiYn = smsOptiYn;
	}
	public String getRnarCdYn() {
		return rnarCdYn;
	}
	public void setRnarCdYn(String rnarCdYn) {
		this.rnarCdYn = rnarCdYn;
	}
	public String getAtclCdNm() {
		return atclCdNm;
	}
	public void setAtclCdNm(String atclCdNm) {
		this.atclCdNm = atclCdNm;
	}
	public String getCsstCd() {
		return csstCd;
	}
	public void setCsstCd(String csstCd) {
		this.csstCd = csstCd;
	}
	public String getAthtCellTidn() {
		return athtCellTidn;
	}
	public void setAthtCellTidn(String athtCellTidn) {
		this.athtCellTidn = athtCellTidn;
	}
	public String getDlplZip() {
		return dlplZip;
	}
	public void setDlplZip(String dlplZip) {
		this.dlplZip = dlplZip;
	}
	public String getDlplBscsAddr() {
		return dlplBscsAddr;
	}
	public void setDlplBscsAddr(String dlplBscsAddr) {
		this.dlplBscsAddr = dlplBscsAddr;
	}
	public String getDlplDtAddr() {
		return dlplDtAddr;
	}
	public void setDlplDtAddr(String dlplDtAddr) {
		this.dlplDtAddr = dlplDtAddr;
	}
	public String getDelYTn() {
		return delYTn;
	}
	public void setDelYTn(String delYTn) {
		this.delYTn = delYTn;
	}
	public String getAthtCellTexn() {
		return athtCellTexn;
	}
	public void setAthtCellTexn(String athtCellTexn) {
		this.athtCellTexn = athtCellTexn;
	}
	public String getAthtCellTlsn() {
		return athtCellTlsn;
	}
	public void setAthtCellTlsn(String athtCellTlsn) {
		this.athtCellTlsn = athtCellTlsn;
	}
	public String getChCdNm() {
		return chCdNm;
	}
	public void setChCdNm(String chCdNm) {
		this.chCdNm = chCdNm;
	}
	public String getTmOptiYn() {
		return tmOptiYn;
	}
	public void setTmOptiYn(String tmOptiYn) {
		this.tmOptiYn = tmOptiYn;
	}
	public String getEmlOptiYn() {
		return emlOptiYn;
	}
	public void setEmlOptiYn(String emlOptiYn) {
		this.emlOptiYn = emlOptiYn;
	}
	public String getCsstCdYn() {
		return csstCdYn;
	}
	public void setCsstCdYn(String csstCdYn) {
		this.csstCdYn = csstCdYn;
	}
	public String getAthtDt() {
		return athtDt;
	}
	public void setAthtDt(String athtDt) {
		this.athtDt = athtDt;
	}
	public String getUserPwdEc() {
		return userPwdEc;
	}
	public void setUserPwdEc(String userPwdEc) {
		this.userPwdEc = userPwdEc;
	}
	public String getCustInfrChgSn() {
		return custInfrChgSn;
	}
	public void setCustInfrChgSn(String custInfrChgSn) {
		this.custInfrChgSn = custInfrChgSn;
	}
	public String getTncaDttm() {
		return tncaDttm;
	}
	public void setTncaDttm(String tncaDttm) {
		this.tncaDttm = tncaDttm;
	}
	public String getHqEmpId() {
		return hqEmpId;
	}
	public void setHqEmpId(String hqEmpId) {
		this.hqEmpId = hqEmpId;
	}
	public String getFstCnttPrtnId() {
		return fstCnttPrtnId;
	}
	public void setFstCnttPrtnId(String fstCnttPrtnId) {
		this.fstCnttPrtnId = fstCnttPrtnId;
	}
	public String getPrtnNm() {
		return prtnNm;
	}
	public void setPrtnNm(String prtnNm) {
		this.prtnNm = prtnNm;
	}
	public String getChgChCd() {
		return chgChCd;
	}
	public void setChgChCd(String chgChCd) {
		this.chgChCd = chgChCd;
	}
	public String getJoinCnt() {
		return joinCnt;
	}
	public void setJoinCnt(String joinCnt) {
		this.joinCnt = joinCnt;
	}
	
}
