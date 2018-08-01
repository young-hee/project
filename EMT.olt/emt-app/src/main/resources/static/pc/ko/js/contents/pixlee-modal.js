/**
 * 에뛰드픽 > pixlee modal
 */
;(function ( $ ) {
	'use strict';

	var PixleeModal = $B.Class.extend({
		CENTER_IDX: 4,

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
			this._currentIdx = this._correctIdx( parseInt(idx) );

			var modal = AP.modal.open({
				templateKey: 'common.pixlee-detail-modal',
				templateModel: {
					model: this._model
				},
				containerClass: 'layer_etude_pick'
			});

			this._$modal = modal.getElement();
			this._$viewSlide = this._$modal.find( '.view.slide' );
			this._$itemsArea = this._$viewSlide.find( '.ix-list-items' );
			this._$thumbSlide = this._$modal.find( '.thumbnail.slide' );
			this._resetList();
			this._setEvents();

			modal.addListener( 'modal-before-close', function (e) {
				this._removeEvents();
			}.bind(this));

			return this;
		},

		/** =============== Private Methods =============== */

		_setEvents: function (e) {
			this._$viewSlide.on( 'ixSlideLite:change', function (e) {
				this._currentIdx = ( e.direction === 'next' )? this._currentIdx + 1 : this._currentIdx - 1;
				this._currentIdx = this._correctIdx( this._currentIdx );
				if ( this._model.length > 2 ) this._resetList();

				this._setThumbnail( e.direction, 1 );
			}.bind(this));

			this._$thumbSlide.on( 'click', '.ix-list-items button', function (e) {
				var $li = $( e.currentTarget ).parent(),
					currentIdx = $li.data( 'origin-idx' );

				if ( this._currentIdx != currentIdx ) {
					var	oldIdx = this._$thumbSlide.find( '.ix-list-item[aria-hidden="false"]:eq(' + this.CENTER_IDX + ')' ).data( 'idx' ),
						idx = $li.data( 'idx' ),
						range = idx - oldIdx,
						direction = ( range >= 0 )? 'next' : 'prev';

					this._currentIdx = currentIdx;
					this._resetList();
					this._setThumbnail( direction, Math.abs(range) );
				}
			}.bind(this));

			this._$thumbSlide.ixSlideMax({
				defaultIndex: this._correctIdx( this._currentIdx - this.CENTER_IDX )
			});
			this._setThumbnail();
		},

		_removeEvents: function () {
			this._$viewSlide.off( 'ixSlideLite:change' ).ixSlideLite( 'clear' );
			this._$thumbSlide.off( 'click' ).ixSlideMax( 'clear' );
		},

		_setThumbnail: function ( direction, rangeLength ) {
			if ( direction ) {
				this._$thumbSlide.ixSlideMax( direction, rangeLength );
			}

			this._$thumbSlide.find( '.ix-list-item button' ).removeClass( 'on' );
			this._$thumbSlide.find( '.ix-list-item[data-origin-idx=' + this._currentIdx + '] button' ).addClass( 'on' );
		},

		_resetList: function () {
			this._$viewSlide.ixSlideLite( 'clear' );

			var html = AP.common.getTemplate( 'common.pixlee-detail-list', this._getCurrentModel() );
			this._$itemsArea.html( html );

			this._$viewSlide.ixSlideLite({
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