package kr.ap.amt.etc.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import net.g1project.ecp.api.model.linker.linker.ReserveInfo;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApObjectInfo {

	/**
	 * 응답결과
	 */
	private String resultCode;

	/**
	 * 암호화된 통합고객번호
	 */
	private String ucstmId;

	/**
	 * 결과에 대한 메세지
	 */
	private String message;

	/**
	 * 고객사코드
	 */
	private String bizptnr;

	/**
	 * 요청날짜
	 */
	private String reqDt;

	/**
	 * 11번가 뷰티포인트 적립내용
	 */
	private List<ReserveInfo> reserveInfo;

	/**
	 * 응답결과
	 */
	public String getResultCode() {
		return resultCode;
	}

	/**
	 * 응답결과
	 */
	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}

	/**
	 * 암호화된 통합고객번호
	 */
	public String getUcstmId() {
		return ucstmId;
	}

	/**
	 * 암호화된 통합고객번호
	 */
	public void setUcstmId(String ucstmId) {
		this.ucstmId = ucstmId;
	}

	/**
	 * 결과에 대한 메세지
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * 결과에 대한 메세지
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * 고객사코드
	 */
	public String getBizptnr() {
		return bizptnr;
	}

	/**
	 * 고객사코드
	 */
	public void setBizptnr(String bizptnr) {
		this.bizptnr = bizptnr;
	}

	/**
	 * 요청날짜
	 */
	public String getReqDt() {
		return reqDt;
	}

	/**
	 * 요청날짜
	 */
	public void setReqDt(String reqDt) {
		this.reqDt = reqDt;
	}

	/**
	 * 11번가 뷰티포인트 적립내용
	 */
	public List<ReserveInfo> getReserveInfo() {
		return reserveInfo;
	}

	/**
	 * 11번가 뷰티포인트 적립내용
	 */
	public void setReserveInfo(List<ReserveInfo> reserveInfo) {
		this.reserveInfo = reserveInfo;
	}
}
