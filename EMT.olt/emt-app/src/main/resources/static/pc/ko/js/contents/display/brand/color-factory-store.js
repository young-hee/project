/**
 * 컬러 팩토리 - 서비스 매장 보기
 *
 * @Method:
 * load
 * abort
 *
 */

;(function ( $ ) {
	'use strict';

	var ColorFactoryStore = $B.Class.extend({
		initialize: function ( $target ) {
			this._$target = $target;
			this._api = null;
		},

		/** =============== Public Methods ================ */
		load: function () {
			this._api = AP.api.stores( null, { foStoreEventCode: 'Color Factory', resularStoreYn: 'N', offset: 0, limit: 0 }).done(function ( result ) {

				var html = AP.common.getTemplate( 'display.brand.color-factory-store', result['storeResult'] );
				this._$target.addClass( 'ui_accordion' ).addClass( 'store_map' ).data( 'open-type', 'single' );
				this._$target.html( html );

				this._setEvent();
				this._setStore( result['storeResult'] );
			}.bind( this )).fail(function (e) {
				console.log( 'error', e );
			}).always(function () {});
		},

		abort: function () {
			if ( this._api ) {
				this._api.abort();
				this._api = null;
			}
		},

		/** =============== Private Methods =============== */
		_setEvent: function () {
			this._$target.on('accordion-open', function(e){
				if (e.type == 'accordion-open' ) {
					$( e.target ).find( '> dl' ).eq( e.index ).find( '.slide' ).ixSlideMax( 'resize' );
				}
			});

			this._$target.on( 'click', 'button.print', function (e) {
				var lat = $( e.target ).closest( 'dl' ).data( 'lat' ),
					lng = $( e.target ).closest( 'dl' ).data( 'lng' );
				this._openMapWindow( lat, lng );
			}.bind( this ));
		},

		//map print 새창
		_openMapWindow: function ( lat, lng ) {
			var url = '/common/mapPrint/?lat=' + lat + '&lng=' + lng;
			window.open( url, 'map_print', 'scrollbars=1,width=740,height=600,menubar=0,resizable=0' );
		},

		_setStore: function ( result ) {
			this._$target.find( '> dl' ).each(function ( index, el ) {
				var lat = $( el ).data( 'lat' ),
					lng = $( el ).data( 'lng' );

				// modal 일때
				if ( $( el ).closest( '.modal_popup' ).length > 0 ) {
					$( el ).find( '.clear' ).removeClass( 'clear' );
					$( el ).find( '.print' ).remove();
				}

				$( el ).find( '.map_area' ).mapApi( 'clear' );
				$( el ).find( '.map_area' ).mapApi({ ratio: [320, 180] });
				$( el ).find( '.map_area' ).mapApi( 'addMarker', lat, lng, index );
				$( el ).find( '.map_area' ).mapApi( 'setCenter', lat, lng );

				var $slide = $( el ).find( '.slide' ),
					slideLength = result['storeExList'][index]['storeImgUrlList'].length;
				if ( slideLength > 0 ) {
					$slide.ixSlideMax().on( 'ixSlideMax:change', function (e) {
						$slide.find( '.round_box .current' ).text( e.currentIndex + 1 );
						$slide.find( '.round_box .total' ).text( e.totalLength );
					});
					$slide.find( '.round_box .total' ).text( slideLength );
				}
			}.bind( this ));

			this._$target.find( '> dl > dd' ).hide();
			this._$target.accordion().on('accordion-open', function(e){
				this.dispatch( 'reset-position' );
			}.bind( this ));
			this._$target.find( '> dl' ).eq(0).find( 'dt > button' ).trigger( 'click' );
		}
	});

	AP.ColorFactoryStore = ColorFactoryStore;
})( jQuery );