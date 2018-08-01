/**
 * Ch.Etude : 상세 페이지 영역 요소들 제어
 *
*/
;(function ( $ ) {
	'use strict';

	var ChEtudeDetail = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );
		},

		/** =============== Public Methods =============== */

		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( article ) {
			
			this._setOtherMoveList();
			this._setInProductsList( article.articleSn );
			this._setComments( article.articleSn, article.liveSettingsYn );
			this._setVideo( article.articleSn, article.couponList, article.liveSettingsYn );
		},

		/** =============== Private Methods =============== */

		//slide 적용
		_setSlide: function () {
			this._$target.find( '.slide' ).ixSlideMax();

			AP.responsiveWidth.addListener( 'resize', function (e) {
				this._$target.find( '.slide' ).ixSlideMax( 'resize' );
			}.bind(this));
		},

		/**
		 * live video setting
		 * @param {Int}	articleSn
		 * @param {Array}	data	section data
		 * @param {String}	liveSettingsYn	라이브 여부
		 */
		_setVideo: function ( articleSn, data, liveSettingsYn ) {
			if ( liveSettingsYn === 'Y' ) {
				var video = new AP.ProgressVideo( this._$target.find('.youtube_video'), data )
						.addListener( 'complete-section', function (e) {
							this._$target.find( '.btn_coupon_down' ).prop( 'disabled', false );
						}.bind(this)),
					couponModal = new AP.DownloadCoupon( articleSn );

				this._$target.find( '.btn_coupon_down' ).on( 'click', function (e) {
					couponModal.open( video.getActivateSections() );
				}.bind(this));
			} else {
				this._$target.find( '.youtube_video' ).video();
			}
		},

		//영상관련 상품 목록
		_setInProductsList: function ( articleSn ) {
			var $itemArea = this._$target.find( '.ch_etude_bottom_wrap' );
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
				var data = result.onlineProdList;
				if( data.prodListUnitCode == 'Prod' ){
					$.each(data.list, function(idx, obj){
						obj.productCount = 1;
						obj.onlineProdImages = obj.products[0].prodImages;
					})
				}
				var html = AP.common.getTemplate( 'display.detail-product-list', data );
				
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
						prodSn = $( e.currentTarget ).data( 'prod-sn' ),
						$selectBox = $itemArea.find( '.online_prod[data-online-prod-sn="' + onlineProdSn + '"] .ui_select' );
					
					if ( $selectBox.length ) {
						var prodSn = $selectBox.designSelectBox( 'getValue' );

						if ( prodSn ) {
							orderLayer.setOnlineProd( onlineProdSn, parseFloat(prodSn) );
						} else {
							AP.modal.alert( AP.message.NONE_SELECTED_OPTION );
						}
					} else {
						orderLayer.setOnlineProd( onlineProdSn, parseFloat(prodSn) );
					}
				}.bind(this));
			}.bind(this)).fail(function (e) {
				//
			}.bind(this));
		},

		_setOtherMoveList: function () {
			var $otherArea = this._$target.find( '.ch_etude_list' );
			if ( !$otherArea.length ) return;

			AP.api.articles( null, {
				articleCateId: 'chEtude',
				offset: 0,
				limit: 4
			}).done(function ( result ) {
				var html = AP.common.getTemplate( 'display.ch-etude.video-list', result.articleSearchResult );
				$otherArea.find( '> ul' ).html( html );
			}.bind(this)).fail(function (e) {
				//
			}.bind(this));
		},

		/**
		 * 댓글 설정
		 */
		_setComments: function ( articleSn, liveSettingsYn ) {
			new AP.Comments({
				isScrollType: liveSettingsYn === 'Y',
				isLive: liveSettingsYn === 'Y',
				articleSn: articleSn
			});
		}

	});

	AP.chEtudeDetail = new ChEtudeDetail();
})( jQuery );