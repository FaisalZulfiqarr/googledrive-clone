/** @type {import('next').NextConfig} */
const nextConfig = {
    staticPageGenerationTimeout: 60,
    experimental: {
      serverActions: true,
    },
  };

export default nextConfig;
