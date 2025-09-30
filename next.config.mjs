/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Temporarily disable ESLint during builds due to Next.js/ESLint integration issues
    // The standalone ESLint configuration works correctly with flat config
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type checking during build process
    ignoreBuildErrors: false,
  },
};

export default nextConfig;