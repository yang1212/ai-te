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
        <h1>前端｜语言</h1>
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
        { value: 'js', label: 'JS', text: 'JavaScript' },
        { value: 'es6', label: 'ES6', text: 'ES6+' },
        { value: 'ts', label: 'TS', text: 'TypeScript' },
        { value: 'handwritten', label: '手写系列', text: '手写代码' },
        { value: 'designPatterns', label: '设计模式', text: '设计模式' }
      ],
      fileMap: {
        js: [
          { name: 'file1', title: '知识点归纳' },
          { name: 'file2', title: '数组方法汇总' },
          { name: 'file3', title: '前端正则' },
          { name: 'file4', title: '精度丢失' },
          { name: 'file5', title: '宏任务、微任务' }
        ],
        es6: [
          { name: 'file1', title: '知识点归纳' },
        ],
        ts: [
          { name: 'file1', title: '知识点归纳' },
        ],
        handwritten: [
          { name: 'file1', title: '知识点归纳' },
        ],
        designPatterns: [
          { name: 'file1', title: '知识点归纳' },
          { name: 'file2', title: '常见前端设计模式' },
        ]
      },
      files: [],
      article: ''
    }
  },
  computed: {
    currentType() {
      return this.$route.params.type || 'js'
    },
    currentFile() {
      return this.$route.params.file || ''
    },
  },
  async asyncData({ $content, params }) {
    // 加载文章内容
    const article = await $content('language', params.type, params.file).fetch()
    return { article }
  },
  watch: {
    '$route.params.type': 'loadFileList',
  },
  methods: {
    loadFile(file) {
      this.$router.push(`/language/${this.currentType}/${file}`)
    },
    switchType(type) {
      this.$router.push(`/language/${type}/`)
    },
    async loadFileList() {
      // 根据当前type加载该目录下所有markdown文件的元信息
      const files = await this.$content('language', this.currentType)
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
  color: #fff;
}

.sidebar li.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  font-weight: bold;
}

.content {
  flex: 1;
  padding: 0 30px 30px 30px;
  overflow-y: auto;
  line-height: 2;
}

.content h1 {
  text-align: center;
  margin-top: 0.2em;
  color: #333;
}

.top-bar {
  margin-bottom: 20px;
  text-align: left;
  margin-left: 25px;
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

.markdown-body {
  width: 80%;
  margin: 0 auto 0 15px;
  box-sizing: border-box;
  line-height: 1.7;
  color: #444;
  padding: 16px;
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

  .content {
    padding: 16px;
  }

  .markdown-body {
    width: 100%;
  }
}
</style>
