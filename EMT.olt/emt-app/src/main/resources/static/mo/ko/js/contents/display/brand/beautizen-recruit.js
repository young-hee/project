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
			this._setPage(); 
				
			this._clkBtn = null;
			this._htmlTag = null;
			this._count = 0; 
			 
		},
		
		/** =============== Public Methods ================ */
		
		setData:function(data){
		this._data = data;
		console.log(this._data); 
		//var html = AP.common.getTemplate( 'display.brand.beautizen-reserve-temp-bagic', this._data );
		//this._$target.find('form.validate').html(html);
		
		//AP.DISPLAY_MENU_ID: "beautizen_introduce"
		console.log(AP.DISPLAY_MENU_ID) // : "beautizen_introduce")
		if(AP.DISPLAY_MENU_ID === 'beautizen_introduce'){
			
		};
		
	},
		
		/** =============== Private Methods =============== */
	
	_setPlugin: function(){
		
		this._$target.find('.ui_input_images' ).inputImages();
		this._$target.find('.ui_spinner' ).spinner();
		this._$target.find('textarea[maxlength]' ).inputLimits();// 글자수 제한
		
	},
	_setPage:function(){
		
		this._setEvent();
		this._load();
		this._setPlugin(); 
		this._setMobileVerification();
		this._mobileVerifSn = '';
		console.log(AP.DISPLAY_MENU_ID); 
		
		if(AP.DISPLAY_MENU_ID === 'beautizen_update'){ // 수정페이지 
			
			this._getSurpportersInfo();
			this._$target.find('.page').text('지원서 수정');
			this._$target.find('p.text_center').html('사진을 수정하시려면 터치해주세요. <br> 120X160 최적화');
			this._$target.find('.form_btns .Temp').remove();
						
		}else if(AP.DISPLAY_MENU_ID === 'beautizen_regist'){
			//
		}else if(AP.DISPLAY_MENU_ID === 'beautizen_introduce'){
			// 
		}
	},
	//휴대폰 인증 
	_setMobileVerification: function () {
		
		var $phoneSelect = this._$target.find( '#phoneCorp' ),
		$phoneNo = this._$target.find( 'input[name="cellNum"]' ),
		$snsNum = this._$target.find( 'input[name="smsNum"]');
		// 인증번호 요청
		var timer = new AP.common.timeCountDown(3),
		certTimeCnt = 0,
	    extTimeCnt = 0;
		
		
		this._$target.find( '#certBtn' ).on( 'click', function (e) {
			
			if ( $phoneSelect.valid() && $phoneNo.valid() ) {
				AP.mobileVerification.request( $phoneSelect.val(), $phoneNo.val());
				$( e.target ).hide();
				$( e.target ).siblings( '#reCertBtn' ).show();
				timer.start();
				certTimeCnt++;
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
		
		//"시간 연장"버튼
		this._$target.find( '#extTimeBtn').on('click', function(e) {
		    if (certTimeCnt == 0) {
		        AP.modal.alert("인증 먼저 받으세요.");
		    } else {
		        if (extTimeCnt < def_TimeCnt) {
		            //TODO:서버쪽 시간연장 로직 추가 확인
		            if (!t.isRunning()) {
		        	    AP.modal.alert("입력시간 초과했습니다. 인증번호 재전송 버튼을 눌러 인증 절차를 다시 진행하십시오.");
		            } else {
		                //3 minutes timer
		                if (timer.isRunning()) {
		                	timer.stop();
		                }
		                timer.start();
		                extTimeCnt++;
		            }
		        } else {
		            AP.modal.alert("시간연장은 3회만 가능합니다.");
		        }

		    }
		});

		// 인증번호 재요청
		this._$target.find( '#reCertBtn' ).on( 'click', function (e) {
		
			if ( $phoneSelect.valid() && $phoneNo.valid() ) {
				AP.mobileVerification.reRequest( this._mobileVerifSn );
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
			
			if ( e.data.result ) {
				AP.modal.alert( '인증 되었습니다.' );
				timer.stop();
				
				this._$target.find( 'input[name=verifyCertification]' ).val( 'Y' );
				
				this._$target.find( 'input[name=prePhoneNo]').prop('readOnly', true);
				this._$target.find( 'input[name=smsNum]').prop('readOnly', true);					
				
				this._$target.find( '.count[name=timer]' ).remove();
				this._$target.find( '.certification_btn' ).text('인증 되었습니다.');
				this._$target.find( '.certification_btn' ).prop('disabled', true); 
				this._$target.find( '.btn #reCertBtn ,#certBtn' ).hide();
				
				this._$target.find( '.certification_btn' ).prop('disabled', true); 
				
				
			} else {
				AP.modal.alert( e.data.errorMessage );
			}
		}.bind( this ));
	},
		
		_setEvent: function () {

			// Mobile: sns 등록 팝업
			this._$target.find('.btn .snsUrl ').on('click', function (e){
			
				 var snsModal = AP.modal.info({
	                title: '페이스북 등록 방법',
	                contents: { 
	                	templateKey : 'display.brand.beautizen-sns-modal' // display/brand/beautizen-sns-modal.js 
	                }
	            
	            }).addListener( 'modal-before-close', function (e) {
	            	var $parentsSnsUrl = $( e.currentTarget ).parent();
	            	
				}.bind(this)),
				
				$snsModal = snsModal.getElement();
				
				 $snsModal.find( '.btn_md_secondary' ).on( 'click', function (e) {
					$snsModal.find( '.layer_close' ).click();
				}.bind(this));
				 
				 $snsModal.find( '.btn_md_neutral' ).on( 'click', function (e) {
					 
					 var snsUrl  = $snsModal.find('.input_group input').val();
					  
					  snsModal.close();
					 this._$target.find('form.validate #snsUrl').val(snsUrl);
				}.bind(this));
				
			}.bind(this));
			
			//대외 활동 추가  히스토리 저장하는 방법 확인
			this._$target.find( '.btn_add' ).on( 'click', function (e) {

				this._setCopyData(this._$target.find('.activities_history')[0].innerHTML);
				this._$target.find('.activities_history').after(this._htmlTag);
								
			}.bind( this ));
		
			// 대외활동 삭제 
			this._$target.on( 'click', '.btn_remove', function (e) {
				
				console.log(e.target.id);
				
				console.log(this._$target.find('div').className === e.target.id); 
				var id = ''+e.target.id+''; 
		
					console.log(this._$target.find('div '+'#'+e.target.id+'.copy'));  
		
					this._$target.find('div '+'#'+e.target.id+'.copy').remove();
				
			}.bind(this));
			
			// 기본정보에서 임시 저장  validate noCheck
			this._$target.find( '.form_btns .temp' ).on( 'click', function (e) {  
				    
				this._submit(this._$target.find( 'form.validate' ), e.currentTarget.classList[1]); 
				
			}.bind( this ));
			
			// 기본정보에서 다음 저장 validate 체크
			this._$target.find( '.form_btns .nextConfirm' ).on( 'click', function (e) {
				 
				this._clkBtn = e.currentTarget.classList[1]; // [0] 은 css용 class
				this._$target.find( 'form.validate' ).submit();
				
			}.bind( this ));

			// 자기소개에서 임시 저장
			this._$target.find( '.form_btns .nextTemp' ).on( 'click', function (e) {
				
				this._submit(this._$target.find( 'form.validate' ), 'temp'); 
				
			}.bind( this ));
			
			this._$target.find( '.form_btns .confirm' ).on( 'click', function (e) {
				// 자기소개 제출 _ 최종저장
				
				this._clkBtn = e.currentTarget.classList[1]; // [0] 은 css용 class
				var formData = this._$target.find( 'form.validate' ); 
				
				var cofirmModal = AP.modal.info({
					title: '제출하기',
					contents: '지원하시겠습니까?',
					confirmLabel: '확인',
					cancelLabel: '취소'
				}).addListener( 'modal-before-close', function (e) {
					if(e.closeType === 'confirm'){
						
						cofirmModal.close();
						
					}
					
				}).addListener( 'modal-close', function (e) {
					if(e.closeType === 'close'){
						cofirmModal.close();
					}
				}.bind( this ));
				
				
			}.bind( this ));
						
			// submit
			
			this._$target.find( 'form.validate' ).validate({
				
				submitHandler: function ( form, e ) {
				 	
					var formData = new FormData(form);
					
					if(this._clkBtn === 'nextConfirm'){ // 임시면 저장할 유무 모달을 띄우지 않고  다음버튼이면 임시 유무의 모달을 띄운다. 
						
						AP.modal.confirm( '임시저장후 다음으로 이동하시겠습니까?' ).addListener( 'modal-close', function (e) {
							if ( e.closeType == 'confirm' ) {
								formData.append('requestStatus', 'Temp'); //
								formData.append('termsAgreeYn', 'Y');
								this._submit(formData, this._clkBtn);
							}
						}.bind( this ));
					}
					
					if(this._clkBtn === 'confirm'){ // 최종제출이면 requestStatus 에 상태값 Complete
						formData.append('requestStatus', 'Complete'); // 
						formData.append('termsAgreeYn', 'Y');
						this._submit(formData, this._clkBtn);
						
					}
					
				}.bind( this) 		
				
			}); 
			
			// 전체 동의
			this._$target.find( 'input#check_all' ).on( 'change', function (e) {
				
				if ( $( e.target ).prop('checked') ) {
					$( e.target ).closest( '.relative' ).find( 'input' ).prop( 'checked', true );
				}else {
					$( e.target ).closest( '.relative' ).find( 'input' ).prop( 'checked', false );
				}
			}.bind( this ));
			
		},
		/** =============== function Methods =============== */
		
		// 대외활동 추가 레이어 
		_setCopyData :function(data){
				this._htmlTag = null; 
			// 버튼을 누르면 복사할 태그를 저장해둔다 .
				this._htmlTag = '<div class="copy" id="count_'+this._count+'"><button type="button" class="btn_remove" id="count_'+this._count+'">삭제하기<i class="ico_trash"></i></button>'; 
				this._htmlTag += $B.object.clone(data);
				this._htmlTag += '</div>';
				this._count += 1; 
		},
		
		_submit : function(paramData, btEvent){
			 
			if(btEvent === 'Temp'){
				var formData = new FormData(paramData); 
				formData.append('requestStatus', 'Temp');
			}
			AP.login().done( function () { // 로그인으로 
				
				AP.api.requestBeautizen( {}, paramData ).done(function (result) {
console.log(result); 
					if(result.booleanResult){ // 잘 저장되었으면 
						if(btEvent === 'Temp'){ // 임시면 
							AP.modal.alert( '지원서가 임시저장 되었습니다.');
						}else if(btEvent === 'nextConfirm'){
							location.href="/display/beautizen_recruit?displayMenuId=beautizen_introduce";
						}else if(btEvent ==='Confirm'){
							this.dispatch('reserve-complete'); 
						}
					}
				}.bind( this )).fail(function ( xhr ) {
				 console.log(xhr); 
					if ( xhr.errorCode === 'EAPI004' ) {
						//존재하지 않는 회원
						AP.login({
							trigger: true
						});
					}
				}.bind( this ));
			}.bind( this ));
		},
		
		_getSurpportersInfo: function(){
			AP.api.supportersRequsterinfo().done(function(result){

				var formList = this._$target.find('form');
				 
				$.each(formList[0], function(inx, entities){
					// 사진, 전화번호, 거주지역, 학력, 이수학년
					$(this).val(result.suppoters[entities.name]);
				
					if(entities.name === 'cellNum'){// 전화번호
						$(this).val(result.suppoters.requesterPhoneNo.phoneNo);
					}
					if(entities.name === 'preLocal'){// 거주지역
						$(this).val(result.suppoters.requesterAddress.address1);
					}
					if(entities.name === 'picture'){ // 사진
						
						$('.ui_input_images .attach').append('<img src=' + JSON.stringify(result.suppoters.images.fileUrl) +'/>');
						 
						$(this).prop('required',false)
					}
					
				});
				
			}.bind(this)).fail(function(xhr){
				console.error(xhr); 
			}.bind(this));
			
			
		},
		
		_load: function(){
			
			var selectLists = this._$target.find('select'); 
			  
			var preLocal = ['강원도', '경기도', '경상남도', '경상북도', '광주광역시', '대구광역시', '대전광역시', '부산광역시', '서울특별시', '세종특별자치시', '울산광역시', 
				'인천광역시', '전라남도', '전라북도', '제주특별자치도', '충청남도', '충청북도']; // 지역
			var grade = ['1학년','2학년','3학년','4학년']; // 학년
			var	completeTerm = ['1학기 이수','2학기 이수','3학기 이수','4학기 이수','5학기 이수','6학기 이수','7학기 이수','8학기 이수','9학기 이수','10학기 이수'];// 이수 학기
		
			var selectsIds = { "preLocal" : preLocal , "grade" : grade, "completeTerm": completeTerm };
			  
			$.each(selectLists, function(inx, select){
				
				$.each(selectsIds[select.id], function(index, value){
					$(select).append($('<option>',{value:value, id: index , text:value}));
				});
			});
			
		}
		
	});

	AP.beautizenRecruit = new BeautizenRecruit();
})( jQuery );