/**
 * 댓글 : 일반댓글, 라이브 댓글 (Ch.Etude Live)
 *
*/
;(function ( $ ) {
	'use strict';

	/**
	 * @param {Object}	options
	 * 	- {Boolean}		isLive				라이브 댓글인지 여부
	 * 	- {Boolean}		isScrollType		댓글 리스트가 스크롤 타입인지 여부
	 * 	- {Int}		 	planDisplaySn
	 */
	var Comments = $B.Class.extend({

		initialize: function ( options ) {
			this._$target = $( '.comment_area' );
			this._$total = this._$target.find( '.comment_total' );
			this._$input = this._$target.find( '.input_wrap .text' );
			this._$listArea = this._$target.find( '.comment_list' );
			this._$saveBtn = this._$target.find( '#btn_save' );
			this._$updateBtn = this._$target.find( '#btn_update' );
			this._$moreBtn = this._$target.find( '.btn_lg_more' );
			this._$goodBtn = this._$target.find( '.btn_good' );
			this._$reportBtn = this._$target.find( '.btn_report' );
			this._$sortBtn = this._$target.find( '.sort_util' );
			//this._$loading = this._$target.find( '.loading' );
			
			this._sort = 'New';
			this._options = options || {};
			this._listApi = null;
			this._offset = 0;

			if ( this._$target.length ) {
				this._setPlugins();
				this._setEvents();
				this._getListDate( true );
			}
			var _maxByte = 30;
			//this._$input.on( 'change keyup', eventHandler );
			this._$input.bind('change keyup input',function(e){
				var str = $( '.input_wrap .text' ).val();
	            var count = AP.common.getByteLength(str);
	            if ( AP.common.getByteLength(str) > _maxByte ) {
	                $('#btn_save').show();
	            }else{
	            	$('#btn_save').hide();
	            }
			});
			
			this._$sortBtn.find('li').bind('click', function(e){
				//this._$sortBtn.find('li').removeClass('on');
				$(this).addClass('on');
				$(this).siblings().removeClass('on');
				if($(this).attr('id') == 'sort_recommend'){					
					this._sort = 'Recommend';
				}
				console.log($(this).attr('id'));
				this._getListDate( true );
			});
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setPlugins: function () {
			this._$input.inputLimits();
		},

		_setEvents: function () {
			//댓글 등록
			this._$saveBtn.on( 'click', function (e) {
				var value = this._$input.val();

				if ( value ) {
					AP.login().done( function () {
						this._createComment( value );
					}.bind(this));
				}
			}.bind(this));
					
			//본인 댓글 수정저장
			this._$listArea.on( 'click', '#btn_update', function (e) {
				//var value = this._$input.val(); 수정 텍스트 확인				
				var value= $(e.currentTarget).parent().parent().find('.cont .text_edit').text();
				
				if ( value ) {
					this._updateComment( $(e.currentTarget).data('planDisplay-comment-sn'), value );
				}
			}.bind(this));
			
			//본인 댓글 수정
			this._$listArea.on( 'click', '#btn_modify', function (e) {
				AP.login().done( function () {
					$.each(this._$listArea.find('.comment_cont'), function(idx){
						//console.log(idx);
						//console.log($(this).find('.cont .comment_edit').css('display'));
						if($(this).find('.cont .comment_edit').css('display') == 'block'){
							$(this).find('#btn_update').attr('id', 'btn_modify');
							$(this).find('#btn_cancel').attr('id', 'btn_delete');
							$(this).find('#btn_modify').text('수정');
							$(this).find('#btn_delete').text('삭제');
							$(this).find('.cont .text').show();
							$(this).find('.cont .text_edit').text('');
							$(this).find('.cont .comment_edit').hide();
							return false;
						}
					});
					//console.log($(e.currentTarget).siblings().text());
					$(e.currentTarget).text('수정하기');
					$(e.currentTarget).attr('id', 'btn_update');
					$(e.currentTarget).siblings().text('취소');
					$(e.currentTarget).siblings().attr('id', 'btn_cancel');
					$(e.currentTarget).parent().parent().find('.cont .text').hide();
					$(e.currentTarget).parent().parent().find('.cont .text_edit').text($(e.currentTarget).parent().parent().find('.cont .text').text());
					$(e.currentTarget).parent().parent().find('.cont .comment_edit').show();
					//수정 text 표시
				}.bind(this));
			}.bind(this));
			
			//본인 댓글 삭제
			this._$listArea.on( 'click', '#btn_delete', function (e) {
				AP.login().done( function () {
					this._deleteComment( $(e.currentTarget).data('planDisplay-comment-sn') );
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
			
			//더보기
			this._$moreBtn.on( 'click', function (e) {
				this._getListDate();
			}.bind(this));

			if ( this._options.isScrollType ) {
				this._scrollEnd = new $B.event.ScrollEnd( this._$listArea )
					.gap({bottom: 20})
					.addListener( 'scrollbottom', function (e) {
						this._getListDate();
					}.bind(this)).trigger();
			}
		},

		_createComment: function ( str ) {
			AP.api.planDisplaySimpleParticipated( null, {
				planDisplaySn: this._options.planDisplaySn,
				participantCommentTitle:'',
				participantComment: str
			}).done( function ( result ) {
				this._getListDate( true );
				AP.modal.alert( '댓글이 등록 되었습니다.' );
			}.bind(this)).fail( function ( xhr ) {
				if ( xhr.errorCode === 'EAPI004' ) {
					AP.login({trigger: true});
				}
			}.bind(this));
		},
		
		_updateComment: function ( eventParticipantSn, str ) {
			AP.api.updateParticipated( null, {
				planDisplaySn: this._options.planDisplaySn,
				eventParticipantSn: eventParticipantSn,
				participantComment: str
			}).done( function ( result ) {
				this._getListDate( true );
				AP.modal.alert( '댓글이 수정 되었습니다.' );
			}.bind(this)).fail( function ( xhr ) {
				if ( xhr.errorCode === 'EAPI004' ) {
					AP.login({trigger: true});
				}
			}.bind(this));
		},

		_deleteComment: function ( eventParticipantSn ) {
			AP.api.deleteParticipated( null, {
				planDisplaySn: this._options.planDisplaySn,
				eventParticipantSn: eventParticipantSn
			}).done( function ( result ) {
				this._getListDate( true );
				AP.modal.alert( '댓글이 삭제 되었습니다.' );
			}.bind(this)).fail( function ( xhr ) {
				if ( xhr.errorCode === 'EAPI004' ) {
					AP.login({trigger: true});
				}
			}.bind(this));
		},
		
		_recommendComment: function ( eventParticipantSn, $good ) {
			AP.api.recommendParticipated( null, {
				planDisplaySn: this._options.planDisplaySn,
				eventParticipantSn: eventParticipantSn
			}).done( function ( result ) {
				//this._getListDate( true );
				alert($good.find('.num').text());
				$good.find('.num').text(Number($good.find('.num').text())+1);
			}.bind(this)).fail( function ( xhr ) {
				if ( xhr.errorCode === 'EAPI004' ) {
					AP.login({trigger: true});
				}
			}.bind(this));
		},

		//댓글 목록 데이타 가져오기
		_getListDate: function ( reset ) {
			
			if ( !this._options.isScrollType ) {
				//this._$loading.show();
				this._$moreBtn.hide();
			}

			if ( reset ) this._offset = 0;
			if ( this._listApi ) this._listApi.abort();

			this._listApi = AP.api.planDisplayComments( null, {
				planDisplaySn: this._options.planDisplaySn,
				order: this._sort, 
				offset: this._offset
			}).done( function ( result ) {
				var data = result.eventParticipantResult;
				this._offset = data.offset + 20;
				//this._offset = data.offset + data.eventParticipantResult.length;
				this._drawList( data );

				if ( data.offset === 0 ) {
					this._$input.val( '' );
					this._$listArea.scrollTop( 0 );
					if ( this._scrollEnd ) this._scrollEnd.enable();
				}
			}.bind(this));
		},

		_drawList: function ( data ) {
			data.memberSn = this._options.memberSn;
			data.isLive = this._options.isLive;
			data.isScrollType = this._options.isScrollType;
			
//			$.each(data.articleCommentList, function(idx, obj){
//				if( obj.imgList.length > 0 || (obj.prodReviewBodyText != null && obj.prodReviewBodyText.length > 58) ){
//					obj.isMoreView = true;
//				}
//			});
			var html = AP.common.getTemplate( 'display.events.simple-comment-list', data );

			if ( data.offset === 0 ) {
				this._$listArea.html( html );
			} else {
				this._$listArea.find( '.inner_loading' ).remove();
				this._$listArea.append( html );
			}

			//this._$loading.hide();
			this._$total.show().find( 'span' ).text( data.totalCount );

			if ( !this._options.isScrollType && this._offset < data.totalCount ) {
				this._$moreBtn.html( '<span>더보기 (<em>' + this._offset + '</em>/' + data.totalCount + ')</span>' ).show();
			}

			if ( this._scrollEnd && this._offset >= data.totalCount ) {
				this._scrollEnd.disable();
			}
		}

	});

	AP.Comments = Comments;
})( jQuery );