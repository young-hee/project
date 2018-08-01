/**
 * 댓글 : 일반댓글
 *
*/
;(function ( $ ) {
	'use strict';

	/**
	 * @param {Object}	options
	 */
	var SimpleComments = $B.Class.extend({

		initialize: function ( $target, planDisplaySn, eventTitle ) {
			this._$target = $( $target );
			this._$total = this._$target.find( '.total_count' );
			this._$input = this._$target.find( '.comment_input' );
			this._$listArea = this._$target.find( '.comment_list' );
			this._$saveBtn = this._$target.find( '.btn_save' );
			this._$moreBtn = this._$target.find( '.btn_more' );
			this._$loading = this._$target.find( '.loading' );

			this._listApi = null;
			this._offset = 0;
			
			this._planDisplaySn = planDisplaySn;
			
			this._eventTitle = eventTitle;

			this._setPlugins();
			this._setEvents();
			this._getListDate( true );
			
			this._member = null;
			this._getLoginMemberInfo();
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setPlugins: function () {
			this._$input.inputLimits();
		},
		
		//로그인 정보 가져오기
		_getLoginMemberInfo : function(){
			AP.api.getLoginMemberInfo()
			.done(function(result){
				this._member = result;
			}.bind(this))
			.fail(function(){
				
			}.bind(this));
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
					this._deleteComment( $(e.currentTarget).data('event-participant-sn') );
				}.bind(this));
			}.bind(this));

			//더보기
			this._$moreBtn.on( 'click', function (e) {
				this._getListDate();
			}.bind(this));
		},

		_createComment: function ( str ) {
			var defer = new $.Deferred();
			AP.api.planDisplaySimpleParticipated( null, {
				 planDisplaySn : this._planDisplaySn
				,participantComment: str
				,termsAgreeYn : "true"
			}).done( function ( result ) {
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
					}
					AP.modal.alert( '입력이 완료되었습니다.' );
				} else {
					defer.resolve();
					AP.modal.alert( '입력이 완료되었습니다.' );
				}
				this._getListDate( true );
			}.bind(this)).fail( function ( xhr ) {
				if ( xhr.errorCode === 'EAPI004' ) {
					AP.login({trigger: true});
				} else if( AP.message[xhr.errorCode] != undefined ){
					AP.modal.alert( AP.message[xhr.errorCode] );
				}
			}.bind(this));
		},

		_deleteComment: function ( eventParticipantSn ) {
			AP.api.deleteParticipated( null, {
				planDisplaySn: this._planDisplaySn,
				eventParticipantSn: eventParticipantSn
			}).done( function ( result ) {
				this._getListDate( true );
				AP.modal.alert( '댓글이 삭제 되었습니다.' );
			}.bind(this)).fail( function ( xhr ) {
				if ( xhr.errorCode === 'EAPI004' ) {
					AP.login({trigger: true});
				}else if( AP.message[xhr.errorCode] != undefined ){
					AP.modal.alert( AP.message[xhr.errorCode] );
				}
			}.bind(this));
		},

		//댓글 목록 데이타 가져오기
		_getListDate: function ( reset ) {
			if ( reset ) this._offset = 0;
			if ( this._listApi ) this._listApi.abort();

			this._listApi = AP.api.planDisplayComments( null, {
				planDisplaySn: this._planDisplaySn,
				offset: this._offset
			}).done( function ( result ) {
				var data = result.eventParticipantResult;
				this._offset = data.offset + data.eventParticipants.length;
				this._drawList( data );

				if ( data.offset === 0 ) {
					this._$input.val( '' );
					this._$listArea.scrollTop( 0 );
					if ( this._scrollEnd ) this._scrollEnd.enable();
				}
			}.bind(this));
		},

		_drawList: function ( data ) {
			var html = AP.common.getTemplate( 'display.events.simple-comment-list', data );
			
			if ( data.offset === 0 ) {
				this._$listArea.html( html );
			} else {
				this._$listArea.find( '.inner_loading' ).remove();
				this._$listArea.append( html );
			}
			
			this._$loading.hide();
			this._$total.show().find( 'span' ).text( data.totalCount );

			if ( this._offset < data.totalCount ) {
				this._$moreBtn.html( '<span>더보기 (<em>' + this._offset + '</em>/' + data.totalCount + ')</span>' ).show();
			}
			if ( this._scrollEnd && this._offset >= data.totalCount ) {
				this._scrollEnd.disable();
			}
			
			var memberId = this._$target.find('#memberId').val();
			if( memberId != '' ){
				this._$input.attr('placeholder', memberId.substring(0 , memberId.length -2) + '**' + '님 댓글을 남겨보세요.');
			}
		}

	});

	AP.SimpleComments = SimpleComments;
})( jQuery );