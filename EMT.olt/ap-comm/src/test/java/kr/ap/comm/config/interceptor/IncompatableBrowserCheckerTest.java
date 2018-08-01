package kr.ap.comm.config.interceptor;

import org.junit.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.*;

public class IncompatableBrowserCheckerTest {

    IncompatableBrowserChecker checker = new IncompatableBrowserChecker();

    @Test
    public void isIncompatibleBrowser() {
        String userAgent = "";
        boolean b = checker.isIncompatibleBrowser(userAgent);
        assertThat(b, equalTo(true));

        // IE 10
        userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
        b = checker.isIncompatibleBrowser(userAgent);
        assertThat(b, equalTo(false));

        // IE 9
        userAgent = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)";
        b = checker.isIncompatibleBrowser(userAgent);
        assertThat(b, equalTo(false));

        // IE 11
        userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko";
        b = checker.isIncompatibleBrowser(userAgent);
        assertThat(b, equalTo(false));

        // IE 8
        userAgent = "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)";
        b = checker.isIncompatibleBrowser(userAgent);
        assertThat(b, equalTo(true));

        // Chrome
        userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36";
        b = checker.isIncompatibleBrowser(userAgent);
        assertThat(b, equalTo(false));

        userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/17.0.3202.75 Safari/537.36";
        b = checker.isIncompatibleBrowser(userAgent);
        assertThat(b, equalTo(true));

        // Safari
        userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A";
        b = checker.isIncompatibleBrowser(userAgent);
        assertThat(b, equalTo(true));

        // Firefox
        userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1";
        b = checker.isIncompatibleBrowser(userAgent);
        assertThat(b, equalTo(false));

    }
}