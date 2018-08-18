/**
 * Main : 홈
 */

;(function ($) {
    'use strict';

    var Home = $B.Class.extend({
        initialize: function () {
            this._$target = $( '#ap_container' );

            this._setPlugins();
            //this._setTopBanner();
            //this._setNewProducts();
			//this._setEtudePick();
			//this._setHotDeal();
			//this._setBest();
            //this._setChEtude();
            //this._setFindYourLooks();
            this._data = null;
            this._popUpload();
        },

        /** =============== Public Methods =============== */
        setData: function(data){
        	this._data = data;
        	 
        	this._setColorOfYear(this._data[0].contents); 
        },
        /** =============== Private Methods =============== */

        //기타 공통 적용
		_setPlugins: function () {
			AP.lazyLoad.add( 'img.lazy_load' );
			this._$target.find('.youtube_video').video();
			
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

		//신상품
		_setNewProducts: function () {
			var $section = this._$target.find( '.new_item' );
			if ( !$section.length ) return;

			AP.api.flaggedItemList( null, {
				flags: 'icon_reco_new'
			}).done( function ( result ) {
				
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'main.home.new-product-list', data );

				$section.find( '.slide' ).html( html );
				$section.find( '.slide' ).ixSlideMax();
				AP.lazyLoad.add( $section.find('img.lazy_load') );
			}.bind(this));
		},

		//Today hot deal
		_setHotDeal: function () {
			var $section = this._$target.find( '.hot_deal' );
			if ( !$section.length ) return;

			AP.api.flaggedItemList( null, {
				flags: 'icon_type_sp_today',
				prodListUnit: 'Prod'
			}).done( function ( result ) {
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'main.home.hot-deal-list', data );

				$section.find( '.ix-list-viewport' ).html( html );
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

		//베스트
		_setBest: function () {
			
			var $section = this._$target.find( '.best' );
			if ( !$section.length ) return;

			AP.api.flaggedItemList( null, {
				flags: 'icon_reco_best_w',
				limit: 10
			}).done( function ( result ) {
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'main.home.best-list', data );

				$section.find( '.ix-list-viewport' ).html( html );
				$section.find( '.slide' ).ixSlideMax();
				AP.lazyLoad.add( $section.find('img.lazy_load') );
			}.bind(this));
			
			/*var $section = this._$target.find( '.best' );
			if ( !$section.length ) return;
			
			AP.api.flaggedProdRankChanges().done( function ( result ) {
				
				var html = AP.common.getTemplate( 'main.home.best-list', result ),
				
				$slide = $section.find( '.slide' );

				$slide.html( html );
				$slide.ixSlideMax().ixSlideMax( 'stopTimer' );
				

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
				
				AP.lazyLoad.add( $section.find('img.lazy_load') );
				
			}.bind(this));*/
		},

		//올해의 컬러
		_setColorOfYear: function (rmdColorProd) {
			
			var $section = this._$target.find( '.color_pick' );
			if ( !$section.length ) return;
			
			var onlineprdList = []; 
			var products = []; 
			
			$.each(rmdColorProd, function(index, object){
				
				if ( _.findWhere(rmdColorProd, {menuPageCornerContentsId: 'M02_main_p.5.2'})) {
					
					onlineprdList = object.prodList;
				}
			}); 
			
			$.each(onlineprdList, function(index, object){
				
				object.products = _.findWhere(object.products , {prodSn : this.selectedProdSn});
				
			}); 
			
			var html = AP.common.getTemplate( 'main.home.recommend-items', onlineprdList);
			
			$section.find('.recommend_items').html(html);
			
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
					$section.find('.youtube_video').video();  //detail 정보에 video정보가 있음
					
					var titleText = ''; 
					
					if(result.article.liveSettingsYn === 'Y'){
						titleText ='[라이브쇼]'; 
					}
					titleText+= result.article.articleTitle; 
					this._$target.find('.ch_etude dl dt').text(titleText);   
					this._articleProdList(articles_articleSn) ; // 관련 상품 그리기
					
				}.bind(this)).fail(function ( xhr ) {
					console.log( xhr.errorMessage );
					$section.find('.youtube_video').video('clear');
				}.bind( this ));
				
			}.bind(this)); 
		},
		
		// article 상품 목록 그리기
		_articleProdList : function(articleSn){
			
			AP.api.articleRelated(null, { // article 연관상품 목록
				 
				articleSn: articleSn, //아티클일련번호
				offset: 0,
				limit: 3 // 화면에 동영상 라인과 맞춰주려고.. 어차피 상세에 들어가서 봐야함
				
			}).done( function ( result ) {  
				this._$target.find( '.ch_etude .loading' ).remove();
				
				var html = '';
					html = AP.common.getTemplate( 'main.home.ch-etude-article-list', result.onlineProdList);
					
				this._$target.find('.ch_etude .clear dd ul' ).html( html );
				
				AP.lazyLoad.add('.ch_etude img.lazy_load');
			
			}.bind(this)); 
		},

		//Find your looks
		_setFindYourLooks: function () {
			var $section = this._$target.find( '.nine_looks' );
			if ( !$section.length ) return;
			
			AP.DISPLAY_MENU_ID = 'Looks';

			AP.api.getCornerInfo({}, {}).done(function ( result ) {
				result = result.corners[0];
				
				var html = AP.common.getTemplate( 'main.home.looks-article-list', result );
				$section.find( '.slide .ix-list-viewport' ).html( html );

				var $slide = $section.find( '.slide' ),
					viewLength = $slide.ixOptions( 'view-length' );

				$slide.find( '.paging .total' ).text( result.contentsSets.length );
				$slide.find( '.round_box' ).show();
				$slide.ixSlideMax({ loop: ( result['rotationCycleAvailYn'] == 'Y' ) ? true : false });
				$slide.on( 'ixSlideMax:change', function (e) {
					var currentPage = Math.ceil( e.currentIndex / viewLength ),
						totalPage = Math.ceil( e.totalLength / viewLength );

					$slide.find( '.paging' ).show();
					$slide.find( '.paging .current' ).text( currentPage + 1 );
					$slide.find( '.paging .total' ).text( totalPage );
				});

				AP.lazyLoad.add( $section.find( 'img.lazy_load' ));

			}.bind( this ));

			/*
			AP.api.articles( null, { // article num 
				articleCateId: 'Looks',
				offset: 0,
				limit: 3			
			}).done( function ( result ) {
				
				var html = AP.common.getTemplate( 'main.home.looks-article-list', result.articleSearchResult);
				var articleList = result.articleSearchResult.articleList;

				$section.find( '.slide' ).html( html );
				
				var $slide = $section.find( '.slide' ),
				viewLength = $slide.ixOptions( 'view-length' );

				for(var i = 0 ; i <  articleList.length ; i++){

					var hashTagList = articleList[i].snsHashTag.split(',');
					var $cont = $section.find( '.cont' ).eq(i);
					var contHtml = '<b class="eng">'+ articleList[i].articleTitle + '</b>';
					
					for(var j = 0 ; j <  hashTagList.length ; j++){
						contHtml = contHtml + '<span class="tag">'+'#'+hashTagList[j]+'</span>';
					}
					
					$cont.html(contHtml);
				}
				
				$slide.on( 'ixSlideMax:init ixSlideMax:change', function (e) {
					var currentPage = Math.ceil( e.currentIndex / viewLength ),
						totalPage = Math.ceil( e.totalLength / viewLength );
	
					$slide.find( '.paging' ).show();
					$slide.find( '.paging .current' ).text( currentPage + 1 );
					$slide.find( '.paging .total' ).text( totalPage );
				}).ixSlideMax();
	
				AP.lazyLoad.add( $section.find('img.lazy_load') );

			}.bind(this)); 
			*/
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
						contents: popupInfo.popupBodyText,
						containerClass: 'agree_terms'
					});
					
					modal.resetPosition();
				});
			}.bind(this));
		}
		
    });

    AP.home = new Home();

})( jQuery );