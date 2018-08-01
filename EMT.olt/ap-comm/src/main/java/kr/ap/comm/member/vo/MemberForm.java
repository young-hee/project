package kr.ap.comm.member.vo;

import kr.ap.comm.support.common.BaseForm;

public class MemberForm extends BaseForm {

    private String validFlag;

	private String chcsNo;
	private String custNm;
    private String psnDtbr;
    private String athtDtbr;
    private String frclCd;
    private String sxclCd;
    private String phoneCorp;
    private String cellNum;

    private String frgrRegNum;

    private String userPwdEc;
    private String userPwdEcChk;

    private String custEmid;
    
    private Boolean terms;
    private Boolean sms;
    private Boolean email;

    private String[] termsChk;
    private String[] optionYn;

    public String getValidFlag() {
        return validFlag;
    }

    public void setValidFlag(String validFlag) {
        this.validFlag = validFlag;
    }

    public String getChcsNo() {
        return chcsNo;
    }

    public void setChcsNo(String chcsNo) {
        this.chcsNo = chcsNo;
    }

    public String getCustNm() {
        return custNm;
    }

    public void setCustNm(String custNm) {
        this.custNm = custNm;
    }

    public String getPsnDtbr() {
        return psnDtbr;
    }

    public void setPsnDtbr(String psnDtbr) {
        this.psnDtbr = psnDtbr;
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

    public String getPhoneCorp() {
        return phoneCorp;
    }

    public void setPhoneCorp(String phoneCorp) {
        this.phoneCorp = phoneCorp;
    }

    public String getCellNum() {
        return cellNum;
    }

    public void setCellNum(String cellNum) {
        this.cellNum = cellNum;
    }

    public String getFrgrRegNum() {
        return frgrRegNum;
    }

    public void setFrgrRegNum(String frgrRegNum) {
        this.frgrRegNum = frgrRegNum;
    }

    public String getUserPwdEc() {
        return userPwdEc;
    }

    public void setUserPwdEc(String userPwdEc) {
        this.userPwdEc = userPwdEc;
    }

    public String getUserPwdEcChk() {
        return userPwdEcChk;
    }

    public void setUserPwdEcChk(String userPwdEcChk) {
        this.userPwdEcChk = userPwdEcChk;
    }

    public String getCustEmid() {
        return custEmid;
    }

    public void setCustEmid(String custEmid) {
        this.custEmid = custEmid;
    }

    public String[] getTermsChk() {
        return termsChk;
    }

    public void setTermsChk(String[] termsChk) {
        this.termsChk = termsChk;
    }

	public String[] getOptionYn() {
		return optionYn;
	}

	public void setOptionYn(String[] optionYn) {
		this.optionYn = optionYn;
	}

	public Boolean getTerms() {
		return terms;
	}

	public void setTerms(Boolean terms) {
		this.terms = terms;
	}

	public Boolean getSms() {
		return sms;
	}

	public void setSms(Boolean sms) {
		this.sms = sms;
	}

	public Boolean getEmail() {
		return email;
	}

	public void setEmail(Boolean email) {
		this.email = email;
	}
    
}
