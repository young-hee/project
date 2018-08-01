/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.comm.support.validator;

import net.g1project.ecp.api.model.sales.guide.InquiryPost;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.regex.Pattern;

/**
 * @author Ria@g1project.net
 * @since {version}
 *
 */

@Component
public class CSFormValidator implements Validator{

    @Override
    public void validate(Object target, Errors errors) {
        // TODO Auto-generated method stub
        
        if (target == null)
            return;
        
        if (target instanceof InquiryPost) {
            InquiryPost inquiryPost = (InquiryPost)target;
            
            hasErrors(checkTitle(errors, inquiryPost.getInquiryTitle(), "inquiryTitle"));
            hasErrors(checkBody(errors, inquiryPost.getInquiryBodyText(), "inquiryBodyText"));
            hasErrors(checkEmail(errors, inquiryPost.getCustomerEmailAddress(), "customerEmailAddress"));
            hasErrors(checkCellNum(errors, inquiryPost.getCustomerPhoneNo1().getPhoneNo()));
       /* }else if (target instanceof ReviewForPost) {
            ReviewForPost reviewForPost = (ReviewForPost)target;
            
            hasErrors(checkTitle(errors, reviewForPost.getProdReviewTitle(), "prodReviewTitle"));
            hasErrors(checkBody(errors, reviewForPost.getProdReviewBodyText(),"prodReviewBodyText"));*/
        }
        
    }

    @Override
    public boolean supports(Class clazz) {
        // TODO Auto-generated method stub
        return InquiryPost.class.isAssignableFrom(clazz);
    }
        
    private boolean hasErrors(Errors errors) {
        if (errors.hasErrors()) {
            return true;
        }
        return false;
    }
    
    private Errors checkCellNum(Errors errors, String cellNum) {
        String regex = "(010|011|016|017|018|019)\\d{7,8}";
        if (!cellNum.isEmpty() && !Pattern.matches(regex, cellNum)) {
            errors.rejectValue("customerPhoneNo1.phoneNo", "error.format.cellNum", "올바른 휴대폰 번호를 입력해주세요.");
        }
        return errors;
    }
    
    private Errors checkEmail(Errors errors, String email, String field) {
        if(StringUtils.isEmpty(email)) {
			errors.rejectValue(field, "error.null.email", "이메일을 입력해주세요");
		} else {
			String regex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
			if (!Pattern.matches(regex, email)) {
				errors.rejectValue(field, "error.format.email", "유효한 email형식이 아닙니다.");
			}
        }
        return errors;
    }
    
    private Errors checkTitle(Errors errors, String title, String field) {
        if(StringUtils.isEmpty(title)) {
            errors.rejectValue(field, "error.null.title", "제목을 입력해주세요");
        } else {
            String regex = "^[\\s]*$";
            if(Pattern.matches(regex, title)) {
                errors.rejectValue(field, "error.format.title", "제목을 입력해주세요");
            }
        }
        
        return errors;
    }
    
    private Errors checkBody(Errors errors, String body, String field) {
        if(StringUtils.isEmpty(body)) {
            errors.rejectValue(field, "error.null.body", "내용을 입력해주세요");
        } else {
            String regex = "^[\\s]*$";
            if(Pattern.matches(regex, body)) {
                errors.rejectValue(field, "error.format.body", "내용을 입력해주세요");
            }
        }
        
        return errors;
    }
}
