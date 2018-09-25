/**
 * Footer
 * @events  'event-type'
 *  ex) AP.footer.addListener( 'event-type', function (e) {});
 */
;(function ( $ ) {
    'use strict';

    var Footer = $B.Class.extend({
        initialize: function () {
        	this._$target = $( '.ap_footer' );
        	this._$aside = $( '.aside' );
        	this._setEvents();
        	this._setAsideMenu();
        },

        /** =============== Public Methods =============== */
        setBanner: function () {

        },

        /** =============== Private Methods =============== */
        _setEvents: function () {
        	this._getLatestProd();        	

        	this._$aside.on( 'click', '.btn_del', function (e) {
        		console.log($( e.currentTarget ).data('product-sn'));
        		this._deleteLatestProd($( e.currentTarget ).data('product-sn'));
			}.bind(this));
        },
        
     // right aside menu
		_setAsideMenu: function () {
			var $aside = this._$target.siblings( 'aside' ),
				$top = $aside.find( '.btn_top' );
			
			//top btn
			$top.on( 'click', function (e) {
				$( 'body, html' ).animate({
					scrollTop: 0
				});
			}.bind(this));
		},
		
		_addCookie(prod){
			//console.log(prod);
			var items = AP.common.getCookie('latestSeenProd');
			//console.log("items : " + items);
			var prodArray = prod.split('*');

			var maxItemNum = 20;
			var expire = 30;
			if(items){
				var itemArray = items.split(',');

				if(itemArray.indexOf(prod) != -1){
					console.log('Already exists');
    			}else{
    				itemArray.unshift(prod);
    				if(itemArray.length > maxItemNum){
    					itemArray.length = 20;
    				}
    				items = itemArray.join(',');
    				AP.common.setCookie('latestSeenProd', items);
    			}
			}else{
				console.log("prod : " + prod);
				AP.common.setCookie('latestSeenProd', prod);
			}
		},
		
		_getLatestProd(){
			//테스트용
			var prod = '693*dfda*bddfd2bb*/pc/ko/images/dummy/img_item_02.jpg*8000*17000*000000000006';
        	this._addCookie(prod);

        	var latestProd = AP.common.getCookie('latestSeenProd');
        	console.log(latestProd);
        	if(latestProd == 'undefined' || latestProd == undefined){
        		return false;
        	}
        	var itemArray = latestProd.split(',');
        	var prodArray = new Array();
        	var obj2 = new Object();

        	for(var i = 0 ; i < itemArray.length ; i++){
        		var obj = new Object();
        		var item = itemArray[i].split('*');
        		
        		obj.prodSn = item[0];
        		obj.prodName = item[1];
        		obj.prodOption = item[2];
        		obj.prodImgUrl = item[3];
        		obj.delPrice = item[4];
        		obj.realPrice = item[5];
        		obj.onlineProd = item[6];
        		
        		prodArray.push(obj);

        	}

        	obj2.list = prodArray;

        	var html = AP.common.getTemplate( 'common.latest-product', obj2);

        	this._$aside.find('.recently_item').html(html);
        	this._$target.siblings( 'aside' ).find('#totalCnt').text(itemArray.length);
        	this._$aside.find( '.slide' ).ixOverlayList();

		},
		
		_deleteLatestProd(prodSn){
			console.log(prodSn);
			var items = AP.common.getCookie('latestSeenProd');
			var newItems;
			var itemArray = items.split(',');
			var delIndex;
			var prod = "";
			
			if(itemArray.length == 1){
				console.log("itemArraylength : " + itemArray.length);
				AP.common.setCookie('latestSeenProd', "", -1);
				this._getLatestProd();
				return false;
			}
			for(var i = 0 ; i < itemArray.length ; i++){
				var item = itemArray[i].split('*');
				if(item[0].indexOf(prodSn) != -1){
					console.log('Already exists');
					console.log('i : ' + i);
					delIndex = i;
				}else{
					if(prod != ""){
						prod = prod + ",";
					}
					prod = prod + itemArray[i];
				}
				
			}
			console.log("prod : " + prod);

			AP.common.setCookie('latestSeenProd', "", -1);
			AP.common.setCookie('latestSeenProd', prod);
			this._getLatestProd();
		}
    });


    AP.footer = new Footer();
})( jQuery );