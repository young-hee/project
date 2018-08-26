/**
 * Real time
 *
 */

;(function ( $ ) {
	'use strict';

	var RankingList = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target;
			this._key = { displayMenuId: options.displayMenuId };

			this._$list = this._$target.find( '.list_product > ul' );
			this._$loading = this._$target.find( '.loading' );

			this._param = {
				prodListUnit: 'Prod',
				offset: 0,
				limit: 27
			};
			$.extend( this._param, options.param );

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		load: function ( param ) {
			if ( param ) {
				$.extend( this._param, param );
			}

			this._$list.empty();
			this._$loading.show();

			AP.api.flaggedItemList({}, this._param ).done(function ( result ) {
				var html = AP.common.getTemplate( 'display.ranking.ranking-item', result );
				this._$list.html( html );

				AP.lazyLoad.add( this._$list.find( 'img.lazy_load' )).updated();
				this._$loading.hide();

			}.bind( this )).fail(function(xhr) {
				console.log( xhr );
			}.bind( this ));

			return this;
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
			// 좋아요
			this._$list.on( 'click', '.like',function (e) {
				$( e.currentTarget ).find( 'i' ).toggleClass( 'on' );
			}.bind( this ));

			// 장바구니
			this._$list.on( 'click', '.cart',function (e) {
				console.log( 'cart' );
			}.bind( this ));
		}
	});

	AP.rankingList = RankingList;
})( jQuery );