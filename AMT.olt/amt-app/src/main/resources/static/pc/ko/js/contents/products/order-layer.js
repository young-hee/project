/**
 * 제품상세 : side 주문 영역 (scroll의 따른 fixed 처리)
 */
;(function ( $ ) {
	'use strict';

	var OrderLayer = $B.Class.extend({
		DEFAULT_HEIGHT: 900,
		MIN_HEIGHT: 400,

		/**
		 * @param {jQuery}	$target		영역설정
		 * @param {Object}	model
		 * @param {Object}	options
		 * 	- {Boolean}	layerFixed			scroll에 따른 layer fixed 처리 허용 여부
		 */
		initialize: function ( $target, model, options ) {
			this._$target = $target;
			this._$win = $( window );
			this._$tabs = $( '.tab_menu' );
			this._$selectBoxArea = this._$target.find( '.selectbox_area' );
			this._$selectedOptionArea = this._$target.find( '.scroll_area' );
			this._$orderBottomArea = this._$target.find( '.order_bottom' );

			this._options = options || {};
			this._defaultModel = model;

			if ( this._options.layerFixed ) {
				if ( this._$tabs.length ) {
					this._$startHeightTartget = this._$tabs;
				} else {
					this._$startHeightTartget = $( '.gnb_area' );
				}

				this._top = this._getTop();
				this._fixedState = '';
				this._setFixedEvents();
			}
		},

		/** =============== Public Methods =============== */

		/**
		 * 	포지션이 변경되었을시 계산하여 fixed 및 사이즈 반영
		 * 	@param {Boolean}	trigger		true설정시 중복실행 방지 해제
		 */
		resetPosition: function ( trigger ) {
			if ( !this._options.layerFixed ) return;

			var scrollY = this._$win.scrollTop(),
				startY = this._getStartY(),
				endY = this._getEndY(),
				layerH = this._getLayerHeight();

			if ( scrollY >= (startY + this._top) ) {
				if ( (scrollY + layerH + this._startH) > endY ) {
					//맨끝
					if ( trigger || this._fixedState !== 'bottom-activate' ) {
						this._$target.removeClass( 'fixed' ).css({
							position: 'absolute',
							top: 'auto',
							bottom: 0,
							height: layerH + 'px'
						});

						this._setInnerHeight();
						this._fixedState = 'bottom-activate';
					}
				} else {
					//시작
					if ( trigger || this._fixedState !== 'top-activate' ) {
						this._$target.addClass( 'fixed' ).css({
							position: '',
							top: this._startH + 'px',
							bottom: '',
							height: layerH + 'px'
						});

						this._setInnerHeight();
						this._fixedState = 'top-activate';
					}
				}
			} else {
				if ( trigger || this._fixedState !== 'deactivate' ) {
					this._$target.removeClass( 'fixed' ).css({
						position: '',
						top: '',
						height: ( (layerH - this._top) < this.DEFAULT_HEIGHT ? layerH - this._top : this.DEFAULT_HEIGHT ) + 'px'
					});

					this._fixedState = 'deactivate';
				}
			}
		},

		/** =============== Private Methods =============== */

		/**
		 * 기본 이벤트 설정
		 */
		_setFixedEvents: function () {
			$( window ).on( 'load resize set-height', function (e) {
				this._startH = this._$startHeightTartget.height() || 0;
				this._winH = this._$win.height();

				this.resetPosition();
				this._setInnerHeight();
			}.bind(this));

			$( window ).on( 'scroll', function (e) {
				this.resetPosition();
			}.bind(this));

			//기본 높이값 구하기
			$( window ).triggerHandler( 'set-height' );
		},

		_getLayerHeight: function () {
			var result = 0,
				targetH = ( this._$tabs.length )? this._$target.parent().height() - this._startH : this._$target.parent().height();

			result = this._winH - this._startH;

			if ( result > targetH ) {
				result = targetH;

				if ( result < this.MIN_HEIGHT ) {
					result = this.MIN_HEIGHT;
				}
			}

			return result;
		},

		_setInnerHeight: function () {
			this._$selectedOptionArea.css({
				height: ( this._$target.height() - this._$selectBoxArea.outerHeight() - this._$orderBottomArea.outerHeight() ) + 'px'
			});
		},

		//y의 시작점 반환
		_getStartY: function () {
			return this._$target.parent().offset().top;
		},

		//y의 끝점 반환
		_getEndY: function () {
			return this._getStartY() + this._$target.parent().height();
		},

		_getTop: function () {
			var top = parseFloat( this._$target.css('top') );

			if ( top ) {
				top = top - this._$startHeightTartget.height();
			}

			return top || 0;
		}

	}, 'OrderLayer');


	AP.OrderLayer = OrderLayer;
})( jQuery );