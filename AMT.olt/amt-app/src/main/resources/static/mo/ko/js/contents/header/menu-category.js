/**
 * MenuCategory
 *
 */
;(function ( $ ) {
    'use strict';

    var MenuCategory = $B.Class.extend({
        initialize: function () {
            this._$target = $( '#header .menu_category' );

            this._setEvent();
            this._setCategory();
        },

        /** =============== Public Methods =============== */
        open: function () {
        	this._$target.addClass( 'open' );
		},

		close: function () {
			this._$target.removeClass( 'open' );
		},

        /** =============== Private Methods =============== */

		_setEvent: function () {
			// 닫기
        	this._$target.find( '.btn_close' ).on( 'click', function () {
        		this.close();
			}.bind( this ));
		},

		_setCategory: function () {
			this._$target.find( '.c_menu_list li a' ).on( 'click', function (e) {
				var $target = $( e.currentTarget ),
					$category = $target.closest( '.cate_depth1' ).next( '.cate_depth2' ).find( '> div' ),
					idx = $target.parent().index();

				this._$target.find( '.c_menu_list li a' ).removeClass( 'on' );
				this._$target.find( '.cate_depth2 > div' ).hide();
				$target.addClass( 'on' );
				$category.eq( idx ).show();

				e.preventDefault();
			}.bind( this ));
		}
    });

    AP.menuCategory = new MenuCategory();
})( jQuery );