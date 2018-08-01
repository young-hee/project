/**
 * Handlebars Helpers
 */
;(function ( $ ) {
	'use strict';

	/**
	 * radio checkbox 확인
	 * @returns {String}
	 */

	Handlebars.registerHelper('checkedIf', function (condition) {
		return (condition) == 'Y' ? 'checked' : '';
	});

	/**
	 * 공지사항 체크
	 * @returns {String}
	 */

	Handlebars.registerHelper('repClass', function (condition) {
		return (condition) == 'Y' ? 'address_default' : '';
	});

	/**
	 * radio checkbox 확인
	 * @returns {String}
	 */

	Handlebars.registerHelper('repText', function (condition) {
		return (condition) == 'Y' ? '기본' : '';
	});


	/**
	 * json 변환
	 * @returns {String}
	 */

	Handlebars.registerHelper('json', function(context) {
		return JSON.stringify(context);
	});

	/**
	 * include
	 * @param {String}  templateKey     folderName.fileName
	 * @param {Object}  templateModel   template model
	 * @return  {Html}
	 */
	Handlebars.registerHelper( 'include', function ( templateKey, templateModel ) {
		return AP.common.getTemplate( templateKey, templateModel, true );
	});

	/**
	 * i18n
	 * ex) {{ i18n 'test-i18n-code' }}, {{ i18n 'test-i18n-code-price' 'price' '2,000' }}
	 * html {{{ i18n 'test-i18n-code-price' }}}
	 * @param   {String}    code
	 * @return  {String}
	 */
	Handlebars.registerHelper( 'i18n', function ( code ) {
		if ( typeof code === 'string' ) {
			var args = Array.prototype.slice.call( arguments ).slice( 1, arguments.length - 1 );
			code = AP.i18n.getTemplateData( code, args );
		}

		return code;
	});

	/**
	 * 계산식 처리
	 * ex) {{ calc value1 '+' 20 '/' value2 }}
	 */
	Handlebars.registerHelper( 'calc', function () {
		var args = Array.prototype.slice.call( arguments ),
			options = args.pop(),
			result = args.shift();

		for ( var i in args ) {
			var operator = args.shift(),
				val = args.shift();

			result = {
				'+': result + val,
				'-': result - val,
				'*': result * val,
				'/': result / val,
				'%': result % val
			}[operator];
		}

		return result;
	});

	/**
	 * 조건부 연산자 (삼항 연산자)
	 * ex) {{ condition (eq 100 200) 'test1' 'test2' }}
	 */
	Handlebars.registerHelper( 'condition', function ( test, expression1, expression2 ) {
		return test? expression1 : expression2;
	});

	/**
	 * 연산자 helpers
	 * 주로 block형 helper의 연산자로 사용
	 * ex)
	 *      {{#if (or section1 section2)}} .. content {{/if}}
	 *      {{#if (or (eq section1 "foo")(ne section2 "bar"))}} .. content {{/if}}
	 */
	Handlebars.registerHelper({
		'eq': function ( v1, v2 ) {
			return v1 === v2;
		},
		'ne': function ( v1, v2 ) {
			return v1 !== v2;
		},
		'lt': function ( v1, v2 ) {
			return v1 < v2;
		},
		'gt': function ( v1, v2 ) {
			return v1 > v2;
		},
		'lte': function ( v1, v2 ) {
			return v1 <= v2;
		},
		'gte': function ( v1, v2 ) {
			return v1 >= v2;
		},
		'and': function ( v1, v2 ) {
			return v1 && v2;
		},
		'or': function ( v1, v2 ) {
			return v1 || v2;
		},
		'typeof': function ( v1, type ) {
			return typeof v1 == type;
		},
		/**
		 * Data Type 비교
		 * (Object, Array, String, Number, NaN, Null, Function, Date, Boolean, RegExp, Error, Element, Undefined, Color, Html) 지원
		 * ex) {{type value 'String'}}
		 */
		'type': function ( v1, type ) {
			var typeStr = $B.type( v1 );

			if ( typeStr === 'String' && /^(<[^<>]+>)[^<>]*(<[^<>]+>)*$/.test(v1) ) {
				//시작과 끝이 <tag> 형식만 인정
				typeStr = 'Html';
			}

			return typeStr === type;
		}
	});

	/**
	 * 값들중 하나의 값만 있어도 true
	 *  ex) {{isSome value1 value2}}
	 * @returns {Boolean}
	 */
	Handlebars.registerHelper( 'isSome', function () {
		var args = Array.prototype.slice.call( arguments ),
			options = args.pop();

		return _.some( args, function ( arg ) {
			return arg ? true : false;
		});
	});

	/**
	 * 모든 데이타가 비어있지 않으면 true반환, (null, undefined, {}, [], '')
	 *  ex) {{ isExist value1 value2 }}
	 * @returns {Boolean}
	 */
	Handlebars.registerHelper( 'isExist', function () {
		var args = Array.prototype.slice.call( arguments ),
			options = args.pop();

		return _.every( args, function ( arg ) {
			return !$B.isEmpty( arg )
		});
	});

	/**
	 * 모든 데이타가 비어있으면 true반환, (null, undefined, {}, [], '')
	 *  ex) {{ isEmpty value1 value2 }}
	 * @returns {Boolean}
	 */
	Handlebars.registerHelper( 'isEmpty', function () {
		var args = Array.prototype.slice.call( arguments ),
			options = args.pop();

		return _.every( args, function ( arg ) {
			return $B.isEmpty( arg )
		});
	});

	/**
	 * 모든 데이타가 숫자형이면 true반환, (500, '120', '-12.5')
	 * numberic 은 숫자형 문자 + 숫자
	 *  ex) {{ isNumberic value1 value2 }}
	 * @returns {Boolean}
	 */
	Handlebars.registerHelper( 'isNumberic', function () {
		var args = Array.prototype.slice.call( arguments ),
			options = args.pop();

		return _.every( args, function ( arg ) {
			return typeof arg === 'number' || ( typeof arg === 'string' && !/[^0-9.-]/.test(arg) );
		});
	});

	/**
	 * 비교데이타중 하나라도 같으면 true 반환
	 *  ex) {{ isContains rawData model1 model2 }}
	 * @returns {Boolean}
	 */
	Handlebars.registerHelper( 'isContains', function () {
		var args = Array.prototype.slice.call( arguments ),
			rawData = args.shift(),
			options = args.pop();

		return _.some( args, function ( arg ) {
			return rawData === arg;
		});
	});

	/**
	 * 리스트 안에 Object 의 property 와 해당 값이 하나라도 같으면 true 반환
	 *  ex) {{ findInObject array 'propName' value }}
	 * @param	{Array, Object}		obj
	 * @param	{String}			propName
	 * @param	{*}					value
	 * @returns {Boolean}
	 */
	Handlebars.registerHelper( 'findInObject', function ( obj, propName, value ) {
		var result = false;

		if ( typeof obj === 'object' && propName ) {
			result = _.some( obj, function ( ob ) {
				return ob[propName] === value;
			});
		}

		return result;
	});

	/**
	 * 해당 date가 새글의 기준 (24시간)이 되는지 체크
	 * @param	{String}		date
	 * @returns {Boolean}
	 */
	Handlebars.registerHelper( 'isNewArticle', function ( date ) {
		var now = AP.common.date(),
			end = moment( date ).add( 24, 'hours' );

		return moment( end ).isAfter( now );
	});


	/** ==================== Collections Helpers ==================== */

	/**
	 * 대상 배열 안에 Object에서 같은 propertyName과 value를 가진 Object 배열 반환
	 * ex) {{ where list propertyName value propertyName value }}
	 * @param	{Array}		list
	 * @param	{String}	propertyName
	 * @param	{String, Number}	value
	 * @returns {Array}
	 */
	Handlebars.registerHelper( 'where', function () {
		var args = Array.prototype.slice.call( arguments ),
			list = args.shift(),
			options = args.pop(),
			properties = {};

		for ( var i in args ) {
			var key = args.shift(),
				value = args.shift();

			properties[key] = value;
		}

		return _.isArray( list ) ? _.where( list, properties ) : [];
	});

	/**
	 * 대상 배열 안에 Object에서 같은 propertyName을 property value 배열 반환
	 * ex) {{ pluck list propertyName }}
	 * @param	{Array}		list
	 * @param	{String}	propertyName
	 * @returns {Array}
	 */
	Handlebars.registerHelper( 'pluck', function ( list, propertyName ) {
		return _.isArray( list ) ? _.pluck( list, propertyName ) : [];
	});

	/**
	 * 대상 배열 join 하여 문자열로 반환
	 * ex) {{ join list '/' }}
	 * @param	{Array}		list
	 * @param	{String}	str
	 * @returns {String}
	 */
	Handlebars.registerHelper( 'join', function ( list, str ) {
		return _.isArray( list ) ? list.join( str ) : '';
	});


	/** ==================== Block Type Helpers ==================== */

	/**
	 * 확장 if문, 연산자를 사용할수 있다. (==, ===, !=, !==, <, >, <=, >=, &&, ||)
	 * ex) {{#xif this.age ">=" 40}} true {{else}} false {{/xif}}
	 * 연산자 helpers 와 혼용하여 사용할수도 있다.
	 */
	Handlebars.registerHelper( 'xif', function ( lvalue, operator, rvalue, options ) {
		var operators, result;

		if ( arguments.length < 3 ) {
			throw new Error( 'Handlerbars Helper "compare" needs 2 parameters' );
		}

		if ( options === undefined ) {
			options = rvalue;
			rvalue = operator;
			operator = "===";
		}

		operators = {
			'==': function (l, r) { return l == r; },
			'===': function (l, r) { return l === r; },
			'!=': function (l, r) { return l != r; },
			'!==': function (l, r) { return l !== r; },
			'<': function (l, r) { return l < r; },
			'>': function (l, r) { return l > r; },
			'<=': function (l, r) { return l <= r; },
			'>=': function (l, r) { return l >= r; },
			'&&': function (l, r) { return l && r; },
			'||': function (l, r) { return l || r; }
		};

		if ( !operators[operator] ) {
			throw new Error( "'xif' doesn't know the operator " + operator );
		}

		result = operators[operator]( lvalue, rvalue );

		if ( result ) {
			return options.fn( this );
		} else {
			return options.inverse( this );
		}
	});

	/**
	 * 설정된 수치만큼 반복해 그리기, (for-index 지원)
	 */
	Handlebars.registerHelper( 'for', function ( length, options ) {
		var result = '';

		for ( var i = 0; i < length; ++i ) {
			result += options.fn( {'for-index': i} );
		}

		return result;
	});

	/** ==================== Format Helpers ==================== */

	/**
	 * 말줄임 (글자수 기준)
	 * @param {Number}  price
	 * @param {Int}     fractionSize  소수점 자리수, default:0
	 * @returns {String}
	 */
	Handlebars.registerHelper( 'ellipsis', function ( length, str ) {
		var result = '';

		if ( typeof str === 'string' || typeof str === 'number' ) {
			result = String( str );

			if ( result.length > length ) {
				result = result.substr( 0, length ) + '...';
			}
		} else {
			result = str;
		}

		return result;
	});

	/**
	 * 국가 기준으로 가격포멧에 맞춰 반환
	 * ex) 2,000원
	 * @param {Number}  price
	 * @param {Int}     fractionSize  소수점 자리수, default:0
	 * @returns {String}
	 */
	Handlebars.registerHelper( 'currencyFormat', function ( price, fractionSize ) {
		return AP.common.currencyFormat( price, fractionSize );
	});

	//numberFormat
	Handlebars.registerHelper( 'numberFormat', function ( num ) {
		return $B.string.numberFormat( num );
	});

	/**
	 * 날짜 표현식에 맞춰 날짜 표현식 설정
	 * @param   {String}    date
	 * @param   {String}    format  default:AP.DATE_FORMAT
	 * @returns {String}
	 */
	Handlebars.registerHelper( 'dateFormat', function ( date, format ) {
		return ( moment && (typeof date === 'string' || typeof date === 'number') )? moment( date ).format( (typeof format === 'string')? format : AP.DATE_FORMAT ) : date;
	});

	//숫자의 자리수 맞추기 ex) number:135, cipher:5 -> 00135
	Handlebars.registerHelper( 'numberCipher', function ( number, cipher ) {
		return number? $B.string.format( number, cipher || 0 ) : number;
	});

	/**
	 * 전화번호 03112345678 -> 031-1234-5678 형식으로 반환
	 * @param   {String}    phoneNumber
	 * @returns {String}
	 */
	Handlebars.registerHelper( 'phoneNumberFormat', function ( phoneNumber ) {
		return AP.common.phoneNumberFormat( phoneNumber );
	});

	/**
	 * 해당 url의 param을 병합하여 반환
	 * 	ex) {{ urlParam 'http://test.com/?param1=aa' 'param1' 'bb' 'param2' 200 }}
	 * 	-> http://test.com/?param1=bb&param2=200
	 * @param	{String}	url
	 * @param	{String}	propName	param 명
	 * @param	{String}	value		param value
	 * @returns {String}
	 */
	Handlebars.registerHelper( 'extendUrlParam', function () {
		var args = Array.prototype.slice.call( arguments ),
			pullUrl = args.shift(),
			options = args.pop(),
			result = '';

		if ( _.isString(pullUrl) && args.length ) {
			var urls = pullUrl.split( /\?|\#/ ),
				url = urls[0];

			result += url;

			//search
			if ( urls.length > 1 ) {
				var paramObj = {},
					search = urls[1];

				search.replace(/([^\&\=]+)\=([^\&\=]*)/g, function( str, prop, val ) {
					paramObj[prop] = val;
				});

				for ( var i in args ) {
					var prop = args.shift(),
						val = args.shift();

					paramObj[prop] = val;
				}

				result += '?';

				for ( var key in paramObj ) {
					result += key + '=' + paramObj[key] + '&';
				}

				result = result.replace( /\&$/, '' );

				//hash
				if ( urls.length > 2 ) {
					result += '#' + urls[2];
				}
			}
		}

		return result;
	});

	//modal size type className
	Handlebars.registerHelper( 'getModalSizeClassName', function ( type ) {
		var className = 'layer_md';

		if ( type === 'S' ) {
			className = 'layer_sm';
		} else if ( type === 'L' ) {
			className = 'layer_lg';
		} else if ( type === 'XL' ) {
			className = 'layer_xl';
		} else if ( type === 'FULL' ) {
			className = '';
		}

		return className;
	});

	//modal alert, confirm textAlign className
	Handlebars.registerHelper( 'getModalTextAlignClassName', function ( type ) {
		var className = 'text_center';

		if ( type === 'left' ) {
			className = 'text_left';
		} else if ( type === 'right' ) {
			className = 'text_right';
		}

		return className;
	});

	//\n문자를 <br>태그로 변환
	Handlebars.registerHelper( 'nl2br', function ( str ) {
		return typeof str === 'string'? str.replace( /\n/g, '<br>' ) : str;
	});

	//decodeURIComponent 문자 변환
	Handlebars.registerHelper( 'decodeURIComponent', function ( str ) {
		return typeof str === 'string'? decodeURIComponent( str ) : str;
	});


	/** ==================== 경로관련 Helpers ==================== */

	// "/pc/ko/" 가 빠진 path를 체크하여 해당경로를 추가해 준다.
	Handlebars.registerHelper( 'absolutePath', function ( path ) {
		return AP.common.absolutePath( path );
	});

	/**
	 * display article 상세 경로 생성 (DISPLAY_MENU_ID 가 존재하는 페이지 전용)
	 * @param	{Int}	articleSn
	 * @returns {String}
	 */
	Handlebars.registerHelper( 'articleDetailPath', function ( articleSn ) {
		return '/display/' + ( AP.DISPLAY_MENU_ID || '' ) + '/detail?articleSn=' + articleSn;
	});

	/**
	 * product 상세 경로 생성
	 * @param	{Int}	onlineProdSn
	 * @param	{Int}	prodSn
	 * @returns {String}
	 */
	Handlebars.registerHelper( 'productDetailPath', function ( onlineProdSn, prodSn ) {
		var path = '/product/detail';
		if ( !/[^0-9]/.test(onlineProdSn) ) path += '?onlineProdSn=' + onlineProdSn;
		if ( !/[^0-9]/.test(prodSn) ) path += ( /\?/.test(path) ? '&' : '?' ) + 'prodSn=' + prodSn;
		return path;
	});

	/**
	 * youtube 주소가 잘못들어 왔을시 보정하여 반환
	 * @param	{String}	youtubePath
	 * @returns {String}
	 */
	Handlebars.registerHelper( 'youtubePath', function ( youtubePath ) {
		var youtubeId = '';
		//https://www.youtube.com/embed/4uLivcdjRlc?enablejsapi=1

		if ( typeof youtubePath === 'string' ) {
			if ( /^https:\/\//i.test(youtubePath) ) {
				youtubeId = youtubePath.match( /[\/\=]([a-z0-9_\-]+)$/i );
				youtubeId = ( youtubeId && youtubeId.length > 1 )? youtubeId[1] : '';
			} else if ( /^[a-z0-9_\-]+$/i.test(path) ) {
				youtubeId = path;
			}
		}

		return 'https://www.youtube.com/embed/' + youtubeId + '?enablejsapi=1';
	});


	/** ====================  페이지에서 사용되는 Helpers ==================== */

	/**
	 * products.availablePrices 모델의 properties 중에 "currencyCode"의 맞도록 반환한다. (제품관련 model)
	 * @param	{Array}		availablePrices
	 * @param	{String}	propName
	 * @returns {*}
	 */
	Handlebars.registerHelper( 'availablePrices', function ( availablePrices, propName ) {
		return AP.common.availablePrices( availablePrices, propName );
	});

})( jQuery );
