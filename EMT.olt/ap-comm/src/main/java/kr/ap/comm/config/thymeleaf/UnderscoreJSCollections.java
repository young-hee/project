package kr.ap.comm.config.thymeleaf;

import java.lang.reflect.Field;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.ReflectionUtils.FieldCallback;
import org.springframework.util.ReflectionUtils.FieldFilter;

/**
 * Underscore.js 의 collecions 의 기능들중 몇가지 구현
 *
 * @author ryan
 */
public class UnderscoreJSCollections {

	private Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * Extracting a list of property values.
	 * @param list
	 * @param propertyName
	 * @return list of property values
	 */
	public List<?> pluck(List<?> list, String propertyName) {
		List<Object> results = new ArrayList<>();
		list.forEach(o -> {
			ReflectionUtils.doWithFields(o.getClass(), new FieldCallback() {
				@Override
				public void doWith(Field field) throws IllegalArgumentException, IllegalAccessException {
					ReflectionUtils.makeAccessible(field);
					results.add(field.get(o));
				}
			}, new FieldFilter() {
				@Override
				public boolean matches(Field field) {
					return propertyName.equals(field.getName());
				}
			});
		});
		return results;
	}

	/**
	 * Looks through each value in the list, returning an array of all the values that matches the key-value pairs listed in properties.
	 *
	 * @param list
	 * @param properties
	 * @return list of matches values
	 */
	public List<?> where(List<?> list, Map<String, Object> properties) {
		List<Object> results = new ArrayList<>();
		if (properties == null) {
			return Collections.emptyList();
		}
		Set<String> keys = properties.keySet();
		list.forEach(o -> {
			boolean match = true;
			try {
				for (String key : keys) {
					Field field = ReflectionUtils.findField(o.getClass(), key);
					ReflectionUtils.makeAccessible(field);
					String srcStr = String.valueOf(field.get(o));
					String searchStr = String.valueOf(properties.get(key));
					if (searchStr.equals(srcStr) == false) {
						match = false;
						break;
					}
				}

			} catch (IllegalAccessException e) {
				logger.error(e.getMessage(), e);
			}

			if (match) {
				results.add(o);
			}
		});
		return results;
	}
}
