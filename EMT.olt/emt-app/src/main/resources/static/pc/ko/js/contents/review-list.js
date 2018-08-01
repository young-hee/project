/**
 * 리뷰 리스트 (이벤트, 상품상세)
 * Events:
 * 	review-draw		리뷰리스트가 그려지고 난후 반환
 */
;(function ( $ ) {
	'use strict';

	var ReviewList = $B.Class.extend({

		/**
		 * @param {jQuery}	$target		대상영역
		 * @param {Object}	params		api 호출에 필요한 params
		 */
		initialize: function ( $target, params ) {
			this._$target = $target;
			this._params = {};
			this.reset( params );
		},

		/** =============== Public Methods =============== */

		/**
		 * 리스트 재설정 후 그리기
		 * @param {Object}	params	api param data
		 */
		reset: function ( params ) {
			this._params = $B.object.extend( this._params, params );
			this._getData( 0 );
		},


		/** =============== Private Methods =============== */

		_setEvents: function (e) {
			//slide resize
			AP.responsiveWidth.addListener( 'resize', function (e) {
				this._$target.ixSlideMax( 'resize' );
			}.bind(this));
		},

		_getData: function ( offset ) {
			if ( this._api ) this._api.abort();

			this._api = AP.api.getReviewList( null, $B.object.extend(this._params, {offset: offset}, false) )
				.done( function ( result ) {
					var data = result.prodReviewListInfo;
					this._draw( data );
				}.bind(this))
				.fail( function ( xhr ) {
					//
				}.bind(this));
		},

		_draw: function ( data ) {
			
			$.each(data.prodReviewList, function(idx, obj){
				if( obj.imgList.length > 0 || (obj.prodReviewBodyText != null && obj.prodReviewBodyText.length > 118) ){
					obj.isMoreView = true;
				}
			});
			
			var html = AP.common.getTemplate( 'common.review-list', $B.object.extend(data, {topReviewOnlyYn: this._params.topReviewOnlyYn}) );

			//remove
			this._$target.find( '.pagination' ).paging( 'clear' ).off( 'paging-change' );
			this._$target.find( '.review_detail' ).off( 'click' );

			if ( this._params.topReviewOnlyYn === 'Y' ) {
				//리뷰가 없으면 감추기
				if ( !data.totalCount ) {
					this._$target.hide();
				} else {
					this._$target.show().find( '.ix-list-viewport' ).html( html );
				}
			} else {
				this._$target.html( html );
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
				if( $(this).hasClass('off') ){
					$(this).siblings('.reduce').hide();
					$(this).siblings('.origin').slideDown('slow');
					$(this).text('감추기 ∧').toggleClass('off on');
				} else {
					$(this).siblings('.reduce').show();
					$(this).siblings('.origin').slideUp('slow');
					$(this).text('더보기 ∨').toggleClass('on off');
				}
			});

			if ( this._params.topReviewOnlyYn === 'Y' ) {
				this._$target.ixSlideMax( 'clear' ).ixSlideMax();
			}

			this.dispatch( 'review-draw' );
		},

		_openDetail: function ( data, prodReviewSn ) {
			/*
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
			*/
		}

	});


	AP.ReviewList = ReviewList;
})( jQuery );