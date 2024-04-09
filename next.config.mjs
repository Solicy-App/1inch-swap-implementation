/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["tokens.1inch.io", "assets.coingecko.com"],
  },
  publicRuntimeConfig: {
    API_KEY_1INCH: process.env.API_KEY_1INCH,
    PROXY_URL_1INCH: process.env.PROXY_URL_1INCH,
    BASE_URL_1INCH: process.env.BASE_URL_1INCH,
  },
};

export default nextConfig;
