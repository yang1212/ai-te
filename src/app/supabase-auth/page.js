'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../../util/supabaseClient';

// 导入Google图标SVG
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.35 11.1H12.18V16.38H17.94C17.6 19.35 15.19 21.48 12 21.48C8.41 21.48 5.44 19.08 4.11 15.9H0L5.38 10.5L0 5.1H4.11C5.44 1.92 8.41 -0.48 12 0.09C15.19 -0.48 17.6 1.65 17.94 4.62H12.18V9.9H21.35V11.1Z" fill="currentColor"/>
  </svg>
);

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        console.error('Login error:', error.message);
        setError('登录失败，请稍后再试');
      }
    } catch (err) {
      console.error('Login exception:', err);
      setError('登录过程中出现错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10"
      >
        <div className="text-center mb-10">
          <motion.h1 
            className="text-3xl font-bold text-gray-800 mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            欢迎回来
          </motion.h1>
          <motion.p 
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            登录您的账号以继续使用我们的服务
          </motion.p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-5 py-3 font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-all"
        >
          <GoogleIcon />
          <span>{loading ? '正在登录...' : '使用Google账号登录'}</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-8 text-sm text-gray-500"
        >
          点击登录即表示您同意我们的
          <a href="#" className="text-blue-600 hover:underline ml-1">服务条款</a>
          和
          <a href="#" className="text-blue-600 hover:underline ml-1">隐私政策</a>
        </motion.div>
      </motion.div>
    </div>
  );
}

