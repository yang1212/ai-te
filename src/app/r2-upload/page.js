'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const R2UploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResults, setUploadResults] = useState([]);
  const [error, setError] = useState('');

  // 处理文件选择
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setError('');
      setUploadResults([]);
    }
  };

  // 处理文件上传
  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setError('请先选择文件');
      return;
    }

    // 检查文件数量限制（最多10个文件）
    if (selectedFiles.length > 10) {
      setError('一次最多上传10个文件');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError('');

    try {
      // 创建FormData对象
      const formData = new FormData();
      // 添加所有选择的文件
      selectedFiles.forEach((file) => {
        formData.append('files[]', file);
      });
      
      // 创建上传请求
      const xhr = new XMLHttpRequest();
      
      // 监听上传进度
      let totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
      let uploadedSize = 0;
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          uploadedSize = e.loaded;
          const progress = Math.round((uploadedSize / totalSize) * 100);
          setUploadProgress(progress);
        }
      });
      
      // 设置请求完成回调
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setUploadResults(response.results);
        } else {
          const errorData = JSON.parse(xhr.responseText);
          setError(errorData.error || '上传失败，请重试');
        }
        setUploading(false);
        setUploadProgress(100);
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
    setSelectedFiles([]);
    setUploadProgress(0);
    setUploadResults([]);
    setError('');
    // 清空文件输入
    document.getElementById('fileInput')?.value && (document.getElementById('fileInput').value = '');
  };

  // 获取上传成功的文件数量
  const successCount = uploadResults.filter(result => result.success).length;

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
              ${selectedFiles.length > 0 ? 'border-green-500' : ''}
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
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">点击上传</span> 或拖拽图片（支持批量）</p>
              <p className="text-xs text-gray-500">支持 JPG, PNG, GIF, WebP, SVG (每个最大 5MB，最多10个文件)</p>
            </div>
            <input 
              id="fileInput" 
              type="file" 
              className="hidden" 
              accept="image/*" 
              multiple 
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* 已选择文件列表 */}
        {selectedFiles.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium text-gray-900">已选择 {selectedFiles.length} 个文件</div>
              <button 
                onClick={resetForm}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="清空选择"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="text-green-600">✓</div>
                    <div>
                      <p className="text-sm text-gray-900 truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB • {file.type}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 上传按钮 */}
        <button
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || uploading}
          className={`
            w-full bg-blue-600 text-white py-3 px-4 rounded-md 
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {uploading ? '上传中...' : '批量上传图片'}
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
        {uploadResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <h3 className={`text-lg font-medium mb-3 ${successCount === selectedFiles.length ? 'text-green-800' : 'text-orange-800'}`}>
              {successCount === selectedFiles.length ? '全部上传成功！' : `部分上传成功 (${successCount}/${selectedFiles.length})`}
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {uploadResults.map((result, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                      {result.success ? '上传成功' : '上传失败'}
                    </p>
                    <p className="text-sm text-gray-500 truncate max-w-[150px]">{result.fileName}</p>
                  </div>
                  
                  {result.success ? (
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-700">
                        <span className="font-medium">文件大小:</span> {(result.fileSize / 1024).toFixed(1)} KB
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">文件类型:</span> {result.contentType}
                      </p>
                      <div className="flex items-center bg-white p-2 rounded mt-2">
                        <input 
                          type="text" 
                          value={result.url} 
                          readOnly 
                          className="flex-1 text-sm text-gray-900 bg-transparent border-none outline-none truncate"
                        />
                        <button 
                          onClick={() => navigator.clipboard.writeText(result.url)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                          aria-label="复制URL"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-2">
                        <button 
                          onClick={() => window.open(result.url, '_blank')}
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                        >
                          查看文件
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-red-700">
                      错误: {result.error}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4">
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