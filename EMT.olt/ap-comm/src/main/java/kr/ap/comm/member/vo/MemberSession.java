package kr.ap.comm.member.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import net.g1project.ecp.api.model.ap.ap.ApMember;

import java.io.Serializable;

public class MemberSession implements Serializable {

	/**
	 * BO에서 저장된 항목
	 */
	private Long member_sn;

	private ApMember member;
	/**
	 * FO화면에서 사용할 항목
	 */
	private String user_certNum;
	private String user_check1;
	private String user_check2;
	private String user_check3;

	private String user_ciNo;
	private String user_incsNo;

	private String user_joinType;

	private String accessToken;
	private String refreshToken;
	private String autoLoginToken;

	private String user_incsCardNoEc;

	public Long getMember_sn() {
		return member_sn;
	}

	public void setMember_sn(Long member_sn) {
		this.member_sn = member_sn;
	}

	@JsonIgnore
	public boolean isMember() {
		return this.member_sn != null;
	}

	public ApMember getMember() {
		return member;
	}

	public void setMember(ApMember member) {
		this.member = member;
	}

	public String getUser_certNum() {
		return user_certNum;
	}

	public void setUser_certNum(String user_certNum) {
		this.user_certNum = user_certNum;
	}

	public String getUser_check1() {
		return user_check1;
	}

	public void setUser_check1(String user_check1) {
		this.user_check1 = user_check1;
	}

	public String getUser_check2() {
		return user_check2;
	}

	public void setUser_check2(String user_check2) {
		this.user_check2 = user_check2;
	}

	public String getUser_check3() {
		return user_check3;
	}

	public void setUser_check3(String user_check3) {
		this.user_check3 = user_check3;
	}

	public String getUser_ciNo() {
		return user_ciNo;
	}

	public void setUser_ciNo(String user_ciNo) {
		this.user_ciNo = user_ciNo;
	}

	public String getUser_incsNo() {
		return user_incsNo;
	}

	public void setUser_incsNo(String user_incsNo) {
		this.user_incsNo = user_incsNo;
	}

	public String getUser_joinType() {
		return user_joinType;
	}

	public void setUser_joinType(String user_joinType) {
		this.user_joinType = user_joinType;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public String getAutoLoginToken() {
		return autoLoginToken;
	}

	public void setAutoLoginToken(String autoLoginToken) {
		this.autoLoginToken = autoLoginToken;
	}

	public String getUser_incsCardNoEc() {
		return user_incsCardNoEc;
	}

	public void setUser_incsCardNoEc(String user_incsCardNoEc) {
		this.user_incsCardNoEc = user_incsCardNoEc;
	}
}
