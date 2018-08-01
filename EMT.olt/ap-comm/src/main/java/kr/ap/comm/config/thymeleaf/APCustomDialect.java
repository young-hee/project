package kr.ap.comm.config.thymeleaf;

import nz.net.ultraq.thymeleaf.decorators.SortingStrategy;
import nz.net.ultraq.thymeleaf.decorators.TitlePatternProcessor;
import nz.net.ultraq.thymeleaf.decorators.strategies.AppendingStrategy;
import nz.net.ultraq.thymeleaf.fragments.FragmentProcessor;
import nz.net.ultraq.thymeleaf.includes.InsertProcessor;
import org.thymeleaf.context.IExpressionContext;
import org.thymeleaf.dialect.AbstractProcessorDialect;
import org.thymeleaf.dialect.IExpressionObjectDialect;
import org.thymeleaf.expression.IExpressionObjectFactory;
import org.thymeleaf.processor.IProcessor;
import org.thymeleaf.templatemode.TemplateMode;

import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Thymeleaf 커스텀 dialect
 * <p>
 *     prefix : ap
 * </p>
 */
public class APCustomDialect extends AbstractProcessorDialect implements IExpressionObjectDialect {

    private static final String NAME = "AmorePacific Custom Dialect";
    private static final String PREFIX = "ap";
    private static final int PRECEDENCE = 1000;

    SortingStrategy sortingStrategy;

    public APCustomDialect() {
        super(NAME, PREFIX, PRECEDENCE);
        sortingStrategy = new AppendingStrategy();
    }

    @Override
    public Set<IProcessor> getProcessors(String dialectPrefix) {
        Set<IProcessor> set = new LinkedHashSet<>();
        // th:src => ap:src
        set.add(new APSrcAttrProcessor(TemplateMode.HTML, dialectPrefix));
        // th:href => ap:href
        set.add(new APHrefAttrProcessor(TemplateMode.HTML, dialectPrefix));

        // layout dialect
        // layout:decorate => ap:decorate
        set.add(new APDecorateProcessor(TemplateMode.HTML, dialectPrefix, sortingStrategy));
        // layout:fragment => ap:fragment
        set.add(new FragmentProcessor(TemplateMode.HTML, dialectPrefix));
        set.add(new TitlePatternProcessor(TemplateMode.HTML, dialectPrefix));
        // layout:insert => ap:insert
        set.add(new InsertProcessor(TemplateMode.HTML, dialectPrefix));
        // layout:replace => ap:replace
        set.add(new APReplaceProcessor(TemplateMode.HTML, dialectPrefix));
        return set;
    }

	@Override
	public IExpressionObjectFactory getExpressionObjectFactory() {
		return new IExpressionObjectFactory() {

			private static final String COLLECTIONS_EXPRESSION_OBJECT_NAME = "collections";
			private static final String DEVICE_EXPRESSION_OBJECT_NAME = "device";
			private static final String INTEGRATED_AIP_UTILS = "IntegUtil";

			@Override
			public Set<String> getAllExpressionObjectNames() {
				return Collections.unmodifiableSet(new LinkedHashSet<>(Arrays.asList(
					COLLECTIONS_EXPRESSION_OBJECT_NAME,
					DEVICE_EXPRESSION_OBJECT_NAME,
					INTEGRATED_AIP_UTILS
				)));
			}

			@Override
			public Object buildObject(IExpressionContext context, String expressionObjectName) {
				switch (expressionObjectName) {
				case COLLECTIONS_EXPRESSION_OBJECT_NAME:
					return new UnderscoreJSCollections();
				case DEVICE_EXPRESSION_OBJECT_NAME:
					return new DeviceResolver();
				case INTEGRATED_AIP_UTILS:
					return new IntegratedAPIUtils();
				}
				return null;
			}

			@Override
			public boolean isCacheable(String expressionObjectName) {
				return false;
			}
		};
	}
}
