/**
 * 뷰티라이프 메인
 */
;(function ( $ ) {
	'use strict';

	var BeautyLife = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container' );
			this._model = [];

			this._setPixleeList();
			this._setPlugins();
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setPixleeList: function () {
			this._getPixleeData();

			this._$target.find( '.etude_pick_list' ).on( 'click', 'a', function (e) {
				e.preventDefault();

				var idx = $( e.currentTarget ).parent().index(),
					pixleeModal = new AP.PixleeModal( this._model ).open( idx );
			}.bind(this));
		},

		_drawPixleeList: function ( data ) {
			var html = AP.common.getTemplate( 'display.beauty-life.pixlee-list', data );
			this._$target.find( '.etude_pick_list' ).html( html );
		},

		_getPixleeData: function () {
			AP.api.getPixleePhotos({
				albumId: '2956835'//Homepage Gallery
			}, {
				page: 1,
				per_page: 4
			}).done(function ( data ) {
				this._$target.find( '.etude_pick_list' ).siblings( '.loading' ).remove();

				if ( data.total ) {
					this._model = data.data;
					this._drawPixleeList( data );
				}
			}.bind(this));
		},

		_setPlugins: function () {
			//slide 적용
			var $slide = this._$target.find( '.slide' );

			$slide.ixSlideMax();
			AP.responsiveWidth.addListener( 'resize', function (e) {
				$slide.ixSlideMax( 'resize' );
			});

			//youtube
			this._$target.find( '.youtube_video' ).video();
		}
	});


	AP.beautyLife = new BeautyLife();
})( jQuery );