package kr.ap.comm.api.vo;

/**
 * 포인트적립/취소/적립망취소/부분취소 등 요청.
 * @author pollak
 *
 */
public class CicuedTrBrkdTcVo {
	private	String	tlmcCd;			//	업무구분코드	적립:10, 사용:20
	private	String	tlmtCd;			//	전문유형코드	정상:01, 취소:02, 망취소:03, 부분취소:04, 부분망취소:05	
	private	String	xttrNo;			//	거래번호		TIMESTAMP(20)+거래처코드(10)
	private	String	incsNo;			//	통합고객번호	YYYYMMDD
	private	String	custTrDt;		//	발생일자		HH24MISS
	private	String	trTime;			//	발생시간	
	private	String	chCd;			//	채널코드	
	private	String	rqPrtnId;		//	요청매장코드	
	private	String	acmlAplyPt;		//	적립적용포인트	
	private String	usgAplyPt;		//	사용적용포인트
	private	String	ttSalAmt;		//	매출금액		0'
	private	String	xttpCd;			//	거래유형코드	AS-IS PTTP '121'
	private	String	ornXttrNo;		//	원거래추적번호	망취소일때만필수
	private	String	ornTrApvlDt;	//	원거래승인일자	취소일때만필수
	private	String	ornXtapNo;		//	원거래승인번호	취소일때만필수
	private String	ptgfTgtIncsNo;	//	선물받는 자 통합고객번호		"선물받는 자가 회원일 경우 필수 비회원일 경우 '0' default 필수"
	private String	nmbrPtgfCellPhnm;//	선물받는 비회원 휴대전화번호 	선물받는 자가 비회원일 경우 필수
	private String	nmbrPtgfCustNm;	//	선물받는 비회원 이름			선물받는 자가 비회원일 경우 필수
	private	String	mixStlmYn;		//	복합결제여부	
	private	String	trRsnTxt;		//	거래사유구분	
	private	String	drfcCd;			//	직가맹구분		직영:1 ,가맹:2,기타:9
	private	String	partXttrNo;		//	부분취소추적번호		부분취소일경우만필수
	private	String	ornPartXttrNo;	//	원거래부분취소추적번호	부분취소망취소일경우만필수
	private String	prtnNm;
	private String	fscrId;
	private String	lschId;
	public String getTlmcCd() {
		return tlmcCd;
	}
	public void setTlmcCd(String tlmcCd) {
		this.tlmcCd = tlmcCd;
	}
	public String getTlmtCd() {
		return tlmtCd;
	}
	public void setTlmtCd(String tlmtCd) {
		this.tlmtCd = tlmtCd;
	}
	public String getXttrNo() {
		return xttrNo;
	}
	public void setXttrNo(String xttrNo) {
		this.xttrNo = xttrNo;
	}
	public String getIncsNo() {
		return incsNo;
	}
	public void setIncsNo(String incsNo) {
		this.incsNo = incsNo;
	}
	public String getCustTrDt() {
		return custTrDt;
	}
	public void setCustTrDt(String custTrDt) {
		this.custTrDt = custTrDt;
	}
	public String getTrTime() {
		return trTime;
	}
	public void setTrTime(String trTime) {
		this.trTime = trTime;
	}
	public String getChCd() {
		return chCd;
	}
	public void setChCd(String chCd) {
		this.chCd = chCd;
	}
	public String getRqPrtnId() {
		return rqPrtnId;
	}
	public void setRqPrtnId(String rqPrtnId) {
		this.rqPrtnId = rqPrtnId;
	}
	public String getAcmlAplyPt() {
		return acmlAplyPt;
	}
	public void setAcmlAplyPt(String acmlAplyPt) {
		this.acmlAplyPt = acmlAplyPt;
	}
	public String getTtSalAmt() {
		return ttSalAmt;
	}
	public void setTtSalAmt(String ttSalAmt) {
		this.ttSalAmt = ttSalAmt;
	}
	public String getXttpCd() {
		return xttpCd;
	}
	public void setXttpCd(String xttpCd) {
		this.xttpCd = xttpCd;
	}
	public String getOrnXttrNo() {
		return ornXttrNo;
	}
	public void setOrnXttrNo(String ornXttrNo) {
		this.ornXttrNo = ornXttrNo;
	}
	public String getOrnTrApvlDt() {
		return ornTrApvlDt;
	}
	public void setOrnTrApvlDt(String ornTrApvlDt) {
		this.ornTrApvlDt = ornTrApvlDt;
	}
	public String getOrnXtapNo() {
		return ornXtapNo;
	}
	public void setOrnXtapNo(String ornXtapNo) {
		this.ornXtapNo = ornXtapNo;
	}
	public String getMixStlmYn() {
		return mixStlmYn;
	}
	public void setMixStlmYn(String mixStlmYn) {
		this.mixStlmYn = mixStlmYn;
	}
	public String getTrRsnTxt() {
		return trRsnTxt;
	}
	public void setTrRsnTxt(String trRsnTxt) {
		this.trRsnTxt = trRsnTxt;
	}
	public String getDrfcCd() {
		return drfcCd;
	}
	public void setDrfcCd(String drfcCd) {
		this.drfcCd = drfcCd;
	}
	public String getPartXttrNo() {
		return partXttrNo;
	}
	public void setPartXttrNo(String partXttrNo) {
		this.partXttrNo = partXttrNo;
	}
	public String getOrnPartXttrNo() {
		return ornPartXttrNo;
	}
	public void setOrnPartXttrNo(String ornPartXttrNo) {
		this.ornPartXttrNo = ornPartXttrNo;
	}
	public String getPtgfTgtIncsNo() {
		return ptgfTgtIncsNo;
	}
	public void setPtgfTgtIncsNo(String ptgfTgtIncsNo) {
		this.ptgfTgtIncsNo = ptgfTgtIncsNo;
	}
	public String getNmbrPtgfCellPhnm() {
		return nmbrPtgfCellPhnm;
	}
	public void setNmbrPtgfCellPhnm(String nmbrPtgfCellPhnm) {
		this.nmbrPtgfCellPhnm = nmbrPtgfCellPhnm;
	}
	public String getNmbrPtgfCustNm() {
		return nmbrPtgfCustNm;
	}
	public void setNmbrPtgfCustNm(String nmbrPtgfCustNm) {
		this.nmbrPtgfCustNm = nmbrPtgfCustNm;
	}
	public String getPrtnNm() {
		return prtnNm;
	}
	public void setPrtnNm(String prtnNm) {
		this.prtnNm = prtnNm;
	}
	public String getFscrId() {
		return fscrId;
	}
	public void setFscrId(String fscrId) {
		this.fscrId = fscrId;
	}
	public String getLschId() {
		return lschId;
	}
	public void setLschId(String lschId) {
		this.lschId = lschId;
	}
	public String getUsgAplyPt() {
		return usgAplyPt;
	}
	public void setUsgAplyPt(String usgAplyPt) {
		this.usgAplyPt = usgAplyPt;
	}
	
	
}
