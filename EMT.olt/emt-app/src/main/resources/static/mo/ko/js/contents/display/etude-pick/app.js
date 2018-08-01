/**
 * 뷰티라이프 > etude pick
 */
;(function ( $ ) {
	'use strict';

	var EtudePick = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container' );
			this._$listArea = this._$target.find( '.etude_instar_wrap > .list_area' );
			this._$loading = this._$target.find( '.loading' );

			this._model = [];
			this._page = 0;
			this._loading = false;

			this._setPixleeList();
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setPixleeList: function () {
			this._getPixleeData();

			this._$listArea.on( 'click', 'a', function (e) {
				e.preventDefault();

				var idx = $( e.currentTarget ).parent().index(),
					pixleeModal = new AP.PixleeModal( this._model ).open( idx );
			}.bind(this));

			this._winScrollend = new $B.event.ScrollEnd( window )
					.gap({bottom: AP.footer.getHeight()})
					.addListener( 'scrollbottom', function (e) {
						if ( !this._loading ) {
							this._getPixleeData();
						}
					}.bind(this)).disable();

			$( window ).on( 'load resize', function (e) {
				this._winScrollend.gap({
					bottom: AP.footer.getHeight()
				});
			}.bind(this));
		},

		_addPixleeList: function ( data ) {
			var html = AP.common.getTemplate( 'display.etude-pick.pixlee-list', data );
			this._$listArea.append( html );
		},

		_getPixleeData: function () {
			if ( this._loading ) return;

			this._page++;
			this._loading = true;
			this._$loading.show();

			AP.api.getPixleePhotos({
				albumId: '2956835'//Homepage Gallery
			}, {
				page: this._page
			}).done(function ( data ) {
				//다음 데이타가 없으면
				if ( !data.next ) {
					this._winScrollend.clear();
				}

				if ( data.total ) {
					this._model = this._model.concat( data.data );
					this._addPixleeList( data );
					this._winScrollend.enable().trigger();
				}
			}.bind(this)).fail(function (e) {
				this._winScrollend.clear();
				AP.modal.alert( '데이타를 불러오지 못했습니다.' );
			}.bind(this)).always(function () {
				this._loading = false;
				this._$loading.hide();
			}.bind(this));
		}
	});


	AP.etudePick = new EtudePick();
})( jQuery );