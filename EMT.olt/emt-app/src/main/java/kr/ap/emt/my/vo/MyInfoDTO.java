package kr.ap.emt.my.vo;

import java.util.List;

import net.g1project.ecp.api.model.ap.ap.MemberAddAttr;
import kr.ap.comm.api.vo.CicuemCuAdtInfTcVo;
import kr.ap.comm.api.vo.CicuemCuInfTotTcVo;

public class MyInfoDTO {
	
	private CicuemCuInfTotTcVo user;
	private List<TermsAgree> policy;
	private List<TermsAgree> receive;
	private List<TermsAgree> apReceive;
	private List<TermsAgree> posReceive;
	private List<TermsAgree> ehReceive;
	private List<MemberAddAttr> attr;
	private String birthType;
	private String phoneNumber1;
	private String phoneNumber2;
	private String nickName;
	private String email;
	
	public CicuemCuInfTotTcVo getUser() {
		return user;
	}
	public void setUser(CicuemCuInfTotTcVo user) {
		this.user = user;
	}
	public List<TermsAgree> getPolicy() {
		return policy;
	}
	public void setPolicy(List<TermsAgree> policy) {
		this.policy = policy;
	}
	public String getPhoneNumber1() {
		return phoneNumber1;
	}
	public void setPhoneNumber1(String phoneNumber1) {
		this.phoneNumber1 = phoneNumber1;
		if(user == null) {
			user = new CicuemCuInfTotTcVo();
		}
		user.setCellTidn(phoneNumber1);
	}
	public String getPhoneNumber2() {
		return phoneNumber2;
	}
	public void setPhoneNumber2(String phoneNumber2) {
		this.phoneNumber2 = phoneNumber2;
		if(user == null) {
			user = new CicuemCuInfTotTcVo();
		}
		if(phoneNumber2 != null ) {
			if(phoneNumber2.isEmpty()) {
				user.setCellTexn("");
				user.setCellTlsn("");
			}
			else if(phoneNumber2.length() == 7) {
				user.setCellTexn(phoneNumber2.substring(0, 3));
				user.setCellTlsn(phoneNumber2.substring(3));
			} else {
				user.setCellTexn(phoneNumber2.substring(0, 4));
				user.setCellTlsn(phoneNumber2.substring(4));
			}
		}
		
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public List<TermsAgree> getReceive() {
		return receive;
	}
	public void setReceive(List<TermsAgree> receive) {
		this.receive = receive;
	}
	public List<TermsAgree> getApReceive() {
		return apReceive;
	}
	public void setApReceive(List<TermsAgree> apReceive) {
		this.apReceive = apReceive;
	}
	
	public List<TermsAgree> getPosReceive() {
		return posReceive;
	}
	public void setPosReceive(List<TermsAgree> posReceive) {
		this.posReceive = posReceive;
	}
	public List<TermsAgree> getEhReceive() {
		return ehReceive;
	}
	public void setEhReceive(List<TermsAgree> ehReceive) {
		this.ehReceive = ehReceive;
	}
	public void setHomeZip(String homeZip) {
		if(user == null) {
			user = new CicuemCuInfTotTcVo();
		}
		user.setHomeZip(homeZip);
	}
	public void setHomeBscsAddr(String homeBscsAddr) {
		if(user == null) {
			user = new CicuemCuInfTotTcVo();
		}
		user.setHomeBscsAddr(homeBscsAddr);
	}
	public void setHomeDtlAddr(String homeDtlAddr) {
		if(user == null) {
			user = new CicuemCuInfTotTcVo();
		}
		user.setHomeDtlAddr(homeDtlAddr);
	}
	public void setSlccCd(String slccCd) {
		if(user == null) {
			user = new CicuemCuInfTotTcVo();
		}
		if(user.getCicuemCuAdtInfTcVo() == null) {
			user.setCicuemCuAdtInfTcVo(new CicuemCuAdtInfTcVo());
		}
		user.getCicuemCuAdtInfTcVo().setSlccCd(slccCd);
	}
	public List<MemberAddAttr> getAttr() {
		return attr;
	}
	public void setAttr(List<MemberAddAttr> attr) {
		this.attr = attr;
	}
	public String getBirthType() {
		return birthType;
	}
	public void setBirthType(String birthType) {
		this.birthType = birthType;
	}
	
}
