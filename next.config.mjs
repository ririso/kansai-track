/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Temporarily ignore ESLint errors during builds due to deprecated options
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type checking during build process
    ignoreBuildErrors: false,
  },
};

export default nextConfig;