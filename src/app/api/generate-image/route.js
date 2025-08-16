import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const apiKey = process.env.BIGMODEL_API_KEY;

    if (!apiKey) {
      throw new Error('缺少 BigModel API Key，请检查 .env.local');
    }

    // 调用 BigModel 文本生成接口
    const response = await fetch('https://open.bigmodel.cn/api/paas/v3/model-api/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-chat-v1', // 文字生成模型
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    console.log('BigModel 返回:', data);

    // 提取文字内容
    const text = data.choices?.[0]?.message?.content || '未生成有效文本';
    return NextResponse.json({ response: text });

  } catch (error) {
    console.error('调用 BigModel 出错:', error);
    return NextResponse.json(
      { error: `调用 BigModel 出错: ${error.message}` },
      { status: 500 }
    );
  }
}
