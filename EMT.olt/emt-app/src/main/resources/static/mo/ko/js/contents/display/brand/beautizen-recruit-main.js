/**
 * 뷰티즌 모집 메인 
 *
 * @Method:
 * setData
 *
 */

;(function ( $ ) {
	'use strict';

	var BeautizenRecruitMain = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .beautizen-recruit-main' );
			this._setEvent();	
			 
		},
		
		/** =============== Public Methods ================ */
	
		/** =============== Private Methods =============== */
		
		
		_setEvent: function () {
			// 지원서 작성
			this._$target.find('.page_btns .btn_lg_primary').on('click', function(e) { 
				
				e.preventDefault();
				
				AP.login().done( function () {
					
					AP.api.supportersRequsterinfo().done(function(result){ // 작성한 기록 조회 
						if(result.suppoters === null){
							
							location.href='/display/beautizen_regist?displayMenuId=beautizen_regist';
						
						}else {
							var modal = AP.modal.info({
								title: '지원 내역 확인',
								contents: '작성한 지원서가 존재합니다.',
								confirmLabel: '확인',
							}).addListener( 'modal-close', function (e) {
								if(e.closeType === 'close'){
									this.close(); 
								}
							}.bind(this)); 
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
				});
			}.bind(this)); 
			
			// 지원서 수정
			this._$target.find('.page_btns .btn_lg_secondary').on('click', function(e) { 
				
				e.preventDefault();
				
				AP.login().done( function () {
					
					AP.api.supportersRequsterinfo().done(function(result){ // 작성한 기록 조회 
						
						if(result.suppoters === null){ 
							var modal = AP.modal.info({
								title: '지원 내역 확인',
								contents: '지원 내역이 없습니다.',
								confirmLabel: '확인',
							}).addListener( 'modal-close', function (e) {
								if(e.closeType === 'close'){
									this.close(); 
								}
							}.bind(this)); 
						}else {
							location.href='/display/beautizen_update?displayMenuId=beautizen_update';
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
					
				});
			}.bind(this)); 
			
		}
		
		/** =============== function Methods =============== */
	});	
		

	AP.beautizenRecruitMain = new BeautizenRecruitMain();
})( jQuery );