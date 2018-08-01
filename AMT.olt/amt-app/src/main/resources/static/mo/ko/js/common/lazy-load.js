/**
 * lazyLoad (해당 이미지가 화면에 노출되는 시점에 로드 시작)
 */
;(function( $ ){
	'use strict';

	var LazyLoad = $B.Class.extend({
		initialize: function () {
			this._imgPool = {};
			this._isRunning = false;
		},

		/** =============== Public Methods =============== */
		/**
		 * Image 추가, 한번 등록된 이미지는 다시 인식하지 않는다.
		 * @param {String}    selector  CSS selector, ex) img.lazy_load
		 * @returns {LazyLoad}
		 */
		add: function ( selector ) {
			$( selector ).each( function (idx, el) {
				var $img = $( el );

				if ( !$img.prop('_lazyLoadId') && $img.prop('nodeName') === 'IMG' && $img.data('src') ) {
					this._addImg( $img );

					if ( !this._isRunning ) {
						this._setEvents();
					}
				}
			}.bind(this));

			this.updated();
			return this;
		},

		/**
		 * 이미지 상태 계산하여 반영
		 * @returns {LazyLoad}
		 */
		updated: function () {
			var scrollY = $( window ).scrollTop(),
				winH = $( window ).height();

			for ( var n in this._imgPool ) {
				var $img = this._imgPool[n];

				if ( this._isActive($img, scrollY, winH) ) {
					this.load( $img );
				}
			}

			return this;
		},

		/**
		 * 등록되어진 대상의 상태와 상관없이 무조건 이미지를 로드한다.
		 * @param {String}	selector	CSS Selector, ex) 'img.lazy_load'
		 * @returns {LazyLoad}
		 */
		load: function ( selector ) {
			$( selector ).each( function ( idx, el ) {
				var $img = $( el );

				if ( $img.prop('_lazyLoadId') && !$img.prop('_loadStart') ) {
					this._loadImg( $img );
					this._removeImg( $img );
				}
			}.bind(this));

			return this;
		},

		/** =============== Private Methods =============== */

		_setEvents: function () {
			this._scrollHandler = function (e) {
				this.updated();
			}.bind( this );

			$( window ).on( 'load scroll resize', this._scrollHandler );
			this._isRunning = true;
		},

		_isActive: function ( $img, scrollY, winH ) {
			var result = false;

			if ( $img.is(':visible') ) {
				var $parent = $img.parent(),
					posY, posH;

				if ( $img.parent().hasClass('lazy_load_wrap') ) {
					posY = $parent.offset().top;
					posH = $parent.innerHeight();
				} else {
					posY = $img.offset().top;
					posH = $img.height() || 0;
				}

				if ( posY < (scrollY + winH) && scrollY < (posY + posH) ) {
					result = true;
				}
			}

			return result;
		},

		_addImg: function ( $img ) {
			var uId = $B.string.unique();

			$img.removeClass( 'loaded' );
			$img.prop( '_lazyLoadId', uId );
			$img.removeProp( '_loadStart' );
			this._imgPool[uId] = $img;
		},

		_removeImg: function ( $img ) {
			delete this._imgPool[$img.prop('_lazyLoadId')];

			if ( !$B.object.length(this._imgPool) ) {
				$( window ).off( 'load scroll resize', this._scrollHandler );
				this._isRunning = false;
			}
		},

		_loadImg: function ( $img ) {
			$img.one( 'load', function (e) {
				$( e.currentTarget ).addClass( 'loaded' ).parent( '.lazy_load_wrap' ).addClass( 'loaded' );
			});

			$img.prop( '_loadStart', true );
			$img.attr( 'src', AP.common.absolutePath($img.data('src')) );
		}

	}, 'LazyLoad');


	AP.lazyLoad = new LazyLoad();
})( jQuery );