import withSvgr from "next-plugin-svgr";

/** @type {import('next').NextConfig} */
const nextConfig = withSvgr({
	webpack(config, options) {
		return config;
	},
	images: {
		domains: ["r2.autotrack.work"],
	},
});

export default nextConfig;
