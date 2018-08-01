package kr.ap.comm.api.vo;

import java.util.List;

public class CicuemCuInfTotTcVo {
	
	/**
	 *CI 번호.
	 */
	private String ciNo;
	/**
	 * 고객
	 */
	private String custNm;
	/**
	 * 통합고객번
	 */
	private String incsNo;
	/**
	 * 외국인 구분 코드<br>
	 * K : 내국인, F : 외국
	 */
	private String frclCd;
	/**
	 * 성별 구분 코드<br>
	 * M : 남성, F : 여성.
	 */
	private String sxclCd;
	/**
	 * 법정생년월일<br>
	 * ex:) 870609
	 */
	private String athtDtbr;
	/**
	 * 휴대폰식별전화번호<br>
	 * ex:) 010, 011, 017
	 */
	private String cellTidn;
	/**
	 * 휴대폰국전화번호<br>
	 * ex:)1234, 4425
	 */
	private String cellTexn;
	/**
	 * 휴대폰끝전화번호<br>
	 * ex:)1234, 4425
	 */
	private String cellTlsn;
	/**
	 * 가입채널코드<br>
	 * ex:)004
	 */
	private String joinChCd;
	/**
	 * 가입매장아이디<br>
	 * ex:)11000825
	 */
	private String joinPrtnId;
	/**
	 * 통신사<br>
	 * ex:)SKT/KTF/LGT
	 */
	private String phoneCorp;
	/**
	 * ReturnUrl
	 */
	private String returnUrl;
	/**
	 * 인증번호.
	 */
	private String r_certNum;
	/**
	 * 인증결과.
	 */
	private String r_result;
	/**
	 *  인증결과코드.
	 */
	private String r_rsltCd;
	/**
	 * kmc 체크1<br>
	 * 인증번호 확인결과 전송 및 SMS재전송 요청을 위한 파라미터 1
	 */
	private String r_check_1;
	/**
	 * kmc 체크2<br>
	 * 인증번호 확인결과 전송 및 SMS재전송 요청을 위한 파라미터 2
	 */
	private String r_check_2;
	/**
	 * kmc 체크3<br>
	 * 인증번호 확인결과 전송 및 SMS재전송 요청을 위한 파라미터 3
	 */
	private String r_check_3;
	/**
	 * 결과코드
	 */
	private String rsltCd;
	/**
	 * 결과메시지
	 */
	private String rsltMsg;
	/**
	 * 입력한 sms인증번호
	 */
	private String smsNum;
	/**
	 * 외국인등록번호 앞번호.
	 */
	private String frgrRegNum1;
	/**
	 * 외국인등록번호 뒷번호.
	 */
	private String frgrRegNum2;
	
	
	/**
	 * 우편물수신처분구분코드.<br>
	 * 자택 : H, 직장 : C, 기타
	 */
	private String pmdcCd;
	/**
	 * 자택우편번호.
	 */
	private String homeZip;
	/**
	 * 자택기본주소.
	 */
	private String homeBscsAddr;
	/**
	 * 자택상세주소.
	 */
	private String homeDtlAddr;
	/**
	 * 고객이메일계정.
	 */
	private String custEmid;
	/**
	 * 고객이메일번지.
	 */
	private String custEmdn;
	/**
	 * ??
	 */
	private String custWtDttm;
	/**
	 * 회원가입일자.
	 */
	private String mbrJoinDt;
	/**
	 * 실명인증결과코드.<br>
	 * COM_CAT_CD : 10155 (1:실명인증성공, 2:실명인증실패, 3: 해당자료없음, 4:통신오류, 5:체크썸오류, 50:명의도용차단가입자)
	 */
	private String rnarCd;
	/**
	 * 실명인증일자.
	 */
	private String rnmAthtDt;
	/**
	 * 고객탈퇴여부.
	 */
	private String custWtYn;
	/**
	 * 직장기본주소.
	 */
	private String ofcBscsAddr;
	/**
	 * 직장상세주소.
	 */
	private String ofcDtlAddr;
	/**
	 * 직장우편주소.
	 */
	private String ofcZip;
	/**
	 * 주소X좌표.
	 */
	private String addrXcrd;
	/**
	 * 주소Y좌표.
	 */
	private String addrYcrd;
	/**
	 * 정제결과코드.
	 */
	private String rfrsCd;
	/**
	 * 건물관리번호.
	 */
	private String blmnNo;
	/**
	 * 주소구분코드.<br>
	 * 1 : 입력지번, 2 : 입력도로명, 3 : 표준지번, 4 : 표준도로명
	 */
	private String adclCd;
	/**
	 * 주소입수구분코드.<br>
	 * 1 : 온라인, 2 : 일괄전환, 3 : 대외, 4 : 기타
	 */
	private String adocCd;
	/**
	 * 가입디바이스코드.<br>
	 * 고객가입시 사용한 매체 관리를 위한 코드(W:WEB, M:MOBILE, A:APP)
	 */
	private String jndvCd;
	/**
	 * 휴먼고객구분코<br>
	 * Y : 휴면, A : 예정
	 */
	private String drccCd;
	/**
	 * 휴먼고객등록일자.<br>
	 * 휴면고객으로 등록되는 날짜(휴면고객구분값이 예정인 경우는 휴면고객등록예정일자)
	 */
    private String drcsRegDt;
    /**
     * 경로구분코드.
     */
    private String chCd;
    
