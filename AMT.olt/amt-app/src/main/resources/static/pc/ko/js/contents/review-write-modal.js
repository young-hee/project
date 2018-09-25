/**
 * 리뷰 modal 작성, 수정 (이벤트, 상품상세)
 * Events:
 * 		success		새로운 리뷰를 등록 성공 했을대
 */
;(function ( $ ) {
	'use strict';

	var ReviewWriteModal = $B.Class.extend({

		/**
		 * @param {Object} info
		 */
		initialize: function ( info ) {
			if( info.modify ){
				this._loading = AP.modal.loading();
				AP.api.getProductReviewSurveys({}, {
					 ordNo : info.ordNo
					,ordProdSn : info.ordProdSn
					,onlineProdSn : info.onlineProdSn
					,prodSn : info.prodSn
					,prodReviewType : 'Pur'
				}).done(function(surveys){
					
					AP.api.getReviewDetail({}, {
						prodReviewSn : info.prodReviewSn
					}).done(function(result){
						this._defaultModel = surveys;
						$.extend(this._defaultModel, result);
						this.open();
						this._loading.close();
					}.bind(this));
				}.bind(this));
			} else {
				AP.api.getProductReviewSurveys({}, {
					 ordNo : info.ordNo
					,ordProdSn : info.ordProdSn
					,onlineProdSn : info.onlineProdSn
					,prodSn : info.prodSn
					,prodReviewType : 'Pur'
				}).done(function(result){
					$.extend(result, info);
					this._defaultModel = result;
					this._loading = null;
					this.open();
				}.bind(this));
			}
		},

		/** =============== Public Methods =============== */
		
		open: function () {
			this._modal = AP.modal.info({
					title: '구매리뷰 작성',
					contents: {
						templateKey: 'my.review-write-modal',
						templateModel: this._defaultModel
					},
					sizeType: 'FULL',
					wrapperClass: 'mypage'
				});
			this._$modal = this._modal.getElement();
			this._validator = this._$modal.find( 'form.validate' ).validate({
				submitHandler: function ( form, e ) {
					e.preventDefault();
					this._loading = AP.modal.loading();
					var formData = new FormData( form );

					this._$modal.find( '.ui_input_images' ).inputImages( 'extendFormData', formData );
					//저장 API
					this._save( formData ).done( function () {
						AP.modal.alert( '리뷰가 정상적으로 등록 되었습니다.' ).addListener( 'modal-close', function (e) {
							this._modal.close('success');
						}.bind(this));
					}.bind(this));
				}.bind(this)
			});

			this._modal.addListener( 'modal-before-close', function (e) {
				this._$modal.find( '.ui_rating' ).rating( 'clear' );
				this._$modal.find( 'textarea, input:text' ).inputLimits( 'clear' );
				this._$modal.find( '.ui_input_images' ).inputImages( 'clear' );
				this._$modal.find( '.btn_xlg_primary' ).off('click');
				this._$modal.find( '#prodReviewBodyText' ).off('keyup');
				if(e.data == 'success'){
					this.dispatch( e.data );
				}
				this._validator.destroy();
			}.bind(this));

			this._$modal.find( '.ui_rating' ).rating().find( '.heart span:last' ).trigger( 'click' );
			this._$modal.find( 'textarea, input:text' ).inputLimits();
			this._$modal.find( '.ui_input_images' ).inputImages();
			
			this._$modal.find( 'textarea' ).on( 'change keyup', function (e) {
				if( $(e.currentTarget).val().length > 20 ){
					this._$modal.find( '.btn_xlg_primary' ).prop('disabled', false);
				} else {
					this._$modal.find( '.btn_xlg_primary' ).prop('disabled', true);
				}
			}.bind(this));
			
			this._$modal.find( '.btn_default_modal_confirm' ).off('click').on('click', function(){
				this._$modal.find( 'form.validate' ).submit();
			}.bind(this));
			
			this._$modal.find('.tgArea').each(function(){
				$(this).find('dl > dt').on('click', function(){
					$(this).toggleClass('on');
					$( '.slide' ).ixSlideMax();
				})
			});
			
			if( this._defaultModel.review ){
				console.log( this._defaultModel.review );
				this._$modal.find('#prodReviewBodyText').val(this._defaultModel.review.prodReviewBodyText).trigger( 'keyup' );
				this._$modal.find( '.ui_rating' ).rating().find( '.heart span[value='+this._defaultModel.review.scope+']' ).trigger( 'click' );
			}
			
			//this._$modal.find( 'form.validate' ).submit();
		},


		/** =============== Private Methods =============== */

		_save: function ( formData ) {
			var defer = new $.Deferred();
			AP.api.reviewWithImages( null, formData )
				.done(function ( result ) {
					defer.resolve();
					this._loading.close();
				}.bind(this))
				.fail(function ( xhr ) {
					this._loading.close();
					if ( xhr.errorCode === 'EAPI004' ) {
						AP.login({trigger: true});
					} else {
						AP.modal.alert( AP.message.API_SAVE_ERROR );
					}
				}.bind(this));
			return defer.promise();
		}

	});

	AP.ReviewWriteModal = ReviewWriteModal;
})( jQuery );