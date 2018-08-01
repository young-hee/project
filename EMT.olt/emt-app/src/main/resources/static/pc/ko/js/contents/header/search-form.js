/**
 * Search-layer
 *
 * @Methods:
 * close
 */

;(function ( $ ) {
    'use strict';

    var SearchForm = $B.Class.extend({
        initialize: function () {
			this._$target = $( '#header .search_form' );

			this._setEvent();
			this._setPredictive();
			this._setSearchLayer();
			this._setAutoCompletion();
			this._setBanner();
        },

        /** =============== Public Methods =============== */
        close: function () {
			this._SearchLayer.close();
			this._AutoCompletion.close();
		},

        /** =============== Private Methods =============== */
		_setEvent: function () {
        	this._$target.find( '.wrap input' ).on( 'focusin keyup keydown', function (e) {
        		var $input = $( e.target );
        		switch( e.type ) {
					case 'focusin':
						if ( !$input.val() ) {
							this._SearchLayer.setPopularWord()
						}
						$( document ).on( 'click', clickDocumentHandler );
						break;
					case 'keyup':
						if ( !$input.val() ) {
							this._SearchLayer.open();
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
								this._SearchLayer.open();
								this._AutoCompletion.close();
							}
						}
						break;
				}
			}.bind( this ));

			var clickDocumentHandler = function (e) {
				if ( $( e.target ).closest( '.search_form' ).length == 0 ) {
					this.close();
					this._$target.find( '.wrap input' ).val( '' );
					this._$target.find( '.wrap input' ).placeholder( 'updated' );
					$( document ).off( 'click' );
				}
			}.bind( this );

        	this._$target.find( '.btn_search' ).on( 'click', function (e) {
				var value = $( this ).siblings( 'input' ).val();
				if ( !value ) {
					value = $( this ).siblings( '.placeholder' ).text();
				}
				
				if( $.trim( value ) == '' ){
					AP.modal.alert( AP.message.SEARCH_WORD_EMPTY );
					return false;
				}

				// TODO: 검색레이어 검색
				location.href = '/common/search?searchWord=' + value;
			});
		},

		_setSearchLayer: function () {
			this._SearchLayer = (function () {
				var $searchLayer = this._$target.find( '.unified_search' );

				$searchLayer.find( '.color_chip input, .popular a' ).on( 'click', function (e) {
					var value = '';
					if ( e.target.tagName.toLowerCase() == 'input' ) {
						// 컬러검색
						value = $(e.target).siblings('label').text();
						$( e.target ).closest( '.color_chip' ).find( 'input' ).prop( 'checked', false );
						$( e.target ).prop( 'checked', true );

					} else if ( e.target.tagName.toLowerCase() == 'a' ) {
						// 인기검색어
						value = $( e.target ).text();
					}
					this._$target.find( '.wrap .placeholder' ).hide();
					this._$target.find( '.wrap input' ).val( value );
					this._$target.find( '.btn_search' ).trigger( 'click' );
				}.bind( this ));

				return {
					setPopularWord : function(){
						AP.api.popularSearches({}, {})
						.done(function( result ){
							var html = "";
							$.each( result.popularSearchWord, function(idx, val){
								html += '<li><a href="/common/search?searchWord='+val+'">#'+val+'</a></li>';
							});
							$searchLayer.find('.popular').find('ul').html( html );
							this.open();
						}.bind(this));
					},
					open: function () {
						$searchLayer.show();
					},
					close: function () {
						$searchLayer.hide();
					}
				};
			}.bind( this )());
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
							this._AutoCompletion.complete( this._$target.find( '.wrap input' ).val(), word );
						}.bind( this )).always(function (e) {});
					}.bind( this )
				};
			}.bind( this )());
		},

		_setAutoCompletion: function () {
			this._AutoCompletion = (function () {
				var $autoCompletion = this._$target.find( '.auto_complete' );

				$autoCompletion.on( 'click', '.list a', function (e) {
					var value = $( e.target ).text();
					this._$target.find( '.wrap .placeholder' ).hide();
					this._$target.find( '.wrap input' ).val( value );
					this._$target.find( '.btn_search' ).trigger( 'click' );
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
							this._SearchLayer.close();
							this._AutoCompletion.open();
						} else {
							this._SearchLayer.open();
							this._AutoCompletion.close();
						}
					}.bind( this ),
					open: function () {
						$autoCompletion.show();
					},
					close: function () {
						$autoCompletion.hide();
					}
				};
			}.bind( this )());
		},
		
		_setBanner: function () {
			var $searchLayer1 = this._$target.find( '.unified_search' );

			AP.api.cornerList(null, {displayMenuId:'search'}, false).done( function ( result ) {
				for ( var key in result.cornersMap ) {
					if(result.cornersMap[key].length > 0){
						var contents = result.cornersMap[key][0].contents,
							content = _.findWhere( contents, {menuPageCornerContentsId: key + '.1'} );
	
						if ( content ) {
							var bgColor = ( content.bgColor ) ? {'background-color' : '#' + content.bgColor} : {};
							$searchLayer1.find( '.banner' ).html( '<a href="' + content.linkUrl + (content.newWindowYn === 'Y' ? 'target="_blank"' : '') + '"><img src="' + content.imgUrl + '" alt="' + content.text + '"></a>' ).css( bgColor );
						}
					}
				}
			}.bind(this)).fail( function ( xhr, textStatus, errorThrown ) {
				console.log(xhr);
			}.bind(this));
		}
    });

    AP.SearchForm = SearchForm;
})( jQuery );