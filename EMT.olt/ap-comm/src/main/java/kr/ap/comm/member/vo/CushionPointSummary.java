package kr.ap.comm.member.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;

public class CushionPointSummary implements Serializable {

	public static final CushionPointSummary EMPTY = new CushionPointSummary(null, null);

	@JsonProperty
	private final Integer remainCushionPoint;
	@JsonProperty
	private final Date retrievedDate;

	public CushionPointSummary(final Integer remainCushionPoint) {
		this.remainCushionPoint = remainCushionPoint;
		this.retrievedDate = new Date();
	}

	public CushionPointSummary(final Integer remainCushionPoint, final Date retrievedDate) {
		this.remainCushionPoint = remainCushionPoint;
		if (remainCushionPoint != null) {
			this.retrievedDate = new Date(retrievedDate.getTime());
		} else {
			this.retrievedDate = new Date();
		}
	}

	/**
	 * 잔여 뷰티포인트를 반환한다.
	 *
	 * @return 잔여뷰티포인트
	 */
	public Integer getRemainCushionPoint() {
		return this.remainCushionPoint;
	}

	/**
	 * 뷰티포인트 조회일시를 반환한다.
	 *
	 * @return 뷰티포인트 조회일시
	 */
	public Date getRetrievedDate() {
		return retrievedDate != null ? new Date(retrievedDate.getTime()) : null;
	}

}
