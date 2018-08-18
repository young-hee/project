/**
 * 진행중인 이벤트
 *
 */

;(function ( $ ) {
	'use strict';

	var EventProgress = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.event_progress' );

			this._itemLength = 0;
			this._totalItemLength = 0;
			this._param = {
				offset: 0,
				limit: 10
			};

			this._setMore();
			this._setEvent(); 
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
				this._$target.find( '.event_list > .list' ).empty();
			} else {
				$loading.css( 'min-height', '0px' );
			}

			AP.api.planDisplayList( {}, this._param ).done(function ( result ) {

				result = result['planDisplayEventListResult'];

				var html = AP.common.getTemplate( 'display.events.event-progress', result );
				if ( result.offset == 0 ) {
					this._$target.find( '.event_list > .list' ).html( html );
				} else {
					this._$target.find( '.event_list > .list' ).append( html );
				}

				this._itemLength += result.planDisplayList.length;
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
		
		_setEvent:function(){
			
			this._$target.find( '.beauty_tester' ).on('click', function () {
				
				AP.api.regularEventSummary({}, {regularEventType : 'ProdExperienceGrp'}).done(function (result){
					location.href='/display/beauty_test?displayMenuId=beauty_test';
				}.bind( this )).fail(function (xhr) {
					if ( AP.message[xhr.errorCode] != undefined ) {
						AP.modal.alert( AP.message[xhr.errorCode] );
					} else {
						AP.modal.alert( xhr.errorMessage );
					}
				}).always(function (e) {});

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
			
		},

		/** =============== Private Methods =============== */
		_setMore: function () {
			this._$target.find( '.btn_lg_more' ).on( 'click', function () {
				this._param.offset += this._param.limit;
				this.load( this._param );
			}.bind( this ));
		}
	});

	AP.eventProgress = new EventProgress();
})( jQuery );