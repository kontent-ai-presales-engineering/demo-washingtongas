import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';

export type Banner = IContentItem<{
    title: Elements.TextElement;
}>;
