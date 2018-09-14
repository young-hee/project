/**
 * BeautyTesterInfo
 *
 */

;(function ( $ ) {
	'use strict';

	var BeautyTesterInfo = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target;
			this._key = { displayMenuId: options.displayMenuId };

			this._$info = this._$target.find( '.tester_process' );
			this._$product_info = this._$target.find( '#product_visual' );
			this._$product_detail = this._$target.find( '.section.product_detail' );
			this._$btnRequesters = this._$target.find( "#btnRequesters" );
			
			this._$request = this._$target.find( "#request" );
			this._$requesters = this._$target.find( "#requesters" );
			
			this._isWin = false;
			
			this._arrReviews = [];
			this._arrRequesters = [];
			
			this._isClearReviewsPaging = false;
			this._isClearRequestersPaging = false;
			
			this._param = {
				regularEventSn: this._$target.find( '.ix-list-item' ).eq(0).attr( 'id' )
			};
			
			this._reviews_param = {
				offset: 0,
				limit: 15,
				regularEventSn: this._$target.find( '.ix-list-item' ).eq(0).attr( 'id' ),
				reviewSort: 'HighScope'
			};
			
			this._requesters_param = {
				offset: 0,
				limit: 15,
				regularEventSn: this._$target.find( '.ix-list-item' ).eq(0).attr( 'id' )
			};

			this._setSort();
		},

		/** =============== Public Methods =============== */
		load: function ( regularEventSn ) {
			
			this._param = {
				regularEventSn: regularEventSn
			};
			this._reviews_param = {
				offset: 0,
				limit: 15,
				regularEventSn: regularEventSn,
				reviewSort: 'HighScope'
			};
			this._requesters_param = {
				offset: 0,
				limit: 15,
				regularEventSn: regularEventSn
			};
				
			AP.api.getRegularEventDetail( null, {regularEventSn: regularEventSn} )
				.done(function ( result ) {
					this._done( regularEventSn, result );
				}.bind( this ))
				.fail(function( error ) {
					console.log( error );
					alert("error");
				})
				.always(function () {
				});
		},
		clear: function () {
			this._$product_info.find( '.like' ).off( 'click' );
			this._$product_info.find( '.cart' ).off( 'click' );
		},
		/** =============== Private Methods ============== */
		_done: function ( regularEventSn, result ) {
			//result = result.regularEvent;

			if(  this._isLoading ) {
				this._isLoading = false;
				this._$loading.hide();
			}

			var html = AP.common.getTemplate( 'display.beauty-tester.process', result );
			this._$info.html( html );
			
			var product_info_html = AP.common.getTemplate( 'display.beauty-tester.product-info', result);
			this._$product_info.html( product_info_html );
			this._setEvent( result );
			
			var product_detail_html = "<h3 class=\"h_title\">상품 상세정보</h3>"+result.detailDesc;
			this._$product_detail.html(product_detail_html);
			
			
			//당첨여부 확인을 위하여 신청자/당첨자 정보를 먼저 조회함. -> this._isWin
			this._setReviews();
			
			//RQ, TN, RR, BR
			//result.status = "RR";
			result.win = this._isWin?"Y":"N";
			var request_html = AP.common.getTemplate('display.beauty-tester.request', result);
			this._$request.html(request_html);
			
			this._setRequesters();			
		},
		_setEvent: function ( result ) {
			// 좋아요
			this._$product_info.find( '.like' ).on( 'click', function (e) {
				alert(".like click");
				e.preventDefault();
				AP.login().done(function () {
					alert("done");
					$( e.currentTarget ).find( 'i' ).toggleClass( 'on' );
				}.bind( this ));
			}.bind( this ));

			// 장바구니
			this._$product_info.find( '.cart' ).on( 'click', function (e) {
				e.preventDefault();
				var products = [{prodSn: result.prodSn, cartProdQty: 1, storePickupYn: 'N', membershipExch: 'N', activityPointYn: 'Y', cartProdExPostList: []}];
				AP.addCart.add( products );
			}.bind( this ));
		},
		_setSort: function () {},
		_setReviews: function () {
			var regularEventSn = this._reviews_param.regularEventSn;
			var offset = this._reviews_param.offset;
			var limit = this._reviews_param.limit;
			var reviewSort = this._reviews_param.reviewSort;
			AP.api.getRegularEventProdReviews( null, {regularEventSn: regularEventSn, offset: offset, limit: limit, reviewSort: reviewSort} )
			.done(function ( result ) {
				this._$reviews = this._$request.find( ".beauty_tester_review_ilst" );
				var reviews_html = AP.common.getTemplate('display.beauty-tester.reviews', result);
				
				this._$reviews.find(".h_title").remove();
				this._$reviews.find(".tab_menu").remove();
				this._$reviews.find(".tab_contents").remove();
				
				this._$reviews.prepend(reviews_html);
				
				this._$reviews.find( '.review_item' ).each(function ( index, target ) {
					this._arrReviews.push( new AP.ReviewItem({
						$target: $(target),
						data: result.prodReviewListInfo.prodReviewList[index]
					}));
				}.bind( this ));
				
				this._$paging = this._$reviews.find( '.pagination' );
				this._$paging.show();
				if ( this._isClearReviewsPaging ) {
					this._clearReviewsPaging();
				}
				this._setReviewsPaging( this._reviews_param.limit, result.prodReviewListInfo.totalCount );
				
			}.bind( this ))
			.fail(function( error ) {
				console.log( error );
				alert("error");
			})
			.always(function () {
				
			});
		},
		_setReviewsPaging: function ( limit, totalCount ) {
			this._$paging = this._$reviews.find( '.pagination' );
			if ( this._$paging.attr( 'class' ).indexOf( 'apply' ) < 0  ) {
				this._$paging.paging({
					limit: limit,
					totalCount: totalCount,
					focusTarget: this._$target.find( '.sorting_group' )
				});
				this._isClearReviewsPaging = false;

				// paging
				this._$paging.on( 'paging-change', function (e) {
					this._reviews_param.offset = e.offset;
					this._setReviews();
				}.bind( this ));
			}
		},
		_clearReviewsPaging: function () {
			if ( this._$paging.length < 1 ) return;

			this._$paging.paging( 'clear' ).off( 'paging-change' );
			this._reviews_param.offset = 0;
		},
		_setRequesters: function () {
			var regularEventSn = this._requesters_param.regularEventSn;
			var offset = this._requesters_param.offset;
			var limit = this._requesters_param.limit;

			AP.api.getRegularRequesters( null, {regularEventSn: regularEventSn, offset: offset, limit: limit} )
			.done(function ( result ) {
								
				this._isWin = result.isWin;
				
				this._$target.find(".tester_process").find(".text").html("테스터 모집인원 00명 / <b><em>"+result.requesters.totalCount+"명</em></b> 신청중");
				this._$btnRequesters.html("신청자("+(result.requesters.totalCount>=1000?result.requesters.totalCount+"+":result.requesters.totalCount)+")");
				
				var requesters_html = AP.common.getTemplate('display.beauty-tester.requesters', result);
				
				this._$requesters.find(".sr_only").remove();
				this._$requesters.find(".comment_list").remove();
				
				this._$requesters.prepend(requesters_html);
				
				this._$requesters.find( '.control' ).each(function ( index, target ) {
					this._arrRequesters.push( new AP.RequesterEach({
						$target: $(target),
						data: result.requesters.regularEventRequesters[index]
					}));
				}.bind( this ));
				
				this._$paging = this._$requesters.find( '.pagination' );
				this._$paging.show();
				if ( this._isClearRequestersPaging ) {
					this._clearRequestersPaging();
				}
				this._setRequestersPaging( this._requesters_param.limit, result.requesters.totalCount );
				
			}.bind( this ))
			.fail(function( error ) {
				console.log( error );
				alert("error");
			})
			.always(function () {
				
			});
		},
		_setRequestersPaging: function ( limit, totalCount ) {
			this._$paging = this._$requesters.find( '.pagination' );
			if ( this._$paging.attr( 'class' ).indexOf( 'apply' ) < 0  ) {
				this._$paging.paging({
					limit: limit,
					totalCount: totalCount
				});
				this._isClearRequestersPaging = false;

				// paging
				this._$paging.on( 'paging-change', function (e) {
					this._requesters_param.offset = e.offset;
					this._setRequesters();
				}.bind( this ));
			}
		},
		_clearRequestersPaging: function () {
			if ( this._$paging.length < 1 ) return;

			this._$paging.paging( 'clear' ).off( 'paging-change' );
			this._requesters_param.offset = 0;
		}
	});

	AP.BeautyTesterInfo = BeautyTesterInfo;
})( jQuery );