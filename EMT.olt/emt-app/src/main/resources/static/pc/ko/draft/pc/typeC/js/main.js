/**
 * Header fixed
 */
;(function () {
    var _$gnb = $( '.gnb' ),
        _$fixed = $( '.gnb_fix' ),
        _$header = $( '.header_fixed' );

    var _pScroll = new $B.event.ParallaxScroll( getPosition() )
        .addListener( 'activate', pScrollHandler )
        .addListener( 'deactivate', pScrollHandler )
        .trigger();

    $( window ).on( 'load', function (e) {
        _pScroll.update( getPosition() ).trigger();
        //_$menu.css( 'height', _$fixed.height() + 'px' );
    });


    function pScrollHandler (e) {
        if ( e.type === 'activate' ) {
            _$gnb.hide();
            _$fixed.show();
            _$header.addClass( 'on' );
        } else {
            _$gnb.show();
            _$fixed.hide();
            _$header.removeClass( 'on' );
        }
    }

    function getPosition () {
        var result = [{
            min: 141 - 60,
            max: 20000000
        }];

        return result;
    }
})();
