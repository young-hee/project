/**
 * 제품상세 : 언제 들어와? 알림 신청
 */
;(function ( $ ) {
	'use strict';

	var RestockNotify = $B.Class.extend({

		initialize: function () {
			//
		},

		/** =============== Public Methods =============== */

		open: function ( model, memberMap ) {
			var modal = AP.modal.info({
					title: '언제 들어와? 알림 신청',
					contents: {
						templateKey: 'products.restock-notify-apply-modal',
						templateModel : {
							onlineProdName: model.onlineProdName,
							products: this._getAvailableProducts( model.products ),
							memberMap: memberMap
						}
					},
					sizeType: 'L'
				}),
				$modal = modal.getElement(),
				validator = $modal.find( 'form.validate' ).validate({
					submitHandler: function ( form, e ) {
						if ( $modal.find('[name=sms_agreement]:checked').val() === 'N' ) {
							AP.modal.alert( 'SMS(LMS) 수신여부 동의가 되어야합니다.' );
						} else {
							this._save( form );
						}
					}.bind(this)
				});

			modal.addListener( 'modal-before-close', function (e) {
				validator.destroy();
				$modal.find( 'select' ).selectBox( 'clear' );
				$modal.find( 'input:text' ).placeholder( 'clear' );
			});

			$modal.find( 'select' ).selectBox();
			$modal.find( 'input:text' ).placeholder();
		},

		/** =============== Private Methods =============== */

		_save: function ( form ) {
			var defer = new $.Deferred(),
				formData = new FormData( form );

			AP.api.restockNotify( null, formData )
				.done( function ( result ) {
					AP.modal.alert( AP.message.RESTOCK_NOTIFY_APPLY_SUCCESS ).addListener( 'modal-close', function (e) {
						defer.resolve();
					}.bind(this));
				}.bind(this))
				.fail( function ( xhr ) {
					defer.reject();

					if ( xhr.errorCode === 'EAPI004' ) {
						AP.login({trigger: true});
					} else {
						AP.modal.alert( AP.message.API_SAVE_ERROR );
					}
				}.bind(this));

			return defer.promise();
		},

		_getAvailableProducts: function ( products ) {
			var result = [];

			_.each( products, function ( product ) {
				//OnSale(판매중) - OutOfStock(품절) - Exhaustion(조기소진) - Waiting(판매대기) - Suspend(판매일시중지) - End(판매종료)
				if ( _.contains(['OutOfStock'], product.saleDisplayStatus) ) {
					result.push( product );
				}
			});

			return result;
		}

	});


	AP.RestockNotify = RestockNotify;
})( jQuery );