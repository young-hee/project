/**
 * URL redirection
 */
;(function( $B ) {
    /**
     * 지원 브라우저 버전 체크 (URL redirection)
     */
    var incompatibleAgree = $B.utils.cookie( 'incompatible_browser_agree' );

    if ( !incompatibleAgree ) {
        var url = location.pathname,
            checkReg = new RegExp( AP.BROWSER_INCOMPATIBLE_PAGE + '(.html)*$' );

        if ( !checkReg.test(url) ) {
            var isRedirection = false,
                version = parseFloat( $B.ua.VERSION );

            //Safari for Windows, ~IE8
            if ( ($B.ua.SAFARI && $B.ua.WINDOWS) || $B.ua.DOC_MODE_IE9_LT ) {
                isRedirection = true;
            } else if ( $B.ua.SAFARI && version < 9 ) {
                isRedirection = true;
            } else if ( $B.ua.FIREFOX && version < 30 ) {
                isRedirection = true;
            } else if ( $B.ua.OPERA_MINI || ($B.ua.OPERA && version < 30) ) {
                isRedirection = true;
            }

            if ( isRedirection ) {
                location.replace( AP.BROWSER_INCOMPATIBLE_PAGE );
            }
        }
    }

})( ixBand );