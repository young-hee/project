package kr.ap.comm.api.vo;

public class PageVo {
	
    private String pageSize;
    private String pageNumber;
    private String totalRowCount;
    
    /*
     * PageNavigator를 그리기 위해 필요한 정보.
     */
    private Boolean isFirstPage;
    private Boolean hasPrePage;
    private Integer prePage;
    private Boolean isLastPage;
    private Boolean hasNextPage;
    private Integer nextPage;
    private Integer curPage;
    private Integer lastPage;
    private Integer[] pageList;
    
	public String getPageSize() {
		return pageSize;
	}
	public void setPageSize(String pageSize) {
		this.pageSize = pageSize;
	}
	public String getPageNumber() {
		return pageNumber;
	}
	public void setPageNumber(String pageNumber) {
		this.pageNumber = pageNumber;
	}
	public String getTotalRowCount() {
		return totalRowCount;
	}
	public void setTotalRowCount(String totalRowCount) {
		this.totalRowCount = totalRowCount;
	}
	public Boolean getIsFirstPage() {
		return isFirstPage;
	}
	public void setIsFirstPage(Boolean isFirstPage) {
		this.isFirstPage = isFirstPage;
	}
	public Boolean getHasPrePage() {
		return hasPrePage;
	}
	public void setHasPrePage(Boolean hasPrePage) {
		this.hasPrePage = hasPrePage;
	}
	public Boolean getIsLastPage() {
		return isLastPage;
	}
	public void setIsLastPage(Boolean isLastPage) {
		this.isLastPage = isLastPage;
	}
	public Boolean getHasNextPage() {
		return hasNextPage;
	}
	public void setHasNextPage(Boolean hasNextPage) {
		this.hasNextPage = hasNextPage;
	}
	public Integer getCurPage() {
		return curPage;
	}
	public void setCurPage(Integer curPage) {
		this.curPage = curPage;
	}
	public Integer[] getPageList() {
		return pageList;
	}
	public void setPageList(Integer[] pageList) {
		this.pageList = pageList;
	}
	public Integer getPrePage() {
		return prePage;
	}
	public void setPrePage(Integer prePage) {
		this.prePage = prePage;
	}
	public Integer getNextPage() {
		return nextPage;
	}
	public void setNextPage(Integer nextPage) {
		this.nextPage = nextPage;
	}
	public Integer getLastPage() {
		return lastPage;
	}
	public void setLastPage(Integer lastPage) {
		this.lastPage = lastPage;
	}
	
    
    
}
