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
		 * 신고하기 모달 오픈
		 */
		open : function(){
			var btnHtml = '<ul class="btn_col2_area">'+
							'<li><a href="javascript:;" class="cancel btn_h50_wh">취소</a></li>'+
							'<li><a href="javascript:;" class="report btn_h50_bk">신고하기</a></li>'+
						  '</ul>';
			var reportModal = AP.modal.full({
				title : '신고하기',
				contents: {
					templateKey: 'review.report',
					templateModel: this._defaultData.review
				},
				containerClass : ' btn_y bg_w',
				btnHtnml : btnHtml
			}).addListener( 'modal-close', function (e) {
				this.dispatch('modal-close', e);
			}.bind(this)),
			$reportModal = reportModal.getElement();
			
			//취소
			$reportModal.find('.cancel').on('click', function(){
				AP.modal.confirm({
					contents : '취소하시겠습니까?'
				}).addListener( 'modal-close', function (e) {
					if( e.closeType == 'confirm' ){
						reportModal.close();
					}
				}.bind(this));
			});
			
			//신고
			$reportModal.find('.report').on('click', function(){
				var reportType = $reportModal.find('input[name="radio_1"]:checked').val();
				if(reportType == undefined){
					AP.modal.alert({contents : '신고사유를 선택해 주세요'});
					return false;
				}
				AP.api.reportReview({}, {
					prodReviewSn : this._defaultData.review.prodReviewSn,
					prodReviewReportTypeCode : reportType,
					reportBodyText : $reportModal.find('#reportBodyText').val()
				}).done(function(result){
					AP.modal.alert({
						contents : '신고되었습니다'
					}).addListener( 'modal-close', function (e) {
						if( e.closeType == 'confirm' ){
							reportModal.close('report');
						}
					}.bind(this));
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