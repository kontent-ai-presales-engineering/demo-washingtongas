import { FC } from "react";
import { BuilderBanner, contentTypes } from "../../models";
import {
  createElementSmartLink,
  createItemSmartLink,
} from "../../lib/utils/smartLinkUtils";

type Props = Readonly<{
  item: BuilderBanner;
}>;

export const BuilderBannerComponent: FC<Props> = (props) => {
  var family = props.item.elements.fontSettingsFamily?.value[0].codename;
  var size = props.item.elements.fontSettingsSize?.value + "px";
  var color = props.item.elements.fontSettingsColor?.value[0].codename;
  var position = props.item.elements.fontSettingsPosition?.value[0]?.name;
  var altText = props.item.elements.imageSettingsAltText?.value;
  var height = props.item.elements.imageSettingsHeight?.value;
  var width = props.item.elements.imageSettingsWidth?.value;

  if (family === "sans_serif") {
    family = "sans-serif";
  } else if (family === "brand") {
    family = "ProximaNova, Helvetica, Arial, sans-serif";
  }

  if (color === "brand_primary") {
    color = "#245ea4";
  } else if (color === "brand_secondary") {
    color = "#4eaf6b";
  }

  var top = "50%";
  var left = "";
  var right = "";
  var transform = "";
  if (position === "Center") {
    left = "50%";
    transform = "translate(-50%, -50%)";
  } else if (position === "Left") {
    left = "15%";
    transform = "translate(-15%, -50%)";
  } else if (position === "Right") {
    right = "15%";
    transform = "translate(15%, -50%)";
  }

  var h = null;
  if (height === null) {
    h = "100%";
  } else {
    h = height;
  }
  var w = null;
  if (width === null) {
    w = "100%";
  } else {
    w = width;
  }

  return (
    <div
      {...createItemSmartLink(props.item.system.id, props.item.system.name)}
      {...createElementSmartLink(contentTypes.form.elements.form.codename)}
      className={`bg-white shadow-md rounded`}
      style={{
        position: "relative",
        fontFamily: "inherit",
        width: w + "px",
        height: h + "px",
      }}
    >
      <img
        style={{ margin: "0", height: h, width: w }}
        src={props.item.elements.image.value[0]?.url}
        alt={altText}
      ></img>
      <h1
        style={{
          position: "absolute",
          top: top,
          left: left,
          right: right,
          fontSize: size,
          transform: transform,
          color: color,
          textShadow: "0 0 6px rgba(0, 0, 0, .55)",
          fontWeight: 600,
          lineHeight: 1.125,
        }}
      >
        {props.item.elements.title.value}
      </h1>
    </div>
  );
};
BuilderBannerComponent.displayName = "BuilderBannerComponent";
