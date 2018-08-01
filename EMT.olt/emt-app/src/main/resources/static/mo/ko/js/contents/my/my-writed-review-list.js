/**
 * 작성한 리뷰
 */

;(function ( $ ) {
	'use strict';

	var MyWritedReviewList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.mypage.review_writing.writed_review' );

			this.DEFUALT_PAGE_SIZE = 5;
			this._totalCount = 0;
			this._prodReviewList;
			this._deleteYn = "N";

			this._param = {
				prodReviewUnit: 'Member',
				offset: 0,
				limit: 5,
				startDate: '',
				endDate: ''
			};

			if ( this._$target.length > 0 ) this._setEvent();
		},

		/** =============== Public Methods =============== */
		_getList: function ( param, reset ) {
			param = param || this._param;

			if ( param.offset == 0 ) {
				this._$target.find( '.loading' ).show();
				this._$target.find( '.writed_review_list' ).hide();
				this._$target.find( '.btn_lg_more' ).hide();
				this._$target.find( '.result_none' ).hide();
			}

			if ( reset ) this._$target.find( '.writed_review_list' ).html('');

			if ( this._api ) this._api.abort();

			this._api = AP.api.getReviewList( null, param ).done(function ( result ) {

				this._$target.find( '.loading' ).hide();
				if ( result == null || (result != null && result.prodReviewListInfo.totalCount == 0) ) {
					//data없음
					this._$target.find( '.writed_review_list' ).hide();
					this._$target.find( '.btn_lg_more' ).hide();
					this._$target.find( '.result_none' ).show();
				} else {
					this._$target.find( '.writed_review_list' ).show();

					result = result.prodReviewListInfo;
					var html = AP.common.getTemplate( 'my.writed-review-list', result );
					if ( result.totalCount < this.DEFUALT_PAGE_SIZE ) {
						//paging없음
						this._$target.find( '.writed_review_list' ).html( html );
						this._$target.find( '.btn_lg_more' ).hide();

					} else {

						this._$target.find( '.writed_review_list' ).append( html );

						this._param.offset = result.offset + result.prodReviewList.length;
						this._$target.find( '.btn_lg_more' ).show();
						this._$target.find( '.btn_lg_more' ).html("더보기 (<em id='off'>" + this._param.offset+"</em>/" + "<span id='tot'>" + result.totalCount+"</span>)");

						this._$target.find( '.result_none' ).hide();
					}
					this._prodReviewList = result.prodReviewList;
					this._totalCount = result.totalCount;

					//리뷰수 수정
					$('#wCnt').text(result.totalCount);
				}

			}.bind( this )).fail(function (e) {
				console.log( 'error' );
			}).always(function (e) {});
		},

		/** =============== Private Methods =============== */
		_setEvent: function () {

			//multiple date picker적용
			$( '.ui_multiple_date_picker' ).multipleDatePicker({
				defaultRangeDate: '1months',
				minDate: moment().subtract( 50, 'years' )
			}).on( 'multiple-date-picker-change', function (e) {
				//console.log( e.type, e.date );

				this._param = {
					prodReviewUnit: 'Member',
					offset: 0,
					limit: 5,
					startDate: e.date.startDate,
					endDate: e.date.endDate
				};

				AP.myWritedReviewList._getList( this._param, true );
			});

			// 더보기
			this._$target.on( 'click', '.btn_lg_more', function (e) {
				this._param = {
					prodReviewUnit: 'Member',
					offset: this._deleteYn == "Y" ? 0 : this._param.offset,
					limit: 5,
					startDate: $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).startDate,
					endDate: $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).endDate
				};

				if (this._param.offset < this._totalCount) AP.myWritedReviewList._getList( this._param, this._deleteYn == "Y" ? true : false );
			}.bind( this ));

			//상세보기
			this._$target.on('click', '.button_review_more', function (e) {
				this._openDetail( this._prodReviewList, $(e.currentTarget).data('prod-review-sn') );
			}.bind(this));

			//리뷰삭제
			this._$target.on('click', '.button_review_del', function (e) {
				this._deleteReview( $(e.currentTarget).data('prod-review-sn') );
			}.bind(this));

		},

		_openDetail: function ( prodReviewList, prodReviewSn ) {
			AP.modal.full({
				title: '리뷰/후기',
				contents: {
					templateKey: 'common.review-detail-modal',
					templateModel: _.findWhere( prodReviewList, {prodReviewSn: prodReviewSn} )
				},
				containerClass: 'review'
			});
		},

		_deleteReview: function ( prodReviewSn ) {
			AP.modal.confirm( '구매 리뷰를 삭제하시겠습니까?' ).addListener( 'modal-close', function (e) {
				if ( e.closeType == 'confirm' ) {
					AP.api.deleteProdReview(null, {
						prodReviewSn: prodReviewSn
					}).done( function ( result ) {
						if(result.booleanResult.result) {
							AP.modal.alert("구매 리뷰가 삭제되었습니다.");
							$('[name=reviewSn_'+ prodReviewSn +']').remove();

							this._deleteYn = "Y";
							this._$target.find( '#off' ).html(this._$target.find( '#off' ).html() -1);
							this._$target.find( '#tot' ).html(this._$target.find( '#tot' ).html() -1);
							this._$target.find( '#wCnt' ).html(this._$target.find( '#wCnt' ).html() -1);
						} else {
							AP.modal.alert("삭제 실패했습니다.");
						}
					}.bind(this));
				}
			}.bind(this));
		}
	});

	AP.myWritedReviewList = new MyWritedReviewList();
})( jQuery );