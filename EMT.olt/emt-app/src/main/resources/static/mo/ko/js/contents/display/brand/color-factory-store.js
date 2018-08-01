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
		initialize: function () {
			this._$target = $( '.color_finder' );
			this._$storeList = this._$target.find( '.ui_accordion' );

			this._api = null;

			this._setEvent();
		},

		/** =============== Public Methods ================ */
		load: function () {
			this._$storeList.empty();
			this._api = AP.api.stores( null, { foStoreEventCode: 'Color Factory', resularStoreYn: 'N', offset: 0, limit: 0 }).done(function ( result ) {
				var html = AP.common.getTemplate( 'display.brand.color-factory-store', result['storeResult'] );
				this._$storeList.html( html );

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
			this._$storeList.on('accordion-open', function(e){
				if (e.type == 'accordion-open' ) {
					$( e.target ).find( '> dl' ).eq( e.index ).find( '.slide' ).ixSlideMax( 'resize' );
				}
			});

			AP.responsiveWidth.addListener( 'resize', function (e) {
				this._$storeList.find( 'dl' ).each(function ( index, el ) {
					if ( $( el ).find( 'dt' ).hasClass( 'on' )) {
						$( el ).find( '.slide' ).ixSlideMax( 'resize' );
					}
				});
			}.bind( this ));
		},

		_setStore: function ( result ) {
			this._$storeList.find( 'dl' ).each(function ( index, el ) {
				var lat = $( el ).data( 'lat' ),
					lng = $( el ).data( 'lng' );

				$( el ).find( '.map_area' ).mapApi( 'clear' );
				$( el ).find( '.map_area' ).mapApi({ ratio: [320, 180] });
				$( el ).find( '.map_area' ).mapApi( 'addMarker', lat, lng, index );
				$( el ).find( '.map_area' ).mapApi( 'setCenter', lat, lng );

				if ( result['storeExList'][index]['storeImgUrlList'].length > 0 ) {
					$( el ).find( '.slide' ).ixSlideMax();
				}
			}.bind( this ));
			this._$storeList.find( 'dd' ).hide();
			this._$storeList.accordion();
			this._$storeList.find( 'dl' ).eq(0).find( '.btn' ).trigger( 'click' );
		}
	});

	AP.ColorFactoryStore = ColorFactoryStore;
})( jQuery );