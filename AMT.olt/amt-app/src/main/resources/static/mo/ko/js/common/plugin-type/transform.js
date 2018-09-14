/**
 * transform
 * @type		jQuery Plugin
 * @param		{Object}
 * 				transform		ex) transform: 'scaleX(1) scaleY(1)',
 * 				transition		ex) transition: '0s ease 0s'
 * @event		transition-end
 *
 */
;(function( $, plugin ){
    'use strict';

	$.fn.extend({
		transform: function ( options ) {
			var $this = this,
				transform = options.transform,
				transition = options.transition;

			this.css({ transform: transform, transition: transition });
			this.css({ WebkitTransform: transform, WebkitTransition: transition });
			this.css({ MozTransform: transform, MozTransition: transition });
			this.css({ msTransform: transform, msTransition: transition });
			this.css({ OTransform: transform, OTransition: transition });
			this.one( 'transitionend webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd', function (e) {
				$this.triggerHandler( 'transition-end' );
			});
			return this;
		}
	});

})( jQuery, AP.plugin );