/**
 * Header
 * @events  'event-type'
 *  ex) AP.header.addListener( 'event-type', function (e) {});
 */
;(function ( $ ) {
    'use strict';

    var Header = $B.Class.extend({
        initialize: function () {
			this._$target = $( '#header' );
			this._$gnbArea = this._$target.find( '.gnb_area' );
			this._$orderCount = this._$target.find( '.order .num' );
			this._$cartCount = this._$target.find( '.cart .num' );
			this._$orderCount = this._$target.find( '.order .num' );

			this._pScroll = null;

			this._setSearchForm();
			this._setCategory();
			this._setBest();
			this._setHistory();
			this._setFixedArea();
			this.resetCartCount();
			this._setOrderCount();
        },

        /** =============== Public Methods =============== */

		//header의 높이 반환
		getHeight: function () {
			return this._$target.height();
		},

		//장바구니 count 설정
		resetCartCount: function () {
			AP.api.getCartCount().done( function ( result ) {
				if ( result.cartProdCount ) {
					this._$cartCount.text( result.cartProdCount );
					this._$cartCount.show();
				} else {
					this._$cartCount.hide();
				}
			}.bind(this));
		},

		closeCategory: function () {
			var $category = this._$target.find( '.category_wrap' );

			if ( $category.hasClass('open') ) {
				$category.removeClass( 'open' ).slideUp();
			}
		},

		//header, 공통에서 적용되는 header fixed 처리 비활성화 (상품상세에서 별도처리)
		disableFixed: function () {
			if ( this._pScroll ) this._pScroll.disable();
		},

		/**
		 * header fixed 설정
		 * @param {Boolean}		fixed		fixed class를 추가해야될때 true
		 * @param {String}		position	style position 을 줘야 할때 사용
		 * @param {String}		top			style top 을 줘야 할때 사용
		 */
		setFixed: function ( fixed, position, top ) {
			if ( fixed ) {
				this._$target.find( '.shopping_history_wrap' ).hide();
				this._$gnbArea.addClass( 'fixed' );
			} else {
				this._$gnbArea.removeClass( 'fixed' );
			}

			this._$gnbArea.css({
				position: position || '',
				top: top || ''
			});
		},

		closeSearchForm: function () {
			if ( this._searchForm ) this._searchForm.close();
		},

        /** =============== Private Methods =============== */
        // 검색
		_setSearchForm: function () {
			this._searchForm = new AP.SearchForm();
		},

        //카테고리
        _setCategory: function () {
			var $category = this._$target.find( '.category_wrap' ),
				$categoryBtn = this._$target.find( '.btn_category' ),
				$focus = $category.find( '.focus_target' ),
				$closeBtn = $category.find( '.btn_close' ),
				loaded = false;

			$categoryBtn.on( 'click', function (e) {
				if ( $category.hasClass('open') ) {
					this.closeCategory();
					$categoryBtn.focus();
				} else {
					//api
					if ( !loaded ) {
						AP.api.categoryTypeImgList().done( function ( result ) {
							loaded = true;
							var stgYn;
							for ( var key in result.cornersMap ) {
								if(key.indexOf('M02_prod_lines_p.3') > -1){
									stgYn = true;
								}
							}
							for ( var key in result.cornersMap ) {
								var contents = result.cornersMap[key][0].contents;
								var	content = _.findWhere( contents, {menuPageCornerContentsId: key + '.1'} );
								if(key.indexOf('M02_prod_types_p') > -1){
									content = _.findWhere( contents, {menuPageCornerContentsId: key + '.3'} );
								}
								if ( content ) {
									var bgColor = ( content.bgColor ) ? {'background-color' : '#' + content.bgColor} : {};
									
									if(key.indexOf('M02_prod_lines_p') > -1){
										if(stgYn){
											key = key.substring(0, key.indexOf('.')) + "." + (Number(key.substring(key.indexOf('.')+1))-1);
										}
										$category.find( '.banner.' + key.replace('.', '_') ).show().html( '<a href="' + content.linkUrl + (content.newWindowYn === 'Y' ? 'target="_blank"' : '') + '"><img src="' + content.imgUrl + '" alt="' + content.text + '"></a>' ).css( bgColor );
									}else{
										$category.find( '.banner.' + key.replace('.', '_') ).show().html( '<a href="' + content.linkUrl + (content.newWindowYn === 'Y' ? 'target="_blank"' : '') + '"><img src="' + content.imgUrl + '" alt="' + content.text + '"></a>' ).css( bgColor );
									}
								}
							}
						});
					}

					$category.addClass( 'open' ).slideDown();
					$focus.focus();
				}
			}.bind(this));

			$closeBtn.on( 'click', function (e) {
				$categoryBtn.triggerHandler( 'click' );
			});

			$closeBtn.on( 'focusout', function (e) {
				$category.removeClass( 'open' ).slideUp();
				$categoryBtn.focus();
			});

			//depth1
			$category.find( 'dt > button' ).on( 'focusin mouseover', function (e) {
				$( e.currentTarget ).parent().addClass( 'on' ).siblings( 'dt' ).removeClass( 'on' );
			});

			//depth2
			$category.find( 'dd > ul > li > a' ).on( 'focusin mouseover', function (e) {
				$( e.currentTarget ).addClass( 'on' ).parent().siblings( 'li' ).find( 'a' ).removeClass( 'on' );
			});
        },

		//주간베스트
		_setBest: function () {
			var $weekly = this._$target.find( '.weekly_best' );
			if ( !$weekly.length ) return;

			AP.api.flaggedProdRankChanges().done(function ( result ) {
				var html = AP.common.getTemplate( 'header.weekly-best-list', result );
				$weekly.find( '.slide' ).html( html ).ixSlideMax();
			});
		},

		//히스토리
		_setHistory: function () {
        	var $history = this._$target.find( '.shopping_history_wrap' ),
        		$result = this._$target.find( '.shopping_history' ),
				$allDelBtn = $history.find( '.btn_delete' ),
				dataLoaded = false;

			//전체삭제
			$allDelBtn.on( 'click', function (e) {
				AP.api.deleteShoppingHistory().done(function ( result ) {
					var html = AP.common.getTemplate( 'header.history-list' );
					$result.html( html );
					$allDelBtn.remove();
				});
			}.bind(this));

			$history.find( '.btn_close' ).on( 'click', function (e) {
				$history.hide();
			}.bind(this));

			this._$target.find( '.history' ).on( 'click', function (e) {
				e.preventDefault();
				$history.toggle();

				if ( $history.is(':visible') ) {
					if ( AP.LOGIN_USER ) {
						if ( dataLoaded ) {
							$history.find( '.slide' ).ixSlideMax( 'resize' );
						} else {
							AP.api.shoppingHistoryList().done(function ( result ) {
								var totalCount = 0;
								_.each( result.shoppingHistoryList, function ( group ) {
									_.each( group.shoppingHistoryList, function ( list ) {
										 
										if(list.shoppingMarkTgtCode === 'Article'){
											AP.api.article(null,{
												articleSn : list.articleSn
											}).done(function(result){
												list.prodImg = result.article.bannerImgP1; 
											}).fail(function (e) {
												//
											}.bind(this));
									
										}
										totalCount++;
									});
								});
						
								var html = AP.common.getTemplate( 'header.history-list', {
									shoppingHistoryList: result.shoppingHistoryList,
									totalCount: totalCount
								});
							 
								$result.html( html );
								$history.find( '.slide' ).ixSlideMax();

								if ( totalCount ) {
									$allDelBtn.show();
								}
							});

							dataLoaded = true;
						}
					}
				}
			}.bind(this));
		},

		//header fixed 처리 (상품상세에서는 별도제어)
		_setFixedArea: function () {
        	if ( !this._$gnbArea.length ) return;

			this._pScroll = new $B.event.ParallaxScroll( this._getPositions() )
					.addListener( 'activate', function (e) {
						this.setFixed( true );
					}.bind(this))
					.addListener( 'deactivate', function (e) {
						this.setFixed( false );
					}.bind(this)).trigger();

			$( window ).on( 'load', function (e) {
				this._pScroll.update( this._getPositions() );
			}.bind(this));
		},

		_getPositions: function () {
			return [{
				min: this.getHeight() - this._$target.find( '.gnb_area' ).height(),
				max: 99999999
			}];
		},

		//주문/배송조회 count 설정
		_setOrderCount: function () {
			if ( AP.LOGIN_USER ) {
				AP.api.getOrderCount().done( function ( result ) {
					if ( result.ordShippngCnt ) {
						this._$orderCount.text( result.ordShippngCnt );
						this._$orderCount.show();
					}
				}.bind(this));
			}
		}
    });


    AP.header = new Header();
})( jQuery );