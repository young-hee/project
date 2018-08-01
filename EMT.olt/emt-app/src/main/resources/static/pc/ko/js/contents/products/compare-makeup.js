/**
 * 제품상세 : 메이크업 비교
 */
;(function ( $ ) {
	'use strict';

	var CompareMakeup = $B.Class.extend({
		MAX_SELECT: 6,

		initialize: function () {
			//
		},

		/** =============== Public Methods =============== */

		/**
		 * 메이크업 비교 모달 열기
		 * @param {Object}  products
		 * @return {modal}
		 */
		open: function ( products ) {
			this._model = products;
			this._selectedData = [];

			this._modal = AP.modal.info({
				title: 'MAKE UP 비교',
				contents: {
					templateKey: 'products.compare-makeup',
					templateModel: {
						uId: this.__uId__,
						products : this._model
					}
				},
				containerClass: 'compare_makeup',
				sizeType: 'L'
			});

			this._$modal = this._modal.getElement();

			this._setEvents();
			this._drawSelectedThumb();

			this._modal.addListener( 'modal-before-close', function (e) {
				this._removeEvents();
			}.bind(this));

			return this;
		},

		/** =============== Private Methods =============== */

		_setEvents: function () {
			this._$modal.find( '.color_chip_list a' ).on( 'click', function (e) {
				var $li = $( e.currentTarget ).parent();

				if ( !$li.hasClass('on') ) {
					this._addPreviewImg( $li );
				}
			}.bind(this));
		},

		_removeEvents: function () {
			this._$modal.find( '.color_chip_list a' ).off( 'click' );
		},

		_addPreviewImg: function ( $li ) {
			var selectedModel = _.where( this._model, {prodSn: $li.data('prod-sn')} )[0];

			$li.addClass( 'on' );
			this._selectedData.push( selectedModel );

			if ( this._selectedData.length > this.MAX_SELECT ) {
				var removeData = this._selectedData.shift();
				this._$modal.find( '.color_chip_list li[data-prod-sn="' + removeData.prodSn + '"]' ).removeClass( 'on' );
				this._$modal.find( '.compare_result li[data-prod-sn="' + removeData.prodSn + '"]' ).remove();
			}

			this._drawSelectedThumb();

			var html = AP.common.getTemplate( 'products.compare-makeup-list', [selectedModel] );
			this._$modal.find( '.compare_result' ).prepend( html );
			this._$modal.find( '.no_result' ).remove();
		},

		_drawSelectedThumb: function () {
			var templateData = [],
				selectLength = this._selectedData.length;

			for ( var i = 0; i < this.MAX_SELECT; ++i ) {
				if ( selectLength > i ) {
					templateData.push( this._selectedData[i] );
				} else {
					templateData.push( {} );
				}
			}

			this._$modal.find( '.selected_colors ul' ).html( AP.common.getTemplate('products.compare-makeup-selected-list', templateData) );
		}

	});


	AP.CompareMakeup = CompareMakeup;
})( jQuery );