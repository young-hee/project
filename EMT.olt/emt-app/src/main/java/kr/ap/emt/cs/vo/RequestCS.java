package kr.ap.emt.cs.vo;

public class RequestCS {

    private String type;
    private String keyword;
    private Long inquiryTypeSn;
    private Integer offset;
    private Integer limit;
    private Long noticeTypeCode;
    private String importantNoticeYn;

    public RequestCS() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Long getInquiryTypeSn() {
        return inquiryTypeSn;
    }

    public void setInquiryTypeSn(Long inquiryTypeSn) {
        this.inquiryTypeSn = inquiryTypeSn;
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

    public Long getNoticeTypeCode() {
        return noticeTypeCode;
    }

    public void setNoticeTypeCode(Long noticeTypeCode) {
        this.noticeTypeCode = noticeTypeCode;
    }

    public String getImportantNoticeYn() {
        return importantNoticeYn;
    }

    public void setImportantNoticeYn(String importantNoticeYn) {
        this.importantNoticeYn = importantNoticeYn;
    }

    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return "keyword: " + keyword + ", inquiryTypeSn: " + inquiryTypeSn + ", offset: " + offset + ", limit: " + limit;
    }

}
