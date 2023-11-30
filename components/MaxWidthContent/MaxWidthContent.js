import styled from "styled-components";

const Wrapper = styled.div`
  max-width: ${(props) => props.maxWidth}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default function MaxWidthContent(props) {
  return (
    <Wrapper className="max-width-content" maxWidth={props.maxWidth || 1536}>
      {props.children}
    </Wrapper>
  );
}
