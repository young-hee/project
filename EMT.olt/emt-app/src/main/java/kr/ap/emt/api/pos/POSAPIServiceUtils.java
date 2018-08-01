package kr.ap.emt.api.pos;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.lang.reflect.Proxy;
import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import kr.ap.comm.api.APIError;
import kr.ap.comm.api.CaseConverter;
import kr.ap.comm.api.RequestData;
import kr.ap.emt.api.pos.vo.POSResultVo;
import net.g1project.ecp.api.exception.ApiException;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;

import feign.Param;
import feign.RequestLine;


public class POSAPIServiceUtils {

    private static final ObjectMapper mapper;
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

	static {
		mapper = new ObjectMapper();
        mapper.setSerializationInclusion(Include.NON_NULL);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}


	private static String getMethod(final Method method) {
		RequestLine requestLine = method.getAnnotation(RequestLine.class);
		return requestLine.value();
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
                        String json = null;
                        if(args.length > 1 || method.getParameters()[0].isAnnotationPresent(Param.class)) {
                        	Map<String, Object> map = new HashMap<String, Object>();
                        	int num = 0;
                            for(Parameter param : method.getParameters()) {
                            	if(args[num] instanceof Number)
                                	map.put(param.getAnnotation(Param.class).value(), ((Number)args[num++]).toString());
                            	else
                            		map.put(param.getAnnotation(Param.class).value(), args[num++]);
                            	
                            }
                            mapper.setDateFormat((DateFormat) dateFormat.clone());
                            json = mapper.writeValueAsString(map);
                            
                        } else {
                        	json = mapper.writeValueAsString(args[0]);
                        }
                        
        				
        				json = methodCaseConvert(method, json);
                        
                        result = data.doPost(baseUrl + getMethod(method), json);
                        if(result == null)
                        	return null;
                        
                		try {
                			if(data.getStatus() >= 200 && data.getStatus() < 300) {
                				
	                			result = methodCaseReverseConvert(method, result);
	                        	Object vo = mapper.readValue(result, clazz);
	                        	if(method.isAnnotationPresent(SuccessCode.class)) {
	                        		String rsltCd = method.getAnnotation(SuccessCode.class).rsltCd();
	                        		if(rsltCd.equals(((POSResultVo)vo).getRsltCd())) {
	                        			return vo;
	                        		} else {
	                        			throw new ApiException(data.getStatus(), ((POSResultVo) vo).getRsltCd(), ((POSResultVo) vo).getRsltMsg());
	                        		}
	                        	}
	                        	return vo;
                			}

                			POSResultVo vo = mapper.readValue(result, POSResultVo.class);
                			throw new ApiException(data.getStatus(), vo.getRsltCd(), vo.getRsltMsg());
                			
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
