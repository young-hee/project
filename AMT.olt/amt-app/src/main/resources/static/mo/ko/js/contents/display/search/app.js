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
			this._$title = this._$target.find('.tot_result_num');
			
//			this._$sort = this._$target.find( '.search_sort' );
//			this._$sortView = this._$target.find( '.search_sort select' );
			this._query = data.query;
			this._param = {
				query : data.query,
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
			this._$target.find('.loading').css("display", "block");
			this._$target.find('.section.no_product').css("display", "none");
			this._$target.find('.cate_prd_wrap01').css("display", "none");	
			
			AP.api.searchResult(null, this._param).done(function ( result ) {
				this._$title.html("총 <em class=\"f_prd_num\">"+result.totalCount+"</em> 개의 상품");
				if(result.totalCount == 0){
					this._$target.find('.section.no_product').css("display", "block");
				}
				this.setFilter({ filter: result.prodFilterInfo});
				this.showList({ query: this._query, totalCount: result.totalCount, list: result.prodList});
				this._setPlanSLide({list: result.planList});
				this._setBrandBox({list: result.brandList});
				this._$target.find('.loading').css("display", "none");
			}.bind( this )).fail(function( error ) {
				console.log( error.statusText + ' : ' + error.errorCode + error.errorMessage );
			}.bind( this ));
		},
		reloadList: function() {
			this._$target.find('.loading').css("display", "block");
			this._$target.find('.section.no_product').css("display", "none");
			this._$target.find('.cate_prd_wrap01').css("display", "none");						
			var flag = "";
			var attr = "";
			var pmin = -1;
			var pmax = -1;
			
			this._param.priceRange = "";
			
			$(".ui_accordion").find('li > a.on').each(function (e) {
				console.log($(this).attr("data-attr-code") + " > " + $(this).attr("data-val-code"));
				var attrCode = $(this).attr("data-attr-code");
				if(attrCode != "brand" && attrCode != "flag" && attrCode != "price"){
					attr+=(attr==""?"":",")+attrCode+"="+$(this).attr("data-val-code");
				}else if(attrCode == "flag"){
					flag+=(flag==""?"":",")+$(this).attr("data-val-code");
				}else if(attrCode == "price"){
					pmin = $(this).attr("data-min");
					pmax = $(this).attr("data-max")
				}
			});

			this._param.flag = flag;
			this._param.attr = attr;
			
			if(pmin < 0 || pmax < 0){
				pmin = $('.price_input_area').find('input[name="min"]').val();
				pmax = $('.price_input_area').find('input[name="max"]').val();
			}
			
			if(pmin>=0 && pmax>0){
				this._param.priceRange = pmin+","+pmax;
			}
			
			this._param.prodSort = $('[name="prodSort"]').val();
			
			AP.api.searchResult(null, this._param).done(function ( result ) {
				this._$title.html("총 <em class=\"f_prd_num\">"+result.totalCount+"</em> 개의 상품");
				if(result.totalCount == 0){
					this._$target.find('.section.no_product').css("display", "block");
				}
				this.showList({ query: this._query, totalCount: result.totalCount, list: result.prodList});
				this._$target.find('.loading').css("display", "none");
			}.bind( this )).fail(function( error ) {
				console.log( error.statusText + ' : ' + error.errorCode + error.errorMessage );
			}.bind( this ));
		},
		setFilter: function ( data ) {
			this._filter = data;
			this._searchProdFilter = new AP.searchProdFilter({
				$target: this._$target,
				data: this._filter
			});
		},
		showList: function ( data ) {
			this._$target.find('.cate_prd_wrap01').css("display", "block");
			this._searchProdList = new AP.searchProdList({
				$target: this._$target,
				param: this._param,
				data: data
			});
			this._searchProdList.load();
		},
		/** =============== Private Methods ============== */
		_setEvent: function () {
			this._$target.find('.btn_filter').on('click', function () {
				this._openFilter();
			}.bind(this));
			
			this._$target.find('[name="prodSort"]').on('change', function () {
				this.reloadList();
			}.bind(this));
		},
		_openFilter: function () {
			console.dir(this._searchProdFilter);
			this._searchProdFilter.open();
		},
		_setPlanSLide: function ( data ) {
			var html = AP.common.getTemplate('display.search.search-plan-slide', data);
			this._$target.find('.section.plan').html(html);

			this._$target.find('.slide').on( 'ixSlideMax:init ixSlideMax:change', function(e) {
			    var viewLength = 1, currentPage = Math.ceil( e.currentIndex / viewLength ), totalPage = Math.ceil( e.totalLength / viewLength );
//			    console.log( 'index:' + e.currentIndex, ' total:' + e.totalLength, ' currentPage: ' + currentPage, ' totalPageL' + totalPage);
			    this._$target.find('.slide').find( '.paging > .current' ).text( currentPage + 1 );
			    this._$target.find('.slide').find( '.paging > .total' ).text( totalPage );		
			}.bind(this));
			
			this._$target.find('.slide').ixSlideMax();
		},
		_setBrandBox: function ( data ) {
			var html = AP.common.getTemplate('display.search.search-brand-box', data);
			this._$target.find('.section.brand_new01').html(html);
		}
	});

	AP.search = new Search();
})( jQuery );