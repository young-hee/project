package kr.ap.comm.api;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;

@java.lang.annotation.Target(METHOD)
@Retention(RUNTIME)
public @interface CaseConverter {

	  String[] value();
	
}
