/**
 * 기획전시 (이벤트) : Group 주문 layer (동시구매기획전)
 * @extends 	AP.OrderLayer
 */
;(function ( $ ) {
	'use strict';

	//TODO: 작업중.....

	var GroupOrder = AP.OrderLayer.extend({

		/**
		 * @param {jQuery}	$target		'.option_layer'
		 */
		initialize: function ( $target ) {
			AP.OrderLayer.prototype.initialize.call( this, $target );

			this._$result = this._$target.find( '.option_wrap' );
			this._$beatyPoint = this._$target.find( '#buy_beauty_point' );
			this._$totalCount = this._$target.find( '.buy_info .opt_selected .num' );
			this._$totalPrice = this._$target.find( '.buy_info .buy_result .num' );

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

			var isInTackout = _.some( this._defaultModel.list, function ( onlineProduct ) {
				return _.some( onlineProduct.products, function ( product ) {
					return product.storePickupBtnEnable === 'Y';
				});
			});

			if ( !isInTackout ) {
				this._$target.find( '.btn_takeout' ).remove();
			}
		},

		/**
		 * 온라인상품 설정
		 * @param {Object}	onlineProdSn
		 */
		setOnlineProd: function ( onlineProdSn ) {
			var onlineProduct = _.findWhere( this._defaultModel.list, {onlineProdSn: onlineProdSn} );

			if ( _.contains(['OnSale', 'OutOfStock'], onlineProduct.saleDisplayStatus) ) {
				//진주알
				if ( this._defaultModel.isActivityPoint ) {
					var product = _.findWhere( onlineProduct.products, {prodSn: onlineProduct.selectedProdSn} );
					this._selectedOptions.add( onlineProduct, product );
					this.open();
				} else {
					//기본
					if ( onlineProduct.productCount > 1 ) {
						this._openOptionModal( onlineProduct );
					} else {
						//products 가 1개 일때는 단품으로 처리 (단품, 세트상품)
						this._selectedOptions.add( onlineProduct, onlineProduct.products[0] );
						this.open();
					}
				}
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
						this._addCartProd( 'order', products ).done( function () {
							this._goToPage( 'order' );
						}.bind(this)).fail( function ( xhr ) {
							//에러처리
						}.bind(this));
					} else {
						this._noneMemberOrderInfo( products );
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
					this._addCartProd( 'cart', products ).done( function () {
						AP.modal.confirm( AP.message.ADDED_CART_TO_CART_PAGE )
							.addListener( 'modal-close', function (e) {
								if ( e.closeType === 'confirm' ) {
									this._goToPage( 'cart' );
								}
							}.bind(this));
					}.bind(this)).fail( function ( xhr ) {
						//에러처리
					}.bind(this));
				}.bind(this));
			}.bind(this));
		},

		_setUserSelectEvents: function () {
			//선택된 옵션들
			this._selectedOptions = new AP.OrderSelectedOptions( this._$result )
				.addListener( 'price-change', function (e) {
					this._$totalCount.text( $B.string.format(e.totalCount, 2) );
					this._$totalPrice.text( $B.string.numberFormat(e.totalPrice) );
				}.bind(this))
				.addListener( 'remove-all', function (e) {
					this.close();
				}.bind(this));
		},

		//option select 띄우기
		_openOptionModal: function ( onlineProduct ) {
			var modal = AP.modal.info({
					title: '옵션선택',
					contents: {
						templateKey: 'display.order-option-modal',
						templateModel: onlineProduct
					}
				}).addListener( 'modal-before-close', function (e) {
					$modal.find( '.goods_select_name' ).off( 'click' );
				}.bind(this)),
				$modal = modal.getElement();

			//상품선택
			$modal.find( '.goods_select_name' ).on( 'click', function (e) {
				$( e.currentTarget ).parent().addClass( 'on' );

				var prodSn = $( e.currentTarget ).data( 'prod-sn' ),
					product = _.findWhere( onlineProduct.products, {prodSn: prodSn} );

				modal.close();
				this._selectedOptions.add( onlineProduct, product );
				this.open();
			}.bind(this));
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
				storePickupYn = ( type === 'takeout' ) ? 'Y' : 'N',//테이크아웃
				activityPointExchYn = 'N',//진주알 구매
				integrationMembershipExchYn = this._$beatyPoint.prop('checked') ? 'Y' : 'N';//뷰티포인트 구매

			if ( type === 'takeout' ) {
				storePickupYn = 'Y';
			}

			_.each( products, function ( product ) {
				cartProdExPostList.push({
					prodSn: product.prodSn,
					cartProdQty: product.cartProdQty,
					storePickupYn: storePickupYn,
					integrationMembershipExchYn: integrationMembershipExchYn,
					activityPointExchYn: activityPointExchYn
				});
			});

			if ( products.length ) {
				//장바구니 저장 api
				//data = JSON.stringify( {cartProdExPostList: [{prodSn: 95, cartProdQty: 1, storePickupYn: 'N', integrationMembershipExchYn: 'N', activityPointExchYn: 'N'}]} );
				AP.api.addCartProd( null, JSON.stringify({cartProdExPostList: cartProdExPostList}))
					.done( function ( result ) {
						AP.header.resetCartCount();
						defer.resolve();
					})
					.fail( function ( xhr ) {
						AP.modal.alert( AP.message.API_SAVE_ERROR );
						defer.reject( xhr );
					});
			} else {
				AP.modal.alert( AP.message.NONE_SELECTED_PRODUCT );
			}

			return defer.promise();
		},

		_noneMemberOrderInfo: function ( products ) {
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
					if ( $(e.currentTarget).hasClass('btn_login') ) {
						AP.login.go();
					} else {
						this._addCartProd( 'none-member-order', products ).done( function () {
							this._goToPage( 'none-member-order' );
						}).fail( function ( xhr ) {
							//에러처리
						});
					}
				}.bind(this));
			} else {
				AP.modal.alert( AP.message.NONE_SELECTED_PRODUCT );
			}
		},

		_goToPage: function ( type ) {
			var url = '';

			switch ( type ) {
				case 'order':
				case 'none-member-order':
					url = AP.path.ORDER;
					break;
				case 'cart':
				case 'takeout':
					url = AP.path.CART;
					break;
			}

			location.href = url;
		}

	}, 'GroupOrder');


	AP.GroupOrder = GroupOrder;
})( jQuery );