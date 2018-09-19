/**
 * jquery.validate 공통설정
 */
;(function( $ ) {
	'use strict';

	/** ==================== Rule Methods ==================== */

	//필수항목
//	$.validator.addMethod( 'required', $.validator.methods.required, '필수입력 항목 입니다.' );
	$.validator.addMethod( 'required', function ( value, element, param ) {
		value = $.trim(value);
		return value != null && value != "" && value != undefined;
	}, '필수입력 항목 입니다.' );

	//최소갯수
	$.validator.addMethod( 'minlength', $.validator.methods.minlength, '최소 {0}자이상 입력해야 합니다.' );
	//최대갯수
	$.validator.addMethod( 'maxlength', $.validator.methods.maxlength, '최대 {0}자만 입력 가능합니다.' );
	//최소+최대 갯수
	$.validator.addMethod( 'rangelength', $.validator.methods.rangelength, '{0}자에서 {1}자를 입력해야 합니다.' );
	//최소수치
	$.validator.addMethod( 'min', $.validator.methods.min, '{0}보다 큰값을 입력해야 합니다.' );
	//최대수치
	$.validator.addMethod( 'max', $.validator.methods.max, '{0}보다 작은값을 입력해야 합니다.' );
	//최소+최대 수치
	$.validator.addMethod( 'range', $.validator.methods.range, '{0}보다 크고 {1}보다 작은 값을 입력해야 합니다.' );
	//email
	$.validator.addMethod( 'email', $.validator.methods.email, '유효한 email 형식이 아닙니다.' );
	//음수, 양수, 소수
	$.validator.addMethod( 'number', $.validator.methods.number, '숫자형식만 입력 가능합니다' );
	//숫자형식 (0~9)
	$.validator.addMethod( 'digits', $.validator.methods.digits, '숫자만 입력 가능합니다.' );

	// Older "accept" file extension method.
	$.validator.addMethod( 'extension', function ( value, element, param ) {
		var defaultExtension = 'png,jpe?g,gif';
		param = typeof param === 'string' ? param : defaultExtension;
		param = param.replace( /\W*\,\W*/g, '|' );
		return this.optional( element ) || value.match( new RegExp('\\.(' + param + ')$', 'i') );
	}, '{0} 확장자만 선택 가능합니다.' );

	//글자수 제한
	$.validator.addMethod( 'length', function ( value, element, param ) {
		return this.optional( element ) || String( value ).length == param;
	}, '{0} 자를 입력해야 합니다.' );

	//최소 byte 제한
	$.validator.addMethod( 'min-byte', function ( value, element, param ) {
		return this.optional( element ) || AP.common.getByteLength( value ) >= param;
	}, '최소 {0}byte 이상 입력해야 합니다.' );

	//최대 byte 제한
	$.validator.addMethod( 'max-byte', function ( value, element, param ) {
		return this.optional( element ) || AP.common.getByteLength( value ) <= param;
	}, '최대 {0}byte 까지 입력가능 합니다.' );

	//유효한 날짜형식
	$.validator.addMethod( 'date', function ( value, element, param ) {
		return this.optional( element ) || moment( value, AP.DATE_FORMAT, true ).isValid();
	}, '유효한 날짜형식이 아닙니다.' );

	//최소 선택일 ("mindate"속성은 인식하지 못함)
	$.validator.addMethod( 'least-date', function ( value, element, param ) {
		return this.optional( element ) || !moment( param, 'YYYY-MM-DD' ).isAfter( moment(value, 'YYYY-MM-DD') );
	}, '{0} 이전 날짜는 선택이 불가능합니다.' );

	//최대 선택일 ("maxdate"속성은 인식하지 못함)
	$.validator.addMethod( 'biggest-date', function ( value, element, param ) {
		return this.optional( element ) || !moment( param, 'YYYY-MM-DD' ).isBefore( moment(value, 'YYYY-MM-DD') );
	}, '{0} 이후 날짜는 선택이 불가능합니다.' );

	//최소~최대 선택일
	$.validator.addMethod( 'range-date', function ( value, element, param ) {
		var dates = param.split( ',' ),
			result = false;

		if ( _.isArray(dates) && dates.length > 1 ) {
			var minDate = $B.string.trim( dates[0] ),
				maxDate = $B.string.trim( dates[1] );

			if ( moment(minDate, 'YYYY-MM-DD', true).isValid() && moment(maxDate, 'YYYY-MM-DD', true).isValid() ) {
				result = !moment(minDate, 'YYYY-MM-DD').isAfter(moment(value, 'YYYY-MM-DD')) && !moment(maxDate, 'YYYY-MM-DD').isBefore(moment(value, 'YYYY-MM-DD'));
			}
		}

		return this.optional( element ) || result;
	}, '{0} 부터 {1} 까지만 선택이 가능합니다.' );

	//이름 (국문, 영문, 한자)
	$.validator.addMethod( 'user-fullname', function ( value, element, param ) {
		//영문은 띄어쓰기 허용
		var alphabet = !/[^a-z\s]/gi.test( value ),
			hangul = $.validator.methods.hangul.call( this, value, element, param ),
			chinesecharacter = $.validator.methods['chinese-character'].call( this, value, element, param );

		return this.optional( element ) || ( alphabet || hangul || chinesecharacter );
	}, '이름에 특수문자(공백, 숫자 포함)는 입력이 불가능 합니다.' );

	//신청자명 (국문, 영문, 한자)
	$.validator.addMethod( 'apply-name', function ( value, element, param ) {
		//영문은 띄어쓰기 허용
		return this.optional( element ) || !/[^ㄱ-힣a-z\s]/gi.test( value );
	}, '신청자명에 특수문자(숫자 포함)는 입력이 불가능 합니다.' );

	//알파벳만 입력
	$.validator.addMethod( 'alphabet', function ( value, element, param ) {
		var result = /[^a-z]/gi.test( value );
		return this.optional( element ) || param === 'true'? !result : result;
	}, '영문만 입력 가능합니다.' );

	//한글만 입력
	$.validator.addMethod( 'hangul', function ( value, element, param ) {
		var result = /[^가-힣]/g.test( value );
		return this.optional( element ) || param === 'true'? !result : result;
	}, '한글만 입력 가능합니다.' );

	//한자만 입력
	$.validator.addMethod( 'chinese-character', function ( value, element, param ) {
		var result = /[^\u4E00-\u9FD5]/g.test( value );
		return this.optional( element ) || param === 'true'? !result : result;
	}, '한자만 입력 가능합니다.' );

	//검색 input
	$.validator.addMethod( 'search', function ( value, element, param ) {
		//국문 영문 한자 숫자 공백 - , . ()
		var result = /[^가-힣0-9a-zA-Z\u4E00-\u9FD5\s\-,\.\(\)]+/.test( value );
		return this.optional( element ) || param === 'true'? !result : result;
	}, '정확한 검색어를 입력해 주세요.' );

	//password input
	/**
	 * 허용범위
	 * 1. 영문소문자 (기본 허용)
	 * 2. 숫자
	 * 3. 영문대문자
	 * 4. 특수문자 (32자 : ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ ＼ ] ^ _ ` { | } ~)
	 * - 1,2,3,4 중 최소 2가지 이상의 문자 조합으로 구성
	 * - 최소 6자리 이상, 최대 16자리 이하로 구성
	 * - 불허하는 문자 키인 시 불가 안내, 포커스 아웃 시 불가 안내
	 * - 사용 불가능한 비밀번호 : 공백, 현재 사용 중 비밀번호, ID와 동일한 비밀번호
	 */
	$.validator.addMethod( 'pass-word', function ( value, element, param ) {

		var regex1 = value.search(/[0-9]/g),
			regex2 = value.search(/[a-z]/g),
			regex3 = value.search(/[A-Z]/g),
			regex4 = value.search(/[!"#$%&'()*+,-./:;<=>?@[＼\]^_`{|}~]/gi),

			l = value.length;

		var i1 = regex1 >= 0 ? 1 : 0,
			i2 = regex2 >= 0 ? 1 : 0,
			i3 = regex3 >= 0 ? 1 : 0,
			i4 = regex4 >= 0 ? 1 : 0;

		return this.optional( element ) || (i1+i2+i3+i4 > 1) && (value.match(/\s/) == null) && ( l >= 6 && l <= 16 );
	}, '올바른 비밀번호를 입력 하세요. 비밀번호 입력란으로 이동 합니다.' );

	//mobile number input
	$.validator.addMethod( 'mobile-number', function ( value, element, param ) {
		return this.optional( element ) || /^(010|011|016|017|018|019)\d{7,8}$/.test( value );
	}, '올바른 휴대폰 번호를 입력해주세요. 휴대폰 번호 입력란으로 이동합니다.' );

	/**
	* 이름 input
	* -> 특수문자 입력 또는 띄어쓰기 포함 아이디 입력한 경우
	*/
	$.validator.addMethod( 'user-name', function ( value, element, param  ){
		var blank = /[\s]/g.test( value ),
		  special = /[`~!@#$%^&*|\\\'\";:\/?]/gi.test( value );
		return this.optional( element ) || !blank && !special;
	}, '올바른 이름을 입력해주세요. 이름 입력란으로 이동합니다.');

	/**
	* 생년월일 input
	* -> yyyyMMdd
	*/
	$.validator.addMethod('psnDtbr', function (value, element, param) {
		return this.optional(element) || /^[0-9]{4}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{1}$/.test(value);
	}, '생년월일을 올바르게 입력해 주세요. 생년월일 입력란으로 이동합니다.');

	/**
	 * 법정생년월일 input
	 * -> yyMMdd
	 */
	$.validator.addMethod('athtDtbr', function (value, element, param) {
	  return this.optional(element) || /^[0-9]{2}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{1}$/.test(value);
	}, '생년월일을 올바르게 입력해 주세요. 생년월일 입력란으로 이동합니다.');

	/**
	 * 14세 이상만 신청가능 
	 */
	$.validator.addMethod('fourteenOver', function (value, element, param) {
		var now = new Date();
		var year= now.getFullYear();

		return this.optional(element) || (year -value.substring(0,4)) >= 14 ; 
	}, '14세 이상만 신청이 가능합니다.');
	/**
	* 주민 등록번호 input
	* -> 숫자13자리만 가능
	*/
	$.validator.addMethod( 'reg-number', function ( value, element, param ){
		var number = $.validator.methods.number.call( this, value, element, param),
		  length = value.length;
		return this.optional( element ) || number && (length == 13);
	}, '외국인 등록번호에 13자리 숫자만 입력이 가능합니다.' );

	/**
	* id input
	* -> 특수문자 입력 또는 띄어쓰기 포함 아이디 입력한 경우
	*/
	$.validator.addMethod( 'id_n', function ( value, element, param  ){
		var blank = /[\s]/g.test( value ),
			special = /[`~!@#$%^&*|\\\'\";:\/?]/gi.test( value );
		return this.optional( element ) || !blank && !special;
	}, '올바른 아이디를 입력 하세요. 아이디 입력란으로 이동합니다.');

	/**
	* id input
	* -> 아이디 기준에 충족하지 않게 입력한 경우
		 -4자 이하 입력
		 -영문 대문자만 입력
		 -영문 소문자만 입력
	 */
	$.validator.addMethod( 'id_l', function ( value, element, param  ){
		var eng = /[a-zA-Z]+/.test( value ),
		  length = value.length;
		return this.optional( element ) || eng && ( length >= 4 && length <= 12 );
	}, '올바른 아이디를 입력 하세요. 아이디 입력란으로 이동합니다.');

	/**
	* id input
	* -> 아이디 기준에 충족하지 않게 입력한 경우
		 -이메일 형식.
	 */
	$.validator.addMethod( 'id_email', function ( value, element, param ) {
		return this.optional( element ) || /[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/.test( value );
	}, '아이디는 email 형식으로 입력해 주세요.' );
	
	//email2
	$.validator.addMethod( 'email2', function ( value, element, param ) {
		return this.optional( element ) || /[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/.test( value );
	}, '유효한 email 형식이 아닙니다.' );
	
	/** ==================== ClassRules ==================== */

	//$.validator.addClassRules({
	//    'validate_number': {
	//        number: true,
	//        length: 3
	//    }
	//});


	/** ==================== 공통설정 ==================== */

	$.validator.setDefaults({
		ignore: ':hidden, .ignore',
		focusInvalid: false,
		//errorElement: 'span',
		ignoreTitle: true,

		invalidHandler: function ( e, validator ) {
			//첫번째 error alert 띄우기
			_.some( validator.errorList, function ( error ) {
				var $el = $( error.element );

				if ( error.element.nodeName === 'SELECT' ) {
					var $pluginSelect = $( error.element ).siblings( 'button' );

					if ( $pluginSelect.length ) {
						$el = $pluginSelect;
					}
				} else if ( $el.hasClass('ui_date_picker') ) {
					$el = $el.siblings( '.ui_date_picker_btn' );
				}

				AP.modal.alert({
					contents: error.message,
					returnFocusTarget: $el
				});
				return true;
			});
		},

		errorPlacement: function ( $error, $element ) {
			//error를 input의 맨뒤에 생성
			//$element.parent().append( $error );
		},

		//error class 추가로 넣기
		highlight: function( element, errorClass, validClass ) {
			var $el = $( element );

			if ( element.nodeName === 'SELECT' ) {
				$el.triggerHandler({
					type: 'validate-error',
					errorClass: errorClass,
					validClass: validClass
				});
			}

			$el.parent().addClass( errorClass ).removeClass( validClass );
		},

		//valid class 추가로 넣기
		unhighlight: function( element, errorClass, validClass ) {
			var $el = $( element );

			if ( element.nodeName === 'SELECT' ) {
				$el.triggerHandler({
					type: 'validate-valid',
					errorClass: errorClass,
					validClass: validClass
				});
			}

			$el.parent().removeClass( errorClass ).addClass( validClass );
		}
	});


})( jQuery );