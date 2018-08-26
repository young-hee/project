/**
 * CategoryList
 *
 */

;(function ( $ ) {
	'use strict';

	var CategoryMenu = $B.Class.extend({
		initialize: function () {
			this.DEPTH1_LENGTH = 3;
			this.DEPTH2_LENGTH = 6;
			this.DEPTH3_LENGTH = 9;
		},

		/** =============== Public Methods =============== */
		init: function ( options ) {
			this._$target = options.$target;
			this._data = options.gnbMap;
			this._displayMenuId = options.displayMenuId;
			this._upperMenuId = this._displayMenuId.substr( 0, String( 'CTG' ).length + this.DEPTH1_LENGTH );
			for ( var i = 0; i < this._data.submenus.length; ++i ) {
				this._data.submenus[i].upperMenuId = this._upperMenuId;
			}

			this._setEvent();
			this._setDepthIndex( this._displayMenuId );
			this._draw();
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
			this._$target.on( 'click', '.cate_more', function (e) {
				$( e.currentTarget ).siblings( 'ul' ).find( 'li' ).show();
			});
		},

		_setDepthIndex: function ( pageCode ) {
			pageCode = pageCode.replace( /CTG/g, '' );
			if ( pageCode.length  >= this.DEPTH1_LENGTH ) {
				this._depth1Index = pageCode.substr( this.DEPTH1_LENGTH - 1, 1 );
				this._data.selectedIndex = this._depth1Index - 1;

				if ( pageCode.length  >= this.DEPTH2_LENGTH ) {
					this._depth2Index = pageCode.substr( this.DEPTH2_LENGTH - 1, 1 );
					this._data.submenus[this._depth1Index - 1].selectedIndex = this._depth2Index - 1;

					if ( pageCode.length  >= this.DEPTH3_LENGTH ) {
						this._depth3Index = pageCode.substr( this.DEPTH3_LENGTH - 1, 1 );
						this._data.submenus[this._depth1Index - 1].submenus[this._depth2Index - 1].selectedIndex = this._depth3Index - 1;
					}
				}
			}
		},

		_draw: function () {
			if ( this._depth1Index && this._depth2Index && this._depth3Index ) {
				var depth2Html = AP.common.getTemplate( 'display.product-list.category-menu-3', this._data.submenus[this._depth1Index - 1] );
				this._$target.html( depth2Html );
				this.dispatch( 'set-category-title', { title: this._data.submenus[this._depth1Index - 1].submenus[this._depth2Index - 1].submenus[this._depth3Index - 1].menuTitle });
				return;
			}
			if ( this._depth1Index && this._depth2Index ) {
				var depth2Html = AP.common.getTemplate( 'display.product-list.category-menu-2', this._data.submenus[this._depth1Index - 1] );
				this._$target.html( depth2Html );
				this.dispatch( 'set-category-title', { title: this._data.submenus[this._depth1Index - 1].submenus[this._depth2Index - 1].menuTitle });
				return;
			}
			if ( this._depth1Index ) {
				var depth1Html = AP.common.getTemplate( 'display.product-list.category-menu-1', this._data.submenus[this._depth1Index - 1] );
				this._$target.html( depth1Html );
				this.dispatch( 'set-category-title', { title: this._data.submenus[this._depth1Index - 1].menuTitle });
				return;
			}
		}
	});

	AP.categoryMenu = new CategoryMenu();
})( jQuery );
