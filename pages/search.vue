<template>
  <div class="search-results">
    <Header />
    <div class="container">
      <h1>搜索结果: {{ searchQuery }}</h1>
      <div class="article-list">
        <ArticleCard v-for="article in searchResults" :key="article.id" :article="article" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  components: {
    Header: () => import('@/components/Header'),
    Footer: () => import('@/components/Footer'),
    ArticleCard: () => import('@/components/ArticleCard')
  },
  data() {
    return {
      searchQuery: '',
      searchResults: []
    };
  },
  async asyncData({ route }) {
    const searchQuery = route.query.q || '';
    // 实际项目中这里应该是API调用
    // 为了演示，我们使用模拟数据
    const articles = [
      {
        id: 1,
        title: 'Nuxt2入门教程',
        category: '前端开发',
        views: 1200,
        date: '2023-05-15'
      },
      {
        id: 2,
        title: 'Vuex状态管理最佳实践',
        category: '前端开发',
        views: 980,
        date: '2023-04-22'
      },
      {
        id: 3,
        title: 'Python数据分析基础',
        category: '数据科学',
        views: 850,
        date: '2023-03-18'
      }
    ];

    // 简单的搜索逻辑
    const searchResults = articles.filter(article => 
      article.title.includes(searchQuery) || article.category.includes(searchQuery)
    );

    return { searchQuery, searchResults };
  }
};
</script>

<style scoped>
.search-results {
  padding: 20px 0;
}

.article-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}
</style>