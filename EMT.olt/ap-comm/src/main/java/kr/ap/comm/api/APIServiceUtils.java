package kr.ap.comm.api;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.lang.reflect.Type;

import net.g1project.ecp.api.exception.ApiException;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;


public class APIServiceUtils {

	private static final String methodBase = "cit/$$/v1.00";
    private static final ObjectMapper mapper;


	static {
		mapper = new ObjectMapper();
        mapper.setSerializationInclusion(Include.NON_NULL);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}


	private static String getMethod(final Method method) {
//		RequestLine requestLine = method.getAnnotation(RequestLine.class);
//		if(requestLine != null) {
//			return requestLine.value();
//		}
		return methodBase.replace("$$", method.getName());
	}
	
    @SuppressWarnings("unchecked")
    public static <T> T createClientProxy(
            ClassLoader classLoader,
            Class<T> proxyInterface, String baseUrl,
            final boolean useNamedParams) {

        // create and return the proxy
        return (T) Proxy.newProxyInstance(
                classLoader,
                new Class<?>[] { proxyInterface },
                new InvocationHandler() {

                    public Object invoke(final Object proxy, final Method method, final Object[] args)
                            throws Throwable {
                        if (method.getDeclaringClass() == Object.class) {
                            return proxyObjectMethods(method, proxy, args);
                        }
                        
                        String result = null;
                        Type t = method.getGenericReturnType();
                        Class<?> clazz = TypeFactory.rawClass(t);
                        RequestData data = new RequestData();

                    	String json = mapper.writeValueAsString(args[0]);
        				
        				json = methodCaseConvert(method, json);
                        
                        result = data.doPost(baseUrl + getMethod(method), json);
                        if(result == null)
                        	return null;
                        
                		try {
                			result = methodCaseReverseConvert(method, result);
                			
	                    	if(!result.contains("EFWKSVPAR")) {
	                        	Object vo = mapper.readValue(result.replace(clazz.getSimpleName(), ""), clazz);
	                        	return vo;
	                    	} else {
	                    		APIError error = null;
	                    		try {
	                    			error = mapper.readValue(result, APIError.class);
	                    		} catch(Exception e) {
	                    		}
	                    		
                    			throw new ApiException(data.getStatus(), error.getMessageCode(), error.getMessage());
	                    	}
                		} catch(JsonParseException e) {
                			throw new Exception(result);
                		}
            	        
                    }
                });
    	}
        
        

        protected static String methodCaseConvert(Method method, String json) {
        	if(!method.isAnnotationPresent(CaseConverter.class)) {
        		return json;
        	}
        	CaseConverter convertInfo = method.getAnnotation(CaseConverter.class);
        	boolean b = true;
        	String temp = null;
        	StringBuffer sb = new StringBuffer(json);
        	for(String str : convertInfo.value()) {
        		if(b) {
        			temp = str;
        		} else {
        			int start = sb.indexOf(temp);
        			if(start != -1)
        				sb.replace(start, start + temp.length(), str);
        		}
        		b = !b;
        	}
        	
        	
        	return sb.toString();
        }
        
        protected static String methodCaseReverseConvert(Method method, String json) {
        	if(!method.isAnnotationPresent(CaseConverter.class)) {
        		return json;
        	}
        	CaseConverter convertInfo = method.getAnnotation(CaseConverter.class);
        	boolean b = true;
        	String temp = null;
        	StringBuffer sb = new StringBuffer(json);
        	for(String str : convertInfo.value()) {
        		if(b) {
        			temp = str;
        		} else {
        			int start = sb.indexOf(str);
        			if(start != -1)
        				sb.replace(start, start + str.length(), temp);
        		}
        		b = !b;
        	}
        	
        	
        	return sb.toString();
        }
		private static Object proxyObjectMethods(Method method, Object proxyObject, Object[] args) {
            String name = method.getName();
            if (name.equals("toString")) {
                return proxyObject.getClass().getName() + "@" + System.identityHashCode(proxyObject);
            }
            if (name.equals("hashCode")) {
                return System.identityHashCode(proxyObject);
            }
            if (name.equals("equals")) {
                return proxyObject == args[0];
            }
            throw new RuntimeException(method.getName() + " is not a member of java.lang.Object");
        }
    

}
