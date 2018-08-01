/**
 * 예치금 내역
 */

;(function ( $ ) {
	'use strict';

	var MyDepositList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.mypage.deposit' );

			this.DEFUALT_PAGE_SIZE = 5;
			this._totalCount = 0;

			this._param = {
				offset: 0,
				limit: 5,
				startDate: '',
				endDate: '',
				depositHistTypeCode: ''	// 예치금이력유형코드(적립:Saving, 출금:Transfer, 사용:Pay, 취소:PayCancel)
			};

			if ( this._$target.length > 0 ) this._setEvent();
		},

		/** =============== Public Methods =============== */
		_getList: function ( param, reset ) {
			param = param || this._param;

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

					var html = AP.common.getTemplate( 'my.deposit-list', result );
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
					depositHistTypeCode: $('input[name=depositHistTypeCode]').val()
				};

				AP.myDepositList._getList( this._param, true );
			});

			// 더보기
			this._$target.on( 'click', '.btn_lg_more', function (e) {
				this._param = {
					offset: this._param.offset,
					limit: 5,
					startDate: $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).startDate,
					endDate: $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).endDate,
					depositHistTypeCode: $('input[name=depositHistTypeCode]').val()
				};

				if (this._param.offset < this._totalCount) AP.myDepositList._getList( this._param, false );

			}.bind( this ));

			//예치금 유형 선택
			$( '#depositHistTypeCode' ).on( 'change', function (e) {
				var d = $( e.currentTarget ).val() || null;
				//console.log(d);
				$('input[name=depositHistTypeCode]').val(d);

				this._param = {
					offset: 0,
					limit: 5,
					startDate: $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).startDate,
					endDate: $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).endDate,
					depositHistTypeCode: d
				};

				AP.myDepositList._getList( this._param, true );
			}.bind(this));
		}
	});

	AP.myDepositList = new MyDepositList();
})( jQuery );