const { BACKEND_URL, PUBLIC_HOST, MATOMO_URL, MATOMO_SITE_ID, SITE_KEY } = process.env

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    poweredByHeader: false,
    images: {
      unoptimized: true,
    },
    serverRuntimeConfig: {
    },
    publicRuntimeConfig: {
      matomoUrl: MATOMO_URL,
      matomoSiteId: MATOMO_SITE_ID,
      publicHost: PUBLIC_HOST,
      siteKey: SITE_KEY,
      apiUrl: BACKEND_URL,
      apiAuth: '/auth',
    },
    experimental: {
      forceSwcTransforms: true,
    },
  }

  return nextConfig
}
