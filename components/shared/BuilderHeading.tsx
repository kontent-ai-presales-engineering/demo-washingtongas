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
  var type = props.item.elements.type?.value[0].codename;
  var family = props.item.elements.fontSettingsFamily?.value[0].codename;
  var size = props.item.elements.fontSettingsSize?.value;
  var color = props.item.elements.fontSettingsColor?.value[0].codename;
  var position = props.item.elements.fontSettingsPosition?.value[0].codename;

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

  var display = "";
  var fontSize = null;
  var marginTop = "";
  var marginBottom = "";
  var marginLeft = "";
  var marginRight = "";
  var fontWeight = "";
  if (type === "none") {
    fontSize = size;
  } else if (type === "h1") {
    display = "block";
    fontSize = "2em";
    marginTop = "0.67em";
    marginBottom = "0.67em";
    marginLeft = "0";
    marginRight = "0";
    fontWeight = "bold";
  } else if (type === "h2") {
    display = "block";
    fontSize = "1.5em";
    marginTop = "0.83em";
    marginBottom = "0.83em";
    marginLeft = "0";
    marginRight = "0";
    fontWeight = "bold";
  }

  return (
    <div
      {...createItemSmartLink(props.item.system.id, props.item.system.name)}
      {...createElementSmartLink(contentTypes.form.elements.form.codename)}
      style={{
        display: "flex",
        width: "100%",
        marginTop: "20px",
        marginBottom: "20px",
        justifyContent: position,
      }}
    >
      <div
        style={{
          //fontSize: size + "px",
          color: color,
          //display: display,
          fontSize: size + "px",
          //marginTop: marginTop,
          //marginBottom: marginBottom,
          //marginLeft: marginLeft,
          //marginRight: marginRight,
          fontWeight: fontWeight,
        }}
      >
        {props.item.elements.text.value}
      </div>
    </div>
  );
};
BuilderHeadingComponent.displayName = "BuilderHeadingComponent";
