import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
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
