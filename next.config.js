const withTM = require("next-transpile-modules")([
  "next-slicezone",
  "essential-slices",
]);
const withPrismicSitemap = require("@reecem/prismic-sitemap");

const linkResolver = (doc) => {
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

const API_ENDPOINT = "https://mode-elle.cdn.prismic.io/api/v2";
const SITE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.SITE_URL
    : process.env.VERCEL_ENV;

module.exports = withTM(
  withPrismicSitemap({
    images: {
      domains: ["mode-elle.ca", "images.prismic.io", "wp.mode-elle.ca"],
    },
    async redirects() {
      return [
        {
          source: "/hello-world",
          destination: "/",
          permanent: true,
        },
        {
          source: "/hello-world-2",
          destination: "/",
          permanent: true,
        }, // end of sitemap post-1
        {
          source: "/about-us",
          destination: "/about/team",
          permanent: true,
        },
        {
          source: "/founder",
          destination: "/about/founder",
          permanent: true,
        },
        {
          source: "/clients-2",
          destination: "/testimonials",
          permanent: true,
        },
        {
          source: "/reviews-testimonials",
          destination: "/testimonials",
          permanent: true,
        },
        {
          source: "/fashion-women",
          destination: "/agency/divisions/fashion-women",
          permanent: true,
        },
        {
          source: "/fashion-men",
          destination: "/agency/divisions/fashion-men",
          permanent: true,
        },
        {
          source: "/commercial-models-and-talent",
          destination: "/agency/divisions/commercial",
          permanent: true,
        },
        {
          source: "/kids",
          destination: "/agency/divisions/children",
          permanent: true,
        },
        {
          source: "/modelling",
          destination: "/development/modelling",
          permanent: true,
        },
        {
          source: "/anderson-talent-2",
          destination: "/",
          permanent: true,
        },
        {
          source: "/modelling-2",
          destination: "/development/modelling",
          permanent: true,
        },
        {
          source: "/acting",
          destination: "/development/acting",
          permanent: true,
        },
        {
          source: "/children",
          destination: "/development/children",
          permanent: true,
        },
        {
          source: "/photoshoots",
          destination: "/development/photoshoots",
          permanent: true,
        },
        {
          source: "/workshops",
          destination: "/development/workshops",
          permanent: true,
        },
        {
          source: "/model-talent-search",
          destination: "/apply",
          permanent: true,
        },
        {
          source: "/faq",
          destination: "/articles",
          permanent: true,
        },
        {
          source: "/apply-models-and-talent",
          destination: "/apply",
          permanent: true,
        },
        {
          source: "/covers-campaigns",
          destination: "/news",
          permanent: true,
        },
        {
          source: "/supermodel-liisa-winker",
          destination: "/blog?tag=liisa-winkler",
          permanent: true,
        },
        {
          source: "/womens-fashion",
          destination: "/agency/divisions/fashion-women",
          permanent: true,
        },
        {
          source: "/mens-fashion",
          destination: "/agency/divisions/fashion-men",
          permanent: true,
        },
        {
          source: "/success-stories",
          destination: "/news",
          permanent: true,
        },
        {
          source: "/heading-generator-test",
          destination: "/",
          permanent: true,
        },
        {
          source: "/testing-banner",
          destination: "/",
          permanent: true,
        },
        {
          source: "/justified-image-grid-gallery",
          destination: "/",
          permanent: true,
        },
        {
          source: "/self-tape-submissions",
          destination: "/",
          permanent: true,
        },
        {
          source: "/talent-lifestyle",
          destination: "/agency/divisions/talent-lifestyle",
          permanent: true,
        },
        {
          source: "/success_stories/:slug",
          destination: "/news/:slug",
          permanent: true,
        },
        {
          source: "/category/uncategorized/",
          destination: "/news",
          permanent: true,
        },
      ];
    },
    sitemap: {
      linkResolver: linkResolver,
      apiEndpoint: API_ENDPOINT,
      hostname: "https://www.mode-elle.ca",
      optionsMapPerDocumentType: {
        // setting the update date of the article.
        article: (document) => {
          return {
            // get the last time the document was published in Prismic
            lastmod: document.last_publication_date,
            changefreq: "weekly",
            priority: 0.8,
          };
        },
        content_page: { changefreq: "monthly", priority: 1 },
      },
      documentTypes: ["content_page", "about", "news_overview", "article"],
    },
  })
);
