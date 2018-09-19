/**
 * Header
 * @events  'event-type'
 *  ex) AP.header.addListener( 'event-type', function (e) {});
 */
;(function ( $ ) {
    'use strict';

    var Header = $B.Class.extend({
        initialize: function () {
            this._$target = $( '#header' );
            this._$titleArea = this._$target.find( '.page_title_new' );

            this._setEvent();
			this._setFixed();
            this._setTitleArea();
            
            this._searchLayer = new AP.searchLayer();
            
            this._$target.find( '.btn_chat' ).on( 'click', function () {
				window.open("http://www.amorepacificmall.com/mobile/cstm/mobile_cstm_chatbot_pop.do?i_sSeqCstmid=&i_sLoginFlag=N","","");
			}.bind( this ));
        },

        /** =============== Public Methods =============== */

		//header의 높이 반환
		getHeight: function () {
			return this._$target.find( '.header_top' ).height();
		},
		
		setTitle : function(title){
			this._$target.find( '.page_title' ).text(title);
		},

        /** =============== Private Methods =============== */

        _setEvent: function () {
			this._$target.find( '.btn_menu' ).on( 'click', function () {
				AP.menuCategory.open();
			}.bind( this ));
			
			this._$target.find( '.btn_previous' ).on( 'click', function () {
				history.back();
			}.bind( this ));
			
			this._$target.find( '.header_common .search_form .ico_search').on( 'click', function(){
				this._showSearchLayer();
			}.bind( this ));
			this._$target.find( '.header_common .search_form .header-main-query').on( 'click', function(){
				this._showSearchLayer();
			}.bind( this ));
		},
		_showSearchLayer: function () {
			
			this._searchLayer.open();
		},
		_clear: function (){
			
		},
		_setFixed: function () {
			$( window ).on( 'scroll', function () {
				var st = $( window ).scrollTop();
				if ( st > 0 ) {
					this._$target.find( '.header_top' ).addClass( 'fixed' );
				} else {
					this._$target.find( '.header_top' ).removeClass( 'fixed' );
				}
			}.bind( this ));
		},

		_setTitleArea: function () {
			var isOpen = false;
			if ( this._$titleArea.length == 0 ) return;
			this._$titleArea.find( '.btn_toggle' ).on( 'click', function (e) {
				if ( !isOpen ) {
					isOpen = true;
					$( e.currentTarget ).addClass( 'on' );
					this._$target.find( '.cate_dimmed' ).show();
					this._$target.find( '.menu_layer' ).show();
				} else {
					isOpen = false;
					$( e.currentTarget ).removeClass( 'on' );
					this._$target.find( '.cate_dimmed' ).hide();
					this._$target.find( '.menu_layer' ).hide();
				}
			}.bind( this ));

			if ( this._$target.find( '.menu_layer' ).length == 0 ) return;
			this._$target.find( '.menu_layer ul a' ).on( 'click', function (e) {
				$( this ).closest( 'ul' ).find( 'a' ).removeClass( 'on' );
				$( this ).addClass( 'on' );
			});
		}
    });

    AP.header = new Header();
})( jQuery );