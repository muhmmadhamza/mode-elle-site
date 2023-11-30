import styled from "styled-components";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import SectionHeadingArea from "../../components/SectionHeadingArea/SectionHeadingArea";

const Wrapper = styled.div`
  width: 100%;
  padding: 48px 24px 24px 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;

  .carousel {
    width: 100%;
  }
`;

const InstagramSectionHeadingArea = styled(SectionHeadingArea)`
  padding: 0 12px;
  margin-bottom: 20px;
`;

const InstagramGallerySlice = (props) => {
  return (
    <Wrapper>
      <MaxWidthContent>
        <InstagramSectionHeadingArea>
          <SectionHeading>{props.slice.primary.title[0].text}</SectionHeading>
        </InstagramSectionHeadingArea>
      </MaxWidthContent>
      <ImageGallery slides={props.slice.images} />
    </Wrapper>
  );
};

export default InstagramGallerySlice;
