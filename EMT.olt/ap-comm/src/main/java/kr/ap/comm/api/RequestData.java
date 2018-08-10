package kr.ap.comm.api;

import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.constants.SessionKey;
import org.apache.http.HttpResponse;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class RequestData {

	private Logger logger = LoggerFactory.getLogger(getClass());

	private String url;
	private String requestType = "POST";
	private static byte[] data;

	PostData postData = new PostData();
	private int status;

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public static byte[] getData() {
		return data;
	}

	public static void setData(byte[] data) {
		RequestData.data = data;
	}

	public String requestStart(String url, String requestType){
		this.url = url;
		this.requestType = requestType;
		return request();
	}

	public String request() {

		try {
			RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(60000)
				.setConnectTimeout(60000).setConnectionRequestTimeout(60000)
				.build();

			CloseableHttpClient httpClient = HttpClientBuilder.create()
				.disableRedirectHandling()
				.setDefaultRequestConfig(requestConfig)
				.build();

			// AMORE API 는 모두 POST 요청
			HttpPost post = new HttpPost(url);
			addSLTCommonHeaders(post);
			post.setEntity(new StringEntity(postData.toString()));
			if (logger.isDebugEnabled()) {
				logger.debug("[AMORE_API]REQUEST BODY={}", postData.toString());
			}

			// API Call
			HttpResponse response = httpClient.execute(post);
			int statusCode = response.getStatusLine().getStatusCode();
			if (logger.isDebugEnabled()) {
				logger.debug("[AMORE_API]RESPONSE CODE={}", statusCode);
			}

			BufferedReader br = new BufferedReader(
				new InputStreamReader(response.getEntity().getContent(), StandardCharsets.UTF_8));

			StringBuilder sb = new StringBuilder();
			String line = null;
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}

			if (logger.isDebugEnabled()) {
				logger.debug("[AMORE_API]RESPONSE BODY={}", sb.toString());
			}

			// clean up
			br.close();
			httpClient.close();

			return sb.toString();

		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}

		return null;
	}

	/**
	 * SLT 표준화 정의서에 정의되어 있는 Header 영역 내용 추가
	 */
	private void addSLTCommonHeaders(HttpPost post) {
		post.setHeader("Content-Type", "application/json; charset=UTF-8");

		post.setHeader("x-dsp-uuid", UUID.randomUUID().toString());
		Optional<String> userId = getUserId();
		if (userId.isPresent()) {
			post.setHeader("x-dsp-userid", userId.get());
		}
		// FIXME: screenid 값을 가져올수 있는 방안 필요
		post.setHeader("x-dsp-screenid", "screenid");
		post.setHeader("x-dsp-langcd", "ko");
		String serviceUrl = getServiceUrl();
		post.setHeader("x-dsp-serviceURL", serviceUrl);
	}

	private Optional<String> getUserId() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		MemberSession memberSession = (MemberSession) WebUtils.getSessionAttribute(request, SessionKey.LOGIN_USER);
		if (memberSession != null && memberSession.getMember() != null) {
			return Optional.ofNullable(memberSession.getMember().getMemberId());
		}
		return Optional.empty();
	}

	private String getServiceUrl() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		return request.getRequestURI();
	}

	/**
	 * @deprecated <br><b> This method was deprecated </b><br>
	 *
	 * Use the <a href="">doGet(String method)</a> method
	 */
	@Deprecated
	public RequestData doPost(String method) {
		requestStart(method, "POST");
		return this;
	}

	public String doPost(String method, String value) {
		//postData.addData("asd", "application/octet-stream", data);

		logger.debug("[AMORE_API]REQUEST START");
		logger.debug("[AMORE_API]METHOD={}", method);
		postData.setValue(value);
		String str = requestStart(method, "POST");
		return str;
	}

	public void setParam(Object[] value) {
		for (Object object : value) {
			postData.setValue(object);
		}
	}



	public class PostData {

	    class ByteData {
	        byte[] data;
	        String header;
	        String name;

	        ByteData(String name, String contentType, byte[] data) {
	            this.name = name;
	            this.data = data;
	            try {
	                header = "--" + BOUNDARY + CRLF + "Content-Disposition: form-data; name=\"file\"; filename=\"" + URLEncoder.encode(name, encoding) + "\";" + CRLF +
	                        "Content-Type: " + contentType + CRLF + CRLF;
	            } catch(UnsupportedEncodingException e) {
	                e.printStackTrace();
	            }
	        }

	        public int getSize() {
	            return header.length() + data.length + CRLF.length();
	        }


	        public void write(OutputStream out) throws IOException {
	            out.write(header.getBytes());
	            out.write(data);
	            out.write(CRLF.getBytes());
	        }
	    }

	    static final String BOUNDARY = "3C3F786D6C2076657273696F6E2E302220656E636F64696E673D662D38223F3E0A3C6D616E6966";
	    static final String CRLF = "\r\n";
	    private final String encoding;
	    private StringBuilder sb;
	    private String trailer;
	    private List<ByteData> dataList = new ArrayList<ByteData>();


	    public PostData() {
	        this("UTF-8");
	    }

	    public PostData(String encoding) {
	        this.encoding = encoding;
	        sb = new StringBuilder();
	        trailer = "--" + BOUNDARY + "--" + CRLF;
	    }

	    public String getContentType() {
	        return "application/json";
	    }

	    public void setValue(Object value) {
	    	if(sb.length() != 0) {
	    		sb.append(",");
	    	}
			sb.append(value);
	    }

	    public void addData(String name, String contentType, byte[] data) {
	        dataList.add(new ByteData(name, contentType, data));
	    }


	    public long getLength() {
	        long length = sb.toString().getBytes().length;
	        return length;
	    }

	    public String toString() {
	        return sb.toString();
	    }

	    public void write(OutputStream out) throws IOException {
	        out.write(sb.toString().getBytes());
	    }
	}

}
