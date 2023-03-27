import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const client = `${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`;

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-BCYELK2NQ3"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BCYELK2NQ3', {
          page_path: window.location.pathname,});`,
          }}
        />

        {/* meta description */}
        <meta
          name="description"
          content="Talkstocklive is a platform for traders and investors to chat, vote, and exchange information about USA stock markets."
        />

        {/* meta keywords */}
        <meta name="keywords" content="" />

        {/* Google Adsense */}
        {/* <scrip
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
          crossOrigin="anonymous"
        /> */}

        {/* font tags */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
