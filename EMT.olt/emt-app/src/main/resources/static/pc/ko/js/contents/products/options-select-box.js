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
		 * @param {Boolean}	viewThumbnail	썸네일 노출 여부
		 */
		initialize: function ( $appendTarget, model, viewThumbnail ) {
			this._$appendTarget = $appendTarget;
			this._defaultModel = model;
			this._viewThumbnail = viewThumbnail;
		},

		/** =============== Public Methods =============== */

		/**
		 * 기본설정
		 */
		setDefault: function () {
			this._draw({
				viewThumbnail: this._viewThumbnail,
				prodTypeCode: this._defaultModel.prodTypeCode,
				bulkIncludedProds: this._defaultModel.bulkIncludedProds,
				options: this._defaultModel.products,
				productCount: this._defaultModel.productCount
			});
		},

		/**
		 * 옵션삭제
		 */
		remove: function () {
			this._$appendTarget.find( '.ui_select' ).designSelectBox( 'clear' );
		},

		/** =============== Private Methods =============== */

		_draw: function ( data ) {
			var html = AP.common.getTemplate( 'products.option-selectbox', data ),
				$select = $( html );

			this._$appendTarget.append( $select );

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