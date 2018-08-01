/**
 * 에뛰드픽 > pixlee modal
 */
;(function ( $ ) {
	'use strict';

	var PixleeModal = $B.Class.extend({

		initialize: function ( data ) {
			this._model = data;
			this._currentIdx = 0;
		},

		/** =============== Public Methods =============== */

		/**
		 * 컬러 비교보기 모달 열기
		 * @param {Object}  idx    현재 index
		 * @return {PixleeModal}
		 */
		open: function ( idx ) {
			this._currentIdx = this._correctIdx( idx );

			var modal = AP.modal.full({
				title: '#에뛰드 픽',
				contents: {
					templateKey: 'common.pixlee-detail-modal'
				},
				containerClass: 'etude_pick_layer'
			});

			this._$modal = modal.getElement();
			this._$slide = this._$modal.find( '.slide' );
			this._$titleArea = this._$modal.find( '.layer_title' );
			this._$viewport = this._$modal.find( '.ix-list-viewport' );
			this._$itemsArea = this._$modal.find( '.ix-list-items' );
			this._resetList();
			this._setEvents();
			this._setViewportHeight();

			modal.addListener( 'modal-before-close', function (e) {
				this._removeEvents();
			}.bind(this));

			return this;
		},

		/** =============== Private Methods =============== */

		_setEvents: function (e) {
			this._$modal.find( '.prev, .next' ).on( 'click', function (e) {
				e.preventDefault();

				if ( $(e.currentTarget).hasClass('next') ) {
					this._$slide.ixSlideLite( 'next' );
				} else {
					this._$slide.ixSlideLite( 'prev' );
				}
			}.bind(this));

			this._$slide.on( 'ixSlideLite:change', function (e) {
				this._currentIdx = ( e.direction === 'next' )? this._currentIdx + 1 : this._currentIdx - 1;
				this._currentIdx = this._correctIdx( this._currentIdx );

				if ( this._model.length > 2 ) this._resetList();
				this._setViewportHeight();
			}.bind(this));

			this._resizeHandler = function (e) {
				this._$slide.ixSlideLite( 'resize' );
				this._setViewportHeight();
			}.bind( this );

			$( window ).on( 'resize', this._resizeHandler );
		},

		_removeEvents: function () {
			this._$modal.find( '.prev, .next' ).off( 'click' );
			this._$slide.off( 'ixSlideLite:change' ).ixSlideLite( 'clear' );
			if ( this._resizeHandler ) $( window ).off( 'resize', this._resizeHandler );
		},

		_setViewportHeight: function () {
			var winH = window.innerHeight,
				headerH = this._$titleArea.outerHeight(),
				posH =  Math.abs( winH ) - Math.abs( headerH );//iPhone height bugfix

			this._$viewport.css( 'height', posH + 'px');
		},

		_resetList: function () {
			this._$slide.ixSlideLite( 'clear' );

			var html = AP.common.getTemplate( 'common.pixlee-detail-list', this._getCurrentModel() );
			this._$itemsArea.html( html );

			this._$slide.ixSlideLite({
				defaultIndex: 1
			});
		},

		_getCurrentModel: function () {
			var fistIdx = this._correctIdx( this._currentIdx - 1 ),
				secondIdx = this._currentIdx,
				thirdIdx = this._correctIdx( this._currentIdx + 1 );

			return [this._model[fistIdx], this._model[secondIdx], this._model[thirdIdx]];
		},

		_correctIdx: function ( idx ) {
			var result = idx;

			if ( 0 > idx ) {
				result = this._model.length + idx;
			} else if ( idx > this._model.length - 1 ) {
				result = idx - this._model.length;
			}

			return result;
		}

	});


	AP.PixleeModal = PixleeModal;
})( jQuery );