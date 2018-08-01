/**
 * 브랜드( overview )
 */
;(function ( $ ) {
	'use strict';

	var Brand = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.brand_overview' );

			if ( this._$target.length > 0 ) {
				this._setVisualParallax();
				this._setImgParallax();
			}
		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods =============== */

		_setVisualParallax: function () {
			var $visual = this._$target.find( '.visual' ),
				startPointGap = $( window ).height() * 0.8,
				position = getPosition();

			AP.responsiveWidth.addListener( 'resize', function () {
				startPointGap = $( window ).height() * 0.8;
				position = getPosition();
				visualScroll.update( position );
				visualScroll.trigger();
			});

			var visualScroll = new $B.event.ParallaxScroll( position ).addListener( 'activate', function (e) {
				for ( var i = 0; i < position.length; ++i ) {
					if ( e.index == i ) {
						animationVisual( e.index );
					}
				}
			}).trigger( 'activate' );

			function animationVisual ( index ) {
				for ( var i = 0; i < index + 1; ++i ) {
					$visual.eq(i).find( '.animated' ).each(function ( idx ) {
						var $this = $( this );
						setTimeout(function () {
							$this.addClass( 'fadeInUp' );
						}, idx * 300 );
					});
				}
			}

			function getPosition () {
				return [
					{ min: 0, max: $visual.eq(1).find( '.animated' ).offset().top - startPointGap },
					{ min: $visual.eq(1).find( '.animated' ).offset().top - startPointGap, max: $( document ).height() - $( window ).height() }
				];
			}
		},

		_setImgParallax: function () {
			var $img = this._$target.find( '.img_cont_box' ),
				startPointGap = $( window ).height() * 0.8,
				position = getPosition();

			AP.responsiveWidth.addListener( 'resize', function () {
				startPointGap = $( window ).height() * 0.8;
				position = getPosition();
				imgScroll.update( position );
				imgScroll.trigger();
			});

			var imgScroll = new $B.event.ParallaxScroll( position ).addListener( 'activate', function (e) {
				for ( var i = 0; i < position.length; ++i ) {
					if ( e.index == i ) {
						animationImg( e.index );
					}
				}
			}).trigger( 'activate' );

			function animationImg ( index ) {
				var isLast = false;
				for ( var i = 0; i < index + 1; ++i ) {
					$img.eq(i).addClass( 'fadeInLeftUp' );
					if ( i == position.length - 1 ) {
						if ( !isLast ) {
							isLast = true;
							$img.eq( position.length ).stop().addClass( 'fadeInLeftUp' );
						}
					}
				}
			}

			function getPosition () {
				return [
					{ min: $img.eq(0).offset().top - startPointGap, max: $img.eq(1).offset().top - startPointGap },
					{ min: $img.eq(1).offset().top - startPointGap, max: $img.eq(2).offset().top - startPointGap },
					{ min: $img.eq(2).offset().top - startPointGap, max: $img.eq(3).offset().top - startPointGap },
					{ min: $img.eq(3).offset().top - startPointGap, max: $img.eq(4).offset().top - startPointGap },
					{ min: $img.eq(4).offset().top - startPointGap, max: $img.eq(5).offset().top - startPointGap },
					{ min: $img.eq(5).offset().top - startPointGap, max: $( document ).height() - $( window ).height() }
				];
			}
		}
	});

	AP.brand = new Brand();
})( jQuery );