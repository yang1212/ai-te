const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'api.craiyon.com',
      },
      {
        protocol: 'https',
        hostname: 'apifyusercontent.com', // Apify可能使用的图片存储域名
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com', // Craiyon可能使用的图片存储域名
      },
      {
        protocol: 'https',
        hostname: 'aigc-files.bigmodel.cn',
        port: '',
        pathname: '/**', // 允许该域名下所有路径
      },
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        pathname: '/**', // 允许该域名下所有路径（可选，但建议加上）
      }
    ],
  },
};

export default nextConfig;
