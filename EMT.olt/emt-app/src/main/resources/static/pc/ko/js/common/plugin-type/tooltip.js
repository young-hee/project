/**
 * tooltip
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
	'use strict';

	$.fn.extend({
		/**
		 * Events: tooltip-show, tooltip-hide
		 * Methods: ex) $( '.ui_tooltip' ).tooltip( 'clear' );
		 *      "clear"             적용해제
		 *      "show"              tooltip layer 노출
		 *      "hide"              tooltip layer 숨김
		 * @param   {String}  method
		 * @returns {jQuery}
		 */
		tooltip: function ( method, value ) {
			var pluginName = 'tooltip';

			if ( typeof method === 'string' ) {
				return plugin.callMethod( this, pluginName, method, value );
			} else {
				this.each( _.bind(function ( idx, el ) {
					var $el = $( el );
					if ( !plugin.has($el, pluginName) ) {
						plugin.add( $el, pluginName, new Tooltip($el, pluginName, method) );
					}
				}, this));
			}

			return this;
		}
	});



	var Tooltip = function ( $target, pluginName ) {
		var _$target = $target,
			_$btn = _$target.find( '.btn_tooltip' ),
			_$layer = _$target.find( '.layer_tooltip' ),
			_$arrow = _$target.find( '.arr' ),
			_$btnClose = _$target.find( '.ui_close' ),
			_$body = _$target.find( '.ap_wrapper' );

		var _this = this,
			_pluginName = pluginName;


		/* ==================== Public Methods ==================== */

		/**
		 * plugin 해제
		 */
		this.clear = function () {
			//$( window ).off( 'load resize', resizeHandler );
			_$btnClose.off( 'click' );
			_$btn.off( 'click', btnClickHandler );
			plugin.remove( _$target, _pluginName );
		};

		/**
		 * tooltip layer 노출
		 */
		this.show = function () {
			$( '.ui_tooltip' ).tooltip( 'hide' );
			_$arrow.css( 'display', 'block' );
			_$layer.show();

			dispatch( 'show' );
		};

		/**
		 * tooltip layer 숨김
		 */
		this.hide = function () {
			_$arrow.css( 'display', 'none' );
			_$layer.hide();

			dispatch( 'hide' );
		};


		/* ==================== Initialize ==================== */
		initialize();

		/* ==================== Protected Methods ==================== */

		function initialize () {
			setEvents();
		}

		function setEvents () {
			_$btnClose.on( 'click', function (e) {
				_this.hide();
			});
			_$btn.on( 'click', btnClickHandler );
		}

		function btnClickHandler (e) {
			if ( _$layer.is(':visible') ) {
				_this.hide();
			} else {
				_this.show();
			}
		}

		function resizeHandler () {
			//_this.resetPosition();
		}

		function dispatch ( type ) {
			_$target.triggerHandler({
				type: _pluginName + '-' + type
			});
		}

	};

})( jQuery, AP.plugin );