/**
 * Filter
 *
 */

;(function ( $ ) {
		'use strict';

	var SearchFilter = $B.Class.extend({
		initialize: function ( data ) {
			this._$modal = null;
			this._filterData = data;

			for ( var i = 0; i < this._filterData.addAttrs.length; ++i ) {
				for ( var j = 0; j < this._filterData.addAttrs[i].addAttrVals.length; ++j ) {
					this._filterData.addAttrs[i].addAttrVals[j].selected = false;
				}
			}
		},

		/** =============== Public Methods =============== */
		open: function () {
			this._modal = AP.modal.full({
				title: '검색필터',
				contents: {
					templateKey: 'display.product-list.search-filter',
					templateModel: this._filterData
				},
				containerClass: 'filter_layer',
				fixed: true
			}).addListener( 'modal-before-close', function (e) {
				this._clear();
			}.bind( this )).addListener( 'modal-close', function (e) {
				this._modal = null;
			}.bind( this ));

			this._$modal = this._modal.getElement();
			this._$modal.find( '.ui_accordion' ).accordion();

			this._setEvent();
			this._setPrice();
		},

		delete: function () {

		},

		/** =============== Private Methods ============== */
		_clear: function () {
			this._$modal.find( '.ui_accordion' ).accordion( 'clear' );
		},

		_reset: function () {
			this._$modal.find( '.ui_accordion dt' ).addClass( 'on' );
			this._$modal.find( '.ui_accordion' ).accordion( 'clear' ).accordion();
			this._$modal.find( '.btn' ).removeClass( 'on' );
			this._$modal.find( 'input' ).val( '' );
		},

		_apply: function () {
			console.log( 'apply' );
		},

		_setEvent: function () {
			this._$modal.on( 'click', '.btn_wrap a', function (e) {
				var $btn = $( e.currentTarget );
				if ( $btn.hasClass( 'reset' )) {
					this._reset();
				} else if ( $btn.hasClass( 'apply' )) {
					this._apply();
				}
				e.preventDefault();
			}.bind( this ));

			this._$modal.on( 'click', '.btn', function (e) {
				if ( !$( e.currentTarget ).closest( '.price' ).length ) {
					$( e.currentTarget ).toggleClass( 'on' );
				}
				e.preventDefault();
			}.bind( this ));
		},

		_setPrice: function () {
			this._$modal.find( '.price li a' ).on( 'click', function (e) {
				var $price = this._$modal.find( '.price' ),
					$btn = $( e.currentTarget );

				$price.find( 'input' ).val( '' );
				$price.find( '.btn' ).removeClass( 'on' );
				$btn.addClass( 'on' );
				this._$modal.find( '.price .min' ).val( $btn.data( 'min' ));
				this._$modal.find( '.price .max' ).val( $btn.data( 'max' ));

				this._$modal.find( '.price .min' ).attr( 'value', $btn.data( 'min' ));
				this._$modal.find( '.price .max' ).attr( 'value', $btn.data( 'max' ));

				e.preventDefault();
			}.bind( this ));

			this._$modal.find( '.price' ).find( 'input' ).on( 'focusin focusout', function (e) {
				var $input =  $( e.currentTarget );
				switch( e.type ) {
					case 'focusin':
						if ( $input.val() ) {
							$input.val( $input.val().replace( /,/g, '' ));
						}
						break;
					case 'focusout':
						if ( $input.valid() ) {
							$input.attr( 'value', $B.string.numberFormat( $input.val() ) );
							$input.val( $B.string.numberFormat( $input.val() ));
						} else {
							AP.modal.alert( $input.data( 'msg' ));
							return;
						}
						var min = parseInt( this._$modal.find( '.price' ).find( '.min' ).val().replace( /,/g, '' ) ),
							max = parseInt( this._$modal.find( '.price' ).find( '.max' ).val().replace( /,/g, '' ) );
						if ( min != '' && max != '' ) {
							if ( max < min ) {
								AP.modal.alert( '최대금액이 최소금액보다 작습니다.' );
								return;
							}
						}
						if ( min || max ) {
							this._$modal.find( '.price .btn' ).removeClass( 'on' );
						}
						if ( !min && max ) {
							this._$modal.find( '.price' ).find( 'input.min' ).val(0);
						}
						break;
				}
			}.bind( this ));
		}
	});

	AP.searchFilter = SearchFilter;
})( jQuery );