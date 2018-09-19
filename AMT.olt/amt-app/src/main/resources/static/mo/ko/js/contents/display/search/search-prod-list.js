/**
 * SearchProdFilter
 *
 */

;(function ( $ ) {
	'use strict';

	var SearchProdList = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target.find(".cate_prd_wrap01").find('ul.product_list_new');
			this._data = options.data;
			this._param = options.param;
		},
		/** =============== Public Methods =============== */
		load: function () {
			var list_html = AP.common.getTemplate('display.search.search-prod-list', this._data);
			this._$target.html(list_html);
			this._setEvent();
		},
		empty: function() {
			this._$target.empty();
		},
		clear: function () {
		},
		/** =============== Private Methods ============== */
		_done: function ( result ) {
		
		},
		_setEvent: function () {
			// 좋아요
			this._$target.on( 'click', '.like_btn', function (e) {
				var $like = $( e.currentTarget );
				AP.login().done(function () {
					if ( !$like.hasClass( 'on' )) {
						$like.addClass( 'on' ).find( '.ico_heart_s' ).addClass( 'on' );
						AP.addLike.add( this._$target, this._data.products );
					} else {
						$like.removeClass( 'on' ).find( '.ico_heart_s' ).removeClass( 'on' );
						AP.addLike.remove( this._data.onlineProdSn );
					}
				}.bind( this ));
				return false;
			}.bind( this ));
		}
	});

	AP.searchProdList = SearchProdList;
})( jQuery );