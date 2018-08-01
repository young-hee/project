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

			this._setSlide();
			this._setHeaderFixed();
		},

		/** =============== Public Methods =============== */

		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( model, memberMap ) {
			
			console.log( 'setDefaultData' );
			
			this._defaultModel = model;
			AP.previewArea.setDefaultData( this._defaultModel, memberMap );

			//상단 리뷰 클릭
			AP.previewArea.addListener( 'call-review', function () {
				this._$target.find( '.ui_tab' ).tabs( 'change', 1 );
			}.bind(this));

			this._orderLayer = new AP.Order( this._$target.find('.option_layer'), model, memberMap );

			this._setEvents();
			this._setArtistTalk( memberMap );
			this._setRecommendList();
			this._setTabs();
		},

		/** =============== Private Methods =============== */

		_setEvents: function () {
			//전성분/상세정보제공고시 보기
			this._$target.find( '.btn_detail_info_notice' ).on( 'click', function (e) {
				var data = AP.previewArea.getSelectedOption();

				if ( !data ) {
					data = this._defaultModel.products[0];
				}

				var modal = AP.modal.full({
						title: '전성분/상세정보제공고시 보기',
						contents: {
							templateKey: 'products.all-ingredients-modal',
							templateModel : {
								selectedData: data,
								productCount: this._defaultModel.productCount,
								products: this._defaultModel.products
							}
						}
					}),
					$modal = modal.getElement();

				modal.addListener( 'modal-before-close', function (e) {
					$modal.find( 'select' ).off();
				});

				$modal.find( 'select' ).on( 'change', function (e) {
					var prodSn = parseFloat( $(e.currentTarget).val() ),
						selectData = _.where( this._defaultModel.products, {prodSn: prodSn} )[0];

					$modal.find( '.result' ).html( selectData.disclosures[7].prodDisclosureInfo );
				}.bind(this));
			}.bind(this));

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
		},

		//slide 적용
		_setSlide: function () {
			this._$target.find( '.slide.goods_detail_banner' ).ixSlideMax();

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

		},

		//아티스트톡 설정
		_setArtistTalk: function ( memberMap ) {
			this._$target.find( '.btn_artist_talk' ).on( 'click', function (e) {
				var modal = AP.modal.full({
						title: 'Artist Talk',
						contents: {
							templateKey: 'common.artist-talk-modal',
							templateModel: {
								banner: ''
							}
						},
						containerClass: 'artist_talk'
					}),
					$btn = modal.getElement().find( '.btn_consultation' );

				modal.addListener( 'modal-before-close', function (e) {
					$btn.off( 'click' );
				});

				$btn.on( 'click', function (e) {
					AP.login().done( function () {
						var parms = 'CNTR_CD=1004';
						parms += ( '&CSTMID=' + memberMap.id );
						parms += ( '&CHCSTMID=' + memberMap.name );
						parms += ( '&CSTMNM=' + memberMap.cstmid );
						parms += ( '&RESIDNO1=' + memberMap.residno1 );
						parms += ( '&GEND_DV_CD=' + memberMap.gendDvCd );
						webChat( params );
					});
				});
			});
		}

	});

	AP.productDetail = new ProductDetail();
})( jQuery );