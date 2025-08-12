export default {
  mode: 'universal',
  target: 'static', // 设置为静态站点
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
    '~/assets/css/global.css'
  ],
  plugins: [],
  buildModules: [],
  generate: {
    routes: async () => {
      const fileMap = {
        js: ['file1', 'file2', 'file3', 'file4', 'file5'],
        es6: ['file1'],
        ts: ['file1'],
        handwritten: ['file1'],
        designPatterns: ['file1', 'file2']
      };

      const routes = [];

      // 添加语言页面路由
      Object.entries(fileMap).forEach(([type, files]) => {
        files.forEach(file => {
          routes.push(`/language/${type}/${file}`);
        });
      });

      return routes;
    },
    exclude: [/.*\.md$/]  // 排除所有 .md 文件
  },
  build: {
    transpile: ['marked']
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxt/content'
  ],
  axios: {
    // 这里配置你的 axios 选项，比如 baseURL
    baseURL: '/',  // 你的静态资源相对路径或绝对路径
  }
}
