/**
 * Ch.Etude : main 페이지 영역 요소들 제어
 *
*/
;(function ( $ ) {
	'use strict';

	var ChEtudeMain = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );
			this._$result = this._$target.find( '.ch_etude_list > ul' );
			this._$paging = this._$target.find( '.pagination' );
			this._$loading = this._$target.find( '.loading' );

			this._api = null;

			this._setSlide();
			this._setEvents();
			this._getData( 0 );
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setEvents: function () {
			//paging
			this._$paging.on( 'paging-change', function (e) {
				this._getData( e.offset );
			}.bind(this));
		},

		_getData: function ( offset ) {
			if ( this._api ) this._api.abort();

			this._api = AP.api.articles( null, { // 종료일이 가장 빠른 동영상이 위로 올라오도록 데드라인이 얼마 안남은 동영상을 최근 동영상으로
				articleCateId: 'chEtude',
				order: 'Deadline',
				offset: offset,
				limit: 12
			}).done(function ( result ) {
				var data = result.articleSearchResult;

				this._$loading.hide();
				this._drawList( data );
			}.bind(this)).fail(function ( xhr ) {
				//
			}.bind(this));
		},

		_drawList: function ( data ) {
			var html = AP.common.getTemplate( 'display.ch-etude.video-list', data );
			this._$result.html( html );

			if ( data.limit < data.totalCount ) {
				this._$paging.show().paging( 'clear' ).paging({
					offset: data.offset,
					limit: data.limit,
					totalCount: data.totalCount
				});
			}
		},

		//slide 적용
		_setSlide: function () {
			this._$target.find( '.slide' ).find( '.ix-ratio-size-apply' ).css( 'height', '' );
			this._$target.find( '.slide' ).ixSlideMax();
		}

	});

	AP.chEtudeMain = new ChEtudeMain();
})( jQuery );