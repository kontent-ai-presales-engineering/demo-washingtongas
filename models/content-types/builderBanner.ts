import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';

export type BuilderBanner = IContentItem<{
    title: Elements.TextElement;
    image: Elements.AssetsElement;
    fontSettingsFamily: Elements.MultipleChoiceElement;
    fontSettingsSize: Elements.NumberElement;
    fontSettingsColor: Elements.MultipleChoiceElement;
    fontSettingsPosition: Elements.MultipleChoiceElement;
    imageSettingsAltText: Elements.TextElement;
    imageSettingsHeight: Elements.NumberElement;
    imageSettingsWidth: Elements.NumberElement;
}>;
