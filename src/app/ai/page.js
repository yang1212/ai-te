"use client";
import { useState } from 'react';

export default function AITextGenerator() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="输入提示词..."
        rows={4}
        style={{ width: '100%', padding: 8 }}
      />
      <button onClick={handleGenerate} disabled={loading} style={{ marginTop: 8 }}>
        {loading ? '生成中...' : '生成文字'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <div style={{ marginTop: 16, whiteSpace: 'pre-wrap' }}>{result}</div>}
    </div>
  );
}
