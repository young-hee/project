/**
 * 매장칭찬
 *
 */

;(function ( $ ) {
	'use strict';

	var StoreComplimentList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.store_compliment_list' );

			this.memberInfo = {};

			this.IMAGE_VIEW_LENGTH = 4;

			this._pagination = null;
			this._param = {
				keyword: '',
				offset: 0,
				limit: 5,
				searchTypeCode: 'StoreName',
				regularStoreYn: 'N',	// 단골매장만 가져올지 여부 Y/N
				topStoreEvalYn: 'N'		// 매장 추천 베스트 보기 Y/N
			};

			if ( this._$target.length > 0 ) {
				this._setEvent();
			}
		},

		/** =============== Public Methods =============== */
		getMemberInfo: function ( id, name ) {
			this.memberInfo.id = id;
			this.memberInfo.name = name;
		},

		load: function ( param ) {
			param = param || this._param;

			if( param.offset == 0 ) {
				this._$target.find( '.result_none' ).hide();
				this._$target.find( '.find_store_praise .review' ).remove();
				this._$target.find( '.loading' ).show();
			}

			setTimeout(function () {
				AP.api.storeEvalsList( {}, param ).done(function ( result ) {
					var result = result['storeEvalsResult'];

					for ( var i = 0; i < result['storeEvalExList'].length; ++i ) {
						// 첨부 사진
						result['storeEvalExList'][i].imageViewLength = this.IMAGE_VIEW_LENGTH;

						// 칭찬 이유
						if ( result['storeEvalExList'][i].storeEvalReason ) {
							result['storeEvalExList'][i].storeEvalReason = result['storeEvalExList'][i].storeEvalReason.split(',');
						}
					}

					if ( !this._pagination ) {
						this._setPaging( result.limit, result.totalCount );
					}

					this._$target.find( '.loading' ).hide();
					if ( result.totalCount == 0 ) {
						this._clearPaging();
						this._$target.find( '.result_none' ).show();
						this._$target.find( '.find_store_praise' ).hide();
					} else {
						this._$target.find( '.result_none' ).hide();
						this._$target.find( '.find_store_praise' ).show();
					}

					var html = AP.common.getTemplate( 'display.store.store-compliment-list', result );
					this._$target.find( '.find_store_praise' ).html( html );
					
					//html 태그 삭제
					for ( var i = 0; i < result['storeEvalExList'].length; ++i ) {
						var bodyText = result['storeEvalExList'][i].storeEvalBodyText;
						var storeSn = result['storeEvalExList'][i].storeEvalSn;
						document.getElementById('bodyText'+storeSn).innerHTML = bodyText;
					}
				}.bind( this )).fail(function (e) {
					console.log( 'error' );
				}.bind( this )).always(function (e) {});
			}.bind( this ), 1000);
		},

		/** =============== Private Methods =============== */
		_setEvent: function () {
			// 검색
			this._$target.find( '.praise_text_search_wrap .btn_search' ).on( 'click', function (e) {
				e.preventDefault();

				this._param.keyword = $.trim( $( e.target ).siblings( 'input' ).val() )
				this._clearPaging();
				this.load( this._param );
			}.bind( this ));

			// 전체 / 매장 추천 베스트 보기
			this._$target.find( '.praise_sort_wrap button' ).on( 'click', function (e) {
				if ( $( e.target ).hasClass( 'on' )) {
					return;
				}

				$( e.target ).siblings( 'button' ).removeClass( 'on' );
				$( e.target ).addClass( 'on' );
				if ( $( e.target ).hasClass( 'best' )) {
					this._param.topStoreEvalYn = 'Y';
				} else {
					this._param.topStoreEvalYn = 'N';
				}

				this._clearPaging();
				this.load( this._param );
			}.bind( this ));

			// 상세보기
			this._$target.on( 'click', '.find_store_praise .review a', function (e) {
				e.preventDefault();

				var storeEvalSn = $( e.target ).data( 'storeEvalSn' );
				AP.storeComplimentDetail.open( storeEvalSn );
			}.bind( this ));
		},

		_setPaging: function ( limit, totalCount ) {
			var $pagination = this._$target.find( '.pagination' );
			this._pagination = $pagination.paging({
				limit: limit,
				totalCount: totalCount,
				focusTarget: this._$target.find( '.praise_text_search_wrap' )
			});

			$pagination.on( 'paging-change', function (e) {
				this._param.offset = e.offset;
				this.load( this._param );
			}.bind( this ));
		},

		_clearPaging: function () {
			var $pagination = this._$target.find( '.pagination' );
			$pagination.paging( 'clear' ).off( 'paging-change' );
			this._param.offset = 0;
			this._pagination = null;
		}
	});

	AP.storeComplimentList = new StoreComplimentList();
})( jQuery );