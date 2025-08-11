// nuxt.config.js
module.exports = {
  mode: 'universal',
  generate: {
    routes: async () => {
      // 你可以从接口拿数据，也可以从本地json拿
      // 这里用本地模拟的数据结构
      const fileMap = {
        js: ['file1', 'file2', 'file3', 'file4', 'file5'],
        es6: ['file1'],
        ts: ['file1'],
        handwritten: ['file1'],
        designPatterns: ['file1', 'file2']
      };

      const routes = [];

      Object.entries(fileMap).forEach(([type, files]) => {
        files.forEach(file => {
          routes.push(`/language/${type}/${file}`);
        });
      });

      return routes;
    }
  },
  head: {
    title: '个人知识库',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '个人知识库系统' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    '~/assets/css/global.css'
  ],
  plugins: [],
  buildModules: [],
  modules: [
    '@nuxtjs/axios'
  ],
  build: {
    transpile: ['marked']
  },
  axios: {
    // 配置你的 baseURL，确保静态生成时能正确拉取 markdown 文件
    baseURL: 'http://localhost:3000' // 根据你的开发环境调整
  }
}