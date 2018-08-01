/**
 * 뷰티라이프 메인
 */
;(function ( $ ) {
	'use strict';

	var BeautyLife = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container' );
			this._$etudePicks = this._$target.find( '.etude_pick_list li' );
			this._pixleeLoaded = false;
			this._model = [];

			this._setEtudeLooks();
			this._setPixleeList();
			this._setChEtude();
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setEtudeLooks: function () {
			//slide 적용
			var $etudeLooks = this._$target.find( '.visual' ),
				$slide = $etudeLooks.find( '.slide' );

			$slide.on( 'ixSlideMax:init ixSlideMax:change', function (e) {
				$slide.find( '.paging' ).show();
				$slide.find( '.paging .current' ).text( e.currentIndex + 1 );
				$slide.find( '.paging .total' ).text( e.totalLength );
			}).ixSlideMax();
		},

		_setChEtude: function () {
			//slide 적용
			var $chEtude = this._$target.find( '.ch_etude' );

			$chEtude.find( '.slide' ).ixSlideMax();
			//youtube
			$chEtude.find( '.youtube_video' ).video();
			AP.lazyLoad.add( 'img.lazy_load' );
		},

		_setPixleeList: function () {
			if ( !this._$etudePicks.length ) return;

			this._getPixleeData();

			this._$target.find( '.etude_pick_list' ).on( 'click', 'a', function (e) {
				e.preventDefault();

				if ( this._pixleeLoaded ) {
					var idx = $( e.currentTarget ).parent().index(),
						pixleeModal = new AP.PixleeModal( this._model ).open( idx );
				}
			}.bind(this));
		},

		_drawPixleeList: function ( data ) {
			_.each( data, function (photoData, idx) {
				//thumbnail_url 은 이미지가 누락되는 경우가 많아 square_medium_url 사용
				this._$etudePicks.eq( idx ).find( 'img' ).data( 'src', photoData.pixlee_cdn_photos.square_medium_url );
			}.bind(this));
		},

		_getPixleeData: function () {
			AP.api.getPixleePhotos({
				albumId: '2956835'//Homepage Gallery
			}, {
				page: 1,
				per_page: 6
			}).done(function ( data ) {
				if ( data.total ) {
					this._model = data.data;
					this._drawPixleeList( data.data );
					AP.lazyLoad.add( '.etude_pick_list img.lazy_load' );
					this._pixleeLoaded = true;
				}
			}.bind(this)).fail(function (e) {
				AP.modal.alert( 'Etude Pick 데이타를 불러오지 못했습니다.' );
			}.bind(this));
		}
	});


	AP.beautyLife = new BeautyLife();
})( jQuery );