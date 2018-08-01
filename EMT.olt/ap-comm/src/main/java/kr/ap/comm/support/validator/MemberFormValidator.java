package kr.ap.comm.support.validator;

import kr.ap.comm.member.vo.MemberForm;
import net.g1project.ecp.api.client.ap.ApApi;
import net.g1project.ecp.api.client.sales.TermsApi;
import net.g1project.ecp.api.model.ExistsResult;
import net.g1project.ecp.api.model.sales.terms.Terms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
public class MemberFormValidator implements Validator {

    @Autowired
    private ApApi apApi;

    @Autowired
    private TermsApi termsApi;

    @Override
    public boolean supports(Class clazz) {
        //just validate the Customer instances
        return MemberForm.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {

        MemberForm memberForm = (MemberForm) target;

        String validFlag = memberForm.getValidFlag();
        switch (validFlag) {
            case "phoneCert":
                //이름
                if (hasErrors(checkCustNm(errors, memberForm.getCustNm()))) break;
                //내국인/외국인 구분
                if (hasErrors(checkFrclCd(errors, memberForm.getFrclCd()))) break;
                //생년월일
                if (hasErrors(checkAthtDtbr(errors, memberForm.getAthtDtbr()))) break;
                //성별
                if (hasErrors(checkSxclCd(errors, memberForm.getSxclCd()))) break;
                //통신사
                if (hasErrors(checkPhoneCorp(errors, memberForm.getPhoneCorp()))) break;
                //전화번호
                if (hasErrors(checkCellNum(errors, memberForm.getCellNum()))) break;
                break;
            case "foreignCert":
                //이름
                if (hasErrors(checkCustNm(errors, memberForm.getCustNm()))) break;
                //외국인등록번호
                if (hasErrors(checkFrgrRegNum(errors, memberForm.getFrgrRegNum()))) break;
                //전화번호
                if (hasErrors(checkCellNum(errors, memberForm.getCellNum()))) break;
                break;
            case "inputInfo":
                //이름
                if (hasErrors(checkCustNm(errors, memberForm.getCustNm()))) break;
                //내국인/외국인 구분
                if (hasErrors(checkFrclCd(errors, memberForm.getFrclCd()))) break;
                //생년월일
                if (hasErrors(checkAthtDtbr(errors, memberForm.getAthtDtbr()))) break;
                //성별
                if (hasErrors(checkSxclCd(errors, memberForm.getSxclCd()))) break;
                //전화번호
                if (hasErrors(checkCellNum(errors, memberForm.getCellNum()))) break;
                //비밀번호
                if (hasErrors(checkPassword(errors, memberForm.getUserPwdEc()))) break;
                //약관
                if (hasErrors(checkTermsChk(errors, memberForm.getTermsChk()))) break;
                if (!ObjectUtils.isEmpty(memberForm.getOptionYn())
                        && memberForm.getOptionYn().length > 0) {
                    if (hasErrors(checkTermsChk(errors, memberForm.getOptionYn()))) break;
                }
                break;
            default:
                break;
        }
    }

    private boolean hasErrors(Errors errors) {
        if (errors.hasErrors()) {
            return true;
        }
        return false;
    }

    private Errors checkCustNm(Errors errors, String custNm) {
        if (StringUtils.isEmpty(custNm)) {
            errors.rejectValue("custNm", "error.null.custNm", "이름을 입력해 주세요.");
        } else {
            String regex = "[`~!@#$%^&*|\\\\\\'\\\";:\\/?]+";
            if (Pattern.compile(regex).matcher(custNm).find()) {
                errors.rejectValue("custNm", "error.format.custNm", "이름을 정확히 입력해 주세요.");
            }
        }
        return errors;
    }

    private Errors checkFrclCd(Errors errors, String frclCd) {
        if (StringUtils.isEmpty(frclCd)) {
            errors.rejectValue("frclCd", "error.null.frclCd", "내/외국인 구분을 선텍해 수제요.");
        }
        return errors;
    }

    private Errors checkPsnDtbr(Errors errors, String psnDtbr) {
        if (StringUtils.isEmpty(psnDtbr)) {
            errors.rejectValue("psnDtbr", "error.null.psnDtbr", "생년월일을 입력하세요.");
        } else {
            String regex = "[0-9]{4}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{1}";
            if (!Pattern.matches(regex, psnDtbr)) {
                errors.rejectValue("psnDtbr", "error.format.psnDtbr", "생년월일을 정확히 입력해 주세요.");
            }
        }
        return errors;
    }

    private Errors checkAthtDtbr(Errors errors, String athtDtbr) {
        if (StringUtils.isEmpty(athtDtbr)) {
            errors.rejectValue("athtDtbr", "error.null.athtDtbr", "생년월일을 입력하세요.");
        } else {
            String regex = "[0-9]{4}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{1}";
            if (!Pattern.matches(regex, athtDtbr)) {
                errors.rejectValue("athtDtbr", "error.format.athtDtbr", "생년월일을 정확히 입력해 주세요.");
            }
        }
        return errors;
    }

    private Errors checkSxclCd(Errors errors, String sxclCd) {
        if (StringUtils.isEmpty(sxclCd)) {
            errors.rejectValue("sxclCd", "error.null.sxclCd", "성별을 선택해 주세요.");
        }
        return errors;
    }

    private Errors checkPhoneCorp(Errors errors, String phoneCorp) {
        if (StringUtils.isEmpty(phoneCorp)) {
            errors.rejectValue("phoneCorp", "error.null.phoneCorp", "통신사를 선택해 주세요.");
        }
        return errors;
    }

    private Errors checkCellNum(Errors errors, String cellNum) {
        if (StringUtils.isEmpty(cellNum)) {
            errors.rejectValue("cellNum", "error.null.cellNum", "전화번호를 입력해 주세요.");
        } else {
            String regex = "(010|011|016|017|018|019)\\d{7,8}";
            if (!Pattern.matches(regex, cellNum)) {
                errors.rejectValue("cellNum", "error.format.cellNum", "전화번호를 정확히 입력해 주세요.");
            }
        }
        return errors;
    }

    private Errors checkFrgrRegNum(Errors errors, String frgrRegNum) {
        if (StringUtils.isEmpty(frgrRegNum)) {
            errors.rejectValue("frgrRegNum", "error.null.frgrRegNum", "외국인등록번호를 입력해 주세요.");
        } else {
            String regex = "^\\d{13}$";
            if (!Pattern.matches(regex, frgrRegNum)) {
                errors.rejectValue("frgrRegNum", "error.format.frgrRegNum", "외국인 등록번호에 13자리 숫자만 입력이 가능합니다.");
            }
        }
        return errors;
    }

    private Errors checkPassword(Errors errors, String userPwdEc) {
        if (StringUtils.isEmpty(userPwdEc)) {
            errors.rejectValue("userPwdEc", "error.null.userPwdEc", "비밀번호를 입력해 주세요.");
        } else {
            String regex1 = ".*[0-9]+.*";
            String regex2 = ".*[a-z]+.*";
            String regex3 = ".*[A-Z]+.*";
            String regex4 = ".*[?=.*!\"#$%&'()*+,-./:;<=>?@\\[\\]^_`{|}~]+.*";

            int i1 = Pattern.matches(regex1, userPwdEc) == true ? 1 : 0;
            int i2 = Pattern.matches(regex2, userPwdEc) == true ? 1 : 0;
            int i3 = Pattern.matches(regex3, userPwdEc) == true ? 1 : 0;
            int i4 = Pattern.matches(regex4, userPwdEc) == true ? 1 : 0;

            if ((i1+i2+i3+i4) < 2 && (userPwdEc.length() < 6 || userPwdEc.length() > 16)) {
                errors.rejectValue("userPwdEc", "error.format.userPwdEc", "비밀번호는 영문 대소문자, 숫자, 특수문자 2가지 이상을 조합하여 6~16자로 입력해 주세요.");
            }
        }
        return errors;
    }

    private Errors checkTermsChk(Errors errors, String[] termsChk) {
        if (ObjectUtils.isEmpty(termsChk)) {
            errors.rejectValue("termsChk", "error.null.terms", "약관동의 선택해 주세요.");
        } else {
            Map<String, String> termsChkMap = arrayToMap(termsChk);
            String terms = termsChkMap.keySet().stream().collect(Collectors.joining(","));
            if (!ObjectUtils.isEmpty(terms)) {
                List<Terms> ts = termsApi.getTerms(terms.toString());
                if (!ObjectUtils.isEmpty(ts) && termsChkMap.size() == ts.size()) {
                    ts.forEach((Terms t) -> {
                        termsChkMap.forEach((k, v) -> {
                            if (t.getTermsDisplayCode().equals(k)) {
                                if ("Y".equals(t.getAgreeMandatoryYn())) {
                                    if (!"Y".equals(v)) {
                                        errors.rejectValue("termsChk", "error.format.termsChk", "약관동의 정확히 선택해 주세요.");
                                    }
                                }
                            }
                        });
                    });
                } else {
                    errors.rejectValue("termsChk", "ecp.system.error", "[ECP]약관오류");
                }
            } else {
                errors.rejectValue("termsChk", "ecp.system.error", "[ECP]약관오류");
            }
        }
        return errors;
    }

    public ExistsResult memberExistsById(String memberId) {
        return apApi.memberExistsById(memberId);
    }

    /**
     * [{id:value}]
     * @param optiYn
     * @return
     */
    private Map<String, String> arrayToMap(String[] optiYn) {
        return Arrays.asList(optiYn)
                .stream()
                .map(elem -> elem.split(":"))
                .filter(elem -> elem.length == 2)
                .collect(Collectors.toMap(e -> e[0], e -> e[1]));
    }

}