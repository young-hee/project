/**
 * 당첨 팝업
 *
 * @Methods:
 * open		@param	{String}
 * 					{Object}
 *
 *
 */

;(function ( $ ) {
	'use strict';

	var WinningPop = $B.Class.extend({
		initialize: function () {
		},

		/** =============== Public Methods =============== */
		open: function ( title, result ) {
			// TODO: 당첨팝업 data
			this._winningPop = AP.modal.info({
				title: title,
				contents: {
					templateKey: 'display.events.winning-pop',
					templateModel: result
				},
				containerClass: 'roulette_layer'
			}).addListener( 'modal-before-close', function (e) {
				$winningPop.find( '.img' ).off( 'load' );
				$winningPop.find( '.page_btns button' ).off( 'click' );
			}.bind( this ));

			var $winningPop = this._winningPop.getElement();
			$winningPop.find( 'img' ).on( 'load', function () {
				this._winningPop.resetPosition();
			}.bind( this ));

			$winningPop.find( '.page_btns button' ).on( 'click', function () {
				this._winningPop.close();
				AP.shippingInfo.open( result );
			}.bind( this ));
		}

		/** =============== Private Methods =============== */
	});

	AP.winningPop = new WinningPop();
})( jQuery );