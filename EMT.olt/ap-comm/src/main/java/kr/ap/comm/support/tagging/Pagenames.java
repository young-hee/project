package kr.ap.comm.support.tagging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.StringUtils;

import java.io.*;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 페이지 이름 목록
 */
public class Pagenames {

	private Logger logger = LoggerFactory.getLogger(getClass());

	private final String UNDEFINED = "undefined";
	private Map<String, String> pagenameMap = new ConcurrentHashMap<>();

	public String getPagename(String uri) {
		if (pagenameMap.isEmpty()) {
			logger.warn("Pagenames data is not initialized.");
			return UNDEFINED;
		}
		String pagename = pagenameMap.get(uri);
		if (StringUtils.hasText(pagename)) {
			return pagename;
		}
		return UNDEFINED;
	}

	/**
	 * 요청 URL 에 매핑된 페이지이름 데이터를 불러온다.
	 * @param mallId
	 * @throws IllegalArgumentException 정의된 데이터 파일을 찾지 못할때
	 */
	public void initialize(String mallId) {
		StringBuilder filename = new StringBuilder("pagename_url_");
		filename.append(mallId).append(".csv");

		Resource resource = new ClassPathResource(filename.toString());
		if (!resource.isReadable()) {
			String errMsg = String.format("Classpath resource '%s' is not found.", filename.toString());
			throw new IllegalArgumentException(errMsg);
		}

		try (BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
			String line;
			while ((line = br.readLine()) != null) {
				String[] temp = StringUtils.tokenizeToStringArray(line, ",");
				if (temp.length > 1) {
					pagenameMap.put(temp[1], temp[0]); // key: uri, value: pagename
				}
			}
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
	}
}