    private String kmcis_result;
    private String kmcis_error;
    private String message;
    /**
     * 개인생년월일.
     */
    private String psnDtbr;
    /**
     * SMS 인증 코드(??).
     */
    private String r_authNo;
    private String ci;
    private String joinTyp;
    private String certiCheck;
    private String joincnt;
    /**
     * 경로고객번호.
     */
    private String chcsNo;
    /**
     * 통합고객카드번호.<br>
     * 고객의 가입 경로에서 발생된 뷰티포인트 멤버십카드
     */
    private String incsCardNoEc;
    /**
     * 최초생성ID
     */
    private String fscrId;
    /**
     * 최초생성시각.
     */
    private String fscrTsp;
    /**
     * 최종변경ID
     */
    private String lschId;
    /**
     * 최종변경시각.
     */
    private String lschTsp;
    /**
     * 표준시간대코드.
     */
    private String sdtpCd;
    /**
     * 포인트 잔액.
     */
    private String rmnPt;
    /**
     * 포인트 적립률.
     */
    private String ptAcmlRt;
    /**
     * 휴대폰인증그분코드.
     */
    private String atclCd;
    /**
     * 인증번호.
     */
    private String athtNo;
    /**
     * 고객상태코드.
     */
    private String csstCd;
    /**
     * 대표카드번호여부.
     */
    private String rprsCardNoYn;

	private String rnarCdYn;
	/**
	 * DM수신동의여부.
	 */
	private String dmOptiYn;
	/**
	 * SMS수신동의여부.
	 */
	private String smsOptiYn;
	/**
	 * 최초접촉거래처
	 */
	private String fstCnttPrtnId;
	

	private List<CicuedCuTncaTcVo> cicuedCuTncaTcVo;
    private CicuemCuAdtInfTcVo cicuemCuAdtInfTcVo;
    private List<CicuedCuChCsTcVo> cicuedCuChCsTcVo;
    private List<CicuemCuOptiCsTcVo> cicuemCuOptiCsTcVo;
    private List<CicuedCuChArrayTcVo> cicuedCuChArrayTcVo;
	private CicuemCuOptiCsTcVo cicuemCuOptiTcVo;

	public String getFstCnttPrtnId() {
		return fstCnttPrtnId;
	}

	public void setFstCnttPrtnId(String fstCnttPrtnId) {
		this.fstCnttPrtnId = fstCnttPrtnId;
	}

	public String getCiNo() {
		return ciNo;
	}

	public void setCiNo(String ciNo) {
		this.ciNo = ciNo;
	}

	public String getCustNm() {
		return custNm;
	}

	public void setCustNm(String custNm) {
		this.custNm = custNm;
	}

	public String getIncsNo() {
		return incsNo;
	}

