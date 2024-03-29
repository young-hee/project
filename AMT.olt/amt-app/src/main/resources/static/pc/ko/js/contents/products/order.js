/**
 * 제품상세 : 주문
 * @extends		AP.OrderLayer
 * Events:
 * 	add-item
 * 	remove-item
 *	spinner-change
 */
;(function ( $ ) {
	'use strict';

	var Order = AP.OrderLayer.extend({

		/**
		 * @param {jQuery}	$target		영역설정
		 * @param {Object}	model
		 * @param {Object}	options
		 * 	- {Boolean}	layerFixed			scroll에 따른 layer fixed 처리 허용 여부
		 * 	- {Boolean}	selectBoxThumbnail	selectbox 썸네일 노출 여부
		 */
		initialize: function ( $target, model, options ) {
			AP.OrderLayer.prototype.initialize.call( this, $target, model, options );

			this._$beatyPoint = this._$target.find( '.buy_beauty_point' );
			this._$totalCount = this._$target.find( '.total_count' );
			this._$totalPrice = this._$target.find( '.total_price' );
			
			this._setUserSelectEvents();
			this._setEvents();
			this._setBeautyPointCheckBox();
			
			if ( this._defaultModel.saleDisplayStatus === 'EndSale' ) {
				AP.modal.alert( AP.message.OUT_OF_STOCK_PRODUCT );
			} else if ( _.contains(['OnSale', 'OutOfStock'], this._defaultModel.saleDisplayStatus) ) {
				//묶음 상품일 경우 
				if ( this._defaultModel.prodTypeCode == 'BulkFixedProd' ) {
					this._selectedOptions.add( this._defaultModel.products[0] );
				} else {
					//기본
					if ( this._defaultModel.productCount > 1 ) {
						this._optionsSelectBox.setDefault();
					} else {
						//products 가 1개 일때는 단품으로 처리 (단품, 세트상품)
						this._selectedOptions.add( this._defaultModel.products[0] );
					}
				}
			}
		},

		/** =============== Public Methods =============== */
		
		/**
		 * 상품에 컬러가 있을 경우 셀렉트 박스를 감춤
		 */
		invisibleSelectOption : function(){
			this._optionsSelectBox.invisibleSelectOption();
		},

		/**
		 * 아이템 추가 (product)
		 * @param {Object}	product
		 */
		addItem: function ( product ) {
			this._selectedOptions.add( product, true );
		},

		/**
		 * 아이템 삭제 (product)
		 * @param {Int}	prodSn
		 */
		removeItem: function ( prodSn ) {
			this._selectedOptions.remove( prodSn );
		},

		/**
		 * prodSn 과 일치하는 spinner 의 value 변경
		 * @param {Int} prodSn
		 * @param {Int} count	spinner 의 value
		 */
		changeSpinner: function ( prodSn, count ) {
			this._selectedOptions.changeSpinner( prodSn, count );
		},

		/** =============== Private Methods =============== */

		/**
		 * 기본 이벤트 설정
		 */
		_setEvents: function () {
			//바로구매, 예약구매 클릭
			this._$target.find( '.btn_buy_now, .btn_pre_purchase' ).on( 'click', function (e) {
				var products = this._selectedOptions.getSelectedData();
				if( products.length == 0 ){
					AP.modal.alert({
						contents : '<div class="ly_info">'+
										'<p class="ly_txtSt1">옵션을 선택해 주세요.</p>'+
										'<div class="layer_btns">'+
											'<a href="#none" class="btn_fix_neutral btn_default_modal_confirm">확인</a>'+
										'</div>'+
								   '</div>'
						,noneSystemAlert : true
						,noneBtnConfirm:true
					});
					return false;
				}

				if ( AP.LOGIN_USER ) {
					this._buyNowProd( products ).done( function () {
						this._goToPage( 'order' );
					}.bind(this)).fail( function ( xhr ) {
						//에러처리
						console.log( '-error:', xhr.errorCode );
					}.bind(this));

				} else {
					var modal = AP.modal.info({
						 title : '구매안내'
						,contents : '<div class="ly_info">'+
										'<p class="color_black font_sl">'+AP.message.BEFORE_BUY_MESSAGE+'</p>'+
										'<div class="layer_btns">'+
											'<a href="#none" class="btn_fix_bordered noneLogin">비로그인 구매</a>'+
											'<a href="#none" class="btn_fix_neutral btn_default_modal_confirm moveLogin">로그인 구매</a>'+
										'</div>'+
									'</div>'
						,noneSystemAlert : true
					}),
					$modal = modal.getElement();
					
					//로그인 페이지 이동
					$modal.find('.moveLogin').on('click', function(e){
						AP.login.go();
					}.bind(this));
					
					//비회원 구매 이용약관 페이지로 이동
					$modal.find('.noneLogin').on('click', function(e){
						var $cur = $(e.currentTarget);
						this._noneMemberOrderInfo( products, 'order' );
					}.bind(this));
				}
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
				//예약 주문 상품일 경우 장바구니 비활성화
				if ( this._defaultModel.prodTypeCode == 'Presale' )
					return false;
				
				var products = this._selectedOptions.getSelectedData();
				if( products.length == 0 ){
					AP.modal.alert({
						contents : '<div class="ly_info">'+
										'<p class="ly_txtSt1">옵션을 선택해 주세요.</p>'+
										'<div class="layer_btns">'+
											'<a href="#none" class="btn_fix_neutral btn_default_modal_confirm">확인</a>'+
										'</div>'+
								   '</div>'
						,noneSystemAlert : true
						,noneBtnConfirm:true
					});
					return false;
				}
				
				this._productsInOutOfStock( products ).done( function () {
					//if ( AP.LOGIN_USER ) {
						this._addCartProd( 'order', products ).done( function () {
							AP.modal.confirm( AP.message.ADDED_CART_TO_CART_PAGE ).addListener( 'modal-close', function (e) {
								if ( e.closeType === 'confirm' ) {
									this._goToPage( 'cart' );
								}
							}.bind(this));
						}.bind(this)).fail( function ( xhr ) {
							//에러처리
						}.bind(this));
					//} else {
						//this._noneMemberOrderInfo( products, 'cart' );
					//}
				}.bind(this));
			}.bind(this));
		},

		_setUserSelectEvents: function () {
			
			//옵션 selectbox
			this._optionsSelectBox = new AP.OptionsSelectBox( this._$target.find('.selectbox_area'), this._defaultModel, this._options.selectBoxThumbnail )
				.addListener( 'add-selectbox', function (e) {
					//this._setSizeEvents();
				}.bind(this)).addListener( 'select-option', function (e) {
					this._selectedOptions.add( e.product );
					this.dispatch( 'add-item', {product: e.product} );
				}.bind(this));

			//선택된 옵션들
			this._selectedOptions = new AP.SelectedOptions( this._$target.find('.selected_option_area'), this._defaultModel, this._options.selectBoxThumbnail )
				.addListener( 'price-change', function (e) {
					if ( e.totalCount < 1 ) {
						this._$totalCount.parent().hide();
					} else {
						this._$totalCount.parent().show();
					}

					this._$totalCount.text( $B.string.format(e.totalCount, 2) );
					this._$totalPrice.text( $B.string.numberFormat(e.totalPrice) );
				}.bind(this))
				.addListener( 'spinner-change', function (e) {
					this.dispatch( 'spinner-change', e );
				}.bind(this))
				.addListener( 'remove-item', function (e) {
					this.dispatch( 'remove-item', {prodSn: e.prodSn} );
				}.bind(this));
		},

		_setBeautyPointCheckBox: function () {
			var isBtnView = _.some( this._defaultModel.products, function ( product ) {
				return product.membershipExchBtnEnable === 'Y'
			}.bind(this));

			if ( isBtnView ) {
				this._$target.find( '.beauty_point_chk' ).show();
			} else {
				this._$target.find( '.beauty_point_chk' ).hide();
			}

			//뷰티포인트로 구매하기
			this._$beatyPoint.on( 'change', function (e) {
				if ( this._$beatyPoint.is(':checked') ) {
					//선택한 옵션중에 "N" 이 있으면 에러 메세지
					var isBuyBeatyPointError = _.some( this._defaultModel.products, function ( product ) {
						return product['membershipExchBtnEnable'] === 'N'
					}.bind(this));

					if ( isBuyBeatyPointError ) {
						AP.modal.alert( AP.message.IN_INVALID_BEAUTYPOINT_PRODUCT );
						this._$beatyPoint.prop( 'checked', false );
					} else {
						AP.login().done( function () {
							//
						}.bind(this)).fail( function () {
							this._$beatyPoint.prop( 'checked', false );
						}.bind(this));
					}
				}
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
					integrationMembershipExchYn: product.membershipExchOnly,
					activityPointExchYn: activityPointExchYn
				});
			});
			
			//묶음 상품일 경우
			if( this._defaultModel.prodTypeCode == 'BulkFixedProd' ){
				cartProdExPostList[0].cartBulkIncludedProdExList = []; 
				$.each(this._defaultModel.bulkIncludedProds, function(idx, obj){
					cartProdExPostList[0].cartBulkIncludedProdExList.push({
						 bulkDcIncludedProdGrpSn : obj.grpSn
						,includedProdSn : obj.prodSn
						,includedProdQty : obj.includedProdQty
					});
				});
			}

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
					integrationMembershipExchYn: product.membershipExchOnly,
					activityPointExchYn: activityPointExchYn
				});
			});
			
			//묶음 상품일 경우
			if( this._defaultModel.prodTypeCode == 'BulkFixedProd' ){
				cartProdExPostList[0].cartBulkIncludedProdExList = []; 
				$.each(this._defaultModel.bulkIncludedProds, function(idx, obj){
					cartProdExPostList[0].cartBulkIncludedProdExList.push({
						 bulkDcIncludedProdGrpSn : obj.grpSn
						,includedProdSn : obj.prodSn
						,includedProdQty : obj.includedProdQty
					});
				});
			}
			
			if ( products.length ) {
				//장바구니 저장 api
				AP.api.addCartProd( null, JSON.stringify({cartProdExPostList: cartProdExPostList})).done( function ( result ) {
					//AP.header.resetCartCount();
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
							if ( requiredLogin ) {
								this._goToPage( 'cart', requiredLogin );
							} else {
								AP.modal.confirm( AP.message.ADDED_CART_TO_CART_PAGE ).addListener( 'modal-close', function (e) {
									if ( e.closeType === 'confirm' ) {
										this._goToPage( 'cart', requiredLogin );
									}
								}.bind(this));
							}
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