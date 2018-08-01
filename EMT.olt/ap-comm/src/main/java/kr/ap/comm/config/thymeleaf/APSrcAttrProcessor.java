package kr.ap.comm.config.thymeleaf;

import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.engine.*;
import org.thymeleaf.model.IProcessableElementTag;
import org.thymeleaf.processor.element.AbstractAttributeTagProcessor;
import org.thymeleaf.processor.element.IElementTagStructureHandler;
import org.thymeleaf.standard.expression.IStandardExpression;
import org.thymeleaf.standard.expression.NoOpToken;
import org.thymeleaf.standard.expression.StandardExpressionExecutionContext;
import org.thymeleaf.standard.util.StandardProcessorUtils;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.util.EscapedAttributeUtils;

import java.util.Arrays;
import java.util.List;

/**
 * image, script tag 의 src 정의시에 사용하는 processor
 * <p>
 *     <pre>
 *         사용
 *         &#60;img src="/images/common/ico.png" ap:src="@{/images/common/ico.png}" />
 *
 *         결과
 *         &#60;img src="/pc/ko/images/common/ico.png" />
 *     </pre>
 * </p>
 * @author ryan
 */
public class APSrcAttrProcessor extends AbstractAttributeTagProcessor implements IAttributeDefinitionsAware {

    public static final String ATTR_NAME = "src";
    public static final int PRECEDENCE = 0;

    private AttributeDefinitions attributeDefinitions;

    protected APSrcAttrProcessor(TemplateMode templateMode, String dialectPrefix) {
        super(templateMode, dialectPrefix, null, false, ATTR_NAME, true, PRECEDENCE, true);
    }

    protected APSrcAttrProcessor(TemplateMode templateMode, String dialectPrefix, String attributeName) {
        super(templateMode, dialectPrefix, null, false, attributeName, true, PRECEDENCE, true);
    }

    @Override
    protected void doProcess(ITemplateContext context, IProcessableElementTag tag, AttributeName attributeName,
                             String attributeValue, IElementTagStructureHandler structureHandler) {
        final Object expressionResult = getExpressionResult(context, tag, attributeName, attributeValue, structureHandler);
        final String newAttributeValue =
                EscapedAttributeUtils.escapeAttribute(getTemplateMode(), expressionResult == null ? null : expressionResult.toString());

        // remove the target attribute
        if (newAttributeValue == null || newAttributeValue.length() == 0) {

            // We are removing the equivalent attribute name, without the prefix...
            structureHandler.removeAttribute(attributeName);

        } else {

            AttributeDefinition targetAttributeDefinition = attributeDefinitions.forName(getTemplateMode(),
                    attributeName.getAttributeName());
            // We are setting the equivalent attribute name, without the prefix...
            StandardProcessorUtils.replaceAttribute(
                    structureHandler, attributeName, targetAttributeDefinition, attributeName.getAttributeName(),
                    (newAttributeValue == null ? "" : newAttributeValue));

        }
    }

    private Object getExpressionResult(ITemplateContext context, IProcessableElementTag tag, AttributeName attributeName,
                                       String attributeValue, IElementTagStructureHandler structureHandler) {
        final Object expressionResult;

        // 처리 가능한 tag name 을 지정.
        if (availableTagNames().isEmpty() == false
                && availableTagNames().contains(tag.getElementCompleteName()) == false) {
            return null;
        }

        if (attributeValue != null) {

            final IStandardExpression expression = EngineEventUtils.computeAttributeExpression(context, tag, attributeName, attributeValue);

            /*
             * Some attributes will require the execution of the expressions contained in them in RESTRICTED
             * mode, so that e.g. access to request parameters is forbidden.
             */
            final StandardExpressionExecutionContext expCtx = StandardExpressionExecutionContext.RESTRICTED;
            expressionResult = expression.execute(context, expCtx);

        } else {
            expressionResult = null;
        }

        // If the result of this expression is NO-OP, there is nothing to execute
        if (expressionResult == NoOpToken.VALUE) {
            structureHandler.removeAttribute(attributeName);
            return null;
        }

        String exprStr = DisplayChannelPathUtils.addDisplayPathValues((String) expressionResult);
        return exprStr;
    }

    /**
     * 처리 가능한 element(tag) 이름을 지정
     * @return
     */
    protected List<String> availableTagNames() {
        return Arrays.asList("script", "img");
    }

    @Override
    public void setAttributeDefinitions(AttributeDefinitions attributeDefinitions) {
        this.attributeDefinitions = attributeDefinitions;
    }
}
