package kr.ap.emt.my.vo;

public class StoreMap {

    // latitude 위도, longitude 경도
    private double latitude;
    private double longitude;
    
    public StoreMap(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
 
    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

}
