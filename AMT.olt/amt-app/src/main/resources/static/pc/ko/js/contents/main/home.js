/**
 * Main : 홈
 */

;(function ($) {
    'use strict';

    var Home = $B.Class.extend({
        initialize: function () {
            this._$target = $( '#ap_container' );

            this._setPlugins();
            this._setTopBanner();
            this._setEvent();
            
            this._setSpecialProducts();
			this._setHotDeal();
			this._setDisplayCards();
			this._setBrandCards();
			this._setPopularProducts(); 
			//this._setBestReview(); //todo - API 확인 필요
            this._data = null;
            this._popUpload();
        },

        /** =============== Public Methods =============== */
        setData: function(data){
        	this._data = data;
        	//console.log(this._data);
        	this._setThemeStory(this._data); 
        },
        /** =============== Private Methods =============== */

        //기타 공통 적용
		_setPlugins: function () {
			AP.lazyLoad.add( 'img.lazy_load' );
			this._$target.find('.youtube_video').video();
			
        },
        
        _setEvent: function () {
			this._$target.on( 'click', '#display_card .vod', function (e) {
				this._openVideo( $(e.currentTarget).data('vod-url'),$(e.currentTarget).data('vod-title'));
				return false;
			}.bind( this ));
		},

		//최상단 배너
		_setTopBanner: function () {
			var $section = this._$target.find( '.main_visual' );
			if ( !$section.length ) return;

			var $slide = $section.find( '.slide' ),
				viewLength = $slide.ixOptions( 'view-length' );

			$slide.on( 'ixSlideMax:init ixSlideMax:change', function (e) {
				var currentPage = Math.ceil( e.currentIndex / viewLength ),
					totalPage = Math.ceil( e.totalLength / viewLength );

				$slide.find( '.paging' ).show();
				$slide.find( '.paging .current' ).text( currentPage + 1 );
				$slide.find( '.paging .total' ).text( totalPage );
			}).ixSlideMax();

			AP.responsiveWidth.addListener( 'resize', function (e) {
				//slide resize
				$slide.ixSlideMax( 'resize' );
			}.bind(this));
		},

		//금액대별 사은품
		_setGiftProducts: function () {
			var $section = this._$target.find( '.gift_per_amount' );
			if ( !$section.length ) return;

			AP.api.flaggedItemList( null, {
				flags: 'icon_award_order'
			}).done( function ( result ) {
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'main.gift-product-list', data );
				
				$section.html( html );
				$section.find( '.slide' ).ixSlideMax();
				AP.lazyLoad.add( $section.find('img.lazy_load') );
			}.bind(this));
		},
		
		//스폐셜 기프트
		_setSpecialProducts: function () {
			var $section = this._$target.find( '.special_gift_item' );
			if ( !$section.length ) return;

			AP.api.flaggedItemList( null, {
				flags: 'icon_award_gift'
			}).done( function ( result ) {
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'main.special-product-list', data );
				
				$section.html( html );
				$section.find( '.slide' ).ixSlideMax();
				AP.lazyLoad.add( $section.find('img.lazy_load') );
			}.bind(this));
		},

		//Today hot deal
		_setHotDeal: function () {
			var $section = this._$target.find( '.today_hotdeal' );
			if ( !$section.length ) return;

			AP.api.hotDealItemList( null, {
				excludeSoldOut: 'true',
				prodListUnit: 'OnlineProd',
				prodSort: 'Rising',
			}).done( function ( result ) {
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'main.hotdeal-product-list', data );

				$section.html( html );
				$section.find( '.slide' ).ixSlideMax();
				$section.find( '.ui_remain_timer' ).each( function ( idx, el ) {
					$( el ).remainTimer({
						startTime: AP.common.date(),
						finishTime: $( el ).data( 'sale-end-dt' )
					});
				});
				AP.lazyLoad.add( $section.find('img.lazy_load') );
			}.bind(this));
		},
		
		//전시카드
		_setDisplayCards: function () {
			var $section = this._$target.find( '#display_card' );
			if ( !$section.length ) return;

			AP.api.displayCardList( null, {
				location: 'PCMain'
			}).done( function ( result ) {
				var data = result,
					html = AP.common.getTemplate( 'main.display-card-list', data );
				
				$section.html( html );
				$section.find( '.slide' ).ixSlideMax();
				AP.lazyLoad.add( $section.find('img.lazy_load') );
			}.bind(this));
		},
		
		//브랜드카드
		_setBrandCards: function () {
			var $section = this._$target.find( '.pop_brand' );
			if ( !$section.length ) return;

			AP.api.brandCardList( null, {
				sort: 'ShoppingMarkCnt',
				faveBrandCnt: 0
			}).done( function ( result ) {
				var data = result,
					html = AP.common.getTemplate( 'main.brand-card-list', data );
				
				$section.html( html );
				$section.find( '.slide' ).ixSlideMax();
				AP.lazyLoad.add( $section.find('img.lazy_load') );
			}.bind(this));
		},

		//인기상품
		_setPopularProducts: function () {
			
			var $section = this._$target.find( '.ap_pop_item' );
			if ( !$section.length ) return;

			AP.api.flaggedItemList( null, {
				flags: 'icon_reco_pop_24h',
				limit: 20
			}).done( function ( result ) {
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'main.popular-product-list', data );

				$section.html( html );
				$section.find( '.slide' ).ixSlideMax();
				AP.lazyLoad.add( $section.find('img.lazy_load') );
			}.bind(this));
		},
		
		//베스트포토리뷰
		_setBestReview: function () {
			
			var $section = this._$target.find( '.best_photo_review' );
			if ( !$section.length ) return;
			var currentDay = new Date().getDay();
			var endDt = AP.common.date( 'YYYY-MM-DD' );
			var startDt = moment( endDt ).subtract( currentDay + 30, 'days' ).format( 'YYYY-MM-DD' );

			//console.log('endDt : ' + endDt);
			//console.log('startDt : ' + startDt);
			AP.api.getReviewList( null, {
				prodReviewType: 'Pur',
				prodReviewSort: 'Recommend',
				startDate: startDt,
				endDate: endDt,
				imageOnlyYn: 'Y',
				limit: 20
			}).done( function ( result ) {
				console.log(result.prodReviewListInfo);
//				var data = result.prodReviewListInfo,
//					html = AP.common.getTemplate( 'main.best-review-list', data );
//				$section.html( html );
//				$section.find( '.slide' ).ixSlideMax();
//				AP.lazyLoad.add( $section.find('img.lazy_load') );
			}.bind(this));
		},

		//테마이야기
		_setThemeStory: function (themeData) {
			//console.log(data);
			var $section = this._$target.find( '.ap_theme' );
			if ( !$section.length ) return;
			
			//console.log(this._data);
			var onlineprdList = []; 
			var products = []; 
			var themeList = []; 

			themeList.push(this._data['M01_main_m.6'][0].contents);
			themeList.push(this._data['M01_main_m.7'][0].contents);
			themeList.push(this._data['M01_main_m.8'][0].contents);
			//console.log(themeList);
			var html = AP.common.getTemplate( 'main.theme-tab-list', themeList);
			
			$section.find('.tab_contents').html(html);
			$section.find( '.ui_tab' ).tabs();
			$section.find( '.tab_cont' ).eq(0).show();
			$section.find( '.tab_cont' ).css("display", "block");
			$( '.ui_tab' ).on( 'tabs-change', function (e) {
				console.log( e.index );
				$section.find( '.tab_cont' ).hide();
				$section.find( '.tab_cont' ).eq(e.index).show();
			});
			AP.lazyLoad.add( $section.find('img.lazy_load') );
		},
		
		_openVideo: function ( vodUrl, vodTitle ) {
			AP.modal.info({
				title: vodTitle,
				containerClass: 'yt_pop',
				contents: {
					templateKey: 'main.layer-movie',
					templateModel: {
						title: vodTitle,
						vodUrl: vodUrl
					}
				}
			});
		},
		
		// 화면에 진입시 팝업 유무를 확인해서 팝업을 띄운다. 
		_popUpload: function () {
			
			AP.api.mainPopups().done( function ( result ) {
			 
				$.each(result.popupList, function(index, popupInfo){
					
					if(AP.common.getSessionStorage( 'mainPopup_'+popupInfo.popupMgmtSn) !== 'Y'){ // [S] getSessionStorage
					
						var modal = AP.modal.info({
							title: popupInfo.popupTitle,
							contents: popupInfo.popupBodyText,
							containerClass : 'popup_check'
					
						}).addListener( 'modal-close', function (e) {}.bind(this)) ; 
					
						var $modal = modal.getElement(); 
					
						$modal.find( '.layer_cont' ).after( '<pre><div class="popup_check align_right"><span class="check_wrap pdb10 pdr20"><input type="checkbox" id="check1"><label for="check1">오늘하루 다시보지않기</label></span></div></pre>' );
					
						modal.resetPosition();
					
						$modal.find('.popup_check input').on( 'click', function (e) { 
						 
							if(e.currentTarget.checked){
								
								AP.common.setSessionStorage( 'mainPopup_'+popupInfo.popupMgmtSn, 'Y', (60 * 24)); // 세션기록 남김
							}
						
							modal.close();
						
						}.bind(this));
					} // [E] getSessionStorage
					
				});

			}.bind(this));
		}
		
    });

    AP.home = new Home();

})( jQuery );