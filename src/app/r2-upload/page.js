'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const R2UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  // 处理文件选择
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      
      // 生成预览
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setShowPreview(true);
      
      // 组件卸载时释放URL
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  // 处理文件上传
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('请先选择一个文件');
      return;
    }

    // 检查文件类型
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('不支持的文件类型，请上传图片文件');
      return;
    }

    // 检查文件大小（5MB限制）
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('文件大小不能超过5MB');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError('');
    setUploadResult(null);

    try {
      // 创建FormData对象
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      // 创建上传请求
      const xhr = new XMLHttpRequest();
      
      // 监听上传进度
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(progress);
        }
      });
      
      // 设置请求完成回调
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setUploadResult(response);
        } else {
          const errorData = JSON.parse(xhr.responseText);
          setError(errorData.error || '上传失败，请重试');
        }
        setUploading(false);
      });
      
      // 设置请求错误回调
      xhr.addEventListener('error', () => {
        setError('网络错误，请检查您的连接后重试');
        setUploading(false);
      });
      
      // 发送请求
      xhr.open('POST', '/api/r2-upload');
      xhr.send(formData);
    } catch (err) {
      setError(`上传过程中发生错误: ${err.message}`);
      setUploading(false);
    }
  };

  // 重置表单
  const resetForm = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadResult(null);
    setError('');
    setShowPreview(false);
    setPreviewUrl('');
    // 清空文件输入
    document.getElementById('fileInput')?.value && (document.getElementById('fileInput').value = '');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">R2 图片上传</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6"
      >
        {/* 文件选择区域 */}
        <div className="mb-6">
          <label 
            htmlFor="fileInput"
            className={`
              flex flex-col items-center justify-center 
              w-full h-48 
              border-2 border-gray-300 border-dashed 
              rounded-lg cursor-pointer 
              bg-gray-50 
              hover:bg-gray-100
              transition-colors
              ${selectedFile ? 'border-green-500' : ''}
            `}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg 
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 20 16"
              >
                <path 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">点击上传</span> 或拖拽图片</p>
              <p className="text-xs text-gray-500">支持 JPG, PNG, GIF, WebP, SVG (最大 5MB)</p>
            </div>
            <input 
              id="fileInput" 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* 已选择文件信息 */}
        {selectedFile && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-green-600">✓</div>
                <div>
                  <p className="font-medium text-gray-900">已选择文件</p>
                  <p className="text-sm text-gray-500">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type}
                  </p>
                </div>
              </div>
              <button 
                onClick={resetForm}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="移除文件"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* 图片预览 */}
        {showPreview && previewUrl && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">预览</h3>
            <div className="bg-gray-100 rounded-lg p-2 flex items-center justify-center">
              <img 
                src={previewUrl} 
                alt="预览图片" 
                className="max-w-full max-h-64 object-contain"
              />
            </div>
          </div>
        )}

        {/* 上传按钮 */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className={`
            w-full bg-blue-600 text-white py-3 px-4 rounded-md 
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {uploading ? '上传中...' : '上传图片'}
        </button>

        {/* 上传进度 */}
        {uploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-right">{uploadProgress}%</p>
          </div>
        )}

        {/* 错误信息 */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* 上传结果 */}
        {uploadResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
          >
            <h3 className="text-lg font-medium text-green-800 mb-2">上传成功！</h3>
            <div className="space-y-2">
              <p className="text-sm text-green-700">
                <span className="font-medium">文件名称:</span> {uploadResult.fileName}
              </p>
              <p className="text-sm text-green-700">
                <span className="font-medium">文件大小:</span> {(uploadResult.fileSize / 1024).toFixed(1)} KB
              </p>
              <p className="text-sm text-green-700">
                <span className="font-medium">文件类型:</span> {uploadResult.contentType}
              </p>
              <p className="text-sm text-green-700">
                <span className="font-medium">访问URL:</span>
              </p>
              <div className="flex items-center bg-white p-2 rounded">
                <input 
                  type="text" 
                  value={uploadResult.url} 
                  readOnly 
                  className="flex-1 text-sm text-gray-900 bg-transparent border-none outline-none"
                />
                <button 
                  onClick={() => navigator.clipboard.writeText(uploadResult.url)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  aria-label="复制URL"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => window.open(uploadResult.url, '_blank')}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                查看文件
              </button>
              <button 
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300 transition-colors"
              >
                上传新文件
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default R2UploadPage;