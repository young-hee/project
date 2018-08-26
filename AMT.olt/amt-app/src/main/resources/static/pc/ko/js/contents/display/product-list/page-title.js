/**
 * PageTitle
 *
 */

;(function ( $ ) {
	'use strict';

	var PageTitle = $B.Class.extend({
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
			if ( this._depth1Index ) {
				var depth1Html = AP.common.getTemplate( 'display.product-list.page-title', this._data );
				this._$target.find( '.breadcrumb' ).append( depth1Html );
			}
			if ( this._depth2Index ) {
				var depth2Html = AP.common.getTemplate( 'display.product-list.page-title', this._data.submenus[this._depth1Index - 1] );
				this._$target.find( '.breadcrumb' ).append( depth2Html );
			}
			if ( this._depth3Index ) {
				var depth3Html = AP.common.getTemplate( 'display.product-list.page-title', this._data.submenus[this._depth1Index - 1].submenus[this._depth2Index - 1] );
				this._$target.find( '.breadcrumb' ).append( depth3Html );
			}
			this._$target.find( '.breadcrumb select' ).selectBox();
			this._$target.find( 'select' ).on( 'change', function (e) {
				var pageCode = e.value,
					upperMenuId = pageCode.substr( 0, String( 'CTG' ).length + this.DEPTH1_LENGTH );
				location.href = '/display/category/' + pageCode + '?upperMenuId=' + upperMenuId;
			}.bind( this ));
		}
	});

	AP.pageTitle = new PageTitle();
})( jQuery );