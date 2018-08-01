/**
 * SortOption
 *
 * @Methods:
 * get
 * 		@return	{Object} 	flag		{String}
 * 							prodSort 	{Object}
 *
 * @Events:
 * change-sort
 * 		@param	{Object} 	flag		{String}
 * 							prodSort 	{Object}
 *
 * change-view
 * 		@param 	{String}	view		{String}
 *
 * open-search-filter 		검색필터 open
 *
*/

;(function ( $ ) {
	'use strict';

	var SortOption = $B.Class.extend({
		initialize: function ( $target ) {
			this._$sort = $target;

			this._setSort();
		},

		/** =============== Public Methods =============== */

		get: function () {
			return this._getSort();
		},

		/** =============== Private Methods =============== */

		_setSort: function () {
			var _this = this,
				$sort = this._$sort;

			$sort.find( '.select_wrap select, .check_wrap input' ).on( 'change', function () {
				_this.dispatch( 'change-sort', _this._getSort() );
			});
			$sort.find( '.btn.view' ).on( 'click', function () {
				var hasType2 = $( this ).hasClass( 'type2' );
				_this.dispatch( 'change-view', { view : hasType2 ? 'type2' : 'type1' });
				if ( hasType2 ) {
					$( this ).removeClass( 'type2' ).addClass( 'type1' );
				} else {
					$( this ).removeClass( 'type1' ).addClass( 'type2' );
				}
			});
			$sort.find( '.btn.filter' ).on('click', function () {
				_this.dispatch( 'open-search-filter' );
			});
		},

		_getSort: function () {
			var option = {},
				$sort = this._$sort.find( '.select_wrap select' ),
				$flag = this._$sort.find( '.check_wrap input' );

			if ( $sort.length ) {
				option.prodSort = $sort.val();
			}
			if ( $flag.length ) {
				 if ( $flag.prop( 'checked' ) ) {
					option.flag = $flag.val();
				} else {
					option.flag = null;
				}
			}

			return option;
		}
	});

	AP.SortOption = SortOption;
})( jQuery );