package kr.ap.comm.util;
import java.security.SecureRandom;


/**
 * <p>
 * G1SecureRandom 클래스
 * </p>
 * 
 * @author nes@g1project.net
 * @author ryan@g1project.net
 * @since 1.0
 * @version 1.0
 * 
 */
public class G1SecureRandom {

    private static SecureRandom secureRandom = null;
    private static int level = 32;      // Random Seed Generator level
    private final static String ALGORITHM = "SHA1PRNG";
    private final static String PROVIDER = "SUN";

    // 랜덤문자에서의 사용문자.
    private static final String RANGE1 = "abcdefghijklmnopqrstuvwxyz";
    private static final String RANGE2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String RANGE3 = "0123456789";
    
    static {
        try {
            secureRandom = SecureRandom.getInstance(ALGORITHM, PROVIDER);
            secureRandom.setSeed(secureRandom.generateSeed(level));
        } catch (Exception e) {
            throw new RuntimeException("invalid args for Algorithm or Provider");
        }
    }

    /**
     * constructor to prevent instantiation.
     */
    private G1SecureRandom() {
    }

    /**
     * <p>랜덤 숫자를 반환</p>
     * <pre> 
     * 자릿수가 클 경우 G1IllegalArgumentException이 발생한다.
     * <pre>
     * @param length 랜덤 숫자의 자릿수
     * @return String - 랜덤 숫자
     */
    public static String getRandomNumber(int length) {
        String randomDouble = Double.toString(secureRandom.nextDouble()).substring(2);
        if (randomDouble.length() < 16) {
            randomDouble = (randomDouble + "0000000000000000").substring(0, 16);
        }
        if (length > randomDouble.length()) {
            throw new RuntimeException("must be smaller than "+ randomDouble.length());
        }
        return randomDouble.substring(0, length);
    }

    /**
     * <p>랜덤 문자를 반환</p>
     * <pre> 
     * 0-9, a-z, A-Z 사이의 문자를 랜덤으로 반환한다. 
     * <pre>
     * 
     * @param length 랜덤 문자의 자릿수
     * @return String - 랜덤 문자
     */
    public static String getRandomText(int length) {
        char[] txt = new char[length];
        for (int k = 0; k < txt.length; k++) {
            switch (secureRandom.nextInt(3)) {
            case 0:
                txt[k] = RANGE1.charAt(secureRandom.nextInt(RANGE1.length()));
                break;
            case 1:
                txt[k] = RANGE2.charAt(secureRandom.nextInt(RANGE2.length()));
                break;
            case 2:
                txt[k] = RANGE3.charAt(secureRandom.nextInt(RANGE3.length()));
                break;
            default:
                throw new RuntimeException();
            }
        }
        return new String(txt);
    }
}

