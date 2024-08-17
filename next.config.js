const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: isProd ?  '/c-gent-net' : '',
  assetPrefix: isProd ? '/c-gent-net/' : '',
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
