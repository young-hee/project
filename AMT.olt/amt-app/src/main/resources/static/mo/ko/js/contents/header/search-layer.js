/**
 * Search-layer
*/
;(function ( $ ) {
	'use strict';

	var SearchLayer = $B.Class.extend({

		initialize: function ( options ) {
			this._$target;
		},

		/** =============== Public Methods =============== */

		/**
		 * 검색 모달 열기
		 * Events:
		 * EventProperties:
		 * @param {Object}  searchData
		 * @return {modal}
		 */
		open: function () {
			AP.api.favoriteWords(null, {limit: 10})
			.done(function (result) {
				
				/** result {rank, searchWord, newEntry, rankChange} */
				this._modal = AP.modal.full({
					title: '',	//title 을 설정하면 dt.layer_title 이 활성화 되어 검색어 입력 창이 가려짐.
					contents: {
						templateKey: 'header.search-layer',
						templateModel: result
					},
					containerClass: 'search_layer',
					fixed: true
				}).addListener( 'modal-before-close', function (e) {
					this._clear();
				}.bind( this )).addListener( 'modal-close', function (e) {
					this._modal = null;
				}.bind( this ));

				this._$modal = this._modal.getElement();
				this._$modal.removeClass('modal_popup');
				this._$modal.removeClass('js_open');
				this._$modal.removeClass('system_alert');
				
				$( '.ui_tab' ).tabs();
				this._$target = $('.search_layer').find('.layer_wrap').find('.layer_cont');
				this._setEvents();
				
				this._showLatestQuery();
			}.bind( this ));
		},

		/** =============== Private Methods =============== */

		//plugin 적용
		_setPlugins: function () {
			this._$modal.find( '.search_form > input' ).inputText();
		},

		_setEvents: function () {
			this._$target.find('.btn-latest-query').on('click', function(e){
				this._showLatestQuery();
			}.bind(this));
			
			this._$target.find('.search_form input[name=query]').on('keyup',function(e){
				var query = this._$target.find('.search_form input[name=query]').val();
				
				if($.trim(query) != ""){

					this._$target.find('.auto_complete').css("display", "block");
					this._toggleAutoComplete(query);
//        			this._latestQuery = query;
					
					if(event.which == 13){
						this._prevSearch(query);
						this._doSearch();
					}
				}else{
					this._$target.find('.auto_complete').css("display", "none");
				}
			}.bind(this));
			
			$('.layer.recommended_search').find('.tab_cont.latest').on("click", ".btn_del.latest-query", function(e){
        		var kwd = $.trim($(e.currentTarget).parent().find('a').text());
       			var cka = $.cookie("cookieKeyword").split("|");
       			if($.inArray(kwd, cka)>-1){
       				cka=cka.filter(v=>v!=kwd);
           		}
   				$.cookie('cookieKeyword', cka.join("|"));
   				this._showLatestQuery();
        	}.bind(this));
			
			this._$target.find('.section.keyword_area').find('.keyword_list').on("click", ".btn_del.latest-query", function(e){
        		var kwd = $.trim($(e.currentTarget).parent().find('a').text());
       			var cka = $.cookie("cookieKeyword").split("|");
       			if($.inArray(kwd, cka)>-1){
       				cka=cka.filter(v=>v!=kwd);
           		}
   				$.cookie('cookieKeyword', cka.join("|"));
   				
   				this._showLatestQuery();
        	}.bind(this));
			
			this._$target.find('.section.keyword_area').find('.bottom').on("click", ".btn_del.latest-query-all", function(e){
        		$.cookie('cookieKeyword', "");
        		this._showLatestQuery();
        	}.bind(this));
			
			this._$target.find('.section.keyword_area').find('.keyword_list').on("click", ".rkwd", function(e){
				$('input[name="query"]').val($(e.currentTarget).attr("data-kwd"));
				this._doSearch();
			}.bind(this));
		},
		_toggleAutoComplete: function(query) {
			this._$autoComplete = this._$target.find('.auto_complete');
			AP.api.getAutoWords(null, {limit: 10, prefix: query})
			.done(function (result) {
//				console.log(result.autoWordList.length);
				if(result.autoWordList.length > 0){
					this._$autoComplete.find('.brand_info').css("display", "block");
					this._$autoComplete.find('.keyword_list.list').css("display", "block");
					this._$autoComplete.find('.keyword_list.no_data').css("display", "none");
					
					var tgtobj = this._$autoComplete.find('.keyword_list.list');
					$(tgtobj).empty();
					$.each(result.autoWordList, function(i, item){
						$(tgtobj).append("<li><a href=\"#none\" class=\"rkwd\" data-kwd=\""+query+"\">"+item.replace(query, "<em>"+query+"</em>")+"</a></li>");
					});
				}else{
					this._$autoComplete.find('.brand_info').css("display", "none");
					this._$autoComplete.find('.keyword_list.list').css("display", "none");
					this._$autoComplete.find('.keyword_list.no_data').css("display", "block");
				}
			}.bind( this ));
		},
		_prevSearch: function (query) {
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
		},
		_doSearch: function () {
   			var $form = $('form.validate');
   			$form.submit();
		},
		_showLatestQuery(){
			var tgtcont = this._$target.find('.section.keyword_area');
			if(!$.cookie("cookieKeyword")){
				$(tgtcont).find('.no_keyword').css("display", "block");
				$(tgtcont).find('.keyword_list.latest').css("display", "none");
				$(tgtcont).find('.bottom').css("display", "none");
			}else{
				this._$target.find('.auto_complete').css("display", "none");
				var cka = $.cookie("cookieKeyword").split("|");
				$(tgtcont).find('.keyword_list.latest').empty();
				$(tgtcont).find('.no_keyword').css("display", "none");
				$(tgtcont).find('.keyword_list.latest').css("display", "block");
				$(tgtcont).find('.bottom').css("display", "block");
				$.each(cka, function(i, item){
					$(tgtcont).find('.keyword_list.latest').append("<li><a href=\"#none\" class=\"rkwd\">"+item+"</a><button type=\"button\" class=\"btn_del latest-query\"><i class=\"ico_close_s\"><span class=\"sr_only\">검색어 삭제</span></i></button></li>");
				});
			}
		},
		_setAutoCompletion: function () {
			// 자동완성
			var _this = this,
				$modal = _this._$modal,
				$input = $modal.find( '.search_form > input' ),
				$autoCompletion = $modal.find( '.automatic_completion' );

			$input.on( 'keyup', function (e) {
				var word = $( this ).val();
				Predictive.stop();
				if ( word ) {
					Predictive.start( word );
				} else {
					toggleAutoCompletion(0);
				}
			});

			$input.on( 'focus', function (e) {
				var word = $( this ).val();
				if ( word ) {
					Predictive.load( word );
				}
			});

			$modal.on( 'click', '.search_header', function () {
				toggleAutoCompletion(0);
			});

			$modal.on( 'click', '.automatic_completion a', function (e) {
				$input.val( $( this ).text() );
				toggleAutoCompletion(0);
				return false;
			});

			$input.on( 'input-text-empty', function () {
				$input.val('');
				toggleAutoCompletion(0);
			});

			function toggleAutoCompletion ( isShow ) {
				if ( isShow ) {
					$autoCompletion.show();
					$autoCompletion.addClass( 'on' );
					$autoCompletion.height( $autoCompletion.closest( '.layer' ).height() - $autoCompletion.offset().top );
				} else {
					$autoCompletion.hide();
					$autoCompletion.removeClass( 'on' );
				}
			}

			// TODO: 작업중
			var Predictive = (function () {
				var timer = null;

				function create ( data ) {
					var html = '';
					for ( var i = 0; i < data.list.length; ++i ) {
						html += '<li><a href="' + data.list[i].link + '">' + data.list[i].word + '</a></li>';
					}
					if ( html ) {
						$autoCompletion.find( 'ul' ).html( html );
						toggleAutoCompletion(1);
					}
				}

				return {
					start: function ( word ) {
						var _this = this;
						if ( !timer ) {
							timer = setTimeout(function () {
								_this.stop();
								_this.load( word );
							}, 200 );
						}
					},
					stop: function () {
						if ( timer ) {
							clearTimeout( timer );
							timer = null;
						}
					},
					load: function ( word ) {
						AP.api.predictive({}, {
							word: word
						}).done(function ( data ) {
							create( data );
						}).fail(function ( e ) {
							//실패
							console.log( 'error!' );
						}).always(function (e) {
							//성공, 실패
						});
					}
				};
			}());
		},
		_clear: function() {
		},
		_removeEvents: function () {
			var $input = this._$modal.find( '.search_form > input' );

			$input.inputText( 'clear' );
			$input.off();
			this._$modal.find( '.automatic_completion a' ).off();
		}
	});

	AP.searchLayer = SearchLayer;
})( jQuery );