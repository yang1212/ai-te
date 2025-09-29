'use client';
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from 'react';
import { supabase } from '../../util/supabaseClient';
import './globals.css';
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 检查用户会话
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('获取用户信息失败:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // 设置用户状态变更监听器
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  // 退出登录处理
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('退出登录失败:', error);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('退出登录时发生错误:', error);
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 添加全局导航栏 */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">首页</Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">首页</Link>
                <Link href="/ai" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">智谱-对话</Link>
                <Link href="/aiPicture" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">智谱-图像生成</Link>
                <Link href="/aihubmix" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">AIHubMix-对话</Link>
                <Link href="/aihubmix-image" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">AIHubMix-图像生成</Link>
                <Link href="/r2-upload" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">R2 图片上传</Link>
                <Link href="/data-management" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  数据管理
                </Link>
                
                {/* 用户认证相关按钮 */}
                {user ? (
                  <>
                    <div className="text-gray-700 px-3 py-2 text-sm font-medium">
                      {user.email}
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      退出登录
                    </button>
                  </>
                ) : (
                  <Link href="/supabase-auth" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    登录
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}

