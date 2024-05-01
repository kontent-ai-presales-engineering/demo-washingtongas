import { FC } from "react";
import { BuilderHeading, contentTypes } from "../../models";
import {
  createElementSmartLink,
  createItemSmartLink,
} from "../../lib/utils/smartLinkUtils";

type Props = Readonly<{
  item: BuilderHeading;
}>;

export const BuilderHeadingComponent: FC<Props> = (props) => {
  var family = props.item.elements.fontSettingsFamily?.value[0].codename;
  var size = props.item.elements.fontSettingsSize?.value;
  var color = props.item.elements.fontSettingsColor?.value[0].codename;
  let position = props.item.elements.fontSettingsPosition?.value[0]
    .codename as string;

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

  return (
    <div
      {...createItemSmartLink(props.item.system.id, props.item.system.name)}
      {...createElementSmartLink(contentTypes.form.elements.form.codename)}
      style={{
        width: "100%",
        marginTop: "20px",
        marginBottom: "20px",
        textAlign: position,
      }}
    >
      <h1
        style={{
          //left: "50%",
          //right: right,
          fontSize: size + "px",
          //transform: transform,
          color: color,
          //textShadow: "0 0 6px rgba(0, 0, 0, .55)",
          //fontWeight: 600,
          //lineHeight: 1.125,
        }}
      >
        {props.item.elements.text.value}
      </h1>
    </div>
  );
};
BuilderHeadingComponent.displayName = "BuilderHeadingComponent";
