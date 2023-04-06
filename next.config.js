const { BACKEND_URL, MATOMO_URL, MATOMO_SITE_ID } = process.env

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
      apiUrl: BACKEND_URL,
    },
    publicRuntimeConfig: {
      matomoUrl: MATOMO_URL,
      matomoSiteId: MATOMO_SITE_ID,
    },
    experimental: {
      forceSwcTransforms: true,
    },
  }

  return nextConfig
}
