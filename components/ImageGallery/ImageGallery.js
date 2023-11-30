import styled from "styled-components";
import {
  CarouselProvider,
  DotGroup,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import styles from "./ImageGallery.module.css";

const ImageWrapper = styled.div`
  margin: 0px 24px 0px 0;
  position: relative;
`;
const Vignette = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: block;
  background-size: cover;
  z-index: 9999;

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
      rgba(0, 0, 0, 0.2) 150%
    );
  }

  /* removing shadow on hover
  for demonstration purposes */
  &:hover:after {
    background: none;
  }
`;

const StyledImage = styled(Image)`
  box-shadow: rgba(50, 50, 93, 0.2) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.25) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.3) 0px -2px 6px 0px inset;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SliderWrapper = styled.div`
  //overflow-x: hidden;
  //width: 100%;
  //flex-grow: 1;
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

export default function ImageGallery(props) {
  const isDev = process.env.NODE_ENV === "development" ? true : false;
  const isPlaying = isDev ? false : true;

  return (
    <CarouselProvider
      naturalSlideWidth={344}
      naturalSlideHeight={324}
      isPlaying={isPlaying}
      interval={10000}
      visibleSlides={6}
      totalSlides={props.slides.length}
      lockOnWindowScroll={true}
    >
      <Wrapper>
        <SliderWrapper>
          <Slider className={styles.customSlider} isPlaying={isPlaying}>
            {props.slides.map((slide, i) => {
              return (
                <Slide index={i} key={i}>
                  <ImageWrapper>
                    <Vignette />
                    <StyledImage src={slide.image.url} />
                  </ImageWrapper>
                </Slide>
              );
            })}
          </Slider>
        </SliderWrapper>
        <Controls>
          <StyledButtonBack>&lt; Previous</StyledButtonBack>
          <DotGroup className={styles.customDots} disableActiveDots={false} />
          <StyledButtonNext>Next &gt;</StyledButtonNext>
        </Controls>
      </Wrapper>
    </CarouselProvider>
  );
}
