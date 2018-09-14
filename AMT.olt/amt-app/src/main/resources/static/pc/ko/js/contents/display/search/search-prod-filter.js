/**
 * SearchProdFilter
 *
 */

;(function ( $ ) {
	'use strict';

	var SearchProdFilter = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target.find(".ap_com_cont").find(".aside_area.filter.search");
			this._$filter = null;
			this._data = options.data.filter;
		},
		/** =============== Public Methods =============== */
		load: function () {
			var filter_html = AP.common.getTemplate('display.search.search-prod-filter', this._data);
			this._$target.html(filter_html);
			this._$filter = this._$target.find( '.filter_option' );
			this._setEvent();
		},
		clear: function () {
		},
		/** =============== Private Methods ============== */
		_done: function ( regularEventSn, result ) {
		
		},
		_setEvent: function () {
			//필터
			if( this._$filter.length ) {

				this._$filter.find( 'input[type=checkbox]' ).on( 'change', function (e) {
					e.preventDefault();
					AP.search.reloadList(true);
				}.bind( this ));
			}
			
			this._$target.find('.category').find('a').on('click', function(e){
				
				$(e.currentTarget).parent().siblings().find('a').each(function(){$(this).removeClass("on");});
				$(e.currentTarget).addClass("on");
				AP.search.reloadList(true);
			});
			
			this._$target.find('.btn_lg_gradient.init').on('click', function(e){
				var isChanged = false;
				$(e.currentTarget).parent().find( 'input:checkbox' ).each(function () {
					if(this.checked){
						this.checked = false;
						isChanged = true;
					}
				});
				if(isChanged){
					AP.search.reloadList(true);
				}
			});
			
			this._$target.find('.btn_fix_gradient2.price_search').on('click', function(e){
				AP.search.reloadList(true);
			});
			
			this._$target.find('.price').find('input:radio').on('click', function(e){
				$(e.currentTarget).parent().parent().parent().siblings('.direct_entry').find('input[name="min"]').val("");
				$(e.currentTarget).parent().parent().parent().siblings('.direct_entry').find('input[name="max"]').val("");
				AP.search.reloadList(true);
			});
			this._$target.find('.price').find('.direct_entry').find('input:text').on('focus', function(e){
				$(e.currentTarget).parent().parent().siblings('ul').find('input[type=radio]:checked').prop("checked", false);
			});
		}
	});

	AP.searchProdFilter = SearchProdFilter;
})( jQuery );