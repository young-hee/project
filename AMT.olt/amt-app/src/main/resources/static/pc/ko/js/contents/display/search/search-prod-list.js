/**
 * SearchProdFilter
 *
 */

;(function ( $ ) {
	'use strict';

	var SearchProdList = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target.find(".ap_com_cont").find(".cont_area.search").find(".list_product.cell04").find('ul');
			this._data = options.data;
			this._param = options.param;
			this._isClearPaging = options.data.isClearPaging;
		},
		/** =============== Public Methods =============== */
		load: function () {
			var list_html = AP.common.getTemplate('display.search.search-prod-list', this._data);
			this._$target.html(list_html);
			
			this._$paging = this._$target.parent().parent().find( '.pagination' );
			this._$paging.show();
			if ( this._isClearPaging ) {
				this._clearPaging();
			}
			this._setPaging( this._param.limit, this._data.totalCount );
		},
		empty: function() {
			this._$target.empty();
		},
		clear: function () {
		},
		/** =============== Private Methods ============== */
		_done: function ( result ) {
		
		},
		_clearPaging: function () {
			if ( this._$paging.length < 1 ) return;

			this._$paging.paging( 'clear' ).off( 'paging-change' );
			this._param.offset = 0;
		},
		_setPaging: function ( limit, totalCount ) {
			this._$paging = this._$target.parent().parent().find( '.pagination' );
			if ( this._$paging.attr( 'class' ).indexOf( 'apply' ) < 0  ) {
				this._$paging.paging({
					limit: limit,
					totalCount: totalCount,
					focusTarget: this._$target.parent().parent().find( '.sorting_group' )
				});
				this._isClearPaging = false;

				// paging
				this._$paging.on( 'paging-change', function (e) {
					this._param.offset = e.offset;
					AP.search.reloadList(this._isClearPaging);
				}.bind( this ));
			}
		},
		_setEvent: function ( result ) {
			
		}
	});

	AP.searchProdList = SearchProdList;
})( jQuery );