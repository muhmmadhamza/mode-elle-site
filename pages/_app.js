
import '../styles/global.css';
import NextApp from 'next/app'
import { ThemeProvider, BaseStyles } from 'theme-ui'
import { DefaultSeo } from 'next-seo';
import Prismic from "@prismicio/client";

import SEO from '../next-seo.config';

import Layout from '../components/Layout/Layout'
import theme from '../styles/theme'

const apiEndpoint = "https://mode-elle.cdn.prismic.io/api/v2";
const client = Prismic.client(apiEndpoint);

export default class App extends NextApp {
  static async getInitialProps(appCtx) {
    const footerMenu = (await client.getSingle("footer_menu")) || {};
    return {
      props: {
        footerMenu: footerMenu
      },
    };
  }

  render() {
    const { Component, pageProps, props } = this.props
    return (
        <ThemeProvider theme={theme}>
          <BaseStyles>
            <Layout footerMenu={props.footerMenu}>
                <DefaultSeo {...SEO} />
                <Component {...pageProps} />
            </Layout>
          </BaseStyles>
        </ThemeProvider>
      
    )
  }
}