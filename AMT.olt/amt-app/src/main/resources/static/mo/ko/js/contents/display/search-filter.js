/**
 * SearchFilter
 *
 */

;(function ( $ ) {
		'use strict';

	var SearchFilter = $B.Class.extend({
		initialize: function ( data ) {
			this._$modal = null;
			this._searchFilterData = data;

			this._searchFilterData.addAttrs.push({
				addAttrsName: '가격',
				addAttrCode: 'price',
				addAttrVals: [
					{ addAttrValCode: '~30000', 		addAttrValName: '3만원미만' },
					{ addAttrValCode: '30000~50000', 	addAttrValName: '3~5만원' },
					{ addAttrValCode: '50000~70000', 	addAttrValName: '5~7만원' },
					{ addAttrValCode: '70000~',	 		addAttrValName: '7만원' }
				],
				min: '',
				max: ''
			});

			this._dataReset();
		},

		/** =============== Public Methods =============== */
		open: function () {
			this._modal = AP.modal.full({
				title: '검색필터',
				contents: {
					templateKey: 'display.search-filter',
					templateModel: AP.category.searchFilterData
				},
				containerClass: 'filter_layer',
				fixed: true
			}).addListener( 'modal-before-close', function (e) {
				this._clear();
			}.bind( this )).addListener( 'modal-close', function (e) {
				this._modal = null;
			}.bind( this ));

			this._$modal = this._modal.getElement();
			this._$modal.find( '.ui_accordion' ).accordion();

			this._setEvent();
			this._setPrice();
		},

		isFilter: function () {
			var isFilter = false;
			for ( var i = 0; i < this._searchFilterData.addAttrs.length; ++i ) {
				_.each( this._searchFilterData.addAttrs[i].addAttrVals, function ( value, index ) {
					if ( value.selected ) {
						isFilter = true;
					}
				});
			}
			return isFilter;
		},

		convertDataToString: function ( data ) {
			var param = {};

			// price
			var priceData = data.addAttrs[data.addAttrs.length - 1],
				min = priceData.min,
				max = priceData.max;

			if ( min || max ) {
				if ( min && max ) {
					param.priceRange = min + '~' + max;
				} else {
					if ( min && !max ) {
						param.priceRange = min + '~';
					} else if ( !min && max ) {
						param.priceRange = '~' + max;
					}
				}
			} else {
				param.priceRange = '';
			}

			// other
			data = data.addAttrs;

			var addAttrs = '';
			for ( var i = 0; i < data.length - 1; ++i ) {
				var attrStr = data[i].addAttrCode + '=';
				_.each(data[i], function ( value, key ) {
					if ( key == 'addAttrVals' ) {
						for ( var j = 0; j < value.length; j++ ) {
							if ( value[j].selected ) {
								attrStr += value[j].addAttrValCode + ','
							}
						}
					}
				});
				if ( attrStr.substr( -1 ) != '=' ) {
					addAttrs += attrStr;
				}
			}
			param.attr = addAttrs.substring( 0, addAttrs.length - 1 );

			return param;
		},

		/** =============== Private Methods ============== */
		_close: function () {
			this._modal.close();
		},

		_clear: function () {
			this._$modal.find( '.ui_accordion' ).accordion( 'clear' );
			this._$modal.find( '.ui_accordion > dl > dt > button' ).off( 'click' );
			this._$modal.find( '.btn_wrap a' ).off( 'click' );
			this._$modal.find( '.price li a' ).off( 'click' );
			this._$modal.find( '.price' ).find( 'input' ).off( 'focusin focusout' );
		},

		_reset: function () {
			this._dataReset();
			this._$modal.find( '.ui_accordion dt' ).addClass( 'on' );
			this._$modal.find( '.ui_accordion' ).accordion( 'clear' ).accordion();
			this._$modal.find( '.btn' ).removeClass( 'on' );
			this._$modal.find( 'input' ).val( '' );
		},

		_dataReset: function () {
			for ( var i = 0; i < this._searchFilterData.addAttrs.length; ++i ) {
				this._searchFilterData.addAttrs[i].visible = true;
				for ( var j = 0; j < this._searchFilterData.addAttrs[i].addAttrVals.length; ++j ) {
					this._searchFilterData.addAttrs[i].addAttrVals[j].selected = false;
				}
				if ( i == this._searchFilterData.addAttrs.length - 1 ) {
					this._searchFilterData.addAttrs[i].min = '';
					this._searchFilterData.addAttrs[i].max = '';
				}
			}
			AP.category.searchFilterData = this._searchFilterData;
		},

		_setEvent: function () {
			// accordion visible
			this._$modal.find( '.ui_accordion > dl > dt > button' ).on( 'click', function (e) {
				var idx = $( e.target ).closest( 'dl' ).index();
				this._searchFilterData.addAttrs[idx].visible = ( !$( e.target ).closest( 'dt' ).hasClass( 'on' ) ) ? true : false;
			}.bind( this));

			// 필터
			this._$modal.find( '.ui_accordion > dl' ).not( '.price' ).on( 'click', '.btn', function (e) {
				var $btn = $( e.currentTarget );
				$btn.toggleClass( 'on' );

				var index = $btn.closest( 'dl' ).index(),
					value = $btn.data( 'value' );
				for ( var i = 0; i < this._searchFilterData.addAttrs[index].addAttrVals.length; ++i ) {
					if ( value == this._searchFilterData.addAttrs[index].addAttrVals[i].addAttrValCode ) {
						if ( $btn.hasClass( 'on' )) {
							this._searchFilterData.addAttrs[index].addAttrVals[i].selected = true;
						} else {
							this._searchFilterData.addAttrs[index].addAttrVals[i].selected = false;
						}
					}
				}
				e.preventDefault();
			}.bind( this ));


			this._$modal.on( 'click', '.btn_wrap a', function (e) {
				e.preventDefault();
				var $btn = $( e.currentTarget );
				if ( $btn.hasClass( 'reset' )) {
					// 초기화
					this._reset();
				} else if ( $btn.hasClass( 'apply' )) {
					// 적용
					this._apply();
				}
			}.bind( this ));
		},

		_setPrice: function () {
			var priceFilterData = this._searchFilterData.addAttrs[this._searchFilterData.addAttrs.length - 1];
			this._$modal.find( '.price input' ).each(function () {
				if ( $( this ).val() ) {
					$( this ).val( $B.string.numberFormat( $( this ).val() ));
				}
			});

			// 가격
			this._$modal.find( '.price li a' ).on( 'click', function (e) {
				var $price = this._$modal.find( '.price' ),
					$btn = $( e.currentTarget ),
					min = $btn.data( 'min' ),
					max = $btn.data( 'max' );


				$price.find( 'input' ).val( '' );
				$price.find( '.btn' ).removeClass( 'on' );
				$btn.addClass( 'on' );
				this._$modal.find( '.price .min' ).val( $B.string.numberFormat( min ));
				this._$modal.find( '.price .max' ).val( $B.string.numberFormat( max ));
				this._$modal.find( '.price .min' ).attr( 'value', min );
				this._$modal.find( '.price .max' ).attr( 'value', max );

				priceFilterData.min = min;
				priceFilterData.max = max;

				var index = $btn.closest( 'dl' ).index(),
					value = $btn.data( 'value' );

				for ( var i = 0; i < this._searchFilterData.addAttrs[index].addAttrVals.length; ++i ) {
					if ( value == this._searchFilterData.addAttrs[index].addAttrVals[i].addAttrValCode ) {
						this._searchFilterData.addAttrs[index].addAttrVals[i].selected = true;
					} else {
						this._searchFilterData.addAttrs[index].addAttrVals[i].selected = false;
					}
				}

				e.preventDefault();
			}.bind( this ));

			// 가격 입력
			var beforePrice = 0;
			this._$modal.find( '.price' ).find( 'input' ).on( 'focusin focusout', function (e) {
				var $input =  $( e.currentTarget );
				switch( e.type ) {
					case 'focusin':
						if ( $input.val() ) {
							$input.val( $input.val().replace( /,/g, '' ));
							beforePrice = $input.val();
						}
						break;
					case 'focusout':
						if ( $input.valid() ) {
							if ( $input.val() ) {
								$input.attr( 'value', $input.val() );
								$input.val( $B.string.numberFormat( parseInt( $input.val() )));
							}
						} else {
							AP.modal.alert( $input.data( 'msg' ));
							return;
						}

						var min = this._$modal.find( '.price' ).find( '.min' ).val().replace( /,/g, '' ),
							max = this._$modal.find( '.price' ).find( '.max' ).val().replace( /,/g, '' );

						if ( min && max ) {
							this._comparePrice( min, max );
						}
						if ( min || max ) {
							if ( parseInt( beforePrice ) != parseInt($input.val().replace( /,/g, '' )) ) {
								this._$modal.find( '.price .btn' ).removeClass( 'on' );
							}

							for ( var i = 0; i < priceFilterData.addAttrVals.length; ++i ) {
								priceFilterData.addAttrVals[i].selected = false;
							}
						}

						priceFilterData.min = min;
						priceFilterData.max = max;

						break;
				}
			}.bind( this ));
		},

		_comparePrice: function ( min, max ) {
			if ( min && max ) {
				if ( parseInt( max ) < parseInt( min ) ) {
					AP.modal.alert( '최대금액이 최소금액보다 작습니다.' );
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		},

		_apply: function () {
			var min = parseInt( this._$modal.find( '.min' ).val().replace( /,/g, '' ) || ''),
				max = parseInt( this._$modal.find( '.max' ).val().replace( /,/g, '' ) || '' );

			if ( this._comparePrice( min, max )) {
				AP.category.searchFilterData = this._searchFilterData;
				this._dispatch( false );
				this._close();
			}
		},

		_dispatch: function () {
			this.dispatch( 'apply-search-filter', {
				filterData: AP.category.searchFilterData
			});
		}
	});

	AP.searchFilter = SearchFilter;
})( jQuery );