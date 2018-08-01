/**
 * 예치금 내역
 */

;(function ( $ ) {
	'use strict';

	var MyDepositList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.mypage.activity.review_list.deposit' );

			this._totalCount = 0;
			this._pagination = null;

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
					depositHistTypeCode: $('input[name=depositHistTypeCode]').val()
				};

				AP.myDepositList._getList( this._param, true );
			});

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
					depositHistTypeCode: $('input[name=depositHistTypeCode]').val()
				};

				AP.myDepositList._getList( this._param, true );
			}.bind(this));
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
				this._param.depositHistTypeCode = $('input[name=depositHistTypeCode]').val();
				this._getList( this._param , false);
			}.bind( this ));
		},

		_clearPaging: function () {
			var $pagination = this._$target.find( '.pagination' );
			$pagination.paging( 'clear' ).off( 'paging-change' ).hide();
			this._param.offset = 0;
			this._pagination = null;
		}
	});

	AP.myDepositList = new MyDepositList();
})( jQuery );