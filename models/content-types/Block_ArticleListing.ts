import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
import { type ArticleCategory } from '../taxonomies/articleCategory';

/**
 * Generated by '@kontent-ai/model-generator@5.10.0'
 *
 * 🧱 Article Listing
 * Id: a967cfb4-ce15-4a22-b6e7-a9bf632fbd2b
 * Codename: article_listing
 */
export type Block_ArticleListing = IContentItem<{
  /**
   * Article Category (taxonomy)
   * Required: false
   * Id: 161367e7-e60f-494c-a130-b497e358a876
   * Codename: article_type
   */
  articleType: Elements.TaxonomyElement<ArticleCategory>;

  /**
   * Title (text)
   * Required: false
   * Id: a210727c-e09d-44c0-ba89-908870ece3c0
   * Codename: title
   */
  title: Elements.TextElement;
}>;
