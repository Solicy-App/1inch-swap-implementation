const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/1inch.dev/:path*',
        destination: 'https://api.1inch.dev/:path*',
      },
    ];
  }
};

export default nextConfig;