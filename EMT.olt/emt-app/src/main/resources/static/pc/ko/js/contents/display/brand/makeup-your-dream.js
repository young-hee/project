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
			this._$target = $( '#ap_container .makeup-your-dream' );
			this._data = null;
			this._$target.find( '#accompanyInfo' ).hide();
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

				if($( e.target ).val() == 'Y'){
					this._$target.find( '#accompanyInfo' ).show();
					$('input[name=companionAgeGrp]').attr('required','required');
					$('input[name=companionGender]').eq(0).attr('required','required');
					this._$target.find( '#accompanyInfo input[type=radio]').eq(0).val('Female');
					this._$target.find( '#accompanyInfo input[type=radio]').eq(1).val('Male');
				}else {
					this._$target.find( '#accompanyInfo' ).hide();
					$('input[name=companionAgeGrp]').attr('required','');
					$('input[name=companionGender]').eq(0).attr('required','');
					this._$target.find( '#accompanyInfo input').val('');
					this._$target.find( '#accompanyInfo input').blur();
					this._$target.find( '#accompanyInfo .input_wrap').removeClass('error');
					this._$target.find( '#accompanyInfo input[type=radio]').val('').prop('checked',false);
					$( '#accompanyInfo select' ).val( this._$target.find( '#accompanyInfo select option:eq(0)').text() );
					$( '#accompanyInfo select' ).selectBox( 'updated' );
				}
			}.bind( this ));
			
			// submit
			this._$target.find( 'form.validate' ).validate({
				
				submitHandler: function ( form, e ) {
					AP.modal.confirm( '해당 내용으로 <br>신청하시겠습니까?' ).addListener( 'modal-close', function (e) {
						if ( e.closeType == 'confirm' ) {
							var formData = new FormData( form );
							
								AP.api.requestYouthLecture( {}, formData ).done(function ( result ) {
									
									//console.log(result); 
									
									var form = $('<form></form>');
									form.attr('action' , '/display/makeup_your_dream_reserve'); 
									form.attr('method','post');
									
									var youthLectureReturn = result.youthLectureReturn;

									this._$target.append(form);
									
									$('<input/>').attr({type:'hidden', name:'preName', value: youthLectureReturn.requesterName.name1}).appendTo(form); 
									$('<input/>').attr({type:'hidden', name:'prePhnNo', value:youthLectureReturn.requesterPhoneNo.phoneNo}).appendTo(form); 
									$('<input/>').attr({type:'hidden', name:'requesterAgeGrp', value:youthLectureReturn.requesterAgeGrp}).appendTo(form); 
									$('<input/>').attr({type:'hidden', name:'requesterGender', value:youthLectureReturn.requesterGender}).appendTo(form); 
									$('<input/>').attr({type:'hidden', name:'preCpnName', value:youthLectureReturn.companionName.name1}).appendTo(form); 
									$('<input/>').attr({type:'hidden', name:'preCpnNo', value:youthLectureReturn.companionPhoneNo.phoneNo}).appendTo(form);
									$('<input/>').attr({type:'hidden', name:'companionAgeGrp', value:youthLectureReturn.companionAgeGrp}).appendTo(form); 
									$('<input/>').attr({type:'hidden', name:'companionGender', value:youthLectureReturn.companionGender}).appendTo(form); 
									$('<input/>').attr({type:'hidden', name:'requestReason', value:youthLectureReturn.requestReason}).appendTo(form);
									
									form.submit();
									
							}.bind( this )).fail(function (e) {
								console.log( 'error', e );
					    	}.bind( this )).always(function () {});
						}
					}.bind( this ));
				}.bind( this )
			});
		},
	});

	AP.makeupYourDreamReserve = new MakeupYourDreamReserve();
})( jQuery );