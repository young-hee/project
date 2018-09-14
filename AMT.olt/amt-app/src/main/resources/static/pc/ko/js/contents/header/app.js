/**
 * Header
 * @events  'event-type'
 *  ex) AP.header.addListener( 'event-type', function (e) {});
 */
;(function ( $ ) {
    'use strict';

    var Header = $B.Class.extend({
        initialize: function () {
        	this._$target = $( '.ap_wrapper').find('.ap_header').find('.search_form');
        	this._latestQuery;
        },

        /** =============== Public Methods =============== */
        init: function () {
			AP.headerSearch.init({
				$target: this._$target
			});
			this._setEvents();
		},
        setBanner: function () {
        },
        /** =============== Private Methods =============== */
        _setEvents: function () {
        	$(".query").on('focus', function(e){
        		AP.headerSearch.toggleRecommendSearch();
        		showLatestQuery();
        	});
        	$(".btn_search").on("click", function(e){
        		AP.headerSearch.toggleRecommendSearch();
        		showLatestQuery();
        	});
        	
        	$(".query").on('keyup', function(e){
        		//console.log(event.type + ": " +  event.which );
        		var query = $(this).val();
        		if(query != this._latestQuery){
        			AP.headerSearch.toggleAutoComplete();
        			this._latestQuery = query;
        		}
        		
        		if(event.which == 13){
        			var diff;
        			if($.cookie("cookieKeyword")){
	        			var cka = $.cookie("cookieKeyword").split("|");
	        			if($.inArray(query, cka)>-1){
	        				cka=cka.filter(v=>v!=query);
	            		}
	        			cka.splice(0,0,query);
	        			cka = cka.slice(0,10);
	        			diff = cka.join("|");
        			}else{
        				diff = query;
        			}
       				$.cookie('cookieKeyword', diff);//, {expires: 0, path: '/', secure: 0});
       				
       				search();
        		}
        	});
        	
        	//$(".query").on('keypress', function(e){return false;});
        	
        	$(".btn-latest-query").on("click", function(e){
        		showLatestQuery();
        	});
        	
        	$('.layer.recommended_search').find('.tab_cont.latest').on("click", ".btn_del.latest-query", function(e){
        		var kwd = $.trim($(e.currentTarget).parent().find('a').text());
       			var cka = $.cookie("cookieKeyword").split("|");
       			if($.inArray(kwd, cka)>-1){
       				cka=cka.filter(v=>v!=kwd);
           		}
   				$.cookie('cookieKeyword', cka.join("|"));
   				
   				showLatestQuery();
        	});
        	
        	$('.layer.recommended_search').find('.tab_cont.latest').on("click", ".latest-query-all", function(e){
        		$.cookie('cookieKeyword', "");
        		var tgtcont = $('.layer.recommended_search').find('.tab_cont.latest');
				$(tgtcont).find('.list').empty();
        	});
        	
        	$(".btn-favorite-words").on("click", function(e){
        		AP.headerSearch.refreshFavoriteWords();
        	});
        	
        	$('.search_form').on('click', '.rkwd', function(e){
        		var kwd = $.trim($(e.currentTarget).text());
        		$(".search_form").find(".query").val(kwd);
        		search();
        	});
        }
    });
    
    AP.header = new Header();
})( jQuery );