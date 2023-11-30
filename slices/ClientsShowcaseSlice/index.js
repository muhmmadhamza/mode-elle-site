import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import Image from "next/image";

import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";
import SectionHeading from "../../components/SectionHeading/SectionHeading";

const Wrapper = styled.div`
  margin: 24px 0 48px 0;
  width: 100%;
  display: flex;
  box-shadow: hsl(36deg 4% 91%) 0px 50px 100px -20px,
    hsl(36deg 4% 60%) 0px 30px 45px -30px;

  flex-direction: column;

  @media screen and (min-width: 1000px) {
    flex-direction: row;
  }

  overflow: hidden;
`;

const Story = styled.div`
  background-color: #000;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 64px;
  border-radius: 1px;

  @media screen and (min-width: 1000px) {
    width: 35%;
  }
`;

const Kicker = styled.span`
  text-transform: uppercase;
  font-size: 85%;
  margin: 8px 0;
`;

const Description = styled.div``;

const LogoGrid = styled.div`
  padding: 24px 0;
  width: 100%;
  background-color: #eae8e5;
  flex: 1;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (min-width: 475px) {
    padding: 32px 16px;
  }

  @media screen and (min-width: 650px) {
    padding: 32px;
  }

  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1200px) {
    padding: 48px;
  }
`;

const Logo = styled(Image)``;

const LogoImageWrapper = styled.div`
  flex: 1;
  padding: 32px 0;
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 100%;
  width: 100%;
`;

const LogoImageInnerWrapper = styled.div`
  width: 120px;
  height: 75px;
  position: relative;

  @media screen and (min-width: 475px) {
    width: 154px;
    height: 90px;
  }

  @media screen and (min-width: 1200px) {
    width: 160px;
    height: 100px;
  }
`;

const ClientsShowcaseSlice = ({ slice }) => {
  return (
    <MaxWidthContent>
      <Wrapper>
        <Story>
          <Kicker>{slice.primary.kicker}</Kicker>
          <SectionHeading>{slice.primary.title[0].text}</SectionHeading>
          <RichText render={slice.primary.description} />
          <a href="#" style={{ textDecoration: "underline", marginTop: 16 }}>
            {slice.primary.callToActionLabel}
          </a>
        </Story>
        <LogoGrid>
          {slice.logos.map((logo, i) => {
            return (
              <LogoImageWrapper key={i}>
                <LogoImageInnerWrapper>
                  <Logo
                    src={logo.image.url}
                    layout="fill"
                    objectFit="contain"
                  />
                </LogoImageInnerWrapper>
              </LogoImageWrapper>
            );
          })}
        </LogoGrid>
      </Wrapper>
    </MaxWidthContent>
  );
};

export default ClientsShowcaseSlice;
