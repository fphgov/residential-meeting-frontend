module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    experimental: {
      images: {
        unoptimized: true,
      },
    },
  }
  return nextConfig
}
