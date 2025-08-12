// 首先在文件顶部导入必要的模块
import fs from 'fs';
import path from 'path';

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
      const routes = [];

      // 处理 language 路由
      const languageTypes = ['js', 'es6', 'ts', 'handwritten', 'designPatterns'];
      languageTypes.forEach(type => {
        const files = fs.readdirSync(path.join(__dirname, 'content', 'language', type))
          .filter(file => file.endsWith('.md'))
          .map(file => file.replace('.md', ''));

        files.forEach(file => {
          routes.push(`/language/${type}/${file}`);
        });
      });

      // 处理 framework 路由
      const frameworkTypes = ['react', 'rn', 'vue2', 'vue3', 'css', 'program'];
      frameworkTypes.forEach(type => {
        const files = fs.readdirSync(path.join(__dirname, 'content', 'framework', type))
          .filter(file => file.endsWith('.md'))
          .map(file => file.replace('.md', ''));

        files.forEach(file => {
          routes.push(`/framework/${type}/${file}`);
        });
      });

      // 处理 engineering 路由
      const engineeringTypes = ['webpack'];
      engineeringTypes.forEach(type => {
        const files = fs.readdirSync(path.join(__dirname, 'content', 'engineering', type))
          .filter(file => file.endsWith('.md'))
          .map(file => file.replace('.md', ''));

        files.forEach(file => {
          routes.push(`/engineering/${type}/${file}`);
        });
      });

      // 处理 mix 路由
      const mixTypes = ['network', 'seo', 'other'];
      mixTypes.forEach(type => {
        const files = fs.readdirSync(path.join(__dirname, 'content', 'mix', type))
          .filter(file => file.endsWith('.md'))
          .map(file => file.replace('.md', ''));

        files.forEach(file => {
          routes.push(`/mix/${type}/${file}`);
        });
      });

      // 处理 tools 路由
      const toolsTypes = ['program'];
      toolsTypes.forEach(type => {
        const files = fs.readdirSync(path.join(__dirname, 'content', 'tools', type))
          .filter(file => file.endsWith('.md'))
          .map(file => file.replace('.md', ''));

        files.forEach(file => {
          routes.push(`/tools/${type}/${file}`);
        });
      });

      // 处理 psychology 路由
      const psychologyFiles = fs.readdirSync(path.join(__dirname, 'content', 'psychology'))
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''));
      
      psychologyFiles.forEach(file => {
        routes.push(`/psychology/default/${file}`);
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
