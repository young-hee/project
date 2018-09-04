/**
 * 제품상세 : 주문 layer - 선택된 옵션 관리
 * Events:
 * 		price-change	금액 변경시 전달, e.totalPrice, e.totalCount
 * 		spinner-change	user가 spinner count 변경시 발생, e.prodSn, e.value
 * 		remove-item		아이템을 삭제 시킬때 발생, e.prodSn (user가 삭제했을시만 발생)
 */
;(function ( $ ) {
	'use strict';

	var SelectedOptions = $B.Class.extend({

		/**
		 * @param {jQuery}	$appendTarget
		 * @param {Object}	model
		 * @param {Boolean}	viewThumbnail	썸네일 노출 여부
		 */
		initialize: function ( $appendTarget, model, viewThumbnail ) {
			this._$appendTarget = $appendTarget;
			this._defaultModel = model;
			this._appSmsModal = null;
			this._viewThumbnail = viewThumbnail;
			this._selectedData = [];

			this._setEvents();
		},

		/** =============== Public Methods =============== */

		/**
		 * 선택 옵션 추가
		 * @param {Boolean}	silent	중복 추가 에러메세지 발생시키지 않게 설정
		 */
		add: function ( product, silent ) {
			product = $B.object.clone( product );
			

			//중복적용 체크
			var isSameProd = _.some( this._selectedData, function ( prod ) {
				return prod.prodSn === product.prodSn;
			}.bind(this));

			if ( isSameProd ) {
				if ( !silent ) {
					AP.modal.alert({
						contents: AP.message.DUPLICATE_SELECTED_PRODUCT,
						returnFocusTarget: this._$appendTarget.find( '.product_item[data-prod-sn="' + product.prodSn + '"] .spinner_increase' )
					});
				}
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
				var prodSn = $( e.currentTarget ).data( 'prod-sn' );
				this.remove( prodSn );

				this.dispatch( 'remove-item', {prodSn: prodSn} );
			}.bind(this));
			
			//일시 품절일때 > 앱다운받기 버튼
			this._$appendTarget.on( 'click', '.downAppLayerBtn', function (e) {
				var modal = AP.modal.info({
					title : AP.message.APP_DOWNLOAD_LAYER_TITLE,
					sizeType : 'S',
					contents: {
						templateKey: 'products.layer-app'
					}
				}),
				$modal = modal.getElement();
				this._appSmsModal = modal;
				
				$modal.find('.cellNum').on('keyup', function(e){
					this.value = this.value.replace(/[^0-9\.]/g,'');
				});
				
				$modal.find('.send').on('click', function(e){
					var cellNum = $(e.currentTarget).parent('.app_download').find('.cellNum').val();
					if( cellNum == '' || !/^(010|011|016|017|018|019)\d{7,8}$/.test( cellNum ) ){
						AP.modal.alert({
							 contents: AP.message.INVALID_CELL_NUM
						});
						return false;
					}
					// 앱 다운 URL 문자 전송
					AP.api.sendSms(null, {
						cellNum : cellNum
					}).done(function(result){
						this._appSmsModal.close();
						this._appSmsModal = null;
						if( result ){
							AP.modal.alert({
								 contents: AP.message.APP_DOWNLOAD_SENT_SMS
							});
						}
					}.bind(this)).fail(function(err){
						this._appSmsModal.close();
						this._appSmsModal = null;
					});
				}.bind(this));
			}.bind(this));
			
		},

		_draw: function ( product ) {
			var html = AP.common.getTemplate( 'products.selected-option-list', {
						viewThumbnail: this._viewThumbnail,
						prodTypeCode: this._defaultModel.prodTypeCode,
						bulkIncludedProds: this._defaultModel.bulkIncludedProds,
						productCount: this._defaultModel.productCount,
						products: [product],
						onlineProdGift: this._defaultModel.onlineProdGift
					}),
				$el = $( html );
			
			this._$appendTarget.append( $el );
			/*
			console.log( product.saleDisplayStatus );
			console.log( this._$appendTarget );
			*/
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
				beforeSalePrice = AP.common.availablePrices( product.availablePrices, 'beforeOnlineSalePrice' );

			$el.find( '.item_before_total_price' ).text( $B.string.numberFormat(beforeSalePrice * count) );
			$el.find( '.item_total_price' ).text( $B.string.numberFormat(salePrice * count) );
		},

		_getSalePrice: function ( product ) {
			if ( product.activityPointOnly === 'Y' ) { //진주알 포인트
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