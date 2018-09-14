/**
 * ProductItem
 *
 */

;(function ( $ ) {
	'use strict';

	var ReviewItem = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target;
			this._defaultModel = options.data;

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		clear: function () {
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
			this._$target.on( 'click', function (e) {
				AP.api.getRegularEventProdReviewDetail( null, {prodReviewSn: this._defaultModel.prodReviewSn} )
				.done(function ( result ) {
					var options = {
						contents: {
							templateKey: 'display.beauty-tester.review-detail-modal',
							templateModel: result
						},
						sizeType: 'M',
		            	containerClass: '',
		            	wrapperClass: 'photo_review'
		        	};
					$(".modal_popup").find(".layer_wrap").removeClass("modal_popup");
					$(".modal_popup").find(".layer_wrap").removeClass("js_open");
		            
					AP.modal.info( options );
					
					$(".btn_help").click(function(e){
						AP.api.regularEventProductReviewRecommend( null, {prodReviewSn: result.prodReviewSn} )
						.done(function ( result ) {
							if(result.toggleDiv == 'post'){
								$(".btn_help").addClass("on");
							}else{
								$(".btn_help").removeClass("on");
							}
							$(".recommendCnt").text(result.recommendCnt);
						});
					});
						
				}.bind( this ))
				.fail(function( error ) {
					console.log( error );
					alert("error");
				})
				.always(function () {
				});
			}.bind( this ));
		}
	});

	AP.ReviewItem = ReviewItem;
})( jQuery );