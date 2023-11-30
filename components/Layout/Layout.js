import styled from "styled-components";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Content = styled.main`
  display: flex;
  flex: 1;
  align-items: center;
  position: relative;
  flex-direction: column;
`;

export default function Layout({ children, footerMenu }) {
  return (
    <LayoutWrapper>
      <Header />
      <Content>{children}</Content>
      <Footer footerMenu={footerMenu}></Footer>
    </LayoutWrapper>
  );
}
