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
			this._$paging = this._$target.find( '.pagination' );
			this._$loading = this._$target.find( '.loading' );

			this._listApi = null;
			this._offset = 0;
			
			this._planDisplaySn = planDisplaySn;
			
			this._eventTitle = eventTitle;

			this._setPlugins();
			this._setEvents();
			this._getListDate( 0 );
			
			this._member = null;
			this._getLoginMemberInfo();
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setPlugins: function () {
			this._$input.placeholder().inputLimits();
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
			this._$paging.on( 'paging-change', function (e) {
				this._getListDate( e.offset );
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
				this._getListDate( 0 );
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
				this._getListDate( 0 );
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
		_getListDate: function ( offset ) {
			if ( this._listApi ) this._listApi.abort();

			this._listApi = AP.api.planDisplayComments( null, {
				planDisplaySn: this._planDisplaySn,
				offset: offset
			}).done( function ( result ) {
				var data = result.eventParticipantResult;
				this._offset = data.offset + data.eventParticipants.length;
				this._drawList( data );

				if ( data.offset === 0 ) {
					this._$listArea.scrollTop( 0 );
					this._$input.val( '' ).placeholder( 'updated' );
					if ( this._scrollEnd ) this._scrollEnd.enable();
				}
			}.bind(this));
		},

		_drawList: function ( data ) {
			var html = AP.common.getTemplate( 'display.events.simple-comment-list', data );
			
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

	});

	AP.SimpleComments = SimpleComments;
})( jQuery );