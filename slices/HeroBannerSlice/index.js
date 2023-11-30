import React from "react";
import { RichText } from "prismic-reactjs";

import styled from "styled-components";
import Image from "next/image";

import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";

const PortfolioHeader = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #000000c9;
`;

const CoverPhotoWrapper = styled.div`
  height: 308px;
  width: 100%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    background: linear-gradient(
      to bottom,
      hsl(40deg 23% 92% / 2%) 0%,
      hsl(40deg 23% 10% / 42%) 50%
    );
  }
`;

const HeaderContentWrapper = styled.div`
  position: relative;
  height: 308px;
  top: -308px;
  margin-bottom: -308px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 500;
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 72px;
`;

const Vignette = styled.div`
  position: absolute;
  height: calc(100%);
  width: 100%;
  display: block;
  background-size: cover;
  z-index: 300;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    background: radial-gradient(
      circle,
      transparent 40%,
      rgba(0, 0, 0, 0.95) 150%
    );
  }

  /* removing shadow on hover
  for demonstration purposes 
  &:hover:after {
    background: none;
  }*/
`;

const PageTitle = styled.h1`
  font-size: 56px !important;
  background-color: white;
  padding: 6px 12px 11px;
  margin-left: 32px;
`;

const Quote = styled.div`
  font-size: 18px;
  color: white;
  font-weight: 200;
  text-shadow: 2px 2px 3px rgb(0 0 0 / 66%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 16px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const QuoteAuthor = styled.div``;

const HeroBannerSlice = ({ slice }) => {
  return (
    <>
      <PortfolioHeader>
        <CoverPhotoWrapper>
          <Vignette />
          <Image
            src="/portfolio/10-smaller.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </CoverPhotoWrapper>
        <HeaderContentWrapper>
          <MaxWidthContent>
            <HeaderContent>
              <PageTitle>{slice.primary.title}</PageTitle>
              <Quote>
                {slice.primary.quoteText ? (
                  <RichText render={slice.primary.quoteText} />
                ) : (
                  <></>
                )}
                {slice.primary.quoteAuthor ? (
                  <QuoteAuthor>― {slice.primary.quoteAuthor}</QuoteAuthor>
                ) : (
                  slice.primary.quoteText.length !== 0 && (
                    <span>unattributed</span>
                  )
                )}
              </Quote>
            </HeaderContent>
          </MaxWidthContent>
        </HeaderContentWrapper>
      </PortfolioHeader>
    </>
  );
};

export default HeroBannerSlice;
