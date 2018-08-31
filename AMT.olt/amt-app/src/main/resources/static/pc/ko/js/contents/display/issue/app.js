/**
 * issue
 */
;(function ( $ ) {
	'use strict';

	var Issue = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container' );
			//this._$prodListWrap = this._$target.find( '.cate_prd_wrap01' );
						
			this._$loading = this._$target.find( '.loading' );

			this._loading = false;
			this._setPlugins();
		},

		/** =============== Public Methods =============== */
		
		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( model ) {
			//console.log(model);
//			if(issueType == 'issue1'){
//				for(var i = 0 ; i)
//			}
			//console.log(model['M01_issue1_m.5'].length);
			//console.log(model['M01_issue1_m.5'][0]['contents'][0]);
			this._defaultModel = model;
			this._setEvents();
		},

		/** =============== Private Methods =============== */

		_setPlugins: function () {
			
		},
		
		//이벤트 핸들러
		_setEvents: function () {
			var modelData = this._defaultModel;
			var html;
			var data;
			//console.log(modelData.length);
			for(var i = 0 ; i < modelData.length ; i++){
				data = this._defaultModel[i];
				//console.log(data);
				html = AP.common.getTemplate( 'display.issue.product-list', data );
				$('#prod_list_' + i).html(html);
			}
			//$(this).siblings('.loading').hide();
			AP.lazyLoad.add( 'img.lazy_load' );
		}
	});


	AP.issue = new Issue();
})( jQuery );