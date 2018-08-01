package kr.ap.comm.config.thymeleaf;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.Assert.assertThat;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;

@SuppressWarnings("unchecked")
public class UnderscoreJSCollectionsTest {

	private UnderscoreJSCollections collections = new UnderscoreJSCollections();

	@Test
	public void pluck() {
		List<TestData> datas = makeTestDatas();
		List<String> results = (List<String>) collections.pluck(datas, "name");
		assertThat(results, notNullValue());
		System.out.println(results);
	}

	@Test
	public void where() {
		// Given
		List<TestData> datas = makeTestDatas();
		Map<String, Object> properties = new HashMap<>();
		properties.put("name", "name1");
		properties.put("desc", "desc1");

		// When
		List<TestData> results = (List<TestData>) collections.where(datas, properties);

		// Then
		assertThat(results, notNullValue());
		assertThat(results.size(), equalTo(2));
	}

	@Test
	public void where_typeMissMatch() {
		// Given
		List<TestProd> prods = makeTestProds();
		Map<String, Object> properties = new HashMap<>();
		// model: Long, prop val: String
		properties.put("prodSn", "239520");

		// When
		List<TestProd> results = (List<TestProd>) collections.where(prods, properties);

		// Then
		assertThat(results, notNullValue());
		assertThat(results.size(), equalTo(1));
	}

	private List<TestData> makeTestDatas() {
		return Arrays.asList(
			new TestData("1", "name1", "desc1")
			, new TestData("2", "name2", "desc2")
			, new TestData("3", "name3", "desc3")
			, new TestData("4", "name1", "desc1")
		);
	}

	class TestData {
		private String id;
		private String name;
		private String desc;

		TestData() {
		}

		TestData(String id, String name, String desc) {
			this.id = id;
			this.name = name;
			this.desc = desc;
		}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getDesc() {
			return desc;
		}

		public void setDesc(String desc) {
			this.desc = desc;
		}
	}

	class TestProd {
		private Long prodSn;

		TestProd(Long prodSn) {
			this.prodSn = prodSn;
		}

		public Long getProdSn() {
			return prodSn;
		}

		public void setProdSn(Long prodSn) {
			this.prodSn = prodSn;
		}
	}

	private List<TestProd> makeTestProds() {
		return Arrays.asList(new TestProd(239520L), new TestProd(239320L));
	}
}