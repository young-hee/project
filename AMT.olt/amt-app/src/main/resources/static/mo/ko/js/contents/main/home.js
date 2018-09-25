/**
 * Main : 홈
 */

;(function ($) {
    'use strict';

    var Home = $B.Class.extend({
        initialize: function () {
            this._$target = $( '#ap_container' );
            this._$eventAllBtn = this._$target.find( '.btn_view_all' );

            this._setPlugins();
            this._setEvent();
            
            this._setLatestProducts();
            this._setGiftProducts();
            this._setSpecialProducts();
			this._setHotDeal();
			this._setDisplayCards();
			//this._setBrandCards();//todo -mobile X
			//this._setPopularProducts(); //todo -mobile X
			//this._setBestReview(); //todo -mobile X
            this._data = null; 
            
            this._popUpload(); 
			// 공지사항
			//this._$target.find( '.footer_notice .slide' ).ixSlideMax();
        },

        /** =============== Public Methods =============== */
        setData: function (data){
        	this._data = data; 
        	
        },
        /** =============== Private Methods =============== */

        //기타 공통 적용
		_setPlugins: function () {
			AP.lazyLoad.add( 'img.lazy_load' );

			AP.responsiveWidth.addListener( 'resize', function (e) {
				//전체 slide resize
				this._$target.find( '.slide' ).ixSlideMax( 'resize' );
			}.bind(this));
			
        },
        
        _setEvent: function () {
        	this._$eventAllBtn.on('click', function (e) {
				this._openEventLayer();
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
			});

			$slide.find( '.ix-ratio-size-apply' ).css( 'height', '' );
			$slide.ixSlideMax().ixSlideMax( 'stopTimer' );
			$slide.on( 'bonding-rect-activate bonding-rect-deactivate', function (e) {
				if ( e.type === 'bonding-rect-activate' ) {
					$slide.ixSlideMax( 'startTimer' );
				} else {
					$slide.ixSlideMax( 'stopTimer' );
				}
			}).bondingRect();
		},
		
		//최근 본 상품
		_setLatestProducts: function () {
			var $section = this._$target.find('#latest_product');
			if ( !$section.length ) return;
			
			//쿠키정보 가지고 오기
			var onlineProdCodes = this._getLatestProd();
			console.log(onlineProdCodes);
			if(onlineProdCodes != ''){
				AP.api.getWithOnlineProdCodesProdList( null, {
					onlineProdCodes: onlineProdCodes
				}).done( function ( result ) {
					var data = result.onlineProdList,
						html = AP.common.getTemplate( 'main.latest-product-list', data );
					
					$section.find('.product_list_new').html( html );
					$section.find( '.slide' ).ixSlideMax();
					AP.lazyLoad.add( $section.find('img.lazy_load') );
				}.bind(this));
			}else{
				$section.hide();
			}
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
			var $section = this._$target.find( '.special_gift' );
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
			var $section = this._$target.find( '.today_hot_deal' );
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
			var $section = this._$target.find( '#display_card' ),
				$section2 = this._$target.find( '#display_card2' );
			if ( !$section.length && !$section2.length ) return;

			AP.api.displayCardList( null, {
				location: 'MobileMain'
			}).done( function ( result ) {
				var data = result,
					html = AP.common.getTemplate( 'main.display-card-list', data );
				
				$section.html( html );
				$section.find( '.slide' ).ixSlideMax();
				//$section.find( '.youtube_video' ).video('clear');
				//$section.find( '.youtube_video' ).video();
				AP.lazyLoad.add( $section.find('img.lazy_load') );
				
				if(data.length > 5){
					$section2.html( html );
					$section2.find( '.slide' ).ixSlideMax();
					AP.lazyLoad.add( $section2.find('img.lazy_load') );
				}

				$( '.youtube_video' ).video();
				$('.video_thumb_area').bind('click', function() {
					var $ytb_iframe = $(this).prev().find("iframe");
					  $(this).hide();
					  $ytb_iframe.show();
				 });
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
		
		_openEventLayer: function () {
			AP.api.planDisplayList( null, {
				status: 'Progress',
				types: 'All',
				order: 'StartDt',
				offset: 0,
				limit: 6
			}).done(function ( result ) {
				AP.modal.full({
					title: '진행중인 이벤트',
					contents: {
						templateKey: 'main.layer-event-ing',
						templateModel: result.planDisplayEventListResult
					}
				});
			}.bind(this)).fail(function (e) {
				//
			}.bind(this));
		},
		
		_getLatestProd(){
			//테스트용
//			var prod = '673*dfda*bddfd2bb*/pc/ko/images/dummy/img_item_02.jpg*8000*17000';
//        	this._addCookie(prod);
			var onlineProds = "";
        	var latestProd = AP.common.getCookie('latestSeenProd');
        	console.log(latestProd);
        	if(latestProd == 'undefined' || latestProd == undefined){
        		return onlineProds;
        	}
        	var itemArray = latestProd.split(',');
        	var prodArray = new Array();
        	var obj2 = new Object();

        	for(var i = 0 ; i < itemArray.length ; i++){
        		var item = itemArray[i].split('*');
        		if(onlineProds != ""){
        			onlineProds = onlineProds + ",";
				}
        		onlineProds = onlineProds + item[6];
        	}        	
        	return onlineProds;
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
					
						$modal.find( '.layer_cont' ).after( '<pre><div class="popup_check"><span class="check_wrap"><input type="checkbox" id="check1"><label for="check1">오늘하루 다시보지않기</label></span></div></pre>' );
					
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