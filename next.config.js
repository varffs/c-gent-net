const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: isProd ?  '/c-gent-net' : '',
  images: {
    unoptimized: true,
  },
  output: "export",
}

module.exports = nextConfig
