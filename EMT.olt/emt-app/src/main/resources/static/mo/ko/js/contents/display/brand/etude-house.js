/**
 * 에뛰드 하우스
 */
;(function ( $ ) {
	'use strict';

	var EtudeHouse = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.etude_house' );

			if ( this._$target.length > 0 ) {
				this._$target.find( '.visual .animated' ).addClass( 'fadeInUp' );
				this._setParallax();
				this._setGlobal();
			}
		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods =============== */
		_setParallax: function () {
			var $visualTitle = this._$target.find( '.visual_title' );

			var winH = window.innerHeight,
				position = getPosition();

			var parallaxScroll = new $B.event.ParallaxScroll( position ).addListener( 'activate', function (e) {
				for ( var i = 0; i < position.length; ++i ) {
					if ( e.index == i ) {
						$visualTitle.eq( e.index + 1 ).find( '.wrap' ).addClass( 'on' );
						$visualTitle.eq( e.index + 1 ).find( '.moving' ).closest( '.visual_title' ).find( '.mini' ).addClass( 'fadeInUp' );
						$visualTitle.eq( e.index + 1 ).find( '.moving' ).one( 'transitionend webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd', function (e) {});

					}
				}
			});

			function positionVisualTitle ( scrollTop ) {
				var startScrollY = $( window ).height() - $visualTitle.eq(0).offset().top + $visualTitle.eq(0).height(),
					endScrollY= $visualTitle.eq(0).offset().top,
					startElementY= 20,
					endElementY = -20,
					elementY = ( endElementY - startElementY ) / ( endScrollY - startScrollY ) * ( scrollTop - startScrollY ) + startElementY;

				if ( elementY < startElementY && elementY > endElementY ) {
					$visualTitle.eq(0).find( '.moving' ).css({ top: elementY });
				}
			}

			$( window ).on( 'scroll', function () {
				positionVisualTitle( $( this ).scrollTop() );
			}).trigger( 'scroll' );

			AP.responsiveWidth.addListener( 'resize', function () {
				winH = window.innerHeight;
				position = getPosition();
				parallaxScroll.update( position ).trigger();
				positionVisualTitle( $( window ).scrollTop() );
			});
			
			function getPosition () {
				return [
					{ min: $visualTitle.eq(1).offset().top - winH / 2, max: $visualTitle.eq(2).offset().top - winH / 2 },
					{ min: $visualTitle.eq(2).offset().top - winH / 2, max: $visualTitle.eq(3).offset().top - winH / 2 },
					{ min: $visualTitle.eq(3).offset().top - winH / 2, max: $visualTitle.eq(3).offset().top - winH / 2 + $visualTitle.eq(3).height() }
				];
			}
		},

		_setGlobal: function () {
			this._$target.find( '.global_etude button' ).on( 'click', function (e) {
				e.preventDefault();

				var imgSrc = $( e.target ).data( 'img' ),
					link = $( e.target ).data( 'link' ),
					national = $( e.target ).attr( 'class' ).charAt(0).toUpperCase() + $( e.target ).attr( 'class' ).slice(1);
				this._openModal( national, imgSrc, link );
			}.bind( this ));
		},

		_openModal: function ( national, imgSrc, link ) {
			var modal = AP.modal.info({
				title: national,
				contents: {
					templateKey: 'display.brand.etude-house-global',
					templateModel: {
						title: national,
						imgSrc: imgSrc,
						link: link
					}
				}
			}).addListener( 'modal-close', function (e) {
				modal = null;
			});

			modal.getElement().imagesLoaded().always(function () {
				modal.resetPosition();
			}.bind( this ));
		}
	});

	AP.etudeHouse = new EtudeHouse();
})( jQuery );