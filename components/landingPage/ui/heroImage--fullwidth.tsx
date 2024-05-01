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
  height: number;
}>;

export const HeroImage: FC<Props> = (props) => (
  <figure
    className={`component_full-width relative mt-4 ${props.className ?? ""}`}
    style={{ height: props.height }}
    {...createItemSmartLink(props.itemId, props.itemName)}
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
    <div className="absolute inset-0 h-full flex flex-col items-center md:items-start justify-end pb-16 px-6 mt-8">
      <div className="backdrop-blur-sm bg-black/50 flex flex-col mx-auto rounded-lg p-4 w-1/2">
        {props.children}
      </div>
    </div>
  </figure>
);

HeroImage.displayName = "HeroImage";
