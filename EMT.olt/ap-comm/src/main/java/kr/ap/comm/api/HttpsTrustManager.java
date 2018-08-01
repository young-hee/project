package kr.ap.comm.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.*;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;

public class HttpsTrustManager implements X509TrustManager {

	private static final X509Certificate[] _AcceptedIssuers = new X509Certificate[]{};
	private static Logger logger = LoggerFactory.getLogger(HttpsTrustManager.class);
	private static TrustManager[] trustManagers;

	public static void allowAllSSL() {
		HttpsURLConnection.setDefaultHostnameVerifier(new HostnameVerifier() {

			@Override
			public boolean verify(String arg0, SSLSession arg1) {
				return true;
			}

		});

		SSLContext context = null;
		if (trustManagers == null) {
			trustManagers = new TrustManager[]{new HttpsTrustManager()};
		}

		try {
			context = SSLContext.getInstance("TLS");
			context.init(null, trustManagers, new SecureRandom());
		} catch (NoSuchAlgorithmException | KeyManagementException e) {
			logger.error(e.getMessage(), e);
		}

		HttpsURLConnection.setDefaultSSLSocketFactory(context != null ? context.getSocketFactory() : null);
	}

	@Override
	public void checkClientTrusted(X509Certificate[] x509Certificates, String s) {
	}

	@Override
	public void checkServerTrusted(X509Certificate[] x509Certificates, String s) {
	}

	public boolean isClientTrusted(X509Certificate[] chain) {
		return true;
	}

	public boolean isServerTrusted(X509Certificate[] chain) {
		return true;
	}

	@Override
	public X509Certificate[] getAcceptedIssuers() {
		return _AcceptedIssuers;
	}
}
