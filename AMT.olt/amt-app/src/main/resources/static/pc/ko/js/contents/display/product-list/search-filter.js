/**
 * SearchFilter
 *
 */

;(function ( $ ) {
		'use strict';

	var SearchFilter = $B.Class.extend({
		initialize: function ( $target, data ) {
			this._$target = $target;
			this._$filter = this._$target.find( '.filter_option' );

			this._searchFilterData = data;

			if ( this._$filter.find( '> dl' ).length ) return;

			// TODO: addAttrValCode 재정의
			this._searchFilterData.addAttrs.push({
				addAttrsName: '가격',
				addAttrCode: 'price',
				addAttrVals: [
					{ addAttrValCode: '0,30000', 		addAttrValName: '3만원미만' },
					{ addAttrValCode: '30000,50000', 	addAttrValName: '3~5만원' },
					{ addAttrValCode: '50000,70000', 	addAttrValName: '5~7만원' },
					{ addAttrValCode: '70000',	 		addAttrValName: '7만원' }
				],
				min: '',
				max: ''
			});

			var html = AP.common.getTemplate( 'display.product-list.search-filter', this._searchFilterData );
			this._$filter.html( html );

			this._dataReset();
			this._setEvent();
			this._setPrice();
		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods ============== */
		_reset: function () {
			this._$filter.find( 'input' ).prop( 'checked', false );
			this._$filter.find( '.price .direct_entry input' ).val( '' );
			this._dataReset();

			this._apply();
		},

		_dataReset: function () {
			for ( var i = 0; i < this._searchFilterData.addAttrs.length; ++i ) {
				for ( var j = 0; j < this._searchFilterData.addAttrs[i].addAttrVals.length; ++j ) {
					this._searchFilterData.addAttrs[i].addAttrVals[j].selected = false;
				}
			}
			AP.display.searchFilterData = this._searchFilterData;
		},

		_setEvent: function () {
			// 초기화
			this._$target.on( 'click', 'button.init', function (e) {
				e.preventDefault();
				this._reset();
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

			// 필터 항목
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

			// 가격
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
						if ( !min && max ) {
							this._$filter.find( '.price' ).find( 'input.min' ).val(0);
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

		_apply: function () {
			var min = parseInt( this._$filter.find( '.min' ).val().replace( /,/g, '' ) || ''),
				max = parseInt( this._$filter.find( '.max' ).val().replace( /,/g, '' ) || '' );

			var isComparePrice = this._comparePrice( min, max );
			if ( isComparePrice ) {
				AP.display.searchFilterData = this._searchFilterData;
				this.dispatch( 'apply-search-filter', {data: AP.display.searchFilterData });
			}
		}
	});

	AP.searchFilter = SearchFilter;
})( jQuery );