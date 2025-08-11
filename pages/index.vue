<template>
  <div class="home" tabindex="0">
    <header class="hero">
      <!-- 添加背景渐变和图案 -->
      <div class="hero-bg"></div>
      <div class="hero-content">
        <!-- 优化的logo设计 -->
        <div class="logo-container">
          <div class="logo-icon">
            <img src="@/assets/logo.png" alt="个人知识库Logo" class="logo-img" />
          </div>
        </div>
        <!-- 主标题和副标题 -->
        <h1 class="title float-in">个人知识库</h1>
        <p class="subtitle float-in delay">记录学习，分享经验，持续成长</p>
        <div  class="cta-button float-in delay-2" @click="scrollToMainContent">开始探索</div>
      </div>
      <!-- 添加底部波浪效果 -->
      <div class="hero-wave"></div>
    </header>

    <main class="main-content">
      <!-- 分类部分保持不变，但添加 SEO 友好的描述 -->
      <section v-for="group in categoryGroups" :key="group.id" class="category-section">
        <h2 class="section-title">{{ group.name }}</h2>
        <div class="category-grid">
          <div  v-for="category in group.categories"
            :key="category.id">
            <a
              v-if="category.id === 'english'"
              class="category-card"
              href="/english"
              title="英语学习工具 - 提高单词记忆与语法能力"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-book'"></i>
                </div>
                <h3>英语学习</h3>
              </div>
            </a>
            <a
              v-else-if="category.id === 'books'"
              class="category-card"
              href="/books"
              title="书籍推荐 - 提高阅读能力与知识储备"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-book'"></i>
                </div>
                <h3>书籍推荐</h3>
              </div>
            </a>
            <router-link v-else-if="category.id === 'language'"
              :to="'/language/'"
              class="category-card"
              :title="category.description || '编程语言 - 探索多种编程语言的魅力'"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-code'"
                     :aria-label="category.name + ' 图标'"></i>
                </div>
                <h3>{{ category.name }}</h3>
              </div>
            </router-link>

            <router-link v-else-if="category.id === 'framework'"
              :to="'/framework'"
              class="category-card"
              title="前端框架 - 深入了解现代前端开发技术"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-cubes'"></i>
                </div>
                <h3>{{ category.name }}</h3>
              </div>
            </router-link>
            <router-link v-else-if="category.id === 'engineering'"
              :to="'/engineering'"
              class="category-card"
              title="工程化 - 探索前端工程化的最佳实践"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-tools'"></i>
                </div>
                <h3>{{ category.name }}</h3>
              </div>
            </router-link>
            <router-link v-else-if="category.id === 'mix'"
              :to="'/mix'"
              class="category-card"
              title="混合 - 探索前端混合开发的最佳实践"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-code-branch'"></i>
                </div>
                <h3>{{ category.name }}</h3>
              </div>
            </router-link>  
            <router-link v-else-if="category.id === 'psychology'"
              :to="'/psychology'"
              class="category-card"
              title="心理学 - 探索人类思维与行为"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-brain'"></i>
                </div>
                <h3>{{ category.name }}</h3>
              </div>
            </router-link>
            <router-link v-else-if="category.id === 'tool'"
              :to="'/tools'"
              class="category-card"
              title="工具 - 提高工作效率与生活质量"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-wrench'"></i>
                </div>
                <h3>{{ category.name }}</h3>
              </div>
            </router-link>
            <a
              v-else
              href="https://ai-yu.org/"
              class="category-card"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-book'"></i>
                </div>
                <h3>{{ category.name }}</h3>
                <!-- <p>{{ category.description }}</p> -->
              </div>
            </a>
          </div>
        </div>
      </section>
      <section class="about-section">
        <div class="about-card">
          <div class="about-header">
            <div class="about-icon">🪴</div>
            <h2 class="about-title">关于我们</h2>
          </div>
          <div class="about-content">
            <p class="about-intro">
              欢迎来到 <strong style="color: #333;">yangfu.asia</strong> —— 一个持续更新的知识库。系统整理思考、阅读、学习与项目实践，内容涵盖：
            </p>
            <ul class="about-topics">
              <li class="topic-item"><i class="fas fa-globe"></i> 网站开发与技术笔记</li>
              <li class="topic-item"><i class="fas fa-book"></i> 阅读摘录与书籍分类</li>
              <li class="topic-item"><i class="fas fa-pencil-alt"></i> 写作灵感与表达练习</li>
              <li class="topic-item"><i class="fas fa-bullseye"></i> 自我管理与价值探索</li>
            </ul>
          </div>
        </div>

        <div class="about-card">
          <div class="about-content">
            <blockquote class="quote">写下的，才是自己的。</blockquote>
            <p class="about-text">
              碎片的信息，不如结构的积累。将日常所见所思，逐步整理成一个清晰的知识网络 ——
            </p>
            <p class="about-text">
              既是留给自己的长期记忆，也希望能为同样在路上的你提供启发。
            </p>
            <p class="about-text">
              本站大部分内容为原创笔记、分类整理或经验总结。部分引用内容均注明出处，若有遗漏，欢迎指正。
            </p>
          </div>
        </div>

        <div class="contact-card">
          <div class="contact-icon"><i class="fas fa-envelope"></i></div>
          <div class="contact-content">
            <h3 class="contact-title">联系我们</h3>
            <p class="contact-text">如需交流、建议或合作，可发送邮件至：</p>
            <a href="mailto:tibooyang@gmail.com" class="email-link">tibooyang@gmail.com</a>
          </div>
        </div>
      </section>
    </main>
    
    <footer class="site-footer">
      <div class="footer-content">
        <p>&copy; {{ new Date().getFullYear() }} 个人知识库. 保留所有权利.</p>
        <div class="footer-links">
          <router-link to="/privacy-policy" class="footer-link">隐私政策</router-link>
          <span class="separator">|</span>
          <router-link to="/terms-of-service" class="footer-link">服务条款</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      searchQuery: '',
      timer: null,
      clickCount: 0,
      showStats: false,
      visitCount: 0,
      todayVisits: 0,
      averageTime: 0,
      visitStartTime: null,
      keySequence: '',
      categoryGroups: [
        {
          id: 'programming',
          name: '编程开发',
          isOpen: false,
          categories: [
            { id: 'language', name: '前端｜语言', description: '', icon: "fas fa-code"  },
            { id: 'framework', name: '前端｜框架', description: '', icon: "fas fa-layer-group" },
            { id: 'engineering', name: '前端｜工程化', description: '', icon: "fas fa-cogs"  },
            { id: 'mix', name: '前端｜混合', description: '', icon: "fas fa-mobile-alt"  },
          ]
        },
        {
          id: 'tools',
          name: '工具效率',
          isOpen: false,
          categories: [
            { id: 'tool', name: '工具', description: '', icon: "fas fa-tools" },
          ]
        },
        {
          id: 'learning',
          name: '学习成长',
          isOpen: false,
          categories: [
            { id: 'english', name: '英语学习', description: '', icon: "fas fa-book-open"  },
            { id: 'books', name: '书籍推荐', description: '', icon: "fas fa-book"  },
            { id: 'ai', name: 'AI 素材', description: '', icon: "fas fa-robot"  },
            { id: 'psychology', name: '奇思妙想', description: '', icon: "fas fa-lightbulb"  }
          ]
        }
      ]
    }
  },
  // 延迟加载非关键功能
  mounted() {
    this.animateAboutSection();
  },
  methods: {
    animateAboutSection() {
      const aboutSection = document.querySelector('.about-section');
      if (!aboutSection) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cards = aboutSection.querySelectorAll('.about-card, .contact-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, index * 200);
            });
            observer.unobserve(aboutSection);
          }
        });
      }, {
        threshold: 0.1
      });

      observer.observe(aboutSection);
    },
    scrollToMainContent(e) {
      e.preventDefault();
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  },
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #f5f7fa;
}
.email-box {
  text-align: right;
  color:#fff;
  font-weight: bold;
  position: relative;
  top: -30px;
  right: 15px;
  font-size: 16px;
}
.hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 20px 80px;
  color: white;
  text-align: center;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 Z" fill="rgba(255,255,255,0.05)"/></svg>');
  background-size: cover;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 620px;
  margin: 0 auto;
}

