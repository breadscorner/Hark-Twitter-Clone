/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: [
      'www.gravatar.com', 
      'picsum.photos', 
      'images.clerk.dev', 
      'cdn.pixabay.com', 
      'images.pexels.com',
      'avatars.githubusercontent.com'  // Added new domain
    ],
  },
  reactStrictMode: true,
  experimental: {
    serverComponents: true,
  },
};
