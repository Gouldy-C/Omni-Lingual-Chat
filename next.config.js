/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    experimental: {
      webpackBuildWorker: true,
      },
    remotePatterns:[
      {
        protocol: 'https',
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: 'https',
        hostname: "github.com",
      },
    ]
  }
}

module.exports = nextConfig
