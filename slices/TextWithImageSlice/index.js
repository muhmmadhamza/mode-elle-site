import React from "react";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";

import Image from "next/image";
import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";

const ContentWrapper = styled.div`
  padding: 0 12px 32px 12px;

  h3 {
    margin: 24px 0 8px;
  }

  p,
  ul li,
  ol li {
    font-size: 18px;
    letter-spacing: 0;
    line-height: 28px;
    color: #222;
    margin: 9px 0;
  }

  ol,
  ul {
    margin: 0;
  }

  p:first-child {
    margin-top: 0;
  }

  ul li,
  ol li {
    font-size: 18px;
    margin: 12px 0;
  }
`;

const ContentInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px 0;

  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  margin: 16px 0 32px 0;
  max-width: 600px;
  max-height: 800px;
  overflow: hidden;

  @media (min-width: 1000px) {
    margin: 5px 32px 32px 0;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 32px;
  justify-content: center;
  align-items: center;
`;

const TextInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextWithImageSlice = ({ slice }) => {
  let maxWidth;
  switch (slice.primary.widthVariation) {
    default:
      maxWidth = 1536;
      break;
    case "small":
      maxWidth = 960;
      break;
    case "fullWidth":
      maxWidth = 2000;
      break;
  }

  return (
    <section>
      <ContentWrapper>
        <MaxWidthContent maxWidth={maxWidth}>
          <ContentInnerWrapper>
            {slice.primary.image ? (
              <ImageWrapper>
                <Image
                  src={slice.primary.image.url}
                  alt=""
                  height={slice.primary.image.dimensions.height}
                  width={slice.primary.image.dimensions.width}
                  layout="intrinsic"
                />
              </ImageWrapper>
            ) : (
              <></>
            )}
            {slice.primary.text ? (
              <TextWrapper>
                <TextInnerWrapper>
                  <RichText render={slice.primary.text} />
                </TextInnerWrapper>
              </TextWrapper>
            ) : (
              <h2>Template slice, update me!</h2>
            )}
          </ContentInnerWrapper>
        </MaxWidthContent>
      </ContentWrapper>
    </section>
  );
};

export default TextWithImageSlice;
