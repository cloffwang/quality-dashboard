import type { NextConfig } from "next";

// Separate build/dev-cache directories per APP_ENV so a prod and a stage `next dev`
// process can run concurrently from the same source directory (Next.js otherwise refuses
// a second dev server per shared .next dir, regardless of port).
const nextConfig: NextConfig = {
  distDir: process.env.APP_ENV === "stage" ? ".next-stage" : ".next",
};

export default nextConfig;
