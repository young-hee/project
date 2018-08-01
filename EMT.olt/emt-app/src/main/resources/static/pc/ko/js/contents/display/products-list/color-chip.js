/**
 * Color chip
 *
 * @Events:
 *
 * change-color-chip	@param	{Object}
 *
 */

;(function ( $ ) {
	'use strict';

	var ColorChip = $B.Class.extend({
		initialize: function ( $target, data ) {
			this._$target = $target;

			this._color = 'all';
			this._data = data.products;

			this._setEvent();
			this._setSelect();
			this._setColorChip( this._data );
		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods =============== */
		_setEvent: function () {
			this._$target.find( '.btn_color_more, .option_close button' ).on( 'click', function (e) {
				$( e.target ).closest( '.item_option' ).toggleClass( 'open' );
				this._colorChipSlide.resize();
			}.bind( this ));

			this._$target.find( '.chips.slide' ).on( 'click', '.colors a', function (e) {
				e.preventDefault();

				var $li = $( e.target ).parent().closest( 'li' );
				var prodSn = $li.data( 'prodSn' );
				this._$target.find( '.chips.slide .colors a' ).removeClass( 'check' );
				$( e.target ).addClass( 'check' );

				$.each( this._data, function ( index, value ) {
					if ( prodSn === value.prodSn ) {
						this.dispatch( 'change-color-chip', { data: value });
					}
				}.bind( this ));
			}.bind( this ));
		},

		_setSelect: function () {
			if ( this._$target.find( '.ui_select' ).length < 1 ) return;

			this._$target.find( '.ui_select' ).designSelectBox();
			this._$target.find( '.ui_select' ).on( 'design-selectbox-change', function (e) {
				var color = $( e.target ).find( 'a.selected span[data-color]' ).data( 'color' );
				this._color = ( String( e.value ) == '00' || color == '999999' ) ? 'all' : color;

				this._colorChipSlide.init( this._color );
			}.bind( this ));
		},

		_setColorChip: function ( data ) {
			this._colorChipSlide = (function ( $slide ) {
				var SLIDE_COLOR_CHIP_MAX_LENGTH = 14,
					colorChipLength = 0;

				function getTemplate ( data, color ) {
					// products
					var sortData = [],
						groupData = [];

					// slide 형식으로 배열 구성
					if ( color == 'all' ) {
						sortData = data;
					} else {
						$.each( data, function ( index, value ) {
							if ( JSON.stringify( value.colorGroups ).indexOf( color ) > -1 ) {
								sortData.push( data[index] );
							}
						});
					}
					for ( var i = 0; i < sortData.length; ++i ) {
						if ( i % SLIDE_COLOR_CHIP_MAX_LENGTH == 0 ) {
							groupData.push([]);
						}
						groupData[parseInt( i / SLIDE_COLOR_CHIP_MAX_LENGTH )].push( sortData[i] );
					}

					// 컬러칩 갯수
					for ( var i = 0; i < sortData.length; ++i ) {
						if ( sortData[i]['colorchipTypeCode'] != 'No' ) {
							colorChipLength++;
						}
					}

					// 컬러칩 7개보다 작을때 셀렉트 박스 제거
					if ( colorChipLength <= 7 ) {
						$slide.siblings( '.btn_more' ).remove();
						$slide.siblings( '.color_group' ).remove();

						// 컬러칩 옵션 1개일때 컬러셀렉트 삭제
						if ( colorChipLength <= 1 ) {
							$slide.closest( '.item_option' ).remove();
							return;
						}
					}

					return AP.common.getTemplate( 'display.product-list.color-chip', groupData );
				}

				function initSlide ( html ) {
					$slide.find( '.ix-list-items' ).html( html );
					$slide.ixSlideMax();
				}

				return {
					init: function ( color ) {
						if ( $slide.hasClass( 'ix-slide-max-apply' )) {
							$slide.find( '.colors a' ).off( 'click' );
							$slide.ixSlideMax( 'clear' );
						}
						initSlide( getTemplate(data, color) );

						return this;
					},
					resize: function () {
						$slide.ixSlideMax( 'resize' );
					}
				};
			}( this._$target.find('.slide.chips') )).init( this._color );
		}
	});

	AP.ColorChip = ColorChip;
})( jQuery );