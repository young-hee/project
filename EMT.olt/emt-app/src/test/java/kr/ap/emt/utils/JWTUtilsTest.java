package kr.ap.emt.utils;

import kr.ap.comm.util.JwtUtils;
import org.junit.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.*;

public class JWTUtilsTest {

	String invalidAccessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpblJlc3VsdCI6eyJtZW1iZXJTbiI6MTU3LCJtZW1iZXJJZCI6bnVsbCwiZG9ybWFudEFjQ29udmVydFluIjoiTiIsImRvcm1hbnRBY0NvbnZlcnREdCI6bnVsbCwiY2xvc2VFeHBlY3RlZER0IjpudWxsLCJtZW1iZXJTaWdudXBEdCI6MTUyMTYxOTIwNTE4MiwibGFzdExvZ2luRHQiOjE1MjY4Njc1OTc1MjMsInBhc3N3b3JkTG9uZ3RpbWVVbmNoYW5nZWRZbiI6Ik4iLCJjdXJyZW50UGFzc3dvcmRVc2VkUGVyaW9kIjo2MH0sInVzZXJfbmFtZSI6InBvbGxhazJAYW1vcmUubmV0Iiwic2NvcGUiOlsicmVhZCJdLCJleHAiOjE1MjY4NjkzOTcsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiJjNjU3NWE1Yi1kZDBkLTQ4YmEtYTM5Yy00MDY1N2ZlM2YzYjkiLCJjbGllbnRfaWQiOiJjbGllbnRJZFBhc3N3b3JkIn0.KZVh64xIEe8inmAOCw7dTgX32WblunjYpqGwzoVhX5ZA7qOIpEC7DrEKEr3FKjQWn9QBW_TSpzUQNTZEuqaNcV_XI0Gu56l5zbaWX-aUFLMyU5vyz1z8WDsNsWp1VDrMwCbvKW0Hob6mUVyRP1a68IG3il8iaCv-0xg4vRCjde-uBMjuR-Bhka7xEGj0gHRHDNejYCd7A56oJtjk9iE5Nz_8JNNVkilMJSnnGgWPR2rCz4TWTieAI7tPhIEEowW2Fw5ekZeyPfBRmR54W432jytOK4cy5OjBh3HqiFmZfwCxM1P1sMaoU9YYzIjXbUBfXk2MEmF6ny-gg-t0L2pxww";

	@Test
	public void isValidToken() {
		boolean result = JwtUtils.isValidToken(invalidAccessToken);
		assertThat(result, equalTo(false));
	}

	@Test
	public void decodedBody() {
		String body = JwtUtils.decodedBody(invalidAccessToken);
		System.out.println(body);
	}

	@Test
	public void decodedHeader() {
		String header = JwtUtils.decodedHeader(invalidAccessToken);
		System.out.println(header);
	}
}