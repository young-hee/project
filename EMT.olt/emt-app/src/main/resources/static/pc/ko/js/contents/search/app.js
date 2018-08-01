/**
 * Search
 *
 * load				list load
 *
 */

;(function ( $ ) {
	'use strict';

	var Search = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.search.result' );
			this._reviewArea = new AP.ReviewArea( this._$target.find('.review') );
			this._$reviewCnt = this._$target.find('.review_total_count');
			this._searchWord = AP.header._$target.find('input[type=text]').val();
			
			this._$prodList = this._$target.find( '.item_list' );
			this._$prodLoading = this._$target.find( '#prodLoading' );
			
			this._$articleWrap = this._$target.find( '.articleWrap' );
			this._$articleList = this._$target.find( '#articleList' );
			this._$articleSlide = this._$target.find( '#articleSlide' );
			this._$articleCnt = this._$target.find( '#articleCnt' );
			
			this._$eventWrap = this._$target.find( '#eventWrap' );
			this._$eventList = this._$target.find( '#eventList' );
			this._$eventSlide = this._$target.find( '#eventSlide' );
			this._$eventCnt = this._$target.find( '#eventCnt' );
			
			this._$recommend = this._$target.find( '.recommend_items' );
			
			this._filterData = null;
			this._prodTempPath = 'display.product-list.item';
			this._isClearPaging = true;

			this._param = {
				 offset: 0
				,limit: 8
				,attr: null
				,flag: null
				,prodSort: null
				,includeFilters: true
				,toSearchFor : this._searchWord
			};
			
		},

		/** =============== Public Methods =============== */
		load: function () {
			/*
			this._getProductData();
			this._getArticleData();
			this._getEventData();
			this._getReviwData();
			 */
			this._getEverything();
			this._getRecommendData();
			this._setEvent();
		},

		/** =============== Private Methods =============== */
		//초기 검색
		_getEverything : function(){
			this._$prodLoading.show();
			var param = $.extend(this._param, {
				 toSearchFor : this._searchWord
			});
			AP.api.searchEverything( {},param ).done(function(result){
				if( result.everything != undefined ){
					var data = result.everything;
					
					if( data.articles != undefined ){
						this._setArticle( data.articles );
					}
					
					if( data.planDisplays != undefined ){
						this._setEventDraw( data.planDisplays );
					}
					
					if( data.prodReviews != undefined ){
						this._getReviewData( data.prodReviews ); 
					}	
					
					if( data.prods != undefined ){
						this._setProduct( data.prods );
					}
				}
				return false;
			}.bind(this));
		},
		
		_getProductData : function(){
			this._$prodLoading.show();
			var param = $.extend(this._param, {
				 toSearchFor : this._searchWord
			});
			AP.api.searchProdList( {},param ).done(function(result){
				this._setProduct(result.everything);
			}.bind(this));
		},
		
		_setProduct: function ( data ) {
			var prodListData = data.prods == undefined ? data : data.prods ;
			
			if ( !prodListData ) {
				this._$prodList.find( '> ul' ).empty();
				this._$prodLoading.hide();
				return;
			}
			
			if ( prodListData['filter'] ) {
				if ( !this._filterData ) {
					this._filterData = prodListData.filter['addAttrs'];
					if(this._filterData.length > 0){
						for ( var i = 0; i < this._filterData.length; ++i ) {
							for ( var j = 0; j < this._filterData[i]['addAttrVals'].length; ++j ) {
								this._filterData[i]['addAttrVals'][j].selected = false;
							}
						}
						AP.productFilter.setFilter( this._filterData );
					}else{
						$(".filter_table").hide();
					}
				}
			}
			
			for ( var i = 0; i < prodListData.list.length; ++i ) {
				prodListData.list[i].ranking = i + 1;
				for ( var j = 0; j < prodListData.list[i].products.length; ++j ) {
					prodListData.list[i].products[j].onlineProdSn = prodListData.list[i].onlineProdSn;
				}
			}
			
			var html = AP.common.getTemplate( this._prodTempPath, prodListData );
			this._$prodLoading.hide();
			this._$prodList.find( 'ul' ).html( html );
			
			if ( this._$target.find( '.sorting_group .total_count' ).length > 0 ) {
				this._$target.find( '.sorting_group .total_count' ).html( '총 (' + $B.string.numberFormat( prodListData.totalCount ) + '개)');
			}
			
			if ( this._isClearPaging ) {
				this._setPaging( this._param.limit, prodListData.totalCount );
			}
			
			// 상품이 없을 경우 화면 처리
			var _$noProduct = this._$target.find('.noProduct');
			if(prodListData.list.length > 0){
				AP.lazyLoad.add( this._$prodList.find( 'img.lazy_load' )).updated();
				_$noProduct.hide();
				$( '#prodPagenation' ).show();
			}else{
				this._$prodList.find( '> ul' ).empty();
				_$noProduct.find('.noProdSearchWord').text( '‘' + this._param.toSearchFor + '’' );
				$( '#prodPagenation' ).hide();
				_$noProduct.show();
			}
		},
		
		//아티클 데이터
		_getArticleData : function(){
			AP.api.searchArticleList( {}, this._param ).done(function(result){
				this._setArticle(result);
			}.bind(this));
		}, 
		
		//아티클 렌더링
		_setArticle : function(data){
			if(data.list.length > 0){
				var html = AP.common.getTemplate( 'search.article', data );
				this._$articleList.html( html );
				this._$articleSlide.ixSlideMax();
				this._$articleCnt.html( '컨텐츠 (' + $B.string.numberFormat( data.totalCount ) + '개)');
			}else{
				this._$articleWrap.hide();
			}
		},
		
		//이벤트 데이터
		_getEventData : function(){
			AP.api.searchPlanDisplayList( {}, this._param ).done(function(result){
				this._setEventDraw(result);
			}.bind(this));
		},
		
		//이벤트 렌더링
		_setEventDraw : function(data){
			if(data.list.length > 0){
				var html = AP.common.getTemplate( 'search.event', data );
				this._$eventList.html( html );
				this._$eventSlide.ixSlideMax();
				this._$eventCnt.html( '이벤트 (' + $B.string.numberFormat( data.totalCount ) + '개)');
			}else{
				this._$eventWrap.hide();
			}
		},
		
		//리뷰 데이터 & 렌더링
		_getReviewData : function(data){
			this._reviewArea.reset( this._searchWord, this._$reviewCnt, data );
		},
		
		//연관상품 데이터
		_getRecommendData : function(){
			
			var param = $.extend({}, this._param); 
			param.limit = 5;
			param.flags = 'icon_reco_best_w';
			param.prodSort = 'NewProd';
			
			AP.api.flaggedItemList( {}, param ).done(function(result){
				var recommendData = result.onlineProdList == undefined ? result : result.onlineProdList ;
				
				for ( var i = 0; i < recommendData.list.length; ++i ) {
					recommendData.list[i].ranking = i + 1;
					for ( var j = 0; j < recommendData.list[i].products.length; ++j ) {
						recommendData.list[i].products[j].onlineProdSn = recommendData.list[i].onlineProdSn;
					}
				}
				
				var html = AP.common.getTemplate( 'display.product-list.flagged-item', recommendData );
				this._$recommend.find( 'ul' ).html( html );
				
				AP.lazyLoad.add( this._$target.find( '.recommend_items img.lazy_load' )).updated();
				
			}.bind(this));
			
			this._$recommend.find( 'h3' ).text( '‘'+ this._searchWord +'’ 연관 상품 추천' );
		},
		
		// 정렬 옵션 가져오기
		_getSortOption: function () {
			var data = {};

			if ( this._$target.find( '.sorting_group .btn.evt input' ).prop( 'checked' ) ) {
				data.flag = this._$target.find( '.sorting_group .btn.evt input' ).val();
			} else {
				data.flag = null;
			}
			this._$target.find( '.sorting_group .btn.sort input' ).each(function ( index, target ) {
				if ( $( target ).prop( 'checked' ) == true ) {
					data.prodSort = $( target ).val();
				}
			}.bind( this ));
			return data;
		},
		
		// 정렬 셋팅
		_setSort: function () {
			$.extend( this._param, this._getSortOption() );

			this._$target.find( '.sorting_group' ).on( 'change', '.btn input', function (e) {
				$.extend( this._param, this._getSortOption() );
				this._clearPaging();
				this._getProductData();
			}.bind( this ));
		},
		
		// 페이징 초기화
		_clearPaging: function () {
			var $pagination = $( '#prodPagenation' );
			$pagination.paging( 'clear' ).off( 'paging-change' );
			this._isClearPaging = true;
			this._param.offset = 0;
		},
		
		// 이벤트 등록
		_setEvent: function () {
			if ( this._$target.find( '.sorting_group' ).length > 0 ) {
				this._setSort();
			}
			
			// filter
			AP.productFilter.addListener( 'apply-filter-data', function (e) {
				if ( Object.values( e.data ).length > 0 ) {
					var attr = '';
					$.each( e.data , function ( key, value ) {
						attr += key + '=';
						for ( var i = 0; i < value.length; ++i ) {
							attr += value[i]['addAttrValCode'];
							if ( i < value.length - 1 ) {
								attr += ',';
							} else {
								attr += '|';
							}
						}
					});
					attr = attr.substr( 0, attr.length - 1 );
					this._param.attr = attr;

				} else {
					this._param.attr = null;
				}

				this._clearPaging();
				this._getProductData();
			}.bind( this ));
		},
		
		_setPaging: function ( limit, totalCount ) {
			var $pagination = $( '#prodPagenation' );
			if ( $pagination.length > 0 && $pagination.attr( 'class' ).indexOf( 'apply' ) < 0  ) {
				$pagination.paging({
					limit: limit,
					totalCount: totalCount,
					focusTarget: this._$target.find( '.sorting_group' )
				});
				this._isClearPaging = false;
			}
			// paging
			$pagination.on( 'paging-change', function (e) {
				this._param.offset = e.offset;
				this._getProductData();
			}.bind( this ));
		},
		
		

	});

	AP.search = new Search();
})( jQuery );