/**
 * 스윗샷
 */

;(function ( $ ) {
	'use strict';

	var Sweetshot = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.brand' );
			this._list = [];
			this._listIndex = 0;
			this._totalLength = 0;
			this._totalInstarLength = 0;

			this.VIEW_LENGTH = 5;

			this._setEvent();
			this._load();
		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods =============== */
		_setEvent: function () {
			this._$target.find( '.btn_lg_more' ).on( 'click', function () {
				this._listIndex++;
				if ( this._listIndex <= this._totalLength - 1 ) {
					this._append( this._listIndex, this._totalLength );
				}
			}.bind( this ));
		},

		_load: function () {
			this._$target.find( '.loading_full' ).show();
			AP.api.sweetshot({}, {}).done(function ( data ) {
				this._$target.find( '.loading_full' ).hide();
				this._totalInstarLength = data.list.length;
				for ( var i = 0; i < data.list.length; ++i ) {
					if ( i % this.VIEW_LENGTH == 0 ) {
						this._list.push({ list: [data.list[i]] });
					} else {
						this._list[this._list.length-1].list.push( data.list[i] );
					}
				}
				this._totalLength = this._list.length;
				this._append( this._listIndex, this._totalLength );

			}.bind( this )).fail(function () {
				console.log( 'error' );
			}).always(function () {});
		},

		_append: function ( listIndex, totalLength ) {

			var html = AP.common.getTemplate( 'display.brand.sweetshot', this._list[listIndex] );
			var $instarWrap = this._$target.find( '.instar_wrap' ),
				$btnMore = this._$target.find( '.btn_lg_more' );

			$instarWrap.off( 'DOMSubtreeModified' ).append( html ).siblings( '.loading' ).show();
			$btnMore.find( 'span' ).html( '더보기 (<em>' + ( this._$target.find( '.instar_wrap > .instar' ).length )+ '</em>/' + this._totalInstarLength + ')');
			window.instgrm.Embeds.process();
			$btnMore.hide();

			$instarWrap.on( 'DOMSubtreeModified', function() {
				$instarWrap.find( '.instar' ).css( 'opacity', 1 );
				$instarWrap.siblings( '.loading' ).hide();

				if ( listIndex < totalLength - 1 ) {
					$btnMore.show();
				}
			});
		}
	});

	AP.sweetshot = new Sweetshot();
})( jQuery );