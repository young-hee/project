/**
 * 제품상세 : 페이지 영역 요소들 제어
*/
;(function ( $ ) {
	'use strict';

	var ProductDetail = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );
			this._defaultModel = [];
		},

		/** =============== Public Methods =============== */

		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( model, memberMap ) {
			this._defaultModel = model;
			
			this._setEvents( memberMap );
			this._setPreviewSlide();
			this._setHeaderFixed();
			this._setTabs();
			/*
			this._setIngredients();
			this._setRecommendList();
			
			this._setVideoPlugin(); 
			 */
			this.ingredientModalTitle = '전성분 확인하기';
			this.ingredientModalPath = 'products.ingredient-modal';
		},

		/** =============== Private Methods =============== */

		_setEvents: function ( memberMap ) {
			
			//상단 order
			this._topOrder = new AP.Order( this._$target.find('.product_info'), this._defaultModel, {
					 selectBoxThumbnail: true
				})
				.addListener( 'add-item', function (e) {
					this._sideOrder.addItem( e.product );
					this._changePreview( e.product );
				}.bind(this))
				.addListener( 'remove-item', function (e) {
					this._sideOrder.removeItem( e.prodSn );
				}.bind(this))
				.addListener( 'spinner-change', function (e) {
					this._sideOrder.changeSpinner( e.prodSn, e.value );
				}.bind(this));
			
			//side order
			this._sideOrder = new AP.Order( this._$target.find('.order_layer'), this._defaultModel, {
					 selectBoxThumbnail: true
					,layerFixed: true
				})
				.addListener( 'add-item', function (e) {
					this._topOrder.addItem( e.product );
					this._changePreview( e.product );
				}.bind(this))
				.addListener( 'remove-item', function (e) {
					this._topOrder.removeItem( e.prodSn );
				}.bind(this))
				.addListener( 'spinner-change', function (e) {
					this._topOrder.changeSpinner( e.prodSn, e.value );
				}.bind(this));

			//전성분 확인하기
			this._$target.find( '.btn_ingredient' ).on( 'click', function (e) {
				
				var modal = AP.modal.info({
					title: '리뷰 작성하기',
					contents: {
						templateKey: 'products.ingredient-modal'
					},
					sizeType: 'L',
					containerClass: 'btn_ingredient'
				});
				
				var $modal = modal.getElement();
				$modal.find('.closePop').on('click', function(){
					$modal.find('.layer_close').click()
				});
				
			}.bind(this));
			
			var $colorChips = this._$target.find( '.color_chips_area li' );
			if( $colorChips.length > 0 ){
				this._topOrder.invisibleSelectOption();
				this._sideOrder.invisibleSelectOption();
			}

			$colorChips.find( 'a' ).on( 'click', function (e) {
				$colorChips.find( 'a' ).removeClass('on');
				e.preventDefault();
				var prodSn = $(e.currentTarget).parent().data( 'prod-sn' ),
					product = _.where( this._defaultModel.products, {prodSn: prodSn} )[0];
				
				this._topOrder._optionsSelectBox.dispatch( 'select-option', {product : product} );
				$colorChips.filter('[data-prod-sn='+prodSn+']').find('a').addClass('on');
				
				this._changePreview( product );
			}.bind(this)).bind('mouseenter',function (e){
				var $this = $(e.currentTarget);
				var $colorName = this._$target.find( '.color_name' );
				var chip_name = $this.attr('title');
				if ($this.parents("li").hasClass("soldPD")) {
					$colorName.text(chip_name);
					$colorName.addClass("soldPD");
				} else{
					$colorName.text(chip_name);
					$colorName.removeClass("soldPD");
				}
			}.bind(this));
			
			//카드사 혜택 정보 더보기 버튼
			this._$target.find('#cardBenefitMoreBtn').on('click', function(e){
				var modal = AP.modal.info({
					title : '<img alt="카드혜택" src="/pc/ko/images/product/img_card_benefit.jpg">',
					contents: {
						templateKey: 'products.layer-card-benefit'
					},
					sizeType : 'L'
				});
				
				var $modal = modal.getElement();
				$modal.find('.layer_title').removeClass();
				$modal.find('.layer_wrap').addClass('card_benefit');
				modal.resetPosition();
				$modal.find('.closePop').on('click', function(){
					$modal.find('.layer_wrap').removeClass('card_benefit');
					$modal.find('.layer_close').click()
				});
			}.bind(this));
			
			//좋아요
			this._$target.find( '#likeBtn').on( 'click', function (e) {
				var $this = $(e.currentTarget);
				if( $this.find('i').hasClass('on') ){
					return false;
				}
				$this.find('i').addClass( 'on' );
			}.bind(this));
			
			// 기프트카드 Toggle
			this._$target.find(".gift_card button").bind('click',function (e){
				var $this = $(e.currentTarget);
				$this.toggleClass("on");
				if ( $this.hasClass("on") ) {
					$(".layer_tooltip").show();
					$this.children("span").text("닫기");
				} else{
					$(".layer_tooltip").hide();
					$this.children("span").text("자세히보기");
				}
			});
			
			/*
			//언제 들어와? 알림 신청
			this._$target.find( '.btn_restock_notify_me' ).on( 'click', function (e) {
				AP.login().done(function () {
					new AP.RestockNotify().open( this._defaultModel, memberMap );
				}.bind(this));
			}.bind(this));
			
			//고시정보 상품 수정
			this._$target.find( 'select[name=ingredients]' ).on( 'change', function (e) {
				this._$target.find('.disclosure').hide();
				this._$target.find('[data-prodSn='+$(e.currentTarget).val()+']').show();
			}.bind(this));
			
			//best review 더보기된 상태로 height 고정되는 현상 수정
			this._$target.find( '.best_review' ).find('.ix-btn-next, .ix-btn-prev').on( 'click', function(e) {
				//alert(this._$target.find( '.review_detail' ).hasClass('on'));
				//this.dispatch( 'review-draw' );
				if( this._$target.find( '.review_detail' ).hasClass('on') ){
					this._$target.find( '.review_detail' ).siblings('.reduce').show();
					this._$target.find( '.review_detail' ).siblings('.origin').slideUp('slow');
					this._$target.find( '.review_detail' ).text('더보기 ∨').toggleClass('on off');
				}

			}.bind(this));
			*/
			
		},

		//header fixed 설정
		_setHeaderFixed: function () {
			var $gnbArea = $( '#header .gnb_area' ),
				$tabArea = this._$target.find( '.prd_detail_tap' );

			if ( !$tabArea.length ) return;

			AP.header.disableFixed();

			$( window ).on( 'load scroll header-fixed', function (e) {
				var scrollY = $( e.currentTarget ).scrollTop(),
					gnbH = $gnbArea.outerHeight(),
					startY = AP.header.getHeight() - gnbH,
					tabY = $tabArea.offset().top;

				if ( scrollY < startY ) {
					AP.header.setFixed( false );
				} else if ( scrollY < tabY - gnbH ) {
					AP.header.setFixed( true );
				} else {
					AP.header.closeCategory();
					AP.header.closeSearchForm();
					AP.header.setFixed( true, 'absolute', (tabY - gnbH) + 'px' );
				}
			}.bind(this));

			$( window ).trigger( 'header-fixed' );
		},

		//tab fixed 설정
		_setTabs: function () {
			
			var $tabArea = this._$target.find( '.ui_tab' ),
				$tabs = $tabArea.find( '> .tab_menu' );

			if ( $tabArea.length ) {
				$tabArea.on( 'tabs-change', function (e) {
					$( window ).scrollTop( $tabArea.offset().top );

					if ( e.index === 1 ) {
						//AP.reviewArea.setDefault( this._defaultModel );
					}

					this._sideOrder.resetPosition( true );
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
				
				AP.reviewArea.addListener( 'change-height', function (e) {
					this._sideOrder.resetPosition( true );
				}.bind(this));
				
			}
		},

		_changeColorChip: function ( product ) {
			var isNew = _.some( product.flags, function (flag) {
					return flag.prodFlagCode === 'icon_reco_new';
				});

			this._$target.find( '.color_chips_area li[data-prod-sn="' + product.prodSn + '"]' ).addClass( 'on' ).siblings( 'li' ).removeClass( 'on' );
			this._$target.find( '.prd_info_wrap .prd_opt_name .opt_text' ).show().html( (isNew? '<strong class="new_text">NEW</strong>&nbsp;' : '') + '<span>' + product.prodName + '</span>' );
		},

		_changeFlag: function ( product ) {
			var html = AP.common.getTemplate( 'products.flag-list', product.flags );
			this._$target.find( '.prd_info_wrap .prd_category_wrap' ).html( html );
		},

		_changePreview: function ( product ) {
			var html = AP.common.getTemplate( 'products.option-slide-list', product ),
				$wrap = this._$target.find( '.prd_img_wrap' ),
				$slide = $wrap.find( '.slide' );

			$wrap.find( '.preview_thumbs button' ).off( 'click' );
			$slide.find( '.youtube_video' ).video( 'clear' );
			$slide.off( 'ixSlideMax:change' ).ixSlideMax( 'clear' );

			$wrap.html( html );
			AP.lazyLoad.add( $wrap.find('img.lazy_load') );
			this._setPreviewSlide();
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

		//상단 제품 슬라이드 적용
		_setPreviewSlide: function () {
			var $wrap = this._$target.find( '.prd_img_wrap' ),
				$slide = $wrap.find( '.slide' ),
				$thumbBtns = $wrap.find( '.preview_thumbs' ),
				$videos = $wrap.find( '.youtube_video' );

			$thumbBtns.on( 'click', function (e) {
				var idx = $( e.currentTarget ).index();
				$thumbBtns.removeClass('active')
				$( e.currentTarget ).addClass('active');
				$slide.ixSlideMax( 'changeIndex', idx );
			});

			$slide.ixSlideMax().on( 'ixSlideMax:change', function (e) {
				$thumbBtns.removeClass( 'on' ).eq( e.currentIndex ).addClass( 'on' );
				$videos.video( 'stop' );
			});

			$videos.video();
		},

		//전성분
		_setIngredients: function () {
			this._$target.find( 'select[name="ingredients"]' ).on( 'change', function (e) {
				//e.value = prodSn
				var product = _.where( this._defaultModel.products, {prodSn: e.value} )[0];

				if ( product && product.disclosures && product.disclosures.length > 7 ) {
					this._$target.find( '.ingredients7_result' ).text( product.disclosures[7].prodDisclosureInfo );
				}
			}.bind(this));
		},

		//다른 고객들이 많이 찾은 상품
		_setRecommendList: function () {
			var $recommendArea = this._$target.find( '.recommend_items' ),
				prodSnList = _.pluck( this._defaultModel.products, 'prodSn' );

			AP.api.boughtTogether( null, {
				prodSnList : prodSnList,
				prodSort: 'Bestselling',
				offset: 0,
				limit: 5
			}).done( function ( result ) {
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'products.recommend-product-list', data );

				if ( data.totalCount ) {
					$recommendArea.find( '.recommend_list' ).html( html );
					AP.lazyLoad.add( $recommendArea.find('.recommend_list img.lazy_load') );
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