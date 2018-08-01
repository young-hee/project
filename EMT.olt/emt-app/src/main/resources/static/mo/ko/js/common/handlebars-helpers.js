/**
 * Handlebars Helpers
 */
;(function ( $ ) {
    'use strict';

	/**
	 * 상품 상세 (온라인, 테이크)
	 * @returns {String}
	 */
	Handlebars.registerHelper('orderCheckState', function (condition) {
		return (condition) == 'on' ? '온라인' : '테이크';
	});

	/**
	 * 국가 기준으로 가격포멧에 맞춰 반환
	 * ex) 2,000
	 * @param {Number}  price
	 * @param {String}
	 * @returns {String}
	 */
	Handlebars.registerHelper( 'currencyFormatDefault', function ( price, str ) {
		var price = Number( price ),
			result = $B.string.numberFormat( price );

		return result + str;
	});

	Handlebars.registerHelper("ordSwitch", function(value, options) {
		switch (value) {
			case 'OrdReceivedWaiting' :
			case 'OrdReceivedComplete' :
			case 'PartialCancel' :
				this._switch_value_ = 'a';
				break;
			case 'Shipping' :
				this._switch_value_ = 'b';
				break;
			case 'ShipComplete' :
			case 'OrdHandlingComplete' :
				this._switch_value_ = 'c';
				break;
			case 'ProdCancel' :
				break;
			case 'ProdPreparing' :
				break;
		}
		var html = options.fn(this); // Process the body of the switch block
		delete this._switch_value_;
		return html;
	});

	Handlebars.registerHelper("ordCase", function(value, options) {
		if (value == this._switch_value_) {
			return options.fn(this);
		}
	});

	/**
	 * 주문배송 상태
	 * @returns {String}
	 */
	Handlebars.registerHelper('ordStatusCheck', function (type, condition) {
		if (type === 'online' || type === 'cashReceipts' || type === 'cancel') {
			switch (condition) {
				case 'OrdReceivedWaiting' :
					return '주문접수대기';
				case 'OrdReceivedComplete' :
					return '주문접수완료';
				case 'ProdCancel' :
					return '상품취소';
				case 'ProdPreparing' :
					return '상품준비중';
				case 'Shipping' :
					return '배송중';
				case 'ShipComplete' :
					return '배송완료';
				case 'PartialCancel' :
					return '부분취소';
				case 'OrdHandlingComplete' :
					return '배송완료'
				case 'OrdAllCancel' :
					return '전체취소';
			}
		}
		else if (type === 'store') {
			switch (condition) {
				case 'OrdReceivedWaiting' :
					return '주문접수대기';
				case 'OrdReceivedComplete' :
					return '주문접수완료';
				case 'ProdCancel' :
					return '상품취소';
				case 'ProdPreparing' :
					return '상품준비중';
				case 'Shipping' :
					return '배송중';
				case 'ShipComplete' :
					return '구매완료';
				case 'PartialCancel' :
					return '부분취소';
				case 'OrdHandlingComplete' :
					return '배송완료'
				case 'OrdAllCancel' :
					return '전체취소';
			}
		}
		else if (type === 'return' || type === 'exchange') {
			switch (condition) {
				case 'RtnReceivedComplete' :
					return '회수접수완료';
				case 'RtnCancel' :
					return '회수취소';
				case 'RtnPreparing' :
					return '회수준비';
				case 'Rtn' :
					return '회수중';
				case 'RtnComplete' :
					return '회수완료';
				case 'PartialCancel' :
					return '부분취소';
				case 'OrdHandlingComplete' :
					return '배송완료';
				case 'Exch' :
					return '교환중';
			}
		}
		else {
			return "UnKnown";
		}

		return 'UnKnown';
	});

	/**
	 * 마이 주문 관리 건수 체크
	 * @returns {String}
	 */
	Handlebars.registerHelper('ordCntCheck', function (condition) {
		return (condition - 1) == 0 ? '' : '외 ' + (condition - 1) + '건';
	});

    /**
     * 공지사항 체크
     * @returns {String}
     */
    Handlebars.registerHelper('important', function (condition) {
        return (condition) == 'Y' ? 'important' : '';
    });
    
    /**
     * radio checkbox 확인
     * @returns {String}
     */
    Handlebars.registerHelper('checkedIf', function (condition) {
        return (condition) == 'Y' ? 'checked' : '';
    });

	/**
	 * radio checkbox checked value
	 * @param {Object}  templateModel   template model
	 * @returns {String}
	 */
	Handlebars.registerHelper ('checkedValueIf', function (value, checkedValue) {
		return (value) == (checkedValue) ? 'checked' : '';
	});

	/**
	 * ex)
	 * {{#each names}}
	 * 		{{counter @index}}
	 * 		{{name}}
	 * {{/each}}
	 */
	Handlebars.registerHelper('counter', function (index){
		return parseInt(index) + 1;
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
	 * Switch
	 * ex) switch, case, default 참조예제
	 * {{#assign "testParam"}}foo{{/assign}}
	 * {{#switch testParam}}
	 *	    {{#case "boo"}}{{#assign "testParam"}}case1 has been met{{/assign}}{{/case}}
	 *	    {{#case "foo" break=true}}{{#assign "testParam"}}case2 has been met{{/assign}}{{/case}}
	 *	    {{#case "tried" break=true}}{{#assign "testParam"}}case3 has been met{{/assign}}{{/case}}
	 *	    {{#case "bwahahaha" break=true}}{{#assign "testParam"}}case4 has been met{{/assign}}{{/case}}
	 *	    {{#default break=true}}{{#assign "testParam"}}nothing matched{{/assign}}{{/default}}
	 *	{{/switch}}
	 */
	Handlebars.registerHelper("switch", function(value, options) {
		this._switch_value_ = value;
		this._switch_break_ = false;
		var html = options.fn(this);
		delete this._switch_break_;
		delete this._switch_value_;
		return html;
	});

	Handlebars.registerHelper("case", function(value, options) {
		var args = Array.prototype.slice.call(arguments);
		var options    = args.pop();
		var caseValues = args;

		if (this._switch_break_ || caseValues.indexOf(this._switch_value_) === -1) {
			return '';
		} else {
			if (options.hash.break === true) {
				this._switch_break_ = true;
			}
			return options.fn(this);
		}
	});

	Handlebars.registerHelper("default", function(options) {
		if (!this._switch_break_) {
			return options.fn(this);
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

	// 해쉬태그 관련  ex) test, test  -> #test #test
	Handlebars.registerHelper( 'toTagshape', function ( str ) {
		
		if ( _.isString(str) && str.length ) {
			
			var tags = str.split( ','); 
			 
			for(var i = 0; i < tags.length; i++){
				 if(i === 0){
					 str = '#'+ tags[i].trim();  
				 }else {
					 str += ' #'+ tags[i].trim();  
				 }
				
			}
		}
		return str;
	});
	
	/** ==================== 경로관련 Helpers ==================== */

	// "/mo/ko/" 가 빠진 path를 체크하여 해당경로를 추가해 준다.
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
	Handlebars.registerHelper( 'productDetailPath', function ( onlineProdSn, prodSn, detailInfoUse ) {
		var path = '/product/detail';
		if ( !/[^0-9]/.test(onlineProdSn) ) path += '?onlineProdSn=' + onlineProdSn;
		if ( !/[^0-9]/.test(prodSn) ) path += ( /\?/.test(path) ? '&' : '?' ) + 'prodSn=' + prodSn;
		if ( detailInfoUse ) path += ( /\?/.test(path) ? '&' : '?' ) + 'onlyProd=Y'; 
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


	/** MyPage *****************************************************************/

	Handlebars.registerHelper("channelSwitch", function(value) {
		var html = '';
		switch (value) {
			case 'all' :
				//App, 모바일웹, PC
				html = '<span class="app">APP 전용</span>\n' +
					'\t\t\t\t\t\t\t\t\t<span class="mobile"><span class="sr_only">모바일</span>전용</span>\n' +
					'\t\t\t\t\t\t\t\t\t<span class="pc"><span class="sr_only">PC 웹</span>전용</span>';
				break
			case 'onlyMW' :
				//모바일웹 전용
				html = '<span class="mobile"><span class="sr_only">모바일웹</span>전용</span>';
				break;
			case 'onlyMA' :
				//App 전용
				html = '<span class="app">APP 전용</span>';
				break;
			case 'exceptMW' :
				//App, PC
				html = '<span class="app">APP 전용</span>\n' +
					'\t\t\t\t\t\t\t\t\t<span class="pc">PC</span>';
				break;
			case 'exceptMA' :
				//모바일웹, PC
				html = '<span class="mobile"><span class="sr_only">모바일</span>전용</span>\n' +
					'\t\t\t\t\t\t\t\t\t<span class="pc"><span class="sr_only">PC 웹</span>전용</span>';
				break;
			case 'exceptPC' :
				//App, 모바일웹
				html = '<span class="app">APP 전용</span>\n' +
					'\t\t\t\t\t\t\t\t\t<span class="mobile"><span class="sr_only">모바일</span>전용</span>';
				break;
		}
		return html;
	});

	Handlebars.registerHelper("couponTypeBenefitSwitch", function(value) {
		var html = '';
		switch (value.couponBenefitTypeCode) {
			case 'ProdDc' :
				//상품할인쿠폰
				switch (value.prodDcCoupon.dcMethodCode) {
					case 'FixedRate' :
						//정률
						html = '<div class="benefit type2">\n' +
							'\t\t\t\t\t\t\t\t\t<p>' + value.prodDcCoupon.dcRate * 100 + '<em>%</em></p>\n' +
							'\t\t\t\t\t\t\t\t</div>';
						break;
					case 'FixedAmt' :
						//정액
						html = '<div class="benefit type3">\n' +
							'\t\t\t\t\t\t\t\t\t<p>' + value.prodDcCoupon.dcAmt + '<em>원</em></p>\n' +
							'\t\t\t\t\t\t\t\t</div>';
						break;
					case 'FlatPrice' :
						//균일가
						html = '<div class="benefit type3">\n' +
							'\t\t\t\t\t\t\t\t\t<p>' + value.prodDcCoupon.flatPrice + '<em>원</em></p>\n' +
							'\t\t\t\t\t\t\t\t</div>';
						break;
					default :
						break;
				}
				break
			case 'CartDc' :
				//장바구니할인쿠폰
				switch (value.cartDcCoupon.dcMethodCode) {
					case 'FixedRate' :
						//정률
						html = '<div class="benefit type2">\n' +
							'\t\t\t\t\t\t\t\t\t<p>' + value.cartDcCoupon.dcRate * 100 + '<em>%</em></p>\n' +
							'\t\t\t\t\t\t\t\t</div>';
						break;
					case 'FixedAmt' :
						//정액
						html = '<div class="benefit type3">\n' +
							'\t\t\t\t\t\t\t\t\t<p>' + value.cartDcCoupon.dcAmt + '<em>원</em></p>\n' +
							'\t\t\t\t\t\t\t\t</div>';
						break;
					case 'FlatPrice' :
						//균일가
						html = '<div class="benefit type3">\n' +
							'\t\t\t\t\t\t\t\t\t<p>' + value.cartDcCoupon.flatPrice + '<em>원</em></p>\n' +
							'\t\t\t\t\t\t\t\t</div>';
						break;
					default :
						break;
				}
				break;
			case 'MPlusN' :
				//M+N쿠폰
				html = '<div class="benefit type4">\n' +
					'\t\t\t\t\t\t\t\t\t<p>N<em><span class="sr_only">+</span></em>N</p>\n' +
					'\t\t\t\t\t\t\t\t</div>';
				break;
			case 'Buy1Get' :
				//Buy1Get쿠폰 - 100%  50%
				switch (value.buyOneGetCoupon.buy1getDcRate) {
					case 1 :
						html = '<div class="benefit type1">\n' +
							'\t\t\t\t\t\t\t\t\t<p>하나</p>\n' +
							'\t\t\t\t\t\t\t\t\t<p>더</p>\n' +
							'\t\t\t\t\t\t\t\t</div>';
						break;
					case 0.5 :
						html = '<div class="benefit type1">\n' +
							'\t\t\t\t\t\t\t\t\t<p>하나</p>\n' +
							'\t\t\t\t\t\t\t\t\t<p>반값</p>\n' +
							'\t\t\t\t\t\t\t\t</div>';
						break;
					default :
						break
				}
				break;
			case 'CartAward' :
				//장바구니증정쿠폰 - 사은품 증정
				html = '<div class="benefit type1">\n' +
					'\t\t\t\t\t\t\t\t\t<p>사은품</p>\n' +
					'\t\t\t\t\t\t\t\t\t<p>증정</p>\n' +
					'\t\t\t\t\t\t\t\t</div>';
				break;
			case 'ShipFeeFree' :
				//배송비무료쿠폰
				html = '<div class="benefit type1">\n' +
					'\t\t\t\t\t\t\t\t\t<p>배송비</p>\n' +
					'\t\t\t\t\t\t\t\t\t<p>무료</p>\n' +
					'\t\t\t\t\t\t\t\t</div>';
				break;
			default :
				break;
		}
		return html;
	});

	Handlebars.registerHelper("conditionSwitch", function(value) {
		var html = '';
		switch (value.couponBenefitTypeCode) {
			case 'ProdDc' :
				//상품할인쿠폰
				break;
			case 'CartDc' :
				//장바구니할인쿠폰 - 정액/정률
				if (value.cartDcCoupon.fromOrdAmt) {
					html = value.cartDcCoupon.fromOrdAmt+'원 이상 구매 시';
				}
				break;
			case 'MPlusN' :
				//M+N쿠폰
				break;
			case 'Buy1Get' :
				//Buy1Get쿠폰 - 100%  50%
				break;
			case 'CartAward' :
				//장바구니증정쿠폰 - 사은품 증정
				if (value.cartAwardCoupon.fromOrdAmt) {
					html = value.cartAwardCoupon.fromOrdAmt+'원 이상 구매 시';
				}
				break;
			case 'ShipFeeFree' :
				//배송비무료쿠폰
				break;
			default :
				break;
		}
		return html;
	});

	Handlebars.registerHelper("depositSwitch", function(price, unit) {
		var price = Number( price ),
			result = $B.string.numberFormat( Math.abs(price) ),
			html = '';

		if (price > 0) {
			html = '( <em> + </em> )' + result + unit;
		} else {
			html = "( - )" + result + unit;
		}
		return html;
	});

	Handlebars.registerHelper("depositTypeName", function(value) {
		var html = '';
		switch (value) {
			case 'Saving' :
				//적립:Saving
				html = '예치금 적립';
				break;
			case 'Transfer' :
				//출금:Transfer
				html = '예치금 출금';
				break;
			case 'Pay' :
				//사용:Pay
				html = '예치금 사용';
				break;
			case 'PayCancel' :
				//취소:PayCancel
				html = '예치금 취소';
				break;
			case 'ManualSaving' :
				html = '수동적립';
				break;
			case 'ManualDec' :
				html = '수동차감';
				break;
			default :
				html = '';
				break;
		}
		return html;
	});
	
	Handlebars.registerHelper("replaceImagePath", function(src, width, height) {
		return AP.common.replaceImagePath(src, width, height);
	});
})( jQuery );
