package kr.ap.comm.api;

import feign.RequestLine;
import kr.ap.comm.api.vo.*;
import net.g1project.ecp.api.exception.ApiException;

public interface AmoreAPIService {
	/**
	 * 고객본인인증1
	 * @param cicuemCuInfTotTcVo
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custselfcertify/certifycustselfonline/v1.00")
	CicuemCuInfTotTcVo certifycustselfonline(CicuemCuInfTotTcVo cicuemCuInfTotTcVo);
	/**
	 * 고객본인인증2(가입인증)
	 * @param cicuemCuInfTotTcVo
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custselfcertify/certifyconfirm/v1.00")
	CicuemCuInfTotTcVo certifyconfirm(CicuemCuInfTotTcVo cicuemCuInfTotTcVo);
	/**
	 * 고객본인인증2(단순본인인증)
	 * @param cicuemCuInfTotTcVo
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custselfcertify/certifyselfconfirm/v1.00")
	CicuemCuInfTotTcVo certifyselfconfirm(CicuemCuInfTotTcVo cicuemCuInfTotTcVo);
	/**
	 * 점유인증1
	 * @param cicuemCuInfTotTcVo
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custselfcertify/certifycompanyonline/v1.00")
	CicuemCuInfTotTcVo certifycompanyonline(CicuemCuInfTotTcVo cicuemCuInfTotTcVo);
	/**
	 * 점유인증2(확인)
	 * @param cicuemCuInfTotTcVo
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custselfcertify/certifycompanyconfirm/v1.00")
	CicuemCuInfTotTcVo certifycompanyconfirm(CicuemCuInfTotTcVo cicuemCuInfTotTcVo);
	/**
	 * 외국인인증1(등록번호)
	 * @param cicuemCuInfTotTcVo
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custselfcertify/certifyforeignonline/v1.00")
	CicuemCuInfTotTcVo certifyforeignonline(CicuemCuInfTotTcVo cicuemCuInfTotTcVo);
	/**
	 * 외국인 인증2(전화번호)
	 * @param cicuemCuInfTotTcVo
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custselfcertify/certifycustforeignselfonline/v1.00")
	CicuemCuInfTotTcVo certifycustforeignselfonline(CicuemCuInfTotTcVo cicuemCuInfTotTcVo);
	/**
	 * 본인인증 재전송
	 * @param cicuemCuInfTotTcVo
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custselfcertify/certifyconfirmretry/v1.00")
	CicuemCuInfTotTcVo certifyconfirmretry(CicuemCuInfTotTcVo cicuemCuInfTotTcVo);
	/**
	 * 회원가입
	 * @param cicuemCuInfTotTcVo
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custinfrcommgnt/createcicuemcuinfrjoin/v1.00")
	@CaseConverter({"cicuemCuAdtInfTcVo", "CicuemCuAdtInfTcVo",
					"cicuedCuChCsTcVo", "CicuedCuChCsTcVo",
					"cicuedCuTncaTcVo", "CicuedCuTncaTcVo",
					"cicuemCuOptiCsTcVo", "CicuemCuOptiCsTcVo"})
	CicuemCuInfCoOutVo createcicuemcuinfrjoin(CicuemCuInfTotTcVo cicuemCuInfTotTcVo);
	
	/**
	 * 경로가입.
	 * @param cicuedCuChListTcVo
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custinfrcommgnt/createcicuemcuinfrjoin/v1.00")
	CicuemCuInfCoOutVo createcustchnjoin(CicuedCuChListTcVo cicuedCuChListTcVo);
	
	/**
	 * 회원업데이트
	 * @param cicuemCuInfTotTcVo
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custinfrcommgnt/updatecicuemcuinfrfull/v1.00")
	@CaseConverter({"cicuedCuTncaTcVo", "CicuedCuTncaTcVo",
					"cicuedCuChCsTcVo", "CicuedCuChCsTcVo",
					"cicuemCuOptiTcVo", "CicuemCuOptiTcVo",
					"cicuemCuAdtInfTcVo", "CicuemCuAdtInfTcVo"})
	CicuemCuInfCoOutVo updatecicuemcuinfrfull(CicuemCuInfTotTcVo cicuemCuInfTotTcVo);

	/**
	 * 고객상세조회
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custinfrcommgnt/getcicuemcuinfrbyincsno/v1.00")
	CicuemCuInfTotTcVo getcicuemcuinfrbyincsno(CicuemCuInfTotTcVo cicuemCuInfTotTcVo);
	
	/**
	 * 서비스약관동의/철회
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custagreemgnt/savecicuedcutnca/v1.00")
	SimpleloVo savecicuedcutnca(CicuemCuInfTotTcVo cicuemCuInfTotTcVo);
	
	/**
	 * 마케팅정보수신동의/철회
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custagreemgnt/savecicuemcuopti/v1.00")
	SimpleloVo savecicuemcuopti(CicuemCuOptiCsTcVo cicuemCuOptiCsTcVo);
	
	/**
	 * 마케팅정보수신동의저장 다건
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "/cip/cit/custmgnt/custmgnt/svc/custagreemgnt/savecicuemcuoptilist/v1.00/")
	SimpleloVo savecicuemcuoptilist(CicuemCuOptiTcResultVo cicuemCuOptiTcResultVo);
	
	/**
	 * 고객탈퇴
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custinfrmgnt/createcicuelcuwt/v1.00")
	LeaverResultVo createcicuelcuwt(CicuedleaveVo cicuedleaveVo);
	
	/**
	 * 아이디중복체크
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custinfrmgnt/getcustidinq/v1.00")
	CicuedCuChIdVo getcustwebidinq(CicuedCuChIdVo cicuedCuChIdVo);

	/**
	 * 마케팅정보수신동의조회
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/custmgnt/svc/custagreemgnt/getcicuemcuoptilist/v1.00")
	CicuemCuOptiTcResultVo getcicuemcuoptilist(CicuemCuInfTotTcVo cicuemCuInfTotTcVo);
	
	
	/**
	 * 포인트 조회.
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/ptmgnt/svc/ptinq/getptinq/v1.00")
	CicueaCuPtAccmTcVo getptinq(CicueaCuPtAccmTcVo cicueaCuPtAccmTcVo);
	
	/**
	 * 포인트 거래내역조회.
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/ptmgnt/svc/ptinq/getpttrbrkdinq/v1.00")
	PtTrBrkdInqOutCbcVo getpttrbrkdinq(PtTrBrkdInqInCbcVo ptTrBrkdInqInCbcVo);
	
	/**
	 * 포인트적립/포인트적립취소/포인트적립망취소/포인트적립부분취소/포인트적립부분망취소
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/ptmgnt/svc/ptacmlcncl/handleptac/v1.00")
	PtAcmlCnclOutCbcVo handleptac(CicuedTrBrkdTcVo cicuedTrBrkdTcVo);
	
	/**
	 * 고객카드등록
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "cip/cit/custmgnt/ptmgnt/svc/ptinq/getpttrbrkdinq/v1.00")
	PtGiftOutCbcVo handlegift(CicuedTrBrkdTcVo cicuedTrBrkdTcVo);
	
	CicuemCuInfCoOutVo createcicuedcucard(CicuedCuCardTcVo cicuedCuCardTcVo);

	/**
	 * 고객등급조회.
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "/cip/cit/custmgnt/custsal/svc/custsal/getcustgrd/v1.00")
	CustGrdVo getcustgrd(CustGrdVo custGrdVo);

	/**
	 * 실적조회.
	 * @return
	 * @throws ApiException
	 */
	@RequestLine(value = "/cip/cit/custmgnt/ptmgnt/svc/ptinq/getprfrinq/v1.00")
	PrfrInqOutCbcVo getprfrinq(PrfrInqInCbcVo prfrInqInCbcVo);
	
