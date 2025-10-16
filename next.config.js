/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is stable in Next.js 15, no experimental flag needed
  webpack: (config, { isServer }) => {
    // Handle Plotly.js server-side rendering issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        buffer: false,
      }
    }
    
    return config
  },
  output: 'standalone',
  env: {
    // This explicitly passes build-time env vars to Next.js
    MAGIC_LINK_SECRET: process.env.MAGIC_LINK_SECRET,
    POSTMARK_SERVER_TOKEN: process.env.POSTMARK_SERVER_TOKEN,
    POSTMARK_FROM_EMAIL: process.env.POSTMARK_FROM_EMAIL,
    POSTMARK_MAGIC_LINK_TEMPLATE_ID: process.env.POSTMARK_MAGIC_LINK_TEMPLATE_ID,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
}

module.exports = nextConfig