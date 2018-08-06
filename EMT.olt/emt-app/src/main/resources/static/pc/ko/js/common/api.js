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
		// 세션 시간 연장
		extendSessionTime: { path: '/common/extendSessionTime', method: 'GET' },
		
		//로그인한 멤버 정보 
		getLoginMemberInfo : { path : '/common/getLoginMemberInfo', method: 'GET' },
		
		/**
		 * 검색 ***********************************************************
		 */
		//인기 검색어 조회
		popularSearches: { path: '/common/popularSearches', data: {}},
		
		//검색
		searchEverything: { path: '/common/searchEverything', data: {
			 toSearchFor		: ''
			,toBeExcluded		: null
			,excludeSoldOut		: false
			,offset				: 0
			,limitProd 			: 8
			,limitReview 		: 5
			,limitArticle 		: 50
			,limitPlan 			: 50
			,includeFilters		: true
			,displayCateDepth	: 0
		}},
		
		//상품 검색
		searchProdList: { path: '/common/searchProdList', data: {
			 toSearchFor: ''
			,toBeExcluded: null
			,excludeSoldOut: false
			,prodSort:null
			,offset: 0
			,limit : 8
			,includeFilters: true
			,displayCateDepth: 0
			,displayCate: null
			,brand: null
			,flag: null
			,attr: null
			,priceRange: null
		}},
		
		//상품평 검색
		searchReviewList: { path: '/common/searchReviewList', data: {
			 toSearchFor: ''
			,toBeExcluded: null
			,offset: 0
			,limit : 5
		}},
		
		//아티클 검색
		searchArticleList: { path: '/common/searchArticleList', data: {
			 toSearchFor: ''
			,toBeExcluded: null
			,offset: 0
			,limit : 50
		}},
		
		//기획전시 검색
		searchPlanDisplayList: { path: '/common/searchPlanDisplayList', data: {
			 toSearchFor: ''
			,toBeExcluded: null
			,offset: 0
			,limit : 50
		}},
		
		//검색어 자동완성
		searchAutocomplete: { path: '/common/searchAutocomplete', data: {
			 limit : 10
			,prefix : null
		}},
		
		//검색결과 요약 목록
		searchSuggest: { path: '/common/searchSuggest', data: {
			 limit : 10
			,prefix : null
		}},

		/**
		 * 회원 ***********************************************************
		 */
		//휴대폰인증
		phoneCert: { path: '/customer/phoneCert', method: 'POST' },
		//외국인인증(휴대폰인증)
		phoneCertForeign: { path: '/customer/phoneCertForeign', method: 'POST' },
		//외국인인증(등록번호)
		foreignCert: { path: '/customer/foreignCert', method: 'POST' },
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

		//통합회원의 간단 약관동의 가입.
		simpleJoin: { path: '/customer/simpleJoin', method: 'POST' },

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

		//간편ID찾기.
		findIdSimple: { path: '/customer/find/findId/simple', method: 'POST' },
		findIdForeigner: { path: '/customer/find/findId/foreigner', method: 'POST' },
		//아이디 중복확인.
		checkId: { path: '/customer/checkId', method: 'POST' },

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
		
		//리턴 URL임시저장.
		saveUrl: { path: '/saveUrl', method: 'POST' },
		
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
		
		//간단 점유인증 전송
		simpleCertifySend: { path: '/my/api/simpleCertifySend', method: 'POST'},
		
		//간단 점유인증 재전송
		simpleCertifyResend: { path: '/my/api/simpleCertifyResend', method: 'POST'},
		
		//간단 점유인증 확인
		simpleCertifyCheck: { path: '/my/api/simpleCertifyCheck', method: 'POST'},
          
		//활동포인트로 쿠폰 교환
		pearlExchange: { path: '/my/point/api/pearl/exchange', method: 'POST'},
		
		//선물하기.
		giftPearl: { path: '/my/point/api/pearl/gift', method: 'POST'},
		
		//선물받기.
		receivePearl: { path: '/my/point/api/pearl/receive', method: 'POST'},

		//뷰티 포인트 카드 발급.
		issuingPointCard: { path: '/my/point/api/pointCard/issued', method: 'POST'},
		
		//비회원 인증.
		noMemberCheckSms: { path: '/my/point/api/noMemberCheckSms', method: 'POST'},

		//진주알 리스트.
		pearlList: { path: '/my/page/info/pearlAppendList', method: 'GET', dataType: 'html'},
		pearlListTable: { path: '/my/page/info/pearlAppendListTable', method: 'GET', dataType: 'html'},
		
		//뷰티포인트 리스트.
		beautyPointListFragment: { path: '/my/page/info/beautyPointListFragment', method: 'GET', dataType: 'html'},
		beautyPointListBodyFragment: { path: '/my/page/info/beautyPointListBodyFragment', method: 'GET', dataType: 'html'},
		
		//예상등급 리스트.
		myLevelListFragment: { path: '/my/page/myLevelListFragment', method: 'GET', dataType: 'html'},

		//쿠션포인트 리스트.
		cushionPointFragment: { path: '/my/page/cushion/cushionPointFragment', method: 'GET', dataType: 'html'},
		cushionPointBodyFragment: { path: '/my/page/cushion/cushionPointBodyFragment', method: 'GET', dataType: 'html'},
          

		//이벤트 참여 현황
		eventList: { path:'/my/api/getEventList', method: 'GET'},
		
        // 1:1 문의 목록
        inquiryList: { path:'/my/api/getInquiryList', method: 'GET'},
        
        // 1:1 문의 내용
        inquiryCont: { path:'/my/api/getInquiryCont', method: 'GET'},

		// 쿠폰 등록
		registerCoupon: { path:'/my/api/registerCoupon', method: 'POST'},

		//쿠폰 목록
		couponList: { path:'/my/api/getCouponList', method: 'GET', data : {
			searchType : "All" //조회유형코드: All; AvailCoupon :사용가능; ExpCoupon: 사용/만료
			, searchExpDayLimit : 30 //만료예정조회기간
			, searchEndDayLimit : 90 //종료된쿠폰최대조회기간
		}},

		//작성가능한 리뷰
		writableReviewList: { path:'/my/api/getReviewList', method: 'GET'},

		//예치금 내역
		depositList: { path: '/my/api/getDepositList', method: 'GET' },

		// 예치금 출금
		transferDeposit: { path:'/my/api/transferDeposit', method: 'POST'},

		// 계좌정보 저장
		saveRefundAccounts: { path:'/my/api/saveRefundAccounts', method: 'PUT'},

        /**
		 * 나의 주문 관리 **********************************************************
		 */

		 //온라인, 매장, 반품, 교환, 현금영수증 리스트
		 getOrderShippingList: { path : '/my/api/getOrderShippingList' , method: 'GET' },

		 //주문 취소, 교환, 환불 사유
		 getClaimReasonList: { path : '/my/api/getClaimReasonList', method: 'GET'},

		 //주문 취소, 교환, 환불 상품 선택
         reqOrdClaimSelect: { path : '/my/api/{ordSn}/{type}/ordSelect', method: 'POST', contentType: 'application/json'},

		 //주문 취소, 교환, 환불 신청
		 reqOrdClaim: { path : '/my/api/{ordSn}/{type}/ordRequest', method: 'POST', contentType: 'application/json'},

		 //주문 상품 옵션 목록
		 getProdVariation: { path : '/my/api/{ordHistProdSn}/onlineProdUnitVariationProds', method: 'GET'},

		 //주문 상품 옵션 변경
		 reqOrdProdChange: { path : '/my/api/{ordSn}/ordChangProds', method: 'POST'},

		 //현금영수증 신청
		 reqCashReceiptIssue: { path : '/my/api/cashReceiptIssueRequest' , method: 'POST', contentType:false, processData: false},

		 //배송지 추가/수정
		 ordChangeShipAddress: { path : '/my/api/{ordSn}/ordChangeShipAddress' , method: 'POST'},


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

		//상품평설문 목록 조회
        getProductReviewSurveys : {path : '/product/getProductReviewSurveys', method : 'GET', data: {
        		 onlineProdSn  : null //온라인상품일련번호
        		,prodReviewType : 'All'
			}
        },

        //상품평 등록
        reviewWithImages : {path : '/product/reviewWithImages', method : 'POST', contentType:false, processData: false, data: {
        		prodReviewTypeCode : 'Prod', //품평유형코드. Pur(구매후기), Prod(상품리뷰), ExperienceGrp(체험단)
        		onlineProdSn : null, //온라인상품일련번호
        		prodSn : null, //단위상품일련번호
        		scope : null, //상품평별점
        		prodReviewTitle : null, //상품평제목
        		prodReviewBodyText : null, //내용
        		arrSurvey : null, //"[{prodReviewEvalQuestionSn: 상품평질문항목일련번호, prodReviewEvalResponseSn: 상품평답변항목일련번호}]"
				multiWriteYn : 'N'
	        }
        },
        
        //상품평 수정
        updateReviewWithImages : {path : '/product/updateReviewWithImages', method : 'POST', contentType:false, processData: false, data: {
        		prodReviewSn : null, //상품평일련번호
        		scope : null, //상품평별점
        		prodReviewTitle : null, //상품평제목
        		prodReviewBodyText : null, //내용
        		arrSurvey : null //"[{prodReviewEvalQuestionSn: 상품평질문항목일련번호, prodReviewEvalResponseSn: 상품평답변항목일련번호}]"
			}
        },
        
        //상품평 삭제
        deleteProdReview : {path : '/product/deleteProdReview', method : 'POST', data: {
	    		prodReviewSn: null //상품평일련번호
			}
        },

        //재입고알림신청 등록
        restockNotify : {path : '/product/restockNotify', method : 'POST', contentType:false, processData: false, data: {
	        	prodSn : null, //단위상품일련번호
        		onlineProdSn : null, //온라인상품일련번호
        		prePhoneNo : null, //전화번호
        		smsAgreeYn : null //SMS수신여부
			}
        },
        
        //동시구매기획전그룹별 상품목록
        getInSameTimePurProdGrp : {path : '/product/getInSameTimePurProdGrp', method : 'GET', data: {
        	  sameTimePurProdGrpSn : null	//동시구매기획전그룹일련번호
			, excludeSoldOut : false 		//품절된 상품을 상품 목록 또는 콘텐츠에서 제외할지 여부 (default=false)
			, offset : 0					//상품 리스트의 오프셋
			, limit : 100					//아이템(상품/기획전시/콘텐츠) 리스트의 사이즈
			, includeFilters : false		//필터용 정보들도 포함해서 내려보내야 하는지
			, displayCateDepth: 0
			, displayCate : null			//display_cate_sn. 예) “1,50”
			, brand : 0						//brand_sn. 예) “2,995”
			, flag : null					//예) “icon_reco_new,icon_reco_md”
			, attr : null					//예) “color=red,color=blue,size=L,size=XL”
			, priceRange : null				//예1) “10000,”- 10000~ 예2) “2000,8000”- 2000~8000 예3) “,50000”- ~50000
			}
        },
        
        /**
		 * 코너 정보 조회 main Looks 관련 코너별 조회 *************************************************************
		 * @request 
		 * @return 
		 */
        getCornerInfo: { path:'/display/getCornerInfo', method: 'GET' },
        
        /**
		 * 전시 *************************************************************
		 */
		//페이지별 상품목록
		itemList: { path:'/display/prodList/{displayMenuId}', method: 'POST' , data: {
				flag: null, //icon_pr_prod (행사상품여부)
				attr: null, //검색필터, 컬러, 피부톤 등 (color=red,blue|size=L,XL)
				prodSort: null, //판매순(Bestselling), 신상품순(NewProd), 높은 가격순(HighestPrice), 낮은가격순(LowestPrice), 상품평순(MostProdReview)
				offset: 0,
				limit: 10, 
				includeFilters:false, 
				displayCateDepth: 0,
				displayCate:null,
				brand:null,
				priceRange:null
			}
		},

		//플래그상품목록
		flaggedItemList: { path:'/display/flaggedProdList', method: 'POST' , data: {
				flags: null, //대카(icon_reco_best_w), 온라인 전용(icon_reco_online,icon_reco_best_w), 뷰티포인트샵(icon_reco_hot, icon_membership1)
				flag: null, 
				prodListUnit : 'OnlineProd',
	    		prodSort: 'NewProd', //판매순(Bestselling), 신상품순(NewProd), 높은 가격순(HighestPrice), 낮은가격순(LowestPrice), 상품평순(MostProdReview)
	    		offset: 0,
				limit: 5, //대카(5), 온라인전용(5), 뷰티포인트(10)
				includeFilters:false, 
				displayCateDepth: 0,
				displayCate:null, //대카추천상품일 경우만 입력
				brand:null,
				attr:null,
				priceRange:null
			}
		},
		
		//플래그상품순위 목록
		flaggedProdRankChanges: { path:'/display/flaggedProdRankChanges', method: 'GET' , data: {
				rankFlag : 'icon_reco_best_w', //플래그명 (주간베스트: icon_reco_best_w)
				limit : 10
			}
		},
		
		//프로모션상품목록
		inPromoProdList: { path:'/display/inPromoProdList', method: 'POST' , data: {
			promoSn: null, //프로모션일련번호
    		prodSort: null, //판매순(Bestselling), 신상품순(NewProd), 높은 가격순(HighestPrice), 낮은가격순(LowestPrice), 상품평순(MostProdReview)
    		offset: 0,
			limit: 20
			}
		},
		
		//포인트교환 상품목록
		pointExchangeableProdList: { path:'/display/pointExchangeableProdList', method: 'POST' , data: {
				pointType: null, //활동포인트 (진주알) / 통합포인트 (뷰티포인트)
				pointExch: null, //가능/전용
				prodSort: 'NewProd', //판매순(Bestselling), 신상품순(NewProd), 높은 가격순(HighestPrice), 낮은가격순(LowestPrice), 상품평순(MostProdReview)
				offset: 0,
				limit: 99999,
				includeFilters:false, 
				displayCateDepth: 0,
				displayCate:null,
				brand:null,
				priceRange:null
			}
		},
		
		//포인트교환 사은품목록
		pointExchangeableGiftList: { path:'/display/pointExchangeableGiftList', method: 'POST' , data: {
				pointType: 'ActivityPoint',	//활동포인트 (진주알) - ActivityPoint / 통합포인트 (뷰티포인트) - MembershipPoint
				offset: 0,
				limit: 99999,
				excludeSoldOut:false, 		//품절된 상품을 상품 목록 또는 콘텐츠에서 제외할지 여부 (default=false)
			}
		},
		
		//동시구매기획전그룹별 상품목록
		inSameTimePurProdGrp: { path:'/display/inSameTimePurProdGrp', method: 'POST' , data: {
				sameTimePurProdGrpSn: null, //동시구매기획전그룹일련번호
				offset: 0,
				limit: 20, 
				includeFilters:false, 
				displayCateDepth: 0,
				displayCate:null,
				brand:null,
				priceRange:null
			}
		},
		
		//상품기획전 그룹별 상품목록
		inPlanDisplayProdGrp: { path:'/display/inPlanDisplayProdGrp', method: 'POST' , data: {
				planDisplayProdGrpSn: null, //기획전시상품그룹일련번호
				offset: 0,
				limit: 20, 
				includeFilters:false, 
				displayCateDepth: 0,
				displayCate:null,
				brand:null,
				flag:null,
				attr:null,
				priceRange:null
			}
		},
		
		//아티클연관상품목록
		articleRelated: { path:'/display/articleRelated', method: 'POST' , data: {
				articleSn: null, //아티클일련번호
				offset: 0,
				limit: 20, 
				includeFilters:false, 
				displayCateDepth: 0,
				displayCate:null,
				brand:null,
				priceRange:null
			}
		},

		//함께많이구매한 상품목록
		boughtTogether: { path:'/display/boughtTogether', method: 'POST' , data: {
				prodSnList : null, //상품일련번호
				prodListUnit : 'OnlineProd', //리스트 단위가 온라인상품인지 또는 단위상품인지 (OnlineProd, Prod)
				prodSort: 'NewProd', //판매순(Bestselling), 신상품순(NewProd), 높은 가격순(HighestPrice), 낮은가격순(LowestPrice), 상품평순(MostProdReview)
				offset: 0,
				limit: 20, 
				includeFilters:false, 
				displayCateDepth: 0,
				displayCate:null,
				brand:null,
				priceRange:null
			}
		},

		//쇼핑히스토리
		shoppingHistoryList: { path: '/display/shoppingHistoryList', method: 'GET' },

		//쇼핑히스토리 전체삭제
		deleteShoppingHistory: { path:'/display/deleteShoppingMarksAll', method: 'GET'},

		//마케팅키워드리스트
		marketingKeyword: { path:'/display/marketingKeyword', method: 'GET'},
		
		//카테고리 유형별 코너 이미지 조회
		//Map key : M02_prod_types_p, M02_prod_lines_p.1, M02_prod_lines_p.2, M02_prod_thema_p.1, M02_prod_thema_p.2
		//menuPageCornerContentsId : ~1.1만 조회
		categoryTypeImgList: { path:'/display/categoryTypeImgList', method: 'GET'},

		cornerList: { path:'/display/cornerList', method: 'GET'},
		
		 /**
	     * 이벤트 *************************************************************
	     */
		
		 //출석체크 이력조회
		//regularEventType  : Roulette - 룰렛 , PackageLetter - 패키지레터 , ProdExperienceGrp - 상품체험단신청 , SampleExperienceGrp - 샘플체험단신청 , AttendanceCheck - 출석체크
        status: { path:'/display/status', method: 'POST', data: {
        		regularEventType : null,
        		day : null //yyyyMM
			}
		},
		
		//행사 유형별 행사 정보 조회
		//regularEventType  : Roulette - 룰렛 , PackageLetter - 패키지레터 , ProdExperienceGrp - 상품체험단신청 , SampleExperienceGrp - 샘플체험단신청 , AttendanceCheck - 출석체크
        regularEventSummary: { path:'/display/regularEventSummary', method: 'POST', data: {
        		regularEventType : null
			}
		},
		
		//행사참여
		//regularEventType  : Roulette - 룰렛 , PackageLetter - 패키지레터 , ProdExperienceGrp - 상품체험단신청 , SampleExperienceGrp - 샘플체험단신청 , AttendanceCheck - 출석체크
		participated: { path:'/display/participated', method: 'POST', data: {
        		regularEventType : null, //상세행사유형코드
        		requestTitle : null, //신청제목
        		requestReason : null, //신청사유 (내용) 2000자
        		emailAddress : null, //신청자이메일
        		verifNo : null //인증번호 (패키지레터인경우 필수)
			}
		},
		
		/**
		 * 행사참여 신청자 목록
		 * @param: regularEventType(String) * 필수(Roulette - 룰렛 , PackageLetter - 패키지레터 , ProdExperienceGrp - 상품체험단신청 , SampleExperienceGrp - 샘플체험단신청 , AttendanceCheck - 출석체크 , VIPLounge - VIP라운지 , VVIPLounge - VVIP라운지)
		 *         regularEventSn (int) 상시행사일련번호-미입력시 현재진행중인행사
		 *         offset
		 *         limit 
		 * @response :  {offset, limit {regularEventRequesters : {regularEventRequesterSn,requestTitle,requestReason,emailAddress,memberId}}}     
		 */ 
		regularEventRequesters: { path:'/display/regularEventRequesters', method: 'GET', data: {
				regularEventType  : null, // 이벤트 유형 
				regularEventSn : null, // 상시행사일련번호-미입력시 현재진행중인행사
				offset : null, // 
				limit : null // 
			}
		},
		
		// 참가후 당첨자 배송지 등록
		//parameter : Long eventParticipantSn, Long memberSn, String termsAgreeYn, String name, String telNo1, String telNo2, String address, String email
		regularEventTermsAgree : { path:'/display/regularEventTermsAgree', contentType : false, processData : false, method: 'POST', data: {
			eventParticipantSn : null, //참가자명
			termsAgreeYn : null, // 동의여부 필수 
			name : null, // 참가자 이름 
			telNo1 : null, // 신청자 전화번호 1
			telNo2 : null, //신청자 전화번호 2
			address : null, // 주소 
			email : null// 이메일 주소
			}
		},
		
		// 참가후 당첨자 배송지 조회 
		// 주소가 기본배송지에 없는 경우 가장 최근에 등록한 주소를 조회했습니다. 
		// 주소를 그려줄때 주소지 또는 건물명은 비워주고  주소란에 zip코드 + address1 을 표기 하고 address2 는 상세주소에 표기해주세요.
		// 혹시 가장 최근 주소지가 본인이 원하는 주소지가 아닐수도 있으니, 수정은 가능한것이 맞는것 같습니다. 
		//parameter : memberSn
		regularEventShipAddress : { path:'/display/regularEventShipAddress', method: 'GET' },

		/***
		 * 이벤트 당첨자 목록
		 * request : parameter : String keyword, Long noticeTypeSn, Integer offset, Integer limit, String importantNoticeYn, String eventYn
		 * response : forNoticeList , 당첨일은 noticeStartDt 으로 설정해주세요. (당첨일이 곧 게시일)
		 */
		winnerNoticeList : { path:'/display/winnerNoticeList', method: 'GET', data: {
				keyword : null, // 검색어
				noticeTypeSn : null, // 공지유형일련번호
				offset: 0,
				limit : 20,
				importantNoticeYn : null, // 주요공지여부
				eventYn : 'Y' // 이벤트공지여부
			}
		},
		
		//Play 메이크업 클래스 신청
		visitEducations: { path:'/display/visitEducations', method: 'POST', data: {
			requestGrpName : null, //신청단체명
			preHopeDt : null, //희망일자
			preHopeTm : null, //희망시간
			requestPersonnel : null, //신청인원
			hopeThemeName : null, //희망테마명
			preCellPhoneNo : null, //신청자 전화번호
			preStoreAddress1 : null, //매장 주소1
			preStoreAddress2 : null, //매장 주소2
			addQuestion1 : null //추가질문1
			}
		},

		/**
		 * 장바구니(Cart) ***********************************************************
		 */
		// 상품상세
		detailCartProd : { path: '/cart/detailCartProd', method: 'GET' },

		// 주문계산 상세
		getOrderCalcuation : { path: '/cart/getOrderCalcuation', method: 'GET' },

		// 베리에이션 변경
		getLayerPage : { path: '/cart/getLayerPage', method: 'GET' },

		// 상품등록(일반/묶음) / 장바구니 담기
		//data = JSON.stringify( {storePickupYn: 'N', membershipExch: 'N', activityPointYn: 'Y', cartProdExPostList: [{prodSn: 95, cartProdQty: 1}]} );
		addCartProd : { path: '/cart/addCartProd', method: 'POST', contentType: 'application/json' },
		// 상품등록(동시구매)
		addCartProdSameTime : { path: '/cart/addCartProdSameTime', method: 'POST', contentType: 'application/json' },

		// 상품수량 수정
		modifyCartProd: { path: '/cart/modifyCartProd', method: 'PUT' },

		// 단일삭제(단일상품)
		removeCartProd: { path: '/cart/removeCartProd', method: 'POST' },

		// 단일삭제(그룹상품)
		removeRowCartProd: { path: '/cart/removeRowCartProd', method: 'POST' },

		// 선택삭제
		removeSelectCartProd: { path: '/cart/removeSelectCartProd', method: 'POST' },

		// 픽업매장 검색
		takeoutStore: { path: '/cart/takeoutStore', method: 'POST'},

		// 단골매장 등록
		addTakeoutStore: { path: '/cart/addTakeoutStore', method: 'POST'},

		// 단골매장 등록
		delTakeoutStore : { path: '/cart/delTakeoutStore', method: 'POST'},

		// 매장지역 정보
		storeAddressDivs: { path: '/cart/storeAddressDivs', method: 'GET'},

		// 주문불가상품 삭제
		orderRemoveCartProd: { path: '/cart/orderRemoveCartProd', method: 'POST' },

		// 장바구니 담긴 건수
		getCartCount: { path: '/cart/getCartCount', method: 'GET'},
		
		// 바로구매
		buyNowCartProd : { path: '/cart/buyNowCartProd', method: 'POST', contentType: 'application/json', data: {
				prodSn : null, 						//상품일련번호 - required
				cartProdQty : 1, 					//장바구니상품수량 - required
				integrationMembershipExchYn : 'N', 	//통합멤버십교환여부 - required
				activityPointExchYn : 'N', 			//활동포인트교환여부 - required
				storePickupYn : 'N', 				//매장픽업여부 - required
				storeSn : null, 					//매장일련번호
				cartBulkIncludedProdExList : [] 	//장바구니묶음구성상품목록
		}},

		// 선택상품장바구니조회
		getCartBySelectCartProds: { path: '/cart/getCartBySelectCartProds', method: 'GET'},

		// 매장선택변경
		changeStore: { path: '/cart/changeStore', method: 'PUT'},

		/**
		 * 주문 ****************************************************************
		 */
		// 주문/배송 건수
		getOrderCount: { path: '/order/getOrderCount', method: 'GET'},

		// 사용가능 쿠폰 목록
		getCouponList: { path: '/order/getCouponList', method: 'GET'},

		// 다운로드 쿠폰 목록
		getDownloadCouponList: { path: '/order/getDownloadCouponList', method: 'GET'},

		// 쿠폰 다운로드
		orderDownloadCoupon: { path: '/order/downloadCoupon', method: 'POST'},

		// 기본배송지 수정
		orderAddAddress: { path: '/order/orderAddAddress', method: 'POST' },

		// 기본배송지 등록
		orderUpdateAddress: { path: '/order/orderUpdateAddress', method: 'PUT' },

		// 배송지 목록
		orderShipAddress: { path: '/order/orderShipAddress', method: 'GET'},

		// 결제수단목록조회
		getPayMethodList: { path: '/order/getPayMethodList', method: 'GET'},

		// 결제금액확인
		ordReceptPayAmt: { path: '/order/ordReceptPayAmt', method: 'POST'},

		// 주문정보변경
		ordReceptChange: { path: '/order/ordReceptChange', method: 'POST'},

		// 쿠폰정보 적용 및 변경
		ordReceptChangeCoupon: { path: '/order/ordReceptChangeCoupon', method: 'POST'},

		// 포장박스, 쇼핑백 수량 변경
		ordReceptChangeBag: { path: '/order/ordReceptChangeBag', method: 'POST'},

		// 포인트 사용
		ordReceptChangePoint: { path: '/order/ordReceptChangePoint', method: 'POST'},
		
		// PC 이니시스 결제 데이터 조회
		inipayReq: { path: '/payment/inipayReq', method: 'POST'},
		
		// wpay회원정보 조회
		getMemberWPayInfo: { path: '/payment/getMemberWPayInfo', method: 'GET'},

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

		//매장칭찬삭제
		removeStoreEval: { path:'/display/removeStoreEval', method: 'POST', data: {
			storeEvalSn: null //매장평일련번호
		}},

		//매장개설문의등록
		postStoreOpenInquiry: { path:'/display/postStoreOpenInquiry', method: 'POST', contentType:false, processData: false, data: {
			preName: null, //이름
			email: null,
			prePhoneNo: null,
			openDesiredArea : null, //개설희망지역
			storePossessionYn : null, //매장보유여부 Y/N
			investmentPossibleAmt : null, //투자가능금액
			responseEmailNotifyYn : null, //답변이메일알림여부
			etcInquiry : null, //기타문의
			termsAgreeYn : null // 동의여부 필수
		}},

		/**
	     * 컬러팩토리 예약서비스목록 (비회원인 경우 예약번호로 조회) ******************************************
	     * @param : memberSn, searchStartDt, reserveCancelYn, cancelAvailDt, offset, limit, sortBy
		 * @return : hashMap {StoreEventRequestersResult}
		 * 
		 */
		
		storeEventRequester: { path:'/display/storeEventRequester', method: 'POST', data: {
				reserveNo: null, //예약번호
				cancelAvailDt: null // 취소가능 예약시간 
			}
		},
		
		/** 컬러팩토리 예약서비스목록 (회원인경우 회원번호로 조회)******************************************
		 * @param : memberSn, searchStartDt, reserveCancelYn, cancelAvailDt, offset, limit, sortBy
		 * @return : hashMap {StoreEventRequestersResult}
		 */
		storeEventRequesters: { path:'/display/storeEventRequesters', method: 'POST', data: {
				reserveCancelYn: null, //취소여부
				offset: 0,
				limit: 0,
				sortBy: 'EventStartDate', //EventStartDate, RequestDate
				reserveNo: null //예약번호
			}
		},
		
		/** 컬러팩토리 예약 - 휴대폰인증 ******************************************
		 * @param : { "phoneNo": {"countryNo": "", "phoneNo": "01012345678"} }
		 * @return : hashMap {apMobileVerificationResult}
		 */
		apMobileVerificationResult: { path:'/display/apMobileVerificationResult', method: 'POST', contentType:false, processData: false, data: {
			phoneNo : {
				countryNo : "",
				phoneNo : ""
			}
		}},

		//예약서비스등록
		postStoreEventRequester: { path:'/display/postStoreEventRequester', method: 'POST', contentType:false, processData: false, data: {
			storeEventServiceSn: null, //매장행사서비스일련번호
			storeEventDetailScheduleSn : null, //매장행사상세일정일련번호
			preName: null, //이름
			prePhoneNo: null, //휴대폰번호
			emailAdress: null,
			eventExper: null, //퍼스널컬러측정유무
			nationality : null, //국적
			ageGrp : null //연령대
		}},

		//일정정보
		storeEventScheduleInfo: { path:'/display/storeEventScheduleInfo', method: 'POST', data: {
				foStoreEventCode: 'Color Factory' //Color Finder, Color Factory, Artist Service
			}
		},

		//예약서비스취소
		cancelScheduleInfo: { path:'/display/cancelScheduleInfo', method: 'POST', data: {
				reserveNo: null //예약번호
			}
		},

		/**
		 * 아티클(CH.에뛰드, FindYourLooks) *************************************************************
		 */
		//아티클 목록 조회
		articles : { path:'/display/articles', method: 'POST', data: {
			articleCateId: 'chEtude', //ch.에뛰드 : chEtude, FindYourLooks : Looks
			order: null, //정렬방식코드 ArticleSortMethod, StartDt (시작일), Deadline(종료일), SortOrder(정렬순 - 기본값)
			keyword: null,
			hashTag: null, //해시태그 (SNS 해쉬태그 검색, '#’을 제거하고 입력)
			offset: 0,
			limit: 10
		}},

		//아티클 상세 조회
		article : { path:'/display/article', method: 'POST', data: {
			articleSn: null //아티클일련번호
		}},
		
		//다운로드 쿠폰 등록
		downloadCoupon : { path:'/display/downloadCoupon', method: 'POST', data: {
			couponSn: null //쿠폰일련번호
		}},

		//아티클댓글 목록 조회
		comments : { path:'/display/comments', method: 'POST', data: {
			articleSn: null, //아티클일련번호,
			order: 'DESC',
			offset: 0,
			limit: 10
		}},

		//아티클댓글 등록
		createArticleComment : { path:'/display/createArticleComment', method: 'POST', data: {
			articleSn: null, //아티클일련번호
			articleCommentBodyText: '' //댓글내용
		}},

		//아티클댓글 삭제
		deleteArticleComment : { path:'/display/deleteArticleComment', method: 'POST', data: {
			articleSn: null, //아티클일련번호
			articleCommentSn: null //아티클댓글일련번호
		}},

		 /**
	     * 브랜드(MakeupYourDream, 청춘강연) *************************************************************
	     * 
	     * error Code : 400 (ad Request , EAPC001 - 모집이 종료된 경우 , EAPC002 - 모집이 시작하지 않은 경우 , EAPC004 - 현재 모집중인 행사가 없는 경우)
	     * error Code : 200 (success)
	     */
		
		//청춘강연신청
		requestYouthLecture: { path:'/display/requestYouthLecture', method: 'POST', contentType:false, processData: false, data: {
			preName: null, // 신청자 명
			prePhoneNo: null, //신청자전화번호
			requesterAgeGrp: null, // 신청자 연령대 
			requesterGender : null, // 신청자 성별
			accompanyYn : null, //동행여부
			requestReason : null, // 신청사유
			preCpnName : null, // 동반인원 성명
			preCpnPhnNo : null, //동반인원 전화번호
			companionAgeGrp : null, // 동반인원 연령대
			companionGender : null // 동반인원 성별
			
		}},
		
		/**
	     * 기획전시 댓글목록 (planDisplayComments, )  *************************************************************
	     * @param  {String}
	     * @param  {int}
	     * @param  {int}
	     * @return  {ajax}
	     */
		// 기획전시 댓글 목록
		planDisplayComments: { path:'/display/planDisplayComments', method: 'GET', data: {
			planDisplaySn: null, // 기획전시일련번호 (Long 타입)
			offset: 0,
			limit: 20
		}},
		
		/**
	     * 기획전시 리뷰등록 참여댓글형 행사참여 - 이미지 포함*************************************************************
	     * @param planDisplayPost : participantComment(댓글), planDisplaySn(기획전시일련번호) , termsAgreeYn(약관동의여부 : 필수)  
	     * @param picture
		 * @return 
	     */
		planDisplayParticipated: { path:'/display/planDisplayParticipated', method: 'POST', contentType:false, processData: false },
		
		/**
	     * 기획전시 댓글등록 참여댓글형 행사참여 *************************************************************
	     * @param planDisplayPost : participantComment(댓글), planDisplaySn(기획전시일련번호) , termsAgreeYn(약관동의여부 : 필수)  
		 * @return 
	     */
		planDisplaySimpleParticipated: { path:'/display/planDisplaySimpleParticipated', method: 'POST', data: {
			planDisplaySn: '', 				// 기획전시일련번호
			participantCommentTitle: '', 	// 행사참여자댓글제목
			participantComment: '', 		// 행사참여자댓글
			termsAgreeYn: '' 				// 약관동의여부
		} },
		
		/**
	     * 기획전시 댓글수정 참여댓글형 행사참여 - 이미지 포함*************************************************************
	     * @param requestEvent : planDisplaySn(기획전시일련번호) , eventParticipantSn 
	     * @param planDisplayPost : participantComment(댓글),termsAgreeYn(약관동의여부 : 필수), 유지될 기존파일일련번호만 넘김
	     * @param picture
	     */
		updateParticipated: { path:'/display/updateParticipated', method: 'POST', contentType:false, processData: false },
		
		/**
	     * 기획전시 댓글삭제 *************************************************************
	     * @param requestEvent : planDisplaySn(기획전시일련번호), eventParticipantSn(행사참여자일련번호(댓글일련번호))
	     * @return booleanResult ( true, false)
	     */
		deleteParticipated: { path:'/display/deleteParticipated', method: 'GET',data: { 
			planDisplaySn: null,
			eventParticipantSn: null 
			
		}},
		
		/**
	     * 기획전시 목록 *************************************************************
	     * @param requestEvent : keyword(검색), status(기획전시상태코드 (PlanDisplayStatus) , Progress - 진행 , End - 종료)
	     * 									, types(기획전시 유형코드 리스트(PlanDisplayType) = Link - URL링크 , General - 일반구성기획전시 , SameTimePur - 동시구매기획전시)
	     * 									, order(정렬방식 (PlanDisplaySortMethod) = SortOrder , StartDt , Deadline
	     * 									, offset , limit 
	     */								 
		
		planDisplayList: { path:'/display/planDisplayList', method: 'GET', data: {
			keyword : null, 
			status : null,
			types : null, 
			order : null, 	
			offset : null,
			limit : null 
		}},
		
		/**
	     * 기획전시 상세 *************************************************************
	     * @param requestEvent : planDisplaySn(기획전시일련번호) , memberSn 
	     */
		planDisplayEvent: { path:'/display/planDisplayEvent', method: 'GET', data: {
			planDisplaySn: null // 기획전시일련번호 (Long 타입)
			
		}},
		
		/**
	     * 뷰티즌 신청 *************************************************************
	     * @param requestEvent : requestInfo() , images 
	     */
		requestBeautizen: { path:'/display/requestBeautizen', method: 'POST', contentType:false, processData: false },

		/**
	     * 뷰티즌 신청자  *************************************************************
	     * @param requestEvent : 
	     */
		supportersRequsterinfo: { path:'/display/supportersRequsterinfo', method: 'GET'},
		
		// 스윗샷
		sweetshot: { path:'/pc/ko/dummy-apis/sweetshot.json', method: 'GET'},
		
		/**
		 *  약관  ***********************************************
		 * @param termCode 
		 * @return hashMap
		 */
		policy: { path:'/common/policy', method: 'GET', data: {
			  termCode: null // 약관종류 (필수)
		}},
		
		// 컬러파인더 추천상품
		withLegacyModelCodes: { path:'/common/getWithLegacyModelCodes', method: 'GET'},
		
		/**
		 * 컬러파인더 (app전용 메뉴) ***********************************************************
		 */
		/**
		 * 내 피부톤에 어울리는 추천상품 sap 데이타
		 * @param {String}	type	피부톤 타입 (봄웜: WS, 여름쿨: CS, 가을웜: WF, 겨울쿨: CW, 봄여름 뉴트럴: NSS, 가을겨울 뉴트럴: NFW)
		 */
		getRecommendWithSkinTone: { path: '//etude.aramhuvis.com/api/getData.do?type={type}', crossDomain: true },
		
		/**
		 * 홈화면 진입시 등록한 팝업 노출
		 * 
		 */
		mainPopups : { path: '/display/mainPopups' , method : 'GET'},
		
		
		/**
		 * dummy test *************************************************************
		 */
		// test
		test: { path: '/mo/ko/dummy-apis/test.json', method: 'GET', contentType:false, processData: false }

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