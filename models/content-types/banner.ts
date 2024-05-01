import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';

export type Banner = IContentItem<{
    title: Elements.TextElement;
    image: Elements.AssetsElement;
    overlayPosition: Elements.MultipleChoiceElement;
    overlayColor: Elements.MultipleChoiceElement;
    overlaySize: Elements.NumberElement;
}>;
