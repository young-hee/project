/**
 * 뷰티즌 신청하기 
 *
 * @Method:
 * setData
 *
 */

;(function ( $ ) {
	'use strict';

	var BeautizenRecruitReserve = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .beautizen_recruit_reserve' );
			this._data = null;
			this._setEvent();	
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
						
						console.log(e.currentTarget.parents()); 
						cofirmModal.close();
						// submit
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
			 
			if(btEvent === 'temp'){
				var formData = new FormData(paramData); 
				formData.append('requestStatus', 'Temp');
			}
			AP.login().done( function () { // 로그인으로 
				
				this._api = AP.api.requestBeautizen( {}, paramData ).done(function (result) {

					if(result.booleanResult){ // 잘 저장되었으면 
						if(btEvent === 'temp'){ // 임시면 
							AP.modal.alert( '지원서가 임시저장 되었습니다.');
						}else if(btEvent === 'nextConfirm'){
							this.dispatch( 'reserve-introduce' );
						}else if(btEvent ==='confirm'){
							this.dispatch('reserve-complete'); 
						}
					}
				}.bind( this )).fail(function ( xhr ) {
				
					if ( xhr.errorCode === 'EAPI004' ) {
						//존재하지 않는 회원
						AP.login({
							trigger: true
						});
					}
				}.bind( this ));
			}.bind( this ));
		}
	});

	AP.beautizenRecruitReserve = new BeautizenRecruitReserve();
})( jQuery );