import { FC, ReactNode } from "react";
import Image from "next/image";
import { createItemSmartLink } from "../../../lib/utils/smartLinkUtils";

type Props = Readonly<{
  url: string;
  alt: string;
  children: ReactNode;
  className?: string;
  itemId?: string;
  itemName?: string;
  type: string;
}>;

export const HeroImage: FC<Props> = (props) => (
  <figure
    className={`relative m-0 w-full ${props.className ?? ""}`}
    {...createItemSmartLink(props.itemId, props.itemName)}
    style={{ height: "350px" }}
  >
    {props.type?.startsWith("image") && (
      <Image
        src={props.url + "?dpr=1"}
        alt={props.alt}
        fill
        sizes="100vw, 100vh"
        className="object-cover"
        priority
      />
    )}
    {props.type?.startsWith("video") && (
      <video
        src={props.url}
        autoPlay={true}
        loop={true}
        muted={true}
        className="object-cover"
      />
    )}
    <div className="inset-0 h-full flex flex-col justify-end pb-16 items-start">
      <div className="backdrop-blur-none mx-auto rounded-lg p-4 w-4/5 text-4xl">
        {props.children}
      </div>
    </div>
  </figure>
);

HeroImage.displayName = "HeroImage";
