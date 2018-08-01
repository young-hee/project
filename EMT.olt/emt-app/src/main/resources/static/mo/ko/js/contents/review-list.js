/**
 * 리뷰 리스트 (상품상세)
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
			this._offset = 0;
			this.reset( params, false );
		},

		/** =============== Public Methods =============== */

		/**
		 * 리스트 재설정 후 그리기
		 * @param {Object}	params	api param data
		 */
		reset: function ( params, isMore ) {
			this._params = $B.object.extend( this._params, params );
			this._getData( this._offset, isMore );
		},


		/** =============== Private Methods =============== */

		_setEvents: function (e) {
			//slide resize
			AP.responsiveWidth.addListener( 'resize', function (e) {
				this._$target.ixSlideMax( 'resize' );
			}.bind(this));
		},

		_getData: function ( offset, isMore ) {
			if ( this._api ) this._api.abort();

			this._api = AP.api.getReviewList( null, $B.object.extend(this._params, {offset: offset}, false) )
				.done( function ( result ) {
					var data = result.prodReviewListInfo;
					this._draw( data, isMore );
				}.bind(this))
				.fail( function ( xhr ) {
					//
				}.bind(this));
		},

		_draw: function ( data, isMore ) {
			$.each(data.prodReviewList, function(idx, obj){
				if( obj.imgList.length > 0 || (obj.prodReviewBodyText != null && obj.prodReviewBodyText.length > 118) ){
					obj.isMoreView = true;
				}
			});
			
			var $target = this._$target.find('.reviewWrap');
			var html = AP.common.getTemplate( 'common.review-list', $B.object.extend(data, {topReviewOnlyYn: this._params.topReviewOnlyYn}) ),
				$loading = this._$target.find( '.loading' ),
				$more = this._$target.find( 'button.btn_lg_more' ),
				isEtcReview = this._$target.hasClass('etc_review');
			
			if( isEtcReview ){
				this._offset += data.limit;
				
				if ( isMore ) {
					$target.append( html ).show();	//draw
					this._$target.show();
				} else {
					$target.html( html ).show();		//draw
					this._$target.show();
				}
	
				//리뷰가 없으면 감추기
				if ( this._params.topReviewOnlyYn === 'Y' && !data.totalCount ) {
					this._$target.hide();
				}
				
				if( data.totalCount > this._offset && data.totalCount >= data.offset ){
					$more.show();
					$more.find( 'span' ).html( '더보기 (<em>' + this._offset + '</em>/' + data.totalCount + ')' );
					$more.off('click');
					$more.on('click', function(){
						this._getData(this._offset, true);
					}.bind(this));
				} else {
					$more.hide();
				}
			} else {
				
			}
			
			$loading.hide();
			
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
		},

		_openDetail: function ( data, prodReviewSn ) {
			AP.modal.full({
				title: '리뷰/후기',
				contents: {
					templateKey: 'common.review-detail-modal',
					templateModel: _.findWhere( data.prodReviewList, {prodReviewSn: prodReviewSn} )
				},
				containerClass: 'review'
			});
		}

	});


	AP.ReviewList = ReviewList;
})( jQuery );