// Update the path for your API client file.
import { Client } from "../../prismic";
import SliceZone from "next-slicezone";
import { useGetStaticProps } from "next-slicezone/hooks";
import styled from "styled-components";

// Update the path for your route resolver file.
import resolver from "../../sm-resolver";

const PageWrapper = styled.div`
  //padding: 16px 0;
`;

const Page = ({ slices }) => {
  return <SliceZone slices={slices} resolver={resolver} />;
};

// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  queryType: "single",
  type: "about",
});

export default Page;
