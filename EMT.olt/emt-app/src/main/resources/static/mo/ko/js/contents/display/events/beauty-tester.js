/**
 * 뷰티테스터
 *
 */

;(function ( $ ) {
	'use strict';

	var BeautyTester = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.beauty_tester' );

			this._itemLength = 0;
			this._totalItemLength = 0;
			this._memberInfo = {};
			this._param = {
				regularEventType: 'ProdExperienceGrp',
				offset: 0,
				limit: 10
			};

			this._setEvent();
			this._setMore();
		},

		/** =============== Public Methods =============== */
		load: function ( param ) {
			if ( param.memberInfo ) {
				this._memberInfo = param.memberInfo;
			}

			var $more = this._$target.find( '.btn_lg_more' ),
				$loading = this._$target.find( '.loading' );

			$more.hide();
			if ( this._param.offset > 0 ) {
				$loading.css( 'min-height', '0px' ).show();
			}

			AP.api.regularEventRequesters( {}, this._param ).done(function ( result ) {
				result = result['requesters'];
				var html = AP.common.getTemplate( 'display.events.application-list', result );
				this._$target.find( '.ui_accordion.list' ).append( html );

				this._itemLength += result.regularEventRequesters.length;
				this._totalItemLength = result.totalCount;
				this._param.offset = result.offset;

				$more.find( 'span' ).html( '더보기 (<em>' + this._itemLength + '</em>/' + this._totalItemLength + ')' );
				$loading.hide();
				if ( this._itemLength >= this._totalItemLength ) {
					$more.hide();
				} else {
					$more.show();
				}

			}.bind( this )).fail(function (e) {
				this._$target.find( '.loading' ).hide();
			}.bind( this )).always(function (e) {});
		},

		/** =============== Private Methods =============== */
		_setEvent: function () {
			this._$target.find( '.apply' ).on( 'click', function (e) {
				AP.login().done(function () {
					AP.api.regularEventSummary({}, { regularEventType: 'ProdExperienceGrp'}).done(function () {
						AP.applicationForm.open( '뷰티테스터 신청하기' );
					}.bind( this )).fail(function ( e ) {
						if ( e.errorCode == 'ESAL034' ) {
							AP.modal.alert( '본 이벤트는 종료되었습니다.' );
						} else {
							AP.modal.alert( e.errorMessage );
						}
					}.bind( this ));
				}.bind( this ));
			}.bind( this ));
			
			//뷰티테스터 상세 보기
			this._$target.find( '.viewProdDetail' ).on( 'click', function (e) {
				location.href = '/product/detail?onlineProdSn=' + $(e.currentTarget).data('online-prod-sn');
			}.bind( this ));

			AP.applicationForm.addListener( 'application-submit', function (e) {
				$.extend( e.data, {
					memberSn: this._memberInfo.memberSn,
					regularEventType: this._param.regularEventType
				});

				AP.api.participated( {}, e.data ).done(function ( result ) {
					AP.modal.alert( '신청이 완료되었습니다.' ).addListener( 'modal-close', function (e) {
						AP.applicationForm.close();
					}.bind( this ));
				}.bind( this )).fail(function (e) {
					AP.modal.alert( e.errorMessage );
				}.bind( this )).always(function (e) {});
			}.bind( this ));
		},

		_setMore: function () {
			this._$target.find( '.btn_lg_more' ).on( 'click', function () {
				this._param.offset += this._param.limit;
				this.load( this._param );
			}.bind( this ));
		}
	});

	AP.beautyTester = new BeautyTester();
})( jQuery );