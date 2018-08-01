/**
 * 뷰티라이프 > etude pick
 */
;(function ( $ ) {
	'use strict';

	var EtudePick = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container' );
			this._$listArea = this._$target.find( '.etude_pick_list' );
			this._$loading = this._$listArea.find( '.loading' );
			this._pixleeLoaded = false;
			this._page = 0;
			this._model = [];

			this._setPixleeList();
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setPixleeList: function () {
			this._getPixleeData();

			this._$listArea.on( 'click', 'a', function (e) {
				e.preventDefault();

				if ( this._pixleeLoaded ) {
					var idx = $( e.currentTarget ).find( 'img' ).attr( 'data-idx' ),
						pixleeModal = new AP.PixleeModal( this._model ).open( idx );
				}
			}.bind(this));

			this._winScrollend = new $B.event.ScrollEnd( window )
				.gap({bottom: AP.footer.getHeight()})
				.addListener( 'scrollbottom', function (e) {
					if ( !this._$loading.is(':visible') ) {
						this._getPixleeData();
					}
				}.bind(this)).disable();

			$( window ).on( 'load resize', function (e) {
				this._winScrollend.gap({
					bottom: AP.footer.getHeight()
				});
			}.bind(this));
		},

		_addPixleeList: function ( result ) {
			var $designImgs = this._$listArea.find( 'img:not(.ignore)' ),
				designLength = $designImgs.length,
				startIdx = ( result.page - 1 ) * result.per_page,
				drawLength = 0;

			for ( var i = startIdx; i < designLength; ++i ) {
				var $designImg = $designImgs.eq( i ),
					data = result.data[i];

				if ( data ) {
					$designImg.data( 'src', data.pixlee_cdn_photos.square_medium_url ).attr( 'data-idx', i );
					drawLength++;
				}
			}

			if ( this._model.length > (startIdx + drawLength) ) {
				var html = AP.common.getTemplate( 'display.etude-pick.pixlee-list', {
					startIdx: startIdx + drawLength,
					data: result.data.slice( drawLength )
				});

				this._$listArea.find( '.etc_list' ).append( html );
			}
		},

		_getPixleeData: function () {
			this._page++;
			this._$loading.show();

			AP.api.getPixleePhotos({
				albumId: '2956835'//Homepage Gallery
			}, {
				page: this._page
			}).done(function ( result ) {
				if ( result.total ) {
					this._model = this._model.concat( result.data );
					this._addPixleeList( result );
					AP.lazyLoad.add( '.etude_pick_list img.lazy_load' );
					this._$loading.hide();
					this._pixleeLoaded = true;
					this._winScrollend.enable().trigger();
				}

				//다음 데이타가 없으면
				if ( !result.next ) {
					this._winScrollend.clear();
				}
			}.bind(this)).fail(function (e) {
				this._winScrollend.clear();
				AP.modal.alert( '데이타를 불러오지 못했습니다.' );
			}.bind(this));
		}
	});


	AP.etudePick = new EtudePick();
})( jQuery );