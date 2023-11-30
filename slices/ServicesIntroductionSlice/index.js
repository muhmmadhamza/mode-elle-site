import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";
import SectionHeadingArea from "../../components/SectionHeadingArea/SectionHeadingArea";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Link from "next/link";

const Wrapper = styled.div`
  width: 100%;
  box-shadow: hsl(36deg 4% 96%) 0px 1px 15px 0px,
    hsl(36deg 4% 77%) 0px 1px 2px 0px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin: 24px 0;
  padding: 24px;

  @media (min-width: 1000px) {
    margin-right: calc(400px + 32px); // width of upcoming events slice + margin
    flex-direction: row;
  }
`;

const Introduction = styled.div`
  flex: 1;
  width: 100%;
  padding: 36px;

  .service-readmore {
    margin-top: 8px;
    text-decoration: underline;
    font-size: 14.5px;
  }
`;

const Heading = styled.h2`
  font-family: "Bebas Neue" !important;
  font-size: 36px !important;
  margin: 0 !important;
`;

const Description = styled.p`
  font-size: 14px;
  font-style: italic;
`;

const Services = styled.div`
  font-size: 14.5px;

  ul li {
    margin: 4px 0;
  }
`;

const ServicesIntroductionSlice = ({ slice }) => {
  return (
    <MaxWidthContent>
      <Wrapper>
        <Introduction>
          <Heading>Agency</Heading>
          <Description>
            Mode Elle promotes and connects models &amp; talent to reputable
            clients and top international placement agencies.
          </Description>
          <Services>
            <ul>
              <li>Equipping models with strong portfolios and resumes</li>
              <li>Managing custom casting profiles</li>
              <li>Guidance for legal and financial matters</li>
              <li>Managing agency and client relations</li>
              <li>Submitting and booking client work</li>
            </ul>
          </Services>
          <Link href="/agency">
            <a className="service-readmore">More about the agency</a>
          </Link>
        </Introduction>

        <Introduction>
          <Heading>Academy</Heading>
          <Description>
            Mode Elle offers a full-service academy focused on scouting,
            developing and training aspiring models &amp; talent.
          </Description>
          <Services>
            <ul>
              <li>Discovering individual potential</li>
              <li>Advising on careers and personal development</li>
              <li>
                Developing skills and personality through courses and workshops
              </li>
              <li>Organizing photoshoots and special events</li>
              <li>Getting models and talent promotion-ready</li>
            </ul>
          </Services>
          <Link href="/academy">
            <a className="service-readmore">More about the academy</a>
          </Link>
        </Introduction>
      </Wrapper>
    </MaxWidthContent>
  );
};

export default ServicesIntroductionSlice;
