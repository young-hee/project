/**
 * AddLike
 *
 */

;(function ( $ ) {
	'use strict';

	var AddLike = $B.Class.extend({
		initialize: function () {
			this._isLike = false;
			this._$target = null;
			this._$like = null;
		},

		/** =============== Public Methods =============== */

		add: function ( $target, products, type ) {
			if ( this._isLike ) return;
			this._isLike = true;
			this._$target = $target;
			this._create(type);
			this._start();

			if ( products ) {
				AP.api.postRecommend({}, {
					shoppingMarkTgtCode : 'Prod',
					prodSn: products[0].prodSn
				}).done(function ( result ) {}.bind( this )).fail(function () {}.bind( this ));
			}
		},

		remove: function ( onlineProdSn ) {
			AP.api.offRecommendFromOnline({}, {
				onlineProdSn: onlineProdSn
			}).done(function ( result ) {}.bind( this )).fail(function () {}.bind( this ));
		},

		/** =============== Private Methods ============== */

		_create: function (type) {
			var img = 'img_like_big01';
			if( type )img = 'img_cart_big01';
			var html = '<div class="img_like_big like" style="transform: scaleX(0) scaleY(0); display: none">'+
					   '<img src="/mo/ko/images/common/'+img+'.png" alt="">'+
					   '</div>';
			this._$target.append( html );
			
			this._$like = this._$target.find( '.like' );
		},

		_start: function () {
			this._$like.show();
			this._$like.transform({
				transform: 'scaleX(1) scaleY(1)',
				transition: '1s ' + AP.common.ease.BackInOut + ' 0s'
			}).on( 'transition-end', function () {
				this._end();
			}.bind( this ));
		},

		_end: function () {
			this._$like.transform({
				transform: 'scaleX(0) scaleY(0)',
				transition: '0.7s ' + AP.common.ease.ExpoOut + ' 0s'
			}).on( 'transition-end', function () {
				this._$like.remove();
				this._isLike = false;
			}.bind( this ));
		}
	});

	AP.addLike = new AddLike();
})( jQuery );