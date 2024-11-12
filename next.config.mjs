/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: { // This needed if you usd external source of images
        domains: ['i.ibb.co'],
    },
};

export default nextConfig;
