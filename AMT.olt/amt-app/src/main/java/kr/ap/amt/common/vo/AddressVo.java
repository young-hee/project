package kr.ap.amt.common.vo;

import java.net.URLEncoder;

public class AddressVo{

	private String currentPage ;
	private String countPerPage;
	private String keyword;
	private String confmKey;
	private String dataType;
	private Boolean crossDomain;
	private String resultType; 
	
	public String getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(String currentPage) {
		this.currentPage = currentPage;
	}

	public String getCountPerPage() {
		return countPerPage;
	}

	public void setCountPerPage(String countPerPage) {
		this.countPerPage = countPerPage;
	}

	public String getKeyword() {
		
		
		return keyword;
	}

	public void setKeyword(String keyword) {
		
		try {
			
			this.keyword = URLEncoder.encode(keyword,"UTF-8");
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
	} 
	
	public String getConfmKey() {
		return confmKey;
	}

	public void setConfmKey(String confmKey) {
		this.confmKey = confmKey;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		dataType = "jsonp"; 
		this.dataType = dataType;
	}

	public Boolean getCrossDomain() {
		return crossDomain;
	}

	public void setCrossDomain(Boolean crossDomain) {
		crossDomain = true; 
		this.crossDomain = crossDomain;
	}

	public String getResultType() {
		return resultType;
	}

	public void setResultType(String resultType) {
		resultType = "json";
		this.resultType = resultType;
	}

	public String getAddressUrl() {
		return "?currentPage="+ getCurrentPage()
				+ "&resultType=json&countPerPage="+ getCountPerPage()
				+ "&keyword="+ getKeyword()+"&";
				 
				
	}
}
