/**
 * BeautyTester
 *
 */

;(function ( $ ) {
	'use strict';

	var BeautyTester = $B.Class.extend({
		initialize: function () {
			this.SLIDE_VIEW_LENGTH = 3;

			this._$target = $( '#ap_container .ap_contents.beauty_tester_recruit' );
			this._$beautyTesterInfo = this._$target.find( '.tester_process' );

			this._beautyTesterInfo = null;
		},

		/** =============== Public Methods =============== */
		init: function ( options ) {
			this._beautyTesterInfo = new AP.BeautyTesterInfo({
				$target: this._$target,
				displayMenuId: options.displayMenuId
			});
			this._$target.find( '.ix-list-item' ).eq(0).find('a').addClass("selected");
			this._beautyTesterInfo.load(this._$target.find( '.ix-list-item' ).eq(0).attr( 'id' ));
		},
		showDetail: function ( option ) {
			this._beautyTesterInfo.load(option.regularEventSn);
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {}
	});

	AP.beautytester = new BeautyTester();
})( jQuery );