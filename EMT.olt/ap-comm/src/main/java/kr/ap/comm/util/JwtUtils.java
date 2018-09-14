package kr.ap.comm.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Date;

public class JwtUtils {

	private static Logger logger = LoggerFactory.getLogger(JwtUtils.class);
	private static ObjectMapper mapper = new ObjectMapper();

	public static boolean isValidToken(String accessToken) {
		String body = decodedBody(accessToken);

		if (body == null) {
			return false;
		}

		try {
			JsonNode node = mapper.readTree(body);
			long exp = node.get("exp").longValue();
			Date now = new Date();
			Date expiration = new Date(exp * 1000);
			return expiration.after(now);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
		return false;
	}

	/**
	 * 입력받은 토큰의 payload 에서 memberSn 값을 가져온다.
	 * @param token jwt access token
	 * @return menberSn, 값이 없을경우 {@code null} 반환
	 */
	public static Long getMemberSn(String token) {
		String body = decodedBody(token);
		if (body == null) {
			return null;
		}

		JsonNode root = readTree(body);
		if (root == null) {
			return null;
		}

		JsonNode loginResult = root.get("loginResult");
		if (loginResult == null) {
			return null;
		}

		return loginResult.get("memberSn").asLong();
	}

	public static String decodedBody(String token) {
		try {
			String[] split = token.split("\\.");
			String body = getJson(split[1]);
			return body;
		} catch (UnsupportedEncodingException e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

	public static String decodedHeader(String token) {
		try {
			String[] split = token.split("\\.");
			String body = getJson(split[0]);
			return body;
		} catch (UnsupportedEncodingException e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

	private static String getJson(String strEncoded) throws UnsupportedEncodingException {
		byte[] decodedBytes = Base64.getDecoder().decode(strEncoded);
		return new String(decodedBytes, "UTF-8");
	}

	public static JsonNode readTree(String json) {
		JsonNode node = null;
		try {
			node = mapper.readTree(json);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
		return node;
	}
}
