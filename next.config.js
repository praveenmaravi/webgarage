// next.config.js

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',

  images: {
    domains: ['images.unsplash.com', 'i.postimg.cc'], // update as needed
  },

  experimental: {
    serverActions: true, // Optional: for advanced server actions
  },

  webpack: (config, { isServer }) => {
    // Enable WebXR, 3D model loading, and custom shaders
    config.module.rules.push({
      test: /\.(glb|gltf|bin|fbx|obj|hdr|png|jpg|jpeg|svg|mp3|ogg|mp4|gif)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });

    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    return config;
  },
};

module.exports = nextConfig;
