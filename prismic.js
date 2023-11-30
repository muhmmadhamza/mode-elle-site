/** Example file */

import Prismic from "@prismicio/client";
import Link from "next/link";

import smConfig from "./sm.json";

export const apiEndpoint = smConfig.apiEndpoint;

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = "";

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (!doc.uid || doc.isBroken) {
    return "/not-found";
  }

  if (doc.type === "post") {
    return `/blog/${doc.uid}`;
  }

  const uid = doc.uid;
  const path = uid.replace(/_/g, "/");

  return "/" + path;
};

// Additional helper function for Next/Link components
export const hrefResolver = (doc) => {
  if (doc.type === "post") {
    return "/blog/[uid]";
  }
};

export const customLink = (type, element, content, children, index) => (
  <Link
    key={index}
    href={hrefResolver(element.data)}
    as={linkResolver(element.data)}
  >
    <a>{content}</a>
  </Link>
);

export const Router = {
  routes: [{ type: "content_page", path: "/:uid" }],

  href: (type) => {
    const route = Router.routes.find((r) => r.type === type);
    return route && route.href;
  },
};

export const Client = (req = null, options = {}) => {
  const reqOption = req ? { req } : {};
  const apiOptions = Object.assign(
    { routes: Router.routes },
    reqOption,
    options
  );
  return Prismic.client(apiEndpoint, apiOptions);
};
