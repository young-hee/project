/**
 * AddCart
 *
 */

;(function ( $ ) {
	'use strict';

	var AddCart = $B.Class.extend({
		initialize: function () {
			this._defaultModel = {};
		},

		/** =============== Public Methods =============== */
		add: function ( products ) {
			this._defaultModel = products;

			products = [products[0]];
			this._productsInOutOfStock( products ).done( function () {
				if ( AP.LOGIN_USER ) {
					this._memberOrderInfo( products );
				} else {
					this._noneMemberOrderInfo( products );
				}
			}.bind(this));
		},

		/** =============== Private Methods ============== */
		/**
		 * products 안에 품절상이 있는지 체크하여 에러메세지 처리
		 * @param	{Array}		products
		 * @returns	{Promise}
		 */
		_productsInOutOfStock: function ( products ) {
			var defer = new $.Deferred();

			if ( _.findWhere(products, {saleDisplayStatus: 'OutOfStock'}) ) {
				AP.modal.alert( AP.message.IN_OUT_OF_STOCK_PRODUCT );
				defer.reject();
			} else {
				defer.resolve();
			}
			return defer.promise();
		},

		_memberOrderInfo: function ( products ) {
			this._addCartProd( products ).done( function () {
				AP.modal.confirm( AP.message.ADDED_CART_TO_CART_PAGE ).addListener( 'modal-close', function (e) {
					if ( e.closeType === 'confirm' ) {
						this._goToPage( 'cart' );
					}
				}.bind(this));
			}.bind(this)).fail( function ( xhr ) {
				console.log( '-error:', xhr.errorCode );
			}.bind(this));
		},

		_noneMemberOrderInfo: function ( products ) {
			this._addCartProd( products ).done( function () {
				AP.modal.confirm( AP.message.ADDED_CART_TO_CART_PAGE ).addListener( 'modal-close', function (e) {
					if ( e.closeType === 'confirm' ) {
						this._goToPage( 'cart' );
					}
				}.bind(this));
			}.bind(this)).fail( function ( xhr ) {
				console.log( '-error:', xhr.errorCode );
			}.bind(this));
		},

		_addCartProd: function ( products ) {
			var defer = new $.Deferred(),
				cartProdExPostList = [];

			_.each( products, function ( product ) {
				cartProdExPostList.push({
					prodSn: product.prodSn,
					cartProdQty: 1,
					storePickupYn: 'N',
					integrationMembershipExchYn: 'N',
					activityPointExchYn: 'N'
				});
			});

			//장바구니 담기 api
			AP.api.addCartProd( null, JSON.stringify({cartProdExPostList: cartProdExPostList})).done( function ( result ) {
				// AP.header.resetCartCount();
				defer.resolve();
			}).fail( function ( xhr ) {
				AP.modal.alert( AP.message.API_SAVE_ERROR );
				defer.reject( xhr );
			});

			return defer.promise();
		},

		_goToPage: function ( type ) {
			location.href = AP.path.CART;
		}
	});

	AP.addCart = new AddCart();
})( jQuery );