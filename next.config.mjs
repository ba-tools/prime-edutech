/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'd11d37ctvyzgz5.cloudfront.net',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Fix for pdf-parse and canvas dependencies on Vercel
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        canvas: 'commonjs canvas',
      });
    }
    return config;
  },
};

export default nextConfig;
