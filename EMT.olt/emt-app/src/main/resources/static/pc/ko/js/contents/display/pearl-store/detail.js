/**
 * 진주알 스토어 : 상세 페이지 영역 요소들 제어
 *
 */
;(function ( $ ) {
	'use strict';

	var PearlStoreDetail = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );

			this._orderLayer = new AP.Order( this._$target.find( '.order_layer' ));
			this._isLodingProduct = false;
			this._isLodingGift = false;
			
			this._setInProductsList();
			this._setInGiftList();
			
			this._setEvent();
		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods =============== */
		_setEvent: function () {
			
			//일반 진주알 상품 & 진주알 사은품
			this._$target.find( '.pearl_list' ).on( 'click', '.item_list .btn_order', function (e) {

				var onlineProdSn = $( e.currentTarget ).data( 'online-prod-sn' ),
					prodSn = $( e.currentTarget ).data( 'prod-sn' ),
					$selectBox = $( e.currentTarget ).siblings('.ui_select');

				if ( $selectBox.length ) {
					prodSn = $selectBox.designSelectBox( 'getValue' );
					
					if ( prodSn ) {
						this._orderLayer.setOnlineProd( onlineProdSn, parseFloat(prodSn) );
					} else {
						AP.modal.alert( AP.message.NONE_SELECTED_OPTION );
					}
				} else {
					this._orderLayer.setOnlineProd( onlineProdSn, parseFloat(prodSn) );
				}
			}.bind(this));
		},

		_loadingStop: function () {
			if ( this._isLodingProduct && this._isLodingGift ) {
				this._$target.find( '.loading' ).hide();
				this._$target.find( '.order_layer' ).show();
				if ( this._$target.find( '.item_list li' ).length == 0 ) {
					this._$target.find( '.no_result' ).show();
					this._$target.find( '.order_layer' ).hide();
					this._$target.find( '.container' ).remove();
				}
			}
		},

		//영상관련 상품 목록
		_setInProductsList: function () {
			var $itemArea = this._$target.find( '.pearl_list' );
			if ( !$itemArea.length ) return;

			this._getInProductsList( $itemArea );
		},

		_getInProductsList: function ( $itemArea ) {
			AP.api.pointExchangeableProdList( null, {
				pointType: 'ActivityPoint',
				pointExch: 'Only',
				prodSort: 'NewProd'
			}).done(function ( result ) {
				this._isLodingProduct = true;
				this._loadingStop();

				if ( result['onlineProdList'].list.length == 0 ) {
					return;
				}

				var data = result['onlineProdList'];
				var pointList = [];
				
				if ( data['prodListUnitCode'] == 'OnlineProd' ) {
					for ( var i = 0; i < data.list.length; ++i ) {
						_.each( data.list[i].products, function ( value ) {
							pointList.push( value.exchActivityPoint );
						});
						data.list[i].minActivityPoint = pointList.sort().reverse()[0];
					}
				}

				//draw list
				var html = AP.common.getTemplate( 'display.pearl-store-detail-product-list', _.extend(data, {isActivityPoint: true}) );
				$itemArea.find( '.product.item_list' ).html( html );
				$itemArea.find( '.product.item_list .ui_select' ).designSelectBox();
				AP.lazyLoad.add( 'img.lazy_load' );
				this._orderLayer.resetPosition();
				this._orderLayer.setDefaultData( data );
			}.bind(this)).fail(function (e) {
				//
			}.bind(this));
		},

		_setInGiftList: function () {
			var $itemArea = this._$target.find( '.pearl_list' );
			if ( !$itemArea.length ) return;

			this._getInGiftList( $itemArea );
		},

		_getInGiftList: function ( $itemArea ) {
			AP.api.pointExchangeableGiftList( null, {}).done(function ( result ) {
				this._isLodingGift = true;
				this._loadingStop();

				if ( result['giftList'].list.length == 0 ) {
					$itemArea.find( '.no_result' ).show();
				}

				//draw list
				var data = result['giftList'];

				var html = AP.common.getTemplate( 'display.pearl-store-detail-gift-list', _.extend(data, {isActivityPoint: true}) );
				$itemArea.find( '.gift.item_list' ).html( html );
				$itemArea.find( '.goft.item_list .ui_select' ).designSelectBox();
				AP.lazyLoad.add( 'img.lazy_load' );
				this._orderLayer.resetPosition();
				this._orderLayer.setGiftData( data );
			}.bind( this )).fail(function (e) {
				//
			}.bind( this ));
		}
	});

	AP.pearlStoreDetail = new PearlStoreDetail();
})( jQuery );