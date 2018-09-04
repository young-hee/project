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
		
		load : function(){
			console.log( this._params );
			this._getData( this._params.offset );
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
				if( this._params.prodReviewType && this._params.prodReviewType == 'ExperienceGrp' ){ 
					this._testerDraw( data );
				} else {
					this._draw( data );
				}
				
			}.bind(this))
			.fail( function ( xhr ) {
				//
			}.bind(this));
		},

		//리뷰
		_draw: function ( data ) {
			$.each(data.prodReviewList, function(idx, obj){
				if( obj.imgList.length > 0 || (obj.prodReviewBodyText != null && obj.prodReviewBodyText.length > 118) ){
					obj.isMoreView = true;
				}
			});
			
			var html = AP.common.getTemplate( 'products.review-contents', $B.object.extend(data, {topReviewOnlyYn: this._params.topReviewOnlyYn}) );
			
			if( this._params.offset == 0 )
				this._$target.find( '.review_cont' ).html( html );
			else
				this._$target.find( '.review_cont' ).append( html );
			AP.lazyLoad.add( this._$target.find( '.review_cont' ).find('img.lazyLoad') );
			
			this._params.totalCnt = data.totalCount;
			this._params.offset += this._params.limit;
			
			this.dispatch( 'review-draw', this._params );
			
			//html 태그 삭제
			/*
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
			
			//더읽기
			this._$target.find( '.btn_view_more' ).on( 'click', function (e) {
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
			
			this._$target.find( '.pagination' ).paging({
				offset: data.offset,
				limit: data.limit,
				totalCount: data.totalCount
			}).on( 'paging-change', function (e) {
				this._getData( e.offset );
				$( window ).scrollTop( $('.review_filter').offset().top );
			}.bind(this));
			*/
			
			/*
			if ( this._params.topReviewOnlyYn === 'Y' ) {
				this._$target.ixSlideMax( 'clear' ).ixSlideMax();
			}
			*/
			
		},
		
		//뷰티테스터 리뷰
		_testerDraw: function ( data ) {
			
			if( data.totalCount == 0 ){
				this._$target.hide();
				return false;
			}
			
			var html = AP.common.getTemplate( 'products.beautytester-review-contents', $B.object.extend(data, {topReviewOnlyYn: this._params.topReviewOnlyYn}) );
			
			if( this._params.offset == 0 )
				this._$target.find( '.reviews ul' ).html( html );
			else
				this._$target.find( '.reviews ul' ).append( html );
			AP.lazyLoad.add( this._$target.find( '.reviews' ).find('img.lazyLoad') );
			
			this._params.totalCnt = data.totalCount;
			this._params.offset += this._params.limit;
			
			this.dispatch( 'review-draw', this._params );
			
			//html 태그 삭제
			/*
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
			*/
			
			/*
			if ( this._params.topReviewOnlyYn === 'Y' ) {
				this._$target.ixSlideMax( 'clear' ).ixSlideMax();
			}
			*/
			
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