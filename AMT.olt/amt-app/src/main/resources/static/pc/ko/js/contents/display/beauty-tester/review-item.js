/**
 * ProductItem
 *
 */

;(function ( $ ) {
	'use strict';

	var ReviewItem = $B.Class.extend({
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
			this._$target.on( 'click', function (e) {
				e.preventDefault();
				var products = this._defaultModel;
				var options = {
					title : "뷰티테스터 상세",
					contents: {
						templateKey: 'display.beauty-tester.review-detail-modal',
						templateModel: products
					},
					sizeType : 'M',
	            	containerClass : 'modal_info'
	        	};
	            AP.modal.info( options );
			}.bind( this ));
		}
	});

	AP.ReviewItem = ReviewItem;
})( jQuery );