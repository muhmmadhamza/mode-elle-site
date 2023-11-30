import React from "react";
import styled from "styled-components";
import Image from "next/image";

import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";

const ImageRowWrapper = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
`;

const ImageWrapper = styled.div`
  height: 360px;
  flex: 1;
  position: relative;
  margin: 0 32px;
`;

const ImageRowSlice = ({ slice }) => {
  return (
    <MaxWidthContent maxWidth={1024}>
      <ImageRowWrapper>
        {slice.items.map((item) => {
          return (
            <ImageWrapper>
              <Image
                src={item.image.url}
                alt=""
                layout="fill"
                objectFit="contain"
              />
            </ImageWrapper>
          );
        })}
      </ImageRowWrapper>
    </MaxWidthContent>
  );
};

export default ImageRowSlice;
