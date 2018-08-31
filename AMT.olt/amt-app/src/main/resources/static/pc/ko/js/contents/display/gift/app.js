/**
 * Gift
 *
 */

;(function ( $ ) {
	'use strict';

	var Gift = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.gift' );
			this._$list = this._$target.find ('.list_gift > ul' );
			this._$loading = this._$target.find( '.loading' );

			this._isLoading = false;

			this._param = {
				offset: 0,
				limit: 0
			};
		},

		/** =============== Public Methods =============== */
		init: function ( options ) {
			this._load();
		},

		/** =============== Private Methods ============== */
		_load: function () {
			AP.api.test({}, this._param ).done(function ( result ) {
				this._done( result );
			}.bind( this )).fail(function () {}.bind( this ));
		},

		_done: function ( result ) {
			// TODO: test
			result = {
				list: [1,2,3,4,5,6,7,8,9,10],
				offset: 0,
				limit: 20,
				totalCount: 20
			};

			if(  !this._isLoading ) {
				this._isLoading = true;
				this._$loading.hide();
			}

			var html = AP.common.getTemplate( 'display.gift.gift-item', result );
			this._$list.html( html );
			AP.lazyLoad.add( this._$list.find( 'img.lazy_load' )).updated();

			var $gift = this._$list.find( '.gift' );

			var giftH = 0;
			$gift.each(function () {
				if ( $( this ).height() > giftH ) {
					giftH = $( this ).height();
				}
			});
			$gift.css( 'height', giftH );
		}
	});

	AP.gift = new Gift();
})( jQuery );