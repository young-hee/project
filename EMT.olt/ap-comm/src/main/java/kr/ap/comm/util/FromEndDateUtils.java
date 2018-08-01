package kr.ap.comm.util;

import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;

public class FromEndDateUtils {
	private static Logger logger = LoggerFactory.getLogger(FromEndDateUtils.class);

	/**
	 * init from date time
	 *
	 * @param fromDate
	 * @return
	 */
	public static Date initFromDate(Date fromDate){

		fromDate = DateUtils.setHours(fromDate, 0);
		fromDate = DateUtils.setMinutes(fromDate, 0);
		fromDate = DateUtils.setSeconds(fromDate, 0);
		fromDate = DateUtils.setMilliseconds(fromDate, 0);

		return fromDate;
	}

	/**
	 * init end date time
	 *
	 * @param endDate
	 * @return
	 */
	public static Date initEndDate(Date endDate) {

		endDate = DateUtils.setHours(endDate, 23);
		endDate = DateUtils.setMinutes(endDate, 59);
		endDate = DateUtils.setSeconds(endDate, 59);
		endDate = DateUtils.setMilliseconds(endDate, 999);

		return endDate;
	}
}
