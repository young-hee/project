/**
 * BeautyTester
 *
 */

;(function ( $ ) {
	'use strict';

	var Search = $B.Class.extend({
		initialize: function () {
//			console.log('Search-initialize');
			this._$target = null;
			this._$title = null;
			this._query=null;
			this._filter = null;
			this._searchProdFilter = null;
			this._searchProdList = null;
			
			this._$filter = null;
			this._$sort = null;
			this._$sortView = null;
			
			this._param = {
				query : "",
				prodSort: "",
				offset: 0,
				limit: 20
			};
		},

		/** =============== Public Methods =============== */
		init: function ( data ) {
			//console.log('Search-init');
			this._$target = $( '#ap_container .ap_contents' );
			this._$title = this._$target.find('.result_word');
			
			this._$sort = this._$target.find( '.search_sort' );
			this._$sortView = this._$target.find( '.search_sort select' );
						
			this._query = data.query;
			this._param = {
				query : "",//data.query,
				prodSort: "",//data.sort,
				offset: 0,
				limit: 8,
				displayCate: -1,
				priceRange: "",
				flag:"",
				attr: ""
			};
			this._setEvent();
		},
		load: function() {
			$('.loading').show();
			AP.api.searchResult(null, this._param).done(function ( result ) {
				this._$title.find('.h_title').html("<strong>\'"+this._query+"\'</strong> 검색 결과");
				this._$title.find('.result_count').html("<em>"+result.totalCount+"</em>개의 상품이 있습니다.");
				
				this.showFilter({ filter: result.prodFilterInfo});
				this.showList({ query: this._query, totalCount: result.totalCount, list: result.prodList});
				
				this._setPlanSLide({list: result.planList});
				this._setBrandBox({list: result.brandList});
				
				$('.loading').hide();
			}.bind( this )).fail(function( error ) {
				console.log( error.statusText + ' : ' + error.errorCode + error.errorMessage );
			}.bind( this ));
		},
		reloadList: function(isClearPaging) {
			$('.loading').show();
			
			var cateId;
			this._$target.find('.category').find('a').each(function(){
				if($(this).hasClass("on")){
					cateId = $(this).attr("data-cate-sn");
				}
			});
			this._param.displayCate = cateId;
			
			
			if(isClearPaging) this._param.offset = 0;
//			this._searchProdList.empty();
			var flag = "";
			var attr = "";
			this._$target.find( 'input[type=checkbox]' ).each(function (e) {
//				console.log(this.id + " > " + this.checked);
				if(this.checked){
					var attrCode = this.id.split("_")[0];
					if(attrCode != "brand" && attrCode != "flag"){
						attr+=(attr==""?"":",")+attrCode+"="+$(this).attr("data-val-code");
					}else if(attrCode == "flag"){
						flag+=(flag==""?"":",")+$(this).attr("data-val-code");
					}					
				}
			});

			this._param.flag = flag;
			this._param.attr = attr;
			
			var pmin = -1;
			var pmax = -1;
			if(this._$target.find('.price').find('input[type=radio]:checked').length>0){
				pmin = this._$target.find('.price').find('input[type=radio]:checked').attr("data-min");
				pmax = this._$target.find('.price').find('input[type=radio]:checked').attr("data-max")
			}else{
				pmin = this._$target.find('.price').find('.direct_entry').find('input[name="min"]').val();
				pmax = this._$target.find('.price').find('.direct_entry').find('input[name="max"]').val();
			}
			
			if(pmin>=0 && pmax>0){
				this._param.priceRange = pmin+","+pmax;
			}
			
			AP.api.searchResult(null, this._param).done(function ( result ) {
				
				this._$title.find('.h_title').html("<strong>\'"+this._query+"\'</strong> 검색 결과");
				this._$title.find('.result_count').html("<em>"+result.totalCount+"</em>개의 상품이 있습니다.");
				
				this.showList({ query: this._query, totalCount: result.totalCount, list: result.prodList, isClearPaging: isClearPaging});
				$('.loading').hide();
			}.bind( this )).fail(function( error ) {
				console.log( error.statusText + ' : ' + error.errorCode + error.errorMessage );
			}.bind( this ));
		},
		showFilter: function ( data ) {
			this._filter = data;
			this._searchProdFilter = new AP.searchProdFilter({
				$target: this._$target,
				data: this._filter
			});
			this._searchProdFilter.load();
		},
		showList: function ( data ) {
			this._searchProdList = new AP.searchProdList({
				$target: this._$target,
				param: this._param,
				data: data
			});
			this._searchProdList.load();
		},
		/** =============== Private Methods ============== */
		_setEvent: function () {
			// 정렬
			if( this._$sort.length ) {
				this._param.prodSort = this._$sort.find( 'a' ).eq(0).data( 'value' );
				this._$sort.find( '> a' ).on( 'click', function (e) {
					e.preventDefault();

					var $btn = $( e.currentTarget );
					if ( $btn.hasClass( 'on' )) return;
					$btn.siblings().removeClass( 'on' );
					$btn.addClass( 'on' );

					var value = $btn.data( 'value' );
					this._param.prodSort = value;
					this._isClearPaging = true;
					this.reloadList(true);
				}.bind( this ));
			}
		},
		_setPlanSLide: function ( data ) {
			var html = AP.common.getTemplate('display.search.search-plan-slide', data);
			this._$target.find('.search_bottom .slide').html(html);
			this._$target.find('.search_bottom .slide').ixSlideMax();
		},
		_setBrandBox: function ( data ) {
			var html = AP.common.getTemplate('display.search.search-brand-box', data);
			this._$target.find('.search_bottom').find('.ranking_article').html(html);
		}
	});

	AP.search = new Search();
})( jQuery );