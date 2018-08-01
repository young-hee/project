/**
 * 리뷰 modal 작성, 수정 (이벤트, 상품상세)
 * Events:
 * 		success		새로운 리뷰를 등록 성공 했을대
 */
;(function ( $ ) {
	'use strict';

	var ReviewWriteModal = $B.Class.extend({

		/**
		 * @param {Object} model	{onlineProdSn, onlineProdName, products[{prodSn, prodName}]}
		 */
		initialize: function ( model ) {
			this._defaultModel = model;
		},

		/** =============== Public Methods =============== */
		
		prevGetData : function(){
			
			AP.api.getProductReviewSurveys( null, {
				onlineProdSn : this._defaultModel.onlineProdSn
			}).done(function ( result ) {
				this._defaultModel.skinTone = result.prodReviewSurvey;
				this.open();
			}.bind(this)).fail(function ( xhr ) {
			}.bind(this));
		},

		open: function () {
			var modal = AP.modal.info({
					title: '리뷰 작성하기',
					contents: {
						templateKey: 'common.review-write-modal',
						templateModel: this._defaultModel
					},
					sizeType: 'L'
				}),
				$modal = modal.getElement(),
				validator = $modal.find( 'form.validate' ).validate({
					submitHandler: function ( form, e ) {
						e.preventDefault();

						var formData = new FormData( form );
						$modal.find( '.ui_input_images' ).inputImages( 'extendFormData', formData );

						//저장 API
						this._save( formData ).done( function () {
							AP.modal.alert( '리뷰가 정상적으로 등록 되었습니다.' ).addListener( 'modal-close', function (e) {
								modal.close();
							});
						});
					}.bind(this)
				});

			modal.addListener( 'modal-before-close', function (e) {
				$modal.find( '.ui_rating' ).rating( 'clear' );
				$modal.find( 'textarea, input:text' ).inputLimits( 'clear' );
				$modal.find( '.ui_input_images' ).inputImages( 'clear' );
				$modal.find( 'select' ).selectBox( 'clear' );
				$modal.find( '#skintype' ).off( 'change' );
				validator.destroy();
			}.bind(this));

			//
			$modal.find( '.ui_rating' ).rating();
			$modal.find( 'textarea, input:text' ).inputLimits();
			$modal.find( '.ui_input_images' ).inputImages();
			$modal.find( 'select' ).selectBox();
			$modal.find( '#skintype' ).on( 'change', function (e) {
				var value = $( e.currentTarget ).val() || null,
					prodReviewEvalQuestionSn = $modal.find( 'input[name="prodReviewEvalQuestionSn"]' ).val() || null;

				$modal.find( 'input[name="arrSurvey"]' ).val( '[{"prodReviewEvalQuestionSn":' + prodReviewEvalQuestionSn + ', "prodReviewEvalResponseSn":' + value + '}]' );
			}.bind(this));
		},


		/** =============== Private Methods =============== */

		_save: function ( formData ) {
			var defer = new $.Deferred();

			AP.api.reviewWithImages( null, formData )
				.done(function ( result ) {
					defer.resolve();
					this.dispatch( 'success' );
				}.bind(this))
				.fail(function ( xhr ) {
					if ( xhr.errorCode === 'EAPI004' ) {
						AP.login({trigger: true});
					} else {
						AP.modal.alert( AP.message.API_SAVE_ERROR );
					}
				}.bind(this));

			return defer.promise();
		},

		//피부톤 데이타 가져오기
		_getSkinTone: function () {
			AP.api.getProductReviewSurveys( null, {
				onlineProdSn: this._defaultModel.onlineProdSn
			}).done( function ( result ) {
				this._defaultModel.skinTone = result;
			}.bind(this));
		}

	});


	AP.ReviewWriteModal = ReviewWriteModal;
})( jQuery );