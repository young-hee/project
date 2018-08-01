/**
 * Modal
 * 해당 모달 열기, 닫기 :
 * var currentModal = AP.modal.open();
 * currentModal.close( data, closeType );
 */
;(function ( $, common ) {
    'use strict';

    var modal = {
        /**
         * @param {Object}    options
         *  - {String}          templateKey         Handlebars template key, ex) 'folder-name.file-name'
         *  - {Object}          templateModel       template 에서 사용할 model object
         *  - {String}          sizeType            layer size type : "S", "M", "L" (default:M)
         *  - {Boolean}         middlePosition      auto top position middle (default:true)
         *  - {String}          top                 top position을 강제로 지정할때 사용, ex) 200
         *  - {String}          containerClass      추가로 들어가야 하는 CSS className 이 필요한경우 설정.
         *  - {Boolean}         transparent         dimmed 투명하게 처리
         *  - {jQueryObject}    returnFocusTarget   (default:modal을 열때 클릭한 대상)
         * @return {ModalCore}
         * ex) AP.modal.open().addListener( 'modal-before-close', function (e) { console.log(e.closeType, e.data) })
         *     AP.modal.open().addListener( 'modal-close', function (e) { console.log(e.closeType, e.data) })
         */
        open: function ( options ) {
            return new ModalCore( options );
        },

        /**
         * title이 있는 모달 열기
         * handlebars template을 간단히 연결할수 있다.
         * @param   {Object}    options
         *  - {String}        title             타이틀형식으로 입력할때 사용
         *  - {String}        contents          contents를 string이나 html로 설정할때 (text center 정렬)
         *  - {Object}        contents          contents를 handlebars template으로 표출할때 사용
         *     + {String}    templateKey     Handlebars template key, ex) 'common.paging'
         *     + {Object}    templateModel   template 에서 사용할 model object
         *  - {String}        confirmLabel      확인 버튼의 label (확인 버튼이 필요할때 해당 label설정)
         *  - {String}        cancelLabel       취소 버튼의 label (취소 버튼이 필요할때 해당 label설정)
         *  - {String}        sizeType          layer size type : "S", "M", "L" (default:M)
         *  - {String}        containerClass    추가로 들어가야 하는 CSS className 이 필요한경우 설정.
         *  - {jQueryObject}  returnFocusTarget (default:modal을 열때 클릭한 대상)
         * @return {ModalCore}
         * ex) AP.modal.info().addListener( 'modal-before-close', function (e) { console.log(e.closeType, e.data) })
         *     AP.modal.info().addListener( 'modal-close', function (e) { console.log(e.closeType, e.data) })
         */
        info: function ( options ) {
            if ( !_.isObject(options) ) options = {};

            options.templateKey = 'common.modal-info-contents';
            options.templateModel = {
                title: options.title || '',
                contents: options.contents,
                btnConfirm: !!options.confirmLabel,
                btnCancel: !!options.cancelLabel,
                confirmLabel: options.confirmLabel,
                cancelLabel: options.cancelLabel
            };
            options.sizeType = options.sizeType? options.sizeType : 'M';
            options.containerClass = options.containerClass? 'modal_info ' + options.containerClass : 'modal_info';
            return this.open( options );
        },

        /**
         * 전체영역을 사용하는 모달 열기
         * @param   {Object}    options
         *  - {String}        title             타이틀형식으로 입력할때 사용
         *  - {String}        contents          contents를 string이나 html로 설정할때
         *  - {Object}        contents          contents를 handlebars template으로 표출할때 사용
         *     + {String}    templateKey     Handlebars template key, ex) 'common.paging'
         *     + {Object}    templateModel   template 에서 사용할 model object
         *  - {String}        confirmLabel      확인 버튼의 label (확인 버튼이 필요할때 해당 label설정)
         *  - {String}        cancelLabel       취소 버튼의 label (취소 버튼이 필요할때 해당 label설정)
         *  - {String}        containerClass    추가로 들어가야 하는 CSS className 이 필요한경우 설정.
         *  - {Boolean}       historyBackClose		history back 버튼으로 닫기를 허용할지 여부 설정, default: true
         *  - {jQueryObject}  returnFocusTarget (default:modal을 열때 클릭한 대상)
         * @return {ModalCore}
         * ex) AP.modal.full().addListener( 'modal-before-close', function (e) { console.log(e.closeType, e.data) })
         *     AP.modal.full().addListener( 'modal-close', function (e) { console.log(e.closeType, e.data) })
         */
        full: function ( options ) {
            if ( !_.isObject(options) ) options = {};

            options.templateKey = 'common.modal-info-contents';
            options.templateModel = {
                title: options.title || '',
                contents: options.contents,
                btnConfirm: !!options.confirmLabel,
                btnCancel: !!options.cancelLabel,
                confirmLabel: options.confirmLabel,
                cancelLabel: options.cancelLabel
            };
            options.sizeType = 'FULL';
            options.top = 0;
            options.containerClass = options.containerClass? 'fullpage ' + options.containerClass : 'fullpage';
            return this.open( options );
        },

        /**
         * open alert
         * @param   {String || Object}    contents
         *  - {String}        contents   작은 텍스트의 contents로 입력할때 사용, (기본입력)
         *  - {String}        title      타이틀형식으로 입력할때 사용
         *  - {String}        confirmLabel   확인 버튼의 label, default:확인
         *  - {jQueryObject}  returnFocusTarget (default:modal을 열때 클릭한 대상)
         * @return {ModalCore}   이미 alert이 open되어 있으면 false를 반환.
         * ex) AP.modal.alert().addListener( 'modal-before-close', function (e) { console.log(e.closeType, e.data) })
         *     AP.modal.alert().addListener( 'modal-close', function (e) { console.log(e.closeType, e.data) })
         */
        alert: function ( contents ) {
            var options = ( typeof contents === 'string' )? {contents: contents} : contents;

            options.templateKey = 'common.modal-text-contents';
            options.templateModel = {
                title: '',
                contents: options.contents,
                textAlign: 'center',
                btnConfirm: true,
                confirmLabel: options.confirmLabel || '확인'
            };
            options.sizeType = options.sizeType? options.sizeType : 'S';
            options.containerClass = options.containerClass? 'modal_alert ' + options.containerClass : 'modal_alert';
            return this.open( options );
        },

        /**
         * open confirm
         * @param   {String || Object}    contents
         *  - {String}        contents   작은 텍스트의 contents로 입력할때 사용, (기본입력)
         *  - {String}        title      타이틀형식으로 입력할때 사용
         *  - {String}        confirmLabel   확인 버튼의 label, default:확인
         *  - {String}        cancelLabel    취소 버튼의 label, default:취소
         *  - {jQueryObject}  returnFocusTarget (default:modal을 열때 클릭한 대상)
         * @return {ModalCore}
         * ex) AP.modal.confirm().addListener( 'modal-before-close', function (e) { console.log(e.closeType, e.data) })
         *     AP.modal.confirm().addListener( 'modal-close', function (e) { console.log(e.closeType, e.data) })
         */
        confirm: function ( contents ) {
            var options = ( typeof contents === 'string' )? {contents: contents} : contents;

            options.templateKey = 'common.modal-text-contents';
            options.templateModel = {
                title: '',
                contents: options.contents,
                textAlign: 'center',
                btnConfirm: true,
                btnCancel: true,
                confirmLabel: options.confirmLabel || '확인',
                cancelLabel: options.cancelLabel || '취소'
            };
            options.sizeType = options.sizeType? options.sizeType : 'M';
            options.containerClass = options.containerClass? 'modal_confirm ' + options.containerClass : 'modal_confirm';
            return this.open( options );
        },

		/**
		 * 약관 full 모달 열기
		 * @param   {Object}    options
		 *  - {String}        title             타이틀형식으로 입력할때 사용
		 *  - {String}        displayCode       약관 고유 display code
		 *  					ET001: [필수] 에뛰드하우스 이용약관
		 * 						010: [필수] 뷰티포인트 서비스 이용약관
		 * 						020: [필수] 개인정보 이용 및 수집에 대한 동의
		 * 						030: [선택] 개인정보 이용 및 수집에 대한 동의
		 * 						040: [선택] 개인정보 제3자 제공 동의
		 * 						050: [선택] 개인정보 제3자 제공 동의(외부컨텐츠)
		 * 						060: [선택] 국외이전동의
		 * 						ET002: 위치정보 이용약관
		 *  - {jQueryObject}  returnFocusTarget (default:modal을 열때 클릭한 대상)
		 * @return {ModalCore}
		 * ex) AP.modal.agreeTerms().addListener( 'modal-before-close', function (e) { console.log(e.closeType, e.data) })
		 *     AP.modal.agreeTerms().addListener( 'modal-close', function (e) { console.log(e.closeType, e.data) })
		 */
		agreeTerms: function ( options ) {
			var opt = options || {},
				modal = AP.modal.full({
					title: opt.title,
					contents: {
						templateKey: 'common.loading-modal'
					},
					returnFocusTarget: opt.returnFocusTarget,
					containerClass: 'agree_terms'
				}),
				api = AP.api.getAgreeTerms( null, {
					displayCode: opt.displayCode
				}).done( function ( data ) {
					if( data ) {
						var terms = data.terms;
						if ( terms ) {
							modal.getElement().find( '.layer_cont' ).html( '<div class="panel terms_area"><pre>' + terms.termsBodyText + '</pre></div>' );
						}
					}
				});

			modal.addListener( 'modal-before-close', function () {
				api.abort();
			});

			return modal;
		},

        /**
         * modal 모두 닫기
         * @param   {*}         data  리스너에서 전달받을 데이타
         * @param   {String}    closeType  e.closeType 로 전달되는 상태값 (default:close)
         */
        closeAll: function ( data, closeType ) {
            $( '.layer_popup .layer_wrap' ).trigger( 'close', [closeType, data] );
        },

        /**
         * Modal이 한개라도 열려있는지 체크
         * @returns {Boolean}
         */
        isOpen: function () {
            return $( '.layer_popup.js_open' ).length > 0;
        },

        /**
         * 전체 모달 포지션 재설정
         */
        resetPosition: function () {
            if ( this.isOpen() ) {
                $( '.layer_popup.js_open' ).each( function ( idx, el ) {
                    $( el ).triggerHandler( 'resetPosition' );
                });
            }
        }
    };


    /**
     * Modal Core
     * @constructor
     */
    var ModalCore = $B.Class.extend({
        _rePositionTime: 0,

        initialize: function ( options ) {
            this._setOptions( options );
            this._draw( this._options.templateKey );
            this._setPosition();
            this._addEvents();

            this._$pop.focus();
            this._$win.scrollTop( this._scrollTop );
            //this._setDimmedHeight();
        },

        /** =============== Public Methods =============== */

        /**
         * 대상 modal 닫기
         * @param {*}         data  리스너에서 전달받을 데이타
         * @param {String}    closeType  e.closeType 로 전달되는 상태값 (default:close)
         */
        close: function ( data, closeType ) {
            this._$pop.triggerHandler( 'close', [closeType, data] );
        },

        /**
         * 대상 modal Element 반환
         * @return  {jQueryObject}
         */
        getElement: function () {
            return this._$modal;
        },

        /**
         * 해당 modal만 포지션 재설정
         */
        resetPosition: function () {
            if ( this._$modal ) {
                this._$modal.trigger( 'resetPosition' );
            }
        },

        /** =============== Private Methods =============== */

        _draw: function ( templateKey ) {
            var html = common.getTemplate( 'common.modal', _.extend({
                    _templateKey: templateKey,
                    uId: this.__uId__
                }, this._options));

            this._$win = $( window );
            this._$body = $( 'body' );
            this._$modal = $( html ).siblings( '.modal_popup' );
            this._$iconClose = this._$modal.find( '.layer_close' );
            this._$btnConfirm = this._$modal.find( '.btn_default_modal_confirm' );
            this._$btnCancel = this._$modal.find( '.btn_default_modal_cancel' );
            this._$dimmed = this._$modal.find( '.layer_dimmed' );
            this._$pop = this._$modal.find( '.layer_wrap' );

            if ( this._options.transparent ) {
                this._$modal.trigger( 'modal-transparent' );
            } else {
                if ( modal.isOpen() ) {
                    $( '.layer_popup' ).trigger( 'modal-transparent' );
                }
            }

            this._$body.append( this._$modal );
            this._setOverflow( 'hidden' );
        },

		_setOverflow: function ( state ) {
            // if ( $B.ua.MOBILE_IOS ) {
			// 	$( '.ap_wrapper' ).css( 'visibility', state );
			// }

			this._$body.css( 'overflow', state );
		},

        _setOptions: function ( options ) {
            var options = ( _.isObject(options) )? $B.object.clone( options ) : {};

            options.popupSize = options.popupSize || 'M';
            options.middlePosition = ( typeof options.middlePosition === 'boolean' )? options.middlePosition : true;
            if ( typeof options.top === 'number' ) options.middlePosition = false;
            if ( !options.templateModel ) options.templateModel = {};
            options.historyBackClose = ( typeof options.historyBackClose === 'boolean' )? options.historyBackClose : true;

            this._$activeElement = options.returnFocusTarget || $( document.activeElement );
            this._options = options;
        },

        _addEvents: function () {
            this._$pop.on( 'close', function (e, closeType, data, command) {
                e.preventDefault();

                if ( this._routerHandler && command !== 'history-back' ) {
                    //hash history 지우기
                    history.back();
                    return;
                }

                var lastIdx = $( '.layer_popup.js_open' ).length - 2;

                $( '.layer_popup.js_open' ).eq( lastIdx ).triggerHandler( 'modal-transparent-reset' );
                this.dispatch( 'modal-before-close', {closeType: closeType || e.type, data: data} );
                this._remove();

                if ( !$('.layer_popup.js_open').length ) {
                    if ( !AP.asideMenu || (AP.asideMenu && !AP.asideMenu.isOpen()) ) {
						this._setOverflow( '' );
					}
                }

                //focus
                this._$activeElement.focus();
                this.dispatch( 'modal-close', {closeType: closeType || e.type, data: data} );
            }.bind(this));

            this._$modal.on( 'modal-transparent modal-transparent-reset', function (e) {
                if ( e.type === 'modal-transparent' ) {
                    this._$dimmed.addClass( 'dimmed_transparent' );
                } else {
                    if ( !this._options.transparent ) {
                        this._$dimmed.removeClass( 'dimmed_transparent' );
                    }
                }
            }.bind(this));

            this._$iconClose.on( 'click', function (e) {
                e.preventDefault();
                this._$pop.triggerHandler( 'close' );
            }.bind(this));

            this._$btnCancel.on( 'click', function (e) {
                e.preventDefault();
                this._$pop.triggerHandler( 'close', ['cancel'] );
            }.bind(this));

            this._$btnConfirm.on( 'click', function (e) {
                e.preventDefault();
                this._$pop.triggerHandler( 'close', ['confirm'] );
            }.bind(this));

            this._$modal.on( 'resetPosition', function (e) {
                this._setPosition( true );
                //this._setDimmedHeight();
            }.bind(this));

            /*this._onResize = function (e) {
                this._setDimmedHeight();
            }.bind( this );
            this._$win.on( 'resize', this._onResize );*/

            this._onRePosition = function (e) {
                if ( !this._isYoutubeFullScreen() && !$B.ua.MSIE ) {
                    this._setPosition( true );
                }
            }.bind( this );
            AP.responsiveWidth.addListener( 'resize', this._onRePosition );

            //hash
			/*
            if ( this._options.sizeType === 'FULL' && this._options.historyBackClose ) {
                this._routerHandler = function (e) {
                    this._$pop.triggerHandler( 'close', [null, null, 'history-back'] );
                }.bind(this);
                this._oldHash = location.hash.replace( '#', '' );
                AP.router.addListener( this._oldHash || ':default', this._routerHandler );
                AP.router.navigate( 'modal/full/' + this.__uId__ );
            }
            */
        },

        _isYoutubeFullScreen: function () {
            var maxWidth = 0, maxHeight = 0;

            this._$modal.find( 'iframe[data-vendor=youtube]' ).each( function ( idx, el ) {
                maxWidth = Math.max( maxWidth, $(el).width() );
                maxHeight = Math.max( maxHeight, $(el).height() );
            });

            return ( $(window).width() === maxWidth ) && ( $(window).height() === maxHeight );
        },

        _setPosition: function ( isRePosition ) {
            this._scrollTop = this._$win.scrollTop();

            var iconH = parseFloat( this._$iconClose.css('top') ) || 0;
            iconH = Math.abs( iconH );

            if ( this._options.middlePosition ) {
                var winHeight = this._$win.height(),
                    popHeight = this._$pop.outerHeight(),
                    posY = 0,
                    positionTime = new Date().getTime();

                posY = ( winHeight * 0.5 ) - ( popHeight * 0.5 );
                if ( posY < iconH ) posY = iconH;

                //Firefox bug fix (CSS transition)
                if ( isRePosition && (this._rePositionTime && positionTime - this._rePositionTime > 50) ) {
                    this._$pop.addClass( 'transition_top' );
                }

                this._$pop.css( 'top', Math.round(posY) + 'px' );
                this._rePositionTime = positionTime;
            } else if ( typeof this._options.top === 'number' ) {
                this._$pop.css( 'top', this._options.top + 'px' );
            }
        },

        _setDimmedHeight: function () {
            this._$dimmed.css( 'height', '' ).css( 'height', $(document).outerHeight() + 'px' );
        },

        _remove: function () {
            this._$iconClose.off();
            this._$btnCancel.off();
            this._$btnConfirm.off();
            this._$dimmed.off();
            this._$pop.off();
            //this._$win.off( 'resize', this._onResize );
            AP.responsiveWidth.removeListener( 'resize', this._onRePosition );
            if ( this._routerHandler ) {
                AP.router.removeListener( this._oldHash || ':default', this._routerHandler );
            }
            this._$modal.off().remove();
        }
    }, 'ModalCore');



    modal.ModalCore = ModalCore;
    AP.modal = AP.modal || modal;
})( jQuery, AP.common );
