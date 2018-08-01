package kr.ap.comm.api.vo;

public class CicuedCuCardTcVo {
	private	String	incsNo;			//	통합고객번호	고객의유일한식별번호	필수
	private	String	cardIsSrno;		//	카드발급일련번호	카드가발급된순번	
	private	String	chCd;			//	경로구분코드(COM_CAT_CD:10098)	제휴사별경로채널코드	필수
	private	String	incsCardNoEc;	//	통합고객카드번호	통합고객가입시점에고객에게발급되는뷰티포인트카드번호또는제휴사(카드사등)에서발급한카드번호	
	private	String	incsCardNm;		//	통합고객카드명	통합고객가입시점에고객에게발급되는카드명	
	private	String	cdclCd;			//	카드구분코드(COM_CAT_CD:10106)	통합고객이사용하는카드종류AP : 01,제휴사: 02	필수
	private	String	cdstCd;			//	카드상태코드(COM_CAT_CD:10140)	정상:1 ,분실:2,사용중지:3,해지:4	필수
	private	String	rprsCardNoYn;	//	대표카드번호여부	고객이실사용하는카드여부(Y/N)	필수
	private	String	cardPwdEc;		//	카드비밀번호	고객이카드사용보안유지를위해기입한비밀번호	
	private	String	cardIsPrtnId;	//	카드발급거래처ID	통합고객이사용하는카드의발급당시거래처ID	
	private	String	cardIsPrtnNm;	//	카드발급거래처명	통합고객이사용하는카드의발급당시거래처명	
	private	String	fscrId;			//	최초생성자ID	최초생성ID	필수
	private	String	lschId;			//	최종변경ID	최종변경ID	필수
	public String getIncsNo() {
		return incsNo;
	}
	public void setIncsNo(String incsNo) {
		this.incsNo = incsNo;
	}
	public String getCardIsSrno() {
		return cardIsSrno;
	}
	public void setCardIsSrno(String cardIsSrno) {
		this.cardIsSrno = cardIsSrno;
	}
	public String getChCd() {
		return chCd;
	}
	public void setChCd(String chCd) {
		this.chCd = chCd;
	}
	public String getIncsCardNoEc() {
		return incsCardNoEc;
	}
	public void setIncsCardNoEc(String incsCardNoEc) {
		this.incsCardNoEc = incsCardNoEc;
	}
	public String getIncsCardNm() {
		return incsCardNm;
	}
	public void setIncsCardNm(String incsCardNm) {
		this.incsCardNm = incsCardNm;
	}
	public String getCdclCd() {
		return cdclCd;
	}
	public void setCdclCd(String cdclCd) {
		this.cdclCd = cdclCd;
	}
	public String getCdstCd() {
		return cdstCd;
	}
	public void setCdstCd(String cdstCd) {
		this.cdstCd = cdstCd;
	}
	public String getRprsCardNoYn() {
		return rprsCardNoYn;
	}
	public void setRprsCardNoYn(String rprsCardNoYn) {
		this.rprsCardNoYn = rprsCardNoYn;
	}
	public String getCardPwdEc() {
		return cardPwdEc;
	}
	public void setCardPwdEc(String cardPwdEc) {
		this.cardPwdEc = cardPwdEc;
	}
	public String getCardIsPrtnId() {
		return cardIsPrtnId;
	}
	public void setCardIsPrtnId(String cardIsPrtnId) {
		this.cardIsPrtnId = cardIsPrtnId;
	}
	public String getCardIsPrtnNm() {
		return cardIsPrtnNm;
	}
	public void setCardIsPrtnNm(String cardIsPrtnNm) {
		this.cardIsPrtnNm = cardIsPrtnNm;
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
	
	
}
