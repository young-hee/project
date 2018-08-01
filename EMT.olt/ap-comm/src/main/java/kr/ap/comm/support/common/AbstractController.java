package kr.ap.comm.support.common;

import kr.ap.comm.api.AmoreAPIService;
import kr.ap.comm.api.vo.MultiInfo;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.APRequestContext;
import kr.ap.comm.support.constants.SessionKey;
import net.g1project.bluewave.imagescaler.service.ImageScaler;
import net.g1project.bluewave.imagescaler.service.impl.ImageScalerFactory;
import net.g1project.bluewave.imagescaler.vo.ResizedImageVO;
import net.g1project.ecp.api.client.ap.ApApi;
import net.g1project.ecp.api.client.ap.BbsApi;
import net.g1project.ecp.api.client.ap.VerifApi;
import net.g1project.ecp.api.client.offlinestore.StoreApi;
import net.g1project.ecp.api.client.order.OrderApi;
import net.g1project.ecp.api.client.sales.*;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.UploadingFile;

import org.apache.commons.io.IOUtils;
import org.im4java.core.Info;
import org.im4java.core.InfoException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.Validator;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.WebUtils;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.util.*;

/**
 * AbstractController
 */
public class AbstractController {

	protected Logger logger = LoggerFactory.getLogger(getClass());

	//upload image default width/height
	private static final int DEFAULT_IMAGE_LENGTH = 1920;

	@Autowired
	protected Environment env;

    @Autowired
    protected AmoreAPIService amoreAPIService;

    @Autowired
    protected TermsApi termsApi;

    @Autowired
    protected MemberApi memberApi;

    @Autowired
    protected ApApi apApi;

	@Autowired
	protected BbsApi bbsApi;

    @Autowired
    MessageSource messageSource;
    
    @Autowired
    protected GuideApi guideApi;

    @Autowired
    protected FileUploadApi fileUploadApi;
    
    @Autowired
    protected StoreApi storeApi;

    @Autowired
	protected DisplayApi displayApi;

	@Autowired
	protected CartApi cartApi;
    
    @Autowired
    protected ProductApi productApi;

    @Autowired
	protected ShoppingmarkApi shoppingmarkApi;

    @Autowired
	protected KeywordPopupApi keywordPopupApi;
    
    @Autowired
    protected ArticleApi articleApi;

    @Autowired
    protected RegulareventApi regulareventApi;

    @Autowired
    protected PointApi pointApi;

    @Autowired
	protected OrderApi orderApi;

	@Autowired
	protected CouponApi couponApi;

	@Autowired
	protected PlandisplayApi plandisplayApi;

	@Autowired
	protected DepositsApi depositsApi;

	@Autowired
	protected ApplicationsApi applicationsApi;
	
	@Autowired
	protected VerifApi verifApi;

    /**
     * Get Error Messages
     *
     * @param bindingResult
     * @param result
     */
    protected void bindErrorResult(BindingResult bindingResult, HashMap<String, Object> result) {
        FieldError error = bindingResult.getFieldError();
        if (error != null) {
            result.put("code", error.getCode());
            result.put("message", !StringUtils.isEmpty(getMessage(error.getCode())) ? getMessage(error.getCode()) : error.getDefaultMessage());
        }
    }

    /**
     * Get the messages
     *
     * @param key
     * @param args
     * @return
     */
    protected String getMessage(String key, Object... args) {
        String message = null;
        try {
            message = messageSource.getMessage(key, args, LocaleContextHolder.getLocale());
        } catch (NoSuchMessageException e) {
            logger.error(e.getMessage(), e);
        }
        return message;
    }

    /**
     * Validate.
     *
     * @param target        the target
     * @param bindingResult the binding result
     * @param _validators   the _validators
     * @return the binding result
     */
    protected BindingResult validate(BaseForm target, BindingResult bindingResult, Validator... _validators) {

        for (Validator _validator : _validators) {
            _validator.validate(target, bindingResult);
        }

        return bindingResult;
    }

    /**
     * Validate.
     *
     * @param target      the target
     * @param _validators the _validators
     * @return the binding result
     */
    protected BindingResult validate(BaseForm target, Validator... _validators) {
        BeanPropertyBindingResult bindingResult = new BeanPropertyBindingResult(target, "temporary binding result");

        return validate(target, bindingResult, _validators);
    }

