/**
 * 제품상세 : 주문 layer 옵션 selectbox 들 관리
 * Events:
 * 	add-selectbox	selectbox 추가시
 * 	select-option	옵션 최종 선택시점 (e.product)
 */
;(function ( $ ) {
	'use strict';

	var OptionsSelectBox = $B.Class.extend({
		COLOR_GROUP_CLASS: 'color_group',
		CHILD_ITEM_CLASS: 'child_item',

		/**
		 * @param {jQuery}	$appendTarget
		 * @param {Object}	model
		 */
		initialize: function ( $appendTarget, model ) {
			this._$appendTarget = $appendTarget;
			this._defaultModel = model;
		},

		/** =============== Public Methods =============== */

		/**
		 * 기본설정
		 */
		setDefault: function () {
			if ( this._defaultModel.productCount > 5 && this._defaultModel.colorGroups.length > 1 ) {
				//칼라그룹을 먼저 선택
				this._draw({
					colorGroupClass: this.COLOR_GROUP_CLASS,
					options: this._defaultModel.colorGroups
				}, true );
			} else {
				this._draw({
					options: this._defaultModel.products
				});
			}
		},

		/**
		 * 옵션삭제
		 */
		remove: function () {
			this._$appendTarget.find( '.ui_select' ).designSelectBox( 'clear' );
		},

		/** =============== Private Methods =============== */

		_draw: function ( data, isColorGroup ) {
			data.productCount = this._defaultModel.productCount;

			var html = AP.common.getTemplate( 'products.option-selectbox', data ),
				$el = $( html ),
				$select = $el.find( '.ui_select' ),
				$prevItem = this._$appendTarget.find( '.option_selectbox_item:last' );

			if ( $prevItem.length ) {
				$prevItem.after( $el );
			} else {
				this._$appendTarget.prepend( $el );
			}

			if ( isColorGroup ) {
				$select.on( 'design-selectbox-selected', function (e) {
					//e.value = colorGroupCode
					//기존 하위 selectbox 이벤트 삭제 및 대상삭제
					this._removeSelectBoxItem( this.CHILD_ITEM_CLASS );
					this._draw({
						childItemClass: this.CHILD_ITEM_CLASS,
						options: this._getProductWithColorGroup( e.value )
					});

					this.dispatch( 'add-selectbox' );
				}.bind(this));
			} else {
				$select.on( 'design-selectbox-selected', function (e) {
					//e.value = prodSn
					var selectedProduct = {};

					_.some( this._defaultModel.products, function (product) {
						if ( product.prodSn === e.value ) {
							selectedProduct = product;
							return true;
						}
					});

					this.dispatch( 'select-option', {
						product: selectedProduct
					});
				}.bind(this));
			}

			$select.designSelectBox();
		},

		//selectbox 이벤트 삭제 및 대상삭제
		_removeSelectBoxItem: function ( targetItemClass ) {
			this._$appendTarget.find( '.' + targetItemClass ).find( '.ui_select' ).designSelectBox( 'clear' ).off( 'design-selectbox-change design-selectbox-selected design-selectbox-options-show design-selectbox-options-hide' );
			this._$appendTarget.find( '.' + targetItemClass ).remove();
		},

		_getProductWithColorGroup: function ( colorGroupCode ) {
			var result = [];

			_.some( this._defaultModel.products, function ( product ) {
				return _.some( product.colorGroups, function ( colorGroup ) {
					if ( colorGroup.colorGroupCode === colorGroupCode ) {
						result.push( product );
						return true;
					}
				});
			});

			return result;
		}

	}, 'OptionsSelectBox');


	AP.OptionsSelectBox = OptionsSelectBox;
})( jQuery );