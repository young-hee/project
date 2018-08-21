/**
 * Ranking
 *
 */

;(function ( $ ) {
	'use strict';

	var Ranking = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.ap_ranking' );
			this._$bestView = this._$target.find( '.tab_cont.best_view' );
			this._$bestSell = this._$target.find( '.tab_cont.best_sell' );

			this._displayMenuId = '';

			this._bestView = null;
			this._bestSell = null;

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		init: function ( options ) {
			this._displayMenuId = options.displayMenuId;
			this._$target.find( '.tab_menu ul li' ).eq(0).find( 'button' ).trigger( 'click' );
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
			this._$target.find( '.ui_tab' ).on( 'tabs-change', function(e) {
				if ( e.index == 0 ) {
					if ( !this._bestView ) {
						this._bestView = new AP.rankingList({
							$target: this._$bestView,
							displayMenuId: this._displayMenuId,
							flagged: 'rankBestViewProd'
						}).load();
					}
				} else if ( e.index == 1 ) {
					if ( !this._bestSell ) {
						this._bestSell = new AP.rankingList({
							$target: this._$bestSell,
							displayMenuId: this._displayMenuId,
							flagged: 'rankBestSellProd'
						}).load({
							price: this._$bestSell.find( '.check_btn_set input' ).val()
						});
					}
				}
			}.bind( this ));

			this._$bestSell.on( 'change', '.check_btn_set input', function (e) {
				this._bestSell.load({
					price: $( e.currentTarget ).val()
				});
			}.bind( this ));
		}
	});

	AP.ranking = new Ranking();
})( jQuery );