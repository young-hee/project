/**
 * 리뷰 리스트 (마이파우치)
 * Events:
 * 	review-draw		리뷰리스트가 그려지고 난후 반환
 */
;(function ( $ ) {
	'use strict';

	var MyReviewList = $B.Class.extend({

		initialize: function ( $target ) {
			
		},

		/** =============== Public Methods =============== */
		
		setDefaultData: function ( $target ) {
			this._$target = $target;
			this._$loading = this._$target.find( '.loading' );
			this._setEvents();
		},


		/** =============== Private Methods =============== */
		
		_setEvents: function () {
			var reviewWriteModal = null;
			
			/* 리뷰작성 */
			this._$target.find('.btn_lg_gradient').on('click', function(e){
				var $this = $(e.currentTarget);
				var info = {
					ordNo: $this.data('ord-no'),
					ordProdSn: $this.data('ord-prod-sn'),
					onlineProdSn: $this.data('online-prod-sn'),
					prodSn: $this.data('prod-sn'),
					prodName: $this.parents('.review').find('.prodName').text()
				}
				reviewWriteModal = new AP.ReviewWriteModal(info);
				reviewWriteModal.addListener( 'success', function (e) {
					location.reload();
				});
			});
			
			/* 리뷰수정 */
			this._$target.find('.modifyReview').on('click', function(e){
				var $this = $(e.currentTarget);
				var prodReviewSn = $this.data('review-sn');
				var prodReviewTypeCode = $this.data('typecode');
				if(prodReviewTypeCode == 'ExperienceGrp') {
					alert('뷰티테스터는 앱에서만 신청 가능한 서비스 입니다.');
					return;
				}else {
					reviewWriteModal = new AP.ReviewWriteModal({
						modify : true,
						prodReviewSn : prodReviewSn
					});
					reviewWriteModal.addListener( 'success', function (e) {
						location.reload();
					});
				}
			});
			
			/* 리뷰삭제 */
			this._$target.find('.deleteReview').on('click', function(e){
				var $this = $(e.currentTarget);
				var prodReviewSn = $this.data('review-sn');
				var prodReviewTypeCode = $this.data('typecode');
				alert(prodReviewSn);
				if(confirm('정말 삭제하시겠습니까?')) {
					AP.api.deleteProdReview( null, {
						prodReviewSn: prodReviewSn
					}).done( function ( result ) {
						if(result.booleanResult.result) {
							alert('구매 리뷰가 삭제되었습니다.');
							location.href = "/my/page/myReviewList";
						} else {
							alert('삭제 실패했습니다.');
						}
					}.bind(this));
				} 
			});
		}
	});
	
	AP.myReviewList = new MyReviewList();
	
})( jQuery );