package kr.ap.comm.api;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.lang.reflect.Type;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import net.g1project.ecp.api.exception.ApiException;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;

import feign.RequestLine;


public class WebDBAPIServiceUtils {


    private static final ObjectMapper mapper;


	static {
		mapper = new ObjectMapper();
        mapper.setSerializationInclusion(Include.NON_NULL);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}


	private static String getMethod(final Method method) {
		RequestLine requestLine = method.getAnnotation(RequestLine.class);
		if(requestLine != null) {
			return requestLine.value();
		}
		throw new RuntimeException("필수 Annotaion 누락!");
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
                        
                        Type t = method.getGenericReturnType();
                        Class<?> clazz = TypeFactory.rawClass(t);

                        HttpHeaders headers = new HttpHeaders();

                        MultiValueMap<String, String> params = new LinkedMultiValueMap<>(headers);

                    	String json = mapper.writeValueAsString(args[0]);
                    	Map<String, String> vo = mapper.readValue(json, Map.class);
                        for(String key : vo.keySet()) {
                        	params.add(key, vo.get(key));
                        }
                        
                        HttpEntity<MultiValueMap<String,String>> request = new HttpEntity<>(params, headers);

                        RestTemplate template = new RestTemplate();
                        ResponseEntity<?> response = template.postForEntity(baseUrl + getMethod(method), request, String.class);
                        String result = (String) response.getBody();

                        if(result == null)
                        	return null;
                        
                		try {
                        	Object rslt = mapper.readValue(result, clazz);
                        	return rslt;
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
