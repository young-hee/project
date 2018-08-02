/**
 * 제품상세 : 리뷰 영역 제어
 * Events:
 * 		change-height	리뷰영역 높이가 변경되었을때 전달
 */
;(function ( $ ) {
	'use strict';

	var ReviewArea = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container .product_review' );
		},

		/** =============== Public Methods =============== */

		//기본 설정
		setDefault: function ( model ) {
			if ( this._defaultModel ) return;

			this._defaultModel = model;
			this._setEvents();
		},

		/** =============== Private Methods =============== */

		_setEvents: function () {
			this._writeModal = new AP.ReviewWriteModal( this._defaultModel )
				.addListener( 'success', function (e) {
					this._etcList.reset({
						prodReviewType: this._$target.find( '.review_filter select[name="prodReviewType"]' ).val(),
						prodReviewSort: this._$target.find( '.review_filter select[name="prodReviewSort"]' ).val(),
						scope: this._$target.find( '.review_filter select[name="scope"]' ).val()
					});
				}.bind(this));

			this._bestList = new AP.ReviewList( this._$target.find('.best_review'), {
				topReviewOnlyYn: 'Y',
				onlineProdSn: this._defaultModel.onlineProdSn
			}).addListener( 'review-draw', function (e) {
				this.dispatch( 'change-height' );
			}.bind(this));

			this._etcList = new AP.ReviewList( this._$target.find('.review_list'), {
				onlineProdSn: this._defaultModel.onlineProdSn,
				limit: 8
			}).addListener( 'review-draw', function (e) {
				this.dispatch( 'change-height' );
			}.bind(this));

			//filter 적용
			this._$target.find( '.review_filter select' ).on( 'change', function (e) {
				var params = {
					prodReviewType: this._$target.find( '.review_filter select[name="prodReviewType"]' ).val(),
					prodReviewSort: this._$target.find( '.review_filter select[name="prodReviewSort"]' ).val(),
					scope: this._$target.find( '.review_filter select[name="scope"]' ).val()
				};

				this._etcList.reset( params );
			}.bind(this));

			//리뷰필터 열기
			this._$target.find( '.btn_filters' ).on( 'click', function (e) {
				e.preventDefault();
				this._filter.open();
			}.bind(this));

			//리뷰작성
			this._$target.find( '.btn_write_review' ).on( 'click', function (e) {
				AP.login().done( function () {
					this._writeModal.prevGetData();
				}.bind(this));
			}.bind(this));
		}

	});


	AP.reviewArea = new ReviewArea();
})( jQuery );