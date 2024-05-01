import { FC } from "react";
import { Banner, contentTypes } from "../../models";
import {
  createElementSmartLink,
  createItemSmartLink,
} from "../../lib/utils/smartLinkUtils";

type Props = Readonly<{
  item: Banner;
}>;

export const BannerComponent: FC<Props> = (props) => {
  return (
    <div
      {...createItemSmartLink(props.item.system.id, props.item.system.name)}
      {...createElementSmartLink(contentTypes.form.elements.form.codename)}
      className={`bg-white shadow-md rounded px-8 pt-6 pb-8 my-16`}
    >
      {props.item.elements.title.value}
      {/* {props.item.elements.form.value && (
        <HubspotForm
          portalId={props.item.elements.form.value.split("|")[1]}
          formId={props.item.elements.form.value.split("|")[0]}
          onSubmit={() => console.log("Submit!")}
          onReady={() => console.log("Form ready!")}
          loading={<div>Loading...</div>}
        />
      )} */}
    </div>
  );
};
BannerComponent.displayName = "BannerComponent";
