/**
 * 진행중인 이벤트
 *
 */

;(function ( $ ) {
	'use strict';

	var EventProgress = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.ap_event' );

			this._itemLength = 0;
			this._totalItemLength = 0;
			this._param = {
				offset: 0,
				limit: 10
			};

			//this._setMore();
			this._setEvent(); 
		},

		/** =============== Public Methods =============== */
		load: function ( param ) {
			if ( param ) {
				$.extend( this._param , param );
			}

			var $loading = this._$target.find( '.loading' );

			//$more.hide();
			$loading.show();
			if ( this._param.offset === 0 ) {
				$loading.css( 'min-height', '300px' );
				this._$target.find( '.event_list' ).empty();
			} else {
				$loading.css( 'min-height', '0px' );
			}

			AP.api.planDisplayList( {}, this._param ).done(function ( result ) {

				result = result['planDisplayEventListResult'];

				var html = AP.common.getTemplate( 'display.events.event-progress', result );
				if ( result.offset == 0 ) {
					this._$target.find( '.event_list' ).html( html );
				} else {
					this._$target.find( '.event_list' ).append( html );
				}
				AP.lazyLoad.add( 'img.lazy_load' );
				this._itemLength += result.planDisplayList.length;
				this._totalItemLength = result.totalCount;

//				$more.find( 'span' ).html( '더보기 (<em>' + this._itemLength + '</em>/' + this._totalItemLength + ')' );
//				
//				if ( this._itemLength >= this._totalItemLength ) {
//					$more.hide();
//				} else {
//					$more.show();
//				}
				$loading.hide();
			}.bind( this )).fail(function (e) {
				console.log( 'error' );
			}).always(function (e) {});
		},
		
		_setEvent:function(){
			
			// 좋아요
			this._$target.on( 'click', '.btn_toggle', function (e) {
				$( e.currentTarget ).toggleClass( 'on' ).find( '.ico_heart_s' ).toggleClass( 'on' );
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