/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/token-api/:path*',
        destination: `${process.env.NEXT_PUBLIC_1INCH_BASE_URL}/token/v1.2/:path*`,
      },
      {
        source: '/price-api/:path*',
        destination: `${process.env.NEXT_PUBLIC_1INCH_BASE_URL}/price/v1.1/:path*`,
      },
      {
        source: '/quoter-api/:path*',
        destination: `${process.env.NEXT_PUBLIC_1INCH_BASE_URL}/fusion/quoter/v1.0/:path*`,
      }
    ];
  }
};;

export default nextConfig;
