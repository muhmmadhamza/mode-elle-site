import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import {
  default as labelMen,
  default as labelNewFaces,
} from "../../public/division-labels/1-smaller2.jpg";
import labelWomen from "../../public/division-labels/10-smaller2.jpg";
import labelCommercial from "../../public/division-labels/4-smaller2.jpg";
import labelLifestyle from "../../public/division-labels/5-smaller2.jpg";
import labelChildren from "../../public/division-labels/8-smaller2.jpg";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;

  @media (min-width: 980px) {
    grid-template-columns: none;
    grid-template-rows: 64px 64px 64px 64px 64px;
    grid-gap: 12px;
  }

  @media (min-width: 1160px) {
    grid-template-columns: 50% 50%;
    grid-template-rows: none;
    grid-gap: initial;
  }
`;

const InnerWrapper = styled.div`
  float: left;
  width: 100%;
`;

const DivisionLabel = styled.div`
  position: relative;
  height: 110px;
  background-color: grey;
  margin: 8px;
  float: left;
  border-radius: 1px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 12px;
  transition: transform 200ms;

  @media (min-width: 980px) {
    height: 64px;
  }

  @media (min-width: 1160px) {
    height: 80px;
    margin: 8px 6px;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 35%) 0px 4px 12px;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(2px);
  }

  a {
    position: relative;
    display: flex;
    height: 100%;
  }
`;

const LabelTextWrapper = styled.div`
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LabelTextInnerWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 3px 8px 0 8px;
  border-radius: 1px;
`;

const LabelText = styled.h2`
  font-family: "Bebas Neue" !important;
  margin: 0;
  padding: 0;
  font-size: ${(props) => (props.fontSize ? props.fontSize : 24)}px !important;
  color: rgba(0, 0, 0, 0.9);
  letter-spacing: 1px;
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      duration: 0.9,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function DivisionLabels(props) {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <Wrapper>
        <DivisionLabel>
          <Link href="/agency/divisions/fashion-men">
            <a>
              <Image
                src={labelMen}
                alt=""
                layout="fill"
                objectFit="cover"
                placeholder="blur"
              />
              <LabelTextWrapper>
                <LabelTextInnerWrapper>
                  <LabelText>Men</LabelText>
                </LabelTextInnerWrapper>
              </LabelTextWrapper>
            </a>
          </Link>
        </DivisionLabel>

        <DivisionLabel>
          <Link href="/agency/divisions/fashion-women">
            <a>
              <Image
                src={labelWomen}
                alt=""
                layout="fill"
                objectFit="cover"
                placeholder="blur"
              />
              <LabelTextWrapper>
                <LabelTextInnerWrapper>
                  <LabelText>Women</LabelText>
                </LabelTextInnerWrapper>
              </LabelTextWrapper>
            </a>
          </Link>
        </DivisionLabel>

        <DivisionLabel>
          <Link href="/agency/divisions/children">
            <a>
              <Image
                src={labelChildren}
                alt=""
                layout="fill"
                objectFit="cover"
                placeholder="blur"
              />
              <LabelTextWrapper>
                <LabelTextInnerWrapper>
                  <LabelText fontSize={23}>Children</LabelText>
                </LabelTextInnerWrapper>
              </LabelTextWrapper>
            </a>
          </Link>
        </DivisionLabel>
        <DivisionLabel>
          <Link href="/agency/divisions/commercial">
            <a>
              <Image
                src={labelCommercial}
                alt=""
                layout="fill"
                objectFit="cover"
                placeholder="blur"
              />
              <LabelTextWrapper>
                <LabelTextInnerWrapper>
                  <LabelText fontSize={19}>Commercial</LabelText>
                </LabelTextInnerWrapper>
              </LabelTextWrapper>
            </a>
          </Link>
        </DivisionLabel>
        <DivisionLabel>
          <Link href="/agency/divisions/talent-lifestyle">
            <a>
              <Image
                src={labelLifestyle}
                alt=""
                layout="fill"
                objectFit="cover"
                placeholder="blur"
              />
              <LabelTextWrapper>
                <LabelTextInnerWrapper>
                  <LabelText fontSize={20}>Talent/Lifestyle</LabelText>
                </LabelTextInnerWrapper>
              </LabelTextWrapper>
            </a>
          </Link>
        </DivisionLabel>
        <DivisionLabel>
          <Link href="/agency/divisions/new-faces">
            <a>
              <Image
                src={labelNewFaces}
                alt=""
                layout="fill"
                objectFit="cover"
                placeholder="blur"
              />
              <LabelTextWrapper>
                <LabelTextInnerWrapper>
                  <LabelText fontSize={20}>New Faces</LabelText>
                </LabelTextInnerWrapper>
              </LabelTextWrapper>
            </a>
          </Link>
        </DivisionLabel>
      </Wrapper>
    </motion.div>
  );
}
