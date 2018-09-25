;(function ( $ ) {
    'use strict';
    
    var SearchTag = $B.Class.extend({
		DEFAULT_HEIGHT: 900,
		MIN_HEIGHT: 400,

		initialize: function () {
			this._$target = $( '#ap_container' );
			this._defaultModel = [];
		},
		_setGASearchData: function () {
			gv_GA_dimension24 = AP.search._$target.find( '.sorting_group .total_count' )[0].innerText.match(/\d+/)[0];
			gv_GA_dimension21 = AP.search._searchWord;
			gv_GA_dimension22 = (gv_GA_dimension24 == "0") ? "X" : "O";
			
	    	dataLayer.push({
	    		'dimension21': gv_GA_dimension21,
	    		'dimension22': gv_GA_dimension22,
	    		'dimension24': gv_GA_dimension24,
	    	});	
	    	
	    	ga('set', 'dimension21' , (gv_GA_dimension21 == "undefined") ? undefined : gv_GA_dimension21);
	    	ga('set', 'dimension22' , (gv_GA_dimension22 == "undefined") ? undefined : gv_GA_dimension22);
	    	ga('set', 'dimension24' , (gv_GA_dimension24 == "undefined") ? undefined : gv_GA_dimension24);
	    	ga('send', 'pageview');
			gv_GA_dimension24 = undefined;
			gv_GA_dimension21 = undefined;
			gv_GA_dimension22 = undefined;
		},

    });


    
	AP.searchTag = new SearchTag();
	
	
	$( document ).ajaxComplete(function(event, request, settings) {
		var url = settings.url;
		if(url.startsWith('/common/searchEverything')) {
			AP.searchTag._setGASearchData();
			
		}
	});
})( jQuery );