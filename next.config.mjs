/** @type {import('next').NextConfig} */
const nextConfig = {
  // Indicate that these packages should not be bundled by webpack
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
    scrollRestoration: true
  },
};

export default nextConfig;
