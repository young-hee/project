/**
 * 모든 페이지 JS 공통 실행
 */
;(function () {
    'use strict';

    //placeholder
    $( 'input, textarea' ).placeholder();

    //selectBox
    $( 'select' ).selectBox();

    //date picker
    $( '.ui_date_picker' ).datePicker();

    //input text (search input)
    $( 'input:text' ).inputText();

    //tooltip
    $( '.ui_tooltip' ).tooltip();

    //tab
    $( '.ui_tab' ).tabs();

    //accordion
    $( '.ui_accordion' ).accordion();

    //toggle contents
    $( '.ui_toggle_contents' ).toggleContents();

	//sns share
	$( '.btn_share' ).snsShare();

    //lazy load
    AP.lazyLoad.add( 'img.lazy_load' );

})();
