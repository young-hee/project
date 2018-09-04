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
			
			this._setEvent();
		},

		/** =============== Public Methods =============== */
		load: function ( param ) {
			if ( param ) {
				$.extend( this._param , param );
			}

			AP.api.planDisplayList( {}, this._param ).done(function ( result ) {
				result = result['planDisplayEventListResult'];

				var html = '';
				
				if(result.totalCount > 0){
					html = AP.common.getTemplate( 'display.events.event-over', result );
				}else {
					html = '<div class="panel notice"><i class="ico"></i><p class="text font_lg align_center w100p">';
					html += '<span class="color_light_gray">종료된 이벤트가 없습니다.</span></p></div>';
				}
				
				if ( this._pagination !== null ) {
					this._setPaging( result.limit, result.totalCount );
				}
				
				this._$target.find( '.event_list' ).html( html );

				this._$target.find( '.loading' ).remove();

			}.bind( this )).fail(function (e) {
				console.log( 'error', e );
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
				
				AP.api.regularEventSummary({}, {regularEventType : 'PackageLetter'}).done(function (result){
					
					location.href='/display/sweet_letter?displayMenuId=sweet_letter';
				}.bind( this )).fail(function (xhr) {
					if ( AP.message[xhr.errorCode] != undefined ) {
						AP.modal.alert( AP.message[xhr.errorCode] );
					} else {
						AP.modal.alert( xhr.errorMessage );
					}
				}).always(function (e) {});

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

	AP.eventOver = new EventOver();
})( jQuery );