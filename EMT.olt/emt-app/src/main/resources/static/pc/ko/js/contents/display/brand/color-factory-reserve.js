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
			this._mobileVerifSn = '';

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
				this._$target.find( '.confirm' ).prop( 'disabled', false );
			}.bind( this ));

			// 재전송 인증번호 받기
			AP.mobileVerification.addListener( 're-request-verify-no', function (e) {
				this._mobileVerifSn = e.data.mobileVerifSn;
				timer.stop();
				timer.start();
			}.bind( this ));

			this._$target.find( '.confirm' ).on( 'click', function (e) {
				if ( $snsNum.valid() ) {
					AP.mobileVerification.confirm( this._mobileVerifSn, $snsNum.val() );
				} else {
					AP.modal.alert( $snsNum.data( 'msg-required' ));
				}
			}.bind( this ));

			// 인증 확인
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
			this._$target.find( '.ui_table .btn_md_form.store' ).on( 'click', function (e) {
				this._openColorFactoryStore();
			}.bind( this ));

			// 예약 매장
			this._$target.find( 'select[name="storeSn"]' ).on( 'change', function (e) {
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
			this._$target.find( '.cancel_rule input' ).on( 'change', function (e) {
				this._$target.find( '.cancel_rule input' ).prop( 'checked', false );
				$( e.target ).prop( 'checked', true );

			}.bind( this ));

			// 전체 동의
			this._$target.find( 'input#all_check' ).on( 'change', function (e) {
				if ( $( e.target ).prop('checked') ) {
					$( e.target ).val( 'Y' );
					$( e.target ).closest( '.panel_cont' ).find( '.check_wrap input' ).prop( 'checked', true );
				} else {
					$( e.target ).val( 'N' );
					$( e.target ).closest( '.panel_cont' ).find( '.check_wrap input' ).prop( 'checked', false );
				}
			}.bind( this ));

			// 동의 (필수)
			this._$target.find( '.check_wrap input[type="checkbox"]' ).not( '#all_check' ).on( 'change', function (e) {
				var $agreeWrap = $( e.target ).closest( '.panel_cont' );
				var checked = true;
				$agreeWrap.find( '.agree' ).each(function () {
					if ( !$( this ).prop( 'checked' ) ) {
						checked = false;
					}
				});
				if ( checked ) {
					$agreeWrap.find( '#all_check' ).val( 'Y' );
					$agreeWrap.find( '#all_check' ).prop( 'checked', true );
				} else {
					$agreeWrap.find( '#all_check' ).val( 'N' );
					$agreeWrap.find( '#all_check' ).prop( 'checked', false );
				}
			}.bind( this ));

			// 확인 / 취소
			this._$target.find( '.page_btns .submit' ).on( 'click', function (e) {
				this._$target.find( 'form.validate' ).submit();
			}.bind( this ));

			// submit
			this._$target.find( 'form.validate' ).validate({
				submitHandler: function ( form, e ) {
					AP.modal.confirm( '예약하시겠습니까?<br>Would you like to reserve?' ).addListener( 'modal-close', function (e) {
						if ( e.closeType == 'confirm' ) {
							var formData = new FormData( form );
							AP.api.postStoreEventRequester( {}, formData ).done(function ( result ) {
								this.dispatch( 'reserve-complete', { reserveNo: result['storeEventRequesterResult'].reserveNo } );
							}.bind( this )).fail(function (e) {
								console.log( 'error', e );
							}.bind( this )).always(function () {});
						}
					}.bind( this ));
				}.bind( this )
			});
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
			this._$target.find( 'select[name="storeEventDetailScheduleSn"]' ).html( optionHtml ).selectBox( 'updated' );
		},

		// 매장보기
		_openColorFactoryStore: function () {
			var modal = AP.modal.info({
				title: '서비스 매장 찾아오시는 길',
				sizeType: 'L',
				contents: {
					templateKey: 'common.loading-modal'
				},
				containerClass: 'color_finder'
			}).addListener( 'modal-before-close', function (e) {
				colorFactoryStore.abort();
			}.bind( this )).addListener( 'modal-close', function () {
				colorFactoryStore = null;
				modal = null;
			}.bind( this ));

			var colorFactoryStore = new AP.ColorFactoryStore( modal.getElement().find( '.layer_cont' ));
			colorFactoryStore.load();

			colorFactoryStore.addListener( 'reset-position', function (e) {
				modal.resetPosition();
			});
		}
	});

	AP.colorFactoryReserve = new ColorFactoryReserve();
})( jQuery );