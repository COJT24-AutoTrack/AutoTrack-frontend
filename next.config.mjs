import withSvgr from 'next-plugin-svgr';

/** @type {import('next').NextConfig} */
const nextConfig = withSvgr({
  webpack(config, options) {
    return config;
  },
});

export default nextConfig;
