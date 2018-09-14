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
console.log(result); 
			var prodCount = 0; 
			_.each(result.awards ,function(list){
				 
				if(list.awardTgtCode === 'Prod'){
					prodCount++; 
				}else {
					prodCount = 0;
				}
				
				result.awards.prodCount = prodCount; 
			});
console.log(result); 	
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

			$winningPop.find( '.page_btns .btn_md_primary' ).on( 'click', function () {
				this._winningPop.close();
				AP.shippingInfo.open( result );
			}.bind( this ));
			
			$winningPop.find( '.page_btns .btn_lg_primary' ).on( 'click', function () {
				this._winningPop.close();
				location.href = "/my/page/info/myEtude";
			}.bind( this ));
		}

		/** =============== Private Methods =============== */
	});

	AP.winningPop = new WinningPop();
})( jQuery );