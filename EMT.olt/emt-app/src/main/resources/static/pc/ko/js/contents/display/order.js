/**
 * 전시 : 주문 layer
 * @extends 	AP.OrderLayer
 */
;(function ( $ ) {
	'use strict';

	var Order = AP.OrderLayer.extend({

		/**
		 * @param {jQuery}	$target		'.option_layer'
		 */
		initialize: function ( $target ) {
			AP.OrderLayer.prototype.initialize.call( this, $target, null, {layerFixed: true} );

			this._$beatyPoint = this._$target.find( '.buy_beauty_point' );
			this._$totalCount = this._$target.find( '.total_count' );
			this._$totalPrice = this._$target.find( '.total_price' );

			this._setUserSelectEvents();
			this._setEvents();
		},

		/** =============== Public Methods =============== */

		/**
		 * 로드된 온라인상품 목록 설정
		 * @param {Object}	model
		 */
		setDefaultData: function ( model ) {
			this._defaultModel = model;
		},
		
		/**
		 * 로드된 사은품 목록 설정
		 * @param {Object}	model
		 */
		setGiftData: function ( model ) {
			this._giftModel = model;
		},
		
		/**
		 * 온라인상품 설정
		 * @param {Object}	onlineProdSn
		 * @param {Object}	prodSn
		 */
		setOnlineProd: function ( onlineProdSn, prodSn ) {
			
			var onlineProduct = _.findWhere( this._defaultModel.list, {onlineProdSn: onlineProdSn} );
			
			if( this._defaultModel.prodListUnitCode == 'Prod' ){
				onlineProduct = _.findWhere(this._defaultModel.list, {prodSn:prodSn});
			}
			
			if ( onlineProduct != undefined && _.contains(['OnSale', 'OutOfStock'], onlineProduct.saleDisplayStatus)  ) {
				//진주알
				if ( this._defaultModel.isActivityPoint ) {
					var pearlProduct = _.findWhere( onlineProduct.products, {prodSn: onlineProduct.selectedProdSn} );
					this._selectedOptions.add( onlineProduct, pearlProduct );
				} else {
					//기본
					if ( onlineProduct.productCount > 1 ) {
						var product = _.findWhere( onlineProduct.products, {prodSn: prodSn} );
						this._selectedOptions.add( onlineProduct, product );
					} else {
						//products 가 1개 일때는 단품으로 처리 (단품, 세트상품)
						this._selectedOptions.add( onlineProduct, onlineProduct.products[0] );
					}
				}
			}
			
			//사은품
			if ( onlineProduct == undefined ){
				var giftProd = _.findWhere( this._giftModel.list, {prodSn : prodSn} );
				onlineProduct = {
						prodTypeCode: '',
						bulkIncludedProds: '',
						productCount: 1,
						products: [giftProd],
						onlineProdGift: [giftProd]
				}
				giftProd.prodName = '<사은품> ' + giftProd.prodName;
				this._selectedOptions.add( onlineProduct, giftProd );
			}
		},

		/** =============== Private Methods =============== */

		/**
		 * 기본 이벤트 설정
		 * @override
		 */
		_setEvents: function () {
			//바로구매
			this._$target.find( '.btn_buy_now' ).on( 'click', function (e) {
				var products = this._selectedOptions.getSelectedData();

				this._productsInOutOfStock( products ).done( function () {
					if ( AP.LOGIN_USER ) {
						this._buyNowProd( products ).done( function () {
							this._goToPage( 'order' );
						}.bind(this)).fail( function ( xhr ) {
							//에러처리
							console.log( '-error:', xhr.errorCode );
						}.bind(this));

					} else {
						this._noneMemberOrderInfo( products, 'order' );
					}
				}.bind(this));
			}.bind(this));

			//테이크아웃 클릭
			this._$target.find( '.btn_takeout' ).on( 'click', function (e) {
				AP.login().done(function () {
					var products = this._selectedOptions.getSelectedData(),
						isAllTackout = _.every( products, function ( product ) {
							return product.storePickupBtnEnable === 'Y';
						});

					if ( isAllTackout ) {
						this._addCartProd( 'takeout', products ).done( function () {
							this._goToPage( 'takeout' );
						}.bind(this)).fail( function ( xhr ) {
							//에러처리
						}.bind(this));
					} else {
						AP.modal.alert( AP.message.IN_INVALID_TAKEOUT_PRODUCT );
					}
				}.bind(this));
			}.bind(this));

			//장바구니 클릭
			this._$target.find( '.btn_basket' ).on( 'click', function (e) {
				var products = this._selectedOptions.getSelectedData();
				this._productsInOutOfStock( products ).done( function () {
					if ( AP.LOGIN_USER ) {
						this._addCartProd( 'cart', products ).done( function () {
							AP.modal.confirm( AP.message.ADDED_CART_TO_CART_PAGE ).addListener( 'modal-close', function (e) {
								if ( e.closeType === 'confirm' ) {
									this._goToPage( 'cart' );
								}
							}.bind(this));
						}.bind(this)).fail( function ( xhr ) {
							//에러처리
						}.bind(this));
					} else {
						this._noneMemberOrderInfo( products, 'cart' );
					}
				}.bind(this));
			}.bind(this));
		},

		_setUserSelectEvents: function () {
			//선택된 옵션들
			this._selectedOptions = new AP.OrderSelectedOptions( this._$target.find('.selected_option_area') )
				.addListener( 'price-change', function (e) {
					this._$totalCount.text( $B.string.format(e.totalCount, 2) );
					this._$totalPrice.text( $B.string.numberFormat(e.totalPrice) );
				}.bind(this));
		},

		_buyNowProd: function ( products ) {
			var defer = new $.Deferred(),
				cartProdExPostList = [],
				storePickupYn = 'N',			//테이크아웃
				activityPointExchYn = 'N',		//진주알 구매
				integrationMembershipExchYn = this._$beatyPoint.prop('checked') ? 'Y' : 'N';	//뷰티포인트 구매

			_.each( products, function ( product ) {
				cartProdExPostList.push({
					prodSn: product.prodSn,
					cartProdQty: product.cartProdQty,
					storePickupYn: storePickupYn,
					integrationMembershipExchYn: integrationMembershipExchYn,
					activityPointExchYn: (product.activityPointOnly == 'Y') ? product.activityPointOnly : activityPointExchYn
				});
			});

			if ( products.length ) {
				AP.api.buyNowCartProd( null, JSON.stringify({cartProdExPostList: cartProdExPostList})).done( function ( result ) {
					// AP.header.resetCartCount();
					defer.resolve();
				}).fail( function ( xhr ) {
					AP.modal.alert( AP.message.API_SAVE_ERROR );
					defer.reject( xhr );
				});
			} else {
				AP.modal.alert( AP.message.NONE_SELECTED_PRODUCT );
			}

			return defer.promise();
		},

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

		_addCartProd: function ( type, products ) {
			var defer = new $.Deferred(),
				cartProdExPostList = [],
				storePickupYn = ( type === 'takeout' ) ? 'Y' : 'N',			//테이크아웃
				activityPointExchYn = 'N',									//진주알 구매
				integrationMembershipExchYn = this._$beatyPoint.prop('checked') ? 'Y' : 'N';//뷰티포인트 구매
			
			_.each( products, function ( product ) {
				cartProdExPostList.push({
					prodSn: product.prodSn,
					cartProdQty: product.cartProdQty,
					storePickupYn: storePickupYn,
					integrationMembershipExchYn: integrationMembershipExchYn,
					activityPointExchYn: (product.activityPointOnly == 'Y') ? product.activityPointOnly : activityPointExchYn
				});
			});

			if ( products.length ) {
				//장바구니 저장 api
				AP.api.addCartProd( null, JSON.stringify({cartProdExPostList: cartProdExPostList})).done( function ( result ) {
					AP.header.resetCartCount();
					defer.resolve();
				}).fail( function ( xhr ) {
					AP.modal.alert( AP.message.API_SAVE_ERROR );
					defer.reject( xhr );
				});
			} else {
				AP.modal.alert( AP.message.NONE_SELECTED_PRODUCT );
			}

			return defer.promise();
		},

		_noneMemberOrderInfo: function ( products, type ) {
			if ( products.length ) {
				var modal = AP.modal.info({
						title: '비회원 주문 안내',
						contents: {
							templateKey: 'products.none-member-order-info-modal'
						}
					}),
					$modal = modal.getElement();

				modal.addListener( 'modal-before-close', function (e) {
					$modal.find( '.btn_none_member_order, .btn_login' ).off( 'click' );
				});

				$modal.find( '.btn_none_member_order, .btn_login' ).on( 'click', function (e) {
					var requiredLogin = $( e.currentTarget ).hasClass( 'btn_login' );
					if ( type == 'order' ) {
						// 바로구매
						this._buyNowProd( products ).done( function () {
							this._goToPage( 'order', requiredLogin );
						}.bind(this)).fail( function ( xhr ) {
							//에러처리
							console.log( '-error:', xhr.errorCode );
						}.bind(this));

					} else if ( type == 'cart' ) {
						// 장바구니 담기
						this._addCartProd( 'cart', products ).done( function () {
							AP.modal.confirm( AP.message.ADDED_CART_TO_CART_PAGE ).addListener( 'modal-close', function (e) {
								if ( e.closeType === 'confirm' ) {
									this._goToPage( 'cart', requiredLogin );
								}
							}.bind(this));
						}.bind(this)).fail( function ( xhr ) {
							//에러처리
							console.log( '-error:', xhr.errorCode );
						}.bind(this));
					}
				}.bind(this));
			} else {
				AP.modal.alert( AP.message.NONE_SELECTED_PRODUCT );
			}
		},

		_goToPage: function ( type, requiredLogin ) {
			var url = '';

			switch ( type ) {
				case 'order':
				case 'none-member-order':
					url = AP.path.ORDER;
					post_goto(url, {'isRequiredLogin':( requiredLogin ) ?'true' : 'false'});
					break;
				case 'cart':
				case 'takeout':
					url = AP.path.CART;
					location.href = url + (( requiredLogin ) ? '?isRequiredLogin=true' : '' );
					break;
			}
		}

	}, 'Order');


	AP.Order = Order;
})( jQuery );