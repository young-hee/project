/**
 * 작성가능한 리뷰
 */

;(function ( $ ) {
	'use strict';

	var MyWritableReviewList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.mypage.review_writing.writable_review' );

			this.DEFUALT_PAGE_SIZE = 5;
			this._totalCount = 0;
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
				this._$target.find( '.btn_lg_more' ).hide();
				this._$target.find( '.result_none' ).hide();
			}

			if ( this._api ) this._api.abort();

			this._api = AP.api.writableReviewList({}, param).done(function ( result ) {

				this._$target.find( '.loading' ).hide();
				if ( result == null || (result != null && result.ProductReviewWritableOrders.totalCount == 0) ) {
					//data없음
					this._$target.find( '.writable_review_list' ).hide();
					this._$target.find( '.btn_lg_more' ).hide();
					this._$target.find( '.result_none' ).show();
				} else {
					this._$target.find( '.writable_review_list' ).show();

					result = result.ProductReviewWritableOrders;
					this._orders = result.orders;

					var html = AP.common.getTemplate( 'my.writable-review-list', {list: result.orders} );
					if ( result.totalCount < this.DEFUALT_PAGE_SIZE ) {
						//paging없음
						this._$target.find( '.writable_review_list' ).html( html );
						this._$target.find( '.btn_lg_more' ).hide();

					} else {

						this._$target.find( '.writable_review_list' ).append( html );

						this._param.offset = result.offset + result.orders.length;
						this._$target.find( '.btn_lg_more' ).show();
						this._$target.find( '.btn_lg_more' ).html("더보기 (<em>"+this._param.offset+"</em>/"+result.totalCount+")");
					}

					this._$target.find( '.result_none' ).hide();
					this._totalCount = result.totalCount;

					//리뷰상품 더보기
					$( '.btn_order_more' ).on( 'click', function () {
						$( this ).siblings( '.list_bullet_dot' ).toggleClass( 'on' );
					});

					//리뷰수 수정
					$('#rCnt').text(result.totalCount);

				}

			}.bind( this )).fail(function (e) {
				console.log( 'error' );
			}).always(function (e) {});
		},

		/** =============== Private Methods =============== */
		_setEvent: function () {

			// 더보기
			this._$target.on( 'click', '.btn_lg_more', function (e) {
				if (this._param.offset < this._totalCount) AP.myWritableReviewList._getList( this._param, false );
			}.bind( this ));

			//리뷰쓰기
			this._$target.on('click', '.btn_write_review', function (e) {
				AP.login().done( function () {
					this._orders.forEach(function (item, index) {
						if (item.ordNo == $(e.currentTarget).data('order-no')) {
							this._defaultModel.orderNo = item.ordNo;
							this._defaultModel.products = item.orderProds;
						}
					}.bind(this));

					new AP.ReviewWriteModal( this._defaultModel ).prevGetData();
				}.bind(this));
			}.bind(this));
		}
	});

	AP.myWritableReviewList = new MyWritableReviewList();
})( jQuery );