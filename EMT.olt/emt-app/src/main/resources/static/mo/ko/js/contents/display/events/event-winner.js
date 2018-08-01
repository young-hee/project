/**
 * 당첨자 발표
 *
 */

;(function ( $ ) {
	'use strict';

	var EventWinner = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.event_winner' );

			this._itemLength = 0;
			this._totalItemLength = 0;
			this._param = {
				offset: 0,
				limit: 10,
				keyword: ''
			};

			this._setMore();
		},

		/** =============== Public Methods =============== */
		load: function ( param ) {
			if ( param ) {
				$.extend( this._param , param );
			}

			var $more = this._$target.find( '.btn_lg_more' ),
				$loading = this._$target.find( '.loading' );

			$more.hide();
			$loading.show();
			if ( this._param.offset === 0 ) {
				$loading.css( 'min-height', '300px' );
				this._$target.find( '.board_list > .list' ).empty();
			} else {
				$loading.css( 'min-height', '0px' );
			}

			AP.api.winnerNoticeList( {}, this._param ).done(function ( result ) {
				result = result['winnerNoticeList'];

				var html = AP.common.getTemplate( 'display.events.event-winner', result );
				if ( result.offset == 0 ) {
					this._$target.find( '.board_list > .list' ).html( html );
				} else {
					this._$target.find( '.board_list > .list' ).append( html );
				}

				this._itemLength += result.foNoticeList.length;
				this._totalItemLength = result.totalCount;

				$more.find( 'span' ).html( '더보기 (<em>' + this._itemLength + '</em>/' + this._totalItemLength + ')' );
				$loading.hide();
				if ( this._itemLength >= this._totalItemLength ) {
					$more.hide();
				} else {
					$more.show();
				}

			}.bind( this )).fail(function (e) {
				console.log( 'error' );
			}).always(function (e) {});
		},

		/** =============== Private Methods =============== */
		_setMore: function () {
			this._$target.find( '.btn_lg_more' ).on( 'click', function () {
				this._param.offset += this._param.limit;
				this.load( this._param );
			}.bind( this ));
		}
	});

	AP.eventWinner = new EventWinner();
})( jQuery );