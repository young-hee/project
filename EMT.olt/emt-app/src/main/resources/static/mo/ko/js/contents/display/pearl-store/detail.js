/**
 * 진주알 스토어 : 상세 페이지 영역 요소들 제어
 *
 */
;(function ( $ ) {
	'use strict';

	var PearlStoreDetail = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );

			this._orderLayer = new AP.Order( this._$target.find( '.option_layer' ));
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
			this._$target.on( 'click', '.item_list .btn_order', function (e) {
				
				var onlineProdSn = $( e.currentTarget ).data( 'online-prod-sn' ),
					prodSn = $( e.currentTarget ).data( 'prod-sn' ),
					type = $( e.currentTarget ).closest( 'li' ).hasClass( 'online_prod' ) ? 'onlineProd' : 'prod';

				if ( $( e.currentTarget ).closest( 'li' ).hasClass( 'gift' )) {
					type = 'gift';
				}

				if ( type == 'gift' ) {
					// 사은품 담기
					this._orderLayer.setOnlineProd( undefined, type, prodSn );
				} else {
					// 상품 담기
					var onlineProdSn = $( e.target ).data( 'online-prod-sn' );
					this._orderLayer.setOnlineProd( onlineProdSn, type, prodSn );
				}
			}.bind(this));
		},

		_loadingStop: function () {
			if ( this._isLodingProduct && this._isLodingGift ) {
				this._$target.find( '.loading' ).hide();
				if ( this._$target.find( '.result' ).find( 'li' ).length == 0 ) {
					this._$target.find( '.no_result' ).show();
				}
			}
		},

		//관련 상품 목록
		_setInProductsList: function () {
			var $itemArea = this._$target.find( '.product.item_list' );
			if ( !$itemArea.length ) return;

			this._getInProductsList( $itemArea, this._orderLayer );
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

				//draw list
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

				if ( data.totalCount ) {
					this._$target.find( '.align_center' ).show();
					$itemArea.find( '.result.product' ).append( html );
					AP.lazyLoad.add( 'img.lazy_load' );
					this._orderLayer.setDefaultData( data );
				}
			}.bind(this)).fail(function (e) {
				this._isLodingProduct = true;
				this._loadingStop();
			}.bind(this));
		},

		// 사은품 목록
		_setInGiftList: function () {
			var $giftList = this._$target.find( '.gift.item_list' );
			if ( !$giftList.length ) return;

			this._getInGiftList( $giftList );
		},

		_getInGiftList: function ( $itemArea ) {
			AP.api.pointExchangeableGiftList({}, {}).done(function ( result ) {
				this._isLodingGift = true;
				this._loadingStop();

				if ( result['giftList'].list.length == 0 ) {
					return;
				}

				//draw list
				var data = result['giftList'];
				var html = AP.common.getTemplate( 'display.pearl-store-detail-gift-list', _.extend(data, {isActivityPoint: true}) );

				if ( data.totalCount ) {
					$itemArea.find( '.gift.result' ).append( html );
					AP.lazyLoad.add( 'img.lazy_load' );
					this._orderLayer.setGiftData( data );
				}
			}.bind(this)).fail(function (e) {
				this._isLodingProduct = true;
				this._loadingStop();
			}.bind(this));
		}
	});

	AP.pearlStoreDetail = new PearlStoreDetail();
})( jQuery );