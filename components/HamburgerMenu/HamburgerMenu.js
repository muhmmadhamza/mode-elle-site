import { stack as Menu } from "react-burger-menu";
import styled from "styled-components";
import Router from "next/router";

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "36px",
    top: "36px",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    overflowY: "hidden",
  },
  bmMenu: {
    background: "#000",
    padding: "4.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#fff",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
    width: "100%",
    padding: "0.45em 0",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

const handler = (href, onNavigate) => {
  Router.push(href);
  onNavigate();
};

const Link = ({ className, onNavigate, children, href, ...rest } = {}) => (
  <a onClick={() => handler(href, onNavigate)} className={className} {...rest}>
    {children}
  </a>
);

export default function HamburgerMenu(props) {
  return (
    <nav>
      <Menu
        styles={styles}
        right
        customBurgerIcon={false}
        customCrossIcon={false}
        disableAutoFocus={true}
        {...props}
      >
        <Link href="/" className="menu-item" onNavigate={props.onNavigate}>
          Home
        </Link>
        <Link
          href="/agency"
          className="menu-item"
          onNavigate={props.onNavigate}
        >
          Agency
        </Link>
        <Link
          href="/academy"
          className="menu-item"
          onNavigate={props.onNavigate}
        >
          Academy
        </Link>
        <Link
          href="/getting-started"
          className="menu-item"
          onNavigate={props.onNavigate}
        >
          Getting started
        </Link>
        <Link
          href="/contact"
          className="menu-item"
          onNavigate={props.onNavigate}
        >
          Contact
        </Link>
      </Menu>
    </nav>
  );
}
