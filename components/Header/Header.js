import { useState } from "react";
import { useRouter } from "next/router";

import { Box } from "theme-ui";
import styled from "styled-components";
import { motion } from "framer-motion";

import Logo from "../Logo/Logo";
import Hamburger from "hamburger-react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";

import Link from "next/link";
import MaxWidthContent from "../MaxWidthContent/MaxWidthContent";

const Header = styled.header`
  height: 100px;
  background-color: #000;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HeaderInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 24px 0 24px;
`;

const SignInButton = styled.button`
  border: 1px solid white;
  color: white;
  border-radius: 1px;
  padding: 12px 24px;
  margin: 4px 0;
  margin-left: 32px;
  background-color: transparent;
  outline: none;
  font-family: inherit;
  text-transform: uppercase;
`;

const MenuWrapper = styled.div`
  display: none;
  width: 100%;

  @media (min-width: 1150px) {
    display: block;
  }
`;

const MenuIconWrapper = styled.div`
  position: absolute;
  right: 24px;
  top: 24px;
  z-index: 2000;

  @media (min-width: 1150px) {
    display: none;
  }
`;

export default function Layout({ children }) {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const [isOpen, setOpen] = useState(false);

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleOnNavigate = () => {
    setOpen(false);
  };

  return (
    <>
      <HamburgerMenu
        isOpen={isOpen}
        onClose={handleOnClose}
        onNavigate={handleOnNavigate}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2 } }}
      >
        <Header>
          <MaxWidthContent>
            <HeaderInnerWrapper>
              <Link href="/">
                <a>
                  <Logo isHome={isHome} />
                </a>
              </Link>
              <MenuWrapper>
                <Menu isHome />
              </MenuWrapper>
            </HeaderInnerWrapper>
          </MaxWidthContent>

          <MenuIconWrapper>
            <Hamburger
              direction="right"
              toggled={isOpen}
              toggle={setOpen}
              color="#FDFDFD"
              label="Show menu"
              rounded
            />
          </MenuIconWrapper>
        </Header>
      </motion.div>
    </>
  );
}
