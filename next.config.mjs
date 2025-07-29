/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "winnowcore.blob.core.windows.net",
        port: "",
        pathname: "/files/**",
      },
    ],
  },
};

export default nextConfig;
