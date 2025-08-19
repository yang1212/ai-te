'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AIImageGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false); // 检测是否客户端渲染

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入有效的描述词');
      return;
    }

    setError('');
    setImages([]);
    setLoading(true);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt || "一只在沙滩上弹吉他的猫",
          size: "512x512",
          n: 1
        }),
      });

      if (!response.ok) throw new Error('调用后端API失败');

      const data = await response.json();

      if (isClient) {
        // 处理返回图像 URL
        if (data.images && Array.isArray(data.images)) {
          const validImages = data.images.filter(url => {
            try { new URL(url); return true; } catch { return false; }
          });
          if (validImages.length > 0) setImages(validImages);
          else setError('未生成有效图像 URL');
        } else if (data.response) {
          try { new URL(data.response); setImages([data.response]); } 
          catch { setError('返回的图像 URL 无效'); }
        } else {
          setError('未生成有效图像');
        }
      }
    } catch (err) {
      console.error(err);
      setError(`生成失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 客户端渲染图片列表
  const RenderImages = () => {
    if (!isClient) return null;

    if (images.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-lg bg-slate-800/50 p-2">
              <Image
                src={imageUrl}
                alt={`生成图像 ${index + 1}`}
                fill
                className="object-cover rounded"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                suppressHydrationWarning
              />
            </div>
          ))}
        </div>
      );
    } else if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p>正在生成图像，请稍候...</p>
        </div>
      );
    } else {
      return (
        <div className="text-center py-12 text-slate-400">
          <p>请输入描述词并点击生成按钮</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 md:p-8">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AI图像生成
        </h1>
        <p className="text-center text-slate-300 max-w-2xl mx-auto">
          输入描述词，让AI为您创建精美的图像。尝试使用详细的描述以获得更好的结果。
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-6 shadow-xl mb-8">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
              图像描述词
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例如：一只可爱的柯基犬在草地上玩耍，阳光明媚，高清，详细"
              className="w-full h-32 p-4 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            ></textarea>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                生成中...
              </>
            ) : '生成图像'}
          </button>

          {error && (
            <div className="mt-4 bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">生成结果</h2>
          <RenderImages />
        </div>
      </main>

      <footer className="max-w-4xl mx-auto mt-16 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} AI图像生成工具 | 使用Next.js和大模型API构建</p>
      </footer>
    </div>
  );
}
