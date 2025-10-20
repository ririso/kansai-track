/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src', 'app'],
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Type checking during build process
    ignoreBuildErrors: false,
  },
};

export default nextConfig;