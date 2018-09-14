/**
 * 댓글 : 이벤트 댓글
 *
 */
;(function ( $ ) {
	'use strict';

	var Comments = $B.Class.extend({

		/**
		 * @param {jQuery}	$target
		 * @param {Int}		planDisplaySn
		 */
		initialize: function ( $target, planDisplaySn, title ) {
			this._$target = $( $target );
			this._$listArea = this._$target.find( '.comment_list' );
			this._$participateBtn = this._$target.find( '#btn_regist' );
			this._$updateBtn = this._$target.find( '#btn_update' );
			this._$totalCnt = this._$target.find('.comment_tit>span');
			this._planDisplaySn = planDisplaySn;
			
			this._title = title;

			this._setEvents();
			this._getListDate( 0 );
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setEvents: function () {
			this._writeModal = new AP.CommentWriteModal( this._planDisplaySn, this._title )
				.addListener( 'success', function (e) {
					//this._getListDate( 0 );
				}.bind(this));
			
			/*
			 * 리뷰 등록
			this._$participateBtn.on( 'click', function (e) {
				AP.login().done( function () {
					this._writeModal.open();
				}.bind(this));
			}.bind(this));
			*/

			//참여하기
			this._$participateBtn.on( 'click', function (e) {
				AP.login().done( function () {
					$('#reg_form').submit();
				}.bind(this));
			}.bind(this));
			
			this._$updateBtn.on( 'click', function (e) {
				var form = $(e.currentTarget).parent().parent().parent().parent().find('#mod_form');
				//alert(form);
				AP.login().done( function () {
					$('form.modify').submit();
				}.bind(this));
			}.bind(this));
			
			this._$target.find( '.ui_input_images' ).inputImages('clear'); 
			this._$target.find( '.ui_input_images' ).inputImages();
			//this._getListDate( 0 );
			
			var validator = $('#reg_form').validate({
				
				submitHandler: function ( form, e ) {
					e.preventDefault();
					console.log(form);
					var formData = new FormData( form );
					//console.log(formData);
//					this._$participateBtn.on( 'click', function (e) {
//						AP.login().done( function () {
//							this._save( formData );
//						}.bind(this));
//					}.bind(this));
					$('#reg_form').find( '.ui_input_images' ).inputImages( 'extendFormData', formData );
					//this._$target.find( '.add_file' ).inputImages( 'extendFormData', formData );
					//console.log(formData);
					//this._save( formData );
					if ( $(form).hasClass('modify') ) {
						this._modify( formData );
					} else {
						//alert("dfdfdfdfdfsdsdfsd");
						this._save( formData );
					}
				}.bind(this)	
				
			});
			
			
			//본인 댓글 수정
			this._$listArea.on( 'click', '#btn_modify', function (e) {
				console.log(this._$target.find('.comment_write').find('textarea').eq(0).text());
				this._$target.find('.comment_write').find('textarea').eq(0).text('')
				this._$target.find('.comment_write').find('textarea').eq(0).attr('readonly', true);
				this._$target.find('.comment_write').find('.regist').attr('disabled', 'disabled');
					$.each(this._$listArea.find('.comment_write'), function(idx){
						//console.log(idx);
						//console.log($(this).find('.cont .comment_edit').css('display'));
						if($(this).css('display') == 'block'){
							$(this).find( '.add_file' ).inputImages('clear');
//							$(this).find('#btn_update').attr('id', 'btn_modify');
//							$(this).find('#btn_cancel').attr('id', 'btn_delete');
//							$(this).find('#btn_modify').text('수정');
//							$(this).find('#btn_delete').text('삭제');
//							$(this).find('.cont .text').show();
//							$(this).find('.cont .text_edit').text('');
							$(this).hide();
							return false;
						}
					});
					//console.log($(e.currentTarget).siblings().text());
//					$(e.currentTarget).text('수정하기');
//					$(e.currentTarget).attr('id', 'btn_update');
//					$(e.currentTarget).siblings().text('취소');
//					$(e.currentTarget).siblings().attr('id', 'btn_cancel');
//					$(e.currentTarget).parent().parent().find('.cont .text').hide();
//					$(e.currentTarget).parent().parent().find('.cont .text_edit').text($(e.currentTarget).parent().parent().find('.cont .text').text());
					$(e.currentTarget).parent().parent().parent().find('.comment_write').show();
					$( 'textarea' ).inputLimits();
					//$( 'input:file' ).inputFile();
					
					this._$target.find( '.add_file' ).inputImages('clear'); 
					this._$target.find( '.add_file' ).inputImages();
					
					var form = $(e.currentTarget).parent().parent().parent().parent().find('#mod_form');
					form.addClass('on');
					
//					var $fileTarget = $('.fileInput');
//					$fileTarget.on('change', function(){ 
//						console.log("change");
//						if(window.FileReader){
//							var fileName = $(this)[0].files[0].name; 
//						} else { // old IE 
//							var fileName = $(this).val().split('/').pop().split('\\').pop(); 
//						}
//						var fileCard = '<span>'+fileName+ '<a href="javascript:;" class="fileDel">삭제</a>'+'</span>'
//						$(".fileName").html(fileCard);
//						$('.fileDel').on('click', function(){
//							$(this).parent().remove();
//							$fileTarget.val('');
//						});
//					});
					
					
					var validator2 = $('.validate.modify.on').validate({
						
						submitHandler: function ( form, e ) {
							e.preventDefault();
							console.log(form);
							var defer = new $.Deferred();
							var formData = new FormData( form );
							//console.log(formData);
//							this._$participateBtn.on( 'click', function (e) {
//								AP.login().done( function () {
//									this._save( formData );
//								}.bind(this));
//							}.bind(this));
							$('.validate.modify.on').find( '.add_file' ).inputImages( 'extendFormData', formData );
							//this._$target.find( '.add_file' ).inputImages( 'extendFormData', formData );
							//console.log(formData);
							this._modify( formData );
//							if ( $(form).hasClass('modify') ) {
//								alert("dfdfdfdfdfsdsdfsd");
//								this._modify( formData );
//							} else {
//								this._save( formData );
//							}
						}.bind(this)	
						
					});
					
					this._$target.find( '.ui_input_images .btn_del.modify_img' ).on( 'click', function (e) {
						var eventCommentImgSn = $( e.currentTarget ).data( 'event-comment-img-sn' ),
							input = '<input type="hidden" name="deleteEvalImgSnList" value="' + eventCommentImgSn + '">';
						//alert(input);
						this._$target.find( 'form.validate.on' ).append( input );
						this._$target.find( 'form.validate.on' ).find('input[name=eventCommentImgSn]').val('');
						this._$target.find( 'form.validate.on' ).find('input:file').attr("disabled", false);
						$( e.currentTarget ).parent().remove();
					}.bind( this ));
			}.bind(this));
			
			//본인 댓글 삭제
			this._$listArea.on( 'click', '#btn_delete', function (e) {
				console.log($(e.currentTarget).data('plandisplay-comment-sn'));
				AP.login().done( function () {
					this._delete( $(e.currentTarget).data('plandisplay-comment-sn') );
				}.bind(this));
			}.bind(this));
			
			//본인 댓글 수정
			this._$listArea.on( 'click', '#btn_update', function (e) {
				AP.login().done( function () {
					//$('form.modify').submit();
					var form = $(e.currentTarget).parent().parent().parent().parent().find('#mod_form');
//					form.addClass('on');
					//alert(form.find('input[name=eventParticipantSn]').val());
					//var formData = AP.common.getFormData(form);
					//var formData = new FormData(form);
					//console.log(formData);
					//$(e.currentTarget).parent().parent().parent().find( '.add_file_wrap' ).inputImages( 'extendFormData', formData );
					//alert(formData);
					//this._modify(formData);

					
					$(form).submit();
				}.bind(this));
			}.bind(this));

			//취소
			this._$listArea.on( 'click', '#btn_cancel', function (e) {
				
				$(e.currentTarget).attr('id', 'btn_modify');
				$(e.currentTarget).siblings().attr('id', 'btn_delete');
				$(e.currentTarget).text('수정');
				$(e.currentTarget).siblings().text('삭제');
				$(e.currentTarget).parent().parent().find('.cont .text').show();
				$(e.currentTarget).parent().parent().find('.cont .text_edit').text('');
				$(e.currentTarget).parent().parent().find('.cont .comment_edit').hide();

			}.bind(this));
			
			//도움이되요
			this._$listArea.on( 'click', '.btn_good', function (e) {
				//$(this).toggleClass('on');
				AP.login().done( function () {
					$(e.currentTarget).toggleClass('on');
					if($(e.currentTarget).hasClass('on')){
						//console.log($(e.currentTarget).data('article-comment-sn'));
						this._recommendComment( $(e.currentTarget).data('planDisplay-comment-sn'), $(e.currentTarget) );
					}else{
						
					}
				}.bind(this));
			}.bind(this));
			
			//신고하기
			this._$listArea.on( 'click', '.btn_report', function (e) {
				//$(this).toggleClass('on');
				AP.login().done( function () {
					//신고하기 페이지로 이동 ($(e.currentTarget).data('planDisplay-comment-sn') 가지고)
//					$(e.currentTarget).toggleClass('on');
//					if($(e.currentTarget).hasClass('on')){
//						console.log($(e.currentTarget).data('planDisplay-comment-sn'));
//						this._recommendComment( $(e.currentTarget).data('planDisplay-comment-sn'), $(e.currentTarget) );
//					}else{
//						
//					}
				}.bind(this));
			}.bind(this));
		},

		_openDetail: function ( data ) {
			var modal = AP.modal.info({
					title: '댓글',
					contents: {
						templateKey: 'display.events.comment-detail-modal',
						templateModel: data
					},
					sizeType: 'L'
				}),
				$modal = modal.getElement();

			modal.addListener( 'modal-before-close', function (e) {
				//remove
				$modal.find( '.btn_delete' ).off( 'click' );
				$modal.find( '.btn_modify' ).off( 'click' );
			}.bind(this));

			//댓글 삭제(버튼 없어짐 - 처리 불가)
			$modal.find( '.btn_delete' ).on( 'click', function (e) {
				modal.close();
				this._delete( $(e.currentTarget).data('event-participant-sn') );
			}.bind(this));

			$modal.find( '.btn_modify' ).on( 'click', function (e) {
				modal.close();
				this._writeModal.modify( data );
			}.bind(this));

			$modal.find( 'img' ).imagesLoaded( function () {
				if ( modal ) modal.resetPosition();
			}.bind(this));
		},

		//댓글 수정 저장
		_modify: function ( formData ) {
			var defer = new $.Deferred();
			AP.api.updateParticipated( null, formData )
				.done(function ( result ) {
					defer.resolve();
					this.dispatch( 'success' );
					this._getListDate( 0 );
				}.bind(this))
				.fail(function ( xhr ) {
					alert(xhr.errorCode + " : " + xhr.errorMessage);
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
		//댓글 삭제
		_delete: function ( eventParticipantSn ) {
			var defer = new $.Deferred();
			console.log(this._planDisplaySn +" : "+ eventParticipantSn);
			AP.api.deleteParticipated( null, {
					planDisplaySn: this._planDisplaySn,
					eventParticipantSn: eventParticipantSn
				})
				.done(function ( result ) {
					this._getListDate( 0 );
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
		
		//댓글 작성 저장
		_save: function ( formData ) {
			
			var defer = new $.Deferred();
			
			AP.api.planDisplayParticipated( null, formData )
				.done(function ( result ) {
					console.log(result);
					var data = result.planDisplayAwards;
					
					//댓글 저장 후 '즉시당첨' 의 '당첨' 되었을 경우
					if( data.eventWinStatus == 'Win' ){
						var awards = data.awards;
						var prodObj = _.where(awards, {awardTgtCode : "Prod"});
						data.awards = prodObj;
						
						//경품이 상품일 경우 배송지 입력 폼을 띄움
//						if( prodObj.length > 0 ){
//							data.member = this._member;
//							AP.winningPop.open( this._eventTitle, data );
//						}else{
//							defer.resolve();
//						}
						this.dispatch( 'success' );
					} else {
						defer.resolve();
						this.dispatch( 'success' );
					}
					this._getListDate( 0 );
					this._$target.find( '#reg_form' ).find( '.ui_input_images' ).find('.fileName').find('span').remove();
					this._$target.find( '#reg_form' ).find('input:file').attr("disabled", false);
					$('#reg_form').find( '.ui_input_images' ).inputImages('clear'); 
					$('#reg_form').find( '.ui_input_images' ).inputImages();
					$( 'textarea' ).val('');
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
		
		//댓글 목록 데이타 가져오기
		_getListDate: function ( offset ) {
			if ( this._listApi ) this._listApi.abort();

			this._listApi = AP.api.planDisplayComments( null, {
				planDisplaySn: this._planDisplaySn,
				offset: offset
			}).done( function ( result ) {
				var data = result.eventParticipantResult;
				//console.log(this._$totalCnt.text());
				this._$totalCnt.text(data.totalCount);
				this._drawList( data );
			}.bind(this));
		},

		_drawList: function ( data ) {

			var html = AP.common.getTemplate( 'display.events.comment-list', data );

			//remove events
			this._$target.find( '.pagination' ).paging( 'clear' ).off( 'paging-change' );
			//this._$target.find( '.btn_detail' ).off( 'click' );

			this._$listArea.html( html );
			$('form.modify').find('input[name=planDisplaySn]').val(this._planDisplaySn);
			this._$target.find( '.pagination' ).paging({
				offset: data.offset,
				limit: data.limit,
				totalCount: data.totalCount
			}).on( 'paging-change', function (e) {
				this._getListDate( e.offset );
			}.bind(this));
//
//			this._$listArea.find( '.btn_detail' ).on( 'click', function (e) {
//				var eventParticipantSn = $( e.currentTarget ).data( 'event-participant-sn' ),
//					selectedData = _.findWhere( data.eventParticipants, {eventParticipantSn: eventParticipantSn} );
//
//				this._openDetail( selectedData );
//			}.bind(this));
		}

	});

	AP.Comments = Comments;
})( jQuery );