/**
 * 매장찾기 (브랜드)
 *
*/
;(function ( $ ) {
	'use strict';

	var FindSotre = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );
			this._$tabArea = this._$target.find( '.store_find_tab' );
			this._$addressInput = this._$target.find( '.address_keyword' );
			this._$addressInputBtn = this._$target.find( '.btn_search.address' );
			this._$locationInput = this._$target.find( '.location_keyword' );
			this._$locationInputBtn = this._$target.find( '.btn_search.location' );
			this._$favoriteFilterBtn = this._$target.find( '.btn_favorite_store' );

			this._lat = '';
			this._lng = '';
			this._keyword = '서울특별시';

			this._setPlugins();
			this._setEvents();

			this._storeList.search({
				keyword: this._keyword
			});
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setPlugins: function () {
			this._$target.find( '.ui_accordion' ).accordion();
		},

		//기본 이벤트 적용
		_setEvents: function () {
			this._storeList = new AP.StoreList( this._$tabArea.find('.tab_contents > .tab_cont:eq(0)') );
			this._locationStoreList = new AP.StoreList( this._$tabArea.find('.tab_contents > .tab_cont:eq(1)') );

			this._storeList.addListener( 'loading', function (e) {
				if ( e.state ) {
					this._$addressInputBtn.prop( 'disabled', true );
					this._$favoriteFilterBtn.eq( 0 ).prop( 'disabled', true );
				} else {
					this._$addressInputBtn.prop( 'disabled', false );
					this._$favoriteFilterBtn.eq( 0 ).prop( 'disabled', false );
				}
			}.bind(this));

			this._locationStoreList.addListener( 'loading', function (e) {
				if ( e.state ) {
					this._$locationInputBtn.prop( 'disabled', true );
					this._$favoriteFilterBtn.eq( 1 ).prop( 'disabled', true );
				} else {
					this._$locationInputBtn.prop( 'disabled', false );
					this._$favoriteFilterBtn.eq( 1 ).prop( 'disabled', false );
				}
			}.bind(this));

			//tab
			this._$tabArea.on( 'tabs-change', function (e) {
				if ( e.index === 0 ) {
					//매장명, 지역명 검색 탭
					if ( this._locationStoreList.isChangeState() ) {
						this._storeList.reload();
					}
				} else {
					//위치기반 검색 탭
					if ( this._storeList.isChangeState() ) {
						this._locationStoreList.reload();
					}
				}
			}.bind(this));

			//주소로 검색
			this._$addressInputBtn.on( 'click', function (e) {
				var keyword = this._$addressInput.val();

				if ( keyword ) {
					this._keyword = keyword;

					this._storeList.search({
						keyword: this._keyword,
						filterType: this._$favoriteFilterBtn.eq( 0 ).hasClass( 'on' )? 'favorite' : ''
					});
				} else {
					AP.modal.alert({
						contents: '매장명 또는 지역명을 입력해 주세요.',
						returnFocusTarget: this._$addressInput
					});
				}
			}.bind(this));

			//단골매장만 보기 필터링
			this._$favoriteFilterBtn.on( 'click', function (e) {
				var tabIdx = ( $(e.currentTarget).hasClass('address') )? 0 : 1;
				this._$favoriteFilterBtn.eq( tabIdx ).toggleClass( 'on' );

				if ( tabIdx ) {
					this._locationStoreList.search({
						isLocation: true,
						lat: this._lat,
						lng: this._lng,
						filterType: this._$favoriteFilterBtn.eq( tabIdx ).hasClass( 'on' )? 'favorite' : ''
					});
				} else {
					this._storeList.search({
						keyword: this._keyword,
						filterType: this._$favoriteFilterBtn.eq( tabIdx ).hasClass( 'on' )? 'favorite' : ''
					});
				}
			}.bind(this));

			this._$addressInput.on( 'keydown', function (e) {
				if ( e.which === 13 ) {
					this._$addressInputBtn.triggerHandler( 'click' );
				}
			}.bind(this));

			//위치정보 가져오기
			this._$locationInputBtn.on( 'click', function (e) {
				//약관동의 이후
				this._agreeGeolocation().done( function () {
					if ( navigator.geolocation ) {
						this._$locationInputBtn.prop( 'disabled', true );

						//IE9,10 은 정확한 위치를 가져오지 못한다.
						navigator.geolocation.getCurrentPosition( function ( pos ) {
							this._lat = pos.coords.latitude;
							this._lng = pos.coords.longitude;

							this._locationStoreList.search({
								isLocation: true,
								lat: this._lat,
								lng: this._lng,
								filterType: this._$favoriteFilterBtn.eq( 1 ).hasClass( 'on' )? 'favorite' : ''
							});

							AP.api.coord2Address( this._lat, this._lng ).done(function ( data ) {
								this._$locationInput.val( data.formatted_address.replace('대한민국 ', '') );
							}.bind(this));
						}.bind(this), function ( error ) {
							this._$locationInputBtn.prop( 'disabled', false );

							if ( error.code == 1 ) {
								AP.modal.alert( 'Error(' + error.code + '):내 위치 확인을 "허용" 해주시기 바랍니다.' );
							} else if ( error.code == 2 ) {
								AP.modal.alert( 'Error(' + error.code + '):현재 위치를 확인할 수 없습니다.' );
							} else {
								//AP.modal.alert( 'Error(' + error.code + '):' + error.message );
							}
						}.bind(this), {
							enableHighAccuracy: true,
							maximumAge: 30000,
							timeout: 27000
						});
					} else {
						AP.modal.alert( '브라우저에서 현재위치를 지원하지 않습니다.' );
					}
				}.bind(this));
			}.bind(this));
		},

		_agreeGeolocation: function () {
			var defer = new $.Deferred();

			//약관동의 확인
			if ( AP.common.getLocalStorage('agreeGeolocation') ) {
				defer.resolve();
			} else {
				var $modal = AP.modal.info({
					title: '위치기반 서비스 이용 동의',
					contents: {
						templateKey: 'common.modal-agree-geolocation'
					}
				}).addListener( 'modal-before-close', function (e) {
					//모달 내부 이벤트 삭제
					$modal.find( '.btn_geolocation_terms' ).off( 'click' );
				}).addListener( 'modal-close', function (e) {
					if ( e.closeType === 'confirm' ) {
						AP.common.setLocalStorage( 'agreeGeolocation', true );
						defer.resolve();
					}
				}).getElement();

				//약관 자세히 보기 모달 띄우기
				$modal.find( '.btn_geolocation_terms' ).on( 'click', function (e) {
					e.preventDefault();

					AP.modal.agreeTerms({
						title: '위치기반 서비스 약관',
						displayCode: 'ET002'
					});
				});
			}

			return defer.promise();
		}

	});

	AP.findSotre = new FindSotre();
})( jQuery );