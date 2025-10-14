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
}

module.exports = nextConfig