/**
 * Product Item
 *
*/

;(function ( $ ) {
	'use strict';

	var ProductItem = $B.Class.extend({
		initialize: function ( $target, data ) {
			this._$target = $target;

			this._colorChip = new AP.ColorChip( this._$target.find( '.color_chips' ), data );

			this._$target.addClass( 'item-apply' );

			this._data = data;
			this._prodSn = null;

			this._setPlugin();
			this._setEvent();
			this._setRepImage();
			this._setSlide();
			this._setRemainTimer();
			this._setOrderQty();
			this._setSelectOption();

			if ( !data.linePromoDesc && !data.lineDesc && this._$target.find( '.s_title em' ).text().length == 0) {
				this._$target.find( '.s_title' ).remove();
			}
		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods =============== */
		_setPlugin: function () {
			// 상품옵션
			if ( this._$target.find( '.select_wrap' ).length > 0 ) {
				this._$target.find( '.select_wrap select' ).selectBox();
			}
		},

		_setEvent: function () {

			// 컬러 선택시 옵션명, 슬라이드 변경
			this._colorChip.addListener( 'change-color-chip', function (e) {
				this._prodSn = e.data.prodSn;
				this._setSlide( e.data );
				this._setOptionName( e.data );
			}.bind( this ));

			// 장바구니 담기
			this._$target.find( '.btn_cart' ).on( 'click', function () {
				if(this._$target.find('.item_images div').hasClass('item_state out_of_stock')){
					AP.modal.alert( AP.message.CART_OUT_OF_STOCK_PRODUCT );
					return;
				}
				if ( this._data.displayMenuId == 'hotdeal' || this._data.displayMenuId == 'color_collection_shop' || this._data.displayMenuId == 'beauty_point_shop' ) {
					// 핫딜, 컬러컬렉션샵, 뷰티포인트샵 - 단위상품일때
					this._prodSn = this._data['selectedProdSn'];

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
				if ( this._data.repImgNo == 1 )				return;
				repImg = this._data.onlineProdImages[this._data.repImgNo - 1];
			} else {
				if ( this._data.products[0].repImgNo == 1 )	return;
				repImg = this._data.products[0].prodImages[this._data.products[0].repImgNo - 1];
			}
			this._$target.find( '.first_img img' ).attr( 'data-src', repImg.imgUrl );
		},

		_setSlide: function ( data ) {
			if ( data ) {
				var html = AP.common.getTemplate( 'display.product-list.item-slide', data );
				this._$target.find( '.goods_slide' ).ixSlideMax( 'clear' );
				this._$target.find( '.goods_slide' ).html( html );
			}

			if ( this._$target.find( '.goods_slide' ).length > 0 ) {
				this._$target.find( '.first_img' ).hide();
				this._$target.find( '.goods_slide' ).show().ixSlideMax();
			} else {
				this._$target.find( '.first_img' ).show();
			}
			AP.lazyLoad.add( this._$target.find( 'img.lazy_load' )).updated();
		},

		_setOptionName: function ( data ) {
			this._$target.find( '.option_name' ).show();
			for ( var i = 0; i < data.flags.length; ++i ) {
				if ( data.flags[i] == 'icon_reco_new' ) {
					this._$target.find( '.option_name .flag_new' ).show();
				}
			}
			if ( data.onlineProdName ) {
				this._$target.find( '.option_name .flag_name' ).empty();
			} else {
				this._$target.find( '.option_name .flag_name' ).text( data.prodName );
			}
		},

		_addCart: function ( type ) {
			var curObj = _.findWhere(this._data.products, {prodSn : this._prodSn});
			var cartProdExPostList = [{
				prodSn: this._prodSn,
				cartProdQty: 1,
				storePickupYn: 'N',
				integrationMembershipExchYn: curObj.membershipExchOnly,
				activityPointExchYn: curObj.activityPointOnly
			}];
			
			//묶음 상품일 경우
			if( this._data.prodTypeCode == 'BulkFixedProd' ){
				cartProdExPostList[0].cartBulkIncludedProdExList = []; 
				$.each(this._data.bulkIncludedProds, function(idx, obj){
					cartProdExPostList[0].cartBulkIncludedProdExList.push({
						 bulkDcIncludedProdGrpSn : obj.bulkDcIncludedProdGrpSn
						,includedProdSn : obj.prodSn
						,includedProdQty : obj.includedProdQty
					});
				});
			}
			
			//장바구니 저장 api
			AP.api.addCartProd( null, JSON.stringify({cartProdExPostList: cartProdExPostList })).done( function ( result ) {
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
				this._$target.siblings( '.sale_count' ).text( $B.string.numberFormat( saleCount ) + txt );
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
				// this._setOptionName( selectedData );
			}.bind( this ));
		}
	});

	AP.ProductItem = ProductItem;
})( jQuery );