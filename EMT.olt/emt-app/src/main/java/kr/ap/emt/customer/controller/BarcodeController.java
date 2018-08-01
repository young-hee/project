package kr.ap.emt.customer.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import kr.ap.comm.api.CaptchaAPI;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

@Controller
@RequestMapping("/barcode")
public class BarcodeController extends AbstractController {

	@Autowired
	CaptchaAPI captchaAPI;

	public static final int BLACK = 0xFF000000;
	public static final int WHITE = 0xFFFFFFFF;

	public static final int WIDTH = 420;
	public static final int HEIGHT = 119;

	
	
	/**
	 * 내용과 높이 너비를 전달받아 바코드를 생성하여 이미지를 리턴.
	 * CODE128.
	 * 
	 * @param content
	 * @param width
	 * @param height
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/createBarcode", method = RequestMethod.GET)
	public ResponseEntity<?> createBarcode(String content, int width, int height) {
		return createImage(content, width, height);
	}

	/**
	 * 뷰티포인트 카드번호 바코드 이미지.
	 * 높이와 너비를 주지 않으면 기본값(420, 119)으로 생성.
	 * CODE128.
	 * 
	 * @param width
	 * @param height
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/btPointBcd", method = RequestMethod.GET)
	public ResponseEntity<?> btPointBcd(Integer width, Integer height) {
		MemberSession membersession = getMemberSession();
		if(membersession == null || membersession.getUser_incsCardNoEc() == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		if(width == null || height == null)
			return createImage(membersession.getUser_incsCardNoEc(), WIDTH, HEIGHT);
		else
			return createImage(membersession.getUser_incsCardNoEc(), width, height);
			
	}

	private static ResponseEntity<?> createImage(String content, int width,
			int height) {
		MultiFormatWriter w = new MultiFormatWriter();
		try {
			BitMatrix bm = w.encode(content, BarcodeFormat.CODE_128, width, height);
			BufferedImage bufferedImage = toBufferedImage(bm);
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			ImageIO.write(bufferedImage, "png", baos);
			byte[] imageData = baos.toByteArray();
			ByteArrayResource byteArrayResource = new ByteArrayResource(
					imageData);
			return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG)
					.body(byteArrayResource);
		} catch (Exception e) {
		}
		return null;
	}

	public static BufferedImage toBufferedImage(BitMatrix matrix) {
		int width = matrix.getWidth();
		int height = matrix.getHeight();
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_BYTE_BINARY);
		int onColor = BLACK;
		int offColor = WHITE;
		int[] pixels = new int[width * height];
		int index = 0;
		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				pixels[index++] = matrix.get(x, y) ? onColor : offColor;
			}
		}
		image.setRGB(0, 0, width, height, pixels, 0, width);
		return image;
	}
}
