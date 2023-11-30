import Image from "next/image";
import { ProGallery } from "pro-gallery";

import "pro-gallery/dist/statics/main.css";

const elairoCdnImageLoader = ({ src, width, quality }) => {
  return src;
};

export default function Gallery(props) {
  const images = props.files.map((file) => {
    return {
      itemId: file.id,
      mediaUrl: file.url,
      metaData: {
        type: "image",
        height: 100,
        width: 400,
      },
    };
  });

  // The options of the gallery (from the playground current state)
  const options = {
    galleryLayout: 3,
    thumbnailSize: 160,
    arrowsSize: 20,
    hoveringBehaviour: "NEVER_SHOW",
    allowContextMenu: true,
  };

  // The size of the gallery container. The images will fit themselves in it
  const container = {
    width: props.width,
    height: props.height,
  };

  // The eventsListener will notify you anytime something has happened in the gallery.
  const eventsListener = (eventName, eventData) => {
    //console.log({ eventName, eventData });
  };

  // The scrollingElement is usually the window, if you are scrolling inside another element, suplly it here
  const scrollingElement = window;

  return (
    <ProGallery
      items={images}
      options={options}
      container={container}
      eventsListener={eventsListener}
      scrollingElement={scrollingElement}
      customComponents={{
        customImageRenderer: (imageProps) => {
          return (
            <Image
              loader={elairoCdnImageLoader}
              src={imageProps.src}
              layout="fill"
              objectFit="contain"
              alt=""
            />
          );
        },
      }}
    />
  );
}
