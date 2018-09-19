package kr.ap.amt.my.vo;

public class StoreDTO {

    private Long storeSn;
    private String repStoreYn;
    private String name;
    private String address;
    private String tel;
    private String favorite;
    private StoreMap map;

    public StoreDTO(Long storeSn, String repStoreYn, String name, String address, String tel, String favorite, StoreMap map) {
        this.storeSn = storeSn;
        this.repStoreYn = repStoreYn;
        this.name = name;
        this.address = address;
        this.tel = tel;
        this.favorite = favorite;
        this.map = map;
    }

    public StoreDTO(Long storeSn, String name, String address, String tel, String favorite, StoreMap map) {
        this.storeSn = storeSn;
        this.name = name;
        this.address = address;
        this.tel = tel;
        this.favorite = favorite;
        this.map = map;
    }

    public String getRepStoreYn() {
        return repStoreYn;
    }

    public void setRepStoreYn(String repStoreYn) {
        this.repStoreYn = repStoreYn;
    }

    public Long getStoreSn() {
        return storeSn;
    }

    public void setStoreSn(Long storeSn) {
        this.storeSn = storeSn;
    }

    public String getFavorite() {
        return favorite;
    }

    public void setFavorite(String favorite) {
        this.favorite = favorite;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public StoreMap getMap() {
        return map;
    }

    public void setMap(StoreMap map) {
        this.map = map;
    }
}
