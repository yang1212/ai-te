"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AITextGenerator() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入有效的提示词');
      return;
    }
    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error('调用后端API失败');

      const data = await response.json();
      if (data.error) setError(data.error);
      else setResult(data.response);

    } catch (err) {
      setError(`生成失败: ${err.message || '请稍后再试'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      e.preventDefault();
      handleGenerate();
    }
  };

  // 内联 SVG 图标
  const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );

  const MessageSquareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );

  const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BrainIcon />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">AI对话助手</h1>
          <p className="text-slate-600 dark:text-slate-300">输入提示词，获取AI生成的文本回复</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* 聊天输入区域 */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <label htmlFor="prompt" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              提示词
            </label>
            <motion.textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入提示词...例如：写一篇关于环保的短文"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors"
              whileFocus={{ borderColor: '#3b82f6' }}
            />
            
            <div className="flex justify-between items-center mt-4">
              <motion.button
                onClick={handleGenerate}
                disabled={loading}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                  loading
                    ? 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                }`}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    生成中...
                  </>
                ) : (
                  <>
                    <SendIcon className="mr-2" />
                    生成文字
                  </>
                )}
              </motion.button>
              
              <span className="text-xs text-slate-500 dark:text-slate-400">
                按 Enter 键生成，Shift+Enter 换行
              </span>
            </div>
          </div>

          {/* 结果展示区域 */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                <MessageSquareIcon className="mr-2 text-blue-500" />
                生成结果
              </h2>
              {result && (
                <motion.button
                  onClick={() => setResult('')}
                  className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  清除
                </motion.button>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md"
              >
                <p>{error}</p>
              </motion.div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-12 h-12 border-4 border-blue-200 dark:border-blue-700 border-t-blue-500 dark:border-t-blue-400 rounded-full mb-4"
                />
                <p className="text-slate-500 dark:text-slate-400">AI正在思考中...</p>
              </div>
            ) : result ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="prose dark:prose-invert max-w-none"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {result}
              </motion.div>
            ) : (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <p>生成的内容将显示在这里</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
          <p>使用AI生成内容时，请遵守相关法律法规</p>
        </div>
      </motion.div>
    </div>
  );
}
