/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.comm.support.validator;

import net.g1project.ecp.api.model.sales.guide.InquiryForPost;
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
public class ReviewFormValidator implements Validator{

    @Override
    public void validate(Object target, Errors errors) {

        if (target == null)
            return;
        
        /*if (target instanceof ReviewForPost) {
            ReviewForPost reviewForPost = (ReviewForPost)target;
            
            hasErrors(checkTitle(errors, reviewForPost.getProdReviewTitle(), "prodReviewTitle"));
            hasErrors(checkBody(errors, reviewForPost.getProdReviewBodyText(),"prodReviewBodyText"));
        }*/
        
    }

    @Override
    public boolean supports(Class clazz) {
        // TODO Auto-generated method stub
        return InquiryForPost.class.isAssignableFrom(clazz);
    }
        
    private boolean hasErrors(Errors errors) {
        if (errors.hasErrors()) {
            return true;
        }
        return false;
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
