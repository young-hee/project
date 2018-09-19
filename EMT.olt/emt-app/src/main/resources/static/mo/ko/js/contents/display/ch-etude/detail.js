/**
 * Ch.Etude : 상세 페이지 영역 요소들 제어
 *
*/
;(function ( $ ) {
	'use strict';

	var ChEtudeDetail = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );

			this._setSlide();
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
			
			this._$target.find( '.banner .slide' ).ixSlideMax();

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
						this._$target.find( '.btn_coupon_download' ).prop( 'disabled', false );
					}.bind(this)),
					couponModal = new AP.DownloadCoupon( articleSn );

				this._$target.find( '.btn_coupon_download' ).on( 'click', function (e) {
					couponModal.open( video.getActivateSections() );
				}.bind(this));
			} else {
				this._$target.find( '.youtube_video' ).video();
			}
		},

		//영상관련 상품 목록
		_setInProductsList: function ( articleSn ) {
			
			
			var $itemArea = this._$target.find( '.recommend_items' );
			if ( !$itemArea.length ) return;

			var orderLayer = new AP.Order( this._$target.find('.option_layer') );

			AP.api.articleRelated( null, {
				articleSn: articleSn
			}).done(function ( result ) {
				var data = result.onlineProdList;
				if( data.prodListUnitCode == 'Prod' ){
					$.each(data.list, function(idx, obj){
						obj.productCount = 1;
						obj.onlineProdImages = obj.products[0].prodImages;
						
					})
					
				}
				
				
				$.each(data.list , function(inx, prodInfo){
					if(prodInfo.productCount > 1){
						var colorCnt = 0;
						var optionCnt = 0; 
						$.each(prodInfo.products, function(index, product){
							if(product.colorchipTypeCode != 'No'){
								colorCnt++; // 컬러색상개수
							}else{
								optionCnt++; // 상품옵션개수
							}
						});
						
						prodInfo.colorCnt = colorCnt; 
						prodInfo.optionCnt = optionCnt; 	
					}
				});
				
				var html = AP.common.getTemplate( 'display.ch-etude.detail-product-list', data );

				$itemArea.find( '.loading' ).remove();
				
				$itemArea.find( '.slide' ).html( html ).ixSlideMax();
				AP.lazyLoad.add($itemArea.find('img.lazy_load'));
				orderLayer.setDefaultData( data );

				//click evnet
				$itemArea.find( '.btn_order' ).on( 'click', function (e) {
					var onlineProdSn = $( e.currentTarget ).data( 'online-prod-sn' ),
						prodSn = $( e.currentTarget ).data( 'prod-sn' );
					
					orderLayer.setOnlineProd( onlineProdSn, data.prodListUnitCode, prodSn );
				}.bind(this));
			}.bind(this)).fail(function (e) {
				//
			}.bind(this));
		},

		//다른 영상 목록
		_setOtherMoveList: function () {
			var $otherArea = this._$target.find( '.other_movie' );
			if ( !$otherArea.length ) return;

			AP.api.articles( null, {
				articleCateId: 'chEtude',
				offset: 0,
				limit: 2
			}).done(function ( result ) {
				var html = AP.common.getTemplate( 'display.ch-etude.video-list', result.articleSearchResult );
				$otherArea.find( '.loading' ).hide();
				$otherArea.find( '.video_list' ).html( html );
				AP.lazyLoad.add($otherArea.find('img.lazy_load'));
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