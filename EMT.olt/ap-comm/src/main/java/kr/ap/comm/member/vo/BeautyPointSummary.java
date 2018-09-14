package kr.ap.comm.member.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;

public class BeautyPointSummary implements Serializable {

	public static final BeautyPointSummary EMPTY = new BeautyPointSummary(null, null);

	@JsonProperty
	private final Integer remainBeautyPoint;
	@JsonProperty
	private final Date retrievedDate;

	public BeautyPointSummary(final Integer remainBeautyPoint) {
		this.remainBeautyPoint = remainBeautyPoint;
		this.retrievedDate = new Date();
	}

	public BeautyPointSummary(final Integer remainBeautyPoint, final Date retrievedDate) {
		this.remainBeautyPoint = remainBeautyPoint;
		if (remainBeautyPoint != null) {
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
	public Integer getRemainBeautyPoint() {
		return remainBeautyPoint;
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
