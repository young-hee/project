/**
 * 이벤트 : 상세
 */
;(function ( $ ) {
	'use strict';

	var EventsDetail = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container' );
			//this._title = this._$target.find('.h_title').text();
			//this._$participateBtn = this._$target.find( '#btn_regist' );
			//this._$updateBtn = this._$target.find( '#btn_update' );
			this._$deleteBtn = this._$target.find( '#btn_delete' );
			this._pagination = {};
			
			this._$prodListWrap = this._$target.find( '.list_product' );
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
			//this._$target.find( '.event_image .youtube_video' ).video();
			//this._$target.find( '.event_image .slide' ).ixSlideMax();
			this._$target.find('.comment_box .before').find( '.textarea' ).on( 'click', function (e) {				
				var textarea = $( e.currentTarget ).find('textarea');
				console.log(textarea.attr('readonly'));
				if(textarea.attr('readonly') != 'undefined'){
					AP.login().done( function () {
						textarea.attr('readonly', false)
					}.bind(this));
				}
			}.bind(this));
			
			//참여하기
//			this._$participateBtn.on( 'click', function (e) {
//				AP.login().done( function () {
//					$('#reg_form').submit();
//				}.bind(this));
//			}.bind(this));
			
//			this._$updateBtn.on( 'click', function (e) {
//				AP.login().done( function () {
//					$('form.modify').submit();
//				}.bind(this));
//			}.bind(this));
			
			//this._$target.find( '.add_file' ).inputImages('clear'); 
			//this._$target.find( '.add_file' ).inputImages();
			
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
//			console.log(this._defaultModel.eventType);
//			if ( this._defaultModel.eventType === 'Button' ) {
//				new AP.Comments( this._$target.find('.comment_box'), this._defaultModel.planDisplaySn, this._title );
//			}else if( this._defaultModel.eventType === 'Comment' ){
//				new AP.SimpleComments( this._$target.find('.comment_box'), this._defaultModel.planDisplaySn, this._title );
//			}
			new AP.Comments( this._$target.find('.comment_box'), this._defaultModel.planDisplaySn, this._title );
		},
		
		//이벤트 핸들러
		_setEvents: function () {
			var modelData = this._defaultModel;
			$.each(this._$prodListWrap, function(idx, el){
				var $listWrapObj = $(this).find( 'ul' );
				console.log($listWrapObj.hasClass('dataLoaded'));
				if( !$listWrapObj.hasClass('dataLoaded') ){
					var planDisplayProdGrpSn = $listWrapObj.data('plan-display-prod-grp-sn');
					console.log("planDisplayProdGrpSn : " + planDisplayProdGrpSn);
					var prodGroupList = _.findWhere( modelData.prodGroupList, {planDisplayProdGrpSn : planDisplayProdGrpSn});

					//$(this).siblings('.loading').show();
					AP.api.inPlanDisplayProdGrp( null, {
						planDisplayProdGrpSn : planDisplayProdGrpSn,
						offset: 0,
						limit: 10
					}).done(function ( result ) {
						//draw list
						
						var data = result.onlineProdList,
							html = AP.common.getTemplate( 'display.events.detail-product-list', data );
						//console.log($listWrapObj.data('plan-display-prod-grp-sn'));
						$listWrapObj.addClass('dataLoaded').html( html );
						//$(this).siblings('.loading').hide();
						//AP.lazyLoad.add( 'img.lazy_load' );

					}.bind(this)).fail(function (e) {
						//
					}.bind(this));
				}
			});
//			this._$target.find( '.ui_tab' ).on( 'tabs-change', function (e) {
//				var $listWrapObj = $( e.currentTarget ).find( '.tab_contents .tab_cont:visible .generalProdListWrap .result' );
//				if( !$listWrapObj.hasClass('dataLoaded') ){
//					var planDisplayProdGrpSn = $listWrapObj.data('plan-display-prod-grp-sn');
//					var prodGroupList = _.findWhere( this._defaultModel.prodGroupList, {planDisplayProdGrpSn : planDisplayProdGrpSn});
//					this._getInProductsList( 0, prodGroupList );
//				}
//			}.bind(this));
			

		},

		//관련 상품 목록
		_setInProductsList: function () {
			if( this._defaultModel.prodGroupList != null && this._defaultModel.prodGroupList != undefined && this._defaultModel.prodGroupList.length > 0 ){
				this._getInProductsList( 0, this._defaultModel.prodGroupList[0] );
			}
		},
		
		_setPaging: function ( limit, totalCount, prodGroup ) {
			
			var $ul = $('.result[data-plan-display-prod-grp-sn='+prodGroup.planDisplayProdGrpSn+']')
			var $pagination = $ul.parent('.generalProdListWrap').siblings( '.pagination' );
			this._pagination[prodGroup.planDisplayProdGrpSn] = $pagination.paging({
				limit: limit,
				totalCount: totalCount,
				focusTarget: this._$target.find( '.tab_menu' )
			});

			$pagination.on( 'paging-change', function (e) {
				this._getInProductsList( e.offset, prodGroup );
			}.bind( this ));
			
		},

		//TODO: 제품 목록
		_getInProductsList: function ( offset, prodGroup ) {
			var $obj = this._$prodListWrap.find( '[data-plan-display-prod-grp-sn='+prodGroup.planDisplayProdGrpSn+']' );
			$obj.parent('.generalProdListWrap').siblings('.loading').show();
			//TODO: 해당 api로 변경
			AP.api.inPlanDisplayProdGrp( null, {
				planDisplayProdGrpSn : prodGroup.planDisplayProdGrpSn,
				offset: offset,
				limit: 8
			}).done(function ( result ) {
				//draw list
				var data = result.onlineProdList,
					html = AP.common.getTemplate( 'display.events.detail-product-list', data );
				
				$obj.addClass('dataLoaded').html( html );
				this._$prodListWrap.siblings('.loading').hide();
				AP.lazyLoad.add( 'img.lazy_load' );
				
				if ( !this._pagination.planDisplayProdGrpSn ) {
					this._setPaging( data.limit, data.totalCount, prodGroup );
				}
				
			}.bind(this)).fail(function (e) {
				//
			}.bind(this));
		},
		
//		participation: function(e){
//			console.log($( e.currentTarget ).parents('form.validate'));
//			console.log($( e.currentTarget ).parent().siblings().find('.current').text());
//			var strCnt = $( e.currentTarget ).parent().siblings().find('.current').text();
//			if(strCnt > 10){				
//				var $form = $( e.currentTarget ).parents('form.validate');
//				var formData = AP.common.getFormData($form);
//				//$( e.currentTarget ).parents('form.validate').find( '.add_file_wrap' ).inputImages( 'extendFormData', formData );
//				$( e.currentTarget ).parents('form.validate').find( '.add_file_wrap' ).inputImages( 'extendFormData', formData );
//				console.log(formData);
//				//this._save( formData );
//				console.log($form.hasClass('modify'));
//				//$( e.currentTarget ).parents('form.validate').validate({
//				$('#reg_form').validate({
//					submitHandler: function ( form, e ) {
//						e.preventDefault();
//						console.log(e);
//						var formData = new FormData( form );
//						//console.log(formData);
//						//this._save( formData );
//						//$( e.currentTarget ).parents('form.validate').find( '.add_file_wrap' ).inputImages( 'extendFormData', formData );
//						if ( $(form).hasClass('modify') ) {
////							this._modify( formData ).done( function () {
////								
////							});
//							this._modify( formData );
//						} else {
//							console.log("dfdfdfdfdfsdsdfsd");
//							this._save( formData );
////							this._save( formData, $(form).hasClass('modify') ).done( function () {
////								AP.modal.alert( '입력이 완료되었습니다.' );
////							});
//						}
//					}.bind(this)
//				});
//			}
//		},
		
		//댓글 작성 저장
		_save: function ( formData ) {
			
			var defer = new $.Deferred();
			
			AP.api.planDisplayParticipated( null, formData )
				.done(function ( result ) {
					console.log(result);
					var data = result.planDisplayAwards;
					
					//댓글 저장 후 '즉시당첨' 의 '당첨' 되었을 경우
					if( data.eventWinStatus == 'Win' ){
						var awards = data.awards;
						var prodObj = _.where(awards, {awardTgtCode : "Prod"});
						data.awards = prodObj;
						
						//경품이 상품일 경우 배송지 입력 폼을 띄움
//						if( prodObj.length > 0 ){
//							data.member = this._member;
//							AP.winningPop.open( this._eventTitle, data );
//						}else{
//							defer.resolve();
//						}
						this.dispatch( 'success' );
					} else {
						defer.resolve();
						this.dispatch( 'success' );
					}
				}.bind(this))
				.fail(function ( xhr ) {
					if ( xhr.errorCode === 'EAPI004' ) {
						AP.login({trigger: true});
					} else if ( AP.message[xhr.errorCode] != undefined ) {
						AP.modal.alert( AP.message[xhr.errorCode] );
					} else {
						AP.modal.alert( xhr.errorMessage );
					}
				}.bind(this));

			return defer.promise();
		}

	});


	AP.eventsDetail = new EventsDetail();
})( jQuery );