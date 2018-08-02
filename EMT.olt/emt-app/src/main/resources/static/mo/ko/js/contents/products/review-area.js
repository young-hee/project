/**
 * 제품상세 : 리뷰 영역 제어
 */
;(function ( $ ) {
	'use strict';

	var ReviewArea = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container .review_area' );
		},

		/** =============== Public Methods =============== */

		//기본 설정
		setDefault: function ( model ) {
			if ( this._defaultModel ) return;

			this._defaultModel = model;
			this._defaultModel.skinTones = {};
			this._setEvents();
		},

		/** =============== Private Methods =============== */

		_setEvents: function () {
			this._filter = new AP.ReviewFilter( this._defaultModel.products )
				.addListener( 'change-filter', function (e) {
					var params = {
						prodReviewType: e.selectedData.prodReviewType.value,
						prodReviewSort: e.selectedData.prodReviewSort.value,
						scope: e.selectedData.scope.value
					};

					this._bestList.reset( params );
					this._etcList.reset( params );
					this._setSelectedFilterLabel( e.selectedData );
				}.bind(this));

			this._writeModal = new AP.ReviewWriteModal( this._defaultModel )
				.addListener( 'success', function (e) {
					var filter = this._filter.getSelectedData();
					if( filter.prodReviewType == undefined && filter.prodReviewSort == undefined ){
						this._etcList.reset({});
					}else{
						
						this._etcList.reset({
							prodReviewType: filter.prodReviewType.value,
							prodReviewSort: filter.prodReviewSort.value,
							scope: filter.scope.value
						});
					}
				}.bind(this));

			this._bestList = new AP.ReviewList( this._$target.find('.best_review'), {
				topReviewOnlyYn: 'Y',
				onlineProdSn: this._defaultModel.onlineProdSn
			});

			this._etcList = new AP.ReviewList( this._$target.find('.etc_review'), {
				onlineProdSn: this._defaultModel.onlineProdSn,
				limit: 8
			});

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
		},

		_setSelectedFilterLabel: function ( selectedData ) {
			var html = AP.common.getTemplate( 'products.selected-filters-label', selectedData );
			this._$target.find( '.selected_filters' ).html( html );
		}

	});


	AP.reviewArea = new ReviewArea();
})( jQuery );