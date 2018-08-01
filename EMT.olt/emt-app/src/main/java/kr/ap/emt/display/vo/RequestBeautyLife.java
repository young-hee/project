package kr.ap.emt.display.vo;

/**
 * @author Administrator
 *
 */
public class RequestBeautyLife {

	private String articleCateId; //아티클분류전시코드, BO에서 관리
	private String order; //정렬방식코드 ArticleSortMethod, StartDt (시작일), Deadline(종료일), SortOrder(정렬순 - 기본값)
	private String keyword; //검색어
	private String hashTag; //해시태그
	private Integer offset;
	private Integer limit;
	private Long articleSn; //아티클일련번호
	
	public String getArticleCateId() {
		return articleCateId;
	}
	public void setArticleCateId(String articleCateId) {
		this.articleCateId = articleCateId;
	}
	public String getOrder() {
		return order;
	}
	public void setOrder(String order) {
		this.order = order;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public Integer getOffset() {
		return offset;
	}
	public void setOffset(Integer offset) {
		this.offset = offset;
	}
	public Integer getLimit() {
		return limit;
	}
	public void setLimit(Integer limit) {
		this.limit = limit;
	}
	public String getHashTag() {
		return hashTag;
	}
	public void setHashTag(String hashTag) {
		this.hashTag = hashTag;
	}
	public Long getArticleSn() {
		return articleSn;
	}
	public void setArticleSn(Long articleSn) {
		this.articleSn = articleSn;
	}
	
	
	
	

	
}
