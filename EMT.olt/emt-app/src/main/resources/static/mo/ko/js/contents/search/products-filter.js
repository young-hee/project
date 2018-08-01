/**
 * 제품필터, 검색필터
*/
;(function ( $ ) {
	'use strict';

	var ProductsFilter = $B.Class.extend({

		initialize: function () {
			//
		},

		/** =============== Public Methods =============== */

		/**
		 * 필터 모달 열기
		 * 필터적용시 listener로 선택된 데이타 전달
		 * Events:
		 *  change-filter   filter를 변경시 전달
		 * EventProperties:
		 *  - {Object}  selectedData    선택된 값들
		 *  - {Object}  filterData      선택된 값이 적용된 filterData
		 * @param {Object}  filterData    	filter를 구성하는 data
		 * @return {ProductsFilter}
		 */
		open: function ( filterData ) {
			this._model = $B.object.clone( filterData );
			this._originModel = $B.object.clone( filterData );

			this._modal = AP.modal.full({
				title: '검색필터',
				contents: {
					templateKey: 'search.products-filter',
					templateModel: {
						uId: this.__uId__,
						model : this._model
					}
				},
				containerClass: 'search_filter'
			});

			this._$modal = this._modal.getElement();
			// <span> 추가
			this._$modal.find( '.color_chip' ).each(function () {
				if ( $( this ).find( '> span' ).length < 5 ) {
					var spanLength = 5 - $( this ).find( '> span' ).length;
					for ( var i = 0; i < spanLength; ++i ) {
						$( this ).append( '<span></span>' );
					}
				}
			});

			//plugin 적용
			this._setPlugins();
			this._setEvents();

			this._modal.addListener( 'modal-before-close', function (e) {
				this._removeEvents();
			}.bind(this));

			return this;
		},

		/** =============== Private Methods =============== */

		_setPlugins: function () {
			this._$modal.find( '.ui_accordion' ).accordion();
		},

		_setEvents: function () {
			this._$modal.find( 'input:checkbox' ).on( 'change', function (e) {
				this._setModel( $(e.currentTarget).data('group'), $(e.currentTarget).val(), $(e.currentTarget).is(':checked') );
			}.bind(this));

			//초기화
			this._$modal.find( '.btn_reset' ).on( 'click', function (e) {
				this._reset();
			}.bind(this));

			//필터적용
			this._$modal.find( '.btn_confirm' ).on( 'click', function (e) {
				this._modal.close();

				if ( !$B.isEqual(this._originModel, this._model) ) {
					//이벤트 전달

					this.dispatch( 'change-filter', {
						selectedData: this._getSelectedData(),
						filterData: this._model
					});
				}
			}.bind(this));
		},

		_removeEvents: function () {
			this._$modal.find( '.ui_accordion' ).accordion( 'clear' );
			this._$modal.find( 'input:checkbox' ).off( 'change' );
			this._$modal.find( '.btn_reset' ).off( 'click' );
			this._$modal.find( '.btn_confirm' ).off( 'click' );
		},

		_setModel: function ( groupKey, value, checked ) {
			for ( var i = 0; i < this._model.length; ++i ) {
				if ( this._model[i]['addAttrCode'] === groupKey ) {
					for ( var j = 0; j < this._model[i]['addAttrVals'].length; ++j ) {
						if ( this._model[i]['addAttrVals'][j]['addAttrValCode'] == value ) {
							this._model[i]['addAttrVals'][j].selected = checked;
						}
					}
				}
			}
		},

		_getSelectedData: function () {
			var result = {};
			$.each( this._model, function ( index, value ) {
				var groupKey = value.addAttrCode;
				for ( var i = 0; i < value.addAttrVals.length; ++i ) {
					if ( value.addAttrVals[i].selected == true ) {
						if ( !result.hasOwnProperty( groupKey )) {
							result[groupKey] = [];
						}
						result[groupKey].push( value.addAttrVals[i] );
					}
				}
			}.bind( this ));

			return $B.isEmpty( result )? undefined : result;
		},

		_reset: function () {
			_.each( this._model, function ( group ) {
				_.each( group['addAttrVals'], function ( prop ) {
					prop.selected = false;
				});
			});

			this._$modal.find( 'input:checkbox' ).prop( 'checked', false );
		}

	});


	AP.ProductsFilter = ProductsFilter;
})( jQuery );