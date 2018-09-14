/**
 * SearchFilter
 *
 */

;(function ( $ ) {
		'use strict';

	var SearchFilter = $B.Class.extend({
		initialize: function ( $target, component, data ) {
			this._$target = $target;
			this._component = component;
			this._$filter = this._$target.find( '.filter_option' );

			this._searchFilterData = data;

			if ( this._$filter.find( '> dl' ).length ) return;

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

			var html = AP.common.getTemplate( 'display.search-filter', this._searchFilterData );
			this._$filter.html( html );

			this._dataReset();
			this._setEvent();
			this._setPrice();
		},

		/** =============== Public Methods =============== */

		reset: function () {
			this._$filter.find( 'input' ).prop( 'checked', false );
			this._$filter.find( '.price .direct_entry input' ).val( '' );
			this._dataReset();
			this._dispatch( true );
		},

		/** =============== Private Methods ============== */
		_dataReset: function () {
			for ( var i = 0; i < this._searchFilterData.addAttrs.length; ++i ) {
				for ( var j = 0; j < this._searchFilterData.addAttrs[i].addAttrVals.length; ++j ) {
					this._searchFilterData.addAttrs[i].addAttrVals[j].selected = false;
				}
			}
			AP[this._component].searchFilterData = this._searchFilterData;
		},

		_setEvent: function () {
			// 초기화
			this._$target.on( 'click', 'button.init', function (e) {
				e.preventDefault();
				this.reset();
			}.bind( this ));

			// 더보기
			this._$filter.find( '.btn_src_more' ).on( 'click', function () {
				e.preventDefault();

				var $area = $( this ).siblings( '.leg_tgArea' );
				$( this ).toggleClass( 'on' );
				if ( $( this ).hasClass( 'on' )) {
					$area.height( 'auto' );
				} else {
					$area.height( $area.data( 'min-height' ));
				}
			});

			// 필터
			this._$filter.find( 'dl:not(.price) li input' ).on( 'change', function (e) {
				e.preventDefault();

				var $input = $( e.currentTarget ),
					index = $input.closest( 'dl' ).index();

				$input.closest( 'ul' ).find( 'li' ).each(function ( idx, target ) {
					if ( $( target ).find( 'input' ).prop( 'checked' )) {
						this._searchFilterData.addAttrs[index].addAttrVals[idx].selected = true;
					} else {
						this._searchFilterData.addAttrs[index].addAttrVals[idx].selected = false;
					}
				}.bind( this ));

				this._apply();
			}.bind( this ));
		},

		_setPrice: function () {
			var priceFilterData = this._searchFilterData.addAttrs[this._searchFilterData.addAttrs.length - 1];

			// 가격 선택
			this._$filter.find( '.price ul input' ).on( 'change', function (e) {
				e.preventDefault();

				var $input = $( e.currentTarget ),
					value = $input.data( 'value' ),
					index = $input.closest( 'dl' ).index(),
					min = $input.data( 'min' ),
					max = $input.data( 'max' );

				this._$filter.find( '.price .min' ).val( $B.string.numberFormat( min ));
				this._$filter.find( '.price .max' ).val( $B.string.numberFormat( max ));
				this._$filter.find( '.price .min' ).attr( 'value', min );
				this._$filter.find( '.price .max' ).attr( 'value', max );

				priceFilterData.min = min;
				priceFilterData.max = max;

				for ( var i = 0; i < this._searchFilterData.addAttrs[index].addAttrVals.length; ++i ) {
					if ( value == this._searchFilterData.addAttrs[index].addAttrVals[i].addAttrValCode ) {
						this._searchFilterData.addAttrs[index].addAttrVals[i].selected = true;
					} else {
						this._searchFilterData.addAttrs[index].addAttrVals[i].selected = false;
					}
				}

				this._apply();
			}.bind( this ));

			// 가격 입력
			var beforePrice = 0;
			this._$filter.find( '.price .direct_entry' ).find( 'input' ).on( 'focusin focusout', function (e) {
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

						var min = this._$filter.find( '.price' ).find( '.min' ).val().replace( /,/g, '' ),
							max = this._$filter.find( '.price' ).find( '.max' ).val().replace( /,/g, '' );

						if ( min && max ) {
							this._comparePrice( min, max );
						}
						if ( min || max ) {
							if ( parseInt( beforePrice ) != parseInt($input.val().replace( /,/g, '' )) ) {
								this._$filter.find( '.price input' ).prop( 'checked', false );
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

			this._$filter.find( '.price_search' ).on( 'click', function (e) {
				var min = parseInt( this._$filter.find( '.min' ).val() ),
					max = parseInt( this._$filter.find( '.max' ).val() );
				if ( !min && !max ) {
					AP.modal.alert( '금액을 입력하세요.' );
				} else {
					this._apply();
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

		_convertDataToString: function ( data ) {
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
			var attrString = '';
			for ( var i = 0; i < data.length - 1; ++i ) {
				_.each(data[i], function ( value, key ) {
					if ( key == 'addAttrVals' ) {
						for ( var j = 0; j < value.length; j++ ) {
							if ( value[j].selected ) {
								attrString += data[i].addAttrCode + '=' + value[j].addAttrValCode + ','
							}
						}
					}
				});
			}
			param.attr = attrString.substring( 0, attrString.length - 1 );
			return param;
		},

		_apply: function () {
			var min = parseInt( this._$filter.find( '.min' ).val().replace( /,/g, '' ) || '' ),
				max = parseInt( this._$filter.find( '.max' ).val().replace( /,/g, '' ) || '' );

			if ( this._comparePrice( min, max )) {
				AP[this._component].searchFilterData = this._searchFilterData;
				this._dispatch( false );
			}
		},

		_dispatch: function ( isReset ) {
			this.dispatch( 'apply-search-filter', {
				reset: isReset,
				filterParam: this._convertDataToString( AP[this._component].searchFilterData )
			});
		}
	});

	AP.searchFilter = SearchFilter;
})( jQuery );