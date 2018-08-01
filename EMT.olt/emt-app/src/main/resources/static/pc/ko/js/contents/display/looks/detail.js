/**
 * looks : 상세 페이지 영역 요소들 제어
 *
*/
;(function ( $ ) {
	'use strict';

	var LooksDetail = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );
		},

		/** =============== Public Methods =============== */

		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( article ) {
			this._setInProductsList( article.articleSn );
			this._setPlugins();
		},

		/** =============== Private Methods =============== */

		_setPlugins: function () {
			this._$target.find( '.youtube_video' ).video();
			this._$target.find( '.slide' ).ixSlideMax();
		},

		//영상관련 상품 목록
		_setInProductsList: function ( articleSn ) {
			var $itemArea = this._$target.find( '.pearl_list' );
			if ( !$itemArea.length ) return;

			var orderLayer = new AP.Order( $itemArea.find('.order_layer') );
			this._getInProductsList( articleSn, $itemArea, orderLayer, 0 );
		},

		_getInProductsList: function ( articleSn, $itemArea, orderLayer, offset ) {
			$itemArea.find( '.pagination' ).paging( 'disable' );

			AP.api.articleRelated( null, {
				articleSn: articleSn,
				offset: offset,
				limit: 6
			}).done(function ( result ) {
				$itemArea.find( '.ui_select' ).designSelectBox( 'clear' );
				$itemArea.find( '.btn_order' ).off( 'click' );

				//draw list
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'display.detail-product-list', data );

				$itemArea.find( '.loading' ).remove();
				$itemArea.find( '.item_list' ).html( html );
				$itemArea.find( '.ui_select' ).designSelectBox();
				AP.lazyLoad.add( 'img.lazy_load' );
				orderLayer.setDefaultData( data );
				orderLayer.resetPosition();

				//paging
				if ( data.limit < data.totalCount ) {
					$itemArea.find( '.pagination' ).paging({
						offset: data.offset,
						limit: data.limit,
						totalCount: data.totalCount
					}).paging( 'enable' ).off( 'paging-change' ).on( 'paging-change', function (e) {
						this._getInProductsList( articleSn, $itemArea, orderLayer, e.offset );
					}.bind(this));
				}

				//click evnet
				$itemArea.find( '.btn_order' ).on( 'click', function (e) {
					var onlineProdSn = $( e.currentTarget ).data( 'online-prod-sn' ),
						$selectBox = $itemArea.find( '.online_prod[data-online-prod-sn="' + onlineProdSn + '"] .ui_select' );

					if ( $selectBox.length ) {
						var prodSn = $selectBox.designSelectBox( 'getValue' );

						if ( prodSn ) {
							orderLayer.setOnlineProd( onlineProdSn, parseFloat(prodSn) );
						} else {
							AP.modal.alert( AP.message.NONE_SELECTED_OPTION );
						}
					} else {
						orderLayer.setOnlineProd( onlineProdSn );
					}
				}.bind(this));
			}.bind(this)).fail(function (e) {
				//
			}.bind(this));
		}

	});

	AP.looksDetail = new LooksDetail();
})( jQuery );