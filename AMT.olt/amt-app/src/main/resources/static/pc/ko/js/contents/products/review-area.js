/**
 * 제품상세 : 리뷰 영역 제어
 * Events:
 * 		change-height	리뷰영역 높이가 변경되었을때 전달
 */
;(function ( $ ) {
	'use strict';

	var ReviewArea = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container .detail_review' );
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
			
			//일반 상품 리뷰
			this._list = new AP.ReviewList( this._$target.find('.review_list'), {
				//prodReviewUnit : 'OnlineProd',
				//prodReviewType: 'Pur',
				//onlineProdSn: this._defaultModel.onlineProdSn,
				offset : 0,
				limit : 10,
				prodReviewSort : 'Recommend'
			}).addListener( 'review-draw', function (e) {
				if( e.offset >= e.totalCnt ){this._$target.find('.btn_list_more').hide();}
				this.dispatch( 'change-height' );
			}.bind(this));
			
			//더보기
			this._$target.find('.btn_list_more').on('click', function(){
				this._list.load();
			}.bind(this));
			
			//sort option Click event - 추천순 최신순
			this._$target.find('.review_sort .filter').on('click', function(e){
				var $this = $(e.currentTarget);
				if( $this.hasClass('on') )return false;
				$this.siblings('a').removeClass('on');
				$this.addClass('on');
				this._$target.find( '.review_cont' ).empty();
				this._list.reset({
					//prodReviewUnit : 'OnlineProd',
					//prodReviewType : 'Pur',
					//onlineProdSn : this._defaultModel.onlineProdSn,
					offset : 0,
					limit : 10,
					scope : $this.parents('.review_sort').find('.statBtn.on').data('stat'),
					prodReviewSort : $this.data('sort')
				});
			}.bind(this));
			
			//stat option Click event - 별점
			this._$target.find('.statBtn').on('click', function(e){
				var $this = $(e.currentTarget);
				if( $this.hasClass('on') )return false;
				$this.siblings('a').removeClass('on');
				$this.addClass('on');
				this._$target.find( '.review_cont' ).empty();
				this._list.reset({
					//prodReviewUnit : 'OnlineProd',
					//prodReviewType : 'Pur',
					//onlineProdSn : this._defaultModel.onlineProdSn,
					offset : 0,
					limit : 10,
					scope : $this.data('stat'),
					prodReviewSort : $this.parents('.review_sort').find('.filter.on').data('sort')
				});
			}.bind(this));
			
			//뷰티테스터 리뷰
			this._bestList = new AP.ReviewList( this._$target.find('.tester_review'), {
				onlineProdSn: this._defaultModel.onlineProdSn,
				prodReviewType: 'ExperienceGrp',
				offset : 0,
				limit : 6
			}).addListener( 'review-draw', function (e) {
				if( e.offset >= e.totalCnt ){this._$target.find('.btn_view_more').hide();}
				this.dispatch( 'change-height' );
			}.bind(this));
			
			//뷰티테스터 리뷰 더읽기
			this._$target.find(".btn_view_more").click(function(){
				this._bestList.load();
				$(this).parent().addClass("on");
				//$(this).parent().children('div').removeClass('ddd-truncated');
			});

			/*
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
			*/
		}

	});


	AP.reviewArea = new ReviewArea();
})( jQuery );