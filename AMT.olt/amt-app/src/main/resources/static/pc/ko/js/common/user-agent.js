/**
 * user agent html 태그에 넣기
 * https://blaxk.gitbooks.io/ixband/ko/ua.html 참조
 */
/** ========== 브라우저별 class 추가 ========== */
;(function () {
    var classNames = '';

    if ( $B.ua.MAC ) classNames += 'mac ';
    if ( $B.ua.MOBILE_IOS ) classNames += 'mobile_ios ';
    if ( $B.ua.IPHONE ) classNames += 'iphone ';
    if ( $B.ua.IPAD ) classNames += 'ipad ';
    if ( $B.ua.CHROME ) classNames += 'chrome ';
    if ( $B.ua.ANDROID ) classNames += 'android ';
    if ( $B.ua.ANDROID_TABLET ) classNames += 'android_tablet ';
    if ( $B.ua.SMART_PHONE ) classNames += 'smart_phone ';
    if ( $B.ua.TOUCH_DEVICE ) classNames += 'touch_device ';
    if ( $B.ua.WEBKIT ) classNames += 'webkit ';
    if ( $B.ua.SAMSUNG ) classNames += 'samsung ';
    if ( $B.ua.SAFARI ) classNames += 'safari ';
    if ( $B.ua.OPERA ) classNames += 'opera ';
    if ( $B.ua.OPERA_MINI ) classNames += 'opera_mini ';
    if ( $B.ua.FIREFOX ) classNames += 'firefox ';
    if ( $B.ua.WINDOWS ) classNames += 'windows ';
    if ( $B.ua.WINDOWS_PHONE ) classNames += 'windows_phone ';
    if ( $B.ua.WINDOWS_TABLET ) classNames += 'windows_tablet ';
    if ( $B.ua.MSIE ) classNames += 'msie ';
    if ( $B.ua.DOC_MODE == 9 ) classNames += 'ie9 ';
    if ( $B.ua.DOC_MODE == 10 ) classNames += 'ie10 ';
    if ( $B.ua.DOC_MODE == 11 ) classNames += 'ie11 ';
    if ( $B.ua.IE_COMPATIBLE ) classNames += 'ie_compatible ';
    if ( $B.ua.EDGE ) classNames += 'edge ';

    $( 'html' ).addClass( classNames );
})();