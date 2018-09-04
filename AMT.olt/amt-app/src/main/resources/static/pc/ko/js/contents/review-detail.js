/**
 * 리뷰 상세 팝업
 * Events:
 */
;(function ( $ ) {
	'use strict';

	var ReviewDetail = $B.Class.extend({

		/**
		 * @param {jQuery}	$target		대상영역
		 * @param {Object}	params		api 호출에 필요한 params
		 */
		initialize: function ( $target, params ) {
			this._$target = $target;
			this._params = params;
			//this.reset( params );
		},

		/** =============== Public Methods =============== */
		
		/**
		 * 상세 모달 오픈
		 * @param {Object}	params	api param data
		 */
		open : function(){
			AP.api.getReviewDetail(null, {
				prodReviewSn : this._params.prodReviewSn
			}).done(function(result){
				var modal = AP.modal.info({
					title: '구매리뷰 상세',
					contents: {
						templateKey: 'products.review-detail',
						templateModel: result.review
					},
					wrapperClass: 'photo_review',
					sizeType: 'M'
				}),
				$modal = modal.getElement();
			}.bind(this));
		},

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
			/*
			$( '.slide' ).ixSlideMax();
			
			//리뷰 더읽기
			$(".review_box .comment .btn_view_more").click(function(){
				$(this).parent().addClass("on");
				//$(this).parent().children('div').removeClass('ddd-truncated');
			});
			$(".review_box .comment .btn_view_close").click(function(){
				$(this).parent().removeClass("on");
			});
			*/
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
			
			//html 태그 삭제
			var strlength = 118;			
			for ( var i = 0; i < data.prodReviewList.length; ++i ) {
				var bodyText = data.prodReviewList[i].prodReviewBodyText;
				var bodyTextReduce = data.prodReviewList[i].prodReviewBodyText;
				var prodReviewSn = data.prodReviewList[i].prodReviewSn;

				bodyTextReduce = bodyTextReduce.replace(/<br\/>/ig, "\n");
				bodyTextReduce = bodyTextReduce.replace(/<\/br>/ig, "\n");
				bodyTextReduce = bodyTextReduce.replace(/<br>/ig, "\n");
				bodyTextReduce = bodyTextReduce.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
				bodyText = bodyTextReduce;
				if(bodyTextReduce.length > strlength){
					bodyTextReduce = bodyTextReduce.substr(0, strlength-2) + '...';
				}
				if(this._params.topReviewOnlyYn === 'Y'){
					$('.best_review .review' ).find('#bodyTextReduce'+prodReviewSn).attr('id', 'bestBodyTextReduce'+prodReviewSn);
					$('.best_review .review' ).find('#bodyTextOrigin'+prodReviewSn).attr('id', 'bestBodyTextOrigin'+prodReviewSn);
					document.getElementById('bestBodyTextReduce'+prodReviewSn).innerHTML = bodyTextReduce;
					document.getElementById('bestBodyTextOrigin'+prodReviewSn).innerHTML = '<pre>' + bodyText + '</pre>';

				}else{
					document.getElementById('bodyTextReduce'+prodReviewSn).innerHTML = bodyTextReduce;
					document.getElementById('bodyTextOrigin'+prodReviewSn).innerHTML = '<pre>' + bodyText + '</pre>';
				}
				
			}

			this._$target.find( '.pagination' ).paging({
				offset: data.offset,
				limit: data.limit,
				totalCount: data.totalCount
			}).on( 'paging-change', function (e) {
				this._getData( e.offset );
				$( window ).scrollTop( $('.review_filter').offset().top );
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


	AP.ReviewDetail = ReviewDetail;
})( jQuery );