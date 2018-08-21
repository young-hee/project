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
	 * 	- {Int}		 	articleSn
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
			//this._$loading = this._$target.find( '.loading' );

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
			this._$updateBtn.on( 'click', function (e) {
				//var value = this._$input.val(); 수정 텍스트 확인
				var value;
				if ( value ) {
					AP.login().done( function () {
						this._updateComment( $(e.currentTarget).data('article-comment-sn'), value );
					}.bind(this));
				}
			}.bind(this));
			
			//본인 댓글 수정
			this._$listArea.on( 'click', '#btn_modify', function (e) {
				AP.login().done( function () {
					//to-do
					//수정 text 표시
				}.bind(this));
			}.bind(this));
			
			//본인 댓글 삭제
			this._$listArea.on( 'click', '#btn_delete', function (e) {
				AP.login().done( function () {
					this._deleteComment( $(e.currentTarget).data('article-comment-sn') );
				}.bind(this));
			}.bind(this));

			//도움이되요
			this._$goodBtn.on( 'click', function (e) {
				AP.login().done( function () {
					if($(e.currentTarget).hasClass('on')){
						this._recommendComment( $(e.currentTarget).data('article-comment-sn'), $(e.currentTarget) );
					}else{
						
					}
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
			AP.api.createArticleComment( null, {
				articleSn: this._options.articleSn,
				articleCommentBodyText: str
			}).done( function ( result ) {
				this._getListDate( true );
				AP.modal.alert( '댓글이 등록 되었습니다.' );
			}.bind(this)).fail( function ( xhr ) {
				if ( xhr.errorCode === 'EAPI004' ) {
					AP.login({trigger: true});
				}
			}.bind(this));
		},
		
		_updateComment: function ( articleCommentSn, str ) {
			AP.api.updateArticleComment( null, {
				articleSn: this._options.articleSn,
				articleCommentSn: articleCommentSn,
				articleCommentBodyText: str
			}).done( function ( result ) {
				this._getListDate( true );
				AP.modal.alert( '댓글이 수정 되었습니다.' );
			}.bind(this)).fail( function ( xhr ) {
				if ( xhr.errorCode === 'EAPI004' ) {
					AP.login({trigger: true});
				}
			}.bind(this));
		},

		_deleteComment: function ( articleCommentSn ) {
			AP.api.deleteArticleComment( null, {
				articleSn: this._options.articleSn,
				articleCommentSn: articleCommentSn
			}).done( function ( result ) {
				this._getListDate( true );
				AP.modal.alert( '댓글이 삭제 되었습니다.' );
			}.bind(this)).fail( function ( xhr ) {
				if ( xhr.errorCode === 'EAPI004' ) {
					AP.login({trigger: true});
				}
			}.bind(this));
		},
		
		_recommendComment: function ( articleCommentSn, $good ) {
			AP.api.recommendArticleComment( null, {
				articleSn: this._options.articleSn,
				articleCommentSn: articleCommentSn
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

			this._listApi = AP.api.comments( null, {
				articleSn: this._options.articleSn,
				offset: this._offset
			}).done( function ( result ) {
				var data = result.articleCommentResult;
				this._offset = data.offset + data.articleCommentList.length;
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

			var html = AP.common.getTemplate( 'display.trend-on-air.comment-list', data );

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