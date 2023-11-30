// Example 〜/pages/[uid].js file
import { useRouter } from "next/router";
import Prismic from "@prismicio/client";
import SliceZone from "next-slicezone";
import { useGetStaticProps, useGetStaticPaths } from "next-slicezone/hooks";

// Update the paths for your component files.
import resolver from "../sm-resolver";

import styled from "styled-components";

const PageTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 16px 16px 0 15px;

  @media (min-width: 1000px) {
    margin-left: 0;
  }
`;

/*
 * What is the req option? When initializing your API in server-side apps, we
 * recommend that you pass the req object as an option to Prismic.client().
 * This assigns a cookie to the req object, which enables Prismic to offer
 * powerful functionalities, like unlimited different preview sessions. You can
 * omit the req parameter if you're performing your queries client-side (eg:
 * React, Vue).
 */

import { Client } from "../prismic";
import MaxWidthContent from "../components/MaxWidthContent/MaxWidthContent";

const Page = (props) => {
  const slices = props.data.body.concat(props.data.body1);

  return (
    <>
      {props.data?.page_title[0]?.text ? (
        <MaxWidthContent maxWidth={960}>
          <PageTitleWrapper>
            {props.data.page_title.length !== 0 && (
              <h1>{props.data.page_title[0].text}</h1>
            )}
          </PageTitleWrapper>
        </MaxWidthContent>
      ) : (
        <></>
      )}
      <SliceZone slices={slices} resolver={resolver} />
    </>
  );
};

// Fetch content from prismic
export async function getStaticProps({ params }) {
  const uid = params.path.join("_");
  const document = await Client().getByUID("content_page", uid);

  return {
    props: document,
  };
}

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: "content_page",
  formatPath: (prismicDocument) => {
    const path = prismicDocument.uid.split("_");

    return {
      params: {
        path: path,
      },
    };
  },
});

export default Page;
