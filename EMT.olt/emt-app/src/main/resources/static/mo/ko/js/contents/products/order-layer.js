/**
 * 제품상세 : 옵션 layer 열고, 닫기, 사이즈 관리
 */
;(function ( $ ) {
	'use strict';

	var OrderLayer = $B.Class.extend({

		/**
		 * @param {jQuery}	$target		'.option_layer'
		 */
		initialize: function ( $target ) {
			this._$target = $( $target );
			this._setDefaultEvents();
		},

		/** =============== Public Methods =============== */

		/**
		 * 상품옵션 레이어 열기
		 */
		open: function () {
			if ( this.isOpen() ) return;

			this._$target.removeClass( 'close' ).addClass( 'open' );
			this._$target.find( '.option_wrap' ).scrollTop( 0 );
			this._setOptionLayerMaxHeight( 'ani' );

			//dim
			$( '#ap_container' ).append( '<div class="option_layer_dim"></div>' );
			this._setSizeEvents();
		},

		/**
		 * 상품옵션 레이어 닫기
		 */
		close: function () {
			this._$target.removeClass( 'open' ).addClass( 'close' );
			this._setOptionLayerMaxHeight( 'clear' );

			//dim
			$( '#ap_container .option_layer_dim' ).remove();

			this._$target.find( '.ui_select' )
				.off( 'design-selectbox-options-show', this.optionSelectBoxHeightHandler )
				.off( 'design-selectbox-options-hide', this.optionSelectBoxHeightHandler );
		},

		/**
		 * 현재 열려있는 상태 인지 반환
		 * @returns {Boolean}
		 */
		isOpen: function () {
			return this._$target.hasClass( 'open' );
		},

		/** =============== Private Methods =============== */

		//selectbox 사이즈 조절 이벤트 등록
		_setSizeEvents: function () {
			this._$target.find( '.ui_select' )
				.off( 'design-selectbox-options-show', this.optionSelectBoxHeightHandler )
				.off( 'design-selectbox-options-hide', this.optionSelectBoxHeightHandler )
				.on( 'design-selectbox-options-show', this.optionSelectBoxHeightHandler )
				.on( 'design-selectbox-options-hide', this.optionSelectBoxHeightHandler );
		},

		_setDefaultEvents: function () {
			//닫기 아이콘
			this._$target.find( '.btn_float_close' ).on( 'click', function (e) {
				this.close();
			}.bind(this));

			//design selectebox 높이 설정
			this.optionSelectBoxHeightHandler = function (e) {
				var $parent = $( e.currentTarget ).parent( ),
					$options = $( e.currentTarget ).find( '.select_options' );

				if ( e.type === 'design-selectbox-options-show' ) {
					this._$target.addClass( 'select' );
					$parent.addClass( 'on' );
					this._$target.find( '.option_wrap' ).scrollTop( 0 );
					this._setOptionLayerMaxHeight( 'to' );
					this._setOptionLayerHeight( $options );
				} else {
					this._$target.removeClass( 'select' );
					$parent.removeClass( 'on' );
					this._$target.find( '.option_wrap' ).scrollTop( 0 );
					this._setOptionLayerMaxHeight( 'to' );
					this._setOptionLayerHeight( $options, true );
				}
			}.bind(this);

			//구매하기 클릭
			this._$target.find( '.btn_open_order_layer' ).on( 'click', function (e) {
				this.open();
			}.bind(this));
		},

		//option layer max-height 설정
		_setOptionLayerMaxHeight: function ( state ) {
			var $wrap = this._$target.find( '.option_wrap' ),
				$buy = this._$target.find( '.buy_info_wrap:visible' );

			if ( state === 'clear' ) {
				$wrap.stop().css( 'max-height', '' );
			} else {
				var pos = $( window ).height() * 0.65,//화면의 65%비율
					padding = this._getOptionLayerCssSize( $wrap, ['padding-top', 'padding-bottom'] ),
					etc = $buy.outerHeight() || 0,
					posH = pos - padding - etc;

				if ( state === 'ani' ) {
					$wrap.stop().css( 'max-height', etc + 'px' ).animate({
						'max-height': posH + 'px'
					}, {
						duration: 250,
						easing: 'easeOutSine'
					});
				} else {
					$wrap.stop().css( 'max-height', posH + 'px' );
				}
			}
		},

		//option layer : select option height 설정
		_setOptionLayerHeight: function ( $option, clear ) {
			var $wrap = this._$target.find( '.option_wrap' );

			if ( clear ) {
				$option.css( 'height', '' );
			} else {
				var wrapH = this._getOptionLayerCssSize( $wrap, ['max-height'] ),
					selectH = $option.siblings( 'button' ).outerHeight( true ),
					padding = this._getOptionLayerCssSize( $wrap, ['padding-top', 'padding-bottom'] );

				$option.css( 'height', wrapH - padding - selectH + 'px' );
			}
		},

		_getOptionLayerCssSize: function ( $el, props ) {
			var result = 0;

			_.each( props, function (prop) {
				result += parseFloat( $el.css(prop) );
			});

			return result;
		}

	}, 'OrderLayer');


	AP.OrderLayer = OrderLayer;
})( jQuery );