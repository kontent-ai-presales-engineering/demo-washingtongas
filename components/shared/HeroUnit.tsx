import Link from "next/link";
import { FC } from "react";

import { mainColorTextClass } from "../../lib/constants/colors";
import {
  createElementSmartLink,
  createItemSmartLink,
} from "../../lib/utils/smartLinkUtils";
import { HeroUnit, contentTypes } from "../../models";
import { HeroImage } from "../landingPage/ui/heroImage";
import { useSiteCodename } from "./siteCodenameContext";
import { CallToActionComponent } from "./CallToAction";
import { RichTextElement } from "./richText/RichTextElement";

type Props = Readonly<{
  item: HeroUnit;
}>;

export const HeroUnitComponent: FC<Props> = (props) => {
  const siteCodename = useSiteCodename();

  function bannerContent() {
    // BUG: RTE renders '<p><br></p>' if empty.
    if (
      props.item.elements.content.value !== "<p><br></p>" ||
      props.item.elements.content.value.length === 0
    ) {
      return (
        <div
          className="comp_hero-unit py-1 px-3 w-full flex flex-col items-start"
          {...createItemSmartLink(props.item.system.id, props.item.system.name)}
          {...createElementSmartLink(
            contentTypes.hero_unit.elements.content.codename
          )}
        >
          <div className="hidden md:block m-0 text-2xl font-medium break-words hyphens-none text-white text-left w-full pb-2 max-w-5xl">
            <RichTextElement
              element={props.item.elements.content}
              isInsideTable={false}
              language={props.item.system.language}
            />
          </div>
          {props.item.elements.callToAction.linkedItems.map((item) => (
            <CallToActionComponent
              item={item}
              key={item.system.id}
            ></CallToActionComponent>
          ))}
        </div>
      );
    }
  }

  return (
    <HeroImage
      alt={
        props.item.elements.backgroundImage.value[0]?.description ||
        "Hero image"
      }
      url={props.item.elements.backgroundImage.value[0]?.url || ""}
      itemId={props.item.system.id}
      type={props.item.elements.backgroundImage.value[0]?.type}
    >
      <div
        className={`py-5 md:py-5 px-3 w-full flex justify-start`}
        {...createItemSmartLink(props.item.system.id, props.item.system.name)}
      >
        <div
          className={`${mainColorTextClass[siteCodename]} m-0 text-5xl tracking-wide font-semibold text-left`}
          {...createElementSmartLink(
            contentTypes.hero_unit.elements.title.codename
          )}
        >
          {props.item.elements.title.value}
        </div>
      </div>
      {bannerContent()}
    </HeroImage>
  );
};

HeroUnitComponent.displayName = "HeroUnitComponent";
