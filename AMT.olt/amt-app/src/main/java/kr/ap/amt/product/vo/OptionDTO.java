/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.product.vo;

/**
 * @author Ria@g1project.net
 * @since {version}
 *
 */
public class OptionDTO {
    
    private int code;
    private String name;
    
    public OptionDTO(int code, String name) {
        this.code = code;
        this.name = name;
    }
    
    public OptionDTO() {
        
    }
    
    public int getCode() {
        return code;
    }
    public void setCode(int code) {
        this.code = code;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
