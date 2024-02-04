/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "mdzd5plynkqfzfvi.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
