/**
 * 컬러 팩토리 - 예약하기
 *
 * @Method:
 * setData
 *
 */

;(function ( $ ) {
	'use strict';

	var ColorFactoryReserve = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .color_factory' );

			this._data = null;
			this._selectedData = {};

			this._setEvent();
			this._setPlugin();
			this._setMobileVerification();
		},

		/** =============== Public Methods ================ */
		setData: function ( data ) {
			this._data = data;
		},

		/** =============== Private Methods =============== */
		_setPlugin: function () {
			this._$target.find( '.ui_date_picker' ).datePicker( 'clear' );
		},

		_setMobileVerification: function () {
			var $phoneSelect = this._$target.find( '#phoneCorp' ),
				$phoneNo = this._$target.find( 'input[name="prePhoneNo"]' ),
				$snsNum = this._$target.find( '#smsNum' );

			var timer = new AP.common.timeCountDown(3);

			// 인증번호 요청
			this._$target.find( '#certBtn' ).on( 'click', function (e) {
				if ( $phoneSelect.valid() && $phoneNo.valid() ) {
					AP.mobileVerification.request( $phoneSelect.val(), $phoneNo.val() );
					$( e.target ).hide();
					$( e.target ).siblings( '#reCertBtn' ).show();
					timer.start();
				} else {
					if ( !$phoneSelect.valid() ) {
						AP.modal.alert( $phoneSelect.data( 'msg-required' ));
						return;
					}
					if ( !$phoneNo.valid() ) {
						AP.modal.alert( $phoneNo.data( 'msg-required' ));
					}
				}
			}.bind( this ));

			// 인증번호 재요청
			this._$target.find( '#reCertBtn' ).on( 'click', function (e) {
				if ( $phoneSelect.valid() && $phoneNo.valid() ) {
					AP.mobileVerification.reRequest( this._mobileVerifSn );
					$( e.target ).siblings( '#reCertBtn' ).show();
				} else {
					if ( !$phoneSelect.valid() ) {
						AP.modal.alert( $phoneSelect.data( 'msg-required' ));
						return;
					}
					if ( !$phoneNo.valid() ) {
						AP.modal.alert( $phoneNo.data( 'msg-required' ));
					}
				}
			}.bind( this ));

			// 인증번호 받기
			AP.mobileVerification.addListener( 'request-verify-no', function (e) {
				this._mobileVerifSn = e.data.mobileVerifSn;
				this._$target.find( '.certification_btn' ).prop( 'disabled', false );
			}.bind( this ));

			// 재전송 인증번호 받기
			AP.mobileVerification.addListener( 're-request-verify-no', function (e) {
				this._mobileVerifSn = e.data.mobileVerifSn;
				timer.stop();
				timer.start();
			}.bind( this ));

			// 인증 확인
			this._$target.find( '.certification_btn' ).on( 'click', function (e) {
				if ( $snsNum.valid() ) {
					AP.mobileVerification.confirm( this._mobileVerifSn, $snsNum.val() );
				} else {
					AP.modal.alert( $snsNum.data( 'msg-required' ));
				}
			}.bind( this ));

			AP.mobileVerification.addListener( 'confirm-verify-no', function (e) {
				if ( e.data.result == true ) {
					this._$target.find( 'input[name=verifyCertification]' ).val( 'Y' );
					AP.modal.alert( $snsNum.data( '인증 되었습니다.' ));
				} else {
					AP.modal.alert( e.data.errorMessage );
				}
			}.bind( this ));
		},

		_setEvent: function () {
			// 매장보기
			this._$target.find( '.form_btns .btn_md_form' ).on( 'click', function (e) {
				this._openColorFactoryStore();
			}.bind( this ));

			// 예약 매장
			this._$target.on( 'change', 'select#storeSn', function (e) {
				this._selectedData.storeSn = $( e.target ).val();
				this._setReserveDate( this._selectedData.storeSn );
			}.bind( this ));

			// 예약 일자
			this._$target.find( '.ui_date_picker' ).on( 'date-picker-change', function (e) {
				this._setReserveTime( String( e.date ).replace(/-/gi, '') );
			}.bind( this ));

			// 국적
			this._$target.find( 'select.nationality' ).on( 'change', function (e) {
				var value = $( e.target ).val();
				if ( value == 'KR' ) {
					this._$target.find( 'input[name=alienYn]' ).val( 'Y' );
				} else {
					this._$target.find( 'input[name=alienYn]' ).val( 'N' );
				}
			}.bind( this ));

			// 예약 규정
			this._$target.find( '.agree_wrap input' ).on( 'change', function (e) {
				this._$target.find( '.agree_wrap input' ).prop( 'checked', false );
				$( e.target ).prop( 'checked', true );

			}.bind( this ));

			// 전체 동의
			this._$target.find( 'input#checkall' ).on( 'change', function (e) {
				if ( $( e.target ).prop('checked') ) {
					$( e.target ).val( 'Y' );
					$( e.target ).closest( '.factory_agree_check' ).find( 'input' ).prop( 'checked', true );
				} else {
					$( e.target ).val( 'N' );
					$( e.target ).closest( '.factory_agree_check' ).find( 'input' ).prop( 'checked', false );
				}
			}.bind( this ));

			// 동의 (필수)
			this._$target.find( '.factory_agree_check input' ).not( '#checkall' ).on( 'change', function (e) {
				var checked = true;
				this._$target.find( '.factory_agree_check .agree' ).each(function () {
					if ( !$( this ).prop( 'checked' ) ) {
						checked = false;
					}
				});
				if ( checked ) {
					this._$target.find( '#checkall' ).val( 'Y' );
					this._$target.find( 'input#checkall' ).prop( 'checked', true );
				} else {
					this._$target.find( '#checkall' ).val( 'N' );
					this._$target.find( 'input#checkall' ).prop( 'checked', false );
				}
			}.bind( this ));

			// 확인 / 취소
			this._$target.find( '.page_btns .confirm' ).on( 'click', function (e) {
				this._$target.find( 'form.validate' ).submit();
			}.bind( this ));

			// submit
			this._$target.find( 'form.validate' ).validate({
				submitHandler: function ( form, e ) {
					AP.modal.confirm( '예약하시겠습니까?' ).addListener( 'modal-close', function (e) {
						if ( e.closeType == 'confirm' ) {
							var formData = new FormData( form );
							AP.api.postStoreEventRequester( {}, formData ).done(function ( result ) {
								this._openReserveComplete( result );

							}.bind( this )).fail(function (e) {
								console.log( 'error', e );
							}.bind( this )).always(function () {});
						}
					}.bind( this ));
				}.bind( this )
			});
		},

		// 예약완료
		_openReserveComplete: function ( data ) {
			this._completeModal = AP.modal.full({
				title: '예약 완료',
				contents: {
					templateKey: 'common.loading-modal',
					templateModel: data
				}
			}).addListener( 'modal-before-close', function (e) {
				this._$completeModal.find( '.page_btns button' ).off( 'click' );
			}.bind( this )).addListener( 'modal-close', function (e) {
				this._completeModal = null;
				this._$completeModal = null;
				this.dispatch( 'reserve-complete' );
			}.bind( this ));
			this._$completeModal = this._completeModal.getElement();

			this._api = AP.api.storeEventRequester({}, { reserveNo: data.storeEventRequesterResult.reserveNo } ).done(function ( data ) {
				var html = AP.common.getTemplate( 'display.brand.color-factory-complete', data['storeEventRequesterEx'] );

				this._$completeModal.find( '.layer_cont' ).html( html );
				this._$completeModal.find( '.page_btns button' ).on( 'click', function (e) {
					this._completeModal.close();
				}.bind( this ));

			}.bind( this )).fail(function (e) {
				console.log( 'error', e );
				this._modal.close();
				AP.modal.alert( '예약된 내역이 없습니다.<br>There is no reservation history.');
			}.bind( this )).always(function () {});
		},

		// 매장보기
		_openColorFactoryStore: function () {
			var html = '<div class="ui_accordion acd_color_finder" data-open-type="single"></div>';

			var modal = AP.modal.full({
				title: '서비스 매장 찾아오시는 길',
				contents: html,
				containerClass: 'color_finder'
			}).addListener( 'modal-before-close', function (e) {
				colorFactoryStore.abort();
			}.bind( this )).addListener( 'modal-close', function () {
				colorFactoryStore = null;
				modal = null;
			}.bind( this ));

			var colorFactoryStore = new AP.ColorFactoryStore();
			colorFactoryStore.load();
		},

		_setReserveDate: function ( storeSn ) {
			this._$target.find( '.ui_date_picker' ).datePicker( 'clear' );

			var data = $B.object.clone( this._data );

			var dateList = [];
			if ( data[storeSn] ) {

				this._$target.find( 'input[name="reserveDate"]').prop( 'disabled', false );
				$.each( data[storeSn].possDateMap, function ( key, value ) {
					if ( value === 'Y' ) {
						dateList.push( key );
					}
				});
				this._$target.find( '.ui_date_picker' ).datePicker({ 'enabledDates': dateList });
			} else {
				if ( storeSn ) {
					AP.modal.alert( '예약 가능한 일자가 없습니다.');
				}
				this._setReserveTime();
				this._$target.find( 'input[name="reserveDate"]').prop( 'disabled', true );
			}
		},

		_setReserveTime: function ( date ) {
			var data = $B.object.clone( this._data ),
				storeSn = this._selectedData.storeSn,
				optionHtml = '<option value="">예약시간을 선택해 주세요.</option>';

			if ( data[storeSn] ) {
				$.each( data[storeSn].scheduleList, function ( index, obj ) {
					if ( date == obj.reservePossibleDate8 ) {
						var value = obj.toReservePossibleTime4,
							storeSn = obj.storeSn,
							storeEventSn = obj.storeEventSn,
							storeEventDetailScheduleSn = obj.storeEventDetailScheduleSn,
							reserveOver = ( obj.reservePossibleYn == 'N' ) ? 'disabled' : '',
							reserveTime = value.slice( 0, 2 ) + ':' + value.slice(2);
						optionHtml += '<option value="' + storeEventDetailScheduleSn + '" data-store-sn="' + storeSn + '" data-store-event-sn="' + storeEventSn + '" ' + reserveOver + '>' + reserveTime + '</option>';
					}
				});
			}
			this._$target.find( 'select#rsvTime' ).html( optionHtml );
		}
	});

	AP.colorFactoryReserve = new ColorFactoryReserve();
})( jQuery );