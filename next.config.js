/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      { hostname: 'www.gravatar.com' },
      { hostname: 'picsum.photos' },
      { hostname: 'images.clerk.dev' },
      { hostname: 'cdn.pixabay.com' },
      { hostname: 'images.pexels.com' },
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'hark-clone-local-bucket.s3.ca-central-1.amazonaws.com' },
    ],
  },
  reactStrictMode: true,
  experimental: {
    serverComponents: true,
  },
};
