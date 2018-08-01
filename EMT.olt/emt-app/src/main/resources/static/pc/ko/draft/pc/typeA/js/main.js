/**
 * Header fixed
 */
;(function () {
    var _$menu = $( '.menu_area' ),
        _$fixed = $( '.fixed_menu' );

    var _pScroll = new $B.event.ParallaxScroll( getPosition() )
        .addListener( 'activate', pScrollHandler )
        .addListener( 'deactivate', pScrollHandler )
        .trigger();

    $( window ).on( 'load', function (e) {
        _pScroll.update( getPosition() ).trigger();
        _$menu.css( 'height', _$fixed.height() + 'px' );
    });


    function pScrollHandler (e) {
        if ( e.type === 'activate' ) {
            _$fixed.addClass( 'fixed' );
        } else {
            _$fixed.removeClass( 'fixed' );
        }
    }

    function getPosition () {
        var result = [{
            min: _$menu.offset().top,
            max: 20000000
        }];

        return result;
    }
})();

/**
 * left menu
 */
;(function () {
    var _$aside = $( '.aside' );

    $( '.left_menu_btn' ).on( 'click', function (e) {
        e.preventDefault();
        open();
    });

    _$aside.find( '>a' ).on( 'click', function (e) {
        e.preventDefault();
        close();
    });

    function open () {
        _$aside.show();

        setTimeout( function () {
            _$aside.addClass( 'open' );
            _$aside.find( '>div' ).animate({
                left: 0
            }, 400, function () {

            });
        }, 10);
    }

    function close () {
        _$aside.removeClass( 'open' );
        _$aside.find( '>div' ).animate({
            left: '-100%'
        }, 400, function () {
            _$aside.hide();
        });
    }
})();