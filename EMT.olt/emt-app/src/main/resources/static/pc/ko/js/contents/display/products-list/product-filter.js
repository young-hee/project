/**
 * Product List Filter ( 스마트 필터 )
 *
 * @Events:
 * apply-filter-data	@param	{Object}
 *
 * @Method:
 * setFilter			@param	{Object}
 *
 */

;(function ( $ ) {
	'use strict';

	var ProductFilter = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents .search_table' );
			this._filterData = {};
			this._prevFilterData = {};
			this._selectedFilterData = {};

			this._setEvent();
		},

		/** =============== Public Methods ================ */

		setFilter: function ( data ) {
			this._filterData = data;

			var cloneFilterData = $B.object.clone( this._filterData );
			$.each( cloneFilterData, function ( index, groupData ) {
				$.each( this._selectedFilterData, function ( groupName, value ) {
					if ( groupName === groupData['addAttrCode'] ) {
						for ( var i = 0; i < groupData['addAttrVals'].length; ++i ) {
							for ( var j = 0; j < value.length; ++j ) {
								if ( groupData['addAttrVals'][i]['addAttrValCode'] === value[j]['addAttrValCode'] ) {
									groupData['addAttrVals'][i].selected = true;
								}
							}
						}
					}
				}.bind( this ));
			}.bind( this ));

			var html = AP.common.getTemplate( 'search.products-filter', cloneFilterData );
			this._$target.find( 'tbody' ).html( html );
		},

		/** =============== Private Methods =============== */

		_setEvent: function () {
			this._$target.on( 'change', 'input', function (e) {
				var data = [],
					group = $( e.target ).closest( '.group' ).data( 'group' );
				$( e.target ).closest( '.group' ).find( 'input' ).each(function ( index, element ) {
					var $input = $( element );
					if ( $input.prop( 'checked' )) {
						data.push({
							addAttrValName: $.trim( $input.siblings( 'label' ).text() ),
							addAttrValCode: $input.val(),
							selected: true
						});
					}
				});
				this._setFilterData( group, data );
			}.bind( this ));

			this._$target.find( '.page_btns' ).on( 'click', 'button', function (e) {
				var _class = $( e.target ).attr( 'class' );
				if ( _class.indexOf( 'reset' ) > -1 ) {
					this._$target.find( 'input' ).prop( 'checked', false );
					this._selectedFilterData = {};
				} else {
					if ( !$B.isEqual( this._selectedFilterData, this._prevFilterData )) {
						this._dispatch( this._selectedFilterData );
					}
					this._prevFilterData = $B.object.clone( this._selectedFilterData );
				}
			}.bind( this ));
		},

		_setFilterData: function ( group, data ) {
			if ( data.length > 0 ) {
				this._selectedFilterData[group] = data;
			} else {
				delete this._selectedFilterData[group];
			}
		},

		_dispatch: function ( data ) {
			this.dispatch( 'apply-filter-data', { data: data });
		}
	});

	AP.productFilter = new ProductFilter();
})( jQuery );