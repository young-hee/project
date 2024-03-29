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
			this._isLoading = false;
			this._winScrollend = null;
			this._sort = 'Recommend';
			this._data = [];
			this._setEvents();
		},

		/** =============== Public Methods =============== */
		
		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( onlineProdSn, memberSn ) {
			if( onlineProdSn != null && onlineProdSn != undefined && onlineProdSn.length == 1 ){
				this._onlineProdSn = onlineProdSn[0];
				this._memberSn = memberSn;
			}
			this._data = [];
			this._getReviewList();
			this._getBestPhotoReviewList();
		},
		
		//리뷰 상세
		openBestReviewDetail : function( prodReviewSn ){
		
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
			
			// scroll
			this._winScrollend = new $B.event.ScrollEnd( window ).gap({ bottom: AP.footer.getHeight() }).addListener( 'scrollbottom', function (e) {
				if ( this._isLoading ) return;
				if ( this._offset < this._totalCnt ) {
					this._getReviewList();
				}
				
			}.bind( this ));
			
			//sort option Click event
			this._$target.find('.review_sort .filter').on('click', function(e){
				var $this = $(e.currentTarget);
				if( $this.hasClass('on') )return false;
				$this.siblings('a').removeClass('on');
				$this.addClass('on');
				this._sort = $this.data('sort');
				this._offset = 0;
				this._totalCnt = 0;
				this._$target.find( '.review_list' ).empty();
				this._data = [];
				this._getReviewList();
			}.bind(this));
			
			//stat option Click event - 별점
			this._$target.find('.statBtn').on('click', function(e){
				var $this = $(e.currentTarget);
				var scope = $this.find('.color_black').text();
				var statCnt = $this.find('.statCnt').text().replace(/[( )]/gi, "");
				//if( statCnt == 0 )return false;
				
				location.href = '/review/filterReviewList/stat?onlineProdSn='+this._onlineProdSn+'&keyword='+scope;
			}.bind(this));
			
			//tag Click event
			this._$target.find('.tag_group button').on('click', function(e){
				var $this = $(e.currentTarget);
				var tag = $this.text().replace('#', '');
				location.href = '/review/filterReviewList/tag?onlineProdSn='+this._onlineProdSn+'&keyword='+tag;
			}.bind(this));
		},
		
		//리뷰 리스트
		_getReviewList: function () {
			this._isLoading = true;
			var $reviewList = this._$target.find( '.review_list' );
			
			AP.api.getReviewList(null, {
				//onlineProdSn : this._onlineProdSn
				offset : this._offset,
				limit : this._limit,
				prodReviewSort  : this._sort
			}).done( function ( result ) {
				var data = result.prodReviewListInfo;
				$.merge(this._data, data.prodReviewList);
				this._offset += data.limit;
				this._totalCnt = data.totalCount;
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
					if( this._offset > 0 ){
						$reviewList.append( html );
					}else{
						$reviewList.html( html );
					}
					
					// 좋아요
					$reviewList.find('.btn_good').off('click').on('click', function(e){
						if( AP.LOGIN_USER ){
							var $this = $(e.currentTarget);
							var recommendCnt = Number($this.find('.num').text());
							if( $this.hasClass('on') ){
								// 상품평 추천 삭제
								AP.api.removeReviewRecommend({}, {
									prodReviewSn : $this.data('review-sn')
								}).done(function(){
									$this.removeClass('on');
									
									$this.find('.num').text( recommendCnt - 1 )
									//추천수가 없을 경우 화면에서 감춤
									if( $this.find('.num').text() == 0 ){
										$this.find('.num').hide();
									}
								}.bind(this));
							} else {
								// 상품평 추천
								AP.api.reviewRecommend({}, {
									prodReviewSn : $this.data('review-sn')
								}).done(function(){
									$this.addClass('on');
									
									$this.find('.num').text( recommendCnt + 1 )
									//추천수가 없을 경우 화면에서 감춤
									if( $this.find('.num').text() > 0 ){
										$this.find('.num').show();
									}
								}.bind(this));
							}
						} else {
							AP.login.go();
						}
					}.bind(this));
					
					// 신고하기 
					$reviewList.find('.btn_report').off('click').on('click', function(e){
						var $cur = $(e.currentTarget);
						var prodReviewSn = $cur.data('review-sn');
						var review = {
							review : _.findWhere(this._data, {prodReviewSn : prodReviewSn})
						};
						if( AP.LOGIN_USER ){
							var reportModal = new AP.Report(review).addListener( 'modal-close', function (e) { 
								if( e.data == 'report' ){
									$cur.addClass('on');
								}
							}.bind(this)); 
							reportModal.open();
						} else {
							AP.login.go();
						}
					}.bind(this));
					
					//.find( '.slide' ).ixSlideMax();
					if ( this._offset >= this._totalCnt ) {
						this._winScrollend.clear();
					}
				} else {
					this._winScrollend.clear();
					$reviewList.hide();
				}
				this._isLoading = false;
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
						html += '<li><a href="/review/detail/'+obj.prodReviewSn+'"><img src="'+obj.imgList[0].imageFileUrl+'" alt="'+obj.prodReviewTitle+'"></a></li>';
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