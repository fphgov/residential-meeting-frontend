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
      apiUrl: BACKEND_URL,
      apiQuestion: '/app/api/question/:id',
      apiQuestionAll: '/app/api/question/all',
      apiNavigation: '/app/api/question/navigation',
    },
    publicRuntimeConfig: {
      matomoUrl: MATOMO_URL,
      matomoSiteId: MATOMO_SITE_ID,
      publicHost: PUBLIC_HOST,
      siteKey: SITE_KEY,
      apiAuth: '/app/api/account/check',
      apiVote: '/app/api/vote',
      apiCheckDistrict: '/app/api/account/forgot/check',
      apiCheckToken: '/app/api/account/forgot/token',
      apiEmailRequest: '/app/api/account/forgot/first',
      apiImageSend: '/app/api/account/forgot/second'
    },
    experimental: {
      forceSwcTransforms: true,
    },
    async rewrites() {
      return [
        {
          source: "/app/api/:path*",
          destination: `${BACKEND_URL}/app/api/:path*`,
        },
      ];
    },
    async redirects() {
      return [
        {
          "source": "/",
          "destination": "/azonositas",
          "permanent": false
        }
      ]
    },
  }

  return nextConfig
}
