package kr.ap.emt.utils;

import org.junit.Assert;
import org.junit.Test;

import static kr.ap.comm.util.EncryptionUtils.decAES;
import static kr.ap.comm.util.EncryptionUtils.encAES;

public class EncryptionUtilsTest {

    @Test
    public void test() {
        String ori = "한글테스트.";
        try {
            String encStr = encAES(ori);
            System.out.println(encStr);
            Assert.assertNotNull(encStr);
            String desStr = decAES(encStr);
            Assert.assertEquals(ori, desStr);
        } catch (Exception e) {
            Assert.fail(e.getMessage());
        }

    }
}