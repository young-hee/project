package kr.ap.comm.util;

import java.security.Key;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.apache.tomcat.util.codec.binary.Base64;

public class EncryptionUtils {

	private static String key = "amttestapp2018";
	
	public static Key getAESKey() throws Exception {
		Key keySpec;

		byte[] keyBytes = new byte[16];
		byte[] b = key.getBytes("UTF-8");

		int len = b.length;
		if (len > keyBytes.length) {
			len = keyBytes.length;
		}

		System.arraycopy(b, 0, keyBytes, 0, len);
		keySpec = new SecretKeySpec(keyBytes, "AES");

		return keySpec;
	}

	// 암호화
	public static String encAES(String str) throws Exception {
		
		Key keySpec = getAESKey();
		Cipher c = Cipher.getInstance("AES");
		c.init(Cipher.ENCRYPT_MODE, keySpec);
		byte[] encrypted = c.doFinal(str.getBytes("UTF-8"));
		String enStr = new String(Base64.encodeBase64(encrypted));

		return enStr;
	}

	// 복호화
	public static String decAES(String enStr) throws Exception {
		Key keySpec = getAESKey();
		Cipher c = Cipher.getInstance("AES");
		c.init(Cipher.DECRYPT_MODE, keySpec);
		byte[] byteStr = Base64.decodeBase64(enStr.getBytes("UTF-8"));
		String decStr = new String(c.doFinal(byteStr), "UTF-8");

		return decStr;
	}

}
