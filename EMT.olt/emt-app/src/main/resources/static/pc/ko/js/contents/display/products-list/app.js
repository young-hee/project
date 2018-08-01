/**
 * Display
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
 * 										flagged		{Object}	flags				{String}
 */

;(function ( $ ) {
	'use strict';

	var Display = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.prd_list' );

			this._setProductList();
			this._setBanner();
			this._setVideo();
		},

		/** =============== Public Methods =============== */
		init: function ( options ) {
			this._productList.load( options );
			if ( options.flagged ) {
				this._setFlagged( options.flagged );
			}
		},

		/** =============== Private Methods =============== */
		_setProductList: function () {
			this._productList = new AP.ProductList( this._$target );
		},

		_setVideo: function () {
			var $video = this._$target.find( '.youtube_video' );
			if ( $video.length > 0 ) {
				$video.video();
			}
		},

		_setBanner: function () {
			this._$target.find( '.prd_banner.slide' ).ixSlideMax();
		},

		_setFlagged: function ( param ) {
			if ( this._$target.find( '.recommend_items' ).length < 1 ) return;

			AP.api.flaggedItemList( {}, param ).done(function ( result ) {
				done( result );
			}.bind( this )).fail(function (e) {
				console.log( 'error', e );
			}.bind( this )).always(function () {});

			var done = function ( result ) {
				result = result['onlineProdList'];

				this._$target.find( '.recommend_items .loading' ).hide();
				this._$target.find( '.recommend_items' ).find( 'ul' ).html( AP.common.getTemplate( 'display.product-list.flagged-item', result ) );
				if ( this._$target.find( '.recommend_items' ).hasClass( 'popular' ) ) {
					this._$target.find( '.recommend_items.popular' ).find( '.slide' ).ixSlideMax();
				}
				AP.lazyLoad.add( this._$target.find( '.recommend_items img.lazy_load' )).updated();
			}.bind( this );
		},
	});

	AP.display = new Display();
})( jQuery );