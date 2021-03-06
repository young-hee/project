/**
 * 제품상세 : 주문 layer
 * @extends 	AP.OrderLayer
 */
;(function ( $ ) {
	'use strict';

	var Order = AP.OrderLayer.extend({

		/**
		 * @param {jQuery}	$target		'.option_layer'
		 * @param {Object}	model
		 * @param {Object}	memberMap
		 */
		initialize: function ( $target, model, memberMap ) {
			AP.OrderLayer.prototype.initialize.call( this, $target );

			this._$result = this._$target.find( '.option_layer' );
			this._$beatyPoint = this._$target.find( '#buy_beauty_point' );
			this._$totalCount = this._$target.find( '#totalCnt' );
			this._$totalPrice = this._$target.find( '#totalPrice' );

			this._defaultModel = model;
			this._setUserSelectEvents();
			this._setEvents( memberMap );
			this._setBeautyPointCheckBox();
			
			this._selectOption = null;

			if ( this._defaultModel.saleDisplayStatus === 'EndSale' ) {
				this._$target.hide();
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
		 * 주문레이어를 열지 않고 단위 상품 셀렉트 박스를 선택하거나 컬러칩을 선택할 경우 
		 * 미리 주문레이어에 담을 옵션을 셋팅해 둠.
		 */
		selectOption : function( product ){
			this._selectOption = product;
		},


		/** =============== Private Methods =============== */

		/**
		 * 기본 이벤트 설정
		 * @override
		 */
		_setEvents: function ( memberMap ) {
			
			$(document).on('click', function(){
		 		if( this._$target.find('.ui_select').hasClass('open') ){
		 			this._$target.find('.option_layer').addClass('sub_open');
		 		}else{
		 			this._$target.find('.option_layer').removeClass('sub_open');
		 		}
		 	}.bind(this));
			
			//구매하기 버튼
			this._$target.find( '.btn_order' ).on( 'click', function (e) {
				this.open();
				
				if( this._selectOption != null ){
					this._selectedOptions.add( this._selectOption );
				}
				
				this._visibleBasketBtn();
				
			}.bind(this));
			
			//바로구매, 예약구매 클릭
			this._$target.find( '.btn_buy_now, .btn_pre_purchase' ).on( 'click', function (e) {
				var products = this._selectedOptions.getSelectedData();
				if ( AP.LOGIN_USER ) {
					this._buyNowProd( products ).done( function () {
						this._goToPage( 'order' );
					}.bind(this)).fail( function ( xhr ) {
						//에러처리
						console.log( '-error:', xhr.errorCode );
					}.bind(this));
				} else {
					var modal = AP.modal.info({
						 title : AP.message.BEFORE_BUY_MESSAGE
						,contents : '<ul class="p_btn_area">'+
									'<li><a href="javascript:;" class="moveLogin">로그인 구매</a></li>'+
									'<li><a href="javascript:;" class="noneLogin">비로그인 구매</a></li>'+
									'</ul>'
						,confirmLabel : '닫기'
						,containerClass : ' system_new_android'
						,noneSystemAlert : true
						,hideCloseBtn : true
						,target : '#ap_container'
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

			//장바구니 클릭
			this._$target.find( '.btn_basket' ).on( 'click', function (e) {
				//예약 주문 상품일 경우 장바구니 비활성화
				if ( this._defaultModel.prodTypeCode == 'Presale' )
					return false;
				
				var products = this._selectedOptions.getSelectedData();
				this._addCartProd( 'cart', products ).done( function () {
					this.close();
					AP.addLike.add(this._$target, undefined, 'cart');
					$('.toast_cart_msg').fadeIn().delay(2000).fadeOut();
				}.bind(this)).fail( function ( xhr ) {
					//에러처리
					//console.log( '-error:', xhr.errorCode );
				}.bind(this));
			}.bind(this));

			//언제 들어와? 알림 신청
			this._$target.find( '.btn_restock_notify_me' ).on( 'click', function (e) {
				AP.login().done(function () {
					this._openRestockNotifyModal( memberMap );
				}.bind(this));
			}.bind(this));
			
			//좋아요 on/off
			this._$target.find( '.btn_good' ).on( 'click', function (e) {
				if( !AP.LOGIN_USER ){
					AP.login.go();
					return false;
				}
				
				var $this = $(e.currentTarget);
				var prodSn = null;
				var sendApi = '';
				var selectedData = this._selectedOptions.getSelectedData();
				this._callback = null;
				
				//좋아요 off
				if( $this.hasClass('on') ){
					if( selectedData.length == 0 ){
						sendApi = 'offRecommendFromOnline';
					} else {
						sendApi = 'offRecommend';
						prodSn = selectedData[selectedData.length-1].prodSn;
					}
					this._callback  = function(){
						$this.find('.num').text(Number( $this.find('.num').text() ) - 1);
						$this.removeClass( 'on' );
						$this.find('i').removeClass( 'on' );
						if( Number( $this.find('.num').text() ) == 0 ){
							$this.addClass( 'none_like' );
							$this.find('.num').hide();
						}
					}
				} else { //좋아요 on	
					//좋아요 on
					sendApi = 'postRecommend';
					if( selectedData.length == 0 ){
						prodSn = this._defaultModel.products[0].prodSn;
					} else {
						prodSn = selectedData[selectedData.length-1].prodSn;
					}
					this._callback  = function(){
						$this.find('.num').text(Number( $this.find('.num').text() ) + 1).show();
						$this.addClass( 'on' ).removeClass('none_like');
						$this.find('i').addClass( 'on' );
						AP.addLike.add(this._$target);
					}
				}
				
				AP.api[sendApi]('', {
					 shoppingMarkTgtCode : 'Prod' 
			  		,prodSn : prodSn
			  		,onlineProdSn : this._defaultModel.onlineProdSn
				}).done(function(result){
					this._callback();
				}.bind(this)).fail(function(err){
					console.log( err );
				}.bind(this));
				
			}.bind(this));
		},
		
		//장바구니 & 바로구매 버튼 활성화 여부
		_visibleBasketBtn: function () {
			if( this._selectedOptions.getSelectedData().length == 0 ){
				this._$target.find( '.btn_basket' ).prop('disabled', true);
				this._$target.find( '.btn_buy_now' ).prop('disabled', true);
			}else{
				if( this._defaultModel.prodTypeCode != 'Presale' ){
					this._$target.find( '.btn_basket' ).prop('disabled', false);
				}
				this._$target.find( '.btn_buy_now' ).prop('disabled', false);
			}
		},
		_setUserSelectEvents: function () {
			
			//옵션 selectbox
			this._optionsSelectBox = new AP.OptionsSelectBox( this._$result, this._defaultModel )
				.addListener( 'add-selectbox', function (e) {
					this._setSizeEvents();
				}.bind(this)).addListener( 'select-option', function (e) {
					this._selectedOptions.add( e.product );
					this.dispatch('select-option', e);
				}.bind(this));

			//선택된 옵션들
			this._selectedOptions = new AP.SelectedOptions( this._$result, this._defaultModel )
				.addListener( 'price-change', function (e) {
					this._$totalCount.text( $B.string.format(e.totalCount, 2) );
					this._$totalPrice.text( $B.string.numberFormat(e.totalPrice) );
					
					this._visibleBasketBtn();
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
						return product.membershipExchBtnEnable === 'N'
					}.bind(this));

					if ( isBuyBeatyPointError ) {
						AP.modal.alert( AP.message.IN_INVALID_BEAUTYPOINT_PRODUCT );
						this._$beatyPoint.prop( 'checked', false );
					} else {
						AP.login().fail( function () {
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
					//AP.header.resetCartCount();
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

		_addCartProd: function ( type, products ) {
			var defer = new $.Deferred(),
				cartProdExPostList = [],
				storePickupYn = ( type === 'takeout' ) ? 'Y' : 'N',//테이크아웃
				activityPointExchYn = 'N',//진주알 구매
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
			return false;
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
		},

		//언제 들어와? 알림 신청
		_openRestockNotifyModal: function ( memberMap ) {
			new AP.RestockNotify().open( this._defaultModel, memberMap );
		}

	}, 'Order');


	AP.Order = Order;
})( jQuery );