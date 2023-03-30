import { NextSeo } from 'next-seo'
import 'normalize.css/normalize.css'
import 'bootstrap-4-grid/css/grid.min.css'
import '../styles/globals.css'
import '../styles/main.css'

const MyApp = ({ Component, pageProps }) => {
  return <>
    <NextSeo
      title="Budapest Lakógyűlés"
      titleTemplate="Budapest Lakógyűlés"
      defaultTitle="Budapest Lakógyűlés"
      description=""
      canonical="https://lakogyules.budapest.hu/"
      openGraph={{
        url: "https://lakogyules.budapest.hu/",
        title: "Budapest Lakógyűlés",
        description: "",
        images: [
          {
            url: "/og-image.jpg",
            width: 800,
            height: 420,
            alt: "Budapest Lakógyűlés",
          },
        ],
      }}
    />

    <Component {...pageProps} />
  </>
}

export default MyApp
