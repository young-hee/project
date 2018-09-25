;(function ( $ ) {
    'use strict';
    
    var OrdCompleteTag = $B.Class.extend({
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
			this._$totalPrice = this._$target.find( '.total_price' );
			this._defaultModel = [];
		},
		
		_setAaData: function() {
			var aaProdCd = '';
			var aaProdNm = '';
			var aaProdQty = '';
			var aaProdPrice = '';
			var aaProdCat = '';
			var aaProdShippingType = '';
			var aaOrdRevenue = '';
			var aaPrdOptCd = '';
			if(gv_GA_products.length > 0) {
				gv_GA_products.forEach(function(element){
					aaProdCd += element.sku+",";
					aaProdNm += element.name+",";
					aaProdQty += element.quantity+",";
					aaProdCat += ",";
					aaProdShippingType += "Normal"+",";
					aaOrdRevenue += gv_GA_payment.amount+",";
					aaPrdOptCd += ",";
					aaProdPrice += element.price+",";
				});				
			}
			
			dtmDataLayer= {
					'page_name':'주문결제',
					'login_status':gv_GA_dimension4,
					'app_visitor':(gv_GA_dimension11 == "APP") ? "Y":"N",
					'product_code':aaProdCd,
					'product_name':aaProdNm,
					'product_price':aaProdPrice,
					'product_category1':aaProdCat,
					'product_option_code':aaPrdOptCd,
					'order_code':gv_GA_payment.orderNo,
					'order_revenue':aaOrdRevenue,
					'order_number':aaProdQty,
					'point_coupon':gv_GA_payment.coupon,
					'payment_type':gv_GA_payment.detailPaymentMethod,
					'shipping_type':aaProdShippingType
				};
		},
		
		_setGaData: function () {
			var gaProducts = [];
			var aaProductsCode = "";
			var aaProductsName = "";
			var gaPayment = {};
			var gaproduct = {};
			if(gv_GA_products.length > 0) {
				gv_GA_products.forEach(function(element){
					gaproduct = {
							'id':element.sku,
	    					'name':element.name,
	    					'brand':element.brand,
	    					'category':undefined,
	    					'variant':element.variant,
	    					'price':element.price,
	    					'quantity':element.quantity,
	    					'coupon':element.coupon,
	    					'dimension26':element.shippingType,
	    					'dimension27':element.sapCode,
	    					'metric1':element.beautyPoint
					};
					gaProducts.push(gaproduct);
					
				});				
			}

			if(gv_GA_payment != null) {
				gaPayment = {
						'id':gv_GA_payment.orderNo,
    					'revenue':gv_GA_payment.amount,
    					'tax':gv_GA_payment.tax,
    					'shipping':gv_GA_payment.shippingFee,
    					'coupon':gv_GA_payment.coupon
				};		
			}
			
			dataLayer.push({
				'event':'Purchase',
				'dimension33':gv_GA_payment.detailPaymentMethod,
				'metric5':gv_GA_payment.coupon,
				'ecommerce': {
				    'purchase': {
				      'actionField': gaPayment,
				      'products':gaProducts
				    }
				  }
			});
			ga('send', 'pageview');	
		},

    });

	AP.ordCompleteTag = new OrdCompleteTag();
	
	$( document ).ready( function (e) {
		AP.ordCompleteTag._setGaData();
	});
	
})( jQuery );