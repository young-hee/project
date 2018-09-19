/**
 * 제품상세 페이지 영역 요소들 제어
 *
*/
;(function ( $ ) {
	'use strict';

	var FilterReviewList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container' );
			this._filterType = '';
			this._keyword = '';
			this._onlineProdSn = '';
			this._memberSn = '';
			this._offset = 0;
			this._limit = 10;
			this._totalCnt = 0;
			this._isLoading = false;
			this._winScrollend = null;
			
			this._setEvents();
		},

		/** =============== Public Methods =============== */
		
		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( param ) {
			if( param.onlineProdSn != null && param.onlineProdSn != undefined && param.onlineProdSn.length == 1 ){
				this._onlineProdSn = param.onlineProdSn[0];
				this._memberSn = param.memberSn;
			}
			
			this._filterType = param.filterType;
			this._keyword = param.keyword;
			
			this._getReviewList();
		},
		
		/** =============== Private Methods =============== */

		_setEvents: function () {
			
			// scroll
			this._winScrollend = new $B.event.ScrollEnd( window ).gap({ bottom: AP.footer.getHeight() }).addListener( 'scrollbottom', function (e) {
				if ( this._isLoading ) return;
				if ( this._offset < this._totalCnt ) {
					this._getReviewList();
				}
				
			}.bind( this ));
			
			$( '.slide' ).each( function () {
				var $slide = $( this );

				$slide.ixSlideMax();

				$( window ).on( 'resize', function (e) {
					$slide.ixSlideMax( 'resize' );
				});
			});
			
			$(".review_overview .review .read_more").click(function(){
				$(this).parent(".cont").addClass("open");
			});
			$(".review_overview .review .more_view.close").click(function(){
				$(this).parent(".cont").removeClass("open");
			});
		},
		
		//리뷰 리스트
		_getReviewList: function () {
			this._isLoading = true;
			var $reviewList = this._$target.find( '.review_list' );
			var api = 'getReviewList';
			var param = {
					//onlineProdSn : this._onlineProdSn
					offset : this._offset,
					limit : this._limit
					//prodReviewType : 'Pur'
			};
			if(this._filterType == 'stat'){
				param.scope = this._keyword;
			} else {
				api = 'searchProdReviewListWithin';
				param.onlineProdSn = this._onlineProdSn;
				param.toSearchFor = this._keyword;
			}
				
			AP.api[api](null, param).done( function ( result ) {
				var data = result.prodReviewListInfo;
				this._offset += data.limit;
				this._totalCnt = data.totalCount;
				data.memberSn = this._memberSn;
				
				if ( this._filterType == 'tag') data.prodReviewList = data.list;
				
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
					$reviewList.find('.btn_good').off('click').on('click', function(e){
						var $this = $(e.currentTarget);
						if( $this.hasClass('on') ){
							$this.removeClass('on');
						} else {
							$this.addClass('on');
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
				
				AP.header.setTitle(this._keyword + ( this._filterType == 'stat' ? '점 리뷰' : '관련 리뷰 ') + '('+data.totalCount+')' );
            }.bind(this)).fail( function (memberSn) {
            
            });;
		}
	});

	AP.filterReviewList = new FilterReviewList();
})( jQuery );