/**
 * Search-layer
*/
;(function ( $ ) {
	'use strict';

	var SearchLayer = $B.Class.extend({

		initialize: function () {
		},

		/** =============== Public Methods =============== */

		/**
		 * 검색 모달 열기
		 * Events:
		 * EventProperties:
		 * @param {Object}  searchData
		 * @return {modal}
		 */
		open: function ( searchData ) {
			this._model = $B.object.clone( searchData );

			this._modal = AP.modal.full({
				contents: {
					templateKey: 'header.search-layer',
					templateModel: {
						uId: this.__uId__,
						model : this._model
					}
				},
				containerClass: 'search_layer'
			});

			this._$modal = this._modal.getElement();

			this._setPlugins();
			this._setEvents();
			this._setAutoCompletion();

			this._modal.addListener( 'modal-before-close', function (e) {
				this._removeEvents();
			}.bind(this));

			return this;
		},

		/** =============== Private Methods =============== */

		//plugin 적용
		_setPlugins: function () {
			this._$modal.find( '.search_form > input' ).inputText();
		},

		_setEvents: function () {
			//TODO: 작업중..
		},

		_setAutoCompletion: function () {
			// 자동완성
			var _this = this,
				$modal = _this._$modal,
				$input = $modal.find( '.search_form > input' ),
				$autoCompletion = $modal.find( '.automatic_completion' );

			$input.on( 'keyup', function (e) {
				var word = $( this ).val();
				Predictive.stop();
				if ( word ) {
					Predictive.start( word );
				} else {
					toggleAutoCompletion(0);
				}
			});

			$input.on( 'focus', function (e) {
				var word = $( this ).val();
				if ( word ) {
					Predictive.load( word );
				}
			});

			$modal.on( 'click', '.search_header', function () {
				toggleAutoCompletion(0);
			});

			$modal.on( 'click', '.automatic_completion a', function (e) {
				$input.val( $( this ).text() );
				toggleAutoCompletion(0);
				return false;
			});

			$input.on( 'input-text-empty', function () {
				$input.val('');
				toggleAutoCompletion(0);
			});

			function toggleAutoCompletion ( isShow ) {
				if ( isShow ) {
					$autoCompletion.show();
					$autoCompletion.addClass( 'on' );
					$autoCompletion.height( $autoCompletion.closest( '.layer' ).height() - $autoCompletion.offset().top );
				} else {
					$autoCompletion.hide();
					$autoCompletion.removeClass( 'on' );
				}
			}

			// TODO: 작업중
			var Predictive = (function () {
				var timer = null;

				function create ( data ) {
					var html = '';
					for ( var i = 0; i < data.list.length; ++i ) {
						html += '<li><a href="' + data.list[i].link + '">' + data.list[i].word + '</a></li>';
					}
					if ( html ) {
						$autoCompletion.find( 'ul' ).html( html );
						toggleAutoCompletion(1);
					}
				}

				return {
					start: function ( word ) {
						var _this = this;
						if ( !timer ) {
							timer = setTimeout(function () {
								_this.stop();
								_this.load( word );
							}, 200 );
						}
					},
					stop: function () {
						if ( timer ) {
							clearTimeout( timer );
							timer = null;
						}
					},
					load: function ( word ) {
						AP.api.predictive({}, {
							word: word
						}).done(function ( data ) {
							create( data );
						}).fail(function ( e ) {
							//실패
							console.log( 'error!' );
						}).always(function (e) {
							//성공, 실패
						});
					}
				};
			}());
		},

		_removeEvents: function () {
			var $input = this._$modal.find( '.search_form > input' );

			$input.inputText( 'clear' );
			$input.off();
			this._$modal.find( '.automatic_completion a' ).off();
		}
	});

	AP.SearchLayer = SearchLayer;
})( jQuery );