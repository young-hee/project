/**
 * Looks : 상세 페이지 영역 요소들 제어
 *
 */
;(function ( $ ) {
	'use strict';

	var LooksDetail = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );

			this._setPlugins();
		},

		/** =============== Public Methods =============== */

		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( article ) {
			this._setInProductsList( article.articleSn );
		},

		/** =============== Private Methods =============== */

		//slide 적용
		_setPlugins: function () {
			this._$target.find( '.youtube_video' ).video();
			this._$target.find( '.slide' ).ixSlideMax();

			AP.responsiveWidth.addListener( 'resize', function (e) {
				this._$target.find( '.slide' ).ixSlideMax( 'resize' );
			}.bind(this));
		},

		//영상관련 상품 목록
		_setInProductsList: function ( articleSn ) {
			var $itemArea = this._$target.find( '.evt_goods' );
			if ( !$itemArea.length ) return;

			var orderLayer = new AP.Order( this._$target.find('.option_layer') );
			this._getInProductsList( articleSn, $itemArea, orderLayer, 0 );
		},

		_getInProductsList: function ( articleSn, $itemArea, orderLayer, offset ) {
			$itemArea.find( '.loading' ).show();
			$itemArea.find( '.btn_more' ).hide();

			AP.api.articleRelated( null, {
				articleSn: articleSn,
				offset: offset,
				limit: 9
			}).done(function ( result ) {
				$itemArea.find( '.btn_order' ).off( 'click' );

				//draw list
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'display.detail-product-list', data );

				$itemArea.find( '.loading' ).hide();
				$itemArea.find( '.item_list .result' ).append( html );
				AP.lazyLoad.add( 'img.lazy_load' );
				orderLayer.setDefaultData( data );

				//more
				if ( data.offset + data.limit < data.totalCount ) {
					$itemArea.find( '.btn_more' ).html( '<span>더보기 (<em>' + (data.offset + data.limit) + '</em>/' + data.totalCount + ')</span>' ).show()
						.off( 'click' ).on( 'click', function (e) {
							this._getInProductsList( articleSn, $itemArea, orderLayer, data.offset + data.limit );
						}.bind(this));
				}

				//click evnet
				$itemArea.find( '.btn_order' ).on( 'click', function (e) {
					var onlineProdSn = $( e.currentTarget ).data( 'online-prod-sn' );
					orderLayer.setOnlineProd( onlineProdSn );
				}.bind(this));
			}.bind(this)).fail(function (e) {
				//
			}.bind(this));
		}

	});

	AP.looksDetail = new LooksDetail();
})( jQuery );