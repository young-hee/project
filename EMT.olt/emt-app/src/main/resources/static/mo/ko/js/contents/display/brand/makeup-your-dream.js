/**
 * 청춘강연 - 예약하기
 *
 * @Method:
 * setData
 *
 */

;(function ( $ ) {
	'use strict';

	var MakeupYourDreamReserve = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .makeup_dream' );
			this._data = null;
			this._$target.find( '.accompanyInfo' ).hide();
			this._setEvent();	
			
		},
		/** =============== Private Methods =============== */
		
		_setEvent: function () {
		
			// 확인 / 취소
			this._$target.find( '.form_btns .confirm' ).on( 'click', function (e) {
				this._$target.find( 'form.validate' ).submit();
			}.bind( this ));
			
			this._$target.find( '.form_btns .cancel' ).on( 'click', function (e) {
				this.dispatch( 'reserve-complete' );
			}.bind( this ));
			
			this._$target.find( '.ac_yn input' ).on( 'change', function (e) {
				//console.log($( e.target ).val());
				if($( e.target ).val() == 'Y'){
					
					this._$target.find( '.accompanyInfo' ).show();
					$('input[name=companionAgeGrp]').attr('required','required');
					$('input[name=companionGender]').eq(0).attr('required','required');
					this._$target.find( '.accompanyInfo input[type=radio]').eq(0).val('Female');
					this._$target.find( '.accompanyInfo input[type=radio]').eq(1).val('Male');
				}else {
					this._$target.find( '.accompanyInfo' ).hide();
					$('input[name=companionAgeGrp]').attr('required','');
					$('input[name=companionGender]').eq(0).attr('required','');
					this._$target.find( '.accompanyInfo input').val('');
					this._$target.find( '.accompanyInfo input').blur();
					this._$target.find( '.accompanyInfo .input_group').removeClass('error');
					this._$target.find( '.accompanyInfo select').val('').prop('selected',true);
					this._$target.find( '.accompanyInfo input[type=radio]').prop('checked',false);
					//$( '.accompanyInfo select' ).val( this._$target.find( '#accompanyInfo select option:eq(0)').text() );
					//$( '.accompanyInfo select' ).selectBox( 'updated' );
					
				}
			}.bind( this ));
			
			// submit
			this._$target.find( 'form.validate' ).validate({
			
				submitHandler: function ( form, e ) {
					AP.modal.confirm( '해당 내용으로 <br>신청하시겠습니까?' ).addListener( 'modal-close', function (e) {
						if ( e.closeType == 'confirm' ) {
							var formData = new FormData( form );
							
								AP.api.requestYouthLecture( {}, formData ).done(function ( result ) {
								this._openReserveComplete( result );

							}.bind( this )).fail(function (e) {
								
								if(e.errorCode=='EAPC001'){
									  AP.modal.alert( '모집이 종료 되었습니다.' ).addListener( 'modal-close', function () {
										  this.modal.close();
									  }.bind( this ));
								}else if(e.errorCode=='EAPC002'){
									 AP.modal.alert( '모집을 시작하지 않았습니다.' ).addListener( 'modal-close', function () {
										  this._modal.close();
									 }.bind( this ));
								}else if(e.errorCode=='EAPC004'){
									 AP.modal.alert( '청춘 강연 신청 기간이 아닙니다.' ).addListener( 'modal-close', function () {
										  this._modal.close();
									 }.bind( this ));
								}else {
								/*	AP.modal.alert( '그밖의 에러.' ).addListener( 'modal-close', function () {
									 this._modal.close();
								}.bind( this ));*/
							}
								
							}.bind( this )).always(function () {});
						}
					}.bind( this ));
				}.bind( this )
			});
		},

		// 신청완료
		_openReserveComplete: function ( data ) {
			//console.log(data);
			this._completeModal = AP.modal.full({
				title: '신청 완료',
				contents: {
					templateKey: 'common.loading-modal',
					templateModel: data
				}
			
			}).addListener( 'modal-before-close', function (e) {
				this._$completeModal.find( '.page_btns button' ).off( 'click' );
			}.bind( this )).addListener( 'modal-close', function (e) {
				this._completeModal = null;
				this._$completeModal = null;
			}.bind( this ));
			
			this._$completeModal = this._completeModal.getElement();

			var html = AP.common.getTemplate( 'display.brand.makeup-your-dream-complete', data['youthLectureReturn'] );

			this._$completeModal.find( '.layer_cont' ).html( html );
			this._$completeModal.find( '.btn_lg_neutral' ).on( 'click', function (e) {
			this._completeModal.close();
			this.dispatch( 'reserve-complete' );
			}.bind( this ));
		}
	});

	AP.makeupYourDreamReserve = new MakeupYourDreamReserve();
})( jQuery );