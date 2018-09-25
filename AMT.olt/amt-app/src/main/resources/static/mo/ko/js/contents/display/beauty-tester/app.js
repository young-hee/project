/**
 * BeautyTester
 *
 */

;(function ( $ ) {
	'use strict';

	var BeautyTester = $B.Class.extend({
		
		initialize: function () {
			this._$target = $( '#ap_container' );
			//this._setPlugins();
		},

		/** =============== Public Methods =============== */
		
		//페이지를 구성한는 기본 데이타 설정
		load: function ( param ) {
			this._setEvents();
			this._setBestReview(param.sortBestReview);
		},

		/** =============== Private Methods ============== */
		_setEvents: function () {
			var data = this._defaultModel;
//			var html = AP.common.getTemplate( 'display.beauty-tester.event-list', data );
//			this._$regularEventListWrap.html(html);
			//$(this).siblings('.loading').hide();
//			AP.lazyLoad.add( 'img.lazy_load' );
			
			/* consider...
			this._$reviews.find( '.review_item' ).each(function ( index, target ) {
				this._arrReviews.push( new AP.ReviewItem({
					$target: $(target),
					data: result.prodReviewListInfo.prodReviewList[index]
				}));
			}.bind( this ));
			*/
		},
		_setBestReview: function (order) {
			AP.api.regularEventBestProductReviews( null, {order: order} )
			.done(function ( result ) {
				this._$reviews = this._$target.find( ".best_cont > .realtime_review > .review_list.grid");
				var reviews_html = AP.common.getTemplate('display.beauty-tester.best-review-list', result.bestReviewList);
				this._$reviews.html(reviews_html);
			}.bind( this ))
			.fail(function( error ) {
				console.log( error );
				alert("error");
			})
			.always(function () {
				
			});
		}
	});
	AP.beautytester = new BeautyTester();
})( jQuery );