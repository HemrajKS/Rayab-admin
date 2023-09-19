/** @type {import('next').NextConfig} */
const nextConfig = {
  runtime: 'edge',
  unstable_allowDynamic: [
    '/lib/utilities.js',
    '/node_modules/function-bind/**',
    '/src/app/constants/constants.js',
    '/node_modules/@mui/**',
  ],
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
