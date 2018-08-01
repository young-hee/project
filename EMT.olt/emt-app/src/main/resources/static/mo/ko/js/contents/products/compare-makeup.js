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

			this._modal = AP.modal.full({
				title: 'MAKE UP 비교',
				contents: {
					templateKey: 'products.compare-makeup',
					templateModel: {
						uId: this.__uId__,
						products : this._model
					}
				},
				containerClass: 'compare_makeup'
			});

			this._$modal = this._modal.getElement();

			//plugin 적용
			this._setPlugins();
			this._setEvents();
			this._drawSelectedThumb();

			this._modal.addListener( 'modal-before-close', function (e) {
				this._removeEvents();
			}.bind(this));

			return this;
		},

		/** =============== Private Methods =============== */

		_setPlugins: function () {
			this._$modal.find( '.slide' ).ixSlideMax();

			this._resizeHandler = function () {
				this._$modal.find( '.slide' ).ixSlideMax( 'resize' );
			}.bind(this);

			AP.responsiveWidth.addListener( 'resize', this._resizeHandler );
		},

		_setEvents: function () {
			this._$modal.find( '.btn_float_close' ).on( 'click', function (e) {
				var $el = this._$modal.find( '.option_floating' );

				if ( $el.hasClass('open') ) {
					$el.removeClass( 'open' );
				} else {
					$el.addClass( 'open' );
					this._$modal.find( '.slide' ).ixSlideMax( 'resize' );
				}
			}.bind(this));

			this._$modal.find( '.slide a' ).on( 'click', function (e) {
				var $btn = $( e.currentTarget );

				if ( !$btn.hasClass('check') ) {
					this._addPreviewImg( $btn );
				}
			}.bind(this));
		},

		_removeEvents: function () {
			this._$modal.find( '.slide' ).ixSlideMax( 'clear' );
			this._$modal.find( '.slide a' ).off( 'click' );
			this._$modal.find( '.btn_float_close' ).off( 'click' );

			if ( this._resizeHandler ) {
				AP.responsiveWidth.removeListener( 'resize', this._resizeHandler );
				this._resizeHandler = null;
			}
		},

		_addPreviewImg: function ( $btn ) {
			var selectedModel = _.where( this._model, {prodSn: $btn.data('prod-sn')} )[0];

			this._$modal.find( '.notice' ).hide();
			this._$modal.find( '.preview_area' ).show();

			$btn.addClass( 'check' );
			this._selectedData.push( selectedModel );

			if ( this._selectedData.length > this.MAX_SELECT ) {
				var removeData = this._selectedData.shift();
				this._$modal.find( '.slide a[data-prod-sn="' + removeData.prodSn + '"]' ).removeClass( 'check' );
				this._$modal.find( '.preview_area li[data-prod-sn="' + removeData.prodSn + '"]' ).remove();
			}

			this._drawSelectedThumb();

			var html = AP.common.getTemplate( 'products.compare-makeup-list', [selectedModel] );
			this._$modal.find( '.preview_area ul' ).prepend( html );
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

			this._$modal.find( '.select_colors ul' ).html( AP.common.getTemplate('products.compare-makeup-selected-list', templateData) );
		}

	});


	AP.CompareMakeup = CompareMakeup;
})( jQuery );