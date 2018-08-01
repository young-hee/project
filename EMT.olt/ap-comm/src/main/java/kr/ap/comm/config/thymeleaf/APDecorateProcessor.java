package kr.ap.comm.config.thymeleaf;

import nz.net.ultraq.thymeleaf.decorators.DecorateProcessor;
import nz.net.ultraq.thymeleaf.decorators.SortingStrategy;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.engine.AttributeName;
import org.thymeleaf.model.IModel;
import org.thymeleaf.processor.element.IElementModelStructureHandler;
import org.thymeleaf.templatemode.TemplateMode;

/**
 * Thymeleaf layout dialect 의 layout:decorate 대신 ap:decorate 사용하기 위한 processor
 */
public class APDecorateProcessor extends DecorateProcessor {

    public APDecorateProcessor(TemplateMode templateMode, String dialectPrefix, SortingStrategy sortingStrategy) {
        super(templateMode, dialectPrefix, sortingStrategy);
    }

    @Override
    protected void doProcess(ITemplateContext context, IModel model, AttributeName attributeName, String attributeValue, IElementModelStructureHandler structureHandler) {
        String _attrValue = DisplayChannelPathUtils.rebuildExpr(context, attributeValue);
        super.doProcess(context, model, attributeName, _attrValue, structureHandler);
    }
}
