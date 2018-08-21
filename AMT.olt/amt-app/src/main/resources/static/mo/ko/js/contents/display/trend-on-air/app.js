/**
 * 매거진 > 트랜드온에어
 */
;(function ( $ ) {
	'use strict';

	var TrendOnAir = $B.Class.extend({

		initialize: function () {
			this._$target = $( 'magazine' );
			this._$listArea = this._$target.find( '.thumb_list' );
						
			this._$loading = this._$target.find( '.loading' );
			this._offset = 0;
			this._total = 0;
			this._loading = false;
			
			//this._setPlugins();
			this._setTrendOnAir();
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setPlugins: function () {
			//slide 적용
//			var $slide = this._$target.find( '.slide' );
//
//			$slide.ixSlideMax();
//			AP.responsiveWidth.addListener( 'resize', function (e) {
//				$slide.ixSlideMax( 'resize' );
//			});
//
//			//youtube
//			this._$target.find( '.youtube_video' ).video();
		},
		
		//Ch.트랜드온에어
		_setTrendOnAir: function () {
//			var $section = this._$target.find( '.thumb_list' );
//			if ( !$section.length ) return;
//			 
//			AP.DISPLAY_MENU_ID = 'trend_on_air'; 
			this._getTrendOnAir();
			
//			this._winScrollend = new $B.event.ScrollEnd( window )
//			.gap({bottom: AP.footer.getHeight()})
//			.addListener( 'scrollbottom', function (e) {
//				
//				if(this._total > this._offset){
//					if ( !this._loading ) {
//						console.log("dfdfdfdfdf");
//						this._getTrendOnAir();
//					}
//				}
//			}.bind(this)).disable();
//
//			$( window ).on( 'load resize', function (e) {
//				this._winScrollend.gap({
//					bottom: AP.footer.getHeight()
//				});
//			}.bind(this));
			
		},
		
		_getTrendOnAir: function () {
			if ( this._loading ) return;
			
			var displayType = $( '.magazine' ).attr('id');
			this._loading = true;
			this._$loading.show();
			AP.api.articles( null, { // article num 
				articleCateId: displayType,
				order : "StartDt", 
				keyword : null, 
				liveYn : "Y", 
				hashTag : null,
				offset: this._offset,
				limit: 10			
			}).done( function ( result ) {
				this._total = result.articleSearchResult.totalCount;				
				var html = AP.common.getTemplate( 'display.trend-on-air.trend-on-air-list', result.articleSearchResult); 
				
				this._$target.find('.txt_total_con>p>b').text(this._total);
				
				this._$listArea.append( html );
				
				this._offset += result.articleSearchResult.limit;
				console.log("_offset : " + this._offset);
			}.bind(this)).fail(function (e) {
				//this._winScrollend.clear();
				AP.modal.alert( '데이타를 불러오지 못했습니다.' );
			}.bind(this)).always(function () {
				this._loading = false;
				this._$loading.hide();
			}.bind(this)); 
		}
	});


	AP.trendOnAir = new TrendOnAir();
})( jQuery );