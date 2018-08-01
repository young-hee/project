/**
 * 종료된 이벤트
 *
 */

;(function ( $ ) {
	'use strict';

	var EventOver = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.event_over' );

			this._pagination = null;
			this._param = {
				offset: 0,
				limit: 10
			};
		},

		/** =============== Public Methods =============== */
		load: function ( param ) {
			if ( param ) {
				$.extend( this._param , param );
			}

			AP.api.planDisplayList( {}, this._param ).done(function ( result ) {
				result = result['planDisplayEventListResult'];

				var html = AP.common.getTemplate( 'display.events.event-over', result );
				this._$target.find( '.event_list' ).html( html );

				if ( !this._pagination ) {
					this._setPaging( result.limit, result.totalCount );
				}

				this._$target.find( '.loading' ).hide();

			}.bind( this )).fail(function (e) {
				console.log( 'error', e );
			}).always(function (e) {});
		},

		/** =============== Private Methods =============== */
		_setPaging: function ( limit, totalCount ) {
			var $pagination = this._$target.find( '.pagination' );
			this._pagination = $pagination.paging({
				limit: limit,
				totalCount: totalCount,
				focusTarget: this._$target.find( '.tab_menu' )
			});

			$pagination.on( 'paging-change', function (e) {
				this._param.offset = e.offset;
				this.load( this._param );
			}.bind( this ));
		}
	});

	AP.eventOver = new EventOver();
})( jQuery );