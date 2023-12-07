module.exports = {
  reactStrictMode: true, // react <React.StrictMode>
  swcMinify: true, // like Terser
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'buidlin-images.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
