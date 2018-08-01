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

/**
 * 하단 quick
 */
;(function () {
    var _$floating = $( '.floating_menu' ),
        _$top = $( '.btn_top' ),
        _oldScollY = $( window ).scrollTop();

    _$top.on( 'click', function (e) {
        $( 'body,html' ).animate({
            scrollTop: 0
        });
    });

    $( window ).on( 'scroll', function (e) {
        var scrollY = $( window ).scrollTop();

        if ( scrollY > 0 && _oldScollY > scrollY ) {
            _$floating.addClass( 'open' );
            _$top.addClass( 'on' );
        } else {
            _$floating.removeClass( 'open' );
            _$top.removeClass( 'on' );
        }

        _oldScollY = scrollY;
    });

})();

/**
 * cart1
 */
;(function () {
    var $btn = $( '.cart1' ),
        $icon = $( '.img_cart' );

    $btn.on( 'click', function (e) {
        open( e.clientX, e.clientY );
    });

    function open ( x, y ) {
        $icon.css({
            left: x + 'px',
            top: y + 'px',
            transform: 'scale(0)',
            opacity: 0
        }).show().animate({
            left: '50%',
            top: '50%',
            opacity: 1
        }, {
            duration: 1000,
            easing: 'easeInOutElastic',
            step: function ( now, tween ) {
                $( this ).css({
                    transform: 'scale(' + now + ')'
                });
            },
            complete: function () {
                setTimeout( close, 1500 );
            }
        });
    }

    function close () {
        $icon.animate({
            opacity: 0,
        }, {
            duration: 400,
            //easing: 'easeOutElastic',
            step: function ( now, tween ) {
                $( this ).css({
                    transform: 'scale(' + now + ')'
                });
            },
            complete: function () {
                $icon.hide();
            }
        });
    }
})();