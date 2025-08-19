import Image from 'next/image';
import Link from 'next/link';

export default function FeaturesPage() {
  // 功能数据
  const features = [
    {
      id: 1,
      title: "高性能渲染",
      description: "Next.js的服务器端渲染和静态生成功能确保您的网站加载速度极快，提供卓越的用户体验。",
      icon: "/globe.svg",
      details: [
        "服务器端渲染(SSR)提高首屏加载速度",
        "静态生成(SSG)适用于内容不常变化的页面",
        "增量静态再生(ISR)实现静态页面的动态更新",
      ]
    },
    {
      id: 2,
      title: "响应式设计",
      description: "使用Tailwind CSS轻松构建适配各种屏幕尺寸的响应式界面，从手机到桌面设备均有出色表现。",
      icon: "/window.svg",
      details: [
        "移动优先的设计理念",
        "断点系统适配不同屏幕尺寸",
        "灵活的网格布局系统",
      ]
    },
    {
      id: 3,
      title: "现代化UI组件",
      description: "丰富的组件库和设计系统，让您的网站既美观又实用，提升用户体验和转化率。",
      icon: "/file.svg",
      details: [
        "易于定制的组件样式",
        "内置动画和过渡效果",
        "符合现代设计趋势的UI元素",
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">

      {/* 页面标题 */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">强大功能，卓越体验</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            探索我们产品的核心功能，为您的业务带来全方位的提升
          </p>
        </div>
      </section>

      {/* 功能详情 */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {features.map((feature) => (
              <div key={feature.id} className={`flex flex-col ${feature.id % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-80 lg:h-96 bg-white p-6 rounded-lg shadow-md">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      className="w-16 h-16 mb-4 text-blue-600"
                      width={64}
                      height={64}
                    />
                    <h2 className="text-2xl font-bold mb-4 text-blue-600">{feature.title}</h2>
                    <p className="text-slate-600 mb-6">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-slate-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={`https://picsum.photos/id/${feature.id * 10}/800/600`}
                      alt={feature.title}展示
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 行动号召 */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">准备好体验这些强大功能了吗？</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
            立即开始您的免费试用，探索我们如何帮助您的业务增长
          </p>
          <Link href="#contact" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md text-base font-medium hover:bg-blue-50 transition-colors">
            免费试用
          </Link>
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
              <a href="/features" className="text-slate-400 hover:text-white transition-colors">功能</a>
              <a href="#pricing" className="text-slate-400 hover:text-white transition-colors">价格</a>
              <a href="#contact" className="text-slate-400 hover:text-white transition-colors">联系我们</a>
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