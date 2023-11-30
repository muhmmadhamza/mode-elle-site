import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { linkResolver } from "../../prismic";

const FooterMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  width: 50%;
  padding: 16px;
  padding-left: 22px;

  @media (min-width: 760px) {
    width: auto;
    padding-left: 0;
  }
`;

const FooterMenuHeading = styled.h3`
  color: inherit;
`;

const FooterLink = styled.div`
  margin: 7px 0;
  font-size: 90%;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterMenuSlice = ({ slice }) => {
  return (
    <FooterMenuWrapper>
      <FooterMenuHeading>
        {slice.primary.footerLinkListHeading}
      </FooterMenuHeading>
      {slice?.items?.map((item, i) => {
        if (!item.footerLink) {
          return <></>;
        }

        const url = item.footerLink.url
          ? item.footerLink.url
          : linkResolver(item.footerLink);

        return (
          <FooterLink key={i}>
            <Link href={url}>{item.footerLinkText}</Link>
          </FooterLink>
        );
      })}
    </FooterMenuWrapper>
  );
};

export default FooterMenuSlice;
