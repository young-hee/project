/**
 * Brand
 *
 */

;(function ( $ ) {
	'use strict';

	var Brand = $B.Class.extend({
		
		initialize: function () {
			this._displayMenuId = null;
			this._corners = null;

			this._$target = $( '#ap_container .ap_contents.brand_overview' );
			this._$brandMenu = this._$target.find( '.brand_menu' );
			this._$favoriteList = this._$target.find( '.favorite_list' );
			this._$favoriteBrand = this._$target.find( '.favorite_brand' );
			this._$brandCard = this._$target.find( '.brand_card' );
			this._$slide = this._$target.find( '.center_slide .slide' );
		},

		/** =============== Public Methods =============== */
		init: function ( options ) {
			if ( options ) {
				this._displayMenuId = options.displayMenuId;
				this._corners = options.corners;
			}
			this._setFavoriteBrand();
			this._setBrandMenu();
			this._setBrandCard();
			this._setSlide();
		},

		/** =============== Private Methods ============== */
		_setEvents: function () {
		},

		_setFavoriteBrand: function () {
			if ( this._$target.find( '.login_before01' ).length ) return;

			AP.api.getBrandFaveList({}, {}).done(function ( result ) {
				this._$favoriteList.find( '.loading' ).hide();
				if ( result.faveBrands.length ) {
					this._$favoriteList.find( '.login_after_yes' ).show();
				} else {
					this._$favoriteList.find( '.login_after_no' ).show();
				}
			}.bind( this )).fail(function ( error ) {
				console.log( error.statusText + ' : ' + error.errorCode + error.errorMessage );
			}.bind( this ));
		},

		_setBrandMenu: function () {
			AP.api.getBrandMenu({}, {}).done(function ( result ) {
				var html = AP.common.getTemplate( 'display.brand.brand-menu', result );
				this._$brandMenu.find( '.c_brand_list' ).html( html );
				this._$brandMenu.find( '.ui_toggle_contents' ).show();
				this._$brandMenu.find( '.loading' ).hide();
				if ( result.length <= 8 ) {
					this._$brandMenu.find( '.view, close' ).remove();
				}
			}.bind( this )).fail(function ( error ) {
				console.log( error.statusText + ' : ' + error.errorCode + error.errorMessage );
			}.bind( this ));
		},

		_setBrandCard: function () {
			var isLogin = false,
				param = {};
			if ( !this._$target.find( '.login_before01' ).length ) {
				isLogin = true;
				param = { faveBrandCnt: 3 };
			}

			AP.api.getBrandCards( {}, param ).done(function ( result ) {
				var html = AP.common.getTemplate( 'display.brand.brand-card', result );
				this._$brandCard.html( html );
				if ( isLogin ) {
					// 브랜드 목록 -> 관심 브랜드 3개
					this._$brandCard.find( '.brand_new01' ).each(function ( index, target ) {
						if ( index < 3 ) {
							this._$favoriteBrand.append( $(target) );
						}
					}.bind( this ));
				}

			}.bind( this )).fail(function ( error ) {
				console.log( error.statusText + ' : ' + error.errorCode + error.errorMessage );
			}.bind( this ));
		},

		_setSlide: function () {
			this._$slide.each(function ( index, target ) {
				var listData = [];
				if ( index == 0 ) {
					for ( var i= 0; i < corners['M01_brandMain_m.1'].length; ++i ) {
						for ( var j = 0; j < corners['M01_brandMain_m.1'][i].contents.length; ++j ) {
							if ( corners['M01_brandMain_m.1'][i].contents[j].menuPageCornerContentsId == 'M01_brandMain_m.1.1' ) {
								listData = corners['M01_brandMain_m.1'][i].contents[j].prodList;
							}
						}
					}
				} else if ( index == 1 ) {
					for ( var i= 0; i < corners['M01_brandMain_m.2'].length; ++i ) {
						for ( var j = 0; j < corners['M01_brandMain_m.2'][i].contents.length; ++j ) {
							if ( corners['M01_brandMain_m.1'][i].contents[j].menuPageCornerContentsId == 'M01_brandMain_m.2.1' ) {
								listData = corners['M01_brandMain_m.2'][i].contents[j].prodList;
							}
						}
					}
				}
				var $slide = $( target );
				$slide.find( '.item:not(.item-apply)' ).each(function ( index, target ) {
					new AP.ProductItem({
						$target: $( target ),
						data: listData[index],
						displayMenuId: this._displayMenuId
					});
				}.bind( this ));
				$slide.ixSlideMax();
			}.bind( this ));
		}
	});

	AP.brand = new Brand();
})( jQuery );