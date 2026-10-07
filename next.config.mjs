/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/model-katalogu',
        destination: '/projeler',
      },
      {
        source: '/fiyat-listesi',
        destination: '/ciftlik-fiyatlari',
      },
    ];
  },
};

export default nextConfig;
