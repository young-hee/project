/**
 * 이벤트 댓글 modal 작성, 수정 (이벤트)
 * Events:
 * 		success		새로운 댓글을 등록, 수정 성공 했을때
 */
;(function ( $ ) {
	'use strict';

	var CommentWriteModal = $B.Class.extend({

		/**
		 * @param {Int} planDisplaySn
		 */
		initialize: function ( planDisplaySn, eventTitle ) {
			this._planDisplaySn = planDisplaySn;
			this._eventTitle = eventTitle;
			this._member = null;
			this._getLoginMemberInfo();
		},

		/** =============== Public Methods =============== */

		open: function () {
			this._openModal();
		},

		modify: function ( data ) {
			this._openModal( data );
		},
		
		//단순 참여
		participation : function(){
			var defer = new $.Deferred();

			AP.api.planDisplaySimpleParticipated( null, {
				 planDisplaySn : this._planDisplaySn
				,participantComment: '참여'
				,termsAgreeYn : "true"
			}).done(function ( result ) {
				 
				var data = result.planDisplayAwards;
				console.log(data);
				//댓글 저장 후 '즉시당첨' 의 '당첨' 되었을 경우
				if( data.eventWinStatus == 'Win' ){
					var awards = data.awards;
			
					AP.winningPop.open( this._eventTitle, data );
			
				}else if(data.eventWinStatus === 'Participated'){ // 종료 후 결과 발표
		        	 
		        	  AP.modal.info({
							title: '이벤트 참가',
							contents: '이벤트에 참여 되었습니다. <br> 이벤트 종료 후 당첨 결과를 확인해 주세요.', 
							confirmLabel: '확인',	
						}).addListener( 'modal-close', function (e) {
							if(e.closeType === 'close'){
								this.close(); 
							}
						}.bind(this)); 
		          } 
			}.bind(this))
			.fail(function ( xhr ) {
				if ( xhr.errorCode === 'EAPI004' ) {
					AP.login({trigger: true});
				} else if ( AP.message[xhr.errorCode] != undefined ) {
					AP.modal.alert( AP.message[xhr.errorCode] );
				} else {
					AP.modal.alert( xhr.errorMessage );
				}
			}.bind(this));

			return defer.promise();
		},


		/** =============== Private Methods =============== */
		//로그인 정보 가져오기
		_getLoginMemberInfo : function(){
			AP.api.getLoginMemberInfo()
			.done(function(result){
				this._member = result;
			}.bind(this))
			.fail(function(){
				
			}.bind(this));
		},

		//댓글 작성 저장
		_save: function ( formData ) {
			var defer = new $.Deferred();

			AP.api.planDisplayParticipated( null, formData )
				.done(function ( result ) {
					var data = result.planDisplayAwards;
					
					//댓글 저장 후 '즉시당첨' 의 '당첨' 되었을 경우
					if( data.eventWinStatus == 'Win' ){
						var awards = data.awards;
						var prodObj = _.where(awards, {awardTgtCode : "Prod"});
						data.awards = prodObj;
						
						//경품이 상품일 경우 배송지 입력 폼을 띄움
						if( prodObj.length > 0 ){
							data.member = this._member;
							AP.winningPop.open( this._eventTitle, data );
						}else{
							defer.resolve();
						}
						this.dispatch( 'success' );
					} else {
						defer.resolve();
						this.dispatch( 'success' );
					}
				}.bind(this))
				.fail(function ( xhr ) {
					if ( xhr.errorCode === 'EAPI004' ) {
						AP.login({trigger: true});
					} else if ( AP.message[xhr.errorCode] != undefined ) {
						AP.modal.alert( AP.message[xhr.errorCode] );
					} else {
						AP.modal.alert( xhr.errorMessage );
					}
				}.bind(this));

			return defer.promise();
		},

		//댓글 수정 저장
		_modify: function ( formData ) {
			var defer = new $.Deferred();

			AP.api.updateParticipated( null, formData )
				.done(function ( result ) {
					defer.resolve();
					this.dispatch( 'success' );
				}.bind(this))
				.fail(function ( xhr ) {
					if ( xhr.errorCode === 'EAPI004' ) {
						AP.login({trigger: true});
					} else if ( AP.message[xhr.errorCode] != undefined ) {
						AP.modal.alert( AP.message[xhr.errorCode] );
					} else {
						AP.modal.alert( xhr.errorMessage );
					}
				}.bind(this));

			return defer.promise();
		},

		_openModal: function ( data ) {
			this._modal = AP.modal.info({
				title: '댓글 	작성/수정하기',
				contents: {
					templateKey: 'display.events.comment-write-modal',
					templateModel: {
						planDisplaySn: this._planDisplaySn,
						data: data
					}
				},
				sizeType: 'L'
			});

			this._$modal = this._modal.getElement();

			this._validator = this._$modal.find( 'form.validate' ).validate({
				submitHandler: function ( form, e ) {
					e.preventDefault();

					var formData = new FormData( form );
					this._$modal.find( '.ui_input_images' ).inputImages( 'extendFormData', formData );

					if ( $(form).hasClass('modify') ) {
						this._modify( formData ).done( function () {
							AP.modal.alert( '수정 되었습니다.' ).addListener( 'modal-close', function (e) {
								//this._modal.close();
								$('.layer_close').click();
							}.bind(this));
						});
					} else {
						this._save( formData, $(form).hasClass('modify') ).done( function () {
							AP.modal.alert( '입력이 완료되었습니다.' ).addListener( 'modal-close', function (e) {
								//this._modal.close();
								$('.layer_close').click();
							}.bind(this));
						});
					}
				}.bind(this)
			});

			this._modal.addListener( 'modal-before-close', function (e) {
				//remove
				this._$modal.find( 'textarea, input:text' ).inputLimits( 'clear' ).placeholder( 'clear' );
				this._$modal.find( '.ui_input_images' ).inputImages( 'clear' );
				this._$modal.find( '.ui_input_images .btn_del.modify_img' ).off( 'click' );
				this._validator.destroy();
			}.bind(this));

			//set
			this._$modal.find( 'textarea, input:text' ).inputLimits().placeholder();
			this._$modal.find( '.ui_input_images' ).inputImages();
			this._$modal.find( '.ui_input_images' ).on( 'click' );
			this._$modal.find( '.ui_input_images .btn_del.modify_img' ).on( 'click', function (e) {
				var eventCommentImgSn = $( e.currentTarget ).data( 'event-comment-img-sn' ),
					input = '<input type="hidden" name="deleteEvalImgSnList" value="' + eventCommentImgSn + '">';

				this._$modal.find( 'form.validate' ).append( input );
				$( e.currentTarget ).closest( 'li' ).remove();
			}.bind( this ));
		}

	});


	AP.CommentWriteModal = CommentWriteModal;
})( jQuery );