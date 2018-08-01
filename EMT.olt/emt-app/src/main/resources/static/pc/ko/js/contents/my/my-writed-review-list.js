/**
 * 작성한 리뷰
 */

;(function ( $ ) {
	'use strict';

	var MyWritedReviewList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.mypage.writed_reivew' );

			this._totalCount = 0;
			this._pagination = null;

			this._param = {
				prodReviewUnit: 'Member',
				offset: 0,
				limit: 5,
				startDate: '',
				endDate: '',
			};

			if ( this._$target.length > 0 ) this._setEvent();
		},

		/** =============== Public Methods =============== */
		_getList: function ( param ) {
			param = param || this._param;

			if ( param.offset == 0 ) {
				this._$target.find( '.loading' ).show();
				this._$target.find( '.writed_review_list' ).hide();
				this._$target.find( '.result_none' ).hide();
			}

			if ( this._api ) this._api.abort();

			this._api = AP.api.getReviewList( {}, param ).done(function ( result ) {

				this._$target.find( '.loading' ).hide();
				if ( result == null || (result != null && result.prodReviewListInfo.totalCount == 0) ) {
					//data없음
					this._clearPaging();
					this._$target.find( '.writed_review_list' ).hide();
					this._$target.find( '.result_none' ).show();
				} else {
					this._$target.find( '.writed_review_list' ).show();

					result = result.prodReviewListInfo;
					var html = AP.common.getTemplate( 'my.writed-review-list', result );

					this._$target.find( '.writed_review_list' ).html( html );

					if ( !this._pagination ) {
						this._setPaging( result.limit, result.totalCount );
					}

					this._$target.find( '.result_none' ).hide();
					this._totalCount = result.totalCount;

					$( '.ui_tooltip' ).tooltip();

					this._draw( result );
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

				AP.myWritedReviewList._getList( this._param );
			});
		},

		_draw: function ( data ) {
			this._$target.find( '.review_detail' ).on( 'click', function (e) {
				this._openDetail( data, $(e.currentTarget).data('prod-review-sn') );
			}.bind(this));

			this._$target.on( 'click', '.writed_review_list button', function (e) {
				//console.log( e.type, e.data);
				this._deleteReview( $(e.currentTarget).data('prod-review-sn') );
			}.bind( this ));
		},

		// 상품평 상세보기
		_openDetail: function ( data, prodReviewSn ) {
			var modal = AP.modal.info({
					title: '리뷰/후기',
					contents: {
						templateKey: 'common.review-detail-modal',
						templateModel: _.findWhere( data.prodReviewList, {prodReviewSn: prodReviewSn} )
					},
					containerClass: 'review',
					sizeType: 'L'
				}),
				$modal = modal.getElement();

			$modal.find( 'img' ).imagesLoaded().always( function () {
				if ( modal ) modal.resetPosition();
			});
		},

		// 상품평 삭제
		_deleteReview: function ( prodReviewSn ) {
			AP.modal.confirm( '구매 리뷰를 삭제하시겠습니까?' ).addListener( 'modal-close', function (e) {
				if ( e.closeType == 'confirm' ) {
					AP.api.deleteProdReview( null, {
						prodReviewSn: prodReviewSn
					}).done( function ( result ) {
						if(result.booleanResult.result) {
							AP.modal.alert( '구매 리뷰가 삭제되었습니다.' ).addListener( 'modal-close', function (e) {
								location.href = "/my/page/myWritedReviewList";
							});
						} else {
							AP.modal.alert("삭제 실패했습니다.");
						}
					}.bind(this));
				}
			}.bind(this));
		},

		_setPaging: function ( limit, totalCount ) {
			var $pagination = this._$target.find( '.pagination' );
			this._pagination = $pagination.paging({
				limit: limit,
				totalCount: totalCount,
				focusTarget: this._$target.find( '.rating_filter' )
			}).show();

			$pagination.on( 'paging-change', function (e) {
				this._param.offset = e.offset;
				this._getList( this._param );
			}.bind( this ));
		},

		_clearPaging: function () {
			var $pagination = this._$target.find( '.pagination' );
			$pagination.paging( 'clear' ).off( 'paging-change' ).hide();
			this._param.offset = 0;
			this._pagination = null;
		}
	});

	AP.myWritedReviewList = new MyWritedReviewList();
})( jQuery );