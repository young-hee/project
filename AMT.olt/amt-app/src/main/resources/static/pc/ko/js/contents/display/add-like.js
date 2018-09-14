/**
 * AddLike
 *
 */

;(function ( $ ) {
	'use strict';

	var AddLike = $B.Class.extend({
		initialize: function () {
			this._isLike = false;
		},

		/** =============== Public Methods =============== */

		add: function ( products ) {
			if ( this._isLike ) return;
			this._isLike = true;

			AP.api.postRecommend({}, {
				shoppingMarkTgtCode : 'Prod',
				prodSn: products[0].prodSn
			}).done(function ( result ) {
				this._isLike = false;
			}.bind( this )).fail(function () {
				this._isLike = false;
			}.bind( this ));
		},

		remove: function ( onlineProdSn ) {
			AP.api.offRecommendFromOnline({}, {
				onlineProdSn: onlineProdSn
			}).done(function ( result ) {}.bind( this )).fail(function () {}.bind( this ));
		}

		/** =============== Private Methods ============== */
	});

	AP.addLike = new AddLike();
})( jQuery );