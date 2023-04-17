import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />

          <meta httpEquiv="Cache-control" content="no-cache, no-store, must-revalidate" />
          <meta httpEquiv="Pragma" content="no-cache" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,500;0,700;0,800;1,400;1,700;1,800" rel="stylesheet" />

          <link rel="shortcut icon" href="/favicon.png" type="image/png" />

          <meta name="description" content="" />

          <meta property="og:type" content="website" />
          <meta name="og:title" content="Budapest Lakógyűlés" />
          <meta name="og:description" content="" />
          <meta name="og:image" content="https://lakogyules-szavazas.budapest.hu/image/og-image.jpg" />

          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />

          <meta name="application-name" content="Budapest Lakógyűlés" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Budapest Lakógyűlés" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
