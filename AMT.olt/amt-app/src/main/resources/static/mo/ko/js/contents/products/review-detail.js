/**
 * 제품상세 페이지 영역 요소들 제어
 *
*/
;(function ( $ ) {
	'use strict';

	var ReviewDetail = $B.Class.extend({
		initialize: function ( prodReviewSn ) {
			this._$target = $( '#ap_container' );
			this._prodReviewSn = prodReviewSn;
			
			//this._setDefaultData( prodReviewSn )
		},

		/** =============== Public Methods =============== */
		
		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( onlineProdSn, memberSn ) {
		},
		
		openDetail : function(){
			AP.api.getReviewDetail({}, {
				prodReviewSn : this._prodReviewSn
			}).done(function( result ){
				console.log( result );
				
				var imgList = [
					{"imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg"},
					{"imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg"},
					{"imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg"},
					{"imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg"},
					{"imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg"},
					{"imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg"},
					{"imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg"},
					{"imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg"},
					{"imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg"},
					{"imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg"},
					{"imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg"}
				];
				
				result.review.imgList = imgList;
				var modal = AP.modal.full({
					title: '옵션 선택',
					contents: {
						templateKey: 'products.review-detail',
						templateModel : {
							review: result.review
						}
					}
				});
				
				var $modal = modal.getElement();
				
				console.log( $modal );
			}).fail(function( err ){
				console.log( err );
			});
		},

		/** =============== Private Methods =============== */

		_setEvents: function () {
		}
		
	}, 'ReviewDetail');

	AP.ReviewDetail = AP.ReviewDetail || ReviewDetail;
})( jQuery );