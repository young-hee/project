/**
 * Aside Menu (왼쪽 햄버거 메뉴)
 * Events:
 * 		open
 */
;(function ( $ ) {
	'use strict';

	var AsideMenu = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#aside_menu' );
			this._$wrap = this._$target.find( '.wrap' );
			this._$dimmed = this._$target.find( '.dimmed' );
			this._$slide = this._$target.find( '.slide' );
			this._$closeBtn = this._$target.find( '.btn_close' );
			this._$body = $( 'body' );

			this._isOpen = false;

			this._setEvents();
			this._setSlide();
		},

		/** =============== Public Methods =============== */

		open: function () {
			this._closeTimer.stop();
			this._$target.addClass( 'open' );
			this._$wrap.scrollTop( 0 );
			this._$closeBtn.show();
			this._isOpen = true;

			setTimeout( function () {
				this._$wrap.css( 'left', 0 );
				this._$dimmed.css( 'background-color', 'rgba(0, 0, 0, 0.9)' );
				this._$body.css( 'overflow', 'hidden' );
			}.bind(this), 1);

			this._$slide.ixSlideMax( 'resize' );

			this.dispatch( 'open' );
		},

		close: function () {
			if ( this.isOpen() ) {
				this._$wrap.css( 'left', '-100%' );
				this._$dimmed.css( 'background-color', 'rgba(0, 0, 0, 0)' );
				this._closeTimer.reset().start();
				this._$closeBtn.hide();
				this._isOpen = false;
			}
		},

		isOpen: function () {
			return this._isOpen;
		},

		/** =============== Private Methods =============== */

		_setEvents: function () {
			this._closeTimer = new $B.utils.Timer( 400, 1 ).addListener( 'complete', function (e) {
				this._$target.removeClass( 'open' );
				this._$body.css( 'overflow', '' );
			}.bind(this));

			this._$closeBtn.on( 'click', function (e) {
				this.close();
			}.bind(this));
		},

		_setSlide: function () {
			this._$slide.ixSlideMax();

			AP.responsiveWidth.addListener( 'resize', function (e) {
				if ( this.isOpen() ) {
					this._$slide.ixSlideMax( 'resize' );
				}
			}.bind(this));
		}
	});

	AP.asideMenu = new AsideMenu();
})( jQuery );