    /**
     * get MemberSession object
     *
     * @return
     */
    protected MemberSession getMemberSession() {
		MemberSession memberSession =  (MemberSession) WebUtils.getSessionAttribute(getRequest(), SessionKey.LOGIN_USER);
        if (ObjectUtils.isEmpty(memberSession)) {
            memberSession = new MemberSession();
            WebUtils.setSessionAttribute(getRequest(), SessionKey.LOGIN_USER, memberSession);
        }
        return  memberSession;
	}

	protected void setMemberSession(MemberSession memberSession) {
    	WebUtils.setSessionAttribute(getRequest(), SessionKey.LOGIN_USER, memberSession);
	}

    /**
     * get MemberSn
     *
     * @return
     */
    protected Long getMemberSn() {
        try {
            MemberSession m = getMemberSession();
            return ObjectUtils.isEmpty(m.getMember_sn()) ? 0L : m.getMember_sn();
        }
        catch (Exception e) {
            // TODO: handle exception
            logger.error(e.getMessage(), e);
        }
        return 0L;
    }

    /**
     * get Request
     *
     * @return
     */
    protected HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }

	/**
	 * logged in flag
	 *
	 * @return
	 */
	protected Boolean isLoggedIn() {
    	if(getMemberSn() == 0L){
    		return false;
		} else {
    		return true;
		}
	}

    protected MultiInfo getMultiinfoByChCd(List<?> list, String chCd) {
    	if(list == null || list.isEmpty())
    		return null;
    	if(!(list.get(0) instanceof MultiInfo)) {
    		return null;
    	}
		for (Object multiInfo : list) {
			if(chCd.equals(((MultiInfo)multiInfo).getChCd())) {
				return (MultiInfo) multiInfo;
			}
		}
		return null;
	}

	protected boolean isPcDevice() {
		return APRequestContext.isPC();
	}

    protected boolean isMobileDevice() {
        return APRequestContext.isMobileDevice();
    }

	protected boolean isMobileWeb() {
		return APRequestContext.isMobileWeb();
	}

    protected boolean isMobileApp() {
		return APRequestContext.isMobileApp();
	}

    protected boolean isAndroid() {
		return APRequestContext.isAndroid();
	}

	protected boolean isiOS() {
		return APRequestContext.isiOS();
	}

	/**
	 * get display channel info
	 *
	 * @return
	 */
	protected String getDisplayChannel() {
		String displayChannel = "";

		if (isMobileDevice()) {
			//Mobile
			displayChannel = "MobileWeb";
		} else if (isPcDevice()) {
			//PC
			displayChannel = "PCWeb";
		} else {
			//App
			displayChannel = "MobileApp";
		}

		return displayChannel;
	}

	/**
	 * get full uri path
	 *
	 * @return
	 */
	protected String getFullUri() {
		return getRequest().getScheme() + "://" +   // "http" + "://
			getRequest().getServerName() + // "localhost"
			(!ObjectUtils.isEmpty(getRequest().getServerPort()) ? ":" +
				getRequest().getServerPort() : "") + // ":" + "8080"
			getRequest().getRequestURI() + // "/display/etude_ch/detail"
			(getRequest().getQueryString() != null ? "?" +
				getRequest().getQueryString() : ""); // "?" + "article=11";
	}
	
	/**
	 * Rest 오류 발생시 사용<br>
	 * ApiException을 이용해 ResponseEntity<?>을 만들어서 리턴.
	 */
	protected ResponseEntity<?> error(Map<String,Object> result, ApiException e) {
		result.put("errorData", e);
		return ResponseEntity.status(e.getStatus()).body(result);
	}

	/**
	 * Rest 오류 발생시 사용<br>
	 * ApiException을 이용해 ResponseEntity<?>을 만들어서 리턴.
	 */
	protected ResponseEntity<?> error(ApiException e) {
		return ResponseEntity.status(e.getStatus()).body(e.getAdditional());
	}

	/**
	 * Rest 오류 발생시 사용<br>
	 * ApiException이 발생하지 않는 상황에서, ResponseEntity<?>을 만들어서 리턴.
	 */
	protected ResponseEntity<?> error(Map<String,Object> result, HttpStatus status, String code, String msg) {
		return error(result, new ApiException(status.value(), code, msg));
	}

	/**
	 * 이미지 업로드 및 Resizing
	 * (복수)
	 * MultipartFile을 받아온 이미지들을 UploadingFile로 변환하여 리턴.
	 *
	 * @param pictures
	 * @return
	 */
	public List<UploadingFile> imageSettingList(MultipartFile[] pictures) {
		List<UploadingFile> files = new ArrayList<>();

		for (MultipartFile mf : pictures) {
			files.add(imageSetting(mf));
		}

		return files;
	}

	/**
	 * 이미지 업로드 및 Resizing
	 *
	 * @param picture
	 * @return
	 */
	public UploadingFile imageSetting(MultipartFile picture) {

		File file = null;
		File resizedFile = null;

		UploadingFile uploadingFile = new UploadingFile();
		try {
			String uploadDir = tempUploadDir();
			File tempDir = new File(uploadDir);
			if (!tempDir.exists()) {
				tempDir.mkdirs();
			}
			file = new File(uploadDir + File.separator + picture.getOriginalFilename());
			picture.transferTo(file);

			//resize기준: 1920기준으로 길이/높이 계산한다.
			int[] sizes = getImageSize(file);
			int imageWidth = sizes[0];
			int imageHeight = sizes[1];

			int newWidth = 0;
			int newHeight = 0;

			if (imageWidth > DEFAULT_IMAGE_LENGTH) {
				newWidth = DEFAULT_IMAGE_LENGTH;
				newHeight = (int) ((double) DEFAULT_IMAGE_LENGTH / imageWidth * imageHeight);
			} else if(imageHeight > DEFAULT_IMAGE_LENGTH){
				newHeight = DEFAULT_IMAGE_LENGTH;
				newWidth = (int) ((double) DEFAULT_IMAGE_LENGTH / imageHeight * imageWidth);
			} else {
				newWidth = imageWidth;
				newHeight = imageHeight;
			}

			ImageScaler imageScaler = ImageScalerFactory.getInstance(env);
			ResizedImageVO resizedImageVO = imageScaler.scaleImage(file, newWidth, newHeight);

			resizedFile = resizedImageVO.getFile();
			FileInputStream fileInputStream = new FileInputStream(resizedFile);
			picture = new MockMultipartFile("file", resizedImageVO.getFileName(), "text/plain", IOUtils.toByteArray(fileInputStream));
			if (fileInputStream != null) {
				fileInputStream.close();
			}

			byte[] bytes = picture.getBytes();
			if (bytes != null) {
				uploadingFile.setFileName(picture.getOriginalFilename());
				uploadingFile.setData(Base64.getEncoder().encodeToString(bytes));
			}

		} catch (Exception e) {
			e.printStackTrace();

		} finally {

			if (file.exists()) {
				file.delete();
			}

			if (resizedFile.exists()){
				resizedFile.delete();
			}
		}

		return uploadingFile;
	}

	protected String tempUploadDir() {
		return env.getProperty("bluewave.fileupload.location.temp");
	}

	/**
	 * 원본 이미지의 사이즈를 가져온다.
	 *
	 * @param imageFile 원본 이미지 파일
	 * @return 이미지 사이즈
	 */
	protected int[] getImageSize(File imageFile) {
		int[] sizes = new int[2];

		if (env.getProperty("bluewave.imageresize.imagemagick", boolean.class, false)) {
			try {
				Info info = new Info(imageFile.getAbsolutePath(), true);
				sizes[0] = info.getImageWidth();
				sizes[1] = info.getImageHeight();
			} catch (InfoException e) {
				logger.error("fail to load image : {}", imageFile.getName());
				logger.error(e.getMessage(), e);
			}
		} else {
			try {
				BufferedImage image = ImageIO.read(imageFile);
				sizes[0] = image.getWidth();
				sizes[1] = image.getHeight();
			} catch (Exception e) {
				logger.error("fail to load image : {}", imageFile.getName());
				logger.error(e.getMessage(), e);
			}
		}

		return sizes;
	}
}
