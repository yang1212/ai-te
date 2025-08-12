<template>
  <div>
    <NavBar/>
    <div class="container">
      <aside class="sidebar">
        <ul>
          <li
            v-for="file in files"
            :key="file.slug"
            :class="{ active: file.slug === $route.params.file }"
            @click="loadFile(file.slug)"
          >
            {{ file.title }}
          </li>
        </ul>
      </aside>

      <div class="content">
        <img src="@/assets/bg1.png" alt="Psychology" class="content-img" />
        <!-- <div class="top-bar">
          <button
            v-for="type in types"
            :key="type.value"
            :class="{ active: type.value === $route.params.type }"
            @click="switchType(type.value)"
          >
            {{ type.label }}
          </button>
        </div> -->

        <!-- 用nuxt-content渲染markdown -->
        <nuxt-content :document="article" class="markdown-body"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    NavBar: () => import('@/components/NavBar'),
  },
  data() {
    return {
      files: [
        { name: 'file1.md', title: '坚持不了，或许是没搞懂自己的节奏。' },
        { name: 'file2.md', title: '当一切都不确定，唯一确定的是什么?' },
        { name: 'file3.md', title: '我已经慢慢来了，但还要等多久？' },
        { name: 'file4.md', title: '明明在做放松的事，为什么越做越焦虑？' },  
        { name: 'file5.md', title: '要不要的时候，选‘要’还是‘不要’？' },
        { name: 'file6.md', title: '痛苦不是敌人，它只是你身体发出的信号' },
        { name: 'file7.md', title: '读书能解决焦虑吗？' },
        { name: 'file8.md', title: '相比陌生人，为什么在熟人面前反而更拘束？' },
        { name: 'file9.md', title: '为什么平静才能生出智慧？' },
        { name: 'file10.md', title: '我到底是不喜欢，还是只是还没适应？' }    
      ],
      files: [],
      article: '',
      types: [{ value: 'default', label: '心理学' }]
    }
  },
  computed: {
    currentType() {
      return this.$route.params.type || 'default'
    },
    currentFile() {
      return this.$route.params.file || ''
    },
  },
  async asyncData({ $content, params }) {
    // 加载文章内容
    // 注意：由于psychology目录下没有子目录，我们直接从psychology目录加载文件
    const article = await $content('psychology', params.file).fetch()
    return { article }
  },
  watch: {
    '$route.params.type': 'loadFileList',
  },
  methods: {
    loadFile(file) {
      this.$router.push(`/psychology/${this.currentType}/${file}`)
    },
    switchType(type) {
      this.$router.push(`/psychology/${type}/`)
    },
    async loadFileList() {
      // 根据当前type加载该目录下所有markdown文件的元信息
      // 注意：由于psychology目录下没有子目录，我们直接从psychology目录加载文件
      const files = await this.$content('psychology')
        .only(['title', 'slug'])
        .sortBy('slug', 'asc')
        .fetch()
      this.files = files
      // 如果当前路由没有文件参数，默认跳转第一个
      if (!this.currentFile && files.length > 0) {
        this.loadFile(files[0].slug)
      }
    }
  },
  mounted() {
    this.loadFileList()
  }
}
</script>


<style scoped>
.content-img {
  display: block;
  width: 55%;       /* 宽度 60% */
  /* 最大宽度限制 */
  height: auto;
  margin: 0 auto 24px auto; /* 居中，底部留间距 */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.markdown-body {
  width: 55%;         /* 文字宽度和图片宽度一致 */
  margin: 0 auto;     /* 居中 */
  box-sizing: border-box;
  line-height: 1.7;
  color: #444;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 2em;        /* 增大标题上间距，段落感更强 */
  margin-bottom: 0.8em;
  font-weight: bold;
  line-height: 1.3;
  color: #222;
}

.markdown-body ul,
.markdown-body ol {
  margin-top: 1.2em;
  margin-bottom: 1.5em;
  padding-left: 1.8em;
  color: #444;
}

.markdown-body blockquote {
  margin: 1.5em 0;
  padding-left: 1em;
  border-left: 4px solid #ddd;
  color: #666;
  font-style: italic;
}

.markdown-body pre {
  margin: 1.5em 0;
  background: #f6f8fa;
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
}

.container {
  display: flex;
  height: 100vh;
  font-family: 'Helvetica Neue', sans-serif;
}

.sidebar {
  width: 220px;
  background: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  padding: 20px 10px;
  box-sizing: border-box;
  overflow-y: auto;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 10px 16px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.sidebar li:hover {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color:#fff;
;
}

.sidebar li.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color:#fff;
;
  font-weight: bold;
}

.content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  line-height: 2;
}

.content h1,
.content h2,
.content h3 {
  color: #333;
  margin-top: 1.2em;
}

.content p {
  color: #555;
  margin-bottom: 1em;
}


@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px;
  }

  .sidebar ul {
    display: flex;
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .sidebar li {
    flex-shrink: 0;
    white-space: nowrap;
    margin: 0 8px 0 0;
    background: #fff;
    border: 1px solid #ddd;
  }

  .sidebar li.active {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
  }

  .content {
    padding: 16px;
  }

  .top-bar {
    flex-wrap: wrap;
  }

  .top-bar button {
    margin: 6px 4px;
    font-size: 14px;
    padding: 6px 12px;
  }

  .markdown-body,
  .content-img {
    width: 100%;
  }
}
</style>
