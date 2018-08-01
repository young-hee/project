/**
 * 전시 : 주문 layer - 선택된 옵션 관리
 * Events:
 * 		price-change	금액 변경시 전달, e.totalPrice, e.totalCount
 * 		remove-all		모든 옵션이 삭제 됬을시 전달
 */
;(function ( $ ) {
	'use strict';

	var OrderSelectedOptions = $B.Class.extend({

		/**
		 * @param {jQuery}	$appendTarget
		 */
		initialize: function ( $appendTarget ) {
			this._$appendTarget = $appendTarget;
			this._selectedData = [];

			this._setEvents();
		},

		/** =============== Public Methods =============== */

		/**
		 * 선택 옵션 추가
		 * @param {Object}	onlineProduct
		 * @param {Object}	product
		 */
		add: function ( onlineProduct, product ) {
			this._defaultModel = onlineProduct;
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
				this._selectedData.push( product );
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
		 * @override
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

			if ( this._selectedData.length < 1 ) {
				this.dispatch( 'remove-all' );
			}
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
				var prodSn = $( e.currentTarget ).data( 'prod-sn' );
				this.remove( prodSn );
			}.bind(this));
		},

		_draw: function ( product ) {
			var html = AP.common.getTemplate( 'display.order-selected-option-list', {
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
		},

		_setProductValue: function ( $el, product, count ) {
			var salePrice = this._getSalePrice( product ),
				beforeSalePrice = product.prodPriceSummary.beforeOnlineSalePrice;

			$el.find( '.item_before_total_price' ).text( $B.string.numberFormat(beforeSalePrice * count) );
			$el.find( '.item_total_price' ).text( $B.string.numberFormat(salePrice * count) );
		},

		_getSalePrice: function ( product ) {
			//진주알 포인트
			if ( product.activityPointOnly === 'Y' ) {
				return product.exchActivityPoint;
			} else {
				return product.prodPriceSummary.onlineSalePrice;
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


	AP.OrderSelectedOptions = OrderSelectedOptions;
})( jQuery );