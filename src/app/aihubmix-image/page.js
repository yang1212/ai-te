'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AIHubMixImage = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [n, setN] = useState(1);
  const [modelPath, setModelPath] = useState('opanai/dall-e-3'); // 默认模型
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // 用于模态框显示选中的图像

  // 支持的模型列表
  const models = [
    // { value: 'opanai/gpt-image-1', label: 'OpenAI GPT Image 1' },
    { value: 'opanai/dall-e-3', label: 'OpenAI DALL·E 3' },
    // { value: 'google/gemini-2.5-flash-image-preview', label: 'Google Gemini 2.5 Flash Image Preview' },
    // { value: 'google/gemini-2.0-flash-preview-image', label: 'Google Gemini 2.0 Flash Preview Image' },
    // { value: 'google/imagen-4.0-ultra-generate-001', label: 'Google Imagen 4.0 Ultra' },
    // { value: 'google/imagen-4.0-ultra-generate-preview-001', label: 'Google Imagen 4.0 Ultra Preview' },
    // { value: 'google/imagen-4.0-generate-001', label: 'Google Imagen 4.0' },
    // { value: 'google/imagen-4.0-fast-generate-001', label: 'Google Imagen 4.0 Fast' },
    // { value: 'google/imagen-4.0-fast-generate-preview-06-06', label: 'Google Imagen 4.0 Fast Preview' },
    // { value: 'google/imagen-3.0-generate-002', label: 'Google Imagen 3.0' },
    // { value: 'bfl/flux-kontext-pro', label: 'Flux Kontext Pro' },
    // { value: 'bfl/flux-1.1-pro', label: 'Flux 1.1 Pro' },
  ];
  // 内联 SVG 图标
  const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImages([]);

    try {
      const response = await fetch('/api/aihubmix-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size,
          n,
          model_path: modelPath,
        }),
      });

      if (!response.ok) {
        throw new Error('图像生成失败');
      }

      const data = await response.json();
      // 修复：从正确的位置获取图像URL，并清理格式
      const imageUrls = data.rawData?.output?.urls || [];
      // 清理URL中的反引号和空格
      const cleanedUrls = imageUrls.map(url => url.replace(/[`\s]/g, ''));
      // 创建符合前端渲染要求的对象数组
      setImages(cleanedUrls.map(url => ({ url })));
    } catch (err) {
      setError(err.message || '生成图像时发生错误');
    } finally {
      setLoading(false);
    }
  };

  // 打开模态框显示大图
  const openModal = (image) => {
    setSelectedImage(image);
  };

  // 关闭模态框
  const closeModal = () => {
    setSelectedImage(null);
  };

  // 点击模态框外部关闭
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.className === 'fixed inset-0 bg-black/80 z-50 flex items-center justify-center') {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedImage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <motion.div 
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BrainIcon />
        </motion.div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">AIHubMix 图像生成</h1>
        <p className="text-slate-600 dark:text-slate-300">输入提示词，选择模型，获取AI生成的图像</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">选择模型</label>
            <select
              id="model"
              value={modelPath}
              onChange={(e) => setModelPath(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {models.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">图像描述</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入你想要生成的图像描述..."
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">图像尺寸</label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1024x1024">1024x1024</option>
                <option value="1024x1792">1024x1792</option>
                <option value="1792x1024">1792x1024</option>
              </select>
            </div>

            <div>
              <label htmlFor="n" className="block text-sm font-medium text-gray-700 mb-1">生成数量</label>
              <input
                type="number"
                id="n"
                value={n}
                onChange={(e) => setN(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '生成中...' : '生成图像'}
          </button>
        </form>
      </motion.div>

      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
        >
          {images.map((image, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer relative h-40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal(image)}
            >
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <Image
                  src={image.url}
                  alt={`生成的图像 ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                  width={200}
                  height={200}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw, 16.67vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                点击查看大图
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 图像模态框 */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl"
              onClick={closeModal}
            >
              ×
            </button>
            <div className="bg-white p-2 rounded-lg shadow-2xl">
              <Image
                src={selectedImage.url}
                alt="大图预览"
                className="max-w-full max-h-[80vh] object-contain"
                width={1024}
                height={1024}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AIHubMixImage;