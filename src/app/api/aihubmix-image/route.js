import { NextResponse } from 'next/server';

// 仅开发环境临时关闭SSL验证（生产环境删除！）
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function POST(req) {
  try {
    const { prompt, size = '1024x1024', n = 1, model_path = 'opanai/dall-e-3' } = await req.json();

    // 验证必需参数
    if (!prompt) {
      return new Response(JSON.stringify({ error: '缺少必需参数: prompt' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 构建API URL，使用动态模型路径
    const url = `https://aihubmix.com/v1/models/${model_path}/predictions`;
    // 调用AIHubMix API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AIHUBMIX_API_KEY}`,
      },
      body: JSON.stringify({
        input: {
          prompt,
          size,
          n,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API调用失败: ${response.status} ${response.statusText}, 详情: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    // 打印完整API响应以供调试
    console.log('完整API响应:', JSON.stringify(data, null, 2));
    // 从output.urls提取图像URL
    const images = data?.output?.urls || [];
    console.log('提取的图像数组:', images);
    // 返回图像和原始数据
    return NextResponse.json({ images, rawData: data });

  } catch (error) {
    console.error('图像生成错误:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
