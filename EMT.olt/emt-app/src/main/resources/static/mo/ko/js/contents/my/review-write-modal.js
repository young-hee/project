/**
 * 마이페이지 주문 리뷰 modal 작성, 수정
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
			//this._getSkinTone();
			this._selectedTabIndex = 0;
		},

		/** =============== Public Methods =============== */

		prevGetData : function(){
			AP.api.getProductReviewSurveys( null, {
				//etude상품평 설문 하나만 사용한다.
				onlineProdSn: this._defaultModel.products[0].ordProdSn
			}).done( function ( result ) {
				this._defaultModel.skinTone = result.prodReviewSurvey;
				this.open();
			}.bind(this));
		},

		open: function () {
			var modal = AP.modal.full({
				title: '리뷰 작성하기',
				contents: {
					templateKey: 'my.review-write-modal',
					templateModel: this._defaultModel
				},
				containerClass: 'review'
			}),

			$modal = modal.getElement(),
			validator = $modal.find( 'form.validate' ).validate({
				ignore: [],
				submitHandler: function ( form, e ) {
					e.preventDefault();

					if (this._selectedTabIndex == 0) {
						//주문단위 상품평쓰기
						$modal.find('input[name=multiWriteYn]').val('Y');
					} else {
						//단위상품 단위 상품평쓰기
						$modal.find('input[name=multiWriteYn]').val('N');
					}

					var formData = new FormData( form );
					$modal.find( '.ui_input_images' ).inputImages( 'extendFormData', formData );

					//저장 API
					this._save( formData ).done( function (result) {});
				}.bind(this)
			});

			modal.addListener( 'modal-before-close', function (e) {
				$modal.find( '.ui_tooltip' ).tooltip( 'clear' );
				$modal.find( '.ui_tab' ).tabs( 'clear' );
				$modal.find( '.ui_rating' ).rating( 'clear' );
				$modal.find( 'textarea, input:text' ).inputLimits( 'clear' );
				$modal.find( '.ui_input_images' ).inputImages( 'clear' );
				$modal.find( '#prod_Option' ).off( 'change' );
				$modal.find( '#skintype' ).off( 'change' );
				validator.destroy();
			}.bind(this));

			$modal.find( '.ui_tooltip' ).tooltip();
			//Tab
			$modal.find( '.ui_tab' ).tabs();
			$modal.find( '.ui_tab' ).on( 'tabs-change', function (e) {
				//console.log( e.index );
				this._selectedTabIndex = e.index;
				if (this._selectedTabIndex == 0) {
					$modal.find('input[name=prodSn]').prop("required", false);
				} else {
					$modal.find('input[name=prodSn]').prop("required", true);
					$modal.find('input[name=prodSn]').attr("data-msg", "상품을 선택해 주세요.");
				}
			}.bind(this));
			$modal.find( '.ui_rating' ).rating();
			$modal.find( 'textarea, input:text' ).inputLimits();
			$modal.find( '.ui_input_images' ).inputImages();

			//단위상품 선택
			$modal.find( '.ui_select' ).designSelectBox();
			$modal.find( '.ui_select' ).on( 'design-selectbox-selected design-selectbox-change', function (e) {
				if ( e.type === 'design-selectbox-selected' ) {
					//선택한 option의 변경여부와 상관없이 사용자가 선택하면 발생
					//console.log( e.value, e.changed );
				} else {
					//console.log( e.value );
					$modal.find( '.review_wrap_02' ).show();

					this._defaultModel.products.forEach(function( item, index ){
						if ( item.prodSn == e.value ) {
							$modal.find('img[name=selected_prodImage]').attr("src", item.repProdImage);
							$modal.find('span[name=selected_prodName]').html(item.prodName);
							$modal.find('input[name=ordProdSn]').val(item.ordProdSn);
						}
					});

					$modal.find('input[name=prodSn]').val(e.value);
				}
			}.bind(this));
			$modal.find( '.review_wrap_02' ).hide();

			//피부톤
			$modal.find( '#skintype' ).on( 'change', function (e) {
				var value = $( e.currentTarget ).val() || null,
					prodReviewEvalQuestionSn = $modal.find( 'input[name="prodReviewEvalQuestionSn"]' ).val() || null;

				$modal.find( 'input[name="arrSurvey"]' ).val( '[{"prodReviewEvalQuestionSn":' + prodReviewEvalQuestionSn + ', "prodReviewEvalResponseSn":' + value + '}]' );
			}.bind(this));
		},


		/** =============== Private Methods =============== */

		//리뷰 저장
		_save: function ( formData ) {
			var defer = new $.Deferred();

			AP.api.reviewWithImages( null, formData )
				.done(function ( result ) {

					if (result.booleanResult.result) {
						if (result.failureExist) {
							AP.modal.alert( '일부 리뷰가 정상적으로 등록 되었습니다.' ).addListener( 'modal-close', function (e) {
								location.href = "/my/page/myReviewList";
							});
						} else {
							AP.modal.alert( '리뷰가 정상적으로 등록 되었습니다.' ).addListener( 'modal-close', function (e) {
								if (result.writableExist) {
									AP.modal.info({
										// contents: 'html 내용 & template',
										contents: '<p class="text">구매 리뷰를 작성하지 않은 상품이 있습니다.<br>계속 작성을 하시겠습니까?</p> <p class="text">작성 기한 만료 전까지는 언제든지 리뷰를<br>작성하실 수 있습니다.</p>',
										confirmLabel: '계속쓰기',
										cancelLabel: '취소'
									}).addListener( 'modal-close', function (e) {
										console.log( e.closeType );
										if ( e.closeType == 'confirm' ) {
											//페이지 유지
										} else {
											location.href = "/my/page/myReviewList";
										}
									});
								} else {
									location.href = "/my/page/myReviewList";
								}
							});
						}
					} else {
						AP.modal.alert("리뷰 등록 실패했습니다.");
					}

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
		}
	});


	AP.ReviewWriteModal = ReviewWriteModal;
})( jQuery );