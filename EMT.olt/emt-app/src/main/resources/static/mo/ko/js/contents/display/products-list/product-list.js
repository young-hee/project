/**
 * Product List
 *
 * @Method:
 * load				@param	{Object}	api			{String}	"itemList" (default)
 * 										key			{String}	displayMenuId		{String}
 * 										param 		{Object}	offset 				{Number}
 * 																limit 				{Number}
 * 																flag				{String}
 * 																attr				{String}
 * 																prodSort			{String}
 * 																includeFilters		{Boolean}
 */

;(function ( $ ) {
	'use strict';

	var ProductList = $B.Class.extend({
		initialize: function ( $productList ) {
			this._$target = $productList;

			this.BANNER_ITEM_LENGTH = 6;

			this._itemLength = 0;
			this._totalItemLength = 0;

			this._sortOption = null;
			this._filterData = null;
			this._selectedFilterData = {};

			this._api = 'itemList';
			this._key = {};
			this._param = {
				offset: 0,
				limit: 20,
				attr: null,
				flag: null,
				prodSort: null,
				includeFilters: ( this._$target.find( '.sorting_group .btn.filter' ).length > 0 ) ? true : false
			};

			this._setEvent();
			this._setMore();
		},

		/** =============== Public Methods =============== */
		load: function ( options, isMore, prods ) {
			if( options ) {
				if ( options.api ) {
					this._api = options.api;
				}
				if ( options.key ) {
					$.extend( this._key , options.key );
				}
				if ( options.param ) {
					$.extend( this._param , options.param );
				}
			}
			
			var $itemList = this._$target.find( '.item_list' ),
				$more = this._$target.find( 'button.btn_lg_more' ),
				$loading = $itemList.siblings( '.loading' );

			if ( isMore ) {
				$loading.css( 'min-height', '0px' );
			} else {
				this._param.offset = 0;
				$itemList.hide();
				$itemList.find( '> ul' ).empty();
				$itemList.find( '.no_result' ).hide();
				$loading.css( 'min-height', '300px' );
			}

			$more.hide();
			$loading.show();
			if( prods == undefined ){
				AP.api[this._api]( this._key, this._param ).done(function ( result ) {
					this._done( result, $itemList, $more, $loading, isMore );
				}.bind( this )).fail(function () {
					console.log( 'error' );
				}).always(function () {});
			} else {
				this._done(prods, $itemList, $more, $loading, isMore);
			}

		},
		
		_done:  function( result, $itemList, $more, $loading, isMore){
			if ( !result ) return;

			var prodListData = null,
				templatePath = 'display.products-list.item';

			if ( result['filterableOnlineProdList'] ) {
				prodListData = result['filterableOnlineProdList'];
			} else if ( result['onlineProdList'] ) {
				prodListData = result['onlineProdList'];
			}

			if ( this._api == 'searchProdList' ) {
				prodListData = result['everything']['prods'];
				var _$noProduct = this._$target.siblings('.noProduct');
				if ( prodListData['list'].length == 0 ) {
					$itemList.find( '> ul' ).empty();
					$loading.hide();
					_$noProduct.find('.noProdSearchWord').text( this._param.toSearchFor );
					_$noProduct.show();
					return;
				} else {
					this._$target.show();
					_$noProduct.hide();
				}
			}

			// 상품이 존재하지 않습니다.
			if ( !prodListData || prodListData.list.length == 0 ) {
				this._$target.find( '.banner' ).hide();
				$itemList.show()
				$itemList.find( '.no_result' ).show();
				$itemList.find( '.total_count' ).hide();
				$itemList.find( '> ul' ).empty();
				$loading.hide();
				$more.hide();
				return;
			}

			// filter
			if ( prodListData['filter'] ) {
				if ( !this._filterData ) {
					this._filterData = prodListData.filter['addAttrs'];
					for ( var i = 0; i < this._filterData.length; ++i ) {
						for ( var j = 0; j < this._filterData[i]['addAttrVals'].length; ++j ) {
							this._filterData[i]['addAttrVals'][j].selected = false;
						}
					}
				}
			}

			// onlineProdSn, ranking, prodListUnitCode
			for ( var i = 0; i < prodListData.list.length; ++i ) {
				prodListData.list[i].prodListUnitCode =  prodListData.prodListUnitCode;
				prodListData.list[i].ranking = i + 1;
				prodListData.list[i].displayMenuId = this._key.displayMenuId;

				prodListData.list[i].repImgNo = 2;

				for ( var j = 0; j < prodListData.list[i].products.length; ++j ) {
					prodListData.list[i].products[j].onlineProdSn = prodListData.list[i].onlineProdSn;
				}
			}

			// colorGroups - isSelectOption
			for ( var i = 0; i < prodListData.list.length; ++i ) {
				var isSelectOption = true;
				for ( var j = 0; j < prodListData.list[i].products.length; ++j ) {
					if ( prodListData.list[i].products[j]['colorchipTypeCode'] != 'No' ) {
						isSelectOption = false;
					}
				}
				prodListData.list[i].isSelectOption = isSelectOption;
			}
			
			if ( $itemList.length > 1 ) {
				/** 주간 베스트 **/

				var topResult = $B.object.clone( prodListData ),
					bottomResult = $B.object.clone( prodListData );

				topResult.list = bottomResult.list.splice( 0, 1 );
				var top = AP.common.getTemplate( templatePath, topResult ),
					bottom = AP.common.getTemplate( templatePath, bottomResult );

				this._$target.find( '.item_list.type1 ul' ).html( top );
				this._$target.find( '.item_list.type2 ul' ).html( bottom );

			} else {
				if ( $itemList.find( '> ul' ).length > 1 ) {
					// ul 2개 일때

					var beforeHtml = '',
						afterHtml = '';
					
					if ( isMore ) {
						afterHtml = AP.common.getTemplate( templatePath, prodListData );
						$itemList.find( '> ul.after_list' ).append( afterHtml );
						$more.show();
					} else {
						var beforeResult = $B.object.clone( prodListData ),
							afterResult = $B.object.clone( prodListData );

						beforeResult.list = afterResult.list.splice( 0, this.BANNER_ITEM_LENGTH );
						if ( beforeResult.list.length > 0 ) {
							beforeHtml = AP.common.getTemplate( templatePath, beforeResult );
						}
						if ( afterResult.list.length > 0 ) {
							afterHtml = AP.common.getTemplate( templatePath, afterResult );
						}
						
						this._itemLength = 0;
						$itemList.find( '> ul.before_list' ).html( beforeHtml ).show();
						$itemList.find( '> ul.after_list' ).html( afterHtml ).show();
					}
					
					if ( prodListData.list.length > this.BANNER_ITEM_LENGTH ) {
						if ( this._api == 'searchProdList' ) {
							this._$target.find( '.banner' ).hide();
						} else {
							this._$target.find( '.banner' ).show();
						}
					} else {
						this._$target.find( '.banner' ).hide();
					}
				} else {
					// ul 1개 일때
					if ( !isMore ) {
						this._itemLength = 0;
					}
					var html = AP.common.getTemplate( 'display.products-list.item', prodListData );
					$itemList.find( '> ul' ).append( html );
				}
			}

			this._itemLength += prodListData.list.length;
			this._totalItemLength = prodListData.totalCount;

			if ( this._itemLength >= this._totalItemLength ) {
				$more.hide();
			} else {
				$more.show();
			}
			$more.find( 'span' ).html( '더보기 (<em>' + this._itemLength + '</em>/' + this._totalItemLength + ')' );
			if ( $itemList.find( '.total_count' ).length > 0 ) {
				$itemList.find( '.total_count b' ).text( $B.string.numberFormat( this._totalItemLength ));
			}

			$loading.hide();
			$itemList.show();
			
			$itemList.find( '.item:not(.item-apply)' ).each(function ( index, target ) {
				new AP.ProductItem( $(target), this._sortOption, prodListData.list[index] );
			}.bind( this ));
		},

		/** =============== Private Methods =============== */
		_setEvent: function () {
			// sort
			if ( this._$target.find( '.sorting_group' ).length > 0 ) {
				this._sortOption = new AP.SortOption( this._$target.find( '.sorting_group' ));
				$.extend( this._param, this._sortOption.get() );
				this._sortOption.addListener( 'change-sort', function (e) {
					// sort
					// this._param.sortData = this._sortOption.get();
					$.extend( this._param, this._sortOption.get() );
					this.load();

				}.bind( this )).addListener( 'change-view', function (e) {
					// view
					this._$target.find( '.item_list' ).removeClass( 'type1 type2' ).addClass( e.view );

				}.bind( this )).addListener( 'open-search-filter', function (e) {
					// 검색필터
					this._openFilter();
				}.bind( this ));
			}
		},

		_openFilter: function () {
			var cloneFilterData = $B.object.clone( this._filterData );

			$.each( cloneFilterData, function ( index, groupData ) {
				$.each( this._selectedFilterData, function ( groupName, value ) {
					if ( groupName === groupData['addAttrCode'] ) {
						for ( var i = 0; i < groupData['addAttrVals'].length; ++i ) {
							for ( var j = 0; j < value.length; ++j ) {
								if ( groupData['addAttrVals'][i]['addAttrValCode'] === value[j]['addAttrValCode'] ) {
									groupData['addAttrVals'][i].selected = true;
								}
							}
						}
					}
				}.bind( this ));
			}.bind( this ));

			// 검색필터
			new AP.ProductsFilter().open( cloneFilterData ).addListener( 'change-filter', function (e) {
				if ( e.selectedData ) {
					this._selectedFilterData = e.selectedData;
					var attr = '';
					$.each( e.selectedData , function ( key, value ) {
						attr += key + '=';
						for ( var i = 0; i < value.length; ++i ) {
							attr += value[i]['addAttrValCode'];
							if ( i < value.length - 1 ) {
								attr += ',';
							} else {
								attr += '|';
							}
						}
					});
					this._param.attr = attr.substr( 0, attr.length - 1 );

				} else {
					this._param.attr = null;
				}

				this.load();
			}.bind( this ));
		},

		_setMore: function () {
			this._$target.find( 'button.btn_lg_more' ).on( 'click', function () {
				this._param.offset += this._param.limit;
				this.load( {}, true );
			}.bind( this ));
		}
	});

	AP.ProductList = ProductList;
})( jQuery );