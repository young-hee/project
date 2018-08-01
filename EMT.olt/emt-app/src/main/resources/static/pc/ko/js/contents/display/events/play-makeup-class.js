/**
 * 뷰티테스터
 *
 */

;(function ( $ ) {
	'use strict';

	var PlayMakeupClass = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.playMakeupClass' );
			this._setEvent();
			this._userInfo = null;
		},
		
		/** =============== Public Methods =============== */
		
		setDefaultData : function( data ){
			this._userInfo = data;
		},
		
		open: function () {
			var modal = AP.modal.open({
				 templateKey: 'display.events.layer-play-makeup'
				,sizeType: 'L'
				,templateModel: {
					userInfo : this._userInfo
				}
			});
			var $modal = modal.getElement();
			
			$modal.find('.btn_lg_neutral').on('click', function(e){
				e.preventDefault();
				var $form = $modal.find( 'form.validate' );
				if ( $form.valid() ) {
					
					this._save( $form ).done( function () {
						AP.modal.alert( '신청이 완료되었습니다.' ).addListener( 'modal-close', function (e) {
							modal.close();
						});
					});
				}
			}.bind(this));
			
			$modal.find('.btn_lg_secondary').on('click', function(e){
				modal.close();
			});
			
			/*
			$modal.find('#requestGrpName').val('에뛰듸 단체명'); 		//신청단체명
			$modal.find('#preHopeTmHour').val('1'); 					//희망시간
			$modal.find('#preHopeTmMin').val('20'); 					//희망시간
			$modal.find('#requestPersonnel').val('15'); 	//신청인원
			//$modal.find('#hopeThemeName').val(); //희망테마명
			$modal.find('#cellPhoneNo').val('01012345678'); 			//신청자 전화번호
			$modal.find('#termsAgreeYn').prop('checked', true); 			//약관동의여부
			$modal.find('#address1').val('서울특별시 서초구 효령로 253'); 			//매장 주소1
			$modal.find('#address2').val('서울특별시 서초구 효령로 253'); 			//매장 주소2
			$modal.find('#addQuestion1').val('test'); 			//추가질문1
			*/
			
			modal.addListener( 'modal-before-close', function (e) {
				$modal.find( 'textarea, input:text' ).inputLimits( 'clear' );
				$modal.find( 'select' ).selectBox( 'clear' );
			}.bind(this));
			
			$modal.find( 'textarea, input:text' ).inputLimits();
			$modal.find( '.ui_date_picker' ).datePicker();
			$modal.find( '.ui_find_addresses' ).findAddresses();
			$modal.find( 'input[placeholder]' ).placeholder();
			$modal.find( 'select' ).selectBox();
			
		},
		/** =============== Private Methods =============== */
		
		_save: function ( $form ) {
			
			var defer = new $.Deferred();
			var dt = new Date( $form.find('.ui_date_picker').datePicker("getDate"));
			dt.setHours( $form.find('#preHopeTmHour :selected').val() );
			dt.setMinutes( $form.find('#preHopeTmMin :selected').val() );
			
			var data = {
				requestGrpName 		: $form.find('#requestGrpName').val(), 			//신청단체명
				hopeDt 				: dt, 											//희망일자
				requestPersonnel 	: $form.find('#requestPersonnel').val(), 		//신청인원
				hopeThemeName 		: $form.find('#hopeThemeName :selected').val(), //희망테마명
				preCellPhoneNo 		: $form.find('#cellPhoneNo').val(),				//신청자 전화번호
				termsAgreeYn 		: $form.find('#termsAgreeYn').is(':checked') ? 'Y' : 'N' , //약관동의여부
				preZpCode 			: $form.find('#preZpCode').val(),				//우편번호
				preStoreAddress1 	: $form.find('#address1').val(), 				//매장 주소1
				preStoreAddress2 	: $form.find('#address2').val(), 				//매장 주소2
				addQuestion1 		: $form.find('#addQuestion1').val() 			//추가질문1
			};
			
			AP.api.visitEducations( null, data )
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
		
		_setEvent: function () {
			//신청하기
			this._$target.find( '.btn_lg_primary' ).on( 'click', function (e) {
				AP.login().done(function () {
					this.open();
				}.bind( this ));
			}.bind( this ));
		}
	});

	AP.PlayMakeupClass = new PlayMakeupClass();
})( jQuery );