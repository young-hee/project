/**
 * 쿠폰다운로드 모달 (Ch.Etude live 할인쿠폰 다운로드 모달)
 */
;(function ( $ ) {
	'use strict';

	var DownloadCoupon = $B.Class.extend({

		/**
		 * @param {Int} 	articleSn
		 */
		initialize: function ( articleSn ) {
			this._articleSn = articleSn;
		},

		/** =============== Public Methods =============== */

		/**
		 * 모달열기
		 * @param {Array}  activateSections		활성화 구간 배열
		 */
		open: function ( activateSections ) {
			this._downloadApis = [];
			this._openModal();
			this._getCoupon( activateSections );
		},

		/** =============== Private Methods =============== */

		//모달열기
		_openModal: function () {
			this._modal = AP.modal.info({
				title: '쿠폰 다운로드',
				contents: {
					templateKey: 'common.loading-modal'
				}
			}).addListener( 'modal-before-close', function (e) {
				this._removeEvents();
				this._api.abort();
			}.bind(this));

			this._$modal = this._modal.getElement();
		},

		_setEvents: function () {
			//개별 다운로드
			this._$modal.find( '.btn_coupon_download' ).on( 'click', function (e) {
				var couponSn = $( e.currentTarget ).data( 'coupon-sn' );
				this._modal.close();
				//download api
				this._downloads( [couponSn] );
			}.bind(this));

			//전체 다운로드
			this._$modal.find( '.btn_coupon_all_download' ).on( 'click', function (e) {
				var coupons = [];

				this._$modal.find( '.btn_coupon_download:not([disabled])' ).each( function ( idx, el ) {
					var couponSn = $( el ).data( 'coupon-sn' );
					coupons.push( couponSn );
				}.bind(this));

				this._modal.close();
				//download api
				this._downloads( coupons );
			}.bind(this));
		},

		_removeEvents: function () {
			this._$modal.find( '.btn_coupon_download' ).off( 'click' );
			this._$modal.find( '.btn_coupon_all_download' ).off( 'click' );
		},

		_getCoupon: function ( activateSections ) {
			this._api = AP.api.article( null, {
				articleSn: this._articleSn
			})
				.done( function ( result ) {
					var coupons = result.article.couponList,
						couponList = [];

					_.each( coupons, function ( coupon ) {
						_.each( activateSections, function ( section ) {
							if ( section.couponSn === coupon.couponSn ) {
								couponList.push( coupon );
							}
						});
					});

					this._draw( couponList );
				}.bind(this))
				.fail(function ( xhr ) {
					this._modal.close();
					AP.modal.alert( AP.message.API_SAVE_ERROR );
				}.bind(this));
		},

		_draw: function ( couponList ) {
			var html = AP.common.getTemplate( 'display.ch-etude.coupon-list-modal', {couponList: couponList} );
			this._$modal.find( '.layer_cont' ).html( html );
			this._setEvents();
			this._modal.resetPosition();
		},

		_abortDownloadApis: function () {
			_.each( this._downloadApis, function ( downloadApi ) {
				downloadApi.abort();
			});
		},

		/**
		 * 쿠폰 다운로드
		 * @param {Array, String}	couponSns
		 * @return {Promise}
		 */
		_downloads: function ( couponSns ) {
			var defer = new $.Deferred();

			_.each( couponSns, function ( couponSn ) {
				this._downloadApis.push( AP.api.downloadCoupon(null, {couponSn: couponSn}) );
			}.bind(this));

			var apiLength = this._downloadApis.length,
				failCount = 0,
				deferCount = 0;

			_.each( this._downloadApis, function ( downloadApi ) {
				downloadApi.fail( function () {
					failCount++;
				}).always( function () {
					deferCount++;

					if ( apiLength === deferCount ) {
						//하나라도 성공하면 done 처리
						if ( failCount < apiLength ) {
							defer.resolve();
						} else {
							defer.reject();
						}
					}
				});
			}.bind(this));

			defer.done( function () {
				AP.modal.alert( '쿠폰을 다운로드 했습니다.' );
			}).fail( function () {
				AP.modal.alert( AP.message.API_SAVE_ERROR );
			});

			return defer.promise();
		}

	});


	AP.DownloadCoupon = DownloadCoupon;
})( jQuery );