.logo-container {
  margin-bottom: 30px;
  animation: fadeInUp 1s forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  margin-bottom: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.logo-icon:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.logo-img {
  width: 70%;
  height: 70%;
  object-fit: contain;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
}

.title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  opacity: 0;
  animation: fadeInUp 1s 0.3s forwards;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.6rem;
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: fadeInUp 1s 0.6s forwards;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  display: inline-block;
  background: white;
  color: #667eea;
  font-weight: 600;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeInUp 1s 1.2s forwards;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  background: #f8f9fa;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60"><path fill="%23f5f7fa" fill-opacity="1" d="M0,32L80,26.7C160,21,320,11,480,16C640,21,800,43,960,42.7C1120,43,1280,21,1360,10.7L1440,0L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path></svg>');
  background-size: cover;
  background-position: bottom;
  z-index: 2;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.category-section {
  margin-bottom: 90px;
}

.section-title {
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 30px;
  position: relative;
  padding-left: 15px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: #667eea;
  border-radius: 2px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.category-card {
  text-decoration: none;
  color: inherit;
}

.card-content {
  /* background: white; */
  border-radius: 12px;
  padding: 30px 30px 0 30px;
  height: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.category-card:hover .card-content {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 50px;
  height: 50px;
  background: #f0f4ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  color: #667eea;
  margin-bottom: 5px;
}

.card-content h3 {
  font-size: 1.3em;
  color: #2c3e50;
  margin: 0;
}

.card-content p {
  color: #666;
  line-height: 1.6;
  flex-grow: 1;
}

.article-count {
  color: #667eea;
  font-size: 0.9em;
  font-weight: 500;
}



.stats-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

.stats-content h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 1.2em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.stats-item {
  text-align: center;
}

.stats-value {
  font-size: 1.8em;
  font-weight: 600;
  color: #667eea;
  margin-bottom: 5px;
}

.stats-label {
  font-size: 0.9em;
  color: #666;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.stats-overlay {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 15px;
  margin-top: 15px;
  display: flex;
  gap: 20px;
  animation: fadeIn 0.3s ease;
}

.stats-overlay .stats-item {
  text-align: center;
  min-width: 80px;
}

.stats-overlay .stats-number {
  display: block;
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 5px;
}

.stats-overlay .stats-label {
  font-size: 0.8em;
  opacity: 0.8;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* 漂浮动画 */
@keyframes floatUpDown {
  0%, 100% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(10px);
  }
}

/* 标题漂浮 */
.floating-text {
  animation: floatUpDown 3.5s ease-in-out infinite;
  margin: 0;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.floating-text.delay {
  animation-delay: 1.5s;
  font-weight: 400;
  font-size: 1.3rem;
  margin-top: 8px;
}
.site-footer {
  background-color: #2c3e50;
  color: white;
  padding: 2rem 0;
  margin-top: 3rem;
}

.footer-content {
  /* 关于我们部分样式 */
  max-width: 1160px;
  margin: 4rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  }
  
.about-card {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.03);
}
  
.about-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
  
.about-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}
  
  .about-icon {
  font-size: 2.5rem;
  line-height: 1;
  }
  
  .about-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  }
  
  .about-content {
  color: #444;
  }
  
  .about-intro {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  }
  
  .about-topics {
  list-style: none;
  padding: 0;
  margin: 0;
  }
  
  .topic-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #555;
  transition: transform 0.2s ease, color 0.2s ease;
  }
  
  .topic-item:hover {
  transform: translateX(5px);
  color: #667eea;
  }
  
  .topic-item i {
  margin-right: 1rem;
  color: #667eea;
  font-size: 1.2rem;
  }
  
  .quote {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  padding-left: 1rem;
  border-left: 4px solid #667eea;
  }
  
  .about-text {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.2rem;
  }
  
  .contact-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  padding: 2.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 10px 25px rgba(118, 75, 162, 0.2);
  }
  
  .contact-icon {
  font-size: 2.5rem;
  background: rgba(255, 255, 255, 0.2);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  }
  
  .contact-content {
  flex: 1;
  }
  
  .contact-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  }
  
  .contact-text {
  margin: 0 0 1rem 0;
  opacity: 0.9;
  }
  
  .email-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 2px;
  transition: border-bottom 0.3s ease;
  }
  
  .email-link:hover {
  border-bottom: 2px solid white;
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
  /* .about-section {
  padding: 0 1.5rem;
  } */
  
  .about-card {
  padding: 1.8rem;
  }
  
  .about-title {
  font-size: 1.5rem;
  }
  
  .contact-card {
  flex-direction: column;
  text-align: center;
  padding: 2rem 1.5rem;
  }
  
  .contact-icon {
     margin-bottom: 1rem;
  }
}

.footer-links {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.footer-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #667eea;
}

.separator {
  color: rgba(255, 255, 255, 0.5);
}
/* 添加初始动画状态 */
.about-card, .contact-card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero {
    padding: 100px 20px 60px;
    min-height: 50vh;
  }

  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.3rem;
  }

  .logo-icon {
    font-size: 3rem;
  }

  .cta-button {
    padding: 10px 25px;
    font-size: 1rem;
  }
}

</style>
