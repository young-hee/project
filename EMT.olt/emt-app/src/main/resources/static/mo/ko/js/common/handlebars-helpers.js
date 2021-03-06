/**
 * Handlebars Helpers
 */
;(function ( $ ) {
    'use strict';

	/**
	 * 특수문자 제거
	 * @returns {String}
	 */
	Handlebars.registerHelper('removeSC', function (no) {

		var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
		var r = no;
		if (regExp.test(no)) {
			r = no.replace(regExp, "");
		}

		return r;
	});

	/**
	 * 결제 수단명
	 * @returns {String}
	 */
	Handlebars.registerHelper('ordFreebiesCode', function (type, code) {
		if ('promo' == type) {
			switch (code) {
				case 'Prod': return '사은품/상품증정';
				case 'SpPrice': return '상품특가증정';
				case 'Coupon': return '쿠폰발급';
				case 'Point': return '포인트적립';
				case 'Giftcard': return '기프트카드증정';
			}
		}
		else if ('coupon' == type) {
			switch (code) {
				case 'ProdDc': return '상품할인쿠폰';
				case 'CartDc': return '장바구니할인쿠폰';
				case 'MPlusN': return 'M+N쿠폰';
				case 'Buy1Get': return 'Buy1Get쿠폰';
				case 'CartAward': return '장바구니증정쿠폰';
				case 'ShipFeeFree': return '배송비무료쿠폰';
			}
		}


		return '';
	});


	/**
	 * 교환 반품 체크박스 처리
	 * @returns {String}
	 */
	Handlebars.registerHelper('isDisabled', function (type, step, qty) {

		var retDisabled = "";


		if (((type == 'return' || type == 'exchange') && (step == 1 && qty == 0))) {
			retDisabled = "disabled";
		}

		// console.log(qty + retDisabled);
		return retDisabled;
	});


	/**
	 * 수량
	 * @returns {Integer}
	 */
	Handlebars.registerHelper('myOrdQty', function (prodType, prod, step, type, claimYn) {

		var qty = 0;
		if ('group' == prodType) {
			if ('Y' == claimYn) {
				qty = prod.claimQtySum;
			}
			else {
				if ('ProdCancel' == prod.ordHistProdStatusCode) {
					if (step == 1) {
						qty = prod.cancelQtySum;
					}
					else {
						qty = prod.claimQtySum;
					}
				}
				else {
					if (step == 2) {
						qty = prod.claimQtySum;
					}
					else {
						if (type == 'return' || type == 'exchange') {
							qty = prod.rtnRequestPossibleQtySum;
						}
						else {
							qty = (prod.ordQtySum - prod.cancelQtySum) - prod.claimQtySum;
						}
					}
				}
			}
		}
		else {
			if ('Y' === claimYn) {
				qty = prod.claimReceivedQty;
			}
			else {
				if ('ProdCancel' == prod.ordHistProdStatusCode) {
					if (step == 1)
						qty = prod.cancelQty;
					else
						qty = prod.claimReceivedQty;
				}
				else {
					if (step == 2) {
						qty = prod.claimReceivedQty;
					}
					else {
						if (type == 'return' || type == 'exchange') {
							qty = prod.rtnRequestPossibleQty;
						}
						else {
							qty = (prod.ordQty - prod.cancelQty) - prod.claimReceivedQty;
						}
					}

				}
			}
		}

		return qty;
	});

	/**
	 * 금액
	 * @returns {Integer}
	 */
	Handlebars.registerHelper('myOrdAmt', function (prodType, prod, step, claimYn) {

		var amt = 0;
		var qty = 0;
		if (prodType == null) {
			return Handlebars.helpers.currencyFormat(prod.finalOnlineSaleAmtPcur);
		}

		if ('Y' === claimYn) {
			qty = prod.claimReceivedQty;
		}
		else {
			if ('ProdCancel' == prod.ordHistProdStatusCode || step == 2) {
				qty = prod.cancelQty;
			}
			else {
				qty = (prod.ordQty - prod.cancelQty) - prod.claimReceivedQty;
			}
		}

		if ('b' == prodType) {
			amt = prod.exchMembership;
			return Handlebars.helpers.currencyFormatDefault((prod.exchMembership * qty), 'P');

		}
		else if ('a' == prodType) {
			amt = prod.exchActivityPoint;
			return Handlebars.helpers.currencyFormatDefault((prod.exchActivityPoint * qty), '알');
		}

		return amt * qty;
	});

	/**
	 * 결제 수단명
	 * @returns {String}
	 */
	Handlebars.registerHelper('payServiceCodeName', function (type) {
		switch (type) {
			case 'Deposit': return '예치금';
			case 'MembershipPoint': return '뷰티포인트';
			case 'ActivityPoint': return '진주알';
			case 'virtual-account': return '무통장 입금';
			case 'naverpay': return '네이버페이';
			case 'kakaopay': return '카카오페이';
			case 'credit-card': return '신용카드';
			case 'mobile-phone-pay': return '휴대폰결제';
			case 'payco': return '페이코';
			case 'bank-ac-transfer': return '실시간 계좌이체';
			case 'wpay': return '원터치 간편결제';

		}

		return '';
	});


	/**
	 * PG정보 출력
	 * pgPayEx.creditcardPayTypeCode
	 * pgPayEx.instPeriod
	 * pgPayEx.intFreeInstPeriod
	 *
	 * 일시불: 일시불
	 * 일반할부: 2개월
	 * 무이자할부: 무이자 2개월
	 * 부분무이자할부: 12개월(무이자 6개월)
	 *
	 * @returns {String}
	 */
	Handlebars.registerHelper('creditcardPayType', function (pgPayEx) {
		var html = "";
		switch (pgPayEx.creditcardPayTypeCode) {
			case 'LumpSum':
				html = '일시불';
			case 'Inst':
				html = pgPayEx.instPeriod ? pgPayEx.instPeriod + '개월' : "";
			case 'IntFreeInst':
				html = '무이자' + pgPayEx.instPeriod ? pgPayEx.instPeriod + '개월' : "";
			case 'PartIntFreeInst':
				html = pgPayEx.instPeriod ? pgPayEx.instPeriod + '개월' : "" + pgPayEx.intFreeInstPeriod ? "(" + pgPayEx.intFreeInstPeriod + ")" : "";
		}

		return html;
	});

	/**
	 * PG정보
	 * @returns {String}
	 */
	Handlebars.registerHelper('prodCaseName', function (type) {
		switch (type) {
			case 'FreeGift': return '증정 사은품';
			case 'Presale': return '예약판매상품';
			case 'SpPriceSale': return '특가판매상품';
		}

		return '';
	});

	/**
	 * 주문상세 포인트 반환
	 * @returns {Integer}
	 */
	Handlebars.registerHelper('prodPartial', function (path) {

		var paramData = [];
		var args = Array.prototype.slice.call( arguments ).slice(1, arguments.length),
			options = args.pop();
		var obj = {};
		var name = null;
		$.each(args, function (i, arg) {
			if ((i %= 2) == 0) {
				name = arg;
			}
			else {
				obj[name] = arg;
			}

		});

		return AP.common.getTemplate( path, obj, true );
	});

	/**
	 * 주문상세 포인트 반환
	 * @returns {Integer}
	 */
	Handlebars.registerHelper('getSavingPoint', function (map, key) {

		var value = map[key];
		return value != null ? value : 0;
	});

	/**
  	  * 판매 상태 이미지
  	  * @param {String}  saleDisplayStatus : OnSale(판매중) - OutOfStock(품절) - Exhaustion(조기소진) - WaitingSale(판매대기) - SuspendSale(판매일시중지) - EndSale(판매종료)
  	  * @param {String}  prodTypeCode
  	  * @returns {String}
  	  */
	 Handlebars.registerHelper( 'stockImg', function ( saleDisplayStatus, prodTypeCode ) {
		 var stockImg = '';
		 var txt = Handlebars.helpers.stockTxt( saleDisplayStatus, prodTypeCode );
		 if( txt.length > 0 ){
			 txt = txt.replace('[', "").replace(']', '');
		 }

		 switch(saleDisplayStatus){
		 case 'OnSale':			//판매중
			 stockImg = '';
			 break;
		 case 'OutOfStock':		//품절
		 case 'Exhaustion':		//조기소진
		 //case 'WaitingSale':	//판매대기
		 case 'SuspendSale':	//판매일시중지
		 case 'EndSale':		//판매종료
			 stockImg = '<div class="item_state out_of_stock">'+ txt +'</div>';
			 break;
		 }

		 return stockImg;
	 });

	 /**
  	  * 판매 상태 문구
  	  * @param {String}  saleDisplayStatus : OnSale(판매중) - OutOfStock(품절) - Exhaustion(조기소진) - WaitingSale(판매대기) - SuspendSale(판매일시중지) - EndSale(판매종료)
  	  * @param {String}  prodTypeCode
  	  * @returns {String}
  	  */
	 Handlebars.registerHelper( 'stockTxt', function ( saleDisplayStatus, prodTypeCode ) {
		 var stockTxt = '';

		 switch(saleDisplayStatus){
		 case 'OnSale':			//판매중
			 stockTxt = '';
			 if( prodTypeCode == 'Presale' ) stockTxt = '[예약판매중]';
			 break;
		 case 'OutOfStock':		//품절
			 stockTxt = '[일시품절]';
			 break;
		 case 'Exhaustion':		//조기소진
			 stockTxt = '[조기소진]';
			 break;
		 case 'WaitingSale':	//판매대기
			 stockTxt = '[곧 출시!]';
			 break;
		 case 'SuspendSale':	//판매일시중지
			 stockTxt = '[판매중지]';
			 break;
		 case 'EndSale':		//판매종료
			 stockTxt = '[판매종료]';
			 break;
		 }

		 return stockTxt;
	 });

	 /**
  	  * 판매 버튼 활성화
  	  * @param {String}  saleDisplayStatus : OnSale(판매중) - OutOfStock(품절) - Exhaustion(조기소진) - WaitingSale(판매대기) - SuspendSale(판매일시중지) - EndSale(판매종료)
  	  * @param {String}  prodTypeCode
  	  * @returns {String}
  	  */
	 Handlebars.registerHelper( 'stockBtn', function ( saleDisplayStatus, prodTypeCode ) {
		 var stockBtn = '';

		 switch(saleDisplayStatus){
		 case 'OnSale':			//판매중
			 stockBtn = '';
			 break;
		 case 'OutOfStock':		//품절
		 case 'Exhaustion':		//조기소진
		 case 'WaitingSale':	//판매대기
		 case 'SuspendSale':	//판매일시중지
		 case 'EndSale':		//판매종료
			 stockBtn = 'disabled';
			 break;
		 }

		 return stockBtn;
	 });

	/**
	 * 장바구니 판매 상태정보
	 * @param {String}  saleDisplayStatus : OutOfStock(품절) - Exhaustion(조기소진) - WaitingSale(판매대기) - SuspendSale(판매일시중지) - EndSale(판매종료)
	 * @param {String}  prodTypeCode
	 * @returns {String}
	 */
	Handlebars.registerHelper( 'cartStatusTxt', function ( saleDisplayStatus) {
		var statusTxt = '';
		switch(saleDisplayStatus){
			case 'OutOfStock':		//품절
				statusTxt = '[일시품절]';
				break;
			case 'Exhaustion':		//조기소진
				statusTxt = '[조기소진]';
				break;
			case 'WaitingSale':		//판매대기
				statusTxt = '[판매대기]';
				break;
			case 'EndSale':			//판매종료
				statusTxt = '[판매종료]';
				break;
			case 'SuspendSale':		//판매일시중지
				statusTxt = '[판매일시중지]';
				break;
			case 'WaitingDisplay':	//판매대기
				statusTxt = '[판매대기]';
				break;
			case 'EndDisplay':		//판매종료
				statusTxt = '[판매종료]';
				break;
			case 'PermanentEnd':	//영구종료
				statusTxt = '[영구종료]';
				break;
		}
		return statusTxt;
	});

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
					return '주문접수';
				case 'OrdReceivedComplete' :
				case 'PartialCancel' :
					return '결제완료';
				case 'ProdCancel' :
					return '상품취소';
				case 'ProdPreparing' :
					return '상품준비중';
				case 'Shipping' :
					return '배송중';
				case 'ShipComplete' :
					return '배송완료';
				case 'OrdHandlingComplete' :
					return '배송완료'
				case 'OrdAllCancel' :
					return '취소완료';
			}
		}
		else if (type === 'store') {
			switch (condition) {
				case 'OrdReceivedWaiting' :
					return '주문접수';
				case 'OrdReceivedComplete' :
				case 'PartialCancel' :
					return '결제완료';
				case 'ProdCancel' :
					return '상품취소';
				case 'ProdPreparing' :
					return '상품준비중';
				case 'Shipping' :
					return '배송중';
				case 'ShipComplete' :
					return '구매완료';
				case 'OrdHandlingComplete' :
					return '배송완료'
				case 'OrdAllCancel' :
					return '취소완료';
			}
		}
		else if (type === 'Rtn' || type === 'Exch' ||
			type === 'return' || type === 'exchange' || type == 'returnExchange') {
			var t = (type == 'Rtn') ? '반품' : '교환';
			switch (condition) {
				case 'Request' :
					return t + '신청';
				case 'CancelRequest' :
					return t + '신청취소';
				case 'Received' :
					return t + '접수';
				case 'CancelReceived' :
					return t + '접수취소';
				case 'Confirm' :
					return t + '확정';
				case 'Complete' :
					return t + '완료';
				// case 'RtnReceivedComplete' :
				// 	return '회수접수완료';
				// case 'RtnCancel' :
				// 	return '회수취소';
				// case 'RtnPreparing' :
				// 	return '회수준비';
				// case 'Rtn' :
				// 	return '회수중';
				// case 'RtnComplete' :
				// 	return '회수완료';
				// case 'PartialCancel' :
				// 	return '결제완료';
				// case 'OrdHandlingComplete' :
				// 	return '배송완료';
				// case 'Exch' :
				// 	return '교환중';
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
		if ( detailInfoUse ) path += ( /\?/.test(path) ? '&' : '?' ) + 'onlyProd=N';
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

		return 'https://www.youtube.com/embed/' + youtubeId + '?enablejsapi=1&autoplay=0&rel=0&showsearch=0&loop=0';
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

	Handlebars.registerHelper("channelSwitch", function(availCh) {
		var html = '';

		if (availCh != null) {
			switch (availCh) {
				case 'all' :
					//App, 모바일웹, PC
					html = '<span class="all">PC/모바일/APP</span>';
					break;
				case 'onlyMW' :
					//모바일웹 전용
					html = '<span class="mobile">모바일 전용</span>';
					break;
				case 'onlyMA' :
					//App 전용
					html = '<span class="app">APP 전용</span>';
					break;
				case 'onlyPC' :
					//PC 전용
					html = '<span class="pc">PC 전용</span>';
					break;
				case 'exceptMW' :
					//App, PC
					html = '<span class="pa">PC/APP 전용</span>';
					break;
				case 'exceptMA' :
					//모바일웹, PC
					html = '<span class="pm">PC/APP 전용</span>';
					break;
				case 'exceptPC' :
					//App, 모바일웹
					html = '<span class="ma">모바일/APP 전용</span>';
					break;
			}
		}
		return html;
	});

	Handlebars.registerHelper("couponTypeBenefitSwitch", function(coupon, finalExpExpectedDt) {
		var html = '';
		if (arguments.length > 2) {
			finalExpExpectedDt =
				( moment && (typeof finalExpExpectedDt === 'string' || typeof finalExpExpectedDt === 'number') )? moment( finalExpExpectedDt ).format( (typeof 'YYYY-MM-DD' === 'string')? 'YYYY-MM-DD' : AP.DATE_FORMAT ) : finalExpExpectedDt;
		}

		if (coupon != null && coupon.couponBenefitTypeCode != null) {
			switch (coupon.couponBenefitTypeCode) {
				case 'ProdDc' :
					//상품할인쿠폰
					switch (coupon.prodDcCoupon.dcMethodCode) {
						case 'FixedRate' :
							//정률
							html = '<div class="benefit type2">\n' +
								'\t\t\t\t\t\t\t\t\t<p>' + coupon.prodDcCoupon.dcRate * 100 + '<em>%</em></p>\n' +
								'\t\t\t\t\t\t\t\t\t<span class="sub">할인</span>   \n';
								if (arguments.length > 2) {
									html += '\t\t\t\t\t\t\t\t\t<span class=\"date\">~' + finalExpExpectedDt + '</span> \t\t\t\t\t\t\t\t\t\n';
								}
								html += '\t\t\t\t\t\t\t\t</div>';
							break;
						case 'FixedAmt' :
							//정액
							html = '<div class="benefit type3">\n' +
								'\t\t\t\t\t\t\t\t\t<p>' + coupon.prodDcCoupon.dcAmt + '<em>원</em></p>\n' +
								'\t\t\t\t\t\t\t\t\t<span class="sub">할인</span>   \n';
								if (arguments.length > 2) {
									html += '\t\t\t\t\t\t\t\t\t<span class=\"date\">~' + finalExpExpectedDt + '</span> \t\t\t\t\t\t\t\t\t\n';
								}
								html += '\t\t\t\t\t\t\t\t</div>';
							break;
						case 'FlatPrice' :
							//균일가
							html = '<div class="benefit type3">\n' +
								'\t\t\t\t\t\t\t\t\t<p>' + coupon.prodDcCoupon.flatPrice + '<em>원</em></p>\n' +
								'\t\t\t\t\t\t\t\t\t<span class="sub">균일가</span>   \n';
								if (arguments.length > 2) {
									html += '\t\t\t\t\t\t\t\t\t<span class=\"date\">~' + finalExpExpectedDt + '</span> \t\t\t\t\t\t\t\t\t\n';
								}
								html += '\t\t\t\t\t\t\t\t</div>';
							break;
						default :
							break;
					}
					break;
				case 'CartDc' :
					//장바구니할인쿠폰
					switch (coupon.cartDcCoupon.dcMethodCode) {
						case 'FixedRate' :
							//정률
							html = '<div class="benefit type2">\n' +
								'\t\t\t\t\t\t\t\t\t<p>' + coupon.cartDcCoupon.dcRate * 100 + '<em>%</em></p>\n' +
								'\t\t\t\t\t\t\t\t\t<span class="sub">할인</span>   \n' ;
								if (arguments.length > 2) {
									html += '\t\t\t\t\t\t\t\t\t<span class=\"date\">~' + finalExpExpectedDt + '</span> \t\t\t\t\t\t\t\t\t\n';
								}
								html += '\t\t\t\t\t\t\t\t</div>';
							break;
						case 'FixedAmt' :
							//정액
							html = '<div class="benefit type3">\n' +
								'\t\t\t\t\t\t\t\t\t<p>' + coupon.cartDcCoupon.dcAmt + '<em>원</em></p>\n' +
								'\t\t\t\t\t\t\t\t\t<span class="sub">할인</span>   \n';
								if (arguments.length > 2) {
									html += '\t\t\t\t\t\t\t\t\t<span class=\"date\">~' + finalExpExpectedDt + '</span> \t\t\t\t\t\t\t\t\t\n';
								}
								html += '\t\t\t\t\t\t\t\t</div>';
							break;
						case 'FlatPrice' :
							//균일가
							html = '<div class="benefit type3">\n' +
								'\t\t\t\t\t\t\t\t\t<p>' + coupon.cartDcCoupon.flatPrice + '<em>원</em></p>\n' +
								'\t\t\t\t\t\t\t\t\t<span class="sub">균일가</span>   \n';
								if (arguments.length > 2) {
									html += '\t\t\t\t\t\t\t\t\t<span class=\"date\">~' + finalExpExpectedDt + '</span> \t\t\t\t\t\t\t\t\t\n';
								}
								html += '\t\t\t\t\t\t\t\t</div>';
							break;
						default :
							break;
					}
					break;
				case 'MPlusN' :
					//M+N쿠폰
					html = '<div class="benefit type4">\n' +
						'\t\t\t\t\t\t\t\t\t<p>' + coupon.mplusnCoupon.baseOrdQty + '<em><span class="sr_only">+</span></em>' + coupon.mplusnCoupon.freeAwardQty + '</p>\n' +
						'\t\t\t\t\t\t\t\t</div>';
					break;
				case 'Buy1Get' :
					//Buy1Get쿠폰 - 100%  50%
					switch (coupon.buyOneGetCoupon.buy1getDcRate) {
						case 1 :
							html = '<div class="benefit type1">\n' +
								'\t\t\t\t\t\t\t\t\t<p>하나</p>\n' +
								'\t\t\t\t\t\t\t\t\t<p>더</p>\n' ;
								if (arguments.length > 2) {
									html += '\t\t\t\t\t\t\t\t\t<span class=\"date\">~' + finalExpExpectedDt + '</span> \t\t\t\t\t\t\t\t\t\n';
								}
								html += '\t\t\t\t\t\t\t\t</div>';
							break;
						case 0.5 :
							html = '<div class="benefit type1">\n' +
								'\t\t\t\t\t\t\t\t\t<p>하나</p>\n' +
								'\t\t\t\t\t\t\t\t\t<p>반값</p>\n';
								if (arguments.length > 2) {
									html += '\t\t\t\t\t\t\t\t\t<span class=\"date\">~' + finalExpExpectedDt + '</span> \t\t\t\t\t\t\t\t\t\n';
								}
								html += '\t\t\t\t\t\t\t\t</div>';
							break;
						default :
							break;
					}
					break;
				case 'CartAward' :
					//장바구니증정쿠폰 - 사은품 증정
					html = '<div class="benefit type1">\n' +
						'\t\t\t\t\t\t\t\t\t<p>사은품</p>\n' +
						'\t\t\t\t\t\t\t\t\t<p>증정</p>\n';
						if (arguments.length > 2) {
							html += '\t\t\t\t\t\t\t\t\t<span class=\"date\">~' + finalExpExpectedDt + '</span> \t\t\t\t\t\t\t\t\t\n';
						}
						html += '\t\t\t\t\t\t\t\t</div>';
					break;
				case 'ShipFeeFree' :
					//배송비무료쿠폰
					html = '<div class="benefit type1">\n' +
						'\t\t\t\t\t\t\t\t\t<p>배송비</p>\n' +
						'\t\t\t\t\t\t\t\t\t<p>무료</p>\n';
						if (arguments.length > 2) {
							html += '\t\t\t\t\t\t\t\t\t<span class=\"date\">~' + finalExpExpectedDt + '</span> \t\t\t\t\t\t\t\t\t\n';
						}
						html += '\t\t\t\t\t\t\t\t</div>';
					break;
				default :
					break;
			}
		}
		return html;
	});

	Handlebars.registerHelper("conditionSwitch", function(coupon) {
		var html = '';

		if (coupon != null && coupon.couponBenefitTypeCode != null) {
			switch (coupon.couponBenefitTypeCode) {
				case 'ProdDc' :
					//상품할인쿠폰
					//html = '상품쿠폰';
					if (coupon.prodDcCoupon.maxDcAmt > 0) {
						html = '최대' + coupon.prodDcCoupon.maxDcAmt + '원 활인';
					}
					break;
				case 'CartDc' :
					//장바구니할인쿠폰 - 정액/정률
					//html = '장바구니쿠폰';
					if (coupon.cartDcCoupon.fromOrdAmt > 0 ) {
						html = coupon.cartDcCoupon.fromOrdAmt + '원 이상 구매 시';
					} else if (coupon.cartDcCoupon.fromOrdQty > 0) {
						html = coupon.cartDcCoupon.fromOrdQty + '개 이상 구매 시';
					}
					break;
				case 'MPlusN' :
					//M+N쿠폰
					html = coupon.mplusnCoupon.baseOrdQty + ' + ' + coupon.mplusnCoupon.freeAwardQty;
					break;
				case 'Buy1Get' :
					//Buy1Get쿠폰 - 100%  50%
					switch (coupon.buyOneGetCoupon.buy1getDcRate) {
						case 1 :
							html = '하나 더';
							break;
						case 0.5 :
							html = '하나 반값';
							break;
						default :
							break;
					}
					break;
				case 'CartAward' :
					//장바구니증정쿠폰 - 사은품 증정
					//html = '사은품증정쿠폰';
					if (coupon.cartAwardCoupon.fromOrdAmt > 0 ) {
						html = coupon.cartAwardCoupon.fromOrdAmt + '원 이상 구매 시';
					} else if (coupon.cartAwardCoupon.fromOrdQty > 0) {
						html = coupon.cartAwardCoupon.fromOrdQty + '개 이상 구매 시';
					}
					break;
				case 'ShipFeeFree' :
					//배송비무료쿠폰
					html = '배송비무료쿠폰';
					break;
				default :
					break;
			}
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

		if (value != null) {
			switch (value) {
				case 'Saving' :
					//적립:Saving
					html = '적립';
					break;
				case 'Transfer' :
					//출금:Transfer
					html = '출금';
					break;
				case 'Pay' :
					//사용:Pay
					html = '사용';
					break;
				case 'ManualSaving' :
					html = '수동적립';
					break;
				case 'ManualDec' :
					html = '수동차감';
					break;
				case 'PayCancel' :
					html = '사용취소';
					break;
				default :
					html = '';
					break;
			}
		}
		return html;
	});

	Handlebars.registerHelper("replaceImagePath", function(src, width, height) {
		return AP.common.replaceImagePath(src, width, height);
	});


	/***********************************************************************
	 * 주문서 helper
	 */

	/**
	 * 진행주체코드
	 */
	Handlebars.registerHelper("marketingOrg", function(value) {
		var html = '';

		if (value != null) {
			switch (value) {
				case 'Online' :
					html = '온라인 전용';
					break;
				case 'IntergrationCampaign' :
					html = '통합 쿠폰';
					break;
				//case 'Co' :
				//	html = '입점업체';
				//	break;
				case 'POS' :
					html = '오프라인 전용';
					break;
				default :
					html = '온라인 전용';
					break;
			}
		}
		return html;
	});

	/**
	 * 보유한 쿠폰 목록
	 */
	Handlebars.registerHelper("couponBenefitTypeCodeSwitch", function(value) {

		var html = '';
		if (value != null && value.couponBenefitTypeCode != null) {
			switch (value.couponBenefitTypeCode) {
				case 'ProdDc' :
					//상품할인쿠폰
					switch (value.dcMethodCode) {
						case 'FixedRate' :
							//정률
							html = '<strong class="num">' + value.dcRate * 100 + '%</strong> 할인';
							break;
						case 'FixedAmt' :
							//정액
							html = '<strong class="num">' + value.dcAmt + '</strong> 원';
							break;
						case 'FlatPrice' :
							//균일가
							html = '<strong class="num">' + value.flatPrice + '</strong> 원';
							break;
						default :
							break;
					}
					break;
				case 'CartDc' :
					//장바구니할인쿠폰 - 정액/정률
					switch (value.dcMethodCode) {
						case 'FixedRate' :
							//정률
							html = '<strong class="num">' + value.dcRate * 100 + '%</strong> 할인';
							break;
						case 'FixedAmt' :
							//정액
							html = '<strong class="num">' + value.dcAmt + '</strong> 원';
							break;
						case 'FlatPrice' :
							//균일가
							html = '<strong class="num">' + value.flatPrice + '</strong> 원';
							break;
						default :
							break;
					}
					break;
					break;
				case 'MPlusN' :
					//M+N쿠폰
					html = '<strong class="num">' + value.mPlusNBaseOrdQty + ' + ' + value.mPlusNFreeAwardQty + '</strong>';
					break;
				case 'Buy1Get' :
					//Buy1Get쿠폰 - 100%  50%
					switch (value.buy1getDcRate) {
						case 1 :
							html = '하나 <strong class="num">더</strong>';
							break;
						case 0.5 :
							html = '하나 <strong class="num">반값</strong>';
							break;
						default :
							break;
					}
					break;
				case 'CartAward' :
					//장바구니증정쿠폰 - 사은품 증정
					//html = '사은품 증정';
					if (value.couponAwardExList > 0) {
						$.each(value.couponAwardExList, function (index, item) {
							if (item.awardTgtCode == 'Prod' || item.awardTgtCode == 'SpPrice') {
								html += item.prodName +"/";
							}
							if (item.awardTgtCode == 'Point') {
								html += item.applySavingPoint + "P";
							}
						});
						html += '<strong class="num">증정</strong>'
					} else {
						html = '사은품<strong class="num">증정</strong>';
					}
					break;
				case 'ShipFeeFree' :
					//배송비무료쿠폰
					html = '배송비<strong class="num">무료</strong>';
					break;
				default :
					break;
			}
		}
		return html;
	});

	/**
	 * 적용한 쿠폰목록
	 */
	Handlebars.registerHelper("couponBenefitTypeCodeSwitchWithRemove", function(value) {

		var html = "",
			hb = '<span class="price">\n' +
			'\t\t\t<strong class="num">',
			info = "",
			ha = '</strong>\n' +
			'\t\t</span>\t';

		if (value != null && value.couponBenefitTypeCode != null) {
			switch (value.couponBenefitTypeCode) {
				case 'ProdDc' :
					//상품할인쿠폰
					switch (value.dcMethodCode) {
						case 'FixedRate' :
							//정률
							info = value.dcRate * 100 + '% 할인';
							break;
						case 'FixedAmt' :
							//정액
							info = value.dcAmt + '원';
							break;
						case 'FlatPrice' :
							//균일가
							info = value.flatPrice + '원';
							break;
						default :
							break;
					}
					html = hb + info + ha;
					break;
				case 'CartDc' :
					//장바구니할인쿠폰 - 정액/정률
					switch (value.dcMethodCode) {
						case 'FixedRate' :
							//정률
							info = value.dcRate * 100 + '% 할인';
							break;
						case 'FixedAmt' :
							//정액
							info = value.dcAmt + '원';
							break;
						case 'FlatPrice' :
							//균일가
							info = value.flatPrice + '원';
							break;
						default :
							break;
					}
					html = hb + info + ha;
					break;
				case 'MPlusN' :
					//M+N쿠폰
					info = value.mPlusNBaseOrdQty + ' + ' + value.mPlusNFreeAwardQty;
					html = hb + info + ha;
					break;
				case 'Buy1Get' :
					//Buy1Get쿠폰 - 100%  50%
					switch (value.buy1getDcRate) {
						case 1 :
							info = '하나 더';
							break;
						case 0.5 :
							info = '하나 반값';
							break;
						default :
							break;
					}
					html = hb + info + ha;
					break;
				case 'CartAward' :
					//장바구니증정쿠폰 - 사은품 증정
					//html = '사은품 증정';
					if (value.couponAwardExList.length > 0) {
						$.each(value.couponAwardExList, function (index, item) {
							if (item.awardTgtCode == 'Prod' || item.awardTgtCode == 'SpPrice') {
								info = item.prodName;
							}
							if (item.awardTgtCode == 'Point') {
								info = item.applySavingPoint + "P";
							}
							html += hb + info + ha;
						});
					} else {
						info = '사은품 증정';
						html = hb + info + ha;
					}
					break;
				case 'ShipFeeFree' :
					//배송비무료쿠폰
					info = '배송비 무료';
					html = hb + info + ha;
					break;
				default :
					break;
			}
		}

		return html;
	});

	/**
	 * 다운 가능한 쿠폰
	 */
	Handlebars.registerHelper("downloadCouponBenefitTypeCodeSwitch", function(value) {

		var html = '';
		if (value != null && value.couponBenefitTypeCode != null) {
			switch (value.couponBenefitTypeCode) {
				case 'ProdDc' :
					//상품할인쿠폰
					switch (value.prodDcCoupon.dcMethodCode) {
						case 'FixedRate' :
							//정률
							html = '<strong class="num">' + value.prodDcCoupon.dcRate * 100 + '%</strong> 할인';
							break;
						case 'FixedAmt' :
							//정액
							html = '<strong class="num">' + value.prodDcCoupon.dcAmt + '</strong> 원';
							break;
						case 'FlatPrice' :
							//균일가
							html = '<strong class="num">' + value.prodDcCoupon.flatPrice + '</strong> 원';
							break;
						default :
							break;
					}
					break;
				case 'CartDc' :
					//장바구니할인쿠폰 - 정액/정률
					switch (value.cartDcCoupon.dcMethodCode) {
						case 'FixedRate' :
							//정률
							html = '<strong class="num">' + value.cartDcCoupon.dcRate * 100 + '%</strong> 할인';
							break;
						case 'FixedAmt' :
							//정액
							html = '<strong class="num">' + value.cartDcCoupon.dcAmt + '</strong> 원';
							break;
						case 'FlatPrice' :
							//균일가
							html = '<strong class="num">' + value.cartDcCoupon.flatPrice + '</strong> 원';
							break;
						default :
							break;
					}
					break;
					break;
				case 'MPlusN' :
					//M+N쿠폰
					html = '<strong class="num">' + value.mplusnCoupon.mPlusNBaseOrdQty + ' + ' + value.mplusnCoupon.mPlusNFreeAwardQty + '</strong>';
					break;
				case 'Buy1Get' :
					//Buy1Get쿠폰 - 100%  50%
					switch (value.buyOneGetCoupon.buy1getDcRate) {
						case 1 :
							html = '하나 <strong class="num">더</strong>';
							break;
						case 0.5 :
							html = '하나 <strong class="num">반값</strong>';
							break;
						default :
							break;
					}
					break;
				case 'CartAward' :
					//장바구니증정쿠폰 - 사은품 증정
					//html = '사은품 증정';
					if (value.cartAwardCoupon.couponAwardExList > 0) {
						$.each(value.cartAwardCoupon.couponAwardExList, function (index, item) {
							if (item.awardTgtCode == 'Prod' || item.awardTgtCode == 'SpPrice') {
								html += item.prodName +"/";
							}
							if (item.awardTgtCode == 'Point') {
								html += item.applySavingPoint + "P";
							}
						});
						html += '<strong class="num">증정</strong>'
					} else {
						html = '사은품<strong class="num">증정</strong>';
					}
					break;
				case 'ShipFeeFree' :
					//배송비무료쿠폰
					html = '배송비<strong class="num">무료</strong>';
					break;
				default :
					break;
			}
		}
		return html;
	});

	/**
	 * 결제금액 0보다 크면 true
	 * {{checkAmtMapPrice ordAmtMap 'OnlineShipProd'}}
	 */
	Handlebars.registerHelper('checkAmtMapPrice', function (map, key) {
		var price = 0;
		if (map != null && key != null) {
			Object.keys( map ).map(function( prop ) {
				if (prop == key) {
					price = Number(map[ prop ]);
				}
			});
		}
		return price > 0;
	});

	/**
	 * Formatting된 결제금액 Map Helper
	 * {{getAmtMapPrice ordAmtMap 'OnlineShipProd' '원'}}
	 */
	Handlebars.registerHelper('getAmtMapPrice', function (map, key, str) {
		var price = null;
		if (map != null && key != null) {
			Object.keys( map ).map(function( prop ) {
				if (prop == key) {
					price = $B.string.numberFormat( Number(map[ prop ]) );
				}
			});
		}
		return price + str;
	});

	/**
	 * 주문수량 Map Helper
	 * {{getCntMap ordCntMap 'OnlineShipProd'}}
	 */
	Handlebars.registerHelper('getCntMap', function (map, key) {
		var cnt = null;
		if (map != null && key != null) {
			Object.keys( map ).map(function( prop ) {
				if (prop == key) {
					cnt = Number(map[ prop ]);
				}
			});
		}
		return cnt;
	});
})( jQuery );
