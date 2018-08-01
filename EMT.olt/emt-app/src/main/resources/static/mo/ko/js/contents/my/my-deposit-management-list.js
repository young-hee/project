/**
 * 예치금 출금 내역
 */

;(function ( $ ) {
	'use strict';

	var MyDepositManagementList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.mypage.deposit-management' );

			this.DEFUALT_PAGE_SIZE = 5;
			this._totalCount = 0;

			this.acYn;

			this._param = {
				offset: 0,
				limit: 5,
				startDate: '',
				endDate: '',
				depositHistTypeCode: 'Transfer'	// 예치금이력유형코드(적립:Saving, 출금:Transfer, 사용:Pay, 취소:PayCancel)
			};

			if ( this._$target.length > 0 ) this._setEvent();
		},

		/** =============== Public Methods =============== */
		_getList: function ( param, reset, acYn ) {
			param = param || this._param;
			this.acYn = acYn;

			if ( param.offset == 0 ) {
				this._$target.find( '.loading' ).show();
				this._$target.find( '.deposit_list' ).hide();
				this._$target.find( '.btn_lg_more' ).hide();
				this._$target.find( '.result_none' ).hide();
			}

			if ( reset ) this._$target.find( '.deposit_list' ).html('');

			if ( this._api ) this._api.abort();

			this._api = AP.api.depositList( {}, param ).done(function ( result ) {

				this._$target.find( '.loading' ).hide();
				result = result.DepositHistories;
				if ( result == null || (result != null && result.totalCount == 0) ) {
					//data없음
					this._$target.find( '.deposit_list' ).hide();
					this._$target.find( '.btn_lg_more' ).hide();
					this._$target.find( '.result_none' ).show();
				} else {
					this._$target.find( '.deposit_list' ).show();

					var html = AP.common.getTemplate( 'my.deposit-management-list', result );
					if ( result.totalCount < this.DEFUALT_PAGE_SIZE ) {
						//paging없음
						this._$target.find( '.deposit_list' ).html( html );
					} else {

						this._$target.find( '.deposit_list' ).append( html );

						this._param.offset = result.offset + result.depositHistories.length;
						this._$target.find( '.btn_lg_more' ).show();
						this._$target.find( '.btn_lg_more' ).html("더보기 (<em>"+this._param.offset+"</em>/"+result.totalCount+")");
					}
					this._$target.find( '.result_none' ).hide();
					this._totalCount = result.totalCount;
				}

				//보유예치금 세팅
				this._$target.find('#savedDeposit').html($B.string.numberFormat( result.depositBalance ));

			}.bind( this )).fail(function (e) {
				console.log( 'error' );
			}).always(function (e) {});
		},

		/** =============== Private Methods =============== */
		_setEvent: function () {

			//multiple date picker적용
			$( '.ui_multiple_date_picker' ).multipleDatePicker({
				defaultRangeDate: '1months',
				minDate: moment().subtract( 50, 'years' )
			}).on( 'multiple-date-picker-change', function (e) {
				//console.log( e.type, e.date );

				this._param = {
					offset: 0,
					limit: 5,
					startDate: e.date.startDate,
					endDate: e.date.endDate,
					depositHistTypeCode: 'Transfer'
				};

				AP.myDepositManagementList._getList( this._param, true, this.acYn );
			});

			// 더보기
			this._$target.on( 'click', '.btn_lg_more', function (e) {
				this._param = {
					offset: this._param.offset,
					limit: 5,
					startDate: $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).startDate,
					endDate: $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).endDate,
					depositHistTypeCode: 'Transfer'
				};

				if (this._param.offset < this._totalCount) AP.myDepositManagementList._getList( this._param, false, this.acYn );

			}.bind( this ));

			// 출금신청
			this._$target.on( 'click', '#transferReq', function (e) {
				//console.log("출금신청 Btn Click" + this.acYn);
				if ( 'N' == this.acYn ){
					AP.modal.info({
						title: '환불 계좌 등록 안내',
						contents: '<p class="text align_center">예치금을 출금신청 하시려면 환불 계좌가<br>등록되어 있어야 합니다.<br>등록 하시겠습니까?</p>',
						confirmLabel: '계좌 등록',
						cancelLabel: '취소'
					}).addListener( 'modal-before-close', function (e) {
						//console.log( e.closeType );
					}).addListener( 'modal-close', function (e) {
						//console.log( e.closeType );
						if ('confirm' == e.closeType) {
							location.href = "/my/page/refundAccountsRegister";
						}
					});

				} else {

					var price = $('#price').val();
					if (price == null || price == 0 || price > 300000) {
						AP.modal.alert("출금가능금액 확인하세요.");
					} else {
						AP.api.transferDeposit({}, {
							amountOfTransfer : price
						}).done(function(data) {
							//성공
							//console.log("성공")
							location.href = "/my/page/myDepositManagementList";
						}).fail(function(e) {
							AP.modal.alert(e.responseJSON.errorData.message);
							//실패
						}).always(function() {
							//성공, 실패
						});
					}
				}

			}.bind( this ));

			// 계좌등록/수정
			this._$target.on( 'click', '#registerAc', function (e) {
				console.log("계좌등록 Btn Click");
				location.href = "/my/page/refundAccountsRegister";
			}.bind( this ));
		}
	});

	AP.myDepositManagementList = new MyDepositManagementList();
})( jQuery );