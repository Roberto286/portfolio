/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV !== 'development' ? 'standalone' : undefined,
};
export default nextConfig;
