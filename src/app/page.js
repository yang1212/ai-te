import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">Next.js + Tailwind</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/features" className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                功能
              </Link>
              <Link href="/ai" className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                AI对话聊天
              </Link>
              <Link href="/aiPicture" className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                AI图像生成
              </Link>
              <Link href="#contact" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                构建现代化的<br />
                <span className="text-blue-600">Web应用</span> 体验
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                使用Next.js和Tailwind CSS构建高性能、响应式的网站，为您的用户提供卓越的体验。
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="#get-started" className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors text-center">
                  立即开始
                </Link>
                <Link href="#learn-more" className="border border-slate-300 text-slate-700 px-6 py-3 rounded-md text-base font-medium hover:bg-slate-50 transition-colors text-center">
                  了解更多
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-80 lg:h-96">
                <Image
                  src="https://picsum.photos/id/1/800/600"
                  alt="Next.js + Tailwind展示"
                  fill
                  className="rounded-lg shadow-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能区域 */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">强大的功能</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              我们的解决方案提供了一系列强大的功能，帮助您构建出色的Web应用。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 功能卡片1 */}
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">高性能</h3>
              <p className="text-slate-600">
                Next.js的服务器端渲染和静态生成功能确保您的网站加载速度极快。
              </p>
            </div>
            {/* 功能卡片2 */}
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">响应式设计</h3>
              <p className="text-slate-600">
                使用Tailwind CSS轻松构建适配各种屏幕尺寸的响应式界面。
              </p>
            </div>
            {/* 功能卡片3 */}
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">美观UI</h3>
              <p className="text-slate-600">
                现代化的设计系统和丰富的组件库，让您的网站既美观又实用。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 价格区域 */}
      <section id="pricing" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">灵活的价格方案</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              选择最适合您需求的价格方案，无论是个人项目还是企业应用。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* 价格卡片1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">基础版</h3>
              <div className="text-4xl font-bold mb-4">¥99<span className="text-base font-normal text-slate-500">/月</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-600">
                  <span className="text-green-500 mr-2">✓</span> 基本功能访问
                </li>
                <li className="flex items-center text-slate-600">
                  <span className="text-green-500 mr-2">✓</span> 10GB 存储空间
                </li>
                <li className="flex items-center text-slate-600">
                  <span className="text-green-500 mr-2">✓</span> 邮件支持
                </li>
              </ul>
              <Link href="#contact" className="block w-full text-center bg-slate-100 text-slate-800 px-6 py-3 rounded-md text-base font-medium hover:bg-slate-200 transition-colors">
                选择方案
              </Link>
            </div>
            {/* 价格卡片2 */}
            <div className="bg-blue-600 text-white p-8 rounded-lg shadow-md transform md:-translate-y-4 hover:shadow-lg transition-shadow">
              <div className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">最受欢迎</div>
              <h3 className="text-xl font-semibold mb-2">专业版</h3>
              <div className="text-4xl font-bold mb-4">¥299<span className="text-base font-normal text-blue-200">/月</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> 所有基础版功能
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> 50GB 存储空间
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> 优先邮件支持
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> 高级分析工具
                </li>
              </ul>
              <Link href="#contact" className="block w-full text-center bg-white text-blue-600 px-6 py-3 rounded-md text-base font-medium hover:bg-blue-50 transition-colors">
                选择方案
              </Link>
            </div>
            {/* 价格卡片3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">企业版</h3>
              <div className="text-4xl font-bold mb-4">¥999<span className="text-base font-normal text-slate-500">/月</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-600">
                  <span className="text-green-500 mr-2">✓</span> 所有专业版功能
                </li>
                <li className="flex items-center text-slate-600">
                  <span className="text-green-500 mr-2">✓</span> 无限存储空间
                </li>
                <li className="flex items-center text-slate-600">
                  <span className="text-green-500 mr-2">✓</span> 24/7 专属支持
                </li>
                <li className="flex items-center text-slate-600">
                  <span className="text-green-500 mr-2">✓</span> 定制化服务
                </li>
              </ul>
              <Link href="#contact" className="block w-full text-center bg-slate-100 text-slate-800 px-6 py-3 rounded-md text-base font-medium hover:bg-slate-200 transition-colors">
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 联系区域 */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">联系我们</h2>
            <p className="text-lg text-slate-600">
              有任何问题或建议？请填写下面的表单，我们的团队将尽快回复您。
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">姓名</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入您的姓名"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">邮箱</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入您的邮箱"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">留言</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入您的留言"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
              >
                提交留言
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-xl font-bold">Next.js + Tailwind</span>
              <p className="text-slate-400 mt-2">构建现代化的Web应用体验</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">关于我们</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">服务</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">博客</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">联系我们</a>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>© {new Date().getFullYear()} Next.js + Tailwind. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

