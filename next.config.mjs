/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
import path from "node:path";
import { fileURLToPath } from "node:url";
 
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        hostname: "mdzd5plynkqfzfvi.public.blob.vercel-storage.com",
      },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
