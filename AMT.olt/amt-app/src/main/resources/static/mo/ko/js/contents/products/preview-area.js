/**
 * 제품상세 : 상단 상품 옵션 및 상품 이미지 영역 제어
 * Events:
 *  'call-review'	리뷰클릭시
 */
;(function ( $ ) {
	'use strict';

	var PreviewArea = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container .preview_area' );
			this._$slide = this._$target.find( '.goods_slide' );
			this._$colorChips = this._$target.find( '.color_chips' );
			this._$compareBtn = this._$target.find( '.compare_makeup' );
			this._$restockBtn = this._$target.find( '.btn_restock_notify_me' );
			this._$hotdealTimer = this._$target.find( '.hot_deal .ui_remain_timer' );

			this._defaultModel = [];
			this._selectedOption = null;
		},

		/** =============== Public Methods =============== */

		setDefaultData: function ( model, memberMap ) {
			this._defaultModel = model;

			this._setPlugins();
			this._setEvents( memberMap );
		},

		getSelectedOption: function () {
			return this._selectedOption;
		},

		/** =============== Private Methods =============== */

		_setEvents: function ( memberMap ) {
			//slide resize
			AP.responsiveWidth.addListener( 'resize', function (e) {
				this._$slide.ixSlideMax( 'resize' );
			}.bind(this));

			//상단 리뷰 클릭
			this._$target.find( '.btn_review' ).on( 'click', function (e) {
				e.preventDefault();
				this.dispatch( 'call-review' );
			}.bind(this));

			this._$slide.on( 'ixSlideMax:change', function (e) {
				this._$slide.find( '.youtube_video' ).video( 'stop' );
			}.bind(this));

			//메이크업 비교
			this._$compareBtn.on( 'click', function (e) {
				new AP.CompareMakeup().open( this._defaultModel.products );
			}.bind(this));

			//언제 들어와? 알림 신청
			this._$restockBtn.on( 'click', function (e) {
				AP.login().done(function () {
					this._openRestockNotifyModal( memberMap );
				}.bind(this));
			}.bind(this));

			this._$colorChips.on( 'color-chips-change', function (e) {
				var selectedModel = _.where( this._defaultModel.products, {prodSn: e.prodSn} )[0];

				this._changeFlag( selectedModel.flags );
				this._changeOptionSlide( selectedModel.prodImages );
				this._changeOptionName( selectedModel );

				this._selectedOption = selectedModel;
			}.bind(this));
		},

		_setPlugins: function () {
			this._$slide.ixSlideMax();
			this._$colorChips.colorChips();

			//핫딜 시간 설정
			if ( this._defaultModel.prodTypeCode === 'SpPriceSale' ) {
				this._$hotdealTimer.remainTimer({
					startTime: AP.common.date(),
					finishTime: this._defaultModel.saleEndDt
				});
			}
		},

		_changeOptionSlide: function ( prodImages ) {
			var html = AP.common.getTemplate( 'products.option-slide-list', prodImages );

			this._$slide.find( '.youtube_video' ).video( 'clear' );
			this._$slide.ixSlideMax( 'clear' );
			this._$slide.find( '.ix-list-items' ).html( html );
			this._$slide.ixSlideMax();
			this._$slide.find( '.youtube_video' ).video();
		},

		_changeFlag: function ( flags ) {
			var html = AP.common.getTemplate( 'products.flag-list', flags );
			this._$target.find( '.flag_set' ).html( html );
		},

		_changeOptionName: function ( product ) {
			var isNew = _.some( product.flags, function (flag) {
				return flag.prodFlagCode === 'icon_reco_new';
			});

			this._$target.find( '.option_name' ).show().find( '>span' ).html( (isNew? '<em>NEW</em>&nbsp;' : '') + '<span>' + product.prodName + '</span>' );
		},

		//언제 들어와? 알림 신청
		_openRestockNotifyModal: function ( memberMap ) {
			new AP.RestockNotify().open( this._defaultModel, memberMap );
		}

	});


	AP.previewArea = new PreviewArea();
})( jQuery );