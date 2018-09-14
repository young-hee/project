/**
 * 신고하기 팝업
 * Events:
 */
;(function ( $ ) {
	'use strict';

	var Report = $B.Class.extend({

		/**
		 * @param {jQuery}	$target		대상영역
		 * @param {Object}	params		api 호출에 필요한 params
		 */
		initialize: function ( review ) {
			this._defaultData = review
		},

		/** =============== Public Methods =============== */
		
		/**
		 * 상세 모달 오픈
		 */
		open : function(){
			var reportModal = AP.modal.info({
				contents: {
					templateKey: 'products.report',
					templateModel: this._defaultData.review
				},
				sizeType: 'M',
				btnConfirm : false
			}).addListener( 'modal-close', function (e) {
				this.dispatch('modal-close', e);
			}.bind(this)),
			$reportModal = reportModal.getElement();
			$reportModal.find('.btn_fix_bordered').on('click', function(){
				reportModal.close();
			})
			$reportModal.find('.btn_fix_neutral').on('click', function(){
				AP.api.reportReview({}, {
					prodReviewSn : this._defaultData.review.prodReviewSn,
					prodReviewReportTypeCode : $reportModal.find('input[name="report"]:checked').val(),
					reportBodyText : $reportModal.find('#reportBodyText').val()
				}).done(function(result){
					reportModal.close('report');
				}).fail(function(err){
					console.log( err );
				})
			}.bind(this));
			
		},

		/** =============== Private Methods =============== */

		_setEvents: function ( $modal ) {
			$modal.find('.btn_report').click();
		}

	});


	AP.Report = Report;
})( jQuery );