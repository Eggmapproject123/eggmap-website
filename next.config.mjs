const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "eggmapmobile.com" }],
        destination: "https://www.eggmapmobile.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
