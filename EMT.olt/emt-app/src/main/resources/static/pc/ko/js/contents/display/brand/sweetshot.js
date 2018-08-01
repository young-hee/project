/**
 * 스윗샷
 */

;(function ( $ ) {
	'use strict';

	var Sweetshot = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.brand.sweetshot' );
			this._list = [];
			this._listIndex = -1;
			this._totalLength = 0;
			this._totalInstarLength = 0;

			this._isLoading = false;

			this._VIEW_LENGTH = 6;

			this._setEvent();
			this._load();
		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods =============== */
		_setEvent: function () {
			this._$target.find( '.btn_list_more button' ).on( 'click', function () {
				this._append();
			}.bind( this ));
		},

		_load: function () {
			this._$target.find( '.loading' ).show();
			AP.api.sweetshot({}, {}).done(function ( data ) {
				this._totalInstarLength = data.list.length;
				for ( var i = 0; i < data.list.length; ++i ) {
					if ( i % this._VIEW_LENGTH == 0 ) {
						this._list.push({ list: [data.list[i]] });
					} else {
						this._list[this._list.length-1].list.push( data.list[i] );
					}
				}
				this._totalLength = this._list.length;
				this._append();

			}.bind( this )).fail(function () {
				console.log( 'error' );
			}).always(function () {});
		},

		_append: function () {
			if ( !this._isLoading ) {

				this._isLoading = true;
				this._listIndex++;

				this._$target.find( '.loading' ).show();
				this._$target.find( '.btn_list_more' ).hide();
				var html = AP.common.getTemplate( 'display.brand.sweetshot', this._list[this._listIndex] );
				var $instarWrap = this._$target.find( '.insta-wrap' );

				setTimeout(function () {
					this._isLoading = false;
					$instarWrap.append( html );
					this._$target.find( '.btn_list_more button span' ).html( '더보기 (<em>' + ( $instarWrap.find( '> .insta' ).length )+ '</em>/' + this._totalInstarLength + ')');
					if ( this._listIndex === 0 ) {
						$instarWrap.find( '.insta' ).each(function ( index ) {
							if ( index < 3 ) {
								$( this ).addClass( '0' + (index + 1) );
							}
						});
					}

					this._$target.find( '.loading' ).hide();
					if ( this._listIndex < this._totalLength - 1 ) {
						this._$target.find( '.btn_list_more' ).show();
					}
				}.bind( this ), 300 );
			}
		}
	});

	AP.sweetshot = new Sweetshot();
})( jQuery );