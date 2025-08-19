import { NextResponse } from 'next/server';

// 仅开发环境临时关闭SSL验证（生产环境删除！）
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const apiKey = process.env.BIGMODEL_API_KEY;

    if (!apiKey) {
      throw new Error('缺少 BigModel API Key，请检查 .env.local');
    }

    // 官网示例的正确URL
    const url = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
    console.log(11, apiKey)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`, // 正确使用环境变量
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'glm-4.5', // 官网示例模型（确保支持）
        messages: [
          { role: 'user', content: prompt } // 匹配示例的参数格式
        ],
        temperature: 0.6 // 可选参数，控制随机性
      }),
    });

    if (!response.ok) {
      // 尝试获取详细错误信息（官网可能返回JSON格式的错误）
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status}，详情：${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('智谱AI返回:', data);

    // 提取返回内容（按官网示例的结构）
    const text = data.choices?.[0]?.message?.content || '未生成有效文本';
    return NextResponse.json({ response: text });

  } catch (error) {
    console.error('调用智谱AI出错:', error);
    return NextResponse.json(
      { error: `调用失败: ${error.message}` },
      { status: 500 }
    );
  }
}
