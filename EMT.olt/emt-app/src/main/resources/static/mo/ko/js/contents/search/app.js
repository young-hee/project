/**
 * Search
 *
 */

;(function ( $ ) {
	'use strict';

	var Search = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.ap_search' );
			
			$('#searchWord').val( decodeURIComponent( $B.utils.urlParam('searchWord') ) );
			this._loadedTab = {product : false, content : false, review : false};
			
			this._$prodLoading = this._$target.find( '#prodLoading' );
			this._$videoList = this._$target.find( '.video_list' );
			this._$videoMoreBtn = this._$target.find( '.content .btn_video_more' );
			this._$articleList = this._$target.find( '#articleList' );
			this._$eventList = this._$target.find( '.event-list' );
			this._$eventMoreBtn = this._$target.find( '.content .btn_event_more' );
			this._$recommend = this._$target.find( '.recommend_items' );
			
			this._prodTempPath = 'products.recommend-product-list';
			
			this._param = {
				 offset: 0
				,limit: 8
				,attr: null
				,flag: null
				,prodSort: null
				,includeFilters: ( this._$target.find( '.sorting_group .btn.filter' ).length > 0 ) ? true : false
				,toSearchFor : $('#searchWord').val()
			};
			
			this._setSearchForm();
			
		},

		/** =============== Public Methods =============== */
		
		load : function(){
			this._getDefaultData();
		},
		
		setSlide: function () {
			// slide
			this._$target.find( '.slide' ).ixSlideMax();
			AP.responsiveWidth.addListener( 'resize', function (e) {
				this._$target.find( '.ix-slide-max-apply' ).ixSlideMax( 'resize' );
			}.bind( this ));
		},

		/** =============== Private Methods =============== */
		/**
		 * 검색 페이지 최초 검색데이터 로드
		 * 상품, 컨텐츠, 리뷰를 셋팅
		 * */
		_getDefaultData : function(){
			AP.api.searchEverything(null, {
				toSearchFor : $('#searchWord').val()
			}).done(function(result){
				if( result.everything != undefined && result.everything != null){
					var articles = null;
					var planDisplay = null;
					var prodReviews = null;
					var prods = null;
					if( result.everything.articles != undefined && result.everything.articles != null  && result.everything.articles.list.length > 0 ){
						$('.articleTab').show();
					}
					
					if( result.everything.prodReviews != undefined && result.everything.prodReviews != null  && result.everything.prodReviews.list.length > 0 ){
						$('.reviewTab').show();
					}
				}
				
				this._$prodLoading.hide();
				$('.loading').hide();
				this._setProduct(result);
				this._getRecommendData();
				this._setEvent();
				
			}.bind(this)).fail(function(err){
				this._$prodLoading.hide();
			}.bind(this));
		},
		
		_setSearchForm: function () {
			var $searchWrap = this._$target.find( '.search_wrap ' );
			$searchWrap.on( 'click', '.btn_color, .ui_close', function () {
				$searchWrap.find( '.color_layer' ).toggleClass( 'open' );
			});
			$searchWrap.find( '.color_chip.circle' ).on( 'click', 'a', function (e) {
				location.href = '/common/search?searchWord='+$(e.currentTarget).data('color');
			});
			
			this._$target.find('.searchWordEm').text( $('#searchWord').val() );
		},

		_setProduct: function (data) {
			this.productList = new AP.ProductList( this._$target.find('.tab_contents .tab_cont.product') );
			var option = {
					 api : 'searchProdList'	
					,key : 'search'
					,param : $.extend(this._param, {toSearchFor : $('#searchWord').val(), limit : 10})
			};
			this._loadedTab.product = true;
			this.productList.load(option, false, data);
		},
		
		// 컨텐츠 데이터 가져오기
		_getArticleData : function( offset ) {
			this._$videoMoreBtn.hide();
			var param = $.extend({}, this._param); 
			param.limit = 3;
			
			AP.api.searchArticleList( null, param)
			.done(function(result){
				this._loadedTab.content = true;
				this._setContent( result );
			}.bind(this))
			.fail(function(xhr){
				
			}.bind(this));
		},
		
		// 컨텐츠 리스트 렌더링
		_setContent: function (data) {
			if( data == null || data == undefined || data.list.length == 0 ){
				this._$target.find('.noArticle').show();
				return false;
			}
			var html = AP.common.getTemplate( 'search.content-list', data );
			if ( data.offset ) {
				this._$videoList.append( html );
			} else {
				this._$videoList.html( html );
			}
			
			var nextOffset = data.offset + data.limit;
			if ( data.totalCount > nextOffset ) {
				this._$videoMoreBtn.html( '<span>더보기 (<em>' + nextOffset  + '</em>/' + data.totalCount + ')</span> <i class="ico_arr_d"></i>' ).show();
				this._$videoMoreBtn.on( 'click', function (e) {
					this._getArticleData( nextOffset );
				}.bind(this));
			}
		},
		
		//이벤트 데이터
		_getEventData : function( offset ){
			var param = $.extend({}, this._param); 
			param.offset = offset;
			param.limit = 3;	
			AP.api.searchPlanDisplayList( {}, param ).done(function(result){
				this._setEventDraw(result);
			}.bind(this));
		},
		
		//이벤트 렌더링
		_setEventDraw : function(data){
			if( data == null || data == undefined || data.list.length == 0 ){
				this._$target.find('.noEvent').show();
				return false;
			}
			
			var html = AP.common.getTemplate( 'search.event', data );
			if ( data.offset ) {
				this._$eventList.append( html );
			} else {
				this._$eventList.html( html );
			}
			
			var nextOffset = data.offset + data.limit;
			if ( data.totalCount > nextOffset ) {
				this._$eventMoreBtn.html( '<span>더보기 (<em>' + nextOffset  + '</em>/' + data.totalCount + ')</span> <i class="ico_arr_d"></i>' ).show();
				this._$eventMoreBtn.on( 'click', function (e) {
					this._getEventData( nextOffset );
				}.bind(this));
			}
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
				
				var temp = recommendData.list[0];
				for (var i = 0; i < 3; i++) {
					recommendData.list.push(temp);
				}
				
				var html = AP.common.getTemplate( this._prodTempPath, recommendData );
				this._$recommend.find('#recommendItems').html( html );
				this._$recommend.find( 'h3.title em' ).text( $('#searchWord').val() );
				
				if(recommendData.totalCount > 0){
					this._$recommend.show();
					this.setSlide();
				}
				
			}.bind(this));
			
		},
		
		// 이벤트 셋팅
		_setEvent : function(){
			this._reviewArea = new AP.ReviewArea( this._$target.find('.tab_cont.review') );
			this._contentArea = this._$target.find('.tab_cont.content');

			// 검색 버튼 클릭
			$('.search_form #searchBtn').on('click', function (e){
				e.preventDefault();
				if( $.trim( $('#searchWord').val() ) == '' ){
					AP.modal.alert( AP.message.SEARCH_WORD_EMPTY );
					return false;
				}
				location.href = '/common/search?searchWord='+$('#searchWord').val();
			});
			
			// Ch.에띄드 이동
			this._contentArea.find('ul.video_list').on('click', 'li', function(e){
				e.preventDefault();
				location.href = '/display/etude_ch/detail?articleSn='+$(e.currentTarget).data('articleSn');
			});
			
			// 탭 체인지
			this._$target.find( '.ui_tab' ).on( 'tabs-change', function (e) {
				//TODO: 검색 키워드 변경시 호출
				if(e.index == 0 && this._$target.find('.before_list .item').length == 0){
					this._$target.find('.noProduct').show();
				}else if(e.index == 1 && !this._loadedTab.content){
					this._loadedTab.content = true;
					this._getArticleData(0);
					this._getEventData(0);
				}else if(e.index == 2 && !this._loadedTab.review){
					this._loadedTab.review = true;
					this._reviewArea.reset( $('#searchWord').val() );
				}
			}.bind(this));

			// 키보드 엔터
			this._$target.find( '.search_form input#searchWord' ).on( 'keydown', function (e) {
				if ( e.keyCode === 13 ) {
					$( e.target ).siblings( '.btn_search' ).trigger( 'click' );
				}
			}.bind( this ));
		}
	});

	AP.search = new Search();
})( jQuery );