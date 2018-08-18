/**
 * 검색 : 리뷰 리스트 영역
 */
;(function ( $ ) {
	'use strict';

	var ReviewArea = $B.Class.extend({

		initialize: function ( $target ) {
			this._$target = $( $target );
			this._$moreBtn = this._$target.find( '.btn_review_more' );
			this._$loading = this._$target.find( '.review_loading' );
			this._$listArea = this._$target.find( '.review_list' );
			this._$sortSelect = this._$target.find( '[name="prodReviewSort"]' );
			this._$prodFilterCheck = this._$target.find( '#review_filter_pur' );

			this._keyword = '';

			this._setEvents();
		},

		/** =============== Public Methods =============== */

		/**
		 * 리스트 재설정 후 그리기
		 * @param {Object}	keyword		검색 키워드
		 */
		reset: function ( keyword ) {
			this._keyword = keyword;
			//필터 초기화
			this._$prodFilterCheck.prop( 'checked', false );
			this._$sortSelect.val( 'RecentRegistDt' );

			this._getData( 0 );
		},


		/** =============== Private Methods =============== */

		_setEvents: function () {
			//filter
			this._$sortSelect.on( 'change', function (e) {
				this._getData( 0 );
			}.bind(this));

			this._$prodFilterCheck.on( 'change', function (e) {
				this._getData( 0 );
			}.bind(this));
		},

		_getData: function ( offset ) {
			this._$loading.show();
			this._$moreBtn.hide();

			if ( this._api ) this._api.abort();

			//TODO: 해당 api로 변경
			this._api = AP.api.searchReviewList( null, {
					toSearchFor: this._keyword,
					prodReviewType: this._$prodFilterCheck.is( ':checked' ) ? 'Pur' : 'All',
					prodReviewSort: this._$sortSelect.val(),
					offset: offset,
					limit: 5
				})
				.done( function ( result ) {
					this._draw( result );
				}.bind(this))
				.fail( function ( xhr ) {
					//
				}.bind(this));
		},

		_draw: function ( data ) {
			
			var html = AP.common.getTemplate( 'search.review-list', data );

			//remove events
			this._$target.find( '.review_detail' ).off( 'click' );
			this._$moreBtn.off( 'click' );

			//draw
			if ( data.offset ) {
				this._$listArea.append( html);
			} else {
				this._$listArea.html( html );
			}

			this._$loading.hide();

			var nextOffset = data.offset + data.limit;

			if ( data.totalCount > nextOffset ) {
				this._$moreBtn.html( '<span>더보기 (<em>' + nextOffset  + '</em>/' + data.totalCount + ')</span> <i class="ico_arr_d"></i>' ).show();
				this._$moreBtn.on( 'click', function (e) {
					this._getData( nextOffset );
				}.bind(this));
			}

			//상세보기
			this._$target.find( '.review_detail' ).on( 'click', function (e) {
				e.preventDefault();
				this._openDetail( data, $(e.currentTarget).data('prod-review-sn') );
			}.bind(this));
		},

		_openDetail: function ( data, prodReviewSn ) {
			
			AP.modal.full({
				title: '리뷰/후기',
				contents: {
					templateKey: 'common.review-detail-modal',
					templateModel: _.findWhere( data.list, {prodReviewSn: prodReviewSn} )
				},
				containerClass: 'review'
			});
		}

	});


	AP.ReviewArea = ReviewArea;
})( jQuery );