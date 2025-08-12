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
        <h1>前端｜工程化</h1>
        <div class="top-bar">
          <button
            v-for="type in types"
            :key="type.value"
            :class="{ active: type.value === $route.params.type }"
            @click="switchType(type.value)"
          >
            {{ type.label }}
          </button>
        </div>

        <!-- 用nuxt-content渲染markdown -->
        <nuxt-content :document="article" />
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
        types: [
          { value: 'webpack', label: 'Webpack' }
        ],
        fileMap: {
          webpack: [
            { name: 'file1', title: '知识点归纳' },
            { name: 'file2', title: 'webpack5模块联邦' },
          ]
        },
        files: [],
        article: ''
    };
  },
  computed: {
    currentType() {
      return this.$route.params.type || 'webpack'
    },
    currentFile() {
      return this.$route.params.file || ''
    },
  },
  async asyncData({ $content, params }) {
    // 加载文章内容
    const article = await $content('engineering', params.type, params.file).fetch()
    return { article }
  },
  watch: {
    '$route.params.type': 'loadFileList',
  },
  methods: {
    loadFile(file) {
      this.$router.push(`/engineering/${this.currentType}/${file}`)
    },
    switchType(type) {
      this.$router.push(`/engineering/${type}/`)
    },
    async loadFileList() {
      // 根据当前type加载该目录下所有markdown文件的元信息
      const files = await this.$content('engineering', this.currentType)
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
};
</script>

<style scoped>
.top-bar {
  margin-bottom: 20px;
  text-align: left;
}

.top-bar button {
  background: #f0f0f0;
  border: none;
  padding: 8px 16px;
  margin: 10px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.3s ease;
}

.top-bar button:hover {
  background: #e0e0e0;
}

.top-bar button.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: bold;
}

.content-img {
  display: block;
  width: 80%;       /* 宽度 60% */
  /* 最大宽度限制 */
  height: auto;
  margin: 0 auto 24px 20px; /* 居中，底部留间距 */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.markdown-body {
  width: 80%;         /* 文字宽度和图片宽度一致 */
  margin: 0 auto 0 15px;
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
  padding: 0 30px 30px 30px;
  overflow-y: auto;
  line-height: 2;
}

.content h1,
.content h2,
.content h3 {
  color: #333;
  margin-top: 1.2em;
}
.content h1 {
  text-align: center;
  margin-top: 0.2em;
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
