/**
 * 브랜드 히스토리
 */
;(function ( $ ) {
	'use strict';

	var BrandHistory = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.history' );

			if ( this._$target.length > 0 ) {
				this._setParallax();
			}
		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods =============== */

		_setParallax: function () {
			var $animated = this._$target.find( '.animated' ),
				startPointGap = $( window ).height() * 0.7,
				position = getPosition();

			AP.responsiveWidth.addListener( 'resize', function () {
				startPointGap = $( window ).height() * 0.8;
				position = getPosition();
				parallax.update( position );
				parallax.trigger();
			});

			var parallax = new $B.event.ParallaxScroll( position ).addListener( 'activate', function (e) {
				for ( var i = 0; i < position.length; ++i ) {
					if ( e.index == i ) {
						animation( e.index );
					}
				}
			}).trigger();

			function animation ( index ) {
				for ( var i = 0; i < index + 1; ++i ) {
					$animated.eq(i).addClass( 'fadeInUp' );
				}
			}

			function getPosition () {
				var positionGuide = [
					$animated.eq(1).offset().top - startPointGap,
					$animated.eq(2).offset().top - startPointGap,
					$animated.eq(3).offset().top - startPointGap,
					$animated.eq(4).offset().top - startPointGap,
					$animated.eq(5).offset().top - startPointGap,
					$animated.eq(6).offset().top - startPointGap
				];
				return [
					{ min: 0,				 max: positionGuide[0] },
					{ min: positionGuide[0], max: positionGuide[1] },
					{ min: positionGuide[1], max: positionGuide[2] },
					{ min: positionGuide[2], max: positionGuide[3] },
					{ min: positionGuide[3], max: positionGuide[4] },
					{ min: positionGuide[4], max: positionGuide[5] },
					{ min: positionGuide[5], max: $( document ).height() - $( window ).height() }
				];
			}
		}
	});

	AP.brandHistory = new BrandHistory();
})( jQuery );