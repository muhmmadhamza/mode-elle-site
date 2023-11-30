import styled from "styled-components";
import Link from "next/link";

const MenuWrapper = styled.nav`
  padding-left: 16px;
  float: right;
  height: 100%;
  display: flex;
  align-items: center;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 0;
`;

const MenuListItem = styled.li`
  margin-bottom: 3px;
`;

const MenuLink = styled.a`
  color: white;
  padding: 24px 16px;
  margin: 0 6px;
  letter-spacing: 2px;

  @media (min-width: 1300px) {
    padding: 24px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export default function Menu() {
  return (
    <MenuWrapper>
      <MenuList>
        <MenuListItem>
          <Link href="/">
            <MenuLink>Home</MenuLink>
          </Link>
        </MenuListItem>
        <MenuListItem>
          <Link href="/agency">
            <MenuLink>Agency</MenuLink>
          </Link>
        </MenuListItem>
        <MenuListItem>
          <Link href="/academy">
            <MenuLink>Academy</MenuLink>
          </Link>
        </MenuListItem>
        <MenuListItem>
          <Link href="/getting-started">
            <MenuLink>Getting started</MenuLink>
          </Link>
        </MenuListItem>
        <MenuListItem>
          <Link href="/contact">
            <MenuLink>Contact</MenuLink>
          </Link>
        </MenuListItem>
      </MenuList>
    </MenuWrapper>
  );
}
