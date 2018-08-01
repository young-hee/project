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
			this._setVideo();
			this._setBanner();
			this._setSlide();
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
			this._$target.find( '.prd_list_banner' ).on( 'bonding-rect-activate bonding-rect-deactivate', function (e) {
				if ( e.type == 'bonding-rect-activate' ) {
					this._$target.find( '.prd_list_banner' ).ixSlideMax( 'startTimer' );
				} else if ( e.type == 'bonding-rect-deactivate' ) {
					this._$target.find( '.prd_list_banner' ).ixSlideMax( 'stopTimer' );
				}
			}.bind( this )).ixSlideMax().bondingRect();
		},

		_setSlide: function () {
			AP.responsiveWidth.addListener( 'resize', function (e) {
				this._$target.find( '.ix-slide-max-apply' ).ixSlideMax( 'resize' );
			}.bind( this ));
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

				if ( result.list.length == 3 ) {
					this._$target.find( '.recommend_items' ).find( '.slide' ).attr( 'data-ix-options', 'view-length:2; move-length:1;' );
				}

				this._$target.find( '.recommend_items .loading' ).hide();
				var html = AP.common.getTemplate( 'display.products-list.flagged-item', result );
				this._$target.find( '.recommend_items' ).find( 'ul' ).html( html );
				this._$target.find( '.recommend_items' ).find( '.slide' ).ixSlideMax( 'clear' ).ixSlideMax();
				AP.lazyLoad.add( this._$target.find( '.recommend_items img.lazy_load' )).updated();
			}.bind( this );
		}
	});

	AP.display = new Display();
})( jQuery );