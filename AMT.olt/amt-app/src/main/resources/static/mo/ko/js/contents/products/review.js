/**
 * 제품상세 페이지 영역 요소들 제어
 *
*/
;(function ( $ ) {
	'use strict';

	var Review = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );
			this._onlineProdSn = '';
			this._memberSn = '';
			this._offset = 0;
			this._limit = 10;
			this._totalCnt = 0;
			
			//this._setEvents();
		},

		/** =============== Public Methods =============== */
		
		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( onlineProdSn, memberSn ) {
			if( onlineProdSn != null && onlineProdSn != undefined && onlineProdSn.length == 1 ){
				this._onlineProdSn = onlineProdSn[0];
				this._memberSn = memberSn;
			}
			
			this._getReviewList();
			this._getBestPhotoReviewList();
		},
		
		//리뷰 상세
		openBestReviewDetail : function( prodReviewSn ){
			var reviewDetail = new AP.ReviewDetail( prodReviewSn );
			reviewDetail.openDetail();
		},

		/** =============== Private Methods =============== */

		_setEvents: function () {
			//$('.slide').ixSlideMax();
			
			$(".review_overview .review .read_more").click(function(){
				$(this).parent(".cont").addClass("open");
			});
			$(".review_overview .review .more_view.close").click(function(){
				$(this).parent(".cont").removeClass("open");
			});
			/*
			window.onscroll = function(ev) {
			    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			    	if( this._offset < this._totalCnt ){
			    		this._getReviewList();
			    	}
			    }
			};
			*/
			
		},
		
		//리뷰 리스트
		_getReviewList: function () {
			var $reviewList = this._$target.find( '.review_list' );
			
			AP.api.getReviewList(null, {
				//onlineProdSn : this._onlineProdSn
				offset : this._offset,
				limit : this._limit
			}).done( function ( result ) {
				this._offset += this.limit;
				this._totalCnt = result.totalCount;
				var data = result.prodReviewListInfo;
				data.memberSn = this._memberSn;
				
				var dummyArr = [
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""}, 
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""}
		        ];
				$.each(data.prodReviewList, function(idx, obj){
					obj.imgList = dummyArr;
				});
				var html = AP.common.getTemplate( 'products.review-contents', data );
				
				if ( data.totalCount ) {
					$reviewList.html( html );
					$reviewList.find('.btn_good').off('click').on('click', function(e){
						var $this = $(e.currentTarget);
						if( $this.hasClass('on') ){
							$this.removeClass('on');
						} else {
							$this.addClass('on');
						}
					}.bind(this));
					//.find( '.slide' ).ixSlideMax();
				} else {
					$reviewList.hide();
				}
            }.bind(this)).fail( function (memberSn) {
            
            });;
		}, 
		
		//베스트 포토 리스트
		_getBestPhotoReviewList : function(){
			var $bestReviewList = this._$target.find( '.best_photo_review' );
			
			AP.api.getReviewList(null, {
				//onlineProdSn : this._onlineProdSn,
				topReviewOnlyYn : 'Y',
				imageOnlyYn : true
			}).done( function ( result ) {
				var data = result.prodReviewListInfo;
				data.memberSn = this._memberSn;
				
				var dummyArr = [
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""}, 
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""},
					{"sortOrder": 1,"videoYn": "N","imageFileUrl": "/mo/ko/images/dummy/img_beautytester_review.jpg","videoUrl": ""}
		        ];
				
				if(data.totalCount > 0){
					var html = '';
					$.each(data.prodReviewList, function(idx, obj){
						obj.imgList = dummyArr;
						html += '<li><a href="javascript:AP.review.openBestReviewDetail('+obj.prodReviewSn+');"><img src="'+obj.imgList[0].imageFileUrl+'" alt="'+obj.prodReviewTitle+'"></a></li>';
					});
					$bestReviewList.find('ul.three_half').html( html );
					//$bestReviewList.find('ul.three_half li:first a')[0].click();
				}else{
					$bestReviewList.hide();
				}
				
            }.bind(this)).fail( function (memberSn) {
            
            });
		}
	});

	AP.review = new Review();
})( jQuery );