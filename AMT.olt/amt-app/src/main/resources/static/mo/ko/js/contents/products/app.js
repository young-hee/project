/**
 * 제품상세 페이지 영역 요소들 제어
 *
*/
;(function ( $ ) {
	'use strict';

	var ProductDetail = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );

			this._defaultModel = {};
			this._swiper = null;
			this._setSlide();
			//this._setHeaderFixed();
			this._header_bg();
			this._setPreviewSlide();
		},

		/** =============== Public Methods =============== */
		
		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( model, memberMap ) {
			this._defaultModel = model;

			AP.previewArea.setDefaultData( this._defaultModel, memberMap );
			
			this._orderLayer = new AP.Order( this._$target.find('.order_layer'), model, memberMap )
			.addListener( 'select-option', function (e) {
				this._changePreview( e.product );
			}.bind(this));
			this._setEvents();
			/*
			this._setRecommendList();
			this._setTabs();
			this._setVideoPlugin();
			*/
		},

		/** =============== Private Methods =============== */

		_setEvents: function () {
			
			$(window).scroll(function() {
				this._header_bg();
		 	}.bind(this));
			
			//옵션 선택 영역
			this._$target.find('#optionSelectBox, #optionSelectedBox').on('click', function(e){
				var modal = AP.modal.full({
					title: '옵션 선택',
					noneSystemAlert : true,
					contents: {
						templateKey: 'products.option-select',
						templateModel : {
							products: this._defaultModel.products
						}
					}
				}).addListener( 'modal-close', function (e) {
					if( e.closeType == 'select' ){
						var selectedObj = _.findWhere( this._defaultModel.products, {prodSn : e.data} );
						var $selectredWrap = this._$target.find('#optionSelectedBox');
						$selectredWrap.find('#selectedProdName').text( selectedObj.prodName );
						if( selectedObj.prodImages[0] ){
							$selectredWrap.find('img').attr('src', selectedObj.prodImages[0].imgUrl );
						}
						$selectredWrap.data('prod-sn', selectedObj.prodSn).show();
						this._$target.find('#optionSelectBox').hide();
						this._changePreview( selectedObj );
					}
				}.bind(this));
				
				var $modal = modal.getElement();
				if( this._$target.find('#optionSelectedBox').is(':visible') ){
					$modal.find('[data-prod-sn="'+ this._$target.find('#optionSelectedBox').data('prod-sn') +'"]').addClass('selected');
				}
				$modal.find('.option_select_list li').on('click', function(e){
					var $this = $(e.currentTarget);
					$this.parent().find('li').removeClass('selected');
					$this.addClass('selected');
					modal.close( $this.data('prod-sn'), 'select' );
				}.bind(this));
				
			}.bind(this));
			
			/*컬러칩 옵션 선택*/
			$('.color_option .color_chip input').change(function(e){
				var $this = $(e.currentTarget);
				var checked = $this.is(":checked");
				if(checked){
					$('.color_option .color_chip input').prop("checked", false);
					$('.color_option .color_chip input').prop("disabled", false);
					$this.prop("checked", true);
					$this.prop("disabled", true);
					
					if($this.next('label').hasClass('img')){
						var opt_name_img = $this.next('label').find('img').attr('alt');
						$this.closest('.color_option').find('.selected').text(opt_name_img);
					}else{
						var opt_name_span = $this.next('label').find('span').text();
						$this.closest('.color_option').find('.selected').text(opt_name_span);
					}
					
					var prodSn = $(e.currentTarget).parent().data( 'prod-sn' ),
						product = _.where( this._defaultModel.products, {prodSn: prodSn} )[0];
					
					this._changePreview( product );
				}
			}.bind(this));
			
			//주문변경 버튼 눌렀을때
			this._$target.find('.option_select_wrap button').click(function(){
				if($('.option_select_wrap .ui_select').hasClass('open')){
					$(this).closest('.option_layer').addClass('sub_open');
				} else {
					$(this).closest('.option_layer').removeClass('sub_open');
				}
			}.bind(this));
			
			//스페셜 기프트
			this._$target.find( '.special_gift .more' ).on( 'click', function (e) { 
				var modal = AP.modal.full({
					title: '스페셜 기프트',
					noneSystemAlert : true,
					containerClass : 'fixed_top',
					contents: {
						templateKey: 'products.special-gift',
						templateModel : {
							giftProds: this._defaultModel.onlineProdGift.giftProds
						}
					}
				});
			}.bind(this));
			
			//카드사 혜택정보
			this._$target.find( '#cardMoreView' ).on( 'click', function (e) { 
				var modal = AP.modal.full({
					title: '카드사 혜택정보',
					noneSystemAlert : true,
					containerClass : 'fixed_top card_installment',
					contents: {
						templateKey: 'products.card-benefit'
					}
				});
			}.bind(this));
			
			//배송
			this._$target.find( '#shipMoreView' ).on( 'click', function (e) { 
				var modal = AP.modal.full({
					title: '배송정보',
					noneSystemAlert : true,
					contents: '<div class="section list">' + this._defaultModel.shipPolicyInfo + '</div>'
				});
			}.bind(this));
			
			//공유하기
			this._$target.find( '.btn_share .ico_share' ).on( 'click', function (e) { 
				
			}.bind(this));
			
			//전성분
			this._$target.find( '.btn_ingredient' ).on( 'click', function (e) { 
				var data = AP.previewArea.getSelectedOption();

				if ( !data ) {
					data = this._defaultModel.products[0];
				}
				
				var disclosures = [];
				$.each(this._defaultModel.products, function(idx, prod){
					var temp = {
						 brandNm : prod.brandName
						,onlineProdName : this._defaultModel.onlineProdName
						,prodNm : prod.prodName
						,desc : _.findWhere( prod.disclosures, {disclosureItemCode: '1807'} ).prodDisclosureInfo
					};
					disclosures.push(temp);	
				}.bind(this));	
				var modal = AP.modal.full({
						title: '전성분확인',
						noneSystemAlert : true,
						containerClass : 'fixed_top',
						contents: {
							templateKey: 'products.ingredient-modal',
							templateModel : {
								disclosures: disclosures
							}
						}
					});
			}.bind(this));
			
			//상세정보제공고시 보기
			this._$target.find( '.btn_detail_info_notice' ).on( 'click', function (e) {
				var data = AP.previewArea.getSelectedOption();

				if ( !data ) {
					data = this._defaultModel.products[0];
				}

				var modal = AP.modal.full({
						title: '상세정보제공공시',
						noneSystemAlert : true,
						containerClass : 'fixed_top',
						contents: {
							templateKey: 'products.detail_info_notice',
							templateModel : {
								selectedData: data,
								onlineProd: this._defaultModel,
								products: this._defaultModel.products
							}
						}
					});
			}.bind(this));
			/*
			//배송/교환/반품 안내
			this._$target.find( '.btn_shipping_returns' ).on( 'click', function (e) {
				AP.modal.full({
					title: '배송/교환/반품 안내',
					contents: '<div class="panel order_notice">' + this._defaultModel.shipPolicyInfo + '</div>'
				});
			}.bind(this));

			//상세정보 더보기
			this._$target.find( '.btn_goods_more' ).one('click', function (e) {
				this._$target.find( '.more_wrap' ).addClass( 'on' );
				$( e.currentTarget ).remove();
			}.bind(this));
			*/
		},
		
		// 옵션을 변경하였을 경우 썸네일 이미지 변경
		_changePreview: function ( product ) {
			var html = AP.common.getTemplate( 'products.option-slide-list', product.prodImages ),
				$wrap = this._$target.find( '.swiper-wrapper' ),
				$slide = this._$target.find( '.swiper-pagination' );
			
			this._orderLayer.selectOption( product );
			
			//$wrap.find( '.preview_thumbs button' ).off( 'click' );
			//$slide.find( '.youtube_video' ).video( 'clear' );
			//$slide.off( 'ixSlideMax:change' ).ixSlideMax( 'clear' );
			$wrap.html( html );
			$slide.html('');
			this._setPreviewSlide();
			
			//좋아요 상태갑 변경
			this._changeLikeStatus( product );
		},
		
		//좋아요 상태갑 변경
		_changeLikeStatus : function( product ){
			var $likeBtn = this._$target.find('#likeBtn');
			if( product.shoppingMarkYn == 'Y' ){
				$likeBtn.hasClass('on') ? '' : $likeBtn.addClass('on');
				$likeBtn.find('i').hasClass('on') ? '' : $likeBtn.find('i').addClass('on');
			} else {
				$likeBtn.removeClass('on');
				$likeBtn.find('i').removeClass('on');
			}
			$likeBtn.find('.num').text( product.shoppingMarkCount );
			
			if( product.shoppingMarkCount == 0 ){
				$likeBtn.hasClass('none_like') ? '' : $likeBtn.addClass('none_like');
				$likeBtn.find('.num').hide();
			}
		},
		
		_setPreviewSlide : function() {
			/*상단 비주얼 슬라이드*/
			if( this._swiper != null ){
				this._swiper.destroy();
			}
			this._swiper = new Swiper('.swiper-container', {
				pagination: {
					el: '.swiper-pagination',
					type: 'progressbar'
				},
				autoplay: {
					delay: 4000,
					disableOnInteraction: false
				}
			});
			
			/*슬라이드 사진 1개일경우 progressbar 숨김*/
			$('.product_visual').each(function(e){
				var $this = $(e.currentTarget);
				var slide_length = $('.swiper-wrapper .swiper-slide').length;
				if(slide_length <= 1){
					$this.addClass('none').find('.swiper-pagination-progressbar').hide();
					this._swiper.destroy();
				}else{
					$this.removeClass('none').find('.swiper-pagination-progressbar').show();
				}
			}.bind(this));
		},
		
		//video plugin setting 
		_setVideoPlugin: function() {
			 
			var imageArray = ''; 
			var data = ''; 
			data = Object(data);
			
			imageArray = this._defaultModel.onlineProdImages;			
			
			if(imageArray.length === 0 ){
				return; 
			}
			
			$.each(imageArray , function(index, imageInfo) {
 
				if(imageInfo.videoYn === 'Y') {
					data = imageInfo;
				}
			});
							
			if(data.imgUrl === '' || data.videoUrl === ''){
				return; 
			}
				
			var html = ''; 
			html = AP.common.getTemplate( 'products.thumbnail-video-info', data );
		 
			var ixItemList = '';
				ixItemList = this._$target.find( '.ix-list-item' );
			var videoIndex = '';
				videoIndex = String((Number(data.imgNo)-1));
			
			AP.common.youtubeApiReady.done(function () {
			 
				$.each(ixItemList, function(index, object){
					 
					if(object.attributes['data-origin-idx'].value === String(videoIndex)){
				 
						$(this).append(html);
						$(this).find('.youtube_video' ).video(); // 초기화 
					}
					
				});
		
			});
			
			
		},
		//slide 적용
		_setSlide: function () {
			this._$target.find( '.slide' ).ixSlideMax();

			AP.responsiveWidth.addListener( 'resize', function (e) {
				this._$target.find( '.slide' ).ixSlideMax( 'resize' );
			}.bind(this));
		},

		//header fixed 설정
		_setHeaderFixed: function () {
			var $header = $( '#header .page_title_area' ),
				$tabArea = this._$target.find( '.product_detail_tab_area' );

			if ( !$tabArea.length ) return;

			$( window ).on( 'load scroll header-fixed', function (e) {
				var scrollY = $( e.currentTarget ).scrollTop(),
					headerH = $header.outerHeight(),
					tabY = $tabArea.offset().top;

				if ( scrollY >= 0 && scrollY < tabY - headerH ) {
					$header.addClass( 'fixed' ).css({
						position: '',
						top: ''
					});
				} else {
					$header.removeClass( 'fixed' ).css({
						position: 'absolute',
						top: ( tabY - headerH ) + 'px'
					});
				}
			}.bind(this));

			$( window ).trigger( 'header-fixed' );
		},
		
		_header_bg : function (){
			var winP = $(window).scrollTop();
			if(winP > 0){
				$('#header').addClass('scroll');
			}else{
				$('#header').removeClass('scroll');
			}
		},

		//tab fixed 설정
		_setTabs: function () {
			var $tabArea = this._$target.find( '.ui_tab' ),
				$tabs = $tabArea.find( '> .tab_menu' );

			if ( $tabArea.length ) {
				$tabArea.on( 'tabs-change', function (e) {
					$( window ).scrollTop( $tabArea.offset().top );

					if ( e.index === 1 ) {
						AP.reviewArea.setDefault( this._defaultModel );
					}
				}.bind(this));

				$( window ).on( 'load scroll tabs-fixed', function (e) {
					var scrollY = $( e.currentTarget ).scrollTop(),
						tabY = $tabArea.offset().top;

					if ( scrollY > tabY ) {
						$tabs.addClass( 'fixed' );
					} else {
						$tabs.removeClass( 'fixed' );
					}
				}.bind(this));

				$( window ).trigger( 'tabs-fixed' );

				//?review=true 로 들어오면 review tab 활성화
				if ( $B.utils.urlParam('review') ) {
					$tabArea.tabs( 'change', 1 );
				}
			}
		},

		//다른 고객들이 많이 찾은 상품
		_setRecommendList: function () {
			var $recommendArea = this._$target.find( '.recommend_items' ),
				prodSnList = _.pluck( this._defaultModel.products, 'prodSn' );

			AP.api.boughtTogether( null, {
				prodSnList : prodSnList,
				prodSort: 'Bestselling',
				offset: 0,
				limit: 10
			}).done( function ( result ) {
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'products.recommend-product-list', data );

				if ( data.totalCount ) {
					$recommendArea.find( '.slide' ).html( html ).ixSlideMax();
				} else {
					$recommendArea.hide();
				}
			}.bind(this)).fail( function ( xhr ) {
				$recommendArea.hide();
			}.bind(this));

		}
	});

	AP.productDetail = new ProductDetail();
})( jQuery );