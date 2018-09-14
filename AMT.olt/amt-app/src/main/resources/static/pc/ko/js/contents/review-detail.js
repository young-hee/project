/**
 * 리뷰 상세 팝업
 * Events:
 */
;(function ( $ ) {
	'use strict';

	var ReviewDetail = $B.Class.extend({

		/**
		 * @param {jQuery}	$target		대상영역
		 * @param {Object}	params		api 호출에 필요한 params
		 */
		initialize: function ( $target, params ) {
			this._$target = $('.layer_popup');
			this._params = params;
			
			this._defaultData = null;
			this._modal = null;
		},

		/** =============== Public Methods =============== */
		
		/**
		 * 상세 모달 오픈
		 * @param {Object}	params	api param data
		 */
		open : function(){
			AP.api.getReviewDetail(null, {
				prodReviewSn : this._params.prodReviewSn
			}).done(function(result){
				this._defaultData = result;
				this._modal = AP.modal.info({
					contents: {
						templateKey: 'products.review-detail',
						templateModel: result.review
					},
					containerClass : 'review-detail',
					wrapperClass: 'photo_review',
					sizeType: 'M'
				});
				var $modal = this._modal.getElement();
				$modal.find('.slide').ixSlideMax();
				
				//추천수가 없을 경우 화면에서 감춤
				if( result.review.recommendCnt == 0 ){
					$modal.find('.recommendCnt').hide();
				}
				
				this._setEvents( $modal );
				
			}.bind(this));
		},

		/** =============== Private Methods =============== */

		_setEvents: function ( $modal ) {
			//리뷰 더읽기
			$modal.find('.btn_view_more').click(function(){
				$(this).parent().addClass("on");
			});
			$modal.find('.btn_view_close').click(function(){
				$(this).parent().removeClass("on");
			});
			
			//도움이되요
			$modal.find('.btn_help').off('click').on('click', function(e){
				if( AP.LOGIN_USER ){
					var $this = $(e.currentTarget);
					var recommendCnt = Number($this.find('.recommendCnt').text());
					if( $this.hasClass('on') ){
						// 상품평 추천 삭제
						AP.api.removeReviewRecommend({}, {
							prodReviewSn : $this.data('review-sn')
						}).done(function(){
							$this.removeClass('on');
							
							$this.find('.recommendCnt').text( recommendCnt - 1 )
							//추천수가 없을 경우 화면에서 감춤
							if( $this.find('.recommendCnt').text() == 0 ){
								$this.find('.recommendCnt').hide();
							}
							
						}.bind(this));
					} else {
						// 상품평 추천
						AP.api.reviewRecommend({}, {
							prodReviewSn : $this.data('review-sn')
						}).done(function(){
							$this.addClass('on');
							
							$this.find('.recommendCnt').text( recommendCnt + 1 )
							//추천수가 없을 경우 화면에서 감춤
							if( $this.find('.recommendCnt').text() > 0 ){
								$this.find('.recommendCnt').show();
							}
							
						}.bind(this));
					}
				} else {
					AP.login.go();
				}
			}.bind(this));
			
			//신고하기
			$modal.find('.btn_report').off('click').on('click', function(e){
				var $detailModal = $( '.layer_popup.review-detail' );
				if( AP.LOGIN_USER ){
					var reportModal = new AP.Report(this._defaultData).addListener( 'modal-close', function (e) { 
						if( e.data == 'report' ){
							$detailModal.find('.btn_report').addClass('on');
						}
						$detailModal.show();
						this._modal.resetPosition();
					}.bind(this)); 
					$detailModal.hide();
					reportModal.open();
				} else {
					AP.login.go();
				}
			}.bind(this));
			
		}

	});


	AP.ReviewDetail = ReviewDetail;
})( jQuery );