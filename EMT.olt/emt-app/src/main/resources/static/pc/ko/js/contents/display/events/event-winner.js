/**
 * 당첨자 발표
 *
 */

;(function ( $ ) {
	'use strict';

	var EventWinner = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.event_winner' );

			this._pagination = null;
			this._param = {
				offset: 0,
				limit: 20,
				keyword: ''
			};

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		load: function ( param ) {
			if ( param ) {
				$.extend( this._param , param );
			}

			AP.api.winnerNoticeList( {}, param ).done(function ( result ) {
				result = result['winnerNoticeList'];

				var html = AP.common.getTemplate( 'display.events.event-winner', result );
				this._$target.find( '.board_list2 tbody' ).html( html );

				if ( !this._pagination ) {
					this._setPaging( result.limit, result.totalCount );
				}

				this._$target.find( '.loading' ).hide();

			}.bind( this )).fail(function (e) {
				console.log( 'error' );
			}).always(function (e) {});
		},

		/** =============== Private Methods =============== */
		_setEvent: function () {
			this._$target.find( '.btn_search' ).on( 'click', function (e) {
				e.preventDefault();
				this._clearPaging();
				this._param.keyword = $( e.target ).siblings( 'input' ).val();
				this.load( this._param );

			}.bind( this ));
		},

		_setPaging: function ( limit, totalCount ) {
			var $pagination = this._$target.find( '.pagination' );
			this._pagination = $pagination.paging({
				limit: limit,
				totalCount: totalCount
			});

			$pagination.on( 'paging-change', function (e) {
				this._param.offset = e.offset;
				this.load( this._param );
			}.bind( this ));
		},

		_clearPaging: function () {
			this._$target.find( '.pagination' ).paging( 'clear' ).off( 'paging-change' );
			this._param.offset = 0;
			this._pagination = null;
		}
	});

	AP.eventWinner = new EventWinner();
})( jQuery );