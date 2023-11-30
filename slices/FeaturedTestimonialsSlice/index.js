import styled from "styled-components";
import Masonry from "react-masonry-css";
import { RichText } from "prismic-reactjs";

import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";
import SectionHeadingArea from "../../components/SectionHeadingArea/SectionHeadingArea";
import SectionHeading from "../../components/SectionHeading/SectionHeading";

const Wrapper = styled.div`
  width: 100%;
  margin: 36px 24px 12px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .masonry-grid {
    width: 100%;
    display: flex;
    margin-left: -32px; /* gutter size offset */
  }
  .masonry-grid_column {
    padding-left: 32px; /* gutter size */
    background-clip: padding-box;
  }

  /* Style your items */
  .masonry-grid_column > div {
    /* change div to reference your elements you put in <Masonry> */

    margin-bottom: 32px;
  }
`;

const Testimonial = styled.div`
  width: 100%;
  margin-bottom: 12px;
  box-shadow: hsl(36deg 4% 96%) 0px 1px 15px 0px,
    hsl(36deg 4% 70%) 0px 1px 2px 0px;
  background-color: #fff;
  padding: 32px;
  font-size: 15.5px;
  line-height: 24px;

  p {
    margin: 16px 0;
  }
`;

const Author = styled.p`
  font-size: 15.5px;
  font-style: italic;
  color: hsl(30deg 2% 40%);
`;

const FeaturedTestimonialsSectionHeadingArea = styled(SectionHeadingArea)`
  padding: 0 12px;
  margin-bottom: 20px;
`;

const FeaturedTestimonialsSlice = ({ slice }) => {
  const templates = new Array(11).fill().map((item) => {
    const randomHeight = Math.random() * (400 - 100) + 100;

    return {
      height: randomHeight,
    };
  });

  return (
    <MaxWidthContent>
      <Wrapper>
        <FeaturedTestimonialsSectionHeadingArea>
          <SectionHeading>Testimonials</SectionHeading>
        </FeaturedTestimonialsSectionHeadingArea>
        <Masonry
          breakpointCols={{ default: 3, 767: 1 }}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {slice.testimonials.map((testimonial, index) => (
            <Testimonial key={index}>
              <RichText render={testimonial.data.text} />

              <Author>
                {testimonial.data.name}, {testimonial.data.role}
              </Author>
            </Testimonial>
          ))}
        </Masonry>
      </Wrapper>
    </MaxWidthContent>
  );
};

export default FeaturedTestimonialsSlice;
