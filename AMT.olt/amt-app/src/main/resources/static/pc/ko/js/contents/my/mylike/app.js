/**
 * MyLike
 *
 */

;(function ( $ ) {
	'use strict';

	var MyLike = $B.Class.extend({
		initialize: function () {
			this._$target = $( '.cont_area' );
			this._$all = $( '.list_all' ).closest( 'fieldset' ).closest( 'div' );
			this._$product = $( '.list_product' ).closest( 'fieldset' ).closest( 'div' );
			this._$brand = $( '.list_brand' ).closest( 'fieldset' ).closest( 'div' );
			this._$event = $( '.list_event' ).closest( 'fieldset' ).closest( 'div' );
			
			this._setEvent();
		},

		/** =============== Public Methods =============== */
		init: function ( options ) {
			this._setLink('All');
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
			if( this._$target.find( '.like_link' ) ) {
				this._$target.on( 'click', '.like_link a', function (e) {
					this._$target.find( '.like_link a' ).removeClass( 'on' );
					$( e.currentTarget ).addClass( 'on' );
					
					var id = $( e.currentTarget ).data( 'linkId' );
					this._setLink(id);
					
				}.bind( this ));
			}
		},
		
		_setLink: function(id) {
			this._$all.hide();
			this._$product.hide();
			this._$brand.hide();
			this._$event.hide();
			
			if(id == 'All') {
				this._$all.show();
				this._setAllList();
			}
			else if(id == 'Product') {
				this._$product.show();
				this._setProductList();
			}
			else if(id == 'Brand') {
				this._$brand.show();
				this._setBrandList();
			}
			else if(id == 'Event') {
				this._$event.show();
				this._setEventList();
			}
		},
		
		_setAllList: function () {
			this._all = new AP.MyLikeAll({
				$target: this._$all,
				//displayMenuId: options.displayMenuId,
				template: 'my.mylike.all', //'display.product-item',
				api: 'test',
				key: '' //options.displayMenuId
			}).load({ 
				//includeFilters: true 
			});
		},
		
		_setProductList: function () {
			/*
			AP.MyLikeProduct.init({
				$target: ''
			});
			*/
			this._product = new AP.MyLikeProduct({
				$target: this._$product,
				//displayMenuId: options.displayMenuId,
				template: 'my.mylike.product', //'display.product-item',
				api: 'test',
				key: '' //options.displayMenuId
			}).load({ 
				//includeFilters: true 
			});
		},
		
		_setBrandList: function () {
			
			
		},
		
		_setEventList: function () {
			this._event = new AP.MyLikeEvent({
				$target: this._$event,
				//displayMenuId: options.displayMenuId,
				template: 'my.mylike.event', //'display.product-item',
				api: 'test',
				key: '' //options.displayMenuId
			}).load({ 
				//includeFilters: true 
			});
		}		
	});

	AP.MyLike = new MyLike();
})( jQuery );