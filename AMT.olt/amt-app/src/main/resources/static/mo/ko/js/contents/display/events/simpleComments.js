/**
 * 댓글 : 이벤트 댓글
 *
 */
;(function ( $ ) {
	'use strict';

	var SimpleComments = $B.Class.extend({

		/**
		 * @param {jQuery}	$target
		 * @param {Int}		planDisplaySn
		 */
		initialize: function ( $target, planDisplaySn, title ) {
			this._$target = $( $target );
			this._$listArea = this._$target.find( '.comment_list' );
			this._$participateBtn = this._$target.find( '.btn_participate' );

			this._planDisplaySn = planDisplaySn;
			
			this._title = title;
			this._offset = 0;
			this._limit = 20;
			this._setEvents();
			this._getListDate( 0 );
		},
		
		getListData(){
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
			//댓글 등록
			this._$participateBtn.on( 'click', function (e) {
				AP.login().done( function () {
					this._writeModal.open();
				}.bind(this));
			}.bind(this));
			*/
			
			//참여하기
			this._$participateBtn.on( 'click', function (e) {
				AP.login().done( function () {
					this._writeModal.participation();
				}.bind(this));
			}.bind(this));
			
			$('.input_wrap>input:text').on( 'click', function (e) {
				AP.login().done( function () {
					this._writeModal.open();
				}.bind(this));
			}.bind(this));
			
		},
		
		_openImg: function ( data ) {
			var modal = AP.modal.full({
				contents: {
					templateKey: 'display.events.comment-detail-modal',
					templateModel: data
				},
				containerClass: 'bg_bk'
			})
		},

		//댓글 삭제
		_delete: function ( eventParticipantSn ) {
			var defer = new $.Deferred();

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

		//댓글 목록 데이타 가져오기
		_getListDate: function ( offset ) {
			if ( this._listApi ) this._listApi.abort();

			this._listApi = AP.api.planDisplayComments( null, {
				planDisplaySn: this._planDisplaySn,
				offset: offset
			}).done( function ( result ) {
				var data = result.eventParticipantResult;
				this._drawList( data );
			}.bind(this));
		},

		_drawList: function ( data ) {
			var totalCnt = data.totalCount;
			var html = AP.common.getTemplate( 'display.events.simple-comment-list', data );
			this._$target.find( '.comment_total .num' ).text(totalCnt);
			//remove events
			this._$listArea.find( '.pagination' ).paging( 'clear' ).off( 'paging-change' );
			this._$listArea.find( '.btn_detail' ).off( 'click' );

			if(this._offset == 0){
				this._$listArea.html( html );				
			}else{
				this._$listArea.append( html );
			}

			this._offset += this._limit;
			if(totalCnt > this._offset){
				this._$target.find( '.btn_lg_more' ).show();
			}else{
				this._$target.find( '.btn_lg_more' ).hide();				
			}
			this._$listArea.find( '.pagination' ).paging({
				offset: data.offset,
				limit: data.limit,
				totalCount: data.totalCount
			}).on( 'paging-change', function (e) {
				this._getListDate( e.offset );
			}.bind(this));

			this._$target.find( '.btn_lg_more' ).on( 'click', function (e) {				
				this._getListDate( this._offset );
			}.bind(this));
			
			this._$listArea.find( '.btn_detail' ).on( 'click', function (e) {
				var eventParticipantSn = $( e.currentTarget ).data( 'event-participant-sn' ),
					selectedData = _.findWhere( data.eventParticipants, {eventParticipantSn: eventParticipantSn} );
					console.log(selectedData);
				this._openImg( selectedData );
			}.bind(this));
			
			this._$listArea.on( 'click', '#btn_modify', function (e) {
			//this._$listArea.find( '#btn_modify' ).on( 'click', function (e) {
				var eventParticipantSn = $( e.currentTarget ).data( 'event-participant-sn' ),
					selectedData = _.findWhere( data.eventParticipants, {eventParticipantSn: eventParticipantSn} );
				this._writeModal.modify( selectedData );
			}.bind(this));
			
			this._$listArea.on( 'click', '#btn_delete', function (e) {
				//this._$listArea.find( '#btn_modify' ).on( 'click', function (e) {
				var eventParticipantSn = $( e.currentTarget ).data( 'event-participant-sn' );
				this._delete( eventParticipantSn );
			}.bind(this));
		}

	});

	AP.SimpleComments = SimpleComments;
})( jQuery );