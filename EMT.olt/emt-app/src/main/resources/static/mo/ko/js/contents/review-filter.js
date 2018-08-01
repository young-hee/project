/**
 * 제품상세 : 리뷰필터
 * Events:
 *  change-filter   filter 변경시 전달
 * EventProperties:
 *  - {Object}  selectedData    선택된 값들
*/
;(function ( $ ) {
	'use strict';

	var ReviewFilter = $B.Class.extend({
		DEFAULT_MODEL: {
			prodReviewType: {
				label: '종류',
				properties: [
					{label: '전체', value: 'All', selected: true},
					{label: '구매자 후기', value: 'Pur', selected: false},
					{label: '리뷰', value: 'Prod', selected: false}
				]
			},
			prodReviewSort: {
				label: '정렬',
				properties: [
					{label: '최근등록순', value: 'Last', selected: true},
					{label: '높은별점순', value: 'HighScope', selected: false},
					{label: '낮은별점순', value: 'LowScope', selected: false}
				]
			},
			scope: {
				label: '별점',
				properties:	[
					{label: '별점전체', value: 'All', rating: 'All', selected: true},
					{label: '별 5개', value: 5, rating: 5, selected: false},
					{label: '별 4개', value: 4, rating: 4, selected: false},
					{label: '별 3개', value: 3, rating: 3, selected: false},
					{label: '별 2개', value: 2, rating: 2, selected: false},
					{label: '별 1개', value: 1, rating: 1, selected: false}
				]
			}
		},

		/**
		 * @param {Array}  products    옵션 products
		 */
		initialize: function ( products ) {
			this._model = $B.object.clone( this.DEFAULT_MODEL );

			if ( products ) {
				this._model.products = {properties: []};

				_.each( products, function ( product ) {
					this._model.products.properties.push({
						label: product.prodName,
						value: product.prodSn,
						selected: false
					});
				}.bind(this));
			}
		},

		/** =============== Public Methods =============== */

		/**
		 * 리뷰필터 모달 열기
		 */
		open: function () {
			this._modal = AP.modal.full({
				title: '필터',
				contents: {
					templateKey: 'common.review-filter',
					templateModel: {
						uId: this.__uId__,
						model : this._model
					}
				},
				containerClass: 'review_filter'
			});

			this._$modal = this._modal.getElement();

			//plugin 적용
			this._setPlugins();
			this._setEvents();
			this._setDefault();

			this._modal.addListener( 'modal-before-close', function (e) {
				this._removeEvents();
			}.bind(this));
		},

		/**
		 * 선택된 filterData 반환
		 * @returns {Object}
		 */
		getSelectedData: function () {
			return this._getSelectedData();
		},

		/** =============== Private Methods =============== */

		_setPlugins: function () {
			this._$modal.find( '.ui_accordion' ).accordion();
		},

		_setDefault: function () {
			this._$modal.find( '.ui_accordion dl' ).each( function (idx, el) {
				var label = $( el ).find( 'input:radio:checked' ).data( 'label' );
				$( el ).find( 'dt .title > em' ).text( label );
			});
		},

		_setEvents: function () {
			this._$modal.find( 'select' ).on( 'change', function (e) {
				this._setModel( $(e.currentTarget).data('group'), $(e.currentTarget).val() );

				//이벤트 전달
				this.dispatch( 'change-filter', {
					selectedData: this._getSelectedData()
				});
			}.bind(this));

			this._$modal.find( 'input:radio' ).on( 'change', function (e) {
				this._setSelectRadio( $(e.target) );
				this._setModel( $(e.currentTarget).data('group'), $(e.currentTarget).val() );

				//이벤트 전달
				this.dispatch( 'change-filter', {
					selectedData: this._getSelectedData()
				});
			}.bind(this));
		},

		_removeEvents: function () {
			this._$modal.find( '.ui_accordion' ).accordion( 'clear' );
			this._$modal.find( 'input:radio' ).off( 'change' );
			this._$modal.find( 'select' ).off( 'change' );
		},

		_setSelectRadio: function ( $radio ) {
			$radio.closest( 'dl' ).find( 'dt .title > em' ).text( $radio.data('label') );
		},

		_setModel: function ( groupKey, value ) {
			_.each( this._model[groupKey].properties, function ( prop ) {
				prop.selected = ( prop.value == value );
			});
		},

		_getSelectedData: function () {
			var result = {};
			
			if( this._$modal ){
				this._$modal.find( 'select' ).each( function (idx, el) {
					var $select = $( el ),
						group = $select.data( 'group' ),
						value = $select.val();
	
					result[group] = this._getSelectedModel( group, value );
				}.bind(this));
	
				this._$modal.find( '.ui_accordion dl' ).each( function (idx, el) {
					var $radio = $( el ).find( 'input:radio:checked' ),
						group = $radio.data( 'group' ),
						value = $radio.val();
	
					result[group] = this._getSelectedModel( group, value );
				}.bind(this));
			}

			return result;
		},

		_getSelectedModel: function ( group, value ) {
			var result;

			_.some( this._model[group].properties, function (prop) {
				if ( prop.value == value ) {
					result = prop;
					return true;
				}
			});

			return result;
		}

	});


	AP.ReviewFilter = ReviewFilter;
})( jQuery );