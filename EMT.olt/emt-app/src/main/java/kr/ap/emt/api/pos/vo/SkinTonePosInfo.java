package kr.ap.emt.api.pos.vo;

import java.util.List;

public class SkinTonePosInfo extends POSResultVo {

	private int skintoneCnt;
	private List<SkinTone> skinToneList;
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
	
	
}
