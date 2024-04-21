/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
    esmExternals: "loose",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack(config) {
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts"],
    };
    return config;
  },
};

export default nextConfig;
