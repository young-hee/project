/**
 * 이벤트 : 상세
 */
;(function ( $ ) {
	'use strict';

	var EventsDetail = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container' );
			this._title = this._$target.find('.h_title').text();
			this._$prodListWrarp = this._$target.find( '.generalProdListWrap' );
			this._setPlugins();
		},

		/** =============== Public Methods =============== */

		//페이지를 구성한는 기본 데이타 설정
		setDefaultData: function ( model ) {
			this._defaultModel = model;

			this._setInProductsList();
			this._setCouponDownload();
			this._setComments();
			
			this._setEvents();
		},

		/** =============== Private Methods =============== */

		//video, slide plugin 적용
		_setPlugins: function () {
			this._$target.find( '.event_image .youtube_video' ).video();
			this._$target.find( '.event_image .slide' ).ixSlideMax();

			//slide resize
			AP.responsiveWidth.addListener( 'resize', function (e) {
				this._$target.find( '.event_image .slide' ).ixSlideMax( 'resize' );
			}.bind(this));
		},

		//쿠폰다운로드 설정
		_setCouponDownload: function () {
			//전달된 쿠폰 다운로드 마크업 가이드에 맞춰 "btn_download_coupon"
			this._$target.find( '.event_image .btn_download_coupon' ).on( 'click', function (e) {
				var couponSn = $( e.currentTarget ).data( 'coupon-sn' );

				AP.login().done( function () {
					AP.api.downloadCoupon( null, {
						couponSn: couponSn
					})
					.done( function ( result ) {
						AP.modal.alert( '쿠폰을 다운로드 했습니다.' );
					}.bind(this))
					.fail( function ( xhr ) {
						if ( xhr.errorCode === 'EAPI004' ) {
							AP.login({trigger: true});
						} else if( AP.message[xhr.errorCode] != undefined ){
							AP.modal.alert( AP.message[xhr.errorCode] );
						} else {
							AP.modal.alert( xhr.errorMessage );
						}
					}.bind(this));
				}.bind(this));
			}.bind(this));
		},

		//댓글 설정
		_setComments: function () {
			if ( this._defaultModel.eventType === 'Button'  ) {
				new AP.Comments( this._$target.find('.comment_area'), this._defaultModel.planDisplaySn, this._title );
			}else if( this._defaultModel.eventType === 'Comment' ){
				new AP.SimpleComments( this._$target.find('.comment_area.simpleComment'), this._defaultModel.planDisplaySn, this._title );
			}
		},
		
		//이벤트 핸들러
		_setEvents: function () {
			this._$target.find( '.ui_tab' ).on( 'tabs-change', function (e) {
				var $listWrapObj = $( e.currentTarget ).find( '.tab_contents .tab_cont:visible .generalProdListWrap .result' );
				if( !$listWrapObj.hasClass('dataLoaded') ){
					var planDisplayProdGrpSn = $listWrapObj.data('plan-display-prod-grp-sn');
					var prodGroupList = _.findWhere( this._defaultModel.prodGroupList, {planDisplayProdGrpSn : planDisplayProdGrpSn});
					this._getInProductsList( 0, prodGroupList );
				}
			}.bind(this));
		},

		//관련 상품 목록
		_setInProductsList: function () {
			if( this._defaultModel.prodGroupList != null && this._defaultModel.prodGroupList != undefined && this._defaultModel.prodGroupList.length > 0 ){
				this._getInProductsList( 0, this._defaultModel.prodGroupList[0] );
			}
		},

		//TODO: 제품목록
		_getInProductsList: function ( offset, prodGroup ) {
			var $obj = this._$prodListWrarp.find( '[data-plan-display-prod-grp-sn='+prodGroup.planDisplayProdGrpSn+']' );
			$obj.parent('.generalProdListWrap').siblings('.loading').show();
			AP.api.inPlanDisplayProdGrp( null, {
				planDisplayProdGrpSn : prodGroup.planDisplayProdGrpSn,
				offset: offset,
				limit: 10
			}).done(function ( result ) {
				//draw list
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'display.events.general-detail-product-list', data );
				
				$obj.addClass('dataLoaded').html( html );
				this._$prodListWrarp.siblings('.loading').hide();
				AP.lazyLoad.add( 'img.lazy_load' );

			}.bind(this)).fail(function (e) {
				//
			}.bind(this));
			 
		}

	});


	AP.eventsDetail = new EventsDetail();
})( jQuery );