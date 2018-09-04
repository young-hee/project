/**
 * ProductItem
 *
 */

;(function ( $ ) {
	'use strict';

	var RequesterEach = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target;
			this._defaultModel = options.data;

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		clear: function () {
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
			this._$target.find(".edit").on( 'click', function (e) {
				e.preventDefault();
				alert("edit");
			}.bind( this ));
			this._$target.find(".delete").on( 'click', function (e) {
				e.preventDefault();
				alert("delete");
			}.bind( this ));
		}
	});

	AP.RequesterEach = RequesterEach;
})( jQuery );