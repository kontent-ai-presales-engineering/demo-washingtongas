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
  console.log(props);
  var overlayPosition = props.item.elements.overlayPosition?.value[0]?.name;
  const overlaySize = props.item.elements.overlaySize?.value + "px";
  const overlayColor = props.item.elements.overlayColor?.value[0].codename;

  var overlayTop = "50%";
  var overlayLeft = "";
  var overlayRight = "";
  var overlayTransform = "";
  if (overlayPosition === "Center") {
    overlayLeft = "50%";
    overlayTransform = "translate(-50%, -50%)";
  } else if (overlayPosition === "Left") {
    overlayLeft = "15%";
    overlayTransform = "translate(-15%, -50%)";
  } else if (overlayPosition === "Right") {
    overlayRight = "15%";
    overlayTransform = "translate(15%, -50%)";
  }

  return (
    <div
      {...createItemSmartLink(props.item.system.id, props.item.system.name)}
      {...createElementSmartLink(contentTypes.form.elements.form.codename)}
      className={`bg-white shadow-md rounded`}
      style={{
        position: "relative",
        fontFamily: "inherit",
      }}
    >
      <img
        style={{ margin: "0" }}
        src={props.item.elements.image.value[0]?.url}
      ></img>
      <h1
        style={{
          position: "absolute",
          top: overlayTop,
          left: overlayLeft,
          right: overlayRight,
          fontSize: overlaySize,
          transform: overlayTransform,
          color: overlayColor,
          textShadow: "0 0 6px rgba(0, 0, 0, .55)",
          fontWeight: 600,
          lineHeight: 1.125,
        }}
      >
        {props.item.elements.title.value}
      </h1>
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
