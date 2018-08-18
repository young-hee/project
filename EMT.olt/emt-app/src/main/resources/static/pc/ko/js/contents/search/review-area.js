/**
 * 검색 : 리뷰 리스트 영역
 */
;(function ( $ ) {
	'use strict';

	var ReviewArea = $B.Class.extend({

		initialize: function ( $target ) {
			this._$target = $( $target );
			this._$listArea = this._$target.find( '.review_list' );
			this._$reviewSort = this._$target.find( '[name="prodReviewSort"]' );
			this._$reviewType = this._$target.find( '[name="prodReviewType"]' );
			this._$scope = this._$target.find( '[name="scope"]' );
			this._$reviewCnt = null;

			this._keyword = '';

			this._setEvents();
		},

		/** =============== Public Methods =============== */

		/**
		 * 리스트 재설정 후 그리기
		 * @param {Object}	keyword		검색 키워드
		 */
		reset: function ( keyword, $reviewCnt, data ) {
			this._keyword = keyword;
			//필터 초기화
			this._$reviewType.val( 'All' );
			this._$reviewSort.val( 'Last' );
			this._$scope.val( 'All' );
			//this._getData( 0 );
			this._$reviewCnt = $reviewCnt;
			
			this._draw( data );
		},


		/** =============== Private Methods =============== */

		_setEvents: function () {
			//filter
			this._$reviewType.on( 'change', this._filterChange.bind(this) );
			this._$reviewSort.on( 'change', this._filterChange.bind(this) );
			this._$scope.on( 'change', this._filterChange.bind(this) );
		},

		_filterChange: function (e) {
			this._getData( 0 );
		},

		_getData: function ( offset ) {
			this._$target.find( '.pagination' ).paging( 'disable' );

			//TODO: 해당 api로 변경
			this._api = AP.api.searchReviewList( null, {
					toSearchFor			: this._keyword,
					prodReviewTypeCodes	: this._$reviewType.val(),
					prodReviewSort		: this._$reviewSort.val(),
					scope				: this._$scope.val(),
					offset				: offset,
					limit				: 5
				})
				.done( function ( result ) {
					this._draw( result );
				}.bind(this))
				.fail( function ( xhr ) {
					//
				}.bind(this));
		},

		_draw: function ( data ) {
			
			var listData = $B.object.clone(data); 
			$.each(listData.list ,function(index, reviewArray){
				reviewArray.prodReviewBodyText = AP.common.replaceHtmlEntites(reviewArray.prodReviewBodyText);
				reviewArray.prodReviewBodyText = AP.common.removeHtmlTag(reviewArray.prodReviewBodyText);
				
			});
			
			var html = AP.common.getTemplate( 'search.review-list', listData );

			//remove events
			this._$target.find( '.review_detail' ).off( 'click' );
			this._$target.find( '.pagination' ).paging( 'clear' ).off( 'paging-change' );

			//draw
			this._$listArea.html(html);
			this._$target.show();

			if ( data.totalCount ) {
				this._$target.show();
			} else {
				this._$target.hide();
			}
			
			if ( this._$reviewCnt != undefined && this._$reviewCnt != null && this._$reviewCnt.length > 0 ) {
				this._$reviewCnt.text( $B.string.numberFormat( data.totalCount ) );
			}
			
			this._$target.find( '.pagination' ).paging({
				offset: data.offset,
				limit: data.limit,
				totalCount: data.totalCount
			}).on( 'paging-change', function (e) {
				this._getData( e.offset );
			}.bind(this));

			//상세보기
			this._$target.find( '.review_detail' ).on( 'click', function (e) {
				e.preventDefault();
				this._openDetail( data, $(e.currentTarget).data('prod-review-sn') );
			}.bind(this));
		},

		_openDetail: function ( data, prodReviewSn ) {
			$.each(data.list ,function(index, reviewArray){
				reviewArray.prodReviewBodyText = AP.common.replaceHtmlEntites(reviewArray.prodReviewBodyText);
			});
			var modal = AP.modal.info({
					title: '리뷰/후기',
					contents: {
						templateKey: 'common.review-detail-modal',
						templateModel: _.findWhere( data.list, {prodReviewSn: prodReviewSn} )
					},
					containerClass: 'review',
					sizeType: 'L'
				}),
				$modal = modal.getElement();

			$modal.find( 'img' ).imagesLoaded().always( function () {
				if ( modal ) modal.resetPosition();
			});
			
			$modal.find
		}

	});


	AP.ReviewArea = ReviewArea;
})( jQuery );