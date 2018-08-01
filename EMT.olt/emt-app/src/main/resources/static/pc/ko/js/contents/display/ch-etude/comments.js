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
			this._$total = this._$target.find( '.total_count' );
			this._$input = this._$target.find( '.comment_input' );
			this._$listArea = this._$target.find( '.comment_list' );
			this._$saveBtn = this._$target.find( '.btn_save' );
			this._$paging = this._$target.find( '.pagination' );
			this._$loading = this._$target.find( '.loading' );

			this._options = options || {};
			this._listApi = null;
			this._offset = 0;

			if ( this._$target.length ) {
				this._setPlugins();
				this._setEvents();
				this._getListDate( 0 );
			}
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setPlugins: function () {
			this._$input.placeholder().inputLimits();
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

			//본인 댓글 삭제
			this._$listArea.on( 'click', '.btn_delete', function (e) {
				AP.login().done( function () {
					this._deleteComment( $(e.currentTarget).data('article-comment-sn') );
				}.bind(this));
			}.bind(this));

			//더보기
			this._$paging.on( 'paging-change', function (e) {
				this._getListDate( e.offset );
			}.bind(this));

			if ( this._options.isScrollType ) {
				this._scrollEnd = new $B.event.ScrollEnd( this._$listArea )
					.gap({bottom: 30})
					.addListener( 'scrollbottom', function (e) {
						this._getListDate( this._offset );
					}.bind(this)).trigger();
			}
		},

		_createComment: function ( str ) {
			AP.api.createArticleComment( null, {
				articleSn: this._options.articleSn,
				articleCommentBodyText: str
			}).done( function ( result ) {
				this._getListDate( 0 );
				AP.modal.alert( '댓글이 등록 되었습니다.' );
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
				this._getListDate( 0 );
				AP.modal.alert( '댓글이 삭제 되었습니다.' );
			}.bind(this)).fail( function ( xhr ) {
				if ( xhr.errorCode === 'EAPI004' ) {
					AP.login({trigger: true});
				}
			}.bind(this));
		},

		//댓글 목록 데이타 가져오기
		_getListDate: function ( offset ) {
			if ( !this._options.isScrollType ) {
				this._$loading.show();
			}

			if ( this._listApi ) this._listApi.abort();

			this._listApi = AP.api.comments( null, {
				articleSn: this._options.articleSn,
				offset: offset
			}).done( function ( result ) {
				var data = result.articleCommentResult;
				this._offset = data.offset + data.articleCommentList.length;
				this._drawList( data );

				if ( data.offset === 0 ) {
					this._$listArea.scrollTop( 0 );
					this._$input.val( '' ).placeholder( 'updated' );
					if ( this._scrollEnd ) this._scrollEnd.enable();
				}
			}.bind(this));
		},

		_drawList: function ( data ) {
			data.memberSn = this._options.memberSn;
			data.isLive = this._options.isLive;
			data.isScrollType = this._options.isScrollType;

			var html = AP.common.getTemplate( 'display.ch-etude.comments-list', data );

			if ( this._options.isScrollType ) {
				if ( data.offset === 0 ) {
					this._$listArea.html( html );
				} else {
					this._$listArea.find( '.inner_loading' ).remove();
					this._$listArea.append( html );
				}

				if ( this._scrollEnd && this._offset >= data.totalCount ) {
					this._scrollEnd.disable();
				}
			} else {
				this._$listArea.html( html );
				this._$loading.hide();
				this._$total.show().find( 'span' ).text( data.totalCount );

				if ( data ) {
					this._$paging.paging( 'clear' ).paging({
						offset: data.offset,
						limit: data.limit,
						totalCount: data.totalCount
					});
				}
			}
		}

	});

	AP.Comments = Comments;
})( jQuery );