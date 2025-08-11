<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <h1>知识库</h1>
      </div>
      <nav class="nav">
        <ul>
          <li><a href="/">首页</a></li>
          <li><a href="/categories">分类</a></li>
          <li><a href="/about">关于</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 15px 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 24px;
  margin: 0;
  color: #42b983;
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav a:hover {
  color: #42b983;
}
</style>