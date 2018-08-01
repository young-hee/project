$(function () {
    var $top = $( '#top' ),
        $topFixed = $top.find( '.fixedMenu' ),
        $bottom = $( '#bottom' ),
        $topBtn = $bottom.find( '.top' ),
        $aside = $( '#aside' ),
        $asideMenu = $aside.find( '.menu' ),
        $asideBG = $aside.find( '.bg' ),
        $menuBtn = $bottom.find( '.btn' ),
        $menuClose = $aside.find( '.close' ),
        $search = $( '#search' );

    var	oldScollY = $( window ).scrollTop(),
        timer = null;

    // top
    $top.find( '.go_search' ).on( 'click', function () {
        $( 'body' ).css( 'overflow', 'hidden' );
        $search.show();
    });

    //bottom
    $topBtn.on( 'click', function () {
        $( 'html, body' ).animate({ scrollTop: 0 }, 500 );
    });


    // search
    $search.find( '.menu a' ).on( 'click', function () {
        if ( $search.find( '.search0' ).css( 'display' ) == 'block' ) {
            $search.find( '.search0' ).hide();
        } else {
            $search.find( '.search0' ).show();
        }
    });
    $search.find( '.close' ).on( 'click', function () {
        $search.hide();
        $( 'body' ).css( 'overflow', '' );
    });

    // menu
    $menuBtn.on( 'click', function () {
        $aside.show();
        $( 'body' ).css( 'overflow', 'hidden' );
        $asideMenu.animate({ left: 0 }, 300 );
        $asideBG.animate({ opacity: 0.8 }, 300 );
    });
    $menuClose.on( 'click', function () {
        $asideMenu.removeClass( 'open' );
        $( 'body' ).css( 'overflow', '' );
        $asideMenu.animate({ left: '-100%' }, 300 );
        $asideBG.animate({ opacity: 0 }, 300, function () {
            $aside.hide();
        });
    });

    $( window ).on( 'scroll', function (e) {
        var scrollY = $( window ).scrollTop(),
            topPos;

        // top
        if ( scrollY > ( $top.height() - $topFixed.height() )) {
            $top.addClass( 'fixed' );
            topPos = -1 * ( $top.height() - $topFixed.height() );
        } else {
            $top.removeClass( 'fixed' );
            topPos = 0;
        }
        $top.css( 'top', topPos );

        // bottom
        if ( scrollY > 0 && oldScollY > scrollY || $( document ).height() == $( window ).height() + scrollY ) {
            $bottom.addClass( 'open' );
        } else {
            if ( scrollY == 0 ) {
                timer = setInterval(function () {
                $bottom.removeClass( 'open' );
                }, 600 );
            } else {
                clearInterval( timer );
                timer = null;
                $bottom.removeClass( 'open' );
            }
        }
        oldScollY = scrollY;
    });
});