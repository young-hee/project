package kr.ap.comm.config;

import kr.ap.comm.config.SpringSessionConfig.SpringSessionConfigCondition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.core.type.AnnotatedTypeMetadata;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.session.data.redis.config.ConfigureRedisAction;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;
import org.thymeleaf.util.StringUtils;

@Configuration
@EnableRedisHttpSession
@Conditional(SpringSessionConfigCondition.class)
public class SpringSessionConfig extends AbstractHttpSessionApplicationInitializer {

	@Autowired
	private Environment env;

	@Bean
	public LettuceConnectionFactory connectionFactory() {
		LettuceConnectionFactory factory = new LettuceConnectionFactory();
		String hostName = env.getProperty("spring.redis.host");
		if (StringUtils.isEmpty(hostName)) {
			throw new IllegalArgumentException("Property 'spring.redis.host' is not defined.");
		}
		factory.setHostName(hostName);
		int port = env.getProperty("spring.redis.port", int.class, 6379);
		int dbIndex = env.getProperty("spring.redis.database", int.class, 2);
		factory.setPort(port);
		factory.setDatabase(dbIndex); // DB '2' 번으로

		return factory;
	}

	@Bean
	public static ConfigureRedisAction configureRedisAction() {
		return ConfigureRedisAction.NO_OP;
	}

	public static class SpringSessionConfigCondition implements Condition {

		final String STORE_TYPE_KEY = "spring.session.store-type";

		@Override
		public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
			Environment env = context.getEnvironment();
			return env.containsProperty(STORE_TYPE_KEY)
				&& !env.getProperty(STORE_TYPE_KEY).equalsIgnoreCase("none");

		}
	}
}
