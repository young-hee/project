/**
 * 매장리스트 : (브랜드 > 매장찾기)
 * Events:
 * 	loading
*/
;(function ( $ ) {
	'use strict';

	var StoreList = $B.Class.extend({
		initialize: function ( $target ) {
			this._$target = $( $target );
			this._$result = this._$target.find( '.store_list_wrap' );
			this._$moreBtn = this._$target.find( '.btn_more_store' );
			this._$loading = this._$target.find( '.loading' );
			this._$total = this._$target.find( '.total_count' );

			this._offset = 0;
			this._api = null;
			this._isChangeState = false;

			//더보기
			this._$moreBtn.on( 'click', function (e) {
				this._getData();
			}.bind(this));
		},

		/** =============== Public Methods =============== */

		/**
		 * 검색 리스트 호출
		 * @param {Object}	options
		 *  - {String}	keyword
		 * 	- {Boolean}	isLocation
		 * 	- {Number}	lat				위도
		 * 	- {Number}	lng				경도
		 * 	- {String}	filterType		'favorite'
		 */
		search: function ( options ) {
			this._options = options || {};
			this._getData( true );
		},

		/**
		 * 검색 리스트 재호출
		 */
		reload: function () {
			//검색 결과가 있을때만
			if ( this._api ) {
				this._getData( true );
			}
		},

		/**
		 * 리스트 내부의 옵션중에 변경사항이 발생했는지 여부, (단골해제 등등..)
		 */
		isChangeState: function () {
			return this._isChangeState;
		},

		/** =============== Private Methods =============== */

		_drawList: function ( data ) {
			var html = AP.common.getTemplate( 'display.store.find-store-list', data );

			if ( data.offset ) {
				this._$result.append( html );
			} else {
				this._$result.html( html );
			}
			$('.color_dark_gray').text(this._$target.find( '.address_keyword' ).val());
			if ( !$B.isEmpty(data) ) {
				this._$total.show().find( '.num' ).text( data.totalCount );

				this._$result.find( '> .store:not(.js-apply)' ).each( function (idx, el) {
					var $store = $( el ),
						$mapArea = $store.find( '.map_area' ),
						$btnWrap = $store.find( '.store_btn_wrap' ),
						lat = $mapArea.data( 'lat' ),
						lng = $mapArea.data( 'lng' );

					//지도보기 버튼
					$btnWrap.find( '>.map_call' ).on( 'click', function (e) {
						if ( $btnWrap.hasClass('on') ) {
							$btnWrap.removeClass( 'on' );
						} else {
							//open
							$btnWrap.addClass( 'on' );
							$mapArea.mapApi( 'resize' );
							$mapArea.mapApi( 'setCenter', lat, lng );
						}
					});

					//단골등록, 해제
					$store.find( '.btn_favorite' ).on( 'click', function (e) {
						this._toggleFavorite( $(e.currentTarget) );
					}.bind(this));

					//닫기 버튼
					$store.find( '.close_btn' ).on( 'click', function (e) {
						$btnWrap.removeClass( 'on' );
					});

					$mapArea.mapApi({ratio: [320, 180]});
					$mapArea.mapApi( 'addMarker', lat, lng );

					//중복적용 방지
					$store.addClass( 'js-apply' );
				}.bind(this));
			} else {
				this._$total.hide();
			}

			this.dispatch( 'loading', {state: false} );
		},

		_getData: function ( reset ) {
			var keyword = ( this._options.isLocation )? '' : this._options.keyword,
				radius = ( this._options.isLocation )? 2 : null,
				offset = ( reset )? 0 : this._offset;

			if ( reset ) {
				this._isChangeState = false;
			}

			this._$loading.show();
			this._$moreBtn.hide();
			this.dispatch( 'loading', {state: true} );

			if ( reset ) {
				this._removeEvents( reset );
				this._$result.html( '' );
			}

			if ( this._api ) this._api.abort();

			this._api = AP.api.stores( null, {
				keyword: keyword,
				latitude: this._options.lat,
				logitude: this._options.lng,
				offset: offset,
				radius: radius,
				regularStoreYn: ( this._options.filterType === 'favorite' )? 'Y' : 'N', //단골매장만 가져올지 여부 Y/N
				foStoreEventCode: null, //FO매장행사코드(Color Finder, Color Factory, Artist Service)
				sortBy: null //매장정렬방식코드(StoreName, Distance)
			}).done( function( result ) {
				var data = result.storeResult;

				this._offset = data.offset + data.limit;

				if ( data.totalCount > this._offset ) {
					this._$moreBtn.show();
					this._$moreBtn.html( '<span>더보기 (<em>' + this._offset + '</em>/' + data.totalCount + ')</span>' );
				} else {
					this._$moreBtn.hide();
				}

				this._removeEvents( reset );
				this._drawList( data );
				this._$loading.hide();
			}.bind(this)).fail( function (e) {
				this._removeEvents( reset );
				this._drawList( {} );
				this._$loading.hide();
			}.bind(this));
		},

		_removeEvents: function ( reset ) {
			if ( reset ) {
				this._$result.find( '.map_call' ).off( 'click' );
				this._$result.find( '.close_btn' ).off( 'click' );
				this._$result.find( '.btn_favorite' ).off( 'click' );
				this._$result.find( '.map_area' ).mapApi( 'clear' );
			}
		},

		//단골매장 toggle
		_toggleFavorite: function ( $btn ) {
			var MAX_COUNT = 10;

			AP.login().done( function () {
				var storeName = $btn.data( 'store-name' ),
					storeSn = $btn.data( 'store-sn' ),
					off = $btn.hasClass( 'off' );

				if ( off ) {
					//단골등록
					AP.api.addFavoriteStore( null, {
						storeSn: storeSn
					}).done( function ( result ) {
						this._isChangeState = true;

						$btn.removeClass( 'off' );
						AP.modal.alert( '"' + storeName + '"이<br>단골 매장으로 설정 되었습니다.' );
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
						this._isChangeState = true;

						$btn.addClass( 'off' );
						AP.modal.alert( '"' + storeName + '"이<br>단골 매장에서 해제 되었습니다.' );
					}.bind(this));
				}
			}.bind(this));
		}

	});

	AP.StoreList = StoreList;
})( jQuery );