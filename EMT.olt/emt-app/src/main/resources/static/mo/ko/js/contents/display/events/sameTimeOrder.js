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
			
			this._defaultModel = [];

			this._setUserSelectEvents();
			this._setEvents();
		},

		/** =============== Public Methods =============== */

		/**
		 * 로드된 온라인상품 목록 설정
		 * @param {Object}	model
		 */
		setDefaultData: function ( model ) {
			if(model != null && model != undefined){
				if( model.length > 0 ){
					this._defaultModel = model; 
				}
			}
			this._selectedOptions.setPromInfo( model );
		},
		
		//프로모션 탭 변경
		tabsChange: function ( index ) {
			var $el = this._$result.find('div.theme_set:eq('+index+')');
			this._$result.find('div.theme_set').hide();
			$el.show();
			this._selectedOptions.tabsChange( $el.data('promosn') );
		},
		
		/**
		 * 선택 옵션 추가
		 * @param {Object}	onlineProduct
		 * @param {Object}	product
		 * @param {Object}	promoSn
		 */
		setOnlineProd: function ( param ) {
			if( param != null && param != undefined ){
				if( param.currentObj.productsStp !=  undefined ){
					this._openOptionModal( param );
				} else {
					this._selectedOptions.addToGroup( param, this );
				}
			}
		},
		
		/**
		 * 온라인상품 설정
		 * @param {Object}	onlineProdSn
		 
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
		*/
		
		//주문레이어 그룹 셋팅
		drawPromotionGrp : function(){
			var html = AP.common.getTemplate( 'display.events.group-order-selected-option-list', this._defaultModel ); 
			this._$result.prepend( html );
			this._$result.find( 'div[data-promosn]' ).hide();
			this._$result.find( 'div[data-promosn]:first' ).show();
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
			this._$target.find( '.btn_basket' ).on( 'click', function (e) {
				AP.login().done(function () {
					var promosn = this._$result.find('.theme_set:visible').data('promosn');
					var products = this._selectedOptions.getSelectedData( promosn ),
						isAllTackout = _.every( products, function ( product ) {
							return product.currentObj.storePickupBtnEnable === 'Y';
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
			this._$target.find( '.btn_buy' ).on( 'click', function (e) {
				var promoSn = this._$result.find('.theme_set:visible').data('promosn');
				var products = this._selectedOptions.getSelectedData( promoSn );
				
				if( !this._validOrderCount( products, promoSn ) )return false;
				
				this._productsInOutOfStock( products ).done( function () {
					this._addCartProd( 'cart', products ).done( function () {
						AP.modal.confirm( AP.message.ADDED_CART_TO_CART_PAGE )
							.addListener( 'modal-close', function (e) {
								if ( e.closeType === 'confirm' ) {
									this._goToPage( 'cart' );
								}
							}.bind(this));
					}.bind(this)).fail( function ( xhr ) {
						console.info( xhr );
					}.bind(this));
					
				}.bind(this));
				
			}.bind(this));
		},
		
		// 장바구니 담기 시 그룹별 주문 수량 확인
		_validOrderCount : function( products, promoSn ){
			//프로모션 그룹 리스트
			var promoGrpList = _.findWhere(this._defaultModel, {promoSn : promoSn}).promoGrpList;
			var allOrderCnt = 0;
			
			//프로모션 그룹 리스트를 확인하여 프로모션에 맞는 주문수량을 체크
			for(var i = 0; i < promoGrpList.length; i++){
				allOrderCnt += promoGrpList[i]['ordQty'];
			}
			
			//장바구니에 담은 상품이 없을 경우
			if( products == undefined || products.length == 0 ){
				AP.modal.alert( AP.message.NONE_SELECTED_PRODUCT );
				return false;
			//프로모션 주문 수량보다 주문레이어에 선택한 상품수량이 작을 경우
			}else if( products.length < allOrderCnt ){
				var $emptyEl = this._$result.find('.theme_set:visible').find('.goods_box.empty');
				var theme = [];
				$.each($emptyEl, function(idx, el){
					var tempObj =  _.findWhere(promoGrpList, {sameTimePurProdGrpSn : $(el).data('promo-grop-sn')});
					theme.push( '[' + tempObj.grpTitle + ']' );
				});
				
				var msg = AP.message.SAME_TIME_SELECTED_ALL_PRODUCT.replace('$1', theme.toString());
				AP.modal.alert( msg );
				return false;
			}
			
			return true;
		},

		_setUserSelectEvents: function () {
			//선택된 옵션들
			this._selectedOptions = new AP.GroupOrderSelectedOptions( this._$result, this._defaultModel )
				.addListener( 'price-change', function (e) {
					this._$totalCount.text( $B.string.format(e.totalCount, 2) );
					this._$totalPrice.text( $B.string.numberFormat(e.totalPrice) );
				}.bind(this))
				.addListener( 'remove-all', function (e) {
					this.close();
				}.bind(this))
				.addListener( 'selectProd', function (e) {
					this.close();
				}.bind(this));
		},

		//option select 띄우기
		_openOptionModal: function ( param ) {
			var onlineProduct = param.currentObj;
			var modal = AP.modal.info({
					title: '옵션선택',
					contents: {
						templateKey: 'display.events.group-order-option-modal',
						templateModel: onlineProduct
					}
				}).addListener( 'modal-before-close', function (e) {
					$modal.find( '.goods_select_name' ).off( 'click' );
				}.bind(this)),
				
			$modal = modal.getElement();

			//상품선택
			$modal.find( '.goods_select_name' ).on( 'click', function (e) {
				var $goodsBox = $( e.currentTarget ).parent();
				
				if($goodsBox.hasClass('on')){
					$goodsBox.removeClass( 'on' );
				}else{
					$goodsBox.addClass( 'on' );
				}
			}.bind(this));
			
			$modal.find( '.btn_md_secondary' ).on( 'click', function (e) {
				$modal.find( '.layer_close' ).click();
			}.bind(this));
			
			//상품선택 후 주문 레이어에 담기
			$modal.find( '.btn_md_neutral' ).on( 'click', function (e) {
				var $items = $( e.currentTarget ).parents('.evt_goods').find('.goods_box.on');
				$.each($items, function(idx, el){
					var prodSn = $(el).find('.goods_select_name').data('prod-sn'),
					product = _.findWhere( onlineProduct.productsStp, {prodSn: prodSn} );

					param.currentObj = product;
					modal.close();
					this.open();
					return this._selectedOptions.addToGroup( param ); 
				}.bind(this));
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
			sameTimeCartProdExPostList = [{
				 storePickupYn : ( type === 'takeout' ) ? 'Y' : 'N'
				,sameTimePurPromoSn : products[0].promoSn
				,sameTimePurCartProdList : []
			}],
			activityPointExchYn = 'N',//진주알 구매
			integrationMembershipExchYn = this._$beatyPoint.prop('checked') ? 'Y' : 'N';//뷰티포인트 구매

			_.each( products, function ( product ) {
				sameTimeCartProdExPostList[0].sameTimePurCartProdList.push({
				        prodSn: product.currentObj.prodSn,
				        cartProdQty: product.currentObj.cartProdQty,
				        sameTimePurProdGrpSn: product.promoGrpSn,
				        sameTimePurProdComposeQty: product.orderQty
				  });
			});

			if ( products.length ) {
				//장바구니 저장 api
				//data = JSON.stringify( {cartProdExPostList: [{prodSn: 95, cartProdQty: 1, storePickupYn: 'N', integrationMembershipExchYn: 'N', activityPointExchYn: 'N'}]} );
				AP.api.addCartProd( null, JSON.stringify({sameTimeCartProdExPostList: sameTimeCartProdExPostList}))
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