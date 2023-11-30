import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 16px;
  background-color: white;
  box-shadow: hsl(36deg 4% 96%) 0px 1px 15px 0px,
    hsl(36deg 4% 70%) 0px 1px 2px 0px;
  margin: 64px 0;

  @media screen and (min-width: 1000px) {
    padding: 64px;
  }

  h2 {
    padding: 16px calc(32px - 2px);
    margin: 8px;
    font-size: 32px !important;
  }
`;

export default FormWrapper;
