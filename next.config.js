/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["res.cloudinary.com"], // Allow Cloudinary images
  },
  // experimental: { appDir: true },
};

module.exports = nextConfig;
