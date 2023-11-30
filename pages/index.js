import Prismic from "@prismicio/client";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import SliceZone from "next-slicezone";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";
import DivisionLabels from "../components/DivisionLabels/DivisionLabels";
import FeaturedShotsGallery from "../components/FeaturedShotsGallery/FeaturedShotsGallery";
import Hero from "../components/Hero/Hero";
import MaxWidthContent from "../components/MaxWidthContent/MaxWidthContent";
import { Client } from "../prismic";
import resolver from "../sm-resolver";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media (min-width: 1000px) {
    flex-direction: row;
  }
`;

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 1000px) {
    width: auto;
  }
`;

const GalleryWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
`;

const GalleryInnerWrapper = styled.div`
  margin-left: 24px;
  overflow-x: hidden;
  height: 100%;

  @media (min-width: 1000px) {
    margin-left: 30px;
  }
`;

const FeaturedShotsWrapper = styled.div`
  padding-left: 6px;
`;

const HeadingArea = styled.div`
  border-bottom: 1px solid #444;
  display: flex;
  align-items: center;
  margin: 0 0 16px 0;
`;

const SpotlightHeadingArea = styled(HeadingArea)`
  margin-right: 24px;
`;

const SectionHeading = styled.h2`
  margin: 9px 0;
  font-size: 23px !important;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const DivisionsAndUpdates = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1000px) {
    flex-direction: row;
  }
`;

const Divisions = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;

  @media (min-width: 1000px) {
    width: 48%;
    padding: 20px 24px 8px 30px;
  }
`;

const Updates = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 24px 8px 24px;
`;

const CardsWrapper = styled.div`
  margin: 0 16px;
  padding-top: 8px;
`;

const CardTest = styled.div`
  width: 100%;
  height: 64px;
  margin-bottom: 12px;
  box-shadow: hsl(36deg 4% 96%) 0px 1px 15px 0px,
    hsl(36deg 4% 70%) 0px 1px 2px 0px;
  background-color: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 16px;
`;

const DateLabel = styled.div`
  font-size: 80%;
  width: 110px;
  span {
    background-color: #eae8e5;
    padding: 5px 6px;
    border-radius: 2px;
  }
`;

const EventTitle = styled.div`
  padding-left: 8px;
  flex: 1;
  font-size: 80%;

  a {
    text-decoration: underline;
  }
`;

export default function Home(props) {
  /*
   * This is a slightly hacky solution to effectively embed documents into
   * other documents, which Prismic doesn't yet natively support.
   *
   * The gallery is managed in the instagram_gallery single type, meaning that
   * whenever its updated there, it updates across the site.
   *
   * Having an InstagramGallerySlice that would contain the data instead of
   * keeping it in a document would mean that each update would require an
   * editor to find all the usages of that slice and update if for every doc
   * using it.
   *
   * Another way of doing this would be to make a client-side request in the
   * InstagramGallerySlice, but in that case, you would lose the benefits of
   * pre-rendering at build time.
   */

  const enrichedSlices = props.home.data.body.map((slice) => {
    if (slice.slice_type === "instagram_gallery_slice") {
      const images = props.instagramGallery.data.images;
      return {
        images,
        ...slice,
      };
    } else if (slice.slice_type === "spotlight_gallery_slice") {
      const images = props.spotlightGallery.data.images;
      return {
        images,
        ...slice,
      };
    } else if (slice.slice_type === "clients_showcase_slice") {
      const logos = props.clientsShowcase.data.logos;
      return {
        logos,
        ...slice,
      };
    } else if (slice.slice_type === "featured_testimonials_slice") {
      const testimonials = props.testimonials.results;
      return {
        testimonials,
        ...slice,
      };
    } else {
      // Nothing to enrich
      return slice;
    }
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.125,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const updates = (
    <Updates>
      <HeadingArea>
        <SectionHeading>Updates</SectionHeading>
      </HeadingArea>
      <motion.div variants={container} initial="hidden" animate="show">
        <CardsWrapper>
          <motion.div variants={item}>
            <CardTest>
              <EventTitle>
                <RichText render={props.updates.data.update1} />
              </EventTitle>
            </CardTest>
          </motion.div>
          <motion.div variants={item}>
            <CardTest>
              <EventTitle>
                <RichText render={props.updates.data.update2} />
              </EventTitle>
            </CardTest>
            <motion.div variants={item}></motion.div>
            <CardTest>
              <EventTitle>
                <RichText render={props.updates.data.update3} />
              </EventTitle>
            </CardTest>
          </motion.div>
          <motion.div variants={item}>
            <CardTest>
              <EventTitle>
                <RichText render={props.updates.data.update4} />
              </EventTitle>
            </CardTest>
          </motion.div>
        </CardsWrapper>
      </motion.div>
    </Updates>
  );

  /*
   * Note that the slices that come from different tabs in Prismic (Main, SEO)
   * don't automatically get merged to a single slices object. That's why the
   * SliceZone needs to be rendered twice, once for the main slices, once for
   * the SEO tab.
   */
  return (
    <>
      <MaxWidthContent>
        <Wrapper>
          <HeroWrapper>
            <Hero {...props.home} />
          </HeroWrapper>

          <Information>
            <DivisionsAndUpdates>
              <Divisions>
                <HeadingArea>
                  <SectionHeading>Divisions</SectionHeading>
                </HeadingArea>
                <DivisionLabels divisions={props.divisions} />
              </Divisions>
              {updates}
            </DivisionsAndUpdates>
            <GalleryWrapper>
              <GalleryInnerWrapper>
                <SpotlightHeadingArea>
                  <SectionHeading>Spotlight</SectionHeading>
                </SpotlightHeadingArea>
                <FeaturedShotsWrapper>
                  <FeaturedShotsGallery spotlight={props.spotlight} />
                </FeaturedShotsWrapper>
              </GalleryInnerWrapper>
            </GalleryWrapper>
          </Information>
        </Wrapper>
      </MaxWidthContent>
      <SliceZone slices={enrichedSlices} resolver={resolver} />
      <SliceZone slices={props.home.data.body1} resolver={resolver} />{" "}
      <NextSeo title="Mode Elle – Agency / Academy" titleTemplate="%s" />
    </>
  );
}

export async function getStaticProps() {
  const home = await Client().getSingle("home");
  const instagramGallery = await Client().getSingle("instagram_gallery");
  const clientsShowcase = await Client().getSingle("clients_showcase");
  const testimonials = await Client().query(
    Prismic.Predicates.at("document.type", "testimonial")
  );

  const updates = await Client().getSingle("updates");
  const spotlight = await Client().getSingle("spotlight");

  const divisions = await Client().query(
    Prismic.Predicates.at("document.type", "division")
  );

  return {
    props: {
      home,
      instagramGallery,
      clientsShowcase,
      testimonials,
      divisions,
      updates,
      spotlight,
    },
  };
}
