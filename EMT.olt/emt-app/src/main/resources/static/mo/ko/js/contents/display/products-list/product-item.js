/**
 * ProductItem
 *
*/

;(function ( $ ) {
	'use strict';

	var ProductItem = $B.Class.extend({
		initialize: function ( $target, sortOption, data ) {
			this._$target = $target;

			this._sortOption = sortOption;

			this._data = data;
			this._prodSn = null;

			this._$target.addClass( 'item-apply' );
			for ( var i = 1; i <= 3; ++i ) {
				if ( this._$target.closest( '.item_list' ).hasClass( 'type' + i )) {
					this._viewType = 'type' + i;
				}
			}

			this._setEvent();
			this._setRepImage();
			this._setColorChip();
			this._toggleItemView( this._viewType );
			this._setRemainTimer();
			this._setOrderQty();
			this._setSelectOption();
		},

		/** =============== Public Methods ================ */

		/** =============== Private Methods =============== */
		_setEvent: function () {
			if ( this._sortOption ) {
				this._sortOption.addListener( 'change-view', function (e) {
					this._toggleItemView( e.view );
				}.bind( this ));
			}

			// 장바구니 담기
			this._$target.find( '.btns button' ).on( 'click', function () {
				
				if(this._$target.find('.item_images div').hasClass('item_state out_of_stock')){
					AP.modal.alert( AP.message.CART_OUT_OF_STOCK_PRODUCT );
					return;
				}
				if ( this._data.displayMenuId == 'hotdeal' || this._data.displayMenuId == 'color_collection_shop' ) {
					// 핫딜, 컬러컬렉션샵 - 단위상품일때
					this._prodSn = this._data.selectedProdSn;

				} else {
					// 온라인상품일때

					if ( this._$target.find( '.item_option' ).length > 0 ) {
						if ( !this._prodSn ) {
							AP.modal.alert( AP.message.NONE_SELECTED_PRODUCT );
							return;
						}
					} else {
						// 옵션 1개일때
						this._prodSn = this._data.products[0].prodSn;
					}
				}

				if ( AP.LOGIN_USER ) {
					this._addCart();
				} else {
					this._noneMemberOrderInfo( this._data.products );
				}
			}.bind( this ));
		},

		// 대표이미지 설정
		_setRepImage: function () {
			var repImg = '';
			if ( this._data.prodListUnitCode == 'OnlineProd' ) {
				if ( this._data.repImgNo == 1 ) {
					return;
				}
				repImg = this._data.onlineProdImages[this._data.repImgNo - 1];
			} else {
				if ( this._data.products[0].repImgNo == 1 ) {
					return;
				}
				repImg = this._data.products[0].prodImages[this._data.products[0].repImgNo - 1];
			}
			this._$target.find( '.first_img img' ).attr( 'data-src', repImg.imgUrl );
		},

		_setColorChip: function () {
			if ( this._$target.find( '.color_chips' ).length > 0 ) {
				var $moreBtn = this._$target.find( '.color_chips > div > ul li.btn_more' ),
					$colorChip = this._$target.find( '.color_chips > div > ul li:not(.btn_more)' ),
					colorChips = this._$target.find( '.color_chips' ).colorChips();

				$colorChip.each(function ( index ) {
					if ( index >= 5 ) {
						$( this ).hide();
					}
				});

				if ( $colorChip.length < 6 ) {

					// 컬러칩 5개 이하일때
					$moreBtn.remove();
					this._$target.find( '.option_close' ).remove();
					this._$target.find( '.color_group' ).remove();
					if ( this._$target.find( '.color_chips > div > ul li' ).length <= 1 ) {

						// 컬러칩 1개일때
						this._$target.find( '.item_option' ).remove();
					}
				} else {
					var moreCount = $colorChip.length - 5;
					$moreBtn.find( 'span' ).text( '+ ' + moreCount );
				}

				// 컬러칩 선택시 옵션명, 슬라이드 변경
				colorChips.on( 'color-chips-change', function(e) {
					var selectedData = this._data.products[e.index];
					this._prodSn = selectedData.prodSn;
					this._setSlide( selectedData );
					this._setOptionName( selectedData );

				}.bind( this ));
			}
		},

		_setSlide: function ( data ) {
			var html = AP.common.getTemplate( 'display.products-list.item-slide', data );
			this._$target.find( '.goods_slide' ).ixSlideMax( 'clear' );
			this._$target.find( '.goods_slide' ).html( html );
			this._$target.find( '.goods_slide' ).ixSlideMax();
			AP.lazyLoad.add( this._$target.find( 'img.lazy_load' )).updated();
		},

		_setOptionName: function ( data ) {
			this._$target.find( '.option_name' ).show();
			for ( var i = 0; i < data.flags.length; ++i ) {
				if ( data.flags[i] == 'icon_reco_new' ) {
					this._$target.find( '.flag_new' ).show();
				}
			}
			if ( data.onlineProdName ) {
				this._$target.find( '.option_name span.flag_name' ).empty();
			} else {
				this._$target.find( '.option_name span.flag_name' ).text( data.prodName );
			}
		},

		_toggleItemView: function ( type ) {
			this._viewType = type;
			if ( type == 'type1' ) {
				this._$target.find( '.first_img' ).hide();
				this._$target.find( '.goods_slide' ).show().ixSlideMax();

			} else if ( type == 'type2' || type == 'type3' ) {	// type3: 컬러콜렉션
				this._$target.find( '.first_img' ).show();
				this._$target.find( '.goods_slide' ).hide().ixSlideMax( 'clear' );
			}
			AP.lazyLoad.add( this._$target.find( 'img.lazy_load' )).updated();
		},

		_addCart: function ( type ) {
			var cartProdExPostList = [{
				prodSn: this._prodSn,
				cartProdQty: 1,
				storePickupYn: 'N',
				integrationMembershipExchYn: 'N',
				activityPointExchYn: 'N'
			}];

			//장바구니 저장 api
			AP.api.addCartProd( null, JSON.stringify({ cartProdExPostList: cartProdExPostList }) ).done( function ( result ) {
				AP.header.resetCartCount();
				if ( type == 'login' ) {
					location.href = AP.path.CART + '?isRequiredLogin=true';
				} else {
					AP.modal.confirm( AP.message.ADDED_CART_TO_CART_PAGE ).addListener( 'modal-close', function (e) {
						if ( e.closeType === 'confirm' ) {
							location.href = AP.path.CART;
						}
					}.bind(this));
				}

			}).fail( function ( xhr ) {
				if ( xhr.errorMessage ) {
					AP.modal.alert( xhr.errorMessage );
				}
			});
		},

		_noneMemberOrderInfo: function ( products ) {
			var product = null;

			$.each( products, function ( key, value ) {
				if ( this._prodSn == value.prodSn ) {
					product = value;
				}
			}.bind( this ));

			var modal = AP.modal.info({
				title: '비회원 주문 안내',
				contents: {
					templateKey: 'products.none-member-order-info-modal'
				}
			}),
			$modal = modal.getElement();

			modal.addListener( 'modal-before-close', function (e) {
				$modal.find( '.btn_none_member_order, .btn_login' ).off( 'click' );
			});

			$modal.find( '.btn_none_member_order, .btn_login' ).on( 'click', function (e) {
				if ( $(e.currentTarget).hasClass('btn_login') ) {
					// 로그인
					this._addCart( 'login' );
				} else {
					// 비회원 장바구니 담기
					this._addCart();
				}
			}.bind(this));
		},

		_setOrderQty: function () {
			if ( this._data.displayMenuId !== 'hotdeal' ) return;

			var product = null,
				txt = ' 구매',
				saleCount = 0;

			$.each( this._data.products, function ( index, value ) {
				if ( this._data.selectedProdSn === value.prodSn ) {
					product = value;
				}
			}.bind( this ));

			if ( product ) {
				if ( this._$target.closest( '.icon_type_sp_today' ).length > 0 ) {
					if ( product.orderedQty ) {
						saleCount += product.orderedQty;
					}
				} else if ( this._$target.closest( '.icon_type_sp_qty' ).length > 0 ) {
					txt = '개 남음';
					if ( product.salePossibleQty ) {
						saleCount += product.salePossibleQty;
					}
				}
				this._$target.find( '.sale_count' ).text( $B.string.numberFormat( saleCount ) + txt );
			}
		},

		_setRemainTimer: function () {
			// 핫딜

			var $remainTimer = this._$target.siblings( '.item_state' ).find( '.ui_remain_timer' );
			if ( $remainTimer.length < 1 ) return;

			$remainTimer.remainTimer({
				startTime: AP.common.date(),
				finishTime: this._data.saleEndDt
			});
		},

		_setSelectOption: function () {
			if ( this._$target.find( '.option_wrap' ).length < 1 ) return;

			if ( this._data.products.length <= 1 ) {
				this._$target.find( '.item_option' ).remove();
				return;
			}

			this._$target.find( '.option_wrap select' ).on( 'change', function (e) {
				var value = $( e.target ).val();
				this._prodSn = value;

				if ( value ) {
					for ( var i = 0; i < this._data.products.length; ++i ) {
						if ( value == this._data.products[i].prodSn ) {
							var selectedData = this._data.products[i];
						}
					}
				} else {
					var selectedData = this._data;
				}

				this._setSlide( selectedData );
			}.bind( this ));
		}
	});

	AP.ProductItem = ProductItem;
})( jQuery );