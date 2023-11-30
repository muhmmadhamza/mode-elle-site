import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import MaxWidthContent from "../MaxWidthContent/MaxWidthContent";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 32px 0;
`;

const InnerWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  max-width: 1500px; // 5 items
  justify-content: center;
`;

const ProfileImagePositioner = styled.div`
  display: flex;
  justify-content: center;
  z-index: 1000;
  align-self: center;
  background-color: #eae8e5;
`;

const ProfileImageWrapper = styled.div`
  width: 300px;
  height: 400px;
  position: relative;
  z-index: 1000;
  border: 7px solid white;
  border-radius: 1px;
`;

const PortfolioItem = styled.div`
  flex-direction: column;
`;

const Name = styled.div`
  text-align: center;
  padding-bottom: 4px;
`;

const PortfoliosGrid = ({ items }) => {
  if (!items) {
    return (
      <>
        <h1 className="font-bold text-3xl my-2">...</h1>
        <p>...</p>
      </>
    );
  } else {
    return (
      <MaxWidthContent>
        <Wrapper>
          <InnerWrapper>
            {items.map((item, i) => {
              const username = item.portfolio.uid ? item.portfolio.uid : "#";

              const thumbnailInAlbum = item?.elairoAlbum?.thumbnail;

              let thumbnailUrl;
              if (thumbnailInAlbum) {
                thumbnailUrl = thumbnailInAlbum.url;
              } else {
                // Use first item in album
                thumbnailUrl =
                  item.elairoAlbum.album.extendedAlbumData.content[0]
                    .orderedFiles[0].url;
              }

              return (
                <PortfolioItem key={username}>
                  <ProfileImagePositioner key={i}>
                    <ProfileImageWrapper>
                      <Link href={username ? `/portfolio/${username}` : "#"}>
                        <a>
                          <Image
                            src={thumbnailUrl}
                            alt={`Profile image of ${item.portfolio.data.name[0].text}`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </a>
                      </Link>
                    </ProfileImageWrapper>
                  </ProfileImagePositioner>
                  <Link href={username ? `/portfolio/${username}` : "#"}>
                    <a>
                      <Name>{item.portfolio.data.name[0].text}</Name>
                    </a>
                  </Link>
                </PortfolioItem>
              );
            })}
          </InnerWrapper>
        </Wrapper>
      </MaxWidthContent>
    );
  }
};
export default PortfoliosGrid;
