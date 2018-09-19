/**
 * SearchProdFilter
 *
 */

;(function ( $ ) {
	'use strict';

	var SearchProdFilter = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target;
			this._$filter = null;
			this._data = options.data.filter;
		},
		/** =============== Public Methods =============== */
		open: function () {
			this._modal = AP.modal.full({
				title: '검색필터',
				contents: {
					templateKey: 'display.search.search-prod-filter',
					templateModel: this._data
				},
				containerClass: 'filter_layer',
				fixed: true
			}).addListener( 'modal-before-close', function (e) {
				this._setCondition();
				this._clear();
			}.bind( this )).addListener( 'modal-close', function (e) {
				this._modal = null;
			}.bind( this ));

			$( '.ui_accordion' ).accordion();

			this._setEvent();
		},
		clear: function () {
		},
		/** =============== Private Methods ============== */
		_done: function ( regularEventSn, result ) {
		
		},
		_setEvent: function () {
			$(".color_ck_list span, .srch_filter_list01 li a").on('click', function(){
				if($(this).hasClass('on')) $(this).removeClass('on');
				else $(this).addClass('on');
			});
			$(".price_sel01 ul li a").on('click', function(){
				if($(this).hasClass('on')) $(this).removeClass('on');
				else{
					$(this).addClass('on');
					$(this).parent().siblings().children().removeClass('on');
				}
			});
			$(".btn_h50_gy.reset").on('click', function(){
				$(".ui_accordion").find('li > a.on').each(function(){
					$(this).removeClass('on');
				});
			});
			$(".btn_h50_bk.apply").on('click', function(){
				this._setCondition();
				this._clear();
				this._modal = null;
			}.bind(this));
			
			$(".filter_sel_area").on('click', '.btn_remove_cond', function(e){
				$(e.currentTarget).parent().parent().remove();
				if($(".filter_sel_area").children().length == 0){
					$(".filter_sel_area").css("display", "none");
				}
				AP.search.reloadList();
			}.bind(this));
		},
		_setCondition: function () {
			$(".filter_sel_area").empty();
			if($(".ui_accordion").find('li > a.on').length>0){
				$(".filter_sel_area").css("display", "block");
				$(".ui_accordion").find('li > a.on').each(function(){
					$(".filter_sel_area").append("<div class=\"brand_sel\"><span class=\"brand_sel\"><em>"+$(this).text()+"</em><a href=\"javascript:;\" class=\"btn_remove_cond\">닫기</a></span></div>");
				});
			}else{
				$(".filter_sel_area").css("display", "none");
			}
			AP.search.reloadList();
		},
		_clear: function () {
		}
	});

	AP.searchProdFilter = SearchProdFilter;
})( jQuery );