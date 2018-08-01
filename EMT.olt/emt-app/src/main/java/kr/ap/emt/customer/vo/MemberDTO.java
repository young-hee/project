package kr.ap.emt.customer.vo;

import java.util.Date;

public class MemberDTO {
    private Long memberSn;
    private String memberId;
    private String memberName;
    private String phoneNumber;
    private String password;
    private Boolean loginYn;
    private Boolean sleepYn;
    private Boolean oldYn;
    private Boolean changePwYn;
    private String athtDtbr;
    private Date latestLoginDt;
    private Date registeredDt;
    private String sxclCd;
    private String nickName;
    
    public Long getMemberSn() {
        return memberSn;
    }

    public void setMemberSn(Long memberSn) {
        this.memberSn = memberSn;
    }

    public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getLoginYn() {
        return loginYn;
    }

    public void setLoginYn(Boolean loginYn) {
        this.loginYn = loginYn;
    }

	public Boolean getSleepYn() {
		return sleepYn;
	}

	public void setSleepYn(Boolean sleepYn) {
		this.sleepYn = sleepYn;
	}

	public Boolean getOldYn() {
		return oldYn;
	}

	public void setOldYn(Boolean oldYn) {
		this.oldYn = oldYn;
	}

	public Boolean getChangePwYn() {
		return changePwYn;
	}

	public void setChangePwYn(Boolean changePwYn) {
		this.changePwYn = changePwYn;
	}

	public Date getLatestLoginDt() {
		return latestLoginDt;
	}

	public void setLatestLoginDt(Date latestLoginDt) {
		this.latestLoginDt = latestLoginDt;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Date getRegisteredDt() {
		return registeredDt;
	}

	public void setRegisteredDt(Date registeredDt) {
		this.registeredDt = registeredDt;
	}

	public String getSxclCd() {
		return sxclCd;
	}

	public void setSxclCd(String sxclCd) {
		this.sxclCd = sxclCd;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getAthtDtbr() {
		return athtDtbr;
	}

	public void setAthtDtbr(String athtDtbr) {
		this.athtDtbr = athtDtbr;
	}
    
}
