/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        REACT_APP_1INCH_PROXY_URL: process.env["1INCH_PROXY_URL"],
        REACT_APP_API_KEY_1INCH: process.env.API_KEY_1INCH
    },
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: 'https://api.1inch.dev/:path*',
            },
        ]
    },
};

export default nextConfig;
