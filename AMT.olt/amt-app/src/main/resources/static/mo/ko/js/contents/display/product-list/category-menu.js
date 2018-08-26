/**
 * PageTitle
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
			this._$pageTitle = options.$pageTitle;
			this._$menuLayer = options.$menuLayer;
			this._$dimmed = options.$dimmed;
			this._$categoryMenu = options.$categoryMenu;
			this._data = options.gnbMap;
			this._displayMenuId = options.displayMenuId;
			this._upperMenuId = this._displayMenuId.substr( 0, String( 'CTG' ).length + this.DEPTH1_LENGTH );
			for ( var i = 0; i < this._data.submenus.length; ++i ) {
				this._data.submenus[i].upperMenuId = this._upperMenuId;
			}

			this._setDepthIndex( this._displayMenuId );
			this._draw();
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
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
			var depthListHtml = '',
				depthMenuHtml = '';
			if ( this._depth1Index && this._depth2Index && this._depth3Index ) {
				this._$pageTitle.find( 'span' ).text( this._data.submenus[this._depth1Index - 1].submenus[this._depth2Index - 1].menuTitle ).show();
				depthListHtml = AP.common.getTemplate( 'display.product-list.page-title', this._data.submenus[this._depth1Index - 1] );
				this._$menuLayer.html( depthListHtml );
				depthMenuHtml = AP.common.getTemplate( 'display.product-list.category-menu', this._data.submenus[this._depth1Index - 1].submenus[this._depth2Index - 1]);
				this._$categoryMenu.html( depthMenuHtml );
				this._$categoryMenu.find( 'li a' ).removeClass( 'on' );
				this._$categoryMenu.find( 'li' ).eq( this._data.submenus[this._depth1Index - 1].submenus[this._depth2Index - 1].selectedIndex + 1 ).find( 'a' ).addClass( 'on' );

				return;
			}
			if ( this._depth1Index && this._depth2Index ) {
				this._$pageTitle.find( 'span' ).text( this._data.submenus[this._depth1Index - 1].submenus[this._depth2Index - 1].menuTitle ).show();
				var depthListHtml = AP.common.getTemplate( 'display.product-list.page-title', this._data.submenus[this._depth1Index - 1] );
				this._$menuLayer.html( depthListHtml );
				var depthMenuHtml = AP.common.getTemplate( 'display.product-list.category-menu', this._data.submenus[this._depth1Index - 1].submenus[this._depth2Index - 1]);
				this._$categoryMenu.html( depthMenuHtml );
				return;
			}
			if ( this._depth1Index ) {
				this._$pageTitle.find( 'span' ).text( this._data.submenus[this._depth1Index - 1].menuTitle ).show();
				var depthListHtml = AP.common.getTemplate( 'display.product-list.page-title', this._data );
				this._$menuLayer.html( depthListHtml );
				var depthMenuHtml = AP.common.getTemplate( 'display.product-list.category-menu', this._data.submenus[this._depth1Index - 1]);
				this._$categoryMenu.html( depthMenuHtml );
				return;
			}
		}
	});

	AP.categoryMenu = new CategoryMenu();
})( jQuery );
// this._$pageTitle.find( 'a' ).attr( 'href', '/display/category/' + this._displayMenuId + '?upperMenuId=' + this._upperMenuId );