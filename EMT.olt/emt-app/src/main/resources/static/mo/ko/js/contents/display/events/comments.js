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
			this._$listArea = this._$target.find( '.review_list' );
			this._$participateBtn = this._$target.find( '.btn_participate' );

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
					this._getListDate( 0 );
				}.bind(this));

			//댓글 등록
			this._$participateBtn.on( 'click', function (e) {
				AP.login().done( function () {
					this._writeModal.open();
				}.bind(this));
			}.bind(this));
		},

		_openDetail: function ( data ) {
			var modal = AP.modal.full({
					title: '댓글',
					contents: {
						templateKey: 'display.events.comment-detail-modal',
						templateModel: data
					}
				}),
				$modal = modal.getElement();

			modal.addListener( 'modal-before-close', function (e) {
				//remove
				$modal.find( '.btn_delete' ).off( 'click' );
				$modal.find( '.btn_modify' ).off( 'click' );
			}.bind(this));

			//set
			$modal.find( '.btn_delete' ).on( 'click', function (e) {
				modal.close();
				this._delete( $(e.currentTarget).data('event-participant-sn') );
			}.bind(this));

			$modal.find( '.btn_modify' ).on( 'click', function (e) {
				modal.close();
				this._writeModal.modify( data );
			}.bind(this));
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
			var html = AP.common.getTemplate( 'display.events.comment-list', data );

			//remove events
			this._$listArea.find( '.pagination' ).paging( 'clear' ).off( 'paging-change' );
			this._$listArea.find( '.btn_detail' ).off( 'click' );

			this._$listArea.html( html );

			this._$listArea.find( '.pagination' ).paging({
				offset: data.offset,
				limit: data.limit,
				totalCount: data.totalCount
			}).on( 'paging-change', function (e) {
				this._getListDate( e.offset );
			}.bind(this));

			this._$listArea.find( '.btn_detail' ).on( 'click', function (e) {
				var eventParticipantSn = $( e.currentTarget ).data( 'event-participant-sn' ),
					selectedData = _.findWhere( data.eventParticipants, {eventParticipantSn: eventParticipantSn} );

				this._openDetail( selectedData );
			}.bind(this));
		}

	});

	AP.Comments = Comments;
})( jQuery );