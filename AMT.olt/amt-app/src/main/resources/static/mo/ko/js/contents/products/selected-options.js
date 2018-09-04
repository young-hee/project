/**
 * 제품상세 : 주문 layer - 선택된 옵션 관리
 * Events:
 * 		price-change	금액 변경시 전달, e.totalPrice, e.totalCount
 */
;(function ( $ ) {
	'use strict';

	var SelectedOptions = $B.Class.extend({

		/**
		 * @param {jQuery}	$appendTarget
		 * @param {Object}	model
		 */
		initialize: function ( $appendTarget, model ) {
			this._$appendTarget = $appendTarget.find('.selected_option_wrap');
			this._defaultModel = model;
			this._selectedData = [];

			this._setEvents();
		},

		/** =============== Public Methods =============== */

		/**
		 * 선택 옵션 추가
		 */
		add: function ( product ) {
			product = $B.object.clone( product );

			//중복적용 체크
			var isSameProd = _.some( this._selectedData, function ( prod ) {
				return prod.prodSn === product.prodSn;
			}.bind(this));

			if ( isSameProd ) {
				AP.modal.alert({
					contents: AP.message.DUPLICATE_SELECTED_PRODUCT,
					returnFocusTarget: this._$appendTarget.find( '.product_item[data-prod-sn="' + product.prodSn + '"] .spinner_increase' )
				});
			} else {
				//기본 구매수량 최소수량으로 설정
				product.cartProdQty = product.minPurLimitQty;
				if( product.saleDisplayStatus != 'OutOfStock' ){
					this._selectedData.push( product );
				}
				this._draw( product );
				
				this.dispatch( 'price-change', {
					totalPrice: this._getTotalPrice(),
					totalCount: this._getTotalCount()
				});
			}
		},

		/**
		 * 선택된 옵션 삭제
		 * @param {Int}		prodSn	값을 넣지 않으면 모두삭제
		 */
		remove: function ( prodSn ) {
			var $el;

			if ( prodSn ) {
				$el = this._$appendTarget.find( '.product_item[data-prod-sn="' + prodSn + '"]' );

				_.some( this._selectedData, function ( prod, idx ) {
					if ( prod.prodSn === prodSn ) {
						this._selectedData.splice( idx, 1 );
						return true;
					}
				}.bind(this));
			} else {
				this._selectedData = [];
				$el = this._$appendTarget.find( '.product_item' );
			}

			$el.find( '.ui_spinner' ).spinner( 'clear' ).off( 'spinner-change' );
			$el.remove();
			
			this.dispatch( 'price-change', {
				totalPrice: this._getTotalPrice(),
				totalCount: this._getTotalCount()
			});
		},

		/**
		 * 현재 선택된 products 데이타 반환
		 * 구매수량 = product.cartProdQty
		 * @returns {Array}
		 */
		getSelectedData: function () {
			return this._selectedData;
		},

		/** =============== Private Methods =============== */

		/**
		 * 기본 이벤트 설정
		 */
		_setEvents: function () {
			this._$appendTarget.on( 'click', '.btn_del', function (e) {
				var prodSn = $( e.currentTarget ).parent().data( 'prod-sn' );
				this.remove( prodSn );
			}.bind(this));
		},

		_draw: function ( product ) {
			var html = AP.common.getTemplate( 'products.selected-option-list', {
						prodTypeCode: this._defaultModel.prodTypeCode,
						bulkIncludedProds: this._defaultModel.bulkIncludedProds,
						productCount: this._defaultModel.productCount,
						products: [product],
						onlineProdGift: this._defaultModel.onlineProdGift
					}),
				$el = $( html );

			this._$appendTarget.append( $el );

			$el.find( '.ui_spinner' ).spinner().on( 'spinner-change', function (e) {
				this._setProductValue( $el, product, e.value );
				//구매수량 count
				product.cartProdQty = e.value;

				this.dispatch( 'price-change', {
					totalPrice: this._getTotalPrice(),
					totalCount: this._getTotalCount()
				});
			}.bind(this));
			
			//일시 품절일때 > 앱다운받기 버튼
			$el.find( '.incoming_alarm' ).on( 'click', function(){
				AP.modal.confirm({
					 contents : AP.message.LINK_ALARM_APP_STORE
					,containerClass: 'system_alert'
					,confirmLabel : '다운로드'
					,cancelLabel : '닫기'
				}).addListener( 'modal-before-close', function (e) { 
					if( e.closeType == 'confirm' ){
						if( $B.ua.ANDROID ){
							location.href = AP.url.ANDROID_APP_STORE;
						}else{
							location.href = AP.url.IOS_APP_STORE;
						}
					}
				});
			});
		},

		_setProductValue: function ( $el, product, count ) {
			var salePrice = this._getSalePrice( product ),
				beforeSalePrice = AP.common.availablePrices( product.availablePrices, 'beforeOnlineSalePrice' );

			$el.find( '.item_total_price' ).text( $B.string.numberFormat(salePrice * count) );
		},

		_getSalePrice: function ( product ) {
			//진주알 포인트
			if ( product.activityPointOnly === 'Y' ) {
				return product.exchActivityPoint;
			} else if( product.membershipExchOnly === 'Y' ) { //뷰티 포인트 
		        return product.exchMembershipPoint;
			} else {
				return AP.common.availablePrices( product.availablePrices, 'finalOnlinePrice' );
			}
		},

		_getTotalPrice: function () {
			var result = 0;

			_.each( this._selectedData, function ( product ) {
				result += ( this._getSalePrice(product) * this._getTotalCount(product) );
			}.bind(this));

			return result;
		},

		_getTotalCount: function ( prod ) {
			var result = 0;

			if ( prod ) {
				result += prod.cartProdQty;
			} else {
				_.each( this._selectedData, function ( product ) {
					result += product.cartProdQty;
				}.bind(this));
			}

			return result;
		}

	}, 'SelectedOptions');


	AP.SelectedOptions = SelectedOptions;
})( jQuery );