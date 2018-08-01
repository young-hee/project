package kr.ap.comm.support;

import kr.ap.comm.support.constants.DisplayChannel;
import org.springframework.util.ObjectUtils;

public class APRequestContext {

	private static final ThreadLocal<DisplayChannel> displayChannelThreadLocal = new ThreadLocal<>();
	private static final ThreadLocal<String> accessTokenThreadLocal = new ThreadLocal<>();

	public static void setDisplayChannel(DisplayChannel displayChannel) {
		displayChannelThreadLocal.set(displayChannel);
	}

	public static DisplayChannel getDisplayChannel() {
		DisplayChannel displayChannel = displayChannelThreadLocal.get();
		return displayChannel;
	}

	public static void clearDisplayChannel() {
		displayChannelThreadLocal.remove();
	}

	/**
	 * PC
	 *
	 * @return
	 */
	public static boolean isPC() {
		switch (getDisplayChannel()) {
			case PC:
				return true;
			default:
				return false;
		}
	}

	/**
	 * MobileWeb, MobileApp(Android, iOS)
	 *
	 * @return
	 */
	public static boolean isMobileDevice() {
		switch (getDisplayChannel()) {
			case Mobile:
			case iOS:
			case Android:
				return true;
			case PC:
				return false;
			default:
				return false;
		}
	}

	/**
	 * MobileWeb
	 *
	 * @return
	 */
	public static boolean isMobileWeb() {
		switch (getDisplayChannel()) {
			case Mobile:
				return true;
			case PC:
			case iOS:
			case Android:
				return false;
			default:
				return false;
		}
	}

	/**
	 * MobileApp(Android, iOS)
	 *
	 * @return
	 */
	public static boolean isMobileApp() {
		switch (getDisplayChannel()) {
			case iOS:
			case Android:
				return true;
			case Mobile:
			case PC:
				return false;
			default:
				return false;
		}
	}

	/**
	 * Android
	 *
	 * @return
	 */
	public static boolean isAndroid() {
		switch (getDisplayChannel()) {
			case Android:
				return true;
			default:
				return false;
		}
	}

	/**
	 * iOS
	 *
	 * @return
	 */
	public static boolean isiOS() {
		switch (getDisplayChannel()) {
			case iOS:
				return true;
			default:
				return false;
		}
	}

	/**
	 * api에서 사용할 체널정보
	 * <p>
	 * "MobileWeb"
	 * "PCWeb"
	 * "MobileApp"
	 *
	 * @return
	 */
	public static String getDisplayDeviceCh() {
		String displayChannel = null;

		if (!ObjectUtils.isEmpty(getDisplayChannel())) {
			if (DisplayChannel.Mobile.equals(getDisplayChannel())) {
				displayChannel = "MobileWeb";
			} else if (DisplayChannel.PC.equals(getDisplayChannel())) {
				displayChannel = "PCWeb";
			} else {
				displayChannel = "MobileApp";
			}
			return displayChannel;
		}

		return displayChannel;
	}

	public static void setAccessToken(String accessToken) {
		accessTokenThreadLocal.set(accessToken);
	}

	public static String getAccessToken() {
		return accessTokenThreadLocal.get();
	}
}
