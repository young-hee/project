/**
 * 나의 1:1문의
 */

;(function ( $ ) {
	'use strict';

	var MyInquiryList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.mypage.inquiry' );

			this._totalCount = 0;
			this._pagination = null;

			this._param = {
				offset: 0,
				limit: 5,
				startDate: '',
				answerYn: ''	// 미답변만 보기 Y/N
			};

			if ( this._$target.length > 0 ) this._setEvent();
		},

		/** =============== Public Methods =============== */
		_getList: function ( param, reset ) {
			param = param || this._param;

			if ( param.offset == 0 ) {
				this._$target.find( '.loading' ).show();
				this._$target.find( '.inquiry_list' ).hide();
				this._$target.find( '.result_none' ).hide();
			}

			if ( reset ) {
				this._$target.find( '.inquiry_list' ).html('');
				this._clearPaging();
			}

			if ( this._api ) this._api.abort();

			this._api = AP.api.inquiryList( {}, param ).done(function ( result ) {

				this._$target.find( '.loading' ).hide();
				if ( result == null || (result != null && result.InquiriesSearchResult.totalCount == 0) ) {
					//data없음
					this._clearPaging();
					this._$target.find( '.inquiry_list' ).hide();
					this._$target.find( '.result_none' ).show();
				} else {
					this._$target.find( '.inquiry_list' ).show();

					result = result.InquiriesSearchResult;
					var html = AP.common.getTemplate( 'my.inquiry-list', result);

					this._$target.find( '.inquiry_list' ).html( html );

					if ( !this._pagination ) {
						this._setPaging( result.limit, result.totalCount );
					}

					this._$target.find( '.result_none' ).hide();
					this._totalCount = result.totalCount;
				}

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
					answerYn: $('#no_answer').is(':checked') ==  true ? 'N' : ''	// 미답변만 보기 Y/N
				};

				AP.myInquiryList._getList( this._param, true );
			});

			// 미답변만 보기
			this._$target.on( 'click', '#no_answer', function (e) {
				this._param = {
					offset: 0,
					limit: 5,
					startDate: $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).startDate,
					answerYn: $('#no_answer').is(':checked') ==  true ? 'N' : ''	// 미답변만 보기 Y/N
				};

				AP.myInquiryList._getList( this._param, true );
			}.bind( this ));

			// 답변보기
			this._$target.on( 'click', '.inquiry_list button', function (e) {
				//console.log( e.type, e.data);

				var inquirySn = $( e.currentTarget ).data( 'inquirysn' );
				AP.api.inquiryCont({}, {inquirySn : inquirySn}).done(function ( result ) {
					if ( result != null ) {
						var html = AP.common.getTemplate('my.inquiry-cont', result.Inquiry);
						$('#cont_' + inquirySn).replaceWith(html);

						$('.ui_accordion').accordion('clear');
						$('.ui_accordion').accordion();
					}
				}.bind( this )).fail(function (e) {
					console.log( 'error' );
				}).always(function (e) {});

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
				this._param.answerYn = $('#no_answer').is(':checked') ==  true ? 'N' : ''	// 미답변만 보기 Y/N
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

	AP.myInquiryList = new MyInquiryList();
})( jQuery );