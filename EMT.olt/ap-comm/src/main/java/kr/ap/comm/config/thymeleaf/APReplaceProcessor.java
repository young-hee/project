package kr.ap.comm.config.thymeleaf;

import nz.net.ultraq.thymeleaf.includes.ReplaceProcessor;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.engine.AttributeName;
import org.thymeleaf.model.IModel;
import org.thymeleaf.processor.element.IElementModelStructureHandler;
import org.thymeleaf.templatemode.TemplateMode;

public class APReplaceProcessor extends ReplaceProcessor {
    /**
     * Constructor, set this processor to work on the 'replace' attribute.
     *
     * @param templateMode
     * @param dialectPrefix
     */
    public APReplaceProcessor(TemplateMode templateMode, String dialectPrefix) {
        super(templateMode, dialectPrefix);
    }

    @Override
    protected void doProcess(ITemplateContext context, IModel model, AttributeName attributeName, String attributeValue, IElementModelStructureHandler structureHandler) {
        String _attrValue = DisplayChannelPathUtils.rebuildExpr(context, attributeValue);
        super.doProcess(context, model, attributeName, _attrValue, structureHandler);
    }
}
