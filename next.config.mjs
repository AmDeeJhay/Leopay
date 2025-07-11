/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Disable service worker in development
  swcMinify: true,
  poweredByHeader: false,
  // Ensure proper static generation
  output: 'standalone',
}

export default nextConfig
