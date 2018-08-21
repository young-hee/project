/**
 * Service API
 */
;(function ( $ ) {
	'use strict';

	/**
	 * Api Setting
	 *      path        	{String}    api path
	 *      cache       	{Boolean}   default: false
	 *      method      	{String}    default: 'GET'  ('GET', 'POST')
	 *      dataType    	{String}    default: 'json' ('xml', 'html', 'script', 'json', 'jsonp', 'text')
	 *      crossDomain 	{Boolean}   default: false
	 *      data        	{Object}    서버로 전송할 정적 데이타 (ajax의 data속성)
	 *      contentType 	{String}	요청 header 의 Content-Type
	 *      memoryCached	{Boolean}	api로 한번 불러온 데이타를 메모리에 저장하여 이후 api 요청시 메모리에 있는 데이타를 반환
	 *      processData		{Boolean}	data 지정한 개체를 쿼리 문자열로 변환할지 여부를 설정, 파일첨부시 false로 지정한다. default: true
	 */
	var Setting = {
		/**
		 * juso.go.kr api
		 * TODO: confmKey 정식 코드로 변경 필요
		 * @param {String}    keyword         검색 keyword
		 * @param {Int}       currentPage     검색할 페이지
		 */
		getAddresses: { path:'//www.juso.go.kr/addrlink/addrLinkApiJsonp.do', method: 'POST', dataType: 'jsonp', crossDomain: true, data: {
				confmKey: 'U01TX0FVVEgyMDE3MDgxODE2NTExMTIzODcy',
				resultType: 'json',
				countPerPage: 10
			}
		},

		/**
		 * pixlee api : 앨범의 사진 리스트 요청
		 * @param {String}	albumId		해당리스트를 포함하고 있는 앨범 ID
		 */
		getPixleePhotos: { path:'//distillery.pixlee.com/api/v2/albums/{albumId}/photos', data: {
				api_key: 'Qb96XS0UZhAN7jhR23',
				sort: decodeURIComponent( '{"approved_time":true,"desc":true}' ),
				filters: decodeURIComponent( '{"has_permission":true}' ),
				per_page: 15
			}
		},


		/**
		 * 공통 ***********************************************************
		 */

		/**
		 * 회원 ***********************************************************
		 */
		//휴대폰인증
		phoneCert: { path: '/customer/phoneCert', method: 'POST' },
		//외국인인증(휴대폰인증)
		phoneCertForeign: { path: '/customer/phoneCertForeign', method: 'POST' },
		//타인명의인증(휴대폰인증)
		guestCert: { path: '/customer/guestCert', method: 'POST' },
		//타인명의인증 확인(휴대폰인증)
		guestConfirm: { path: '/customer/guestConfirm', method: 'POST' },
		//본인인증
		stepOne: { path: '/customer/stepOne', method: 'POST' },
		stepOneF: { path: '/customer/stepOneF', method: 'POST' },
		//약관동의
		stepTwo: { path: '/customer/stepTwo', method: 'POST' },
		getAgreeTerms: { path: '/customer/getAgreeTerms', method: 'GET' },
		//정보입력
		stepThree: { path: '/customer/stepThree', method: 'POST' },

		//로그인
		doLogin: { path: '/doLogin', method: 'POST' },
		doLoginLink: { path: '/doLoginLink', method: 'POST' },
		//SNS로그인
		naverLogin: { path: '/login/naverLoginProcess', method: 'POST' },
		//휴대폰 간편 로그인 인증번호 요청.
		mobileLoginRequest: { path: '/login/mobileLoginRequest', method: 'POST' },
		//휴대폰 간편 로그인.
		mobileLogin: { path: '/login/mobileLogin', method: 'POST' },
		//주문번호 전화번호로, 비회원 조회 가능한지 확인.
		checkOrder: { path: '/nonMeber/checkOrder', method: 'POST' },

		//아이디 중복확인.
		checkId: { path: '/customer/checkId', method: 'POST' },
		//아이디 SMS 전송.
		sendId: { path: '/customer/find/findId/sendId', method: 'POST' },

		//비밀번호 찾기
		//email
		findPwdEmail: { path: '/customer/find/findPwd/email', method: 'POST' },
		findPwdPhone: { path: '/customer/find/findPwd/phone', method: 'POST' },
		findPwdCertificate: { path: '/customer/find/findPwd/certificate', method: 'POST' },
		checkAuthNum: { path: '/customer/find/findPwd/checkAuthNum', method: 'POST' },
		authorizationPhoneNumber: { path: '/customer/authorizationPhoneNumber', method: 'POST' },
		authorizationSelfPhoneNumber: { path: '/customer/authorizationSelfPhoneNumber', method: 'POST' },

		//비밀번호 변경
		changePwd: { path: '/customer/find/findPwd/changePwd', method: 'POST' },
		custSelfOnline: { path: '/customer/custSelfOnline', method: 'POST' },

		//캡차키 발급.
		getNewCaptchaKey: { path: '/captcha/getNewCaptchaKey', method: 'GET' },
		//값 검증.
		checkKeyAndValue: { path: '/captcha/checkKeyAndValue', method: 'POST' },
		
		/**
		 * 단골 매장 **********************************************************
		 */

		// 단골 매장 검색
		favoriteStore: { path: '/my/api/favoriteStore', method: 'GET'},

		// 기본 매장 수정
		repFavoriteStore: { path: '/my/api/repFavoriteStore', method: 'POST' },

		// 단골 등록
		addFavoriteStore: { path: '/my/api/addFavoriteStore', method: 'POST' },

		// 단골 해제
		delFavoriteStore: { path: '/my/api/delFavoriteStore', method: 'POST' },

		/**
		 * 배송지 *************************************************************
		 */

		// 기본 배송지, 배송지 삭제
		repAddress: { path: '/my/api/repAddress', method: 'POST' },

		// 배송지 수정, 등록
		putAddress: { path: '/my/api/{address}', method: 'POST' },

		// 배송지 목록
		shipAddress: { path: '/my/api/shipAddress', method: 'GET'},

		/**
		 * CS *************************************************************
		 */

		// summary
		csSummary: { path:'/cs/summary/{type}', method: 'GET' },

		// 자주묻는 질문, 공지사항 목록
		faqList: { path:'/cs/faqList', method: 'POST'},

		// 1:1 문의 등록
		inquiry: { path:'/cs/doInquiry', method: 'POST'},

		// 1:1 문의 주문/제품 선택 목록
		getOrderPage : { path: '/cs/getOrderPage', method : 'GET'},

		// 1:1 문의 주문/제품 선택 레이어
		getOrderList : { path: '/cs/getOrderList', method : 'GET', dataType: 'html'},


		/**
		 * MY *************************************************************
		 */
		//비밀번호 변경
		changePwd2: { path: '/my/api/changePwd', method: 'POST' },

		//약관동의여부 확인.
		checkTerms: { path: '/my/api/checkTerms', method: 'POST', data : {
			termsCode : '030'
		} },
		//SNS 연결 해제.
		snsDisconnect: { path: '/my/api/snsDisconnect', method: 'POST' },
		
		existSnsConnect: { path: '/my/api/snsConnect', method: 'POST' },

		//개인정보 수정.
		changePriveInfo: { path: '/my/api/changePriveInfo', method: 'POST' },
		changeOptionInfo: { path: '/my/api/changeOptionInfo', method: 'POST' },
		changeTermsInfo: { path: '/my/api/changeTermsInfo', method: 'POST' },
		//비밀번호 확인
		checkPassword: { path: '/my/api/checkPassword', method: 'POST' },
		
		//포인트 선물 회원 조회.
		checkPresentMember: { path: '/my/point/api/checkPresentMember', method: 'POST'},
		//포인트 선물!
		presentPoint: { path: '/my/point/api/presentPoint', method: 'POST'},
		//뷰티포인트 리스트.
		beautyPointListFragment: { path: '/my/page/info/beautyPointListFragment', method: 'GET', dataType: 'html'},
		beautyPointListBodyFragment: { path: '/my/page/info/beautyPointListBodyFragment', method: 'GET', dataType: 'html'},
		
		//예치금 리스트.
		depositHitoryListFragment: { path: '/my/page/info/depositHitoryListFragment', method: 'GET', dataType: 'html'},
		depositHitoryListBodyFragment: { path: '/my/page/info/depositHitoryListFragment', method: 'GET', dataType: 'html'},
		// 예치금 출금
		transferDeposit: { path:'/my/api/transferDeposit', method: 'POST'},
		// 계좌정보 저장
		saveRefundAccounts: { path:'/my/api/saveRefundAccounts', method: 'PUT'},
		
		//간단 점유인증 전송
		simpleCertifySend: { path: '/my/api/simpleCertifySend', method: 'POST'},
		
		//간단 점유인증 재전송
		simpleCertifyResend: { path: '/my/api/simpleCertifyResend', method: 'POST'},
		
		//간단 점유인증 확인
		simpleCertifyCheck: { path: '/my/api/simpleCertifyCheck', method: 'POST'},
          
		//선물하기.
		giftPearl: { path: '/my/point/api/pearl/gift', method: 'POST'},
		
		//선물받기.
		receivePearl: { path: '/my/point/api/pearl/receive', method: 'POST'},

		//뷰티 포인트 카드 발급.
		issuingPointCard: { path: '/my/point/api/pointCard/issued', method: 'POST'},
		
		//비회원 인증.
		noMemberCheckSms: { path: '/my/point/api/noMemberCheckSms', method: 'POST'},

		// 1:1 문의 목록
		inquiryList: { path:'/my/api/getInquiryList', method: 'GET'},

		// 1:1 문의 내용
		inquiryCont: { path:'/my/api/getInquiryCont', method: 'GET'},

		// 쿠폰 등록
		registerCoupon: { path:'/my/api/registerCoupon', method: 'POST'},

		/**
		 * 매장찾기 *************************************************************
		 */

		stores: { path:'/display/stores', method: 'POST', data: {
				radius: 2,
				limit: 3
			}
		},

		//매장칭찬목록조회
		storeEvalsList: { path:'/display/storeEvals', method: 'POST', data: {
				searchTypeCode: 'StoreName', //검색구분 (StoreName, StoreEvalTitle, StoreEvalBodyText)
				keyword: null,
				topStoreEvalYn: 'N' //우수매장평여부 (Y/N)
			}},

		//매장칭찬상세조회
		storeEval: { path:'/display/storeEval', method: 'POST', data: {
				storeEvalSn: null //매장평일련번호
			}},

		//매장칭찬등록
		registStoreEval: { path:'/display/registStoreEval', method: 'POST', contentType:false, processData: false },

		//매장칭찬수정
		updateStoreEval: { path:'/display/updateStoreEval', method: 'POST', contentType:false, processData: false },

		/**
		 * 전시 *************************************************************
		 */
		
		/**
		 * 상품 *************************************************************
		 */
		//상품평 목록 조회
		getReviewList : {path : '/product/getReviewList', method : 'GET', data: {
				prodReviewUnit : 'OnlineProd', //(필수) 상품평단위코드 - Member(회원단위) - OnlineProd(온라인상품단위) - UnitProd(단위상품단위, 단위상품일련번호 필수) - StyleCode(스타일코드단위, 스타일코드 필수)
				prodReviewType : 'All', //(필수) 상품평유형코드. All(전체), Pur(구매후기), Prod(상품리뷰), ExperienceGrp(체험단)
				onlineProdSn : null, //(필수) 온라인상품일련번호
				prodSn : null, //단위상품일련번호
				styleCode : null, //스타일코드
				prodReviewSort : 'Last', //(필수) 정렬방식 - Last(최근등록순) - Scope(별점높은순) - LowScope(별점낮은순) - Recommend(추천많은순) - View(조회많은순)
				scope  : 'All', //(필수)별점 필터. All(전체), 5, 4, 3, 2, 1
				topReviewOnlyYn : 'N', //(필수) 우수상품평만노출여부
				topReviewFirstYn  : 'N', //(필수)우수상품평우선정렬여부
				startDate: null,
				endDate: null,
				offset: 0, //(필수)
				limit: 20 //(필수)
			}
		},

		/**
		 * 이벤트 *************************************************************
		 */

		/**
		 * 아티클(CH.에뛰드, FindYourLooks) *************************************************************
		 */

		//아티클 목록 조회
		articles : { path:'/display/articles', method: 'POST', data: {
				articleCateId: 'chEtude', //ch.에뛰드 : chEtude, FindYourLooks : Looks
				order: 'StartDt', //정렬방식코드 ArticleSortMethod, StartDt (시작일), Deadline(종료일), SortOrder(정렬순 - 기본값)
				keyword: null,
				hashTag: null, //해시태그 (SNS 해쉬태그 검색, '#’을 제거하고 입력)
				offset: 0,
				limit: 10
			}},

		//아티클 상세 조회
		article : { path:'/display/article', method: 'POST', data: {
				articleSn: null //아티클일련번호
			}},

		//아티클댓글 목록 조회
		comments : { path:'/display/comments', method: 'POST', data: {
				articleSn: null, //아티클일련번호
				offset: 0,
				limit: 10
			}},

		//아티클댓글 등록
		createArticleComment : { path:'/display/createArticleComment', method: 'POST', data: {
				articleSn: null, //아티클일련번호
				articleCommentBodyText: "", //댓글내용
				memberSn: null //회원일련번호
			}},

		//아티클댓글 삭제
		deleteArticleComment : { path:'/display/deleteArticleComment', method: 'POST', data: {
				articleSn: null, //아티클일련번호
				articleCommentSn: null, //아티클댓글일련번호
				memberSn: null //회원일련번호
			}},


		/**
		 * test *************************************************************
		 */

		// test
		test: { path: '/mo/ko/dummy-apis/test.json', method: 'GET' }

	};


	/**
	 *  ServiceApi - Methods
	 *   ex) AP.api.getList({key: '', name: ''}, data).done(function (result) {}).fail(function (e) {});
	 *  @param      {Object}    params
	 *  @param      {Object, SerializeString, FormData}    data        서버로 전송할 동적 데이타 (ajax의 data속성, 설정한 정적데이타와 병합하여 처리된다, FormData의 경우 병합되지 않고 덥어씌운다.)
	 *  @returns    {ajax}
	 */
	_.each( Setting, function ( api, key ) {
		Setting[key] = function ( params, data ) {
			var opt = {
				url: getRestURL( api.path, params ),
				type: api.method || 'GET',
				data: extendData( api.data, data ),
				crossDomain: _.isBoolean( api.crossDomain )? api.crossDomain : false,
				cache: _.isBoolean( api.cache )? api.cache : false,
				processData: _.isBoolean( api.processData )? api.processData : true
			};

			if ( api.hasOwnProperty('dataType') ) {
				opt.dataType = api.dataType;
			} else {
				opt.dataType = 'json';
			}

			if ( api.hasOwnProperty('contentType') ) {
				opt.contentType = api.contentType;
			}

			if ( api.memoryCached ) {
				return AP.ajax.getCacheAjax( opt, opt.url, opt.data );
			} else {
				return AP.ajax.get( opt );
			}
		};
	});


	function getRestURL ( path, params ) {
		return path.replace( /{\s*([\w]+)\s*}/g, function ( str, prop ) {
			if ( prop && _.isObject(params) && params.hasOwnProperty(prop) ) {
				return params[prop];
			} else {
				return str;
			}
		});
	}

	function extendData ( settingData, data ) {
		var result = {};

		if ( $B.isObject(settingData) ) {
			result = $B.object.extend( result, settingData, false );
		}

		if ( data ) {
			if ( $B.isObject(data) ) {
				//object
				result = $B.object.extend( result, data, false );
			} else if ( $B.isString(data) && /(\w*)\=([^&]*)/.test(data) ) {
				//serialize string
				data.replace( /(\w*)\=([^&]*)/g, function ( str, prop, val ) {
					result[prop] = val;
				});
			} else {
				result = data;
			}
		}

		return result;
	}


	var etcApi = {
		/**
		 * juso.go.kr api
		 * @param {Object}    params
		 *  - {String}    keyword         검색 keyword
		 *  - {Int}       currentPage     검색할 페이지
		 * @returns {Deferred}
		 */
		getAddresses: function ( params ) {
			var defer = new $.Deferred(),
				isAbort = false;

			Setting.getAddresses( {}, params ).done( function ( jsonStr ) {
				if ( isAbort ) return;

				var errCode = jsonStr.results.common.errorCode,
					errDesc = jsonStr.results.common.errorMessage;

				if ( errCode != '0' ) {
					defer.reject();
				} else {
					if ( jsonStr != null && jsonStr.results ) {
						defer.resolve( jsonStr.results, jsonStr.results.common );
					}
				}
			}).fail( function () {
				defer.reject();
			});

			defer.abort = function () {
				isAbort = true;

				defer.reject({
					statusText: 'abort'
				});
			};

			return defer
		},

		/**
		 * 위도, 경도를 이용하여 주소 얻어오기 (Daum Map API Geocoder)
		 * @param   {Number}    lat
		 * @param   {Number}    lng
		 * @returns {Deferred}
		 */
		coord2Address: function ( lat, lng ) {
			var defer = new $.Deferred(),
				isAbort = false;

			AP.common.mapApiReady.done(function () {
				new daum.maps.services.Geocoder().coord2Address( lng, lat, function ( result, status ) {
					if ( isAbort ) return;

					if ( status === daum.maps.services.Status.OK ) {
						if ( result.length ) {
							defer.resolve( result[0] );
						} else {
							defer.reject();
						}
					} else {
						defer.reject();
					}
				});
			});

			defer.abort = function () {
				isAbort = true;

				defer.reject({
					statusText: 'abort'
				});
			};

			return defer;
		}
	};


	AP.api = (function () {
		var result = etcApi;

		for ( var key in Setting ) {
			var api = Setting[key];

			if ( !etcApi.hasOwnProperty(key) ) {
				result[key] = api;
			}
		}

		return result;
	})();
})( jQuery );