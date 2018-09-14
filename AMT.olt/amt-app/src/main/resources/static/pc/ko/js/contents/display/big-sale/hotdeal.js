/**
 * Hotdeal
 *
 */

;(function ( $ ) {
	'use strict';

	var Hotdeal = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents' );
			this._$currentList = this._$target.find( '.hotdeal_current' );
			this._$comingSoonList = this._$target.find( '.hotdeal_coming_soon' );

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		init: function ( options ) {
			this._currentList = new AP.ProductList({
				$target: this._$currentList,
				$targetList: this._$currentList.find( '.hotdeal_list' ),
				displayMenuId: options.displayMenuId,
				template: 'display.events.hotdeal-item',
				api: 'hotDealItemList',
				key: options.displayMenuId
			}).load();

			// TODO: 커밍쑨
			this._comingSoonList = new AP.ProductList({
				$target: this._$comingSoonList,
				$targetList: this._$comingSoonList.find( '.event_list .list' ),
				displayMenuId: options.displayMenuId,
				template: 'display.events.hotdeal-coming-soon-item',
				api: 'hotDealItemList',
				key: options.displayMenuId
			}).load();
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {}
	});

	AP.hotdeal = new Hotdeal();
})( jQuery );