/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
