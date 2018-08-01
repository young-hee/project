/**
 * 뷰티테스터
 *
 */

;(function ( $ ) {
	'use strict';

	var BeautyTester = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.beauty_tester' );

			this._pagination = null;
			this._memberInfo = {};
			this._param = {
				regularEventType: 'ProdExperienceGrp',
				offset: 0,
				limit: 10
			};

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		load: function ( param ) {
			if ( param.memberInfo ) {
				this._memberInfo = param.memberInfo;
			}

			AP.api.regularEventRequesters( {}, this._param ).done(function ( result ) {
				if(result == undefined){
					this._$target.find( '.loading' ).hide();
					this._$target.find( '.pagination' ).remove();
					return false;
				} else {
					result = result['requesters'];

					var html = AP.common.getTemplate( 'display.events.application-list', result );
					this._$target.find( '.reply ' ).html( html );

					if ( this._$target.find( '.reply' ).find( '> dl' ).length > 0 ) {
						if ( !this._pagination ) {
							this._setPaging( result.limit, result.totalCount );
						}
					} else {
						this._$target.find( '.pagination' ).remove();
					}
				}
				this._$target.find( '.loading' ).hide();

			}.bind( this )).fail(function (e) {
				this._$target.find( '.loading' ).hide();
				this._$target.find( '.pagination' ).hide();
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
				}).always(function (e) {});
			}.bind( this ));
		},

		_setPaging: function ( limit, totalCount ) {
			var $pagination = this._$target.find( '.pagination' );
			this._pagination = $pagination.paging({
				limit: limit,
				totalCount: totalCount,
				focusTarget: this._$target.find( '.tab_menu' )
			});

			$pagination.on( 'paging-change', function (e) {
				this._param.offset = e.offset;
				this.load( this._param );
			}.bind( this ));
		}
	});

	AP.beautyTester = new BeautyTester();
})( jQuery );