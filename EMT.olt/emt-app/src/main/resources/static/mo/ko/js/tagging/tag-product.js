;(function ( $ ) {
    'use strict';
    
    var ProdTag = $B.Class.extend({
		DEFAULT_HEIGHT: 900,
		MIN_HEIGHT: 400,

		/**
		 * @param {jQuery}	$target		영역설정
		 * @param {Object}	model
		 * @param {Object}	options
		 * 	- {Boolean}	layerFixed			scroll에 따른 layer fixed 처리 허용 여부
		 */
		initialize: function () {
			this._$target = $( '#ap_container' );
			this._defaultModel = [];
			this._setEvents();
			
		},

		_setEvents: function () {
			if (typeof AP.SelectedOptions !== "undefined") {
				//바로구매, 예약구매 클릭
				this._$target.find( '.btn_buy_now' ).on( 'click', function (e) {
					var products = AP.productDetail._defaultModel.products;
					this._setGaAddEvent(products, 'Checkout1');
					this._setAAEvent('Check Out Now');

				}.bind(this));

				//장바구니 클릭
				this._$target.find( '.btn_basket' ).on( 'click', function (e) {
					var products = AP.productDetail._defaultModel.products;
					this._setGaAddEvent(products, 'Add');
					this._setAAEvent('Add To Bag');
				}.bind(this));
			}	

		},
	    
	    _setGaAddEvent: function (products, action) {
			if ( products.length ) {
				var gaProducts = [];
				var product = {};
				products.forEach(function(element){
					product = {
							'id':element.skuCode,
	    					'name':AP.productDetail._defaultModel.onlineProdName,
	    					'brand':element.brandName,
	    					'category':undefined,
	    					'variant':element.prodName,
	    					'price':element.availablePrices[0].onlineSalePrice,
	    					'quantity':element.cartProdQty,
	    					'dimension26':'Normal',
	    					'dimension27':element.legacyModelCode
					};
					gaProducts.push(product);
					
				});
		    	dataLayer.push({
		    		'event': action,
		    		'ecommerce':{
		    			'currencyCode':window.AP.CURRENCY_CODE,
		    			'detail':{
		    				'products':gaProducts
		    			}
		    		}
		    	});
			}
	    },
	    
	    _setAAEvent: function(action) {
	    	if(typeof _satellite != 'undefined') {
	    		//dtmDataLayer.product_code = AP.productDetail._defaultModel.onlineProdCode;
	    		dtmDataLayer.product_name = AP.productDetail._defaultModel.onlineProdName;
	    		s.products= _satellite.getVar('') + ";" + _satellite.getVar('product_name');
	    		
	    		_satellite.setVar('action_name',action);
	    		_satellite.track('action_track_o');
	    	}
	    },
	    
	    _setGaData: function() {
    		var prodCode = AP.productDetail._defaultModel.onlineProdCode;
    		var prodNm = AP.productDetail._defaultModel.onlineProdName;
    		var brandNm = AP.productDetail._defaultModel.products[0].brandName;
    		
	    	dataLayer.push({
	    		'event': 'Detail',
	    		'ecommerce':{
	    			'currencyCode':window.AP.CURRENCY_CODE,
	    			'detail':{
	    				'products':[{
	    					'id':(prodCode == null) ? undefined : prodCode,
	    					'name':(prodNm == null) ? undefined : prodNm,
	    					'brand':(brandNm == null) ? undefined : brandNm
	    				}]
	    			}
	    		}
	    	});
	    	
	    },
	    
	    _setAaData: function() {
	    	dtmDataLayer={
	    			'page_name':'쇼핑^제품상세',
	    			'login_status':gv_GA_dimension4,
					'app_visitor':(gv_GA_dimension11 == "APP") ? "Y":"N",
	    			'product_code':AP.productDetail._defaultModel.onlineProdCode,
	    			'product_name':AP.productDetail._defaultModel.onlineProdName,
	    			'product_category_code':'',
	    			'product_category1':'',
	    			'product_category1':''
		    	};
	    },

    });


    
	AP.prodTag = new ProdTag();
	
	
	$( document ).ready( function (e) {
		AP.prodTag._setGaData();
	});
})( jQuery );