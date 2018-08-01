/**
 * 이벤트 : 상세
 */
;(function ( $ ) {
	'use strict';

	var EventsDetail = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container' );
			this._orderLayer = null;
			this._setPlugins();
		},

		/** =============== Public Methods =============== */

		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( model ) {
			this._defaultModel = model;

			this._getInProductsData();
			this._setCouponDownload();
			this._setComments();
			
			this._setEvents();
		},

		/** =============== Private Methods =============== */

		//video, slide plugin 적용
		_setPlugins: function () {
			this._$target.find( '.event_image .youtube_video' ).video();
			this._$target.find( '.event_image .slide' ).ixSlideMax();
		},

		//쿠폰다운로드 설정
		_setCouponDownload: function () {
			//전달된 쿠폰 다운로드 마크업 가이드에 맞춰 "btn_download_coupon"
			this._$target.find( '.event_image .btn_download_coupon' ).on( 'click', function (e) {
				var couponSn = $( e.currentTarget ).data( 'coupon-sn' );

				AP.api.downloadCoupon( null, {
						couponSn: couponSn
					})
					.done( function ( result ) {
						AP.modal.alert( '쿠폰을 다운로드 했습니다.' );
					}.bind(this))
					.fail( function ( xhr ) {
						AP.modal.alert( xhr.errorMessage );
					}.bind(this));
			}.bind(this));
		},

		//댓글 설정
		_setComments: function () {
			if ( this._defaultModel.participantYn === 'Y' && this._defaultModel.eventType === 'Comment' ) {
				new AP.Comments( this._$target.find('.comment_area'), this._defaultModel.planDisplaySn );
			}
		},

		//관련 상품 목록
		_getInProductsData: function () {
			//동시 구매 기획전일 경우
			if( this._defaultModel.planDisplayTypeCode == "SameTimePur"){
				var promoList = null;
				if( this._defaultModel.promoList != null && this._defaultModel.promoList.length > 0 ){
					promoList = this._defaultModel.promoList;
					for (var i = 0; i < promoList.length; i++) {
						var promoGrpList = promoList[i]['promoGrpList'];
						var limit = 100;
						if( promoGrpList.length == 1 ){
							limit = 20;
						}
						for (var j = 0; j < promoGrpList.length; j++) {
							var promotion = promoGrpList[j];
							this._loadData( promotion.sameTimePurProdGrpSn, limit, promoGrpList.length );
						}
					}
				}
				if( this._orderLayer == null ){
					this._orderLayer = new AP.SameTimeOrder( this._$target.find('.order_layer') );
					this._orderLayer.setDefaultData( promoList );
					this._orderLayer.drawPromotionGrp();
					this._orderLayer.resetPosition();
					this._orderLayer.resizeHeight(promoList[0]['promoSn']);
				}
			}
		},
		_loadData : function ( sameTimePurProdGrpSn, limit, promoGrpLen, offset) {
			offset = offset == undefined ? 0 : offset;
			AP.api.getInSameTimePurProdGrp( null, {
				sameTimePurProdGrpSn : sameTimePurProdGrpSn,
				offset : offset,
				limit : limit
			}).done(function ( result ) {
				this._drawProdItem( result, sameTimePurProdGrpSn, limit, promoGrpLen );
			}.bind(this)).fail(function (e) {
				//
			}.bind(this));
		},
		
		// 상품을 화면에 렌더링
		_drawProdItem : function ( data, sn, limit, promoGrpLen ) {
			var list = data.onlineProdList;
			var $itemArea = this._$target.find('[data-promo-grp-sn='+sn+']');
			
			$itemArea.find( '.ui_select' ).designSelectBox( 'clear' );
			$itemArea.find( '.btn_order' ).off( 'click' );
			
			//draw list
			var html = AP.common.getTemplate( 'display.events.detail-product-list', list );

			$itemArea.siblings('.loading').remove();
			$itemArea.html( html );
			$itemArea.find( '.ui_select' ).designSelectBox();
			AP.lazyLoad.add( 'img.lazy_load' );
			
			// 단일그룹 프로모션일 경우 페이징 처리
			if( promoGrpLen == 1 ){
				if ( list.limit < list.totalCount ) {
					$itemArea.siblings( '.pagination' ).paging({
						offset: list.offset,
						limit: list.limit,
						totalCount: list.totalCount
					}).paging( 'enable' ).off( 'paging-change' ).on( 'paging-change', function (e) {
						this._loadData( sn, limit, 0, e.offset );
					}.bind(this));
					$itemArea.siblings( '.pagination' ).show();
				}
			}
			
			//click evnet
			$itemArea.find( '.btn_order' ).on( 'click', function (e) {
				var $current = $( e.currentTarget );
				var onlineProdSn = $current.data( 'online-prod-sn' ),
					$selectBox = $current.parent().find('.ui_select' )
					,promoSn = $current.parents('div.tab_cont').data('promo-sn')
					,promoGrpSn = $current.parents('div.column4').data('promo-grp-sn')
					,prodSn = $current.parents('div.online_prod').data('online-prod-sn');

				var param = {
						 promoSn : promoSn
						,promoGrpSn : promoGrpSn
						,prodSn : parseFloat(prodSn)
						,onlineProdSn : onlineProdSn
						,obj : list.list
						,currentObj : null
					};
				
				if ( $selectBox.length ) {
					var prodSn = $selectBox.designSelectBox( 'getValue' );
					var currentObj = {};
					$.each(list.list, function(idx, obj){
						if(obj.productsStp.length > 0){
							for(var i = 0; i < obj.productsStp.length; i++){
								if(obj.productsStp[i].prodSn == prodSn){
									currentObj = obj.productsStp[i];
								}
							}
						}
					});
					
					param.currentObj = currentObj;

					if ( prodSn ) {
						this._orderLayer.setOnlineProd( param, this._defaultModel );
					} else {
						AP.modal.alert( AP.message.NONE_SELECTED_OPTION );
					}
				} else {
					param.currentObj = param.obj[0]['productsStp'][0];
					this._orderLayer.setOnlineProd( param );
				}
			}.bind(this));
		},
		
		//TODO: 제품 목록
		_getInProductsList: function ( offset ) {
			/*
			//TODO: 해당 api로 변경
			AP.api.articleRelated( null, {
				offset: offset,
				limit: 9
			}).done(function ( result ) {
				$itemArea.find( '.btn_order' ).off( 'click' );

				//draw list
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'display.detail-product-list', data );

				//$itemArea.find( '.item_list .result' ).append( html );
				AP.lazyLoad.add( 'img.lazy_load' );
				orderLayer.setDefaultData( data );

				//click evnet
				$itemArea.find( '.btn_order' ).on( 'click', function (e) {
					var onlineProdSn = $( e.currentTarget ).data( 'online-prod-sn' );
					orderLayer.setOnlineProd( onlineProdSn );
				}.bind(this));
			}.bind(this)).fail(function (e) {
				//
			}.bind(this));
			*/
		},
		
		//이벤트 등록
		_setEvents : function(){
			//프로모션 탭 변경
			this._$target.find( '.ui_tab' ).on( 'tabs-change', function (e) {
				this._orderLayer.tabsChange( e.index );
				this._orderLayer.resetPosition();
			}.bind(this));
		}

	});


	AP.sameTimeEventsDetail = new EventsDetail();
})( jQuery );