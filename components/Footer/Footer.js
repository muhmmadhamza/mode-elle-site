import SliceZone from "next-slicezone";
import React from "react";
import styled from "styled-components";
import resolver from "../../sm-resolver.js";
import MaxWidthContent from "../MaxWidthContent/MaxWidthContent.js";

const Wrapper = styled.footer`
  min-height: 400px;
  background-color: #000;
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0 12px 0;

  .max-width-content {
    flex-direction: column;
  }
`;

const InnerWrapper = styled.div`
  width: 90%;
  padding: 0 32px;
  padding-bottom: 8px;

  @media (min-width: 760px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Bottom = styled.div`
  margin: 24px 24px;
  width: calc(100% - 48px);
  border-top: 1px solid rgba(255, 255, 255, 0.55);
  font-size: 70%;
  padding: 8px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  @media (min-width: 700px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  padding: 8px 0 16px 0;

  @media (min-width: 700px) {
    padding: 0;
  }
`;

const BottomLink = styled.a`
  margin-left: 24px;
  margin-bottom: 6px;

  @media (min-width: 700px) {
    margin-bottom: 0;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export default function Footer(props) {
  return (
    <Wrapper>
      <MaxWidthContent>
        <InnerWrapper>
          <SliceZone slices={props.footerMenu.data.body} resolver={resolver} />
        </InnerWrapper>
        <Bottom>
          <span>Mode Elle Model &amp; Talent - NKC Fashion Inc</span>
          <BottomLinks>
            <span>&copy; 2023 NKC Fashion Inc. All rights reserved.</span>
            <BottomLink href="/privacy-policy">Privacy Policy</BottomLink>

            <BottomLink
              href="https://www.revblue.com"
              target="_blank"
              rel="noopener"
            >
              Website by RevBlue
            </BottomLink>
          </BottomLinks>
        </Bottom>
      </MaxWidthContent>
    </Wrapper>
  );
}
