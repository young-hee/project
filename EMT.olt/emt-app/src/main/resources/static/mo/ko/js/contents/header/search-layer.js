/**
 * Search-layer
 */

;(function ( $ ) {
	'use strict';

	var SearchLayer = $B.Class.extend({

		initialize: function () {
			this.popularSearchWord = null;
			this._getPopularSearchWord();
		},

		/** =============== Public Methods =============== */

		/**
		 * 검색 모달 열기
		 * Events:
		 * EventProperties:
		 * @param {Object}
		 * @return {modal}
		 */
		open: function ( data ) {
			this._data = $B.object.clone( data );

			this._modal = AP.modal.full({
				contents: {
					templateKey: 'header.search-layer',
					templateModel: {}
				},
				containerClass: 'search_layer'
			}).addListener( 'modal-before-close', function (e) {
				this._clear();
			}.bind( this ));

			this._$target = this._modal.getElement();

			this._setPlugin();
			this._setEvent();
			this._setPredictive();
			this._setAutoCompletion();
			this._getPopularSearchWord();
			this._setBanner();

			return this;
		},
		
		/** =============== Private Methods =============== */
		
		_getPopularSearchWord: function () {
			AP.api.popularSearches({}, {}).done(function ( data ) {
				this.popularSearchWord = data.popularSearchWord;
				this._setPopularSearchWord();
			}.bind( this )).fail(function (e) {
			}).always(function () {});
		},
		
		//인기 검색어 셋팅
		_setPopularSearchWord : function(){
			if(  this.popularSearchWord != null ){
				var html = '';
				for (var i = 0; i < this.popularSearchWord.length; i++) {
					html += '<a href="/common/search?searchWord='+this.popularSearchWord[i]+'">#'+this.popularSearchWord[i]+'</a>';
				}
				$('.keywords').html(html);
			}
		},
		
		_clear: function () {
			this._$target.find( '.search_form > input' ).inputText( 'clear' );
			this._$target.find( '.input, a, button' ).off();
			AP.responsiveWidth.removeListener( 'resize' );
		},

		//plugin 적용
		_setPlugin: function () {
			this._$target.find( '.search_form > input' ).inputText();
		},

		_setEvent: function () {
			// search_form
			this._$target.find( '.search_form > input' ).on( 'keydown keyup', function (e) {
				var $input = $( e.target );
				switch( e.type ) {
					case 'keyup':
						if ( !$input.val() ) {
							this._AutoCompletion.close();
						} else {
							this._Predictive.start( $input.val() );
						}
						break;
					case 'keydown':

						if ( e.keyCode == 13 ) {
							if ( $( e.target ).val() ) {
								this._$target.find( '.btn_search' ).trigger( 'click' );
							}
						} else {
							if ( !$input.val() ) {
								this._AutoCompletion.close();
							}
						}
						break;
				}
			}.bind( this )).on( 'input-text-empty', function () {
				var $input = $( e.target );
				$input.val( '' );
				this._AutoCompletion.close();
			}.bind( this ));

			this._$target.find( '.color_chip a, .keywords a' ).on( 'click', function (e) {
				var value = $( e.target ).text();
				this._$target.find( '.search_form > input' ).val( value );
				this._$target.find( 'button.btn_search' ).trigger( 'click' );
			}.bind( this ));

			// resize
			AP.responsiveWidth.addListener( 'resize', function (e) {
				this._AutoCompletion.resize();
			}.bind( this ));

			// search_btn
			this._$target.find( 'button.btn_search' ).on( 'click', function (e) {
				var value = $( this ).siblings( 'input' ).val();
				
				if( $.trim( value ) == '' ){
					AP.modal.alert( AP.message.SEARCH_WORD_EMPTY );
					return false;
				}

				// TODO: 검색레이어 검색
				location.href = '/common/search?searchWord=' + value;
			});
			
			this._$target.find( '.category' ).on( 'click', function (e) {
				location.href = '/common/searchCategory';
			});
		},

		_setPredictive: function () {
			this._Predictive = (function () {
				var _prevTimer = null,
					_curTimer = null;

				return {
					start: function ( word ) {
						_prevTimer = _curTimer;
						_curTimer = setTimeout(function () {
							this.stop();
							this.load( word );
						}.bind( this ), 400 );
					},
					stop: function () {
						clearTimeout( _prevTimer );
						_prevTimer = null;
					},
					load: function ( word ) {
						AP.api.searchAutocomplete({}, {
							prefix: word
						}).done(function ( data ) {
							this._AutoCompletion.complete( data, word );
						}.bind( this )).fail(function (e) {
							console.log( 'error', e );
						}).always(function (e) {});
					}.bind( this )
				};
			}.bind( this )());
		},

		_setAutoCompletion: function () {
			this._AutoCompletion = (function () {
				var $autoCompletion = this._$target.find( '.automatic_completion' );

				$autoCompletion.on( 'click', 'li a', function (e) {
					var value = $( e.target ).text();
					this._$target.find( '.search_form > input' ).val( value );
					this._$target.find( 'button.btn_search' ).trigger( 'click' );
				}.bind( this ));

				return {
					complete: function ( data, word ) {
						var html = '';
						$.each( data.everything, function ( index, value ) {
							value = String( value ).replace( word, '<b>' + word + '</b>' );
							html += '<li><a href="#none">' + value + '</a></li>';
						});

						$autoCompletion.find( 'ul.list' ).html( html );
						if ( $autoCompletion.find( 'ul.list li' ).length > 0 ) {
							this.open();
						} else {
							this.close();
						}
					},
					open: function () {
						$autoCompletion.show();
					},
					close: function () {
						$autoCompletion.hide();
					},
					resize: function () {
						$autoCompletion.height( $autoCompletion.closest( '.layer' ).height() - parseInt( $autoCompletion.css( 'top' ) ));
						return this;
					}
				};
			}.bind( this )()).resize();
		},
		
		_setBanner: function () {
			var $searchLayer = this._$target.find( '.layer_cont' );
			
			AP.api.cornerList(null, {displayMenuId:'search'}, false).done( function ( result ) {
				for ( var key in result.cornersMap ) {
					if(result.cornersMap[key].length > 0){
						var contents = result.cornersMap[key][0].contents,
							content = _.findWhere( contents, {menuPageCornerContentsId: key + '.1'} );
	
						if ( content ) {
							var bgColor = ( content.bgColor ) ? {'background-color' : '#' + content.bgColor} : {};
							$searchLayer.find( '.banner' ).html( '<a href="' + content.linkUrl + (content.newWindowYn === 'Y' ? 'target="_blank"' : '') + '"><img src="' + content.imgUrl + '" alt="' + content.text + '"></a>' ).css( bgColor );
						}
					}
				}
			}.bind(this)).fail( function ( xhr, textStatus, errorThrown ) {
				console.log(xhr);
			}.bind(this));
		}
	});

	AP.SearchLayer = SearchLayer;
})( jQuery );