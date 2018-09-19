/**
 * 리뷰 상세
*/
;(function ( $ ) {
	'use strict';

	var ReviewDetail = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );
			
		},

		/** =============== Public Methods =============== */
		
		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function (prodReviewSn) {
			this._prodReviewSn = prodReviewSn;
			this._setEvents();
			
			//상단 슬라이더
			var swiper01 = new Swiper('.premium_pg_sec .swiper-container', {
				centeredSlides: false,
				slidesPerView: 'auto',
				touchRatio: 0.2,
				slideToClickedSlide: true,
				loop: false,
				freeMode: true
			}).on('click', function(e){
				this.$wrapperEl.find('a').removeClass('on')
				$(this.clickedSlide).find('a').addClass('on');
				swiper02.slideTo(this.clickedIndex);
			});
			
			//하단 메인 슬라이더
			var swiper02 = new Swiper('.pre_swiper_sec .swiper-container', {
				lazy: true,
				slidesPerView : 1,
				initialSlide:0,
				centeredSlides:true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			}).on('slideChange', function(e){
				swiper01.slideTo(this.activeIndex);
				swiper01.$wrapperEl.find('a').removeClass('on');
				swiper01.$wrapperEl.find('a')[this.activeIndex].className = 'on';
			});
		},
		
		/** =============== Private Methods =============== */

		_setEvents: function () {
			//리뷰 더읽기 버튼
			this._$target.find('.read_more').click(function(){
				this._$target.find(".review_list_sec").addClass("open");
			}.bind(this));
			
			//리뷰 닫기(더읽기) 버튼
			this._$target.find('.read_more_close').click(function(){
				this._$target.find(".review_list_sec").removeClass("open");
			}.bind(this));
			
			// 이미지를 확대
			var sj_lpop_timer;
			if ($(".img_pop_txt01").css('display') === 'none') {
				$(".img_pop_txt01").fadeIn('fast');
				setTimeout(
					function(){
						sj_lpop_timer = $(".img_pop_txt01").stop(true,true).fadeOut('fast');
					},1500);
			} else {
				$(".img_pop_txt01").hide();
				$(".img_pop_txt01").fadeIn('fast');
				clearTimeout(sj_lpop_timer);
				setTimeout(
					function(){
						sj_lpop_timer = $(".img_pop_txt01").stop(true,true).fadeOut('fast');
					},1500);
			}
			
			$('.writer_info01').click(function(){
				if($('.review_list_sec.pre').hasClass('active')){
					$('.review_list_sec.pre').removeClass('active');
				}else{
					$('.review_list_sec.pre').removeClass('active');
					$('.review_list_sec.pre').addClass('active');
				}
			})
			
			//도움이되요
			this._$target.find('.btn_good').off('click').on('click', function(e){
				if( AP.LOGIN_USER ){
					var $this = $(e.currentTarget);
					var recommendCnt = Number($this.find('.num').text());
					if( $this.hasClass('on') ){
						// 상품평 추천 삭제
						AP.api.removeReviewRecommend({}, {
							prodReviewSn : $this.data('review-sn')
						}).done(function(){
							$this.removeClass('on');
							
							$this.find('.num').text( recommendCnt - 1 )
							//추천수가 없을 경우 화면에서 감춤
							if( $this.find('.num').text() == 0 ){
								$this.find('.num').hide();
							}
							
						}.bind(this));
					} else {
						// 상품평 추천
						AP.api.reviewRecommend({}, {
							prodReviewSn : $this.data('review-sn')
						}).done(function(){
							$this.addClass('on');
							
							$this.find('.num').text( recommendCnt + 1 )
							//추천수가 없을 경우 화면에서 감춤
							if( $this.find('.num').text() > 0 ){
								$this.find('.num').show();
							}
							
						}.bind(this));
					}
				} else {
					AP.login.go();
				}
			}.bind(this));
			
			//신고하기
			this._$target.find('.btn_report').off('click').on('click', function(e){
				var $cur = $(e.currentTarget);
				var prodReviewSn = $cur.data('review-sn');
				if( AP.LOGIN_USER ){
					var reportModal = new AP.Report({
						review : {
							 prodReviewSn : this._prodReviewSn
							,memberId : this._$target.find('#memberId').text()
							,prodReviewBodyText : this._$target.find('#reviewContent').text()
						}
					}).addListener( 'modal-close', function (e) { 
						if( e.data == 'report' ){
							$cur.addClass('on');
						}
					}.bind(this)); 
					reportModal.open();
				} else {
					AP.login.go();
				}
			}.bind(this));
		}
	});

	AP.reviewDetail = new ReviewDetail();
})( jQuery );