package kr.ap.emt.api.pos.vo;

import java.util.List;

public class SkinToneMeasureInfo extends POSResultVo {

	private int skintoneCnt; 	// 조회건수
	private List<SkinTone> skinToneList;
	private boolean isSuccess;

	public int getSkintoneCnt() {
		return skintoneCnt;
	}
	public void setSkintoneCnt(int skintoneCnt) {
		this.skintoneCnt = skintoneCnt;
	}
	public List<SkinTone> getSkinToneList() {
		return skinToneList;
	}
	public void setSkinToneList(List<SkinTone> skinToneList) {
		this.skinToneList = skinToneList;
	}
	public boolean isSuccess() {
		return isSuccess;
	}
	public void setSuccess(boolean success) {
		isSuccess = success;
	}
}
