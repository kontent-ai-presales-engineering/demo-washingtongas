import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { HeroImage } from "../../../components/landingPage/ui/heroImage--fullwidth";
import { RichTextElement } from "../../../components/shared/richText/RichTextElement";
import { AppPage } from "../../../components/shared/ui/appPage";
import { mainColorBgClass } from "../../../lib/constants/colors";
import {
  getAllArticles,
  getArticleBySlug,
  getDefaultMetadata,
  getHomepage,
} from "../../../lib/services/kontentClient";
import { ValidCollectionCodename } from "../../../lib/types/perCollection";
import { formatDate } from "../../../lib/utils/dateTime";
import { defaultEnvId, siteCodename } from "../../../lib/utils/env";
import {
  Article,
  SEOMetadata,
  WSL_Page,
  WSL_WebSpotlightRoot,
  contentTypes,
} from "../../../models";
import {
  createElementSmartLink,
  createItemSmartLink,
} from "../../../lib/utils/smartLinkUtils";
import Image from "next/image";
import {
  getEnvIdFromRouteParams,
  getPreviewApiKeyFromPreviewData,
} from "../../../lib/utils/pageUtils";
import { useLivePreview } from "../../../components/shared/contexts/LivePreview";
import KontentManagementService from "../../../lib/services/kontent-management-service";
import { IContentItem } from "@kontent-ai/delivery-sdk";

type Props = Readonly<{
  article: Article;
  siteCodename: ValidCollectionCodename;
  defaultMetadata: SEOMetadata;
  variants: IContentItem[];
  siteMenu?: WSL_Page | null;
  homepage?: WSL_WebSpotlightRoot;
  isPreview: boolean;
  language: string;
}>;

const ArticlePage: FC<Props> = ({
  article,
  siteCodename,
  defaultMetadata,
  variants,
  siteMenu,
  homepage,
  isPreview,
  language,
}) => {
  const data = useLivePreview({
    siteMenu,
    article,
    defaultMetadata,
  });

  console.log(article);

  const headerType = article.elements.headerType?.value[0]?.name;

  return (
    <AppPage
      siteCodename={siteCodename}
      homeContentItem={homepage}
      defaultMetadata={data.defaultMetadata}
      variants={variants}
      item={data.article}
      pageType="Article"
      isPreview={isPreview}
    >
      {headerType == "Image" && (
        <HeroImage
          alt={article.elements.heroImage.value[0]?.description || "Hero image"}
          url={article.elements.heroImage.value[0]?.url || ""}
          itemId={article.system.id}
          type={article.elements.heroImage.value[0]?.type}
          height={article.elements.headerHeightPx.value}
        >
          <div className={`py-1 px-3 md:w-fit text-center mx-auto mb-4`}>
            <h1
              className={`m-0 text-3xl tracking-wide font-semibold text-white`}
            >
              {data.article.elements.title.value}
            </h1>
          </div>
          <div className="text-white p-4 rounded-lg mx-auto">
            <p className="font-semibold my-0">
              {data.article.elements.abstract.value}
            </p>
          </div>
        </HeroImage>
      )}
      {headerType == "Color" && (
        <div>
          <div
            className={`py-1 px-3 max-w-screen-md md:w-fit text-center mx-auto mb-4`}
            style={{ backgroundColor: data.article.elements.headerColor.value }}
          >
            <h1
              className={`m-0 text-3xl tracking-wide font-semibold text-white`}
            >
              {data.article.elements.title.value}
            </h1>
          </div>
          <div className="text-white p-4 rounded-lg mx-auto">
            <p className="font-semibold my-0">
              {data.article.elements.abstract.value}
            </p>
          </div>
        </div>
      )}
      <div className="px-2 max-w-screen-lg m-auto md:px-20 ">
        <div className="flex flex-col md:flex-row w-full mb-4">
          <div className="w-1/2 mt-4 mb-4 md:mb-0">
            {" "}
            <div className="flex flex-col gap-2">
              <div className="w-fit font-semibold">
                {data.article.elements.publishingDate.value &&
                  formatDate(data.article.elements.publishingDate.value)}
              </div>
            </div>
          </div>
          <div className="w-1/2">
            {data.article.elements.author.linkedItems[0] && (
              <div
                className="flex items-center"
                {...createItemSmartLink(
                  data.article.elements.author.linkedItems[0].system.id,
                  data.article.elements.author.linkedItems[0].system.name
                )}
              ></div>
            )}
          </div>
        </div>
        <RichTextElement
          element={data.article.elements.content}
          isInsideTable={false}
          language={language}
        />
      </div>
    </AppPage>
  );
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
  context
) => {
  const slug =
    typeof context.params?.slug === "string" ? context.params.slug : "";

  if (!slug) {
    return { notFound: true };
  }

  const envId = getEnvIdFromRouteParams(context);
  const previewApiKey = getPreviewApiKeyFromPreviewData(context.previewData);

  const article = await getArticleBySlug(
    { envId, previewApiKey },
    slug,
    !!context.preview,
    context.locale as string
  );
  const defaultMetadata = await getDefaultMetadata(
    { envId, previewApiKey },
    !!context.preview,
    context.locale as string
  );
  const homepage = await getHomepage(
    { envId, previewApiKey },
    !!context.preview,
    context.locale as string
  );

  if (!article) {
    return { notFound: true };
  }

  //Get HREFLang tags for SEO Metadata
  const kms = new KontentManagementService();
  const variants = await kms.getLanguageVariantsOfItem(
    { envId, previewApiKey },
    article.system.id,
    !!context.preview
  );

  return {
    props: {
      article,
      siteCodename,
      defaultMetadata,
      variants,
      isPreview: !!context.preview,
      language: context.locale as string,
      homepage: homepage,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllArticles({ envId: defaultEnvId }, false);

  return {
    paths: articles.items.map((a) => ({
      params: {
        slug: a.elements.url.value,
        envId: defaultEnvId,
      },
    })),
    fallback: "blocking",
  };
};

export default ArticlePage;
