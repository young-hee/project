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
			this._$categoryMenu = options.$categoryMenu;
			this._data = options.gnbMap;
			this._displayMenuId = options.displayMenuId;

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
				depthMenuHtml = '',
				depth1Data = this._data.submenus[this._depth1Index - 1],
				depth2Data = depth1Data.submenus[this._depth2Index - 1];

			if ( this._depth1Index && this._depth2Index && this._depth3Index ) {
				this._$pageTitle.find( 'span' ).text( depth2Data.menuTitle ).show();
				depthListHtml = AP.common.getTemplate( 'display.category.page-title', depth1Data );
				this._$menuLayer.html( depthListHtml );
				depth2Data.upperMenuId = depth1Data.displayMenuId.substr( 0, 6 );
				depthMenuHtml = AP.common.getTemplate( 'display.category.category-menu', depth2Data);
				this._$categoryMenu.html( depthMenuHtml );
				this._$categoryMenu.find( 'li a' ).removeClass( 'on' );
				this._$categoryMenu.find( 'li' ).eq( depth2Data.selectedIndex + 1 ).find( 'a' ).addClass( 'on' );
				return;
			}
			if ( this._depth1Index && this._depth2Index ) {
				this._$pageTitle.find( 'span' ).text( depth2Data.menuTitle ).show();
				depthListHtml = AP.common.getTemplate( 'display.category.page-title', depth1Data );
				this._$menuLayer.html( depthListHtml );
				depth2Data.upperMenuId = depth1Data.displayMenuId.substr( 0, 6 );
				depthMenuHtml = AP.common.getTemplate( 'display.category.category-menu', depth2Data);
				this._$categoryMenu.html( depthMenuHtml );
				return;
			}
			if ( this._depth1Index ) {
				this._$pageTitle.find( 'span' ).text( depth1Data.menuTitle ).show();
				depthListHtml = AP.common.getTemplate( 'display.category.page-title', this._data );
				this._$menuLayer.html( depthListHtml );
				depth1Data.upperMenuId = depth1Data.displayMenuId.substr( 0, 6 );
				depthMenuHtml = AP.common.getTemplate( 'display.category.category-menu', depth1Data);
				this._$categoryMenu.html( depthMenuHtml );
			}
		}
	});

	AP.categoryMenu = new CategoryMenu();
})( jQuery );
