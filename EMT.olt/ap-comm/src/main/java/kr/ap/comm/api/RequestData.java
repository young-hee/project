package kr.ap.comm.api;

import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.constants.SessionKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.WebUtils;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
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
//	private static String SERVER_URL="http://localhost:3030/sub/";

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

		HttpsURLConnection https = null;
		String resultStr = "";

		try {
			URL serverUrl = new URL(url);
			https = (HttpsURLConnection) serverUrl.openConnection();
			HttpURLConnection.setFollowRedirects(false);
			https.setConnectTimeout(60000);
			https.setReadTimeout(60000);
			https.setRequestMethod(requestType);
			if ("POST".equals(requestType)) {
				https.setDoInput(true);
				https.setDoOutput(true);
				https.setRequestProperty("Charset", "utf-8");
				https.setRequestProperty("Content-Type", "application/json");
				https.setRequestProperty("Content-Length", postData.getLength() + "");

				// SLT 헤더추가
				addSLTCommonHeaders(https);

				OutputStream out_stream = https.getOutputStream();
				postData.write(out_stream);
				logger.debug("[AMORE_API]REQUEST BODY={}", postData.toString());
				out_stream.flush();
				out_stream.close();
			}

			BufferedReader read = null;
			InputStream error = https.getErrorStream();
			if (error != null) {
				InputStreamReader isr = new InputStreamReader(error, StandardCharsets.UTF_8);
				read = new BufferedReader(isr);

				StringBuilder sb = new StringBuilder();

				String line = null;
				while ((line = read.readLine()) != null) {
					sb.append(line);
				}
				resultStr = sb.toString();
			}
			https.connect();
			this.status = https.getResponseCode();
			logger.debug("[AMORE_API]RESPONSE CODE={}", https.getResponseCode());
			InputStream is = https.getInputStream();
			InputStreamReader isr = new InputStreamReader(is, StandardCharsets.UTF_8);
			read = new BufferedReader(isr);

			StringBuilder sb = new StringBuilder();

			String line = null;
			while ((line = read.readLine()) != null) {
				sb.append(line);
			}
			resultStr = sb.toString();
			logger.debug("[AMORE_API]RESPONSE BODY={}", resultStr);

			read.close();

			return resultStr;

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if (https != null) {
				https.disconnect();
			}
		}
		return null;
	}

	/**
	 * SLT 표준화 정의서에 정의되어 있는 Header 영역 내용 추가
	 */
	private void addSLTCommonHeaders(HttpsURLConnection https) {
		https.setRequestProperty("x-dsp-uuid", UUID.randomUUID().toString());
		Optional<String> userId = getUserId();
		if (userId.isPresent()) {
			https.setRequestProperty("x-dsp-userid", userId.get());
		}
		// FIXME: screenid 값을 가져올수 있는 방안 필요
		https.setRequestProperty("x-dsp-screenid", "screenid");
		https.setRequestProperty("x-dsp-langcd", "ko");
		String serviceUrl = getServiceUrl();
		https.setRequestProperty("x-dsp-serviceURL", serviceUrl);
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
