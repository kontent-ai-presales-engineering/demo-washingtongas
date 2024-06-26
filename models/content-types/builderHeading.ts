import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';

export type BuilderHeading = IContentItem<{
    text: Elements.TextElement;
    type: Elements.MultipleChoiceElement;
    fontSettingsFamily: Elements.MultipleChoiceElement;
    fontSettingsSize: Elements.NumberElement;
    fontSettingsColor: Elements.MultipleChoiceElement;
    fontSettingsPosition: Elements.MultipleChoiceElement;
}>;
