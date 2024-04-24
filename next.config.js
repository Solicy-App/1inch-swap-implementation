/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
    domains: [
      'tokens.1inch.io',
      'assets.coingecko.com',
      'raw.githubusercontent.com',
      'zapper.fi',
      'snowtrace.io',
      'etherscan.io'
      // Should be added
      ],
  },
};

module.exports = nextConfig;
