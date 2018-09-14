/**
 * BeautyTester
 *
 */

;(function ( $ ) {
	'use strict';

	var BeautyTester = $B.Class.extend({
		
		initialize: function () {
			this._$target = $( '#ap_container' );
			this._$regularEventListWrap = this._$target.find( '.event_list' );
						
			this._$loading = this._$target.find( '.loading' );

			this._loading = false;
			//this._setPlugins();
			
			//this._arrReviews = [];
		},

		/** =============== Public Methods =============== */
		
		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( model ) {
			this._defaultModel = model;
			this._setEvents();
		},

		/** =============== Private Methods ============== */
		_setEvents: function () {
			var data = this._defaultModel;
			var html = AP.common.getTemplate( 'display.beauty-tester.event-list', data );
			this._$regularEventListWrap.html(html);
			//$(this).siblings('.loading').hide();
			AP.lazyLoad.add( 'img.lazy_load' );
			
			/* consider...
			this._$reviews.find( '.review_item' ).each(function ( index, target ) {
				this._arrReviews.push( new AP.ReviewItem({
					$target: $(target),
					data: result.prodReviewListInfo.prodReviewList[index]
				}));
			}.bind( this ));
			*/
		}
	});
	AP.beautytester = new BeautyTester();
})( jQuery );