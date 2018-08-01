/**
 * Ch.Etude : main 페이지 영역 요소들 제어
 *
*/
;(function ( $ ) {
	'use strict';

	var ChEtudeMain = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );
			this._$result = this._$target.find( '.video_list' );
			this._$hashResult = this._$target.find( '.keywords' );
			this._$moreBtn = this._$target.find( '.btn_more' );
			this._$loading = this._$target.find( '.loading' );

			this._hash = '';
			this._offset = 0;
			this._api = null;

			this._setSlide();
			this._setEvents();
			this._getData( true );
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setEvents: function () {
			//더보기
			this._$moreBtn.on( 'click', function (e) {
				this._getData();
			}.bind(this));
		},

		_getData: function ( reset ) {
			//this._$loading.show();

			if ( reset ) {
				this._offset = 0;
			}

			if ( this._api ) this._api.abort();

			this._api = AP.api.articles( null, { // 종료일이 가장 빠른 동영상이 위로 올라오도록 데드라인이 얼마 안남은 동영상을 최근 동영상으로
				articleCateId: 'chEtude',
				order : 'Deadline', 
				hashTag: this._hash,
				offset: this._offset
			}).done(function ( result ) {
				var data = result.articleSearchResult;

				this._offset = data.offset + data.articleList.length;
				this._$loading.hide();
				this._drawList( data );

				if ( !this._$hashResult.hasClass('hash_draw') ) {
					this._drawHashList( data.hashTagList );
				}
			}.bind(this)).fail(function (e) {
				//
			}.bind(this));
		},

		_drawList: function ( data ) {
			var html = AP.common.getTemplate( 'display.ch-etude.video-list', data );

			if ( data.offset > 0 ) {
				this._$result.append( html );
			} else {
				this._$result.html( html );
			}
			
			if ( data.totalCount > this._offset ) {
				this._$moreBtn.show().html( '<span>더보기 (<em>' + this._offset + '</em>/' + data.totalCount + ')</span>' );
			} else {
				this._$moreBtn.hide();
			}
		},

		_drawHashList: function ( hashTagList ) {
			var html = AP.common.getTemplate( 'display.ch-etude.hash-list', hashTagList );
			this._$hashResult.html( html ).addClass( 'hash_draw' );

			this._$hashResult.find( 'input:radio' ).on( 'change', function (e) {
				this._hash = $( e.currentTarget ).val();
				this._getData( true );
			}.bind(this));
		},

		//slide 적용
		_setSlide: function () {
			this._$target.find( '.slide' ).find( '.ix-ratio-size-apply' ).css( 'height', '' );
			this._$target.find( '.slide' ).ixSlideMax();

			AP.responsiveWidth.addListener( 'resize', function (e) {
				this._$target.find( '.slide' ).ixSlideMax( 'resize' );
			}.bind(this));
		}

	});

	AP.chEtudeMain = new ChEtudeMain();
})( jQuery );