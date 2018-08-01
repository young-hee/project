package kr.ap.emt.api.pos;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 해당 Annotation이 존재할 경우, rsltCd 코드가 지정된 리턴 코드 이외에는 전부 오류로 처리됩니다.
 * @author pollak
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface SuccessCode {
	  String rsltCd();
}
