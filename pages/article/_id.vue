<template>
  <div class="article-detail">
    <Header />
    <div class="container">
      <h1>{{ article.title }}</h1>
      <div class="article-meta">
        <span>分类：{{ article.category }}</span>
        <span>发布时间：{{ article.publishDate }}</span>
        <span>阅读：{{ article.views }}次</span>
      </div>
      <div class="article-content" v-html="article.content"></div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  components: {
    Header: () => import('@/components/Header'),
    Footer: () => import('@/components/Footer')
  },
  data() {
    return {
      article: {}
    };
  },
  async asyncData({ params }) {
    // 实际项目中这里应该是API调用
    // 为了演示，我们使用模拟数据
    const articles = [
      {
        id: 1,
        title: 'Nuxt2入门教程',
        category: '前端开发',
        publishDate: '2023-05-15',
        views: 1200,
        content: '<p>Nuxt.js是一个基于Vue.js的服务端渲染应用框架...</p>'
      },
      {
        id: 2,
        title: 'Vuex状态管理最佳实践',
        category: '前端开发',
        publishDate: '2023-04-22',
        views: 980,
        content: '<p>Vuex是Vue.js的官方状态管理模式...</p>'
      },
      {
        id: 3,
        title: 'Python数据分析基础',
        category: '数据科学',
        publishDate: '2023-03-18',
        views: 850,
        content: '<p>Python是数据科学领域最流行的编程语言之一...</p>'
      }
    ];

    const article = articles.find(a => a.id === parseInt(params.id));
    return { article };
  }
};
</script>

<style scoped>
.article-detail {
  padding: 20px 0;
}

.article-meta {
  display: flex;
  gap: 20px;
  margin: 15px 0;
  color: #666;
  font-size: 14px;
}

.article-content {
  margin-top: 20px;
  line-height: 1.6;
}
</style>