	public void setIncsNo(String incsNo) {
		this.incsNo = incsNo;
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

	public String getAthtDtbr() {
		return athtDtbr;
	}

	public void setAthtDtbr(String athtDtbr) {
		this.athtDtbr = athtDtbr;
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

	public String getPhoneCorp() {
		return phoneCorp;
	}

	public void setPhoneCorp(String phoneCorp) {
		this.phoneCorp = phoneCorp;
	}

	public String getReturnUrl() {
		return returnUrl;
	}

	public void setReturnUrl(String returnUrl) {
		this.returnUrl = returnUrl;
	}

	public String getR_certNum() {
		return r_certNum;
	}

	public void setR_certNum(String r_certNum) {
		this.r_certNum = r_certNum;
	}

	public String getR_result() {
		return r_result;
	}

	public void setR_result(String r_result) {
		this.r_result = r_result;
	}

	public String getR_rsltCd() {
		return r_rsltCd;
	}

	public void setR_rsltCd(String r_rsltCd) {
		this.r_rsltCd = r_rsltCd;
	}

	public String getR_check_1() {
		return r_check_1;
	}

	public void setR_check_1(String r_check_1) {
		this.r_check_1 = r_check_1;
	}

	public String getR_check_2() {
		return r_check_2;
	}

	public void setR_check_2(String r_check_2) {
		this.r_check_2 = r_check_2;
	}

	public String getR_check_3() {
		return r_check_3;
	}

	public void setR_check_3(String r_check_3) {
		this.r_check_3 = r_check_3;
	}

	public String getRsltCd() {
		return rsltCd;
	}

	public void setRsltCd(String rsltCd) {
		this.rsltCd = rsltCd;
	}

	public String getRsltMsg() {
		return rsltMsg;
	}

	public void setRsltMsg(String rsltMsg) {
		this.rsltMsg = rsltMsg;
	}

	public String getSmsNum() {
		return smsNum;
	}

	public void setSmsNum(String smsNum) {
		this.smsNum = smsNum;
	}

	public String getFrgrRegNum1() {
		return frgrRegNum1;
	}

	public void setFrgrRegNum1(String frgrRegNum1) {
		this.frgrRegNum1 = frgrRegNum1;
	}

	public String getFrgrRegNum2() {
		return frgrRegNum2;
	}

	public void setFrgrRegNum2(String frgrRegNum2) {
		this.frgrRegNum2 = frgrRegNum2;
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

	public String getHomeDtlAddr() {
		return homeDtlAddr;
	}

	public void setHomeDtlAddr(String homeDtlAddr) {
		this.homeDtlAddr = homeDtlAddr;
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

	public String getJndvCd() {
		return jndvCd;
	}

	public void setJndvCd(String jndvCd) {
		this.jndvCd = jndvCd;
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

	public String getChCd() {
		return chCd;
	}

	public void setChCd(String chCd) {
		this.chCd = chCd;
	}

	public String getKmcis_result() {
		return kmcis_result;
	}

	public void setKmcis_result(String kmcis_result) {
		this.kmcis_result = kmcis_result;
	}

	public String getKmcis_error() {
		return kmcis_error;
	}

	public void setKmcis_error(String kmcis_error) {
		this.kmcis_error = kmcis_error;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getPsnDtbr() {
		return psnDtbr;
	}

	public void setPsnDtbr(String psnDtbr) {
		this.psnDtbr = psnDtbr;
	}

	public String getR_authNo() {
		return r_authNo;
	}

	public void setR_authNo(String r_authNo) {
		this.r_authNo = r_authNo;
	}

	public String getCi() {
		return ci;
	}

	public void setCi(String ci) {
		this.ci = ci;
	}

	public String getJoinTyp() {
		return joinTyp;
	}

	public void setJoinTyp(String joinTyp) {
		this.joinTyp = joinTyp;
	}

	public String getCertiCheck() {
		return certiCheck;
	}

	public void setCertiCheck(String certiCheck) {
		this.certiCheck = certiCheck;
	}

	public String getJoincnt() {
		return joincnt;
	}

	public void setJoincnt(String joincnt) {
		this.joincnt = joincnt;
	}

	public String getChcsNo() {
		return chcsNo;
	}

	public void setChcsNo(String chcsNo) {
		this.chcsNo = chcsNo;
	}

	public String getIncsCardNoEc() {
		return incsCardNoEc;
	}

	public void setIncsCardNoEc(String incsCardNoEc) {
		this.incsCardNoEc = incsCardNoEc;
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

	public String getSdtpCd() {
		return sdtpCd;
	}

	public void setSdtpCd(String sdtpCd) {
		this.sdtpCd = sdtpCd;
	}

	public String getRmnPt() {
		return rmnPt;
	}

	public void setRmnPt(String rmnPt) {
		this.rmnPt = rmnPt;
	}

	public String getPtAcmlRt() {
		return ptAcmlRt;
	}

	public void setPtAcmlRt(String ptAcmlRt) {
		this.ptAcmlRt = ptAcmlRt;
	}

	public String getAtclCd() {
		return atclCd;
	}

	public void setAtclCd(String atclCd) {
		this.atclCd = atclCd;
	}

	public String getAthtNo() {
		return athtNo;
	}

	public void setAthtNo(String athtNo) {
		this.athtNo = athtNo;
	}

	public String getCsstCd() {
		return csstCd;
	}

	public void setCsstCd(String csstCd) {
		this.csstCd = csstCd;
	}

	public String getRprsCardNoYn() {
		return rprsCardNoYn;
	}

	public void setRprsCardNoYn(String rprsCardNoYn) {
		this.rprsCardNoYn = rprsCardNoYn;
	}

	public String getRnarCdYn() {
		return rnarCdYn;
	}

	public void setRnarCdYn(String rnarCdYn) {
		this.rnarCdYn = rnarCdYn;
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
	
	public List<CicuedCuTncaTcVo> getCicuedCuTncaTcVo() {
		return cicuedCuTncaTcVo;
	}

	public void setCicuedCuTncaTcVo(List<CicuedCuTncaTcVo> cicuedCuTncaTcVo) {
		this.cicuedCuTncaTcVo = cicuedCuTncaTcVo;
	}

	public CicuemCuAdtInfTcVo getCicuemCuAdtInfTcVo() {
		return cicuemCuAdtInfTcVo;
	}

	public void setCicuemCuAdtInfTcVo(CicuemCuAdtInfTcVo cicuemCuAdtInfTcVo) {
		this.cicuemCuAdtInfTcVo = cicuemCuAdtInfTcVo;
	}

	public List<CicuedCuChCsTcVo> getCicuedCuChCsTcVo() {
		return cicuedCuChCsTcVo;
	}

	public void setCicuedCuChCsTcVo(List<CicuedCuChCsTcVo> cicuedCuChCsTcVo) {
		this.cicuedCuChCsTcVo = cicuedCuChCsTcVo;
	}
	

	public List<CicuemCuOptiCsTcVo> getCicuemCuOptiCsTcVo() {
		return cicuemCuOptiCsTcVo;
	}

	public void setCicuemCuOptiCsTcVo(List<CicuemCuOptiCsTcVo> cicuemCuOptiCsTcVo) {
		this.cicuemCuOptiCsTcVo = cicuemCuOptiCsTcVo;
	}

	public List<CicuedCuChArrayTcVo> getCicuedCuChArrayTcVo() {
		return cicuedCuChArrayTcVo;
	}

	public void setCicuedCuChArrayTcVo(List<CicuedCuChArrayTcVo> cicuedCuChArrayTcVo) {
		this.cicuedCuChArrayTcVo = cicuedCuChArrayTcVo;
	}

	public void setCicuemCuOptiTcVo(CicuemCuOptiCsTcVo cicuemCuOptiTcVo) {
		this.cicuemCuOptiTcVo = cicuemCuOptiTcVo;
	}

	public CicuemCuOptiCsTcVo getCicuemCuOptiTcVo() {
		return cicuemCuOptiTcVo;
	}
	
}
