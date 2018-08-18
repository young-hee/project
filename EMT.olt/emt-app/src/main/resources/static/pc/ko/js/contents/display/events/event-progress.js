/**
 * 진행중인 이벤트
 *
 */

;(function ( $ ) {
	'use strict';

	var EventProgress = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.event_progress' );

			this._pagination = null;
			this._param = {
				offset: 0,
				limit: 10
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
					this._$target.find( '.loading' ).hide();
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
			
			this._$target.find( '.beauty_tester' ).on('click', function () {
				AP.login().done(function () {
					AP.api.regularEventSummary({}, {regularEventType : 'ProdExperienceGrp'}).done(function (result){
						location.href='/display/beauty_test?displayMenuId=beauty_test';
					}.bind( this )).fail(function (xhr) {
						if ( AP.message[xhr.errorCode] != undefined ) {
							AP.modal.alert( AP.message[xhr.errorCode] );
						} else {
							AP.modal.alert( xhr.errorMessage );
						}
					}).always(function (e) {});
				}.bind(this)); 
			}.bind( this ));
			
			this._$target.find( '.sweet_letter' ).on('click', function () {
				AP.login().done(function () {
					AP.api.regularEventSummary({}, {regularEventType : 'PackageLetter'}).done(function (result){
						location.href='/display/sweet_letter?displayMenuId=sweet_letter';
					}.bind( this )).fail(function (xhr) {
						if ( AP.message[xhr.errorCode] != undefined ) {
							AP.modal.alert( AP.message[xhr.errorCode] );
						} else {
							AP.modal.alert( xhr.errorMessage );
						}
					}).always(function (e) {});
				}.bind(this)); 
			}.bind( this ));
			 
			this._$target.find( '.free_sample' ).on('click', function () {
				AP.login().done(function () {
					AP.api.regularEventSummary({}, {regularEventType : 'SampleExperienceGrp'}).done(function (result){
						location.href='/display/free_sample?displayMenuId=free_sample';
					}.bind( this )).fail(function (xhr) {
						if ( AP.message[xhr.errorCode] != undefined ) {
							AP.modal.alert( AP.message[xhr.errorCode] );
						} else {
							AP.modal.alert( xhr.errorMessage );
						}
					}).always(function (e) {});

				}.bind( this ));
			}.bind( this ));
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

	AP.eventProgress = new EventProgress();
})( jQuery );