/**
 * TrendOnAir : 상세 페이지 영역 요소들 제어
 *
*/
;(function ( $ ) {
	'use strict';

	var MagazineDetail = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );
			this._$header = $( '.ap_header' );
			//this._setSlide();
			
		},

		/** =============== Public Methods =============== */

		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( article ) {
			//console.log(article.articleTitle);
			console.log(this._$header.find('.page_title_area>h2>span').text());
			//this._$header.find('.page_title_area>h2>span').text(article.articleTitle);
			this._$header.find('.page_title_area .btn_share_txt').show();
			this._setOtherMoveList();
			this._setInProductsList( article.articleSn );
			this._setComments( article.articleSn, article.liveSettingsYn );
		},

		/** =============== Private Methods =============== */

		//slide 적용
		_setSlide: function () {
			this._$target.find( '.banner .slide' ).ixSlideMax();

			AP.responsiveWidth.addListener( 'resize', function (e) {
				this._$target.find( '.slide' ).ixSlideMax( 'resize' );
			}.bind(this));
		},

		//영상관련 상품 목록
		_setInProductsList: function ( articleSn ) {
			var $itemArea = this._$target.find( '.product_list_new' );
			if ( !$itemArea.length ) return;
			console.log("product" + $itemArea);
			//var orderLayer = new AP.Order( this._$target.find('.option_layer') );

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
				var html = AP.common.getTemplate( 'display.magazine.detail-product-list', data );

				//$itemArea.find( '.loading' ).remove();
				$itemArea.html( html );
				//orderLayer.setDefaultData( data );

				//click evnet
//				$itemArea.find( '.btn_order' ).on( 'click', function (e) {
//					var onlineProdSn = $( e.currentTarget ).data( 'online-prod-sn' ),
//						prodSn = $( e.currentTarget ).data( 'prod-sn' );
//					
//					orderLayer.setOnlineProd( onlineProdSn, data.prodListUnitCode, prodSn );
//				}.bind(this));
			}.bind(this)).fail(function (e) {
				//
			}.bind(this));
		},

		//다른 영상 목록
		_setOtherMoveList: function () {
			var $otherArea = this._$target.find( '.thumb_list' );
			if ( !$otherArea.length ) return;
			console.log("other" + $otherArea);
			var displayType = $( '.magazine' ).attr('id');
			console.log(displayType);
			AP.api.articles( null, {
				articleCateId: displayType,
				order: 'StartDt',
				offset: 0,
				limit: 2
			}).done(function ( result ) {
				var html = AP.common.getTemplate( 'display.magazine.other-list', result.articleSearchResult );
				//$otherArea.find( '.loading' ).hide();
				$otherArea.html( html );
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

	AP.magazineDetail = new MagazineDetail();
})( jQuery );