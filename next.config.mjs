/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV !== 'development' ? 'export' : undefined,
};
export default nextConfig;
