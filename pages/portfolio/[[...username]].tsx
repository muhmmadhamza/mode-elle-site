// @ts-nocheck

import Prismic from "@prismicio/client";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Client } from "../../prismic";

import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";

import { useCallback, useState } from "react";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import dynamic from "next/dynamic";

const PortfolioHeader = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #000000c9;
`;

const CoverPhotoWrapper = styled.div`
  height: 308px;
  width: 100%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    background: linear-gradient(
      to bottom,
      hsl(40deg 23% 92% / 2%) 0%,
      hsl(40deg 23% 10% / 42%) 50%
    );
  }
`;

const HeaderContent = styled.div`
  position: relative;
  height: 308px;
  top: -308px;
  margin-bottom: -308px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Vignette = styled.div`
  position: absolute;
  height: calc(100%);
  width: 100%;
  display: block;
  background-size: cover;
  z-index: 800;

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
      rgba(0, 0, 0, 0.95) 150%
    );
  }

  /* removing shadow on hover
  for demonstration purposes 
  &:hover:after {
    background: none;
  }*/
`;

const ProfileImagePositioner = styled.div`
  display: flex;
  justify-content: center;
  z-index: 1000;
  align-self: center;

  bottom: -50%;
  left: 0;
  position: absolute;
  width: 100%;
  @media (min-width: 801px) {
    width: auto;
    padding-left: 16px;
  }
`;

const ProfileImageWrapper = styled.div`
  width: 330px;
  height: 440px;
  position: relative;
  z-index: 1000;
  border: 7px solid white;
  border-radius: 1px;
`;

const ProfileHeaderInfo = styled.div`
  margin-left: calc(330px + 64px);
  flex: 1;
  display: flex;

  @media (max-width: 800px) {
    display: none;
  }
`;

const NameHeaderWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 0px 24px 0 24px;
  border-radius: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 48px 0 32px;
`;

const NameHeader = styled.h1`
  font-size: 32px !important;
`;

const NameHeaderWrapper2 = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 0px 24px 0 24px;
  border-radius: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 154px;
  @media (min-width: 801px) {
    display: none;
  }
`;

const NameHeader2 = styled.h1`
  font-size: 22px !important;
  font-weight: 200;
  font-family: Lexend;
`;

const PortfolioContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 32px;

  @media (min-width: 1100px) {
    flex-direction: row;
  }
`;

const Measurements = styled.div`
  width: 330px;
  height: 500px;
  display: flex;
  align-self: center;
  margin-top: 24px;
  padding: 8px;
  padding-left: 16px;

  td {
    padding: 4px;
  }

  @media (min-width: 801px) {
    margin-top: 200px;
  }

  @media (min-width: 1101px) {
    padding-top: 0px;
    margin-top: 40px;
    padding-left: 40px;
  }
`;

const Images = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 120px 0;
  overflow-x: hidden;

  @media (min-width: 1101px) {
    padding: 48px;
  }
`;

const ImagesWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 64px 24px;
  position: relative;
  padding: 64px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 360px;
  position: relative;
`;

const useLegacyId = (urlIdParam) => {
  if (!urlIdParam) {
    return false;
  }

  const splitId = urlIdParam.split("/");
  const numericId = parseInt(splitId[0]);
  return numericId;
};

const myLoader = ({ src, width, quality }) => {
  return `${src}`;
};

const ZoomableImage = (props) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = useCallback((shouldZoom) => {
    setIsZoomed(shouldZoom);
  }, []);

  return (
    <div className="zoomable-image">
      <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
        <a onClick={() => setIsZoomed(true)}>{props.children}</a>
      </ControlledZoom>
    </div>
  );
};

const PortfolioViewGalleryNoSSR = dynamic(
  () => import("./PortfolioViewGallery"),
  {
    ssr: false,
  }
);

export default function Portfolio({ item }) {
  const router = useRouter();
  const uid = router.query.username?.toString();

  let measurementsIsError;
  const measurements =
    item?.elairoAlbum?.measurements?.extendedMeasurementData?.measurements;

  const labels = {
    height: "Height",
    hair_colour: "Hair colour",
    eye_colour: "Eye colour",
    bust: "Bust",
    waist: "Waist",
    hips: "Hips",
    dress: "Dress size",
    shoe: "Shoe",
    suit_jacket: "Suit jacket",
    neck: "Neck",
    inseam: "Inseam",
  };

  const thumbnailInAlbum = item?.elairoAlbum?.thumbnail;

  let thumbnailUrl;
  if (thumbnailInAlbum) {
    thumbnailUrl = thumbnailInAlbum.url;
  } else {
    // Use first item in album
    thumbnailUrl =
      item.elairoAlbum.album.extendedAlbumData.content[0].orderedFiles[0].url;
  }

  if (item) {
    return (
      <>
        <PortfolioHeader>
          <CoverPhotoWrapper>
            <Vignette />
            <Image
              src="/portfolio/8.jpg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </CoverPhotoWrapper>
          <HeaderContent>
            <MaxWidthContent>
              <ProfileImagePositioner>
                <ProfileImageWrapper>
                  <Image
                    src={thumbnailUrl}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </ProfileImageWrapper>
              </ProfileImagePositioner>
              <ProfileHeaderInfo>
                <NameHeaderWrapper>
                  <NameHeader>{item.portfolio.data.name[0].text}</NameHeader>
                </NameHeaderWrapper>
              </ProfileHeaderInfo>
            </MaxWidthContent>
          </HeaderContent>
        </PortfolioHeader>
        <MaxWidthContent>
          <PortfolioContent>
            <NameHeaderWrapper2>
              <NameHeader2>{item.portfolio.data.name[0].text}</NameHeader2>
            </NameHeaderWrapper2>
            <Measurements>
              <table>
                <tbody>
                  {measurements && !measurementsIsError ? (
                    <>
                      {measurements.map((measurement) => {
                        return (
                          <tr key={measurement.type}>
                            <td>{labels[measurement.type]}</td>
                            <td>{measurement.value}</td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </Measurements>
            <Images>
              {item.elairoAlbum.album.extendedAlbumData.content[0]
                .orderedFiles ? (
                <>
                  <PortfolioViewGalleryNoSSR
                    files={
                      item.elairoAlbum.album.extendedAlbumData.content[0]
                        .orderedFiles
                    }
                  />
                </>
              ) : (
                <span>Loading...</span>
              )}
            </Images>
          </PortfolioContent>
        </MaxWidthContent>
      </>
    );
  } else {
    return (
      <>
        <h1 className="font-bold text-3xl my-2">...</h1>
        <p>...</p>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const data = await Client().query([
    Prismic.Predicates.at("document.type", "portfolio"),
    Prismic.Predicates.fulltext("my.portfolio.uid", context.query.username[0]),
  ]);

  const portfolios = data.results.filter(
    (portfolio) => portfolio.uid === context.query.username[0]
  );

  if (portfolios.length === 0) {
    return {
      notFound: true,
    };
  }

  const sharingId = portfolios[0].data.elairo_album_sharing_id;
  const res = await fetch(`https://www.example.com`);
  const elairoData = await res.json();
  const portfolioWithElairoAlbum = {
    portfolio: portfolios[0],
    elairoAlbum: elairoData,
  };

  return {
    props: { item: portfolioWithElairoAlbum }, // will be passed to the page component as props
  };
}
