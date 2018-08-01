/**
 * Common Methods
 */
;( function ( $, $B ) {
	'use strict';

	//moment locale setting
	if ( window.moment && AP.LANGUAGE ) moment.locale( AP.LANGUAGE );
	var TIME_GAP = ( AP.CURRENT_DATE ) ? AP.CURRENT_DATE - new Date().getTime() : 0;


	var Common = {

		requestCS: function ( cs ) {
			var obj = new Object();
			if ( cs.type != null )
				obj.type = cs.type;
			if ( cs.keyword != null )
				obj.keyword = cs.keyword;
			if ( cs.inquiryTypeSn != null )
				obj.inquiryTypeSn = cs.inquiryTypeSn;
			if ( cs.offset != null )
				obj.offset = cs.offset;
			if ( cs.limit != null )
				obj.limit = cs.limit;
			if ( cs.noticeTypeCode != null )
				obj.noticeTypeCode = cs.noticeTypeCode;
			if ( cs.importantNoticeYn != null )
				obj.importantNoticeYn = cs.importantNoticeYn;
			if ( cs.RS_Date != null )
				obj.RS_Date = cs.RS_Date;
			if ( cs.RD_Date != null )
				obj.RD_Date = cs.RD_Date;
			if ( cs.answerYN != null )
				obj.answerYN = cs.answerYN;
			if ( cs.inquirySn != null )
				obj.inquirySn = cs.inquirySn;
			if ( cs.currentPage != null )
				obj.currentPage = cs.currentPage;

			return obj;
		},

		/**
		 * Handlebars Template
		 * @param {String}    key       folderName.fileName
		 * @param {Object}    templateModel     template model
		 * @returns {String}    html
		 */
		getTemplate: function ( key, templateModel, include ) {
			var keys = key.split( '.' ),
				methods = window.AP.handlebars,
				file = key.replace( /\./g, '/' ),
				fComment = '<!-- handlebars' + ( include ? '@include' : '' ) + ':' + file + '.hbs -->\n',
				eComment = '\n<!-- //handlebars' + ( include ? '@include' : '' ) + ':' + file + '.hbs -->';

			if ( !methods ) this.error( 'getTemplate :: "handlebars-templates/compiled/' + file + '.js" 를 찾지 못했습니다.' );

			_.each( keys, function ( id ) {
				methods = methods[id];
				if ( !methods ) this.error( 'getTemplate :: "handlebars-templates/compiled/' + file + '.js" 를 찾지 못했습니다.' );
			}.bind( this ) );

			return fComment + methods( _.isObject( templateModel ) ? templateModel : {} ) + eComment;
		},

		/**
		 * 국가 기준으로 가격포멧에 맞춰 반환
		 * ex) 2,000원
		 * @param {Number}  price
		 * @param {Int}     fractionSize  소수점 자리수, default:0
		 * @returns {String}
		 */
		currencyFormat: function ( price, fractionSize ) {
			var price = ( fractionSize ) ? Number( price ).toFixed( fractionSize ) : Number( price ),
				result = $B.string.numberFormat( price );

			//sign position
			if ( _.contains(['en', 'cn', 'jp'], AP.REGION) ) {
				result = ( AP.CURRENCY_SYMBOL + result );
			} else {
				result = ( result + AP.CURRENCY_SYMBOL );
			}

			return result;
		},

		/**
		 * 전화번호 03112345678 -> 031-1234-5678 형식으로 반환
		 * @param   {String}    phoneNumber
		 * @returns {String}
		 */
		phoneNumberFormat: function ( phoneNumber ) {
			var result = String( phoneNumber ),
				length = result.length;

			if ( !/[^0-9]/.test( result ) ) {
				if ( length === 9 ) {
					result = result.substr( 0, 2 ) + '-' + result.substr( 2, 3 ) + '-' + result.substr( 5 );
				} else if ( length === 10 ) {
					if ( /^02/.test( result ) ) {
						result = result.substr( 0, 2 ) + '-' + result.substr( 2, 4 ) + '-' + result.substr( 6 );
					} else {
						result = result.substr( 0, 3 ) + '-' + result.substr( 3, 3 ) + '-' + result.substr( 6 );
					}
				} else {
					result = result.substr( 0, 3 ) + '-' + result.substr( 3, 4 ) + '-' + result.substr( 7 );
				}
			}

			return result;
		},

		/**
		 * 서버시간을 기준으로 현재의 client date 반환
		 * @param	{String}	format	반환받을 포멧형식, moment.js 참고 (default: 2018-03-28T12:21:33+09:00)
		 * @returns {String}
		 */
		date: function ( format ) {
			return moment( new Date().getTime() + TIME_GAP ).format( format );
		},

		/**
		 * Cookie
		 * @param {String}    key
		 * @param {*}         value
		 * @param {Number}    expireMinutes     30 sec = 0.5, not value => Session Cookie
		 * @param {String}    path
		 * @param {String}    domain
		 * @param {Boolean}   secure            SSL
		 */
		setCookie: function ( key, value, expireMinutes, path, domain, secure ) {
			$B.utils.cookie( key, value, expireMinutes, path, domain, secure );
		},

		getCookie: function ( key ) {
			return $B.utils.cookie( key );
		},

		/**
		 * set localStorage
		 * @param {String}    key
		 * @param {*}         value
		 * @param {Number}    expireMinutes     30 sec = 0.5
		 */
		setLocalStorage: function ( key, value, expireMinutes ) {
			var json = false;

			if ( expireMinutes ) {
				var today = new Date();
				today.setSeconds( today.getSeconds() + (expireMinutes * 60) );
				expireMinutes = today.getTime();
			}

			if ( typeof value === 'object' ) {
				value = JSON.stringify( value );
				json = true;
			}

			localStorage.setItem( key, JSON.stringify( {
				expires: expireMinutes || -1,
				origin: value,
				json: json
			} ) );
		},

		/**
		 * get localStorage
		 * @param {String}    key
		 * @return  {*}
		 */
		getLocalStorage: function ( key ) {
			var value = localStorage.getItem( key ),
				now = new Date().getTime();

			if ( value ) {
				value = JSON.parse( value );

				if ( value.expires === -1 || value.expires >= now ) {
					if ( value.json ) {
						value = JSON.parse( value.origin );
					} else {
						value = value.origin;
					}
				} else {
					this.clearLocalStorage( key );
					value = undefined;
				}
			} else {
				value = undefined;
			}

			return value;
		},

		/**
		 * LocalStorage Item clear
		 * @param    {String}    key
		 */
		clearLocalStorage: function ( key ) {
			localStorage.removeItem( key );
		},

		/**
		 * set SessionStorage
		 * @param {String}    key
		 * @param {*}         value
		 * @param {Number}    expireMinutes     30 sec = 0.5
		 */
		setSessionStorage: function ( key, value, expireMinutes ) {
			var json = false;

			if ( expireMinutes ) {
				var today = new Date();
				today.setSeconds( today.getSeconds() + (expireMinutes * 60) );
				expireMinutes = today.getTime();
			}

			if ( typeof value === 'object' ) {
				value = JSON.stringify( value );
				json = true;
			}

			sessionStorage.setItem( key, JSON.stringify( {
				expires: expireMinutes || -1,
				origin: value,
				json: json
			} ) );
		},

		/**
		 * get SessionStorage
		 * @param {String}    key
		 * @return  {*}
		 */
		getSessionStorage: function ( key ) {
			var value = sessionStorage.getItem( key ),
				now = new Date().getTime();

			if ( value ) {
				value = JSON.parse( value );

				if ( value.expires === -1 || value.expires >= now ) {
					if ( value.json ) {
						value = JSON.parse( value.origin );
					} else {
						value = value.origin;
					}
				} else {
					this.clearSessionStorage( key );
					value = undefined;
				}
			} else {
				value = undefined;
			}

			return value;
		},

		/**
		 * SessionStorage Item clear
		 * @param    {String}    key
		 */
		clearSessionStorage: function ( key ) {
			sessionStorage.removeItem( key );
		},

		/**
		 * 대상문자열의 byte 반환
		 * @param    {String}    str    대상문자열
		 * @returns  {Int}
		 */
		getByteLength: function ( str ) {
			var result = 0;

			if ( !_.isEmpty( str ) ) {
				if ( typeof str == 'number' ) str = String( str );

				var length = str.length;

				for ( var i = 0; i < length; ++i ) {
					result += this.charByteSize( str.charAt( i ) );
				}
			}

			return result;
		},

		/**
		 * 한글자에 대한 byte 반환
		 * @param    {String}    str    대상문자
		 * @returns {Int}
		 */
		charByteSize: function ( str ) {
			var result = 0;

			if ( !_.isEmpty( str ) ) {
				if ( typeof str == 'number' ) str = String( str );

				var charCode = str.charCodeAt( 0 );

				if ( charCode <= 0x00007F ) {
					result = 1;
				} else if ( charCode <= 0x0007FF ) {
					result = 2;
				} else if ( charCode <= 0x00FFFF ) {
					result = 3;
				} else {
					result = 4;
				}
			}

			return result;
		},

		/**
		 * 대상문자열을 설정한 byte 만큼 잘라서 반환
		 * @param    {String}    str    대상문자열
		 * @returns  {Int}
		 */
		cutStringByte: function ( str, byt ) {
			var result = str;

			if ( !_.isEmpty( str ) ) {
				if ( typeof str == 'number' ) str = String( str );

				var size = 0,
					strLength = str.length,
					rIndex = strLength;

				for ( var i = 0; i < strLength; ++i ) {
					size += this.charByteSize( str.charAt( i ) );

					if ( size == byt ) {
						rIndex = i + 1;
						break;
					} else if ( size > byt ) {
						rIndex = i;
						break;
					}
				}

				result = str.substring( 0, rIndex );
			}

			return result;
		},

		/**
		 * \r\n값 체크
		 * @param    {String}    str    대상문자열
		 * @returns  {Int}
		 */
		getEnterCount: function ( str ) {
			var result = 0;

			if ( !_.isEmpty( str ) ) {
				var pattern = /\n/g;
				if ( pattern.test( str ) ) {
					result = str.match( pattern ).length;
				} else {
					result = 0;
				}
			}

			return result;
		},

		/**
		 * 가로모드 인지 체크하여 반환
		 * @returns {Boolean}
		 */
		isLandscape: function () {
			return window.innerWidth > window.innerHeight;
		},

		/**
		 * 에러메세지 콘솔에 표시
		 */
		error: function ( str ) {
			if ( window.console ) {
				if ( console.error ) {
					console.error( '[Error] ' + str );
				} else if ( console.log ) {
					console.log( '[Error] ' + str );
				}
			}
		},

		/**
		 * 경고 메세지 콘솔에 표시
		 */
		warn: function ( str ) {
			if ( window.console ) {
				if ( console.warn ) {
					console.warn( '[Warn] ' + str );
				} else if ( console.log ) {
					console.log( '[Warn] ' + str );
				}
			}
		},

		/**
		 * "/pc/ko/" 가 빠진 path를 체크하여 해당경로를 추가해서 반환.
		 * @param {String}    path
		 * @returns {String}
		 */
		absolutePath: function ( path ) {
			var base = '/' + AP.DEVICE + '/' + AP.LANGUAGE,
				reg = new RegExp( '^\\/' + AP.DEVICE + '\\/' + AP.LANGUAGE, 'i' );

			if ( !/^http/.test( path ) && !reg.test( path ) ) {
				path = ( /^\//.test( path ) ) ? base + path : base + '/' + path;
			}

			return path;
		},

		/**
		 * products.availablePrices 모델의 properties 중에 "currencyCode"의 맞도록 반환한다. (제품관련 model)
		 * @param	{Array}		availablePrices
		 * @param	{String}	propName
		 * @returns {*}
		 */
		availablePrices: function ( availablePrices, propName ) {
			var result = '';

			if ( _.isArray(availablePrices) && propName ) {
				_.some( availablePrices, function ( availablePrice ) {
					if ( AP.CURRENCY_CODE === availablePrice.currencyCode ) {
						result = availablePrice[propName];
						return true;
					}
				});
			}

			return result;
		},

		/**
		 * Youtube api load check
		 * ex) AP.common.youtubeApiReady.done(function () {});
		 * @return  {Deferred}
		 */
		youtubeApiReady: new $.Deferred(),

		/**
		 * map api load check
		 * ex) AP.common.mapApiReady.done(function () {});
		 * @return  {Deferred}
		 */
		mapApiReady: new $.Deferred(),

		/**
		 * kakao api load check
		 * ex) AP.common.kakaoApiReady.done(function () {});
		 * @return  {Deferred}
		 */
		kakaoApiReady: new $.Deferred(),

		/**
		 * form to json data
		 * @param $form
		 * @returns {{}}
		 */
		getFormData: function ( $form ) {
			var unindexed_array = $form.serializeArray();
			var indexed_array = {};

			$.map( unindexed_array, function ( n, i ) {
				indexed_array[n['name']] = n['value'];
			} );

			return indexed_array;
		},

		/**
		 * time count down
		 *
		 * @param min
		 */
		timeCountDown: function ( min, callback ) {

			var timer = false;

			this.start = function () {

				var countDownDate = new Date( new Date().getTime() + min * 60 * 1000 );

				timer = setInterval( function () {

					var distance = countDownDate - new Date().getTime();

					// Time calculations minutes and seconds
					var minutes = Math.floor( ( distance % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
					var seconds = Math.floor( ( distance % ( 1000 * 60 ) ) / 1000 );

					// Output the result in an element with id="time"
					if ( seconds < 10 ) seconds = "0" + seconds;
					$( '[name=timer]' ).html( minutes + ":" + seconds );

					// If the count down is over, write some text
					if ( distance < 0 ) {
						$( '[name=timer]' ).html( "0:00" );
						clearInterval( timer );
						timer = false;
			            if(callback)
			            	callback();
					}
				}, 1000 );
			};

			this.isRunning = function () {
				return timer !== false;
			};

			this.stop = function () {
				clearInterval( timer );
				timer = false;
			};
		}
	};

	AP.common = AP.common || Common;


	/** ========== iOS Input Focus Out ========== */
	( function () {
		if ( $B.ua.MOBILE_IOS ) {
			$( document ).on( 'touchstart', function ( e ) {
				if ( !$( e.target ).is( 'input, textarea, button, a' ) ) {
					$( ':focus' ).blur();
				}
			} );
		}
	} )();


	/** ========== youtube api load check ========== */
	( function () {
		if ( window.YT && typeof window.YT.Player === 'function' ) {
			Common.youtubeApiReady.resolve();
		}

		window.onYouTubeIframeAPIReady = function () {
			Common.youtubeApiReady.resolve();
		};
	} )();

	/** ========== daum map api load check ========== */
	( function () {
		if ( window.daum && window.daum.maps ) {
			daum.maps.load( function () {
				Common.mapApiReady.resolve();
			} );
		}
	} )();

	/** ========== kakao api load check ========== */
	( function () {
		window.onKakaoAPIReady.done( function () {
			Common.kakaoApiReady.resolve();
		} );
	} )();

} )( jQuery, ixBand );