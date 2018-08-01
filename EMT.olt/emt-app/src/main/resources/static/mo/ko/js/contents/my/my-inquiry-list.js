/**
 * 나의 1:1문의
 */

;(function ( $ ) {
	'use strict';

	var MyInquiryList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.mypage.inquiry' );

			this.DEFUALT_PAGE_SIZE = 5;
			this._totalCount = 0;

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
				this._$target.find( '.btn_lg_more' ).hide();
				this._$target.find( '.result_none' ).hide();
			}

			if ( reset ) this._$target.find( '.inquiry_list' ).html('');

			if ( this._api ) this._api.abort();

			this._api = AP.api.inquiryList( {}, param ).done(function ( result ) {

				this._$target.find( '.loading' ).hide();
				if ( result == null || (result != null && result.InquiriesSearchResult.totalCount == 0) ) {
					//data없음
					this._$target.find( '.inquiry_list' ).hide();
					this._$target.find( '.btn_lg_more' ).hide();
					this._$target.find( '.result_none' ).show();
				} else {
					this._$target.find( '.inquiry_list' ).show();

					result = result.InquiriesSearchResult;
					var html = AP.common.getTemplate( 'my.inquiry-list', result );
					if ( result.totalCount < this.DEFUALT_PAGE_SIZE ) {
						//paging없음
						this._$target.find( '.inquiry_list' ).html( html );
					} else {

						this._$target.find( '.inquiry_list' ).append( html );

						this._param.offset = result.offset + result.inquiryList.length;
						this._$target.find( '.btn_lg_more' ).show();
						this._$target.find( '.btn_lg_more' ).html("더보기 (<em>"+this._param.offset+"</em>/"+result.totalCount+")");
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

			// 더보기
			this._$target.on( 'click', '.btn_lg_more', function (e) {
				this._param = {
					offset: this._param.offset,
					limit: 5,
					startDate: $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).startDate,
					answerYn: $('#no_answer').is(':checked') ==  true ? 'N' : ''	// 미답변만 보기 Y/N
				};

				if (this._param.offset < this._totalCount) AP.myInquiryList._getList( this._param, false );

			}.bind( this ));

			// 답변보기
			this._$target.on( 'click', '.inquiry_list button', function (e) {
				//console.log( e.type, e.data);

				var inquirySn = $( e.currentTarget ).data( 'inquirysn' );
				AP.api.inquiryCont({}, {inquirySn : inquirySn})
				.done(function ( result ) {
					if( result != null ) {
						var html = AP.common.getTemplate('my.inquiry-cont', result.Inquiry);
						$('#cont_' + inquirySn).replaceWith(html);
					}
				}.bind( this )).fail(function (e) {
					console.log( 'error' );
				}).always(function (e) {});

			}.bind( this ));
		}
	});

	AP.myInquiryList = new MyInquiryList();
})( jQuery );