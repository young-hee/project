/**
 * 기획전시 (이벤트) : Group 주문 layer - 선택된 옵션 관리 (동시구매기획전)
 * Events:
 * 		price-change	금액 변경시 전달, e.totalPrice, e.totalCount
 * 		spinner-change	user가 spinner count 변경시 발생, e.prodSn, e.value
 */
;(function ( $ ) {
	'use strict';


	//TODO: 작업중.....

	var GroupOrderSelectedOptions = $B.Class.extend({

		/**
		 * @param {jQuery}	$appendTarget
		 */
		initialize: function ( $appendTarget ) {
			this._$appendTarget = $appendTarget;
			this._promotionInfo = [];
			this._selectedData = [];

			this._setEvents();
		},

		/** =============== Public Methods =============== */
		
		/**
		 * 로드된 온라인상품 목록 설정
		 * @param {Object}	model
		 */
		setPromInfo: function ( model ) {
			if(model != null && model != undefined){
				if( model.length > 0 ){
					this._promotionInfo = model; 
				}
			}
		},
		
		//프로모션 탭 변경
		tabsChange: function ( promoSn ) {
			this.dispatch( 'price-change', {
				totalPrice: this._getTotalPrice( promoSn ),
				totalCount: this._getTotalCount( false, promoSn )
			});
		},

		/**
		 * 선택 옵션 추가
		 * @param {Object}	onlineProduct
		 * @param {Object}	product
		 * @param {Object}	promoSn
		 */
		addToGroup: function ( param ) {
			this._drawProdToLayer( param );
		},
		
		/**
		 * 현재 활성화된 프로모션의 정보를 가져옴.
		 */
		_getCurrentPromoInfo : function( promoSn ){
			for (var i = 0; i < this._promotionInfo.length; i++) {
				if( this._promotionInfo[i]['promoSn'] == promoSn ){
					return this._promotionInfo[i];
				}
			}
		},
		
		/**
		 * 선택한 상품을 현재 활성화 프로모션 객체에 추가
		 */
		_pushProd2CurrentPromotion : function( prodObj ){
			if( this._getCurrentPromoInfo( prodObj.promoSn )._selectedData == undefined ){
				this._getCurrentPromoInfo( prodObj.promoSn )._selectedData = [];
			}
			
			this._getCurrentPromoInfo( prodObj.promoSn )._selectedData.push( prodObj );
		},
		
		/**
		 * 선택 옵션을 주문 레이어 및 현재 활성화된 프로모션에 추가
		 * @param {Object}	param
		 */
		_drawProdToLayer : function( param ){
			var $promotionLayer = this._$appendTarget.find('dl[data-promosn='+param.promoSn+']');
			var $promotionGrpLayer = $promotionLayer.find('li.empty[data-promo-grop-sn='+param.promoGrpSn+']:visible'); 
			
			if( $promotionGrpLayer.length > 0 ){
				$promotionGrpLayer = $promotionGrpLayer.first();
				var html = AP.common.getTemplate( 'display.events.group-order-selected-option-item', param.currentObj );
				$promotionGrpLayer.after( html );
				$promotionGrpLayer.removeClass('empty').hide();
				
				//기본 구매수량 최소수량으로 설정
				param.currentObj.cartProdQty = param.currentObj.minPurLimitQty;
				param.orderQty = _.findWhere(this._getCurrentPromoInfo(param.promoSn).promoGrpList, {sameTimePurProdGrpSn: param.promoGrpSn}).ordQty;
				this._pushProd2CurrentPromotion( param );
				
				//혜택 미적용 문구 변경
				if( $promotionLayer.find('li.empty').length == this._getCurrentPromoInfo( param.promoSn )._selectedData.length ){
					$promotionLayer.find('.notApply').hide();
					$promotionLayer.find('.apply').show();
				}
				
				this.dispatch( 'price-change', {
					totalPrice: this._getTotalPrice( param.promoSn ),
					totalCount: this._getTotalCount( false, param.promoSn )
				});
				
			}else{
				var promoGrpList = _.findWhere( this._promotionInfo , { promoSn : param.promoSn } ).promoGrpList;
				var groupName = _.findWhere( promoGrpList, { sameTimePurProdGrpSn : param.promoGrpSn } ).grpTitle;
				var msg = AP.message.SAME_TIME_SELECTED_PRODUCT_COUNT.replace('$1', groupName );
				AP.modal.alert( msg );
				return false;
			}
		},

		/**
		 * 선택된 옵션 삭제
		 * @param {Object}		$el
		 */
		remove: function ( $el ) {
			var promoSn = 0;
			var prodSn = $el.data( 'prod-sn' );
			
			if ( prodSn ) {
				//$el = this._$appendTarget.find( '.product_item[data-prod-sn="' + prodSn + '"]:first' );
				promoSn = $el.parents('.order_cont').data('promosn');
				
				_.some( this._getCurrentPromoInfo(promoSn)._selectedData, function ( prod, idx ) {
					if ( prod.currentObj.prodSn === prodSn ) {
						this._getCurrentPromoInfo(promoSn)._selectedData.splice( idx, 1 );
						return true;
					}
				}.bind(this));
				
			} else {
				this._selectedData = [];
				$el = this._$appendTarget.find( '.product_item' );
			}

			$el.find( '.ui_spinner' ).spinner( 'clear' ).off( 'spinner-change' );
			$el.prev().addClass('empty').show();
			$el.remove();
			
			if( this._$appendTarget.find('li.empty').length > this._getCurrentPromoInfo(promoSn)._selectedData.length ){
				this._$appendTarget.find('.notApply').show();
				this._$appendTarget.find('.apply').hide();
			}

			this.dispatch( 'price-change', {
				totalPrice: this._getTotalPrice( promoSn ),
				totalCount: this._getTotalCount( false, promoSn )
			});
		},

		/**
		 * 현재 선택된 products 데이타 반환
		 * 구매수량 = product.cartProdQty
		 * @returns {Array}
		 */
		getSelectedData: function ( promoSn ) {
			return this._getCurrentPromoInfo( promoSn )._selectedData;
		},

		/**
		 * prodSn 과 일치하는 spinner 의 value 변경
		 * @param {Int} prodSn
		 * @param {Int} count	spinner 의 value
		 */
		changeSpinner: function ( prodSn, count ) {
			var $el = this._$appendTarget.find( '.product_item[data-prod-sn="' + prodSn + '"]' );

			$el.find( '.ui_spinner' ).spinner( 'setValue', count );

			_.some( this._selectedData, function ( product ) {
				if ( product.prodSn === prodSn ) {
					this._setProductValue( $el, product, count );
					product.cartProdQty = count;
					return true;
				}
			}.bind(this));

			this.dispatch( 'price-change', {
				totalPrice: this._getTotalPrice(),
				totalCount: this._getTotalCount()
			});
		},

		/** =============== Private Methods =============== */

		/**
		 * 기본 이벤트 설정
		 */
		_setEvents: function () {
			this._$appendTarget.on( 'click', '.btn_del', function (e) {
				var $el = $( e.currentTarget ).parents('li');
				this.remove( $el );
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

				this.dispatch( 'spinner-change', {
					prodSn: product.prodSn,
					value: e.value
				});

				this.dispatch( 'price-change', {
					totalPrice: this._getTotalPrice(),
					totalCount: this._getTotalCount()
				});
			}.bind(this));

			this._$appendTarget.parent().scrollTop( 100000 );
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
				return product.prodPriceSummaryStp.finalOnlinePriceStp;
			}
		},
		
		_getTotalPrice: function (promoSn) {
			var result = 0;

			_.each( this._getCurrentPromoInfo(promoSn)._selectedData, function ( product ) {
				//result += ( this._getSalePrice(product) * this._getTotalCount(product) );
				result += product.currentObj.prodPriceSummaryStp.finalOnlinePriceStp;
			}.bind(this));

			return result;
		},

		_getTotalCount: function ( prod, promoSn ) {
			var result = 0;

			if ( prod ) {
				result += prod.cartProdQty;
			} else {
				_.each( this._getCurrentPromoInfo(promoSn)._selectedData, function ( product ) {
					result += product.currentObj.cartProdQty;
				}.bind(this));
			}

			//return result;
			return this._getCurrentPromoInfo(promoSn)._selectedData == undefined ? 0 : this._getCurrentPromoInfo(promoSn)._selectedData.length;
		}

	}, 'GroupOrderSelectedOptions');


	AP.GroupOrderSelectedOptions = GroupOrderSelectedOptions;
})( jQuery );