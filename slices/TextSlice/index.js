import React from "react";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";

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

  ol, ul {
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

const TextWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TextSlice = ({ slice }) => {
  return (
    <section>
      <ContentWrapper>
        <MaxWidthContent maxWidth={960}>
          <TextWrapper>
            {slice.primary.text ? (
              <RichText render={slice.primary.text} />
            ) : (
              <h2>Template slice, update me!</h2>
            )}
          </TextWrapper>
        </MaxWidthContent>
      </ContentWrapper>
    </section>
  );
};

export default TextSlice;
