/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeCss: false,
  enableBabelRuntime: true,
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
