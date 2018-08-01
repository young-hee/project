/**
 * 작성한 리뷰
 */

;(function ( $ ) {
	'use strict';

	var MyWritableReviewList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.mypage.writable_review' );

			this._totalCount = 0;
			this._pagination = null;
			this._orders;

			this._defaultModel = {
				skinTones: {},
				orderNo: "",
				onlineProdSn: "",
				products: []
			};

			this._param = {
				offset: 0,
				limit: 5
			};

			if ( this._$target.length > 0 ) this._setEvent();
		},

		/** =============== Public Methods =============== */
		_getList: function ( param ) {
			param = param || this._param;

			if ( param.offset == 0 ) {
				this._$target.find( '.loading' ).show();
				this._$target.find( '.writable_review_list' ).hide();
				this._$target.find( '.result_none' ).hide();
			}

			if ( this._api ) this._api.abort();

			this._api = AP.api.writableReviewList( {}, param ).done(function ( result ) {

				this._$target.find( '.loading' ).hide();
				if ( result == null || (result != null && result.ProductReviewWritableOrders.totalCount == 0) ) {
					//data없음
					this._clearPaging();
					this._$target.find( '.writable_review_list' ).hide();
					this._$target.find( '.result_none' ).show();
				} else {
					this._$target.find( '.writable_review_list' ).show();

					result = result.ProductReviewWritableOrders;
					this._orders = result.orders;

					var html = AP.common.getTemplate( 'my.writable-review-list', { list: result.orders 	} );

					this._$target.find( '.writable_review_list' ).html( html );

					if ( !this._pagination ) {
						this._setPaging( result.limit, result.totalCount );
					}

					this._$target.find( '.result_none' ).hide();
					this._totalCount = result.totalCount;

					$( '.ui_tooltip' ).tooltip();
				}

			}.bind( this )).fail(function (e) {
				console.log( 'error' );
			}).always(function (e) {});
		},

		/** =============== Private Methods =============== */
		_setEvent: function () {

			// 리뷰쓰기
			this._$target.on( 'click', '.writable_review_list .btn_md_sm_neutral', function (e) {
				AP.login().done( function () {
					this._orders.forEach(function (item, index) {
						if (item.ordNo == $(e.currentTarget).data('order-no')) {
							this._defaultModel.orderNo = item.ordNo;
							this._defaultModel.products = item.orderProds;
						}
					}.bind(this));

					new AP.ReviewWriteModal( this._defaultModel ).prevGetData();
				}.bind(this));
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

	AP.myWritableReviewList = new MyWritableReviewList();
})( jQuery );