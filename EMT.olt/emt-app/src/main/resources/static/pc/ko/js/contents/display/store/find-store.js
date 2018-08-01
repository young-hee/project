/**
 * 매장찾기 (브랜드)
 *
 */
;(function ( $ ) {
	'use strict';

	var FindSotre = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .store_find_area' );
			this._$map = this._$target.find( '.map_area' );
			this._$result = this._$target.find( '.store_items' );
			this._$input = this._$target.find( '.keyword' );
			this._$findBtn = this._$target.find( '.btn_search' );
			this._$favoriteFilterBtn = this._$target.find( '.favorite_store_sort_button' );
			this._$total = this._$target.find( '.total_count' );
			this._$paging = this._$target.find( '.pagination' );

			this._keyword = '서울특별시';
			this._api = null;

			this._setPlugins();
			this._setEvents();
			this._getData( 0 );
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setPlugins: function () {
			this._$map.mapApi({
				zoom: 8
			});
		},

		//기본 이벤트 적용
		_setEvents: function () {
			//주소로 검색
			this._$findBtn.on( 'click', function (e) {
				var keyword = this._$input.val();

				if ( keyword ) {
					this._keyword = keyword;
					this._$findBtn.prop( 'disabled', true );
					this._getData( 0 );
				} else {
					AP.modal.alert({
						contents: '매장명 또는 지역명을 입력해 주세요.',
						returnFocusTarget: this._$input
					});
				}
			}.bind(this));

			//신규오픈매장 layer 닫기
			this._$target.find( '.map_left_wrap .layer_close' ).on( 'click', function (e) {
				this._$target.find( '.map_left_wrap .layer_wrap' ).hide();
				this._$target.find( '.map_store_dim' ).hide();
			}.bind(this));

			//신규오픈매장
			this._$target.find( '.etu_find_store_layer button[data-keyword]' ).on( 'click', function (e) {
				this._$input.val( $(e.currentTarget).data('keyword') ).inputText( 'updated' ).placeholder( 'updated' );
				this._$findBtn.triggerHandler( 'click' );
				this._$target.find( '.map_left_wrap .layer_close' ).triggerHandler( 'click' );
			}.bind(this));

			//단골매장만 보기 필터링
			this._$favoriteFilterBtn.on( 'click', function (e) {
				this._$favoriteFilterBtn.prop( 'disabled', true ).toggleClass( 'on' );
				this._getData( 0 );
			}.bind(this));

			this._$input.on( 'keydown', function (e) {
				if ( e.which === 13 ) {
					this._$findBtn.triggerHandler( 'click' );
				}
			}.bind(this));

			//paging
			this._$paging.on( 'paging-change', function (e) {
				this._getData( e.offset );
			}.bind(this));

			//결과 list
			this._$result.on( 'click', '.btn_favorite, .map_print, .map_call', function (e) {
				var $btn = $( e.currentTarget ),
					lat = $btn.data( 'lat' ),
					lng = $btn.data( 'lng' ),
					markerId = $btn.data( 'marker-id' );

				if ( $btn.hasClass('btn_favorite') ) {
					this._toggleFavorite( $btn );
				} else if ( $btn.hasClass('map_print') ) {
					this._openMapWindow( lat, lng );
				} else {
					this._$target.find( '.map_left_wrap .layer_close' ).triggerHandler( 'click' );
					this._viewMap( markerId, lat, lng );
				}
			}.bind(this));
		},

		_drawList: function ( data ) {
			var html = AP.common.getTemplate( 'display.store.find-store-list', data );
			this._$result.html( html );
			this._$total.show().find( '.num' ).text( data.totalCount );
			$('.color_dark_gray').text(this._$input.val());
			this._$paging.paging({
				offset: data.offset,
				limit: data.limit,
				totalCount: data.totalCount
			});

			if ( data.totalCount > 0 ) {
				this._$paging.show();
			} else {
				this._$paging.hide();
			}
		},

		_getData: function ( offset ) {
			var favoriteFilter = this._$favoriteFilterBtn.hasClass( 'on' );

			this._$paging.paging( 'disable' );
			if ( this._api ) this._api.abort();

			this._api = AP.api.stores( null, {
				keyword: this._keyword,
				offset: offset,
				regularStoreYn: favoriteFilter? 'Y' : 'N', //단골매장만 가져올지 여부 Y/N
				foStoreEventCode: null, //FO매장행사코드(Color Finder, Color Factory, Artist Service)
				sortBy: null //매장정렬방식코드(StoreName, Distance)
			}).done( function( result ) {
				var data = result.storeResult;

				this._offset = data.offset + data.storeExList.length;
				this._removeEvents();
				this._drawList( data );

				AP.common.mapApiReady.done(function () {
					this._addMarkers( data.storeExList );

					if ( data.storeExList.length ) {
						this._viewMap( 0, data.storeExList[0].latitude, data.storeExList[0].longitude );
					}
				}.bind(this));
			}.bind(this)).fail( function (e) {
				this._removeEvents();
				this._drawList( {} );
			}.bind(this)).always( function () {
				this._$findBtn.prop( 'disabled', false );
				this._$favoriteFilterBtn.prop( 'disabled', false );
			}.bind(this));
		},

		_removeEvents: function () {
			this._$paging.paging( 'clear' );
		},

		//map print 새창
		_openMapWindow: function ( lat, lng ) {
			var url = '/common/mapPrint/?lat=' + lat + '&lng=' + lng;
			window.open( url, 'map_print', 'scrollbars=1,width=740,height=600,menubar=0,resizable=0' );
		},

		_addMarkers: function ( datas ) {
			this._$map.mapApi( 'removeMarker' );

			_.each( datas, function (data, idx) {
				this._$map.mapApi( 'addMarker', data.latitude, data.longitude, idx, {
					content: data.storeName + '  '
				});
			}.bind(this));
		},

		_viewMap: function ( markerId, lat, lng ) {
			this._$map.mapApi( 'setCenter', lat, lng ).mapApi( 'closeInfoWindow' ).mapApi( 'openInfoWindow', markerId );
		},

		//단골매장 toggle
		_toggleFavorite: function ( $btn ) {
			var MAX_COUNT = 10;

			AP.login().done( function () {
				var storeName = $btn.data( 'store-name' ),
					storeSn = $btn.data( 'store-sn' ),
					on = $btn.hasClass( 'on' );

				if ( !on ) {
					//단골등록
					AP.api.addFavoriteStore( null, {
						storeSn: storeSn
					}).done( function ( result ) {
						$btn.addClass( 'on' );
						AP.modal.alert( '"' + storeName + '"이<br>단골 매장으로 설정 되었습니다.' );
						//$btn.text('단골해제');
						//console.log("current : " + this._$paging.find('.current').text());
						//console.log("offset : " + this._offset);
						//console.log("total : " + this._$total.show().find( '.num' ).text());						
						//console.log("hasClass : " + this._$favoriteFilterBtn.hasClass( 'on' ));
						if(this._$favoriteFilterBtn.hasClass( 'on' )){
							this._getData(0);
						}else{
							this._getData(this._offset-(this._offset/this._$paging.find('.current').text()));
						}
					}.bind(this)).fail( function ( xhr, textStatus, errorThrown ) {
						if ( xhr.errorCode === 'EOFS001' ) {
							AP.modal.alert( '단골 매장은 최대 ' + MAX_COUNT + '개 까지만 추가가 가능합니다.' );
						} else if ( xhr.errorCode === 'EAPI004' ) {
							//존재하지 않는 회원
							AP.login({
								trigger: true
							});
						}
					}.bind(this));
				} else {
					//단골해제
					AP.api.delFavoriteStore( null, {
						storeSn: storeSn
					}).done( function ( result ) {
						$btn.removeClass( 'on' );
						AP.modal.alert( '"' + storeName + '"이<br>단골 매장에서 해제 되었습니다.' );

						if(this._$favoriteFilterBtn.hasClass( 'on' )){
							this._getData(0);
						}else{
							this._getData(this._offset-(this._offset/this._$paging.find('.current').text()));
						}
						//$btn.text('단골등록');
					}.bind(this));
				}
			}.bind(this));
		}

	});

	AP.findSotre = new FindSotre();
})( jQuery );