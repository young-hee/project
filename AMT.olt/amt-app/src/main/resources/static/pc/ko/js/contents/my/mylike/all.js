/**
 * MyLikeAll
 *
 */

;(function ( $ ) {
	'use strict';

	var MyLikeAll = $B.Class.extend({
		initialize: function (options) {
			this._$target = options.$target;
			//this._component = options.component;
			this._template = options.template;
			//this._displayMenuId = options.displayMenuId;
			this._api = options.api;
			this._key = ( options.key ) ? { displayMenuId: options.key } : {};

			this._$title = this._$target.find( '.check_set' );
			this._$list = ( options.$targetList ) ? options.$targetList: this._$target.find( '.list_all > ul' );
			this._$paging = this._$target.find( '.pagination' );
			this._$loading = this._$target.find( '.loading' );

			this._isLoading = true;
			this._isClearPaging = false;

			this._data = [];
			this._param = {
				offset: 0,
				limit: 9
			};

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		load: function ( params ) {
			if ( params ) {
				$.extend( this._param, params );
			}
			AP.api[this._api]( this._key, this._param ).done(function ( result ) {
				this._done( result );
			}.bind( this )).fail(function( error ) {
				console.log( error.statusText + ' : ' + error.errorCode + error.errorMessage );
				this.loadingStop();
			}.bind( this ));

			return this;
		},

		loadingStart: function () {
			this._isClearPaging = true;
			this._isLoading = true;
			this._$loading.show();
			this._$list.empty();
		},

		loadingStop: function () {
			this._isLoading = false;
			this._$loading.hide();
		},

		/** =============== Private Methods ============== */
		_done: function( result ) {
			//set data
			if ( result.onlineProdList ) {
				result = result.onlineProdList;
			} else if ( result.prodReviewListInfo ) {
				result = result.prodReviewListInfo;
			}
			
			/* ================================================================== */
			//TODO: API 연결후 제거
			//test - dummy
			/*
			result = {
					list: [
						{planDisplaySn:1,bannerImgP1:'/pc/ko/images/dummy/IMG1526diQ608566992.jpg',planDisplayTitle:'test1'},
						{planDisplaySn:2,bannerImgP1:'/pc/ko/images/dummy/IMG1526diQ608566992.jpg',planDisplayTitle:'test2'},
						{planDisplaySn:3,bannerImgP1:'/pc/ko/images/dummy/IMG1526diQ608566992.jpg',planDisplayTitle:'test3'},
						
						{planDisplaySn:4,bannerImgP1:'/pc/ko/images/dummy/IMG1526diQ608566992.jpg',planDisplayTitle:'test4'},
						{planDisplaySn:5,bannerImgP1:'/pc/ko/images/dummy/IMG1526diQ608566992.jpg',planDisplayTitle:'test5'},
						{planDisplaySn:6,bannerImgP1:'/pc/ko/images/dummy/IMG1526diQ608566992.jpg',planDisplayTitle:'test6'},
						
						{planDisplaySn:7,bannerImgP1:'/pc/ko/images/dummy/IMG1526diQ608566992.jpg',planDisplayTitle:'test7'},
						{planDisplaySn:8,bannerImgP1:'/pc/ko/images/dummy/IMG1526diQ608566992.jpg',planDisplayTitle:'test8'},
						{planDisplaySn:9,bannerImgP1:'/pc/ko/images/dummy/IMG1526diQ608566992.jpg',planDisplayTitle:'test9'}
						]
				};
			*/
			result = {
					list: [
						{
							isToday: true,
							date: '05.29 WED',
							items: [
								{sn:'9',time:'12:39',title:'999',price:'33,333원',img:'/images/dummy/prd_img.jpg'},
								{sn:'8',time:'12:38',title:'888',price:'33,333원',img:'/images/dummy/prd_img.jpg'},
								{sn:'7',time:'12:37',title:'777',price:'33,333원',img:'/images/dummy/prd_img.jpg'}
							]
						},
						{
							isToday: false,
							date: '05.28 THU',
							items: [
								{sn:'6',time:'12:36',title:'666',price:'66,666,666원',img:'/images/dummy/prd_img.jpg'},
								{sn:'5',time:'12:35',title:'555',price:'5,555,555원',img:'/images/dummy/prd_img.jpg'},
								{sn:'4',time:'12:34',title:'444',price:'444,444원',img:'/images/dummy/prd_img.jpg'}
							]
						},
						{
							isToday: false,
							date: '05.27 MON',
							items: [
								{sn:'3',time:'12:33',title:'333',price:'33,333원',img:'/images/dummy/prd_img.jpg'},
								{sn:'2',time:'12:32',title:'222',price:'2,222원',img:'/images/dummy/prd_img.jpg'},
								{sn:'1',time:'12:31',title:'111',price:'111원',img:'/images/dummy/prd_img.jpg'}
							]
						}
					]
			};
			result.totalCount = 20;
			/* ================================================================== */
			
			//set loading
			if( this._isLoading ) {
				this.loadingStop();
			}

			if ( result.totalCount == 0 ) {
				//this._$title.find( '#total' ).text( '0' );
			} else {
				this._data = result.list;

				var html = AP.common.getTemplate( this._template, result );
				//this._$list.html( html );
				this._$list.html( html );
				
				//this._$title.find( '#total' ).text( result.list.length );
				//this._$paging.show();
//				if ( this._isClearPaging ) {
//					this._clearPaging();
//				}
//				this._setPaging( this._param.limit, result.totalCount );

				this._$list.find( '.item' ).each(function ( index, target ) {
//					new AP.ProductItem({
//						$target: $( target ),
//						data: this._data[index],
//						displayMenuId: this._displayMenuId
//					});
				}.bind( this ));
				
			}
		},
		
		_setEvent: function () {
		}
	});

	AP.MyLikeAll = MyLikeAll;
})( jQuery );