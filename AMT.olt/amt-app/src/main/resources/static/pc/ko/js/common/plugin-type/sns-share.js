/**
 * sns share (facebook, twitter, naver-blog, googleplus, pinterest, kakaostory, kakaotalk)
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
	'use strict';

	$.fn.extend({
		/**
		 * Events: sns-share-call
		 *  ex) $( '.btn_share' ).on('sns-share-call', function(e){ e.snsType });
		 * @param   {String}  method    ex) $( '.btn_share' ).snsShare();
		 *              "clear"         적용해제
		 * @returns {jQuery}
		 */
		snsShare: function ( method, value ) {
			var pluginName = 'sns-share';

			if ( typeof method === 'string' ) {
				return plugin.callMethod( this, pluginName, method, value );
			} else {
				this.each( _.bind(function ( idx, el ) {
					var $el = $( el );
					if ( !plugin.has($el, pluginName) ) {
						plugin.add( $el, pluginName, new SnsShare($el, pluginName, method) );
					}
				}, this));
			}

			return this;
		}
	});


	var Origin = {
		title: $( 'meta[property="og:title"]' ).attr( 'content' ),
		description: $( 'meta[property="og:description"]' ).attr( 'content' ),
		image: $( 'meta[property="og:image"]' ).attr( 'content' ),
		protocol: location.protocol,
		origin: location.protocol + '//' + location.hostname + ( location.port? ':' + location.port : '' ),
		href: location.href
	};



	var SnsShare = function ( $target, pluginName ) {
		var _$target = $target;

		var _pluginName = pluginName,
			_modal;


		/* ==================== Public Methods ==================== */
		this.clear = function () {
			_$target.off( 'click', clickHandler );
			plugin.remove( _$target, _pluginName );
		};

		/* ==================== Initialize ==================== */
		initialize();

		/* ==================== Protected Methods ==================== */

		function initialize () {
			_$target.on( 'click', clickHandler );
		}

		function clickHandler (e) {
			_modal = AP.modal.info({
				title: 'SNS 공유하기',
				contents: {
					templateKey: 'common.sns-share'
				}
			});

			var $modal = _modal.getElement();
			$modal.find( '.url_input' ).val( Origin.href );

			_modal.addListener( 'modal-before-close', function (e) {
				$modal.find( '.share_btn' ).off( 'click', shareClickHandler );
			});

			$modal.find( '.share_btn' ).on( 'click', shareClickHandler );
		}

		function shareClickHandler (e) {
			e.preventDefault();
			var snsType = $( e.currentTarget ).data( 'sns-type' );

			if ( snsType === 'url' ) {
				copyUrl( $(e.currentTarget) );
			} else {
				snsShare( snsType );
				_modal.close();
				dispatch( 'call', snsType );
			}
		}

		function copyUrl ( $el ) {
			//IE9~
			if ( typeof document.execCommand === 'function' ) {
				var $input = _modal.getElement().find( '.url_input' );
				$input.select();
				document.execCommand( 'Copy' );
				$input.focus();
			}
		}

		//sns 페이지 공유
		function snsShare ( type ) {
			var popupUrl = '',
				width = 500,
				originUrl = encodeURIComponent( Origin.href );

			switch ( type ) {
				case 'facebook':
					popupUrl = '//www.facebook.com/sharer/sharer.php?u=' + originUrl;
					break;
				case 'twitter':
					//최대 140자
					popupUrl = '//twitter.com/intent/tweet?url=' + originUrl + '&text=' + Origin.title;
					break;
				case 'naver_blog':
					popupUrl = '//blog.naver.com/openapi/share?url=' + originUrl + '&title=' + Origin.title;
					break;
				case 'google_plus':
					popupUrl = '//plus.google.com/share?url=' + originUrl;
					width = 400;
					break;
				case 'pinterest':
					//url, media, description
					popupUrl = '//pinterest.com/pin/create/button/?url=' + originUrl + '&description=' + Origin.title + '&media=' + Origin.image;
					break;
				case 'kakao_story':
					popupUrl = '//story.kakao.com/share?url=' + originUrl;
					break;
				case 'kakao_talk':
					AP.common.kakaoApiReady.done(function () {
						Kakao.Link.sendDefault({
							objectType: 'feed',
							content: {
								title: Origin.title,
								//description: '',
								imageUrl: Origin.image,
								link: {
									mobileWebUrl: originUrl,
									webUrl: originUrl
								}
							},
							buttons: [
								{
									title: '제세히 보기',
									link: {
										mobileWebUrl: originUrl,
										webUrl: originUrl
									}
								}
							]
						});
					});
					break;
			}

			//팝업
			if ( type !== 'kakao_talk' ) {
				window.open( Origin.protocol + popupUrl, type + 'sns_share', 'scrollbars=1,width=' + width + ',height=500,menubar=0,resizable=0' );
			}
		}

		function dispatch ( type, snsType ) {
			_$target.triggerHandler({
				type: _pluginName + '-' + type,
				snsType: snsType
			});
		}
	};

})( jQuery, AP.plugin );