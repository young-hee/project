/**
 * 뷰티즌 신청 main 페이지  
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
			// 지원서 수정
			this._$target.find('.page_btns .btn_lg_bordered').on('click', function (e){
				e.preventDefault(); // 페이지 위로 이동 금함
				
				AP.login().done( function () { // 로그인이 안되어있으면, 로그인을 하도록 
					AP.api.getLoginMemberInfo().done(function(result){
					
						if(result.memberSn !== 0 || result.memberSn !== null){ // 정상으로 로그인이 되었으면   
							// 수정화면으로 이동
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
						}else { // 로그인을 했음에도 memberSn 이 없다면 로그인 페이지로 
	 
								AP.login.go();
						} 
					})
				}); 
			}.bind(this));
			
			// 지원서 작성
			this._$target.find('.page_btns .btn_lg_primary').on('click', function (e){
				e.preventDefault(); // 페이지 위로 이동 금함
				AP.login().done( function () { // 로그인이 안되어있으면, 로그인을 하도록 
					AP.api.getLoginMemberInfo().done(function(result){
					
						if(result.memberSn !== 0 || result.memberSn !== null){ // 정상으로 로그인이 되었으면   
							// 수정화면으로 이동
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
						}else { // 로그인을 했음에도 memberSn 이 없다면 로그인 페이지로 
	 
								AP.login.go();
						} 
					})
				}); 
			}.bind(this));
			
		}
		/** =============== function Methods =============== */
		
		
	});

	AP.beautizenRecruitMain = new BeautizenRecruitMain();
})( jQuery );