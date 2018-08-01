/**
 * 동적 paging 처리
 * @type    jQuery Plugin
 * 주소찾기 전용
 *
 */
;(function( $, plugin ){
	'use strict';

	$.fn.extend({
		/**
		 * 페이징 그리기 및 이벤트 관리
		 * Events : paging-change   ex) $( append target ).on( 'paging-change', function (e) { e.page })
		 * option : currentPage=현재페이지, totalPage=전체페이지, pagingLength=한화면에 보여지는 페이징 갯수(default:10), focusTarget=페이징 클릭후 화면에서 이동할 타켓
		 * @param   {String}  method    ex) $( append target ).paging({currentPage:1, totalPage:20});
		 *              "clear"         적용해제
		 *              "disable"       비활성화
		 *              "enable"        활성화
		 * @returns {jQuery}
		 */
		pagingAddress: function ( method, value ) {
			var pluginName = 'paging';

			if ( typeof method === 'string' ) {
				return plugin.callMethod( this, pluginName, method, value );
			} else {
				this.each( _.bind(function ( idx, el ) {
					var $el = $( el );
					if ( !plugin.has($el, pluginName) ) {
						plugin.add( $el, pluginName, new Paging($el, pluginName, method) );
					}
				}, this));
			}

			return this;
		}
	});


	var Paging = function ( $target, pluginName, options ) {
		var _$target = $target,
			_$warp;

		var _pluginName = pluginName,
			_options = ( options && $B.isObject(options) )? $B.object.clone( options ) : {},
			_currentPage = _options.currentPage || 1,
			_totalPage = _options.totalPage || 1,
			_$focusTarget = $( _options.focusTarget || '' ),
			_pagingLength;


		/* ==================== Public Methods ==================== */
		this.clear = function () {
			remove();
			plugin.remove( _$target, _pluginName );
		};

		/**
		 * 비활성화
		 */
		this.disable = function () {
			setBtnState( true );
		};

		/**
		 * 비활성화 전 상태로 활성화
		 */
		this.enable = function () {
			setBtnState();
		};

		/* ==================== Initialize ==================== */
		initialize();

		/* ==================== Protected Methods ==================== */

		function initialize () {
			_pagingLength = _options.pagingLength || 10;
			_currentPage = parseInt( _currentPage );
			_totalPage = parseInt( _totalPage );

			remove();
			draw();
			setBtnState();

			if ( _totalPage < 2 ) {
				_$target.addClass( 'no_paging' );
			}
		}

		function draw () {
			var html = AP.common.getTemplate( 'common.paging', getTemplateData() );
			_$warp = $( html );
			_$target.html( _$warp );

			_$target.find( '>button, >a' ).on( 'click', clickHandler );
		}

		function clickHandler (e) {
			e.preventDefault();

			var $btn = $( e.currentTarget ),
				page = $btn.data( 'page' );

			if ( !$btn.hasClass('disabled') ) {
				_currentPage = page;
				remove();
				draw();
				setBtnState();
				goToFocus();

				_$target.triggerHandler({
					type: 'paging-change',
					page: page
				});
			}
		}

		function remove () {
			if ( _$warp ) {
				_$target.find( '>button, >a' ).off( 'click', clickHandler );
				_$warp.remove();
				_$target.removeClass( 'no_paging' );
			}
		}

		function setBtnState ( disable ) {
			if ( disable ) {
				_$target.find( '>button, >a' ).addClass( 'disabled' ).attr( 'disabled', true );
			} else {
				_$target.find( '>button, >a' ).removeClass( 'disabled' ).attr( 'disabled', false );

				var $prev = _$target.find( '.prev' ),
					$next = _$target.find( '.next' ),
					$first = _$target.find( '.first' ),
					$last = _$target.find( '.last' ),
					currentGroup = Math.ceil( _currentPage / _pagingLength ),
					lastGroup = Math.ceil( _totalPage / _pagingLength );

				//prev
				if ( _currentPage < 2 ) {
					$prev.addClass( 'disabled' ).attr( 'disabled', true );
				} else {
					$prev.removeClass( 'disabled' ).attr( 'disabled', false );
				}

				//next
				if ( _currentPage >= _totalPage ) {
					$next.addClass( 'disabled' ).attr( 'disabled', true );
				} else {
					$next.removeClass( 'disabled' ).attr( 'disabled', false );
				}

				//first
				if ( currentGroup < 2 ) {
					$first.addClass( 'disabled' ).attr( 'disabled', true );
				} else {
					$first.removeClass( 'disabled' ).attr( 'disabled', false );
				}

				//last
				if ( currentGroup >= lastGroup ) {
					$last.addClass( 'disabled' ).attr( 'disabled', true );
				} else {
					$last.removeClass( 'disabled' ).attr( 'disabled', false );
				}
			}
		}

		function goToFocus () {
			if ( _$focusTarget.length ) {
				$( window ).scrollTop( _$focusTarget.offset().top );
			}
		}

		function getTemplateData () {
			var currentGroup = Math.ceil( _currentPage / _pagingLength ),
				result = {
					prevPage: correctPage( _currentPage - 1 ),
					nextPage: correctPage( _currentPage + 1 ),
					firstPage: correctPage( (currentGroup - 1) * _pagingLength - _pagingLength + 1 ),
					lastPage: correctPage( currentGroup * _pagingLength + 1 ),
					list: []
				};

			for ( var i = 1; i <= _pagingLength; ++i ) {
				var page = ( currentGroup - 1 ) * _pagingLength + i;

				result.list.push({
					current: ( _currentPage == page ),
					page: page
				});

				if ( page >= _totalPage ) break;
			}

			return result;
		}

		function correctPage ( page ) {
			if ( page < 1 ) {
				page = 1;
			} else if ( page > _totalPage ) {
				page = _totalPage;
			}

			return page;
		}
	};

})( jQuery, AP.plugin );