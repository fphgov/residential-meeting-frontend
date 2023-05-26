import { useState } from 'react'
import { NextSeo } from 'next-seo'
import store from '../src/lib/store'
import 'normalize.css/normalize.css'
import 'bootstrap-4-grid/css/grid.min.css'
import StoreContext from '../src/StoreContext'
import '../styles/globals.css'
import '../styles/main.css'
import CookieConsentPopup from '../src/component/CookieConsentPopup'

const MyApp = ({ Component, pageProps }) => {
  const [ state, setState ] = useState({
    storeGet: (contextName) => {
      if (typeof window === 'undefined') return

      return typeof store.get(contextName) !== 'undefined' ? store.get(contextName) : null
    },
    storeSave: (contextName, key, value) => {
      if (typeof window === 'undefined') return

      store.set(contextName, { ...store.get(contextName), [key]: value })

      setState({ ...state, [key]: value })
    },
    storeRemove: (contextName) => {
      if (typeof window === 'undefined') return

      store.remove(contextName)
    }
  })

  return <>
    <NextSeo
      title="Budapesti Lakógyűlés szavazás"
      titleTemplate="Budapesti Lakógyűlés szavazás"
      defaultTitle="Budapesti Lakógyűlés szavazás"
      description=""
      canonical="https://lakogyules-szavazas.budapest.hu/"
      openGraph={{
        url: "https://lakogyules-szavazas.budapest.hu/",
        title: "Budapesti Lakógyűlés szavazás",
        description: "",
        images: [
          {
            url: "/og-image.jpg",
            width: 800,
            height: 420,
            alt: "Budapesti Lakógyűlés szavazás",
          },
        ],
      }}
    />

    <CookieConsentPopup domain="lakogyules-szavazas.budapest.hu" />

    <StoreContext.Provider value={state}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  </>
}

export default MyApp
