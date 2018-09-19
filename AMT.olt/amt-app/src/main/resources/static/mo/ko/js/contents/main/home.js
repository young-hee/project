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
            
            this._setGiftProducts();
            this._setSpecialProducts();
			this._setHotDeal();
			this._setDisplayCards();
			//this._setBrandCards();//todo -mobile X
			//this._setPopularProducts(); //todo -mobile X
			//this._setBestReview(); //todo -mobile X
            this._data = null; 
            
            //this._popUpload(); 
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
		
		//베스트 랭킹정보가 필요하여 API flaggedProdRankChanges 사용
		_setBest: function () {
			var $section = this._$target.find( '.best_item' );
			if ( !$section.length ) return;

			AP.api.flaggedProdRankChanges().done( function ( result ) {
				var html = AP.common.getTemplate( 'main.home.best-list', result ),
					$slide = $section.find( '.slide' );

				$slide.html( html );
				$slide.ixSlideMax().ixSlideMax( 'stopTimer' );
				AP.lazyLoad.add( $section.find('img.lazy_load') );

				$section.on( 'touchstart touchend touchcancel', function (e) {
					if ( e.type === 'touchstart' ) {
						$slide.ixSlideMax( 'stopTimer' );
					} else {
						$slide.ixSlideMax( 'startTimer' );
					}
				});

				$slide.on( 'bonding-rect-activate bonding-rect-deactivate', function (e) {
					if ( e.type === 'bonding-rect-activate' ) {
						$slide.ixSlideMax( 'startTimer' );
					} else {
						$slide.ixSlideMax( 'stopTimer' );
					}
				}).bondingRect();
			}.bind(this));
		},

		//올해의 컬러
		_setColorOfYear: function () {
			var $section = this._$target.find( '.recommend_item' );
			if ( !$section.length ) return;

			$section.find( '.slide' ).ixSlideMax();
			AP.lazyLoad.add( $section.find('img.lazy_load') );
		},

		//Ch.에뛰드
		_setChEtude: function () {
			var $section = this._$target.find( '.ch_etude' );
			if ( !$section.length ) return;
			 
			AP.DISPLAY_MENU_ID = 'ch_etude';
			
			var articles_articleSn = null;  
			
			
			AP.api.articles( null, { // article num 
				articleCateId: 'chEtude',
				order : "Deadline", 
				keyword : null, 
				liveYn : "Y", 
				hashTag : null,
				offset: 0,
				limit: 1			
			}).done( function ( result ) {
				
				articles_articleSn = result.articleSearchResult.articleList[0].articleSn;  
				
				AP.api.article( null, { // article detail 
					
					articleSn: articles_articleSn
					
				}).done( function ( result ) { 
				
					// 동영상 URL 제목 , 라이브 유무 
					var html = AP.common.getTemplate( 'main.home.ch-etude-video-info', result.article);
	
					$section.find('.video_wrap').html(html);
					$section.find('.youtube_video').video(); // 비디오 그리기 디테일정보가 필요함 
					
					var titleText = ''; 
					
					if(result.article.liveSettingsYn === 'Y'){
						titleText ='[라이브쇼]'; 
					}
					titleText+= result.article.articleTitle; 
					this._$target.find('.ch_etude dl dt').text(titleText);   
					this._articleProdList(articles_articleSn) ; // 관련 상품 그리기
					
				}.bind(this)).fail(function ( xhr ) {
					console.log( xhr.errorMessage );
					this._$target.find('.youtube_video').video('clear');
				}.bind( this ));
				
			}.bind(this)); 
		},
		
		// article 상품 목록 그리기
		_articleProdList : function(articleSn){
			
			var $section = this._$target.find( '.ch_etude' );
			AP.api.articleRelated(null, { // article 연관상품 목록
				 
				articleSn: articleSn, //아티클일련번호
				offset: 0,
				limit: 3 // 화면에 3개까지만 출력되도록
				
			}).done( function ( result ) {  
				this._$target.find( '.ch_etude .loading' ).remove();
				console.log(result.onlineProdList); 
				var html = '';
					html = AP.common.getTemplate( 'main.home.ch-etude-article-list', result.onlineProdList);
			
				this._$target.find('.ch_etude .table_layout' ).html( html );
				
				AP.lazyLoad.add( $section.find( 'img.lazy_load' ));
				
			}.bind(this)).fail(function ( xhr ) {
				console.log( xhr.errorMessage );
				this._$target.find('.youtube_video').video('clear');
			}.bind( this ));
		},

		//Find your looks
		_setFindYourLooks: function () {
			var $section = this._$target.find( '.nine_looks' );
			if ( !$section.length ) return;
			
			AP.DISPLAY_MENU_ID = 'etude_looks';

			AP.api.getCornerInfo({}, {}).done(function ( result ) {
				result = result.corners[0];

				for ( var i = 0; i < result.contentsSets.length; ++i ) {
					var snsTag = '';
					for ( var j = 0; j < result.contentsSets[i].contents.length; ++j ) {
						if( j > 1 ) {
							snsTag += '#' + result.contentsSets[i].contents[j].text + ' ';
						}
					}
					result.contentsSets[i].snsHashTag = snsTag;
				}

				var html = AP.common.getTemplate( 'main.home.looks-article-list', result );
				$section.find( '.slide' ).html( html ).ixSlideMax({
					loop: ( result['rotationCycleAvailYn'] == 'Y' ) ? true : false
				});

				AP.lazyLoad.add( $section.find( 'img.lazy_load' ));

			}.bind( this ));
		},

		//에뛰드픽
		_setEtudePick: function () {
			var $section = this._$target.find( '.etude_pick' );
			if ( !$section.length ) return;

			this._getPixleeData();

			$section.find( '.ix-list-items' ).on( 'click', 'a', function (e) {
				e.preventDefault();
				
				var idx = $( e.currentTarget ).parent().index(),
					pixleeModal = new AP.PixleeModal( this._pixleeModel ).open( idx );
			}.bind(this));
		},

		_drawPixleeList: function ( data ) {
			var html = AP.common.getTemplate( 'main.home.pixlee-list', data );
			this._$target.find( '.etude_pick .ix-list-items' ).html( html );
		},

		_getPixleeData: function () {
			AP.api.getPixleePhotos({
				albumId: '2956835'//Homepage Gallery
			}, {
				page: 1,
				per_page: 20
			}).done(function ( data ) {
				this._$target.find( '.etude_pick .loading' ).remove();

				if ( data.total ) {
					this._pixleeModel = data.data;
					this._drawPixleeList( data );
					this._$target.find( '.etude_pick .slide' ).ixSlideMax();
					AP.lazyLoad.add( '.etude_pick .lazy_load' );
				}
			}.bind(this));
		},
		
		// 화면에 진입시 팝업 유무를 확인해서 팝업을 띄운다. 
		_popUpload: function () {
		
			AP.api.mainPopups().done( function ( result ) {
				
				$.each(result.popupList, function(index, popupInfo){
					
					var modal = AP.modal.info({
						title: popupInfo.popupTitle,
						contents: popupInfo.popupBodyText
					});
					
					modal.resetPosition();
				});
			}.bind(this));
		}
		
    });

    AP.home = new Home();

})( jQuery );