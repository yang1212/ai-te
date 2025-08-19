import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt,size, n } = await request.json();
    const apiKey = process.env.BIGMODEL_API_KEY;

    if (!apiKey) {
      throw new Error('缺少 BigModel API Key，请检查 .env.local');
    }
    
    // 调用 BigModel 图像生成接口
    // 官网示例的正确URL
    const url = 'https://open.bigmodel.cn/api/paas/v4/images/generations';
    console.log(22, apiKey)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`, // 正确使用环境变量
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "cogview-4-250304",
        prompt,
        size,
        n
      }),
    });
    
    
    if (!response.ok) {
      throw new Error(`API 调用失败: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('BigModel 图像生成返回:', data);

    // 提取图像 URL（根据实际 API 返回结构调整）
    // 注意：不同的图像生成 API 返回格式可能不同
    const imageUrl = data.data?.[0]?.url;
    
    if (!imageUrl) {
      throw new Error('未生成有效图像 URL');
    }

    return NextResponse.json({ images: [imageUrl] });

  } catch (error) {
    console.error('调用 BigModel 图像生成出错:', error);
    return NextResponse.json(
      { error: `调用图像生成 API 出错: ${error.message}` },
      { status: 500 }
    );
  }
}
