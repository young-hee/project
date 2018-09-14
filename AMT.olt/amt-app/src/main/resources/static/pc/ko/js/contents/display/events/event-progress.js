/**
 * 진행중인 이벤트
 *
 */

;(function ( $ ) {
	'use strict';

	var EventProgress = $B.Class.extend({
		initialize: function () {
			this._$target = $( '.event_overview' );

			this._pagination = null;
			this._param = {
				offset: 0,
				limit: 15
			};
			this._setEvent();
		},

		/** =============== Public Methods =============== */
		load: function ( param ) {
			if ( param ) {
				$.extend( this._param , param );
			}

			AP.api.planDisplayList( {}, this._param ).done(function ( result ) {
				result = result['planDisplayEventListResult'];
				
				if(result == undefined){
					//this._$target.find( '.loading' ).hide();
					return false;
				}
				
				var html = AP.common.getTemplate( 'display.events.event-progress', result );
				this._$target.find( '.event_list' ).html( html );

				if ( !this._pagination ) {
					this._setPaging( result.limit, result.totalCount );
				}

				this._$target.find( '.loading' ).hide();

			}.bind( this )).fail(function (e) {
				console.log( 'error', e );
				this._$target.find( '.loading' ).hide();
			}).always(function (e) {});
		},
		
		_setEvent:function(){
			
			this._$target.find( '.event_control>ul>li' ).on('click', function (e) {
				if(!$(e.currentTarget).hasClass('current')){
					this._$target.find( '.event_control>ul>li' ).removeClass('current');
					$(e.currentTarget).addClass('current');
					
					if($(e.currentTarget).attr('id') == 'event_progress'){
						this.load({ status: 'Progress' });
					}else{
						this.load({ status: 'End' });
					}
				}

			}.bind( this ));

		},

		/** =============== Private Methods =============== */
		_setPaging: function ( limit, totalCount ) {
			var $pagination = this._$target.find( '.pagination' );
			this._pagination = $pagination.paging({
				limit: limit,
				totalCount: totalCount,
				focusTarget: this._$target.find( '.event_control' )
			});

			$pagination.on( 'paging-change', function (e) {
				this._param.offset = e.offset;
				this.load( this._param );
			}.bind( this ));
		}
	});

	AP.eventProgress = new EventProgress();
})( jQuery );