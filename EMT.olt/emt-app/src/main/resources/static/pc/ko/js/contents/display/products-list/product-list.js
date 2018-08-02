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

			this.BANNER_ITEM_LENGTH = 4;

			this._filterData = null;
			this._isClearPaging = true;

			this._api = 'itemList';
			this._key = {};
			this._param = {
				offset: 0,
				limit: 10,
				attr: null,
				flag: null,
				prodSort: null,
				includeFilters: ( this._$target.find( '.sorting_group .btn.filter' ).length > 0 ) ? true : false
			};

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		load: function ( options ) {
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

			var $itemList = this._$target.find( '.item_list' );
			AP.api[this._api]( this._key, this._param ).done(function ( result ) {
				done( result );
			}.bind( this )).fail(function ( error ) {
				console.log( 'error', error );
			}).always(function () {});

			var done = function ( result ) {
				if ( !result ) return;

				this._$target.find( 'loading' ).hide();
				this._$target.find( '.loading' ).hide();

				var templatePath = 'display.product-list.item',
					prodListData = null;

				if ( result['filterableOnlineProdList'] ) {
					prodListData = result['filterableOnlineProdList'];
				} else if ( result['onlineProdList'] ) {
					prodListData = result['onlineProdList'];
				}

				if ( !prodListData || prodListData.list.length == 0 ) {
					this._$target.find( '.sorting_group .total_count' ).html( '총 (0개)');
					$itemList.find( '> ul' ).empty();
					$itemList.find( '.banner' ).hide();
					$itemList.find( '.loading' ).hide();
					$itemList.find( '.no_result' ).show();
					$itemList.show();
					return;
				} else {
					$itemList.find( '.no_result' ).hide();
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
						AP.productFilter.setFilter( this._filterData );
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

					var column2ListData = $B.object.clone( prodListData ),
						column4ListData = $B.object.clone( prodListData );

					column2ListData.list = column4ListData.list.splice( 0, 2 );
					var column2Html = AP.common.getTemplate( templatePath, column2ListData ),
						column4Html = AP.common.getTemplate( templatePath, column4ListData );

					this._$target.find( 'hr' ).show();
					this._$target.find( '.item_list.column2 ul' ).html( column2Html );
					this._$target.find( '.item_list.column4 ul' ).html( column4Html );

				} else {
					if ( $itemList.find( 'ul.before_list' ).length > 0 ) {
						// ul 2개 일때

						var beforeListData = $B.object.clone( prodListData ),
							afterListData = $B.object.clone( prodListData );

						beforeListData.list = afterListData.list.splice( 0, this.BANNER_ITEM_LENGTH );
						var beforeHtml = AP.common.getTemplate( templatePath, beforeListData ),
							afterHtml = AP.common.getTemplate( templatePath, afterListData );

						$itemList.find( 'ul.before_list' ).html( beforeHtml );
						$itemList.find( 'ul.after_list' ).html( afterHtml );

						$itemList.find( '.banner' ).hide();
						if ( this._param.offset == 0 ) {
							if ( prodListData.list.length > this.BANNER_ITEM_LENGTH ) {
								$itemList.find( '.banner' ).show();
							}
						}
					} else {
						// ul 1개 일때

						var html = AP.common.getTemplate( templatePath, prodListData );
						$itemList.find( 'ul' ).html( html );
					}
				}

				if ( this._$target.find( '.sorting_group .total_count' ).length > 0 ) {
					this._$target.find( '.sorting_group .total_count' ).html( '총 (' + $B.string.numberFormat( prodListData.totalCount ) + '개)');
				}

				if ( this._isClearPaging ) {
					this._setPaging( this._param.limit, prodListData.totalCount );
				}

				$itemList.find( '.item:not(.item-apply)' ).each(function ( index, target ) {
					new AP.ProductItem( $(target), prodListData.list[index] );
				}.bind( this ));

			}.bind( this );
		},

		/** =============== Private Methods =============== */
		_setEvent: function () {
			if ( this._$target.find( '.sorting_group' ).length > 0 ) {
				this._setSort();
			}

			// filter
			AP.productFilter.addListener( 'apply-filter-data', function (e) {
				if ( Object.values( e.data ).length > 0 ) {
					var attr = '';
					$.each( e.data , function ( key, value ) {
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
					attr = attr.substr( 0, attr.length - 1 );
					this._param.attr = attr;

				} else {
					this._param.attr = null;
				}

				this._clearPaging();
				this.load();
			}.bind( this ));
		},

		_getSortOption: function () {
			var data = {};

			if ( this._$target.find( '.sorting_group .btn.evt input' ).prop( 'checked' ) ) {
				data.flag = this._$target.find( '.sorting_group .btn.evt input' ).val();
			} else {
				data.flag = null;
			}
			this._$target.find( '.sorting_group .btn.sort input' ).each(function ( index, target ) {
				if ( $( target ).prop( 'checked' ) == true ) {
					data.prodSort = $( target ).val();
				}
			}.bind( this ));
			return data;
		},

		_setSort: function () {
			$.extend( this._param, this._getSortOption() );

			this._$target.find( '.btn.filter' ).on( 'click', function () {
				this._$target.find( '.search_table' ).toggleClass( 'open' );
			}.bind( this ));

			this._$target.find( '.sorting_group' ).on( 'change', '.btn input', function (e) {
				$.extend( this._param, this._getSortOption() );
				this._clearPaging();
				this.load();
			}.bind( this ));
		},

		_setPaging: function ( limit, totalCount ) {
			if ( this._$target.find( '.pagination' ).length < 1 ) return;

			var $pagination = this._$target.find( '.pagination' );
			if ( $pagination.length > 0 && $pagination.attr( 'class' ).indexOf( 'apply' ) < 0  ) {
				$pagination.paging({
					limit: limit,
					totalCount: totalCount,
					focusTarget: this._$target.find( '.sorting_group' )
				});
				this._isClearPaging = false;
			}

			// paging
			$pagination.on( 'paging-change', function (e) {
				this._param.offset = e.offset;
				this.load();
			}.bind( this ));
		},

		_clearPaging: function () {
			if ( this._$target.find( '.pagination' ).length < 1 ) return;

			this._$target.find( '.pagination' ).paging( 'clear' ).off( 'paging-change' );
			this._isClearPaging = true;
			this._param.offset = 0;
		}
	});

	AP.ProductList = ProductList;
})( jQuery );