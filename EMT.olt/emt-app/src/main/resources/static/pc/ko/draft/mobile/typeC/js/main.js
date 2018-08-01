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
        if ( _$aside.hasClass('open') ) {
            close();
        } else {
            open();
        }
    });

    _$aside.find( '>a' ).on( 'click', function (e) {
        e.preventDefault();
        close();
    });

    function open () {
        $( 'body' ).css({
            position: 'fixed'
            //overflow: 'hidden',
            //height: $( window ).height()
        });
        _$aside.show();
        _$aside.find( '>div' ).scrollTop( 0 );

        setTimeout( function () {
            _$aside.addClass( 'open' );
            _$aside.find( '>div' ).animate({
                left: 0
            }, 400, function () {

            });
        }, 10);
    }

    function close () {
        $( 'body' ).css({
            position: ''
            //overflow: '',
            //height: ''
        });
        _$aside.removeClass( 'open' );
        _$aside.find( '>div' ).animate({
            left: '-100%'
        }, 400, function () {
            _$aside.hide();
        });
    }
})();