/**
 * 예치금 내역
 */

;(function ( $ ) {
	'use strict';

	var MyDepositManagementList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.mypage.activity.review_list.deposit-management' );

			this._totalCount = 0;
			this._pagination = null;

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
				this._$target.find( '.result_none' ).hide();
			}

			if ( reset ) {
				this._$target.find( '.deposit_list' ).html('');
				this._clearPaging();
			}

			if ( this._api ) this._api.abort();

			this._api = AP.api.depositList( {}, param ).done(function ( result ) {

				this._$target.find( '.loading' ).hide();
				result = result.DepositHistories;
				if ( result == null || (result != null && result.totalCount == 0) ) {
					//data없음
					this._clearPaging();
					this._$target.find( '.deposit_list' ).hide();
					this._$target.find( '.result_none' ).show();
				} else {
					this._$target.find( '.deposit_list' ).show();
					var html = AP.common.getTemplate( 'my.deposit-list', result);

					this._$target.find( '.deposit_list' ).html( html );

					if ( !this._pagination ) {
						this._setPaging( result.limit, result.totalCount );
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
			}.bind(this));

			// 출금신청
			this._$target.on( 'click', '#transferReq', function (e) {
				console.log("출금신청 Btn Click" + this.acYn);
				if ( 'N' == this.acYn ){
					AP.modal.info({
						title: '환불 계좌 등록 안내',
						contents: '<p class="text align_center">예치금을 출금신청 하시려면 환불 계좌가<br>등록되어 있어야 합니다.<br>등록 하시겠습니까?</p>',
						confirmLabel: '계좌 등록',
						cancelLabel: '취소'
					}).addListener( 'modal-before-close', function (e) {
						//console.log( e.closeType );
					}).addListener( 'modal-close', function (e) {
						if ('confirm' == e.closeType) {
							console.log("계좌등록 Btn Click");
							this._confirm();
						}
					}.bind(this));

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
				this._confirm();
			}.bind( this ));
		},

		_confirm: function () {
			var confirmModal = AP.modal.info({
				title: '환불 계좌 등록/변경',
				contents: {
					templateKey: 'my.refundAccountsRegister',
					templateModel: {}
				}
			}).addListener( 'modal-before-close', function () {
				confirmModal.getElement().find( '#saveBtn' ).off( 'click' );
			}).addListener( 'modal-close', function () {
				confirmModal = null;
			});

			//select plugin
			confirmModal.getElement().find( 'select' ).selectBox();

			confirmModal.getElement().find( '#saveBtn' ).on( 'click', function (e) {
				confirmModal.getElement().find( 'form.validate' ).submit();
			}.bind( this ));

			confirmModal.getElement().find( 'form.validate' ).validate({
				submitHandler: function ( form ) {
					var $form = $('form');

					AP.api.saveRefundAccounts({}, AP.common.getFormData($form)).done(function(data) {
						//성공
						console.log("성공")
					}).fail(function(e) {
						AP.modal.alert(e.responseJSON.errorData.message);
						//실패
					}).always(function() {
						//성공, 실패
					});
				}.bind( this )
			});

			confirmModal.getElement().find( '#cancelBtn' ).on( 'click', function (e) {
				confirmModal.close();
			}.bind( this ));
		},

		_setPaging: function ( limit, totalCount ) {
			var $pagination = this._$target.find( '.pagination' );
			this._pagination = $pagination.paging({
				limit: limit,
				totalCount: totalCount,
				focusTarget: this._$target.find( '.rating_filter' )
			}).show();

			$pagination.on( 'paging-change', function (e) {
				this._param.offset = e.offset;
				this._param.startDate = $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).startDate;
				this._param.endDate = $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).endDate;
				this._param.depositHistTypeCode = 'Transfer';
				this._getList( this._param , false, this.acYn );
			}.bind( this ));
		},

		_clearPaging: function () {
			var $pagination = this._$target.find( '.pagination' );
			$pagination.paging( 'clear' ).off( 'paging-change' ).hide();
			this._param.offset = 0;
			this._pagination = null;
		}
	});

	AP.myDepositManagementList = new MyDepositManagementList();
})( jQuery );