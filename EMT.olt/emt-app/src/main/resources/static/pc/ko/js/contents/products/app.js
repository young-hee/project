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
			this._setColorChips();
			this._setCompareMakeup();
			this._setHeaderFixed();
			this._setTabs();
			this._setIngredients();
			this._setRecommendList();

			//핫딜 시간 설정
			if ( this._defaultModel.prodTypeCode === 'SpPriceSale' ) {
				this._$target.find( '.hot_deal .ui_remain_timer' ).remainTimer({
					startTime: AP.common.date(),
					finishTime: this._defaultModel.saleEndDt
				});
			}
		},

		/** =============== Private Methods =============== */

		_setEvents: function ( memberMap ) {
			//상단 order
			this._topOrder = new AP.Order( this._$target.find('.prd_info_wrap .prd_total'), this._defaultModel, {
					selectBoxThumbnail: true
				})
				.addListener( 'add-item', function (e) {
					this._sideOrder.addItem( e.product );
				}.bind(this))
				.addListener( 'remove-item', function (e) {
					this._sideOrder.removeItem( e.prodSn );
				}.bind(this))
				.addListener( 'spinner-change', function (e) {
					this._sideOrder.changeSpinner( e.prodSn, e.value );
				}.bind(this));

			//side order
			this._sideOrder = new AP.Order( this._$target.find('.order_layer'), this._defaultModel, {
					layerFixed: true
				})
				.addListener( 'add-item', function (e) {
					this._topOrder.addItem( e.product );
				}.bind(this))
				.addListener( 'remove-item', function (e) {
					this._topOrder.removeItem( e.prodSn );
				}.bind(this))
				.addListener( 'spinner-change', function (e) {
					this._topOrder.changeSpinner( e.prodSn, e.value );
				}.bind(this));

			//언제 들어와? 알림 신청
			this._$target.find( '.btn_restock_notify_me' ).on( 'click', function (e) {
				AP.login().done(function () {
					new AP.RestockNotify().open( this._defaultModel, memberMap );
				}.bind(this));
			}.bind(this));
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
						AP.reviewArea.setDefault( this._defaultModel );
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

		_setColorChips: function () {
			var $colorChips = this._$target.find( '.color_chips_area li' );

			//color chips filtering
			this._$target.find( '.color_group_area :radio' ).on( 'change', function (e) {
				var colorCode = this._$target.find( '.color_group_area :radio:checked' ).val();
				
				if ( colorCode === 'all' ) {
					$colorChips.show();
				} else {
					$colorChips.hide();
					$colorChips.filter( '[data-group~="' + colorCode + '"]' ).show();
				}
			}.bind(this));

			$colorChips.find( 'a' ).on( 'click', function (e) {
				e.preventDefault();
				var prodSn = $(e.currentTarget).parent().data( 'prod-sn' ),
					product = _.where( this._defaultModel.products, {prodSn: prodSn} )[0];

				this._changeFlag( product );
				this._changeColorChpe( product );
				this._changePreview( product );
			}.bind(this));
		},

		_changeColorChpe: function ( product ) {
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

			$slide.html( html );
			this._setPreviewSlide();
		},

		//상단 제품 슬라이드 적용
		_setPreviewSlide: function () {
			var $wrap = this._$target.find( '.prd_img_wrap' ),
				$slide = $wrap.find( '.slide' ),
				$thumbBtns = $wrap.find( '.preview_thumbs button' ),
				$videos = $wrap.find( '.youtube_video' );

			$thumbBtns.on( 'click', function (e) {
				var idx = $( e.currentTarget ).index();
				$slide.ixSlideMax( 'changeIndex', idx );
			});

			$slide.ixSlideMax().on( 'ixSlideMax:change', function (e) {
				$thumbBtns.removeClass( 'on' ).eq( e.currentIndex ).addClass( 'on' );
				$videos.video( 'stop' );
			});

			$videos.video();
		},

		_setCompareMakeup: function () {
			this._$target.find( '.btn_compare_makeup' ).on( 'click', function (e) {
				new AP.CompareMakeup().open( this._defaultModel.products );
			}.bind(this));
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

		},

	});

	AP.productDetail = new ProductDetail();
})( jQuery );