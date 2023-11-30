import { motion } from "framer-motion";
import Image from "next/image";
import Typical from "react-typical";
import styled from "styled-components";
import heroImage from "../../public/210313_ModeElle_278_Print-smaller2.jpg";
import logoImage from "../../public/mode-elle-logo-black.png";

const ImageBackgroundWrapper = styled.div`
  top: -12px;
  margin: 0 11px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
  border: 1px solid hsl(43deg 17% 89%);
  border-radius: 1px;
  overflow: hidden;
  position: relative;

  @media (min-height: 900px) and (min-width: 640px) {
    height: 870px;
  }

  @media (min-width: 980px) {
    width: 400px;
    top: -49px;
    margin-left: 22px;
  }

  @media (min-width: 1250px) {
    width: 480px;
  }
`;
const InnerWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;

  img {
    object-position: 0 27%;

    @media (min-width: 980px) {
      object-position: 36% 27%;
    }
  }
`;

const HeroContent = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeroHeader = styled.div`
  padding: 16px 0px 36px 32px;

  @media (min-width: 980px) {
    padding: 24px 40px 24px 40px;
  }
`;

const LogoWrapper = styled.div`
  padding: 0 0 0px 0;
  display: none;

  @media (min-width: 980px) {
    display: block;
    margin-top: 24px;
  }
`;

const TypingHeading = styled.div`
  z-index: 9999;
  height: 100px;
  display: flex;
  align-items: center;
  width: 300px;
  font-family: "Bebas Neue";
  font-size: 72px;
  margin: 8px 0;

  p {
    display: flex;
  }

  @media (min-height: 900px) and (min-width: 640px) {
    font-size: 96px;
    margin-top: 32px;
  }

  @media (min-width: 980px) {
    font-size: 72px;
    margin-top: 8px;
  }

  @media (min-width: 1250px) {
    font-size: 82px;
  }

  @media (min-width: 1450px) {
    font-size: 96px;
  }
`;

const HeroFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 32px 28px;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  background-color: rgb(249 248 245 / 93%);
  background-color: hsl(36deg 11% 96%);
  z-index: 9999;
`;

const IntroText = styled.p`
  line-height: 21px;
  font-weight: 200;
  font-size: 13.5px;
  padding: 6px 12px 8px;
`;

const Vignette = styled.div`
  position: absolute;
  height: calc(100% + 70px);
  width: 100%;
  display: block;
  background-size: cover;
  z-index: 500;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: radial-gradient(
      circle,
      transparent 30%,
      rgba(80, 74, 64, 0.16) 100%
    );
  }

  /* removing shadow on hover
  for demonstration purposes */
  &:hover:after {
    background: none;
  }
`;

const CallToAction = styled.div`
  display: flex;
  align-items: center;
`;

const ApplyButton = styled.a`
  border: 1px solid black;
  border-radius: 1px;
  padding: 12px 24px;
  margin: 4px 0;
  background-color: black;
  color: white;
  outline: none;
  font-family: inherit;
  text-transform: uppercase;
  font-size: 14px;

  &:hover {
    transform: scale(1.015);
  }
`;

const LearnMore = styled.a`
  text-decoration: underline;
  font-size: 13px;
  margin: 0 32px;
  color: rgba(0, 0, 0, 0.75);

  &:hover {
    text-decoration: none;
  }
`;

function Hero(props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35, delay: 0.1 } }}
    >
      <ImageBackgroundWrapper>
        <InnerWrapper>
          <HeroContent>
            <HeroHeader>
              <LogoWrapper>
                <Image
                  src={logoImage}
                  width={190}
                  height={33}
                  priority={true}
                  quality={65}
                  alt=""
                />
              </LogoWrapper>
              <TypingHeading>
                <Typical
                  steps={[
                    "Agency",
                    6250,
                    "Modelling",
                    5000,
                    "Acting",
                    6000,
                    "Academy",
                    7000,
                  ]}
                  loop={Infinity}
                  wrapper="p"
                />
              </TypingHeading>
            </HeroHeader>
            <HeroFooter>
              <IntroText>{props.data["intro_text"]}</IntroText>
            </HeroFooter>
          </HeroContent>
          <Image
            src={props.data["hero_image"].url}
            width="630"
            height="1000"
            objectFit="cover"
            alt=""
          />
        </InnerWrapper>
      </ImageBackgroundWrapper>
    </motion.div>
  );
}

export default Hero;
