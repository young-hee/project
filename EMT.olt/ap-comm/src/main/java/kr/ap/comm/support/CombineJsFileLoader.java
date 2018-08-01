package kr.ap.comm.support;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.yaml.snakeyaml.Yaml;

import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CombineJsFileLoader {

    private static Logger logger =LoggerFactory.getLogger(CombineJsFileLoader.class);
    private Map<String, List<String>> jsfiles;

    public Map<String, List<String>> getJsFiles() {
        String channelPath = null;
        if (APRequestContext.isMobileDevice() || APRequestContext.isMobileApp()) {
            channelPath = "/mo/ko";
        } else {
            channelPath = "/pc/ko";
        }

        Resource resource = new ClassPathResource("/combine-files" + channelPath + "/js-files.yml");
        if (useCache(resource)) {
            if (jsfiles == null) {
                jsfiles = load(resource, channelPath);
            }
            return jsfiles;
        } else {
            jsfiles = load(resource, channelPath);
            return jsfiles;
        }

    }

    private boolean useCache(Resource resource) {
        long interval = 1000 * 60; // 1분 TODO property 로 설정 할 수 있게.
        boolean useCache = false;
        try {
            useCache = (resource.lastModified() + interval) > System.currentTimeMillis();
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }
        return useCache;
    }

    private Map<String, List<String>> load(Resource resource, String channelPath) {
        logger.debug("Loading js-files.yml...");
        try (InputStream is = resource.getInputStream()) {
            Yaml yaml = new Yaml();
            Map<String, Object> y = (Map<String, Object>) yaml.load(is);
            String js = yaml.dump(y.get("combine-js"));
            return addChannelAndLangCode((Map<String, List<String>>) yaml.load(js), channelPath);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return new LinkedHashMap<>();
        }
    }

    private Map<String, List<String>> addChannelAndLangCode(Map<String, List<String>> jsmap, final String channelPath) {
        Map<String, List<String>> map = jsmap.entrySet().stream().collect(Collectors.toMap(e -> e.getKey(), e -> {
            return e.getValue().stream().map(v -> channelPath + v).collect(Collectors.toList());
        }));
        return map;
    }
}
