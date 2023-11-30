import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";

const Wrapper = styled.div`
  margin: 16px 16px;
  display: flex;
  width: 100%;
  flex-direction: column;

  iframe {
    width: 100%;
    height: 440px;
  }

  @media screen and (min-width: 650px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 64px 16px;

    iframe {
      width: 300px;
      height: 540px;
    }
  }

  @media screen and (min-width: 820px) {
    iframe {
      width: 400px;
      height: 440px;
    }
  }

  @media screen and (min-width: 1000px) {
    iframe {
      width: 500px;
      height: 440px;
    }
  }

  @media screen and (min-width: 1200px) {
    iframe {
      width: 680px;
      height: 440px;
    }
  }
`;

const ContactData = styled.div`
  display: flex;
  flex-direction: column;
`;

const MySlice = ({ slice }) => (
  <MaxWidthContent maxWidth={1100}>
    <Wrapper>
      <ContactData>
        <RichText render={slice.primary.contactData} />
      </ContactData>

      <iframe
        width="700"
        height="440"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJW2dCOVwl1okRnPV4YFK7uPU&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
      />
    </Wrapper>
  </MaxWidthContent>
);

export default MySlice;
