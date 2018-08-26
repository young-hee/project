package kr.ap.emt.api.pos.vo;

import java.util.Date;

public class SkinTone {

	private String storeNm;	// 매장명
	private Date measureDt;	// 측정날짜
	private String skinToneMeasureCode;	// 측색정보코드
	private String skinToneMeasureNm;	// 측색정보명
	public String getStoreNm() {
		return storeNm;
	}
	public void setStoreNm(String storeNm) {
		this.storeNm = storeNm;
	}
	public Date getMeasureDt() {
		return measureDt;
	}
	public void setMeasureDt(Date measureDt) {
		this.measureDt = measureDt;
	}
	public String getSkinToneMeasureCode() {
		return skinToneMeasureCode;
	}
	public void setSkinToneMeasureCode(String skinToneMeasureCode) {
		this.skinToneMeasureCode = skinToneMeasureCode;
	}
	public String getSkinToneMeasureNm() {
		return skinToneMeasureNm;
	}
	public void setSkinToneMeasureNm(String skinToneMeasureNm) {
		this.skinToneMeasureNm = skinToneMeasureNm;
	}

}
