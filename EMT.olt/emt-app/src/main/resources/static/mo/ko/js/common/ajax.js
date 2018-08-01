/**
 * ajax 공통 관리
 */
;(function() {
	'use strict';

	/** ========== responsive ========== */

	var Ajax = $B.Class.extend({

			initialize: function () {
				this._pool = {};
			},

			/** =============== Public Methods =============== */

			get: function ( option ) {
				var opt = option || {},
					defer = new $.Deferred(),
					ajax = $.ajax( opt );

				defer.abort = function () {
					if ( typeof ajax.abort === 'function' ) ajax.abort();
				};

				ajax.done( function ( result ) {
					
					var keyArr = Object.keys(result);
					$.each(keyArr, function(idx, key){
						var obj = result[key];
						
						if( _.has(obj, 'prodListUnitCode') && obj['prodListUnitCode'] == 'Prod' ){
							if( obj.list != undefined ){
								var list = obj.list;
								for (var i = 0; i < list.length; i++) {
									var tempObj = list[i];
									var selectedProdSn = tempObj.selectedProdSn; 
									var prodObj = _.findWhere(tempObj['products'], {prodSn : selectedProdSn});
									tempObj.onlineProdImages = [];
									tempObj.prodSn = prodObj.prodSn;
									tempObj.prodImages = prodObj.prodImages;
									tempObj.linePromoDesc = prodObj.linePromoDesc;
									tempObj.saleDisplayStatus = prodObj.saleDisplayStatus;
									
									tempObj.onlineProdPriceSummary.beforeOnlineSalePrice = prodObj.prodPriceSummary.beforeOnlineSalePrice;
									tempObj.onlineProdPriceSummary.doublePriceDisplayYn = prodObj.prodPriceSummary.doublePriceDisplayYn;
									tempObj.onlineProdPriceSummary.minOnlineSalePrice = prodObj.prodPriceSummary.onlineSalePrice;
									tempObj.onlineProdPriceSummary.maxOnlineSalePrice = prodObj.prodPriceSummary.onlineSalePrice;
									tempObj.onlineProdPriceSummary.maxBeforeOnlineSalePrice = prodObj.prodPriceSummary.beforeOnlineSalePrice;
									tempObj.onlineProdPriceSummary.minOnlineSalePriceDiscountRate = prodObj.prodPriceSummary.onlineSalePriceDiscountRate;
									tempObj.onlineProdPriceSummary.maxOnlineSalePriceDiscountRate = prodObj.prodPriceSummary.onlineSalePriceDiscountRate;
									tempObj.onlineProdPriceSummary.onlineMemberDiscountYn = prodObj.prodPriceSummary.onlineMemberDiscountYn;
									
									tempObj.colorGroups = [];
									tempObj.colorGroups = prodObj.colorGroups;
									
									tempObj.flags = [];
									tempObj.flags = prodObj.flags;
									
									tempObj.lineDesc = prodObj.lineDesc;
									tempObj.products = [];
									tempObj.products.push( prodObj );
								}
							}
						}
						
					});
					
					defer.resolve( result );
				});

				ajax.fail( function ( xhr, textStatus, errorThrown ) {
					var errorCode = xhr.status,
						errorMessage = textStatus;

					if ( /^json$/i.test(opt.dataType) ) {
						if ( xhr.responseJSON ) {
							if ( xhr.responseJSON.errorData ) {
								errorCode = xhr.responseJSON.errorData.errorCode;
								errorMessage = xhr.responseJSON.errorData.message;
							} else {
								errorMessage = xhr.responseJSON.error;
							}
						}
					}

					xhr.errorCode = errorCode;
					xhr.errorMessage = errorMessage;

					defer.reject( xhr, textStatus, errorThrown );
				});

				return defer;
			},

			/**
			 * api로 한번 불러온 데이타를 메모리에 저장하여 이후 api 요청시 메모리에 있는 데이타를 반환
			 * @param {Object}	ajaxOption
			 * @param {String}	path	ajax path
			 * @param {Object}	data	ajax data
			 * @returns	{ajax}
			 */
			getCacheAjax: function ( ajaxOption, path, data ) {
				var deferObj = this._getDeferObj( path, data );

				if ( !deferObj ) {
					if ( !this._pool.hasOwnProperty(path) ) {
						this._pool[path] = [];
					}

					deferObj = this._createDeferObj( ajaxOption, path, data );
					this._pool[path].push( deferObj );
				}

				return deferObj.ajax;
			},

			/** =============== Private Methods =============== */

			_getDeferObj: function ( path, data ) {
				var result;

				if ( this._pool.hasOwnProperty(path) ) {
					_.some( this._pool[path], function ( obj ) {
						if ( $B.isEqual(obj.data, data) ) {
							result = obj;
							return true;
						}
					});
				}

				return result;
			},

			_createDeferObj: function ( ajaxOption, path, data ) {
				var obj = {
					ajax: this.get( ajaxOption ),
					data: $B.object.clone( data )
				};

				obj.ajax.fail( function ( xhr, textStatus, errorThrown ) {
					//if ( textStatus === 'abort' )
					this._removeDeferObj( path, data );
				});

				return obj;
			},

			_removeDeferObj: function ( path, data ) {
				if ( this._pool.hasOwnProperty(path) ) {
					var list = this._pool[path],
						length = list.length;

					for ( var i = 0; i < length; ++i ) {
						var obj = list[i];

						if ( $B.isEqual(obj.data, data) ) {
							list.splice( i, 1 );

							if ( list.length === 0 ) {
								delete this._pool[path];
							}
							return true;
						}
					}
				}
			}

		}, 'Ajax');


	AP.ajax = new Ajax();
})();