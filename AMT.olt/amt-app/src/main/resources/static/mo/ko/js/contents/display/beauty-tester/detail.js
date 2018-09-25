/**
 * BeautyTester
 *
 */

;(function ( $ ) {
	'use strict';

	var BeautyTesterDetail = $B.Class.extend({
		
		initialize: function () {
			this._$target = $( '.ap_contents' );
			this._regularEventSn;
			//this._setPlugins();
		},

		/** =============== Public Methods =============== */
		
		//페이지를 구성한는 기본 데이타 설정
		load: function ( regularEventSn ) {
			this._regularEventSn = regularEventSn;
			this._setReviews( "Recommend" );
			this._setEvents();
		},

		/** =============== Private Methods ============== */
		_setEvents: function () {
			$(".btn_toggle.like").click(function(e){
    			
    			var obj = $( e.currentTarget );
    			var products = [{prodSn: $(obj).parent().parent().parent().attr("data-val")}];
    			
				AP.login().done(function () {
					if ( !$(obj).hasClass( 'on' )) {
						$(obj).addClass( 'on' ).find( '.ico_heart_s' ).addClass( 'on' );
						AP.addLike.add( $(".layout-contents > .ap_contents.beauty_tester_wrap"), products );
					} else {
						$(obj).removeClass( 'on' ).find( '.ico_heart_s' ).removeClass( 'on' );
						AP.addLike.remove( products[0].prodSn );
					}
				});
				return false;
    		}.bind( this ));
    		
    		$(".prize_list_wrap .btn_open").click(function(e){
    			$( e.currentTarget ).parents(".prize_list_wrap").addClass("open");
    		});
    		$(".prize_list_wrap .btn_close").click(function(e){
    			$( e.currentTarget ).parents(".prize_list_wrap").removeClass("open");
    		});
    		
    		$('.sort.review').on('click', function(e){
    			$( e.currentTarget ).parent().parent().find('li').removeClass("on");
    			$( e.currentTarget ).parent().addClass("on");
				if($( e.currentTarget ).hasClass("recommend")){
					this._setReviews( "Recommend" );
				}else{
					this._setReviews( "Last" );
				}
			}.bind(this));
    		
    		// grid
    		var _grid = $( '.review_list.grid' ).masonry({
    			// options
    			itemSelector: '.grid-item',
    			columnWidth: '.grid-item',
    			percentPosition: true
    		}).imagesLoaded().progress( function() {
    			$( '.review_list.grid' ).css( 'opacity', 1 );
    			_grid.masonry('layout');
    		});
		},
		_setReviews: function ( sort ) {
			AP.api.getRegularEventProdReviews( null, {regularEventSn: this._regularEventSn, offset: 0, limit: 10000, reviewSort: sort} )
			.done(function ( result ) {
				this._$reviews = this._$target.find(".section.prize_review").find( ".best_cont");
				var reviews_html = AP.common.getTemplate('display.beauty-tester.detail-review-list', result.prodReviewListInfo);
				this._$reviews.html(reviews_html);
				$( '.review_list.grid' ).css( 'opacity', 1 );
			}.bind( this ))
			.fail(function( error ) {
				console.log( error );
			})
			.always(function () {
			});
		}
	});
	AP.beautytesterDetail = new BeautyTesterDetail();
})( jQuery );