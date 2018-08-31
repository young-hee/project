/**
 * InvokedFilter
 *
 */

;(function ( $ ) {
	'use strict';

	var InvokedFilter = $B.Class.extend({
		initialize: function ( $target ) {
			this._$target = $target;
			this._setEvent();
		},

		/** =============== Public Methods =============== */
		set: function () {
			var data = AP.category.searchFilterData;

			// 선택된 필터 표시
			if ( this.isFilter( data )) {
				var html = AP.common.getTemplate( 'display.category.invoked-filter', data );
				this._$target.show().html( html );
				this._$target.prepend( this._$target.find( '.color_sel' ));
			} else {
				this._$target.html( '' );
				this._$target.hide();
			}

			// 가격 필터 선택안하고 직접입력 했을때 표시
			var isPriceSelected = false,
				min = data.addAttrs[data.addAttrs.length - 1].min,
				max = data.addAttrs[data.addAttrs.length - 1].max;

			_.each( data.addAttrs[data.addAttrs.length - 1].addAttrVals, function ( value, index ) {
				if ( value.selected ) {
					isPriceSelected = true;
				}
			}.bind( this ));

			if ( !isPriceSelected ) {
				if ( min || max ) {
					min = ( min ) ? $B.string.numberFormat( min ) + '원~' : '~';
					max = ( max ) ? $B.string.numberFormat( max ) + '원' : '';
					html = '<div class="brand_sel"><span><em>' + min + max + '</em><a class="price" href="javascript:;" data-attr="" data-value="' + min + ',' + max + '">닫기</a></span></div>';
					this._$target.show().append( html );
				}
			}
		},

		isFilter: function ( filterData ) {
			var isFilter = false;
			for ( var i = 0; i < filterData.addAttrs.length; ++i ) {
				_.each( filterData.addAttrs[i].addAttrVals, function ( value, index ) {
					if ( value.selected ) {
						isFilter = true;
					}
				});
			}
			return isFilter;
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
			// delete
			this._$target.on( 'click', 'a', function (e) {
				var $filter = $( e.currentTarget ),
					attr = $filter.data( 'attr' ),
					value = $filter.data( 'value' )

				if ( $filter.hasClass( 'price' )) {
					// 가격 필터 삭제
					this.dispatch( 'delete-invoked-filter', { data: { type: 'price' }} );
				} else {
					this.dispatch( 'delete-invoked-filter', { data: { attr: attr, value: value }} );
				}

			}.bind( this ));
		}
	});

	AP.invokedFilter = InvokedFilter;
})( jQuery );