'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../../util/supabaseClient';
import { motion } from 'framer-motion';

export default function DataManagementPage() {
  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    name: '',
    size: '',
    date: new Date().toISOString().split('T')[0], // 设置默认日期为今天
  });
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 在组件加载时获取数据
  useEffect(() => {
    fetchData();
  }, []);

  // 从Supabase获取数据
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('data_items') // 假设表名为data_items，需要先在Supabase中创建
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('获取数据失败:', error);
        setError('获取数据失败，请稍后再试');
      } else {
        setDataList(data || []);
      }
    } catch (err) {
      console.error('获取数据时发生错误:', err);
      setError('获取数据时发生错误');
    } finally {
      setLoading(false);
    }
  };

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 添加新数据
  const handleAddData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 表单验证
      if (!formData.name.trim()) {
        setError('请输入名称');
        return;
      }

      const { data, error } = await supabase
        .from('data_items')
        .insert([formData])
        .select();

      if (error) {
        console.error('添加数据失败:', error);
        // 提供更友好的错误信息
        if (error.code === '42P01') {
          setError('数据表不存在，请先在Supabase中创建名为"data_items"的表');
        } else {
          setError('添加数据失败，请稍后再试');
        }
      } else {
        // 清空表单
        setFormData({
          name: '',
          size: '',
          date: new Date().toISOString().split('T')[0],
        });
        setSuccess('数据添加成功');
        // 重新获取数据列表
        fetchData();
      }
    } catch (err) {
      console.error('添加数据时发生错误:', err);
      setError('添加数据时发生错误');
    } finally {
      setLoading(false);
    }
    
  };

  // 删除数据
  const handleDeleteData = async (id) => {
    if (!confirm('确定要删除这条数据吗？')) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase
        .from('data_items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('删除数据失败:', error);
        setError('删除数据失败，请稍后再试');
      } else {
        setSuccess('数据删除成功');
        // 重新获取数据列表
        fetchData();
      }
    } catch (err) {
      console.error('删除数据时发生错误:', err);
      setError('删除数据时发生错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">数据管理</h1>
          <p className="text-lg text-slate-600">添加、查看和删除数据记录</p>
        </motion.div>

        {/* 消息提示区域 */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg"
          >
            {success}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 表单区域 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4">添加新数据</h2>
            <form onSubmit={handleAddData} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  名称
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="请输入名称"
                />
              </div>
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-slate-700 mb-1">
                  大小
                </label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="请输入大小"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
                  日期
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                {loading ? '处理中...' : '添加数据'}
              </button>
            </form>
          </motion.div>

          {/* 数据列表区域 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4">数据列表</h2>
            {loading && dataList.length === 0 ? (
              <div className="flex justify-center items-center h-40 text-slate-500">
                加载中...
              </div>
            ) : dataList.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-40 text-slate-500">
                <p>暂无数据</p>
                <p className="text-sm mt-2">请在左侧表单中添加数据</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        名称
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        大小
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        日期
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {dataList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {item.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteData(item.id)}
                            disabled={loading}
                            className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                          >
                            {loading ? '删除中...' : '删除'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>

        {/* 提示信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-2">使用说明</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>请先在Supabase中创建名为&quot;data_items&quot;的表，包含id、name、size和date字段</li>
            <li>id字段应为主键，类型为uuid，可设置为默认值gen_random_uuid()</li>
            <li>name、size字段为text类型，date字段为date类型</li>
            <li>在左侧表单中输入数据，点击&quot;添加数据&quot;按钮保存</li>
            <li>在右侧表格中可以查看和删除现有数据</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}