import React from "react";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";

import Image from "next/image";
import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";

const ContentWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 12px 32px 12px;

  h3 {
    margin: 24px 0 8px;
  }

  p,
  ul li,
  ol li {
    font-size: 20px;
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
  flex: 1;

  @media (min-width: 1000px) {
    align-items: flex-start;
  }
`;

const TeamMember = styled.div`
  display: flex;
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
  width: 300px;
  height: 450px;

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

const Name = styled.h3``;

const Title = styled.span``;

const Bio = styled.div``;

const TeamSlice = ({ slice }) => {
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
    <ContentWrapper>
      <MaxWidthContent>
        <ContentInnerWrapper>
          {slice.items.map((item) => {
            return (
              <TeamMember>
                {item.image ? (
                  <ImageWrapper>
                    <Image src={item.image.url} alt="" layout="fill" />
                  </ImageWrapper>
                ) : (
                  <></>
                )}

                <TextWrapper>
                  <TextInnerWrapper>
                    <Name>{item.name}</Name>
                    <Title>{item.title}</Title>
                    <Bio>
                      <RichText render={item.bio} />
                    </Bio>
                  </TextInnerWrapper>
                </TextWrapper>
              </TeamMember>
            );
          })}
        </ContentInnerWrapper>
      </MaxWidthContent>
    </ContentWrapper>
  );
};

export default TeamSlice;
