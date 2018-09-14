/**
 * ProductItem
 *
 */

;(function ( $ ) {
	'use strict';

	var HeaderSearch = $B.Class.extend({
		initialize: function () {
			this._$target;
			this._$autoComplete;
			this._$recommendSearch;
		},

		/** =============== Public Methods =============== */
		init: function ( options ) {
			this._$target = options.$target;
			this._$autoComplete = this._$target.find('.layer.auto_complete');
			this._$recommendSearch = this._$target.find('.layer.recommended_search');
			this._setEvent();
		},
		toggleRecommendSearch: function() {
			this._$recommendSearch.css("display", "block");
			this._$autoComplete.css("display", "none");
		},
		toggleAutoComplete: function() {
			this._$recommendSearch.css("display", "none");
			var query = this._$target.find('.query').val();
			//console.log(query);
			if($.trim(query) != ''){
				this._$autoComplete.css("display", "block");
				AP.api.getAutoWords(null, {limit: 10, prefix: query})
				.done(function (result) {
					//console.log(result.autoWordList.length);
					if(result.autoWordList.length > 0){
						this._$autoComplete.find('.nodata').css("display", "none");
						this._$autoComplete.find('.recommended_brand').css("display", "block");
						this._$autoComplete.find('.scroll_wrap').css("display", "block");
						this._$autoComplete.find('.layer_bottom').css("display", "block");
						
						var tgtobj = this._$autoComplete.find('.scroll_wrap').find('.list');
						$(tgtobj).empty();
						$.each(result.autoWordList, function(i, item){
							$(tgtobj).append("<li><a href=\"#none\" class=\"rkwd\">"+item.replace(query, "<em>"+query+"</em>")+"</a></li>");
						});
					}
				}.bind( this ));
			}else{
				this.toggleRecommendSearch();
			}
		},
		refreshFavoriteWords: function() {
			AP.api.favoriteWords(null, {limit: 10})
			.done(function (result) {
				/** result {rank, searchWord, newEntry, rankChange} */
				var tgtobj = this._$recommendSearch.find('.tab_cont.favorite').find('.list');
				$(tgtobj).empty();
				$.each(result.favoriteWordList, function(i, item){
					var itemstr = "<li><a href=\"#none\" class=\"rkwd\">"+item.rank+"."+item.searchWord+"</a><span class=\"rank\">";
					if(item.rankChange!=0){
						itemstr += Math.abs(item.rankChange)+" <span class=\""+(item.rankChange > 0?"ico_rank_up":"ico_rank_down")+"\"></span>";
					}else{
						itemstr += "-";
					}
					itemstr += "</span></li>";
					$(tgtobj).append(itemstr);
				});
			}.bind( this ));
		},
		getLatestSearchQuery: function() {
			
		},
		clear: function () {
		},
		/** =============== Private Methods ============== */
		_setEvent: function () {
		}
	});

	AP.headerSearch = new HeaderSearch();
})( jQuery );