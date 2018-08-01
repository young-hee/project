/**
 * 대상 Element가 화면에 노출되는 시점을 이벤트로 받을수 있다.
 * 화면에서 hide된 상태에서는 이벤트가 발생하지 않는다.
 * window load, resize 시에 포지션을 자동으로 업데이트 한다.
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
	'use strict';

	$.fn.extend({
		/**
		 * Events: "bonding-rect-activate", "bonding-rect-deactivate" "bonding-rect-between"
		 * Event Properties : e.progress = 0~1
		 * @param   {String}  method    ex) $( '.target' ).bondingRect();
		 *              "clear"         적용해제
		 *              "updated"		조건에 맞는지 체크하여 이벤트 발생
		 * @returns {jQuery}
		 */
		bondingRect: function ( method, value ) {
			var pluginName = 'bonding-rect';

			if ( typeof method === 'string' ) {
				return plugin.callMethod( this, pluginName, method, value );
			} else {
				this.each( _.bind(function ( idx, el ) {
					var $el = $( el );
					if ( !plugin.has($el, pluginName) ) {
						plugin.add( $el, pluginName, new BondingRect($el, pluginName, method) );
					}
				}, this));
			}

			return this;
		}
	});



	var BondingRect = function ( $target, pluginName ) {
		var _$target = $target;

		var _this = this,
			_pluginName = pluginName,
			_isActivate = false,
			_min, _max;


		/* ==================== Public Methods ==================== */

		this.clear = function () {
			$( window ).off( 'load scroll resize', updateHandler );
			plugin.remove( _$target, _pluginName );
		};

		/**
		 * 조건에 맞는지 체크하여 이벤트 발생
		 */
		this.updated = function () {
			resetPositions();
			trigger();
		};

		/* ==================== Initialize ==================== */
		initialize();

		/* ==================== Protected Methods ==================== */

		function initialize () {
			$( window ).on( 'load scroll resize', updateHandler );
			_this.updated();
		}

		function updateHandler (e) {
			if ( e.type !== 'scroll' ) {
				resetPositions();
				trigger();
			} else {
				trigger( true );
			}
		}

		function  trigger ( scroll ) {
			var scrollY = $( window ).scrollTop(),
				visibled = _$target.is( ':visible' ),
				activate = ( _min <= scrollY && _max >= scrollY );

			if ( _isActivate && !visibled ) {
				_isActivate = false;
				dispatch( 'deactivate', scrollY );
			} else {
				if ( _isActivate !== activate ) {
					_isActivate = activate;

					if ( activate ) {
						if ( visibled ) {
							dispatch( 'activate', scrollY );
						}
					} else {
						dispatch( 'deactivate', scrollY );
					}
				}
			}

			if ( scroll && activate && visibled ) {
				dispatch( 'between', scrollY );
			}
		}

		function resetPositions () {
			var winH = $( window ).height(),
				startY = _$target.offset().top - winH;

			_min = startY;
			_max = startY + winH + _$target.height();
		}

		function valueToPercent ( value ) {
			return ( value - _min ) / ( _max - _min );
		}

		function dispatch ( type, scrollY ) {
			var progress = valueToPercent( scrollY );

			if ( progress > 1 ) {
				progress = 1;
			} else if ( progress < 0 ) {
				progress = 0
			}

			_$target.triggerHandler({
				type: _pluginName + '-' + type,
				progress: progress
			});
		}
	};

})( jQuery, AP.plugin );