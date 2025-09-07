import { NextResponse } from 'next/server';

if (process.env.NODE_ENV === 'development') {
  // 仅开发环境临时关闭SSL验证
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function POST(request) {
  try {
    const { prompt, model } = await request.json();
    const apiKey = process.env.AIHUBMIX_API_KEY;

    if (!apiKey) {
      throw new Error('缺少 AIHubMix API Key，请检查 .env.local');
    }

    // AIHubMix API URL
    const url = 'https://api.aihubmix.com/v1/chat/completions';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model || 'gpt-4', // 默认使用gpt-4模型
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.6
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status}，详情：${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('AIHubMix返回:', data);

    const text = data.choices?.[0]?.message?.content || '未生成有效文本';
    return NextResponse.json({ response: text });

  } catch (error) {
    console.error('调用AIHubMix出错:', error);
    return NextResponse.json(
      { error: `调用失败: ${error.message}` },
      { status: 500 }
    );
  }
}