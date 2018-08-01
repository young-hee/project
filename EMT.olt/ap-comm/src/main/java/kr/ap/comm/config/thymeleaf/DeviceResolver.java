package kr.ap.comm.config.thymeleaf;

import kr.ap.comm.support.APRequestContext;

/**
 * DeviceResolver
 * @author ryan
 */
public class DeviceResolver {

	public boolean isiOS() {
		return APRequestContext.isiOS();
	}

	public boolean isAndroid() {
		return APRequestContext.isAndroid();
	}

	public boolean isMobileApp() {
		return APRequestContext.isMobileApp();
	}

	public boolean isMobileWeb() {
		return APRequestContext.isMobileDevice();
	}

	public boolean isPCWeb() {
		return !APRequestContext.isMobileDevice();
	}
}
