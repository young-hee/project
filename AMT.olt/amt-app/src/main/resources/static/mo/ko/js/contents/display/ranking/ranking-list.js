/**
 * Real time
 *
 */

;(function ( $ ) {
	'use strict';

	var RankingList = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target;

			this._$list = this._$target.find( '.product_list_new' );
			this._$loading = this._$target.find( '.loading' );

			this._param = {
				prodListUnit: 'Prod',
				offset: 0,
				limit: 20
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
			this._$loading.show().css( 'height', this._$loading.data( 'loading-first' ));

			AP.api.flaggedItemList({}, this._param ).done(function ( result ) {
				// TODO: test
				result = {
					"list": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
					"offset": 0,
					"limit": 20,
					"totalCount": 20
				};

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
			this._$list.on( 'click', '.btn_toggle', function (e) {
				AP.login().done(function () {
					$( e.currentTarget ).toggleClass( 'on' ).find( '.ico_heart_s' ).toggleClass( 'on' );
				}.bind( this ));
			}.bind( this ));
		}
	});

	AP.rankingList = RankingList;
})( jQuery );