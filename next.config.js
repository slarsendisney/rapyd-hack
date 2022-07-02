/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RAPYD_SECRET: process.env.RAPYD_SECRET,
    RAPYD_ACCESS_KEY: process.env.RAPYD_ACCESS_KEY,
    RAPYD_EWALLET: process.env.RAPYD_EWALLET,
  },
};

module.exports = nextConfig;
