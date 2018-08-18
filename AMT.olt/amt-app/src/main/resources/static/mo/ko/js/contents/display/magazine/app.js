/**
 * 매거진 메인
 */
;(function ( $ ) {
	'use strict';

	var Magazine = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container' );

			this._setPlugins();
			this._setSuperBeautyTip();
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setPixleeList: function () {
			this._getPixleeData();

			this._$target.find( '.etude_pick_list' ).on( 'click', 'a', function (e) {
				e.preventDefault();

				var idx = $( e.currentTarget ).parent().index(),
					pixleeModal = new AP.PixleeModal( this._model ).open( idx );
			}.bind(this));
		},

		_setPlugins: function () {
			//slide 적용
			var $slide = this._$target.find( '.slide' );

			$slide.ixSlideMax();
			AP.responsiveWidth.addListener( 'resize', function (e) {
				$slide.ixSlideMax( 'resize' );
			});

			//youtube
			this._$target.find( '.youtube_video' ).video();
		},
		
		//Ch.에뛰드
		_setSuperBeautyTip: function () {
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
		}
	});


	AP.Magazine = new Magazine();
})( jQuery );