<template>
  <div class="article-card">
    <h3>{{ article.title }}</h3>
    <div class="meta">
      <span class="category">{{ article.category }}</span>
      <span class="date">{{ article.date }}</span>
      <span class="views">{{ article.views }} 阅读</span>
    </div>
    <button @click="viewArticle">查看详情</button>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewArticle() {
      this.$router.push({ path: `/article/${this.article.id}` });
    }
  }
}
</script>

<style scoped>
.article-card {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  width: 300px;
}

.article-card h3 {
  margin-top: 0;
  font-size: 18px;
}

.meta {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 14px;
  color: #666;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}
</style>