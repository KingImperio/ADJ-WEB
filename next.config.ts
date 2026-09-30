import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /* Legacy slugs with no Stitch screen. GCE is an O-level exam, so it
         lands on the merged WAEC & NECO page; tutorials lands on the index. */
      { source: "/programs/gce", destination: "/programs/waec", permanent: true },
      { source: "/programs/tutorials", destination: "/programs", permanent: true },
    ];
  },
};

export default nextConfig;
