/**
 * 이벤트 참여 현황
 */

;(function ( $ ) {
	'use strict';

	var MyEventList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.mypage.event' );

			this.DEFUALT_PAGE_SIZE = 5;
			this._totalCount = 0;

			this._param = {
				offset: 0,
				limit: 5,
				startDate: '',
				endDate: ''
			};

			if ( this._$target.length > 0 ) this._setEvent();
		},

		/** =============== Public Methods =============== */
		_getList: function ( param, reset ) {
			param = param || this._param;

			if ( param.offset == 0 ) {
				this._$target.find( '.loading' ).show();
				this._$target.find( '.event_list' ).hide();
				this._$target.find( '.btn_lg_more' ).hide();
				this._$target.find( '.result_none' ).hide();
			}

			if ( reset ) this._$target.find( '.event_list' ).html('');

			if ( this._api ) this._api.abort();

			this._api = AP.api.eventList( {}, param ).done(function ( result ) {

				this._$target.find( '.loading' ).hide();
				if ( result == null || (result != null && result.EventSearchResult.totalCount == 0) ) {
					//data없음
					this._$target.find( '.event_list' ).hide();
					this._$target.find( '.btn_lg_more' ).hide();
					this._$target.find( '.result_none' ).show();
				} else {
					this._$target.find( '.event_list' ).show();

					result = result.EventSearchResult;
					var html = AP.common.getTemplate( 'my.event-list', result );
					if ( result.totalCount < this.DEFUALT_PAGE_SIZE ) {
						//paging없음
						this._$target.find( '.event_list' ).html( html );
					} else {

						this._$target.find( '.event_list' ).append( html );

						this._param.offset = result.offset + result.planDisplayDTOs.length;
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
					endDate: e.date.endDate
				};

				AP.myEventList._getList( this._param, true );
			});

			// 더보기
			this._$target.on( 'click', '.btn_lg_more', function (e) {
				this._param = {
					offset: this._param.offset,
					limit: 5,
					startDate: $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).startDate,
					endDate: $('.ui_multiple_date_picker').multipleDatePicker( 'getDate' ).endDate
				};

				if (this._param.offset < this._totalCount) AP.myEventList._getList( this._param, false );

			}.bind( this ));
		}
	});

	AP.myEventList = new MyEventList();
})( jQuery );