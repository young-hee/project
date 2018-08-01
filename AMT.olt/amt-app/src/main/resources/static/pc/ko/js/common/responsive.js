/**
 * 반응형 사이즈 진입시점의 이벤트 전달
 * https://blaxk.gitbooks.io/ixband/content/ko/event/Responsive.html
 * ex) AP.responsive.addListener( 'responsive', responsiveHandler );
 * ex) AP.responsive.addListener( 'resize', responsiveHandler );
 *
 * 주의 : 등록한 리스너 삭제시, 이벤트 핸들러를 넣지않고 삭제하게 되면 다른곳에서 등록된 리스너도 모두 삭제 되기때문에 반듯이 아래처럼 등록했던 이벤트핸들러도 넣어서 삭제해야 한다.
 * ex) AP.responsive.removeListener( 'responsive', responsiveHandler );
 */
;(function() {
    'use strict';

    /** ========== responsive ========== */
    //가로기준 responsive
    AP.responsiveWidth = new $B.event.Responsive( 'width', [
        {//0 ~ 767
            type: 'S',
            min: 0,
            max: 767
        },
        { //768 ~ 1023
            type: 'M',
            min: 767,
            max: 1023
        },
        { //1024 ~ 200000
            type: 'L',
            min: 1023,
            max: 200000
        }
    ]);

})();