	/**
	 * 고객목록조회.
	 * @param cicuemCuInfCoInVo
	 * @return
	 */
	@RequestLine(value = "/cip/cit/custmgnt/custmgnt/svc/custinfrcommgnt/getcicumentcuinfralllist/v1.00")
	CicuemCuInfTcVoList getcicuemcuinfrlist(CicuemCuInfCoInVo cicuemCuInfCoInVo);
	

	/**
	 * 90일 점유인증 체크
	 * @param cicuemCuInfCoInVo
	 * @return
	 */
	@RequestLine(value = "/cip/cit/custmgnt/custmgnt/svc/custselfcertify/certifycheck90/v1.00")
	CicuemCuInfCoOutVo certifycheck90(CicuemCuInfTotTcVo cicuemCuInfCoInVo);
	
	
	/**
	 * 휴대전화인증/변경90일체크
	 * @param cicuemCuInfCoInVo
	 * @return
	 */
	@RequestLine(value = "/cip/cit/custmgnt/custmgnt/svc/custinfrmgnt/athtchgcheck90/v1.00")
	CicuemCuInfCoOutVo athtchgcheck90(CicuemCuInfTotTcVo cicuemCuInfCoInVo);
	
	/**
	 * 휴대전화인증/변경90일체크
	 * @param cicuemCuInfCoInVo
	 * @return
	 */
	@RequestLine(value = "/cip/cit/custmgnt/custmgnt/svc/custinfrmgnt/athtchgcheck90/v1.00")
	CicuemCuInfTotTcVo athtchgcheck90(Deletecicuedcuchcustwt deletecicuedcuchcustwt);
	
	
	
}
