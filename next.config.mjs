/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "mdzd5plynkqfzfvi.public.blob.vercel-storage.com",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
