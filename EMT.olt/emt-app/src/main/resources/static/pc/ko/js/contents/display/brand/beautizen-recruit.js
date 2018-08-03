/**
 * 뷰티즌 신청하기 
 *
 * @Method:
 * setData
 *
 */

;(function ( $ ) {
	'use strict';

	var BeautizenRecruit = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .beautizen-recruit' );
			this._data = null;
			//this._$deleteBtn = this._$target.find( '.activities_history .btn_delete');
			
			this._load();
			this._setEvent();
			this._setPlugins(); 
			
			this._setMobileVerification();
			this._mobileVerifSn = '';
			
			
		},
		
		/** =============== Public Methods ================ */
		
		setData:function(data){
		this._data = data;
		
			console.log(AP.DISPLAY_MENU_ID);
			
			if(AP.DISPLAY_MENU_ID === 'beautizen_update' ){
				
				if(this._data === null){ //한번도 저장한 적이 없다면
					
				}else {
				
					this._loading_modify(this._data); // 수정화면으로 진입 : 한번이라도 작성해서 저장한 적이 있다면
				}
			}; 
		
			
		},
		
		/** =============== Private Methods =============== */
		_setPlugins: function () {
			this._$target.find( '.ui_input_images' ).inputImages();
		},
		
		//휴대폰 인증 
		_setMobileVerification: function () {
			
			var $phoneSelect = this._$target.find( '#phoneCorp' ),
			$phoneNo = this._$target.find( 'input[name="prePhoneNo"]' ),
			$snsNum = this._$target.find( 'input[name="smsNum"]');
			// 인증번호 요청
			var timer = new AP.common.timeCountDown(3);
			
			
			this._$target.find( '#certBtn' ).on( 'click', function (e) {
				
				if ( $phoneSelect.valid() && $phoneNo.valid() ) {
					AP.mobileVerification.request( $phoneNo.val());
					$( e.target ).hide();
					$( e.target ).siblings( '#reCertBtn' ).show();
					timer.start();
				} else {
					if ( !$phoneSelect.valid() ) {
						AP.modal.alert( $phoneSelect.data( 'msg-required' ));
						return;
					}
					if ( !$phoneNo.valid() ) {
						AP.modal.alert( $phoneNo.data( 'msg-required' ));
					}
				}
			}.bind( this ));

			// 인증번호 재요청
			this._$target.find( '#reCertBtn' ).on( 'click', function (e) {
			
				if ( $phoneSelect.valid() && $phoneNo.valid() ) {
					AP.mobileVerification.request( $phoneNo.val());
					$( e.target ).siblings( '#reCertBtn' ).show();
					timer.stop();
					timer.start();
				} else {
					if ( !$phoneSelect.valid() ) {
						AP.modal.alert( $phoneSelect.data( 'msg-required' ));
						return;
					}
					if ( !$phoneNo.valid() ) {
						AP.modal.alert( $phoneNo.data( 'msg-required' ));
					}
				}
			}.bind( this ));

			// 인증번호 받기
			AP.mobileVerification.addListener( 'request-verify-no', function (e) {
				this._mobileVerifSn = e.data.mobileVerifSn.mobileVerifSn;
				this._$target.find( '.certification_btn' ).prop( 'disabled', false );
			}.bind( this ));

			// 재전송 인증번호 받기
			AP.mobileVerification.addListener( 're-request-verify-no', function (e) {
				this._mobileVerifSn = e.data.mobileVerifSn.mobileVerifSn;
				timer.stop();
				timer.start();
			}.bind( this ));

			// 인증 확인
			this._$target.find( '.certification_btn' ).on( 'click', function (e) {
				 console.log(this._mobileVerifSn); 
				if ( $snsNum.valid() ) {
					
					AP.mobileVerification.confirm( this._mobileVerifSn, $snsNum.val() );
					 
				} else {
					if(!$snsNum.valid()){
						AP.modal.alert( $snsNum.data( 'msg-required' ));
						return; 
					}
				}
			}.bind( this ));

			AP.mobileVerification.addListener( 'confirm-verify-no', function (e) {
				if ( e.data.result == true ) {
					this._$target.find( 'input[name=verifyCertification]' ).val( 'Y' );
					AP.modal.alert( $snsNum.data( '인증 되었습니다.' ));
				} else {
					AP.modal.alert( e.data.errorMessage );
				}
			}.bind( this ));
		},
		
		_setEvent: function () {
			
			// 초기화
			this._$target.find('button.type').on('click', function (e){
				 
				this._$target.find( 'form.validate' )[0].reset(); 
				this._$target.find( 'textarea, input:text' ).inputLimits( 'upadted' ).placeholder( 'updated' );
				var selectBoxs = this._$target.find('select'); 
				$.each(selectBoxs, function( id, select){ 
					$(select).val(''); 
					$(select).selectBox('updated');	
				});
				this._$target.find( '.ui_input_images' ).inputImages('clear'); 
				this._$target.find( '.ui_input_images' ).inputImages(); 
				validator.destroy();
				
			}.bind(this));
			// sns 등록 팝업
			this._$target.find('.snsUrl ').on('click', function (e){
				this._openSnsModal();
			}.bind(this));
			
			//대외 활동 추가  히스토리 저장하는 방법 확인
			this._$target.find( '.btn_add' ).on( 'click', function (e) {
				
				var count = this._$target.find('.activities_history .ui_table').length
				 
				if(count > 9 ){ // pc기준 10개까지 레이어 추가 작성 
					AP.modal.alert( '대외 활동 추가 작성은 10개까지만 가능합니다.');
				}else {
					this._addActivities();
					
				}
				
			}.bind( this ));
			// 대외활동 삭제 
			
			/*this._$deleteBtn.on('click' , function (e) {
				
				console.log(e); 
			}.bind( this ));*/
			
			this._$target.find('.activities_history button' ).on( 'click', function (e) {

				console.log('삭제버튼 찾기'); 
			}.bind( this ));
			
			// 임시 저장  validate noCheck
			this._$target.find( '.form_btns .temp' ).on( 'click', function (e) {  
				  
				this._submit(this._$target.find( 'form.validate' )[0], 'Temp'); 
				
			}.bind( this ));
			
			// 최종 제출하기 validate Check
			this._$target.find( '.form_btns .complete' ).on( 'click', function (e) {
				
				this._$target.find( 'input[name=verifyCertification]' ).val( 'Y' );
				
				this._$target.find( 'form.validate' ).submit(); 
				
			}.bind( this ));
						
			// 전체 동의
			this._$target.find( 'input#check_all' ).on( 'change', function (e) {
				
				if ( $( e.target ).prop('checked') ) {
					$( e.target ).closest( '.relative' ).find( 'input' ).prop( 'checked', true );
				}else {
					$( e.target ).closest( '.relative' ).find( 'input' ).prop( 'checked', false );
				}
			}.bind( this ));
			
			// submit
		var validator = this._$target.find( 'form.validate' ).validate({
				
				submitHandler: function ( form, e ) {
					
					var confirmModal = AP.modal.info({
						title: '제출하기',
						contents: '지원하시겠습니까?',
						confirmLabel: '확인',
						cancelLabel: '취소'
					}).addListener( 'modal-close', function (e) {}.bind(this)) ; 
					
					var $confirmModal = confirmModal.getElement();

					$confirmModal.find( '.btn_lg_secondary' ).on( 'click', function (e) { // 취소
						confirmModal.close();
					}.bind(this)); 
					
					$confirmModal.find( '.btn_lg_neutral' ).on( 'click', function (e) { // 확인
						confirmModal.close();
						this._submit(form, 'Complete');
					}.bind(this));
					
				}.bind( this) 		
				
			}); 
			
		},
		/** =============== function Methods =============== */
		
		// 대외활동 추가 레이어 
		_addActivities :function(){
			
			var count = this._$target.find('.activities_history .ui_table').length; // 추가한 갯수 layer 갯수 일단 1부터 시작 작성 폼
			 
			var activity = this._$target.find('.activities_history .ui_table#activity_0')[0]; 
			
			var activityData = {'layerCnt' : count,
								'activityType': $(activity).find('select[name=activityType]').val(),
							  'activityName' :$(activity).find('input[name=activityName]').val() ,
							  'activityStartDate' : $(activity).find('input[name=activityStartDate]').val(),
							  'activityEndDate': $(activity).find('input[name=activityEndDate]').val() ,
							  'activityBodyText': $(activity).find('textarea[name=activityBodyText]').val()}; 
			
			var activitiesData = JSON.parse(JSON.stringify(activityData)) ;
			
			var html = AP.common.getTemplate( 'display.brand.beautizen-activities-layer', activitiesData);

			
			this._$target.find('div.activities_history').append(html);
			
			var selectBoxs = this._$target.find('div#activity_'+count+' select');
			var	activity01 = ['대학생 프로그램','공모전','기타대외활동','학생회','동아리'];// 대외활동 유형 
			   
			    $.each(selectBoxs, function( id, select){ 
					
			    	$(this).selectBox('clear');
					$(this).selectBox(); 
					$.each( eval(select.id) , function(index, value){
							 
						$(select).append($('<option>',{value:value, id: index , text:value}));
						
					});
					$(this).selectBox('updated'); 
				});
			    
			    $(selectBoxs[0]).val(activitiesData.activityType);
			    
			    $(selectBoxs[0]).selectBox('updated'); 
			    
			    this._$target.find('div[name='+count+'] textarea,input:text').placeholder( 'updated' ); // 변경된 내용 업데이트
			    			    
				$(activity).find('select[name=activityType]').val('');
				$(activity).find('select[name=activityType]').selectBox('updated');
				
				$(activity).find('input[name=activityName]').val('');
				
				$(activity).find('input[name=activityStartDate]').val(''); 
				$(activity).find('input[name=activityEndDate]').val('');
				
				$(activity).find('textarea[name=activityBodyText]').val('');
				
				$(activity).find('textarea , input:text').placeholder('updated');  // 기본 폼 업데이트 
				$(activity).find('textarea , input:text').placeholder('');
				
				this._$target.find('div#activity_'+count+' .btn_delete').off('click');
				
				this._$target.find('div#activity_'+count+' .btn_delete').on('click',function(e){
					 
					this._$target.find('.activities_history div#activity_'+count).remove();
					
					this._$target.find('.activities_history .h_'+count).remove();
				}.bind(this));
				
		},	
		
		_submit : function(paramData, btEvent){
			//console.log(paramData); 
		
			var formData = new FormData(paramData); 
			formData.append('requestStatus', btEvent);
			 
			AP.login().done( function () { // 로그인으로 
				 
				this._api = AP.api.requestBeautizen( {}, formData ).done(function (result) {

					if(result.booleanResult){ // 잘 저장되었으면 
						if(btEvent === 'Temp'){ // 임시면 
							AP.modal.alert( '지원서가 임시저장 되었습니다.');
						}else if(btEvent === 'Complete'){

							this.dispatch('reserve-complete'); 
						}
					}
				}.bind( this )).fail(function ( xhr ) {
					if ( xhr.errorCode === 'EAPI004' ) {
						//존재하지 않는 회원
						AP.login({
							trigger: true
						});
					}else {
						AP.modal.alert(AP.message.API_SAVE_ERROR);
					}
				}.bind( this ));
			}.bind( this ));
		},
		
			//모달 띄우기
		_openSnsModal: function(){
			
			var snsModal= AP.modal.info({
	            
				title: '페이스북 등록 방법',
	                contents : {
	                	  templateKey : 'display.brand.beautizen-sns-modal' // display/brand/beautizen-sns-modal.js
	                }
				}).addListener( 'modal-close', function (e) {
					
			}.bind(this));
			
			var $snsModal = snsModal.getElement();

			$snsModal.find( '.btn_lg_secondary' ).on( 'click', function (e) { // 취소
				snsModal.close();
			}.bind(this)); 
			
			$snsModal.find( '.btn_lg_neutral' ).on( 'click', function (e) { // 확인
				 
				 var snsUrl  = $snsModal.find('.form .input_wrap #blog_url').val();
				 snsModal.close();
				 this._$target.find('.input_wrap input#sns_url').val(snsUrl).placeholder('updated'); 
				
			}.bind(this));
		},
		
		// 수정화면 로딩( 이전에 입력한 데이터가 있는 경우 
		_loading_modify :function(supporters){
			//this._$target.find( 'textarea, input:text' ).placeholder('clear');
			this._$target.find('div.clear').empty(); 
			var html = AP.common.getTemplate( 'display.brand.beautizen-modify', supporters);
			
			this._$target.find('div.clear').html(html); 
			this._$target.find( 'textarea, input:text' ).placeholder();
			
			
			this._$target.find( 'textarea, input:text' ).inputLimits( 'upadted' ).placeholder( 'updated' );
			
			this._setEvent();
			this._load();
			//this._setMobileVerification();
			this._setPlugins();
			//placeholder 초기화
			
			//preLocal, academic04, academic05, academic01
			var selectBoxs = this._$target.find('select'); 
			
			$.each(selectBoxs, function( id, select){ //4번 select 구역

				$.each(supporters, function(id, value){
 
							if(select.name === id) {
								$(select).val(value); 
								$(select).selectBox('updated');	
							}
							if(id === 'requesterAddress'){
								$(select).val(this.address1); 
								
							} 
							if(id === 'requesterPhoneNo'){
								$(select).val(this.address1); 
							
							}
							
							$(select).selectBox('updated');
					} );
					
			});
		
		},
	
		// 셀렉트박스 셋팅
		_load : function(){

			var phoneCorp = ['SKT','KT','LG U+','SKT 알뜰폰','KT 알뜰폰','LG U+ 알뜰폰']; // 통신사  
			var preLocal = ['강원도', '경기도', '경상남도', '경상북도', '광주광역시', '대구광역시', '대전광역시', '부산광역시', '서울특별시', '세종특별자치시', '울산광역시', 
				'인천광역시', '전라남도', '전라북도', '제주특별자치도', '충청남도', '충청북도']; // 지역
			var academic04 = ['1','2','3','4']; // 학년
			var	academic05 = ['1','2','3','4','5','6','7','8','9','10'];// 이수 학기
			var	activity01 = ['대학생 프로그램','공모전','기타대외활동','학생회','동아리'];// 대외활동 유형 
			
			var selectBoxs = this._$target.find('select'); 
		
			$.each(selectBoxs , function(index , object){
				
				$(this).selectBox('clear');
				$(this).selectBox(); 
				$.each( eval(object.id) , function(index, value){
						 
					$(object).append($('<option>',{value:value, id: index , text:value}));
					
				});

				$(this).selectBox('updated'); 
				
			}); 
			
		}
	});

	AP.beautizenRecruit = new BeautizenRecruit();
})( jQuery );