package kr.ap.emt.common.vo;

public class PixleePhotoVo{

	private String sort;
	private String filters;
	private String per_page;
	private String confmKey;
	private String albumId;
	private String api_key;
	private String page;
	
	public String getSort() {
		return sort;
	}


	public void setSort(String sort) {
		this.sort = sort;
	}


	public String getFilters() {
		return filters;
	}


	public void setFilters(String filters) {
		this.filters = filters;
	}


	public String getPer_page() {
		return per_page;
	}


	public void setPer_page(String per_page) {
		this.per_page = per_page;
	}


	public String getConfmKey() {
		return confmKey;
	}


	public void setConfmKey(String confmKey) {
		this.confmKey = confmKey;
	}


	public String getAlbumId() {
		return albumId;
	}


	public void setAlbumId(String albumId) {
		this.albumId = albumId;
	}


	public String getApi_key() {
		return api_key;
	}


	public void setApi_key(String api_key) {
		this.api_key = api_key;
	}

	public String getPage() {
		return page;
	}


	public void setPage(String page) {
		this.page = page;
	}


	public String getAddressUrl() {
		return "/"+ getAlbumId() + "/photos" 
				+ "?api_key="+ getApi_key()
				+ "&sort="+ getSort()
				+ "&filters="+ getFilters()
				+ "&per_page=" + getPer_page()
				+ "&page=" +getPage(); 
	}
}
