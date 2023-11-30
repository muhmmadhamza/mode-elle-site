import React from 'react';
import { NextSeo } from 'next-seo';

const SeoInformationSlice = ({ slice }) => (
  <>
    <NextSeo
      title={slice.primary.titleTag}
      description={slice.primary.metaDescription}
    />
  </>
);

export default SeoInformationSlice;
