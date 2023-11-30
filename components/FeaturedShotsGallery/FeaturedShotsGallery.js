import Image from "next/image";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  DotGroup,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import styled from "styled-components";

import styles from "./FeaturedShotsGallery.module.css";

import { motion, useReducedMotion } from "framer-motion";

const ImageWrapper = styled.div`
  margin: 0px 24px 0px 0;
  position: relative;
  flex: 1;
`;

const Vignette = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: block;
  background-size: cover;
  z-index: 9999;

  /*&::after {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.2) 150%);
  }*/

  /* removing shadow on hover
  for demonstration purposes */
  &:hover:after {
    background: none;
  }
  flex: 1;
`;

const StyledImage = styled(Image)`
  box-shadow: rgb(50 50 93 / 8%) 0px 50px 100px -20px,
    rgb(0 0 0 / 5%) 0px 30px 60px -30px,
    rgb(10 37 64 / 30%) 0px -2px 6px 0px inset;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  margin-right: 24px;
`;

const StyledButtonBack = styled(ButtonBack)`
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.8);
  font-family: "Lexend";
  border: none;
  padding: 8px;
  border-radius: 1px;
  text-transform: uppercase;
`;

const StyledButtonNext = styled(ButtonNext)`
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.8);
  font-family: "Lexend";
  border: none;
  padding: 8px;
  border-radius: 1px;
  text-transform: uppercase;
`;

export default function FeaturedShotsGallery(props) {
  const shouldReduceMotion = useReducedMotion();
  const isDev = process.env.NODE_ENV === "development" ? true : false;
  const shouldAutoplay = !shouldReduceMotion && !isDev;

  return (
    <CarouselProvider
      naturalSlideWidth={344}
      naturalSlideHeight={324}
      isPlaying={shouldAutoplay}
      interval={10000}
      visibleSlides={3}
      totalSlides={5}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.66 } }}
      >
        <Wrapper>
          <Slider className={styles.customSlider} isPlaying={shouldAutoplay}>
            <Slide index={0}>
              <ImageWrapper>
                <Vignette />
                <Image
                  height="1024"
                  width="1024"
                  src={props.spotlight.data.image1.url}
                />
              </ImageWrapper>
            </Slide>
            <Slide index={1}>
              <ImageWrapper>
                <Vignette />
                <Image
                  height="1024"
                  width="1024"
                  src={props.spotlight.data.image2.url}
                />
              </ImageWrapper>
            </Slide>
            <Slide index={2}>
              <ImageWrapper>
                <Vignette />
                <Image
                  height="1024"
                  width="1024"
                  src={props.spotlight.data.image3.url}
                />
              </ImageWrapper>
            </Slide>
            <Slide index={3}>
              <ImageWrapper>
                <Vignette />
                <Image
                  height="1024"
                  width="1024"
                  src={props.spotlight.data.image4.url}
                />
              </ImageWrapper>
            </Slide>
            <Slide index={4}>
              <ImageWrapper>
                <Vignette />
                <Image
                  height="1024"
                  width="1024"
                  src={props.spotlight.data.image5.url}
                />
              </ImageWrapper>
            </Slide>
          </Slider>
          <Controls>
            <StyledButtonBack>&lt; Previous</StyledButtonBack>
            <DotGroup className={styles.customDots} disableActiveDots={false} />
            <StyledButtonNext>Next &gt;</StyledButtonNext>
          </Controls>
        </Wrapper>
      </motion.div>
    </CarouselProvider>
  );
}
