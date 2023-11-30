import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

import { usePortfolios } from "../../lib/swr-hooks";
import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";

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

const PortfoliosSlice = ({ slice }) => {
  const { data } = usePortfolios(slice.primary.divisionName);
  const portfolios = data && data[0] ? data : false;

  if (!portfolios) {
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
            {portfolios.map((user, i) => {
              const username = user.portfolio_username
                ? user.portfolio_username
                : "#";

              return (
                <PortfolioItem>
                  <ProfileImagePositioner key={i}>
                    <ProfileImageWrapper>
                      <Link href={username ? `/portfolio/${username}` : "#"}>
                        <a>
                          <Image
                            src={user.large_img}
                            alt={`Profile image of ${user.first_name} ${user.last_name}`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </a>
                      </Link>
                    </ProfileImageWrapper>
                  </ProfileImagePositioner>
                  <Link href={username ? `/portfolio/${username}` : "#"}>
                    <a>
                      <Name>
                        {user.first_name} {user.last_name}
                      </Name>
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
export default PortfoliosSlice;
