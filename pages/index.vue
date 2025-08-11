<template>
  <div class="home">
    <!-- 导航栏 -->
    <Header />

    <!-- 英雄区域 -->
    <section class="hero">
      <div class="container">
        <h1>我的个人知识库1</h1>
        <p>整理、存储和分享你的知识财富</p>
        <div class="search-box">
          <input type="text" placeholder="搜索知识..." v-model="searchQuery">
          <button @click="search">搜索</button>
        </div>
      </div>
    </section>

    <!-- 知识分类 -->
    <section class="categories">
      <div class="container">
        <h2>知识分类</h2>
        <div class="category-list">
          <div class="category-item" v-for="category in categories" :key="category.id">
            {{ category.name }}
          </div>
        </div>
      </div>
    </section>

    <!-- 热门文章 -->
    <section class="popular-articles">
      <div class="container">
        <h2>热门文章</h2>
        <div class="article-list">
          <ArticleCard v-for="article in popularArticles" :key="article.id" :article="article" />
        </div>
      </div>
    </section>

    <!-- 页脚 -->
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
      categories: [
        { id: 1, name: '前端开发' },
        { id: 2, name: '后端开发' },
        { id: 3, name: '人工智能' },
        { id: 4, name: '数据科学' }
      ],
      popularArticles: [
        { id: 1, title: 'Nuxt2入门教程', category: '前端开发', views: 1200, date: '2023-05-15' },
        { id: 2, title: 'Vuex状态管理最佳实践', category: '前端开发', views: 980, date: '2023-04-22' },
        { id: 3, title: 'Python数据分析基础', category: '数据科学', views: 850, date: '2023-03-18' }
      ]
    }
  },
  methods: {
    search() {
      // 搜索功能实现
      this.$router.push({ path: '/search', query: { q: this.searchQuery } });
    }
  }
}
</script>

<style scoped>
.hero {
  background-color: #f5f7fa;
  padding: 60px 0;
  text-align: center;
}

.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.search-box {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.search-box input {
  width: 400px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

.search-box button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.categories {
  padding: 40px 0;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.category-item {
  background-color: white;
  padding: 15px 25px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
}

.popular-articles {
  padding: 40px 0;
  background-color: #f9f9f9;
}

.article-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>