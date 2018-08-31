package kr.ap.amt.order.vo;

import net.g1project.ecp.api.model.order.order.OrdOtfEx;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * OrdOtfEx를 확장한 업체별의 정보 리스트
 * @author 유젠 Tim
 * @since 2018.08.30
 */
public class OrdOtfExFoDTO extends OrdOtfEx {

	/** 온라인쇼핑일반상품 목록 **/
	private List<OrdOnlineProdFoDTO> shippingOrdOnlineProdList = new ArrayList<OrdOnlineProdFoDTO>();
	/** 온라인쇼핑묶음판매상품 목록 **/
	private List<OrdOnlineBulkDcFoDTO> shippingBulkDcList = new ArrayList<>();
	/**  온라인쇼핑M+N프로모션 목록 **/
	private List<OrdOnlinePromoFoDTO> shippingMNPromoList = new ArrayList<>();
	/** 온라인쇼핑동시구매프로모션 목록 **/
	private List<OrdOnlinePromoFoDTO> shippingSameTimePurPromoList = new ArrayList<>();
	/** 온라인쇼핑 뷰티포인트 교환상품 목록 **/
	private List<OrdOnlineProdFoDTO> shippingOrdOnlineBeautyPointProdList = new ArrayList<>();
	/** 온라인쇼핑 진주알 교환상품 목록 **/
	private List<OrdOnlineProdFoDTO> shippingOrdOnlineActivityPointProdList = new ArrayList<>();



	public List<OrdOnlineProdFoDTO> getShippingOrdOnlineProdList() {
		return shippingOrdOnlineProdList;
	}

	public void setShippingOrdOnlineProdList(List<OrdOnlineProdFoDTO> shippingOrdOnlineProdList) {
		this.shippingOrdOnlineProdList = shippingOrdOnlineProdList;
	}

	public List<OrdOnlineBulkDcFoDTO> getShippingBulkDcList() {
		return shippingBulkDcList;
	}

	public void setShippingBulkDcList(List<OrdOnlineBulkDcFoDTO> shippingBulkDcList) {
		this.shippingBulkDcList = shippingBulkDcList;
	}

	public List<OrdOnlinePromoFoDTO> getShippingMNPromoList() {
		return shippingMNPromoList;
	}

	public void setShippingMNPromoList(List<OrdOnlinePromoFoDTO> shippingMNPromoList) {
		this.shippingMNPromoList = shippingMNPromoList;
	}

	public List<OrdOnlinePromoFoDTO> getShippingSameTimePurPromoList() {
		return shippingSameTimePurPromoList;
	}

	public void setShippingSameTimePurPromoList(List<OrdOnlinePromoFoDTO> shippingSameTimePurPromoList) {
		this.shippingSameTimePurPromoList = shippingSameTimePurPromoList;
	}

	public List<OrdOnlineProdFoDTO> getShippingOrdOnlineBeautyPointProdList() {
		return shippingOrdOnlineBeautyPointProdList;
	}

	public void setShippingOrdOnlineBeautyPointProdList(List<OrdOnlineProdFoDTO> shippingOrdOnlineBeautyPointProdList) {
		this.shippingOrdOnlineBeautyPointProdList = shippingOrdOnlineBeautyPointProdList;
	}

	public List<OrdOnlineProdFoDTO> getShippingOrdOnlineActivityPointProdList() {
		return shippingOrdOnlineActivityPointProdList;
	}

	public void setShippingOrdOnlineActivityPointProdList(List<OrdOnlineProdFoDTO> shippingOrdOnlineActivityPointProdList) {
		this.shippingOrdOnlineActivityPointProdList = shippingOrdOnlineActivityPointProdList;
	}
}
