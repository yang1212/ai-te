import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

// 仅开发环境临时关闭SSL验证（生产环境删除！）
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// 配置R2客户端
const s3Client = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  region: 'auto', // R2使用'auto'区域
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.R2_BUCKET_NAME;
const publicUrl = process.env.R2_PUBLIC_URL;

export async function POST(request) {
  try {
    // 检查环境变量是否设置
    if (!process.env.R2_ENDPOINT || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !process.env.R2_BUCKET_NAME) {
      throw new Error('缺少R2配置，请设置环境变量');
    }

    // 解析表单数据
    const formData = await request.formData();
    const files = formData.getAll('files[]'); // 获取所有上传的文件

    if (!files || files.length === 0) {
      return NextResponse.json({ error: '没有找到文件' }, { status: 400 });
    }

    // 检查文件数量限制（最多10个文件）
    if (files.length > 10) {
      return NextResponse.json({ error: '一次最多上传10个文件' }, { status: 400 });
    }

    const uploadResults = [];
    // 逐个上传文件
    for (const file of files) {
      // 检查文件类型
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        uploadResults.push({
          fileName: file.name,
          success: false,
          error: '不支持的文件类型'
        });
        continue;
      }

      // 检查文件大小（5MB限制）
      if (file.size > 5 * 1024 * 1024) {
        uploadResults.push({
          fileName: file.name,
          success: false,
          error: '文件大小不能超过5MB'
        });
        continue;
      }

      try {
        // 生成唯一的文件名
        const fileExtension = file.name.split('.').pop();
        const originalFileNameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.'));
        const fileName = `${uuidv4()}_${originalFileNameWithoutExt}.${fileExtension}`;

        // 转换文件为Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 上传文件到R2
        const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: fileName,
          Body: buffer,
          ContentType: file.type,
          // 设置文件为公开可读
          ACL: 'public-read',
        });

        await s3Client.send(command);

        // 构建文件的公共URL
        const fileUrl = publicUrl ? `${publicUrl}/${fileName}` : `${process.env.R2_ENDPOINT}/${bucketName}/${fileName}`;

        uploadResults.push({
          success: true,
          fileName: file.name,
          storedFileName: fileName,
          fileSize: file.size,
          contentType: file.type,
          url: fileUrl,
        });
      } catch (error) {
        uploadResults.push({
          fileName: file.name,
          success: false,
          error: `上传失败: ${error.message}`
        });
      }
    }

    // 返回所有文件的上传结果
    return NextResponse.json({
      success: uploadResults.every(result => result.success),
      results: uploadResults
    });

  } catch (error) {
    console.error('R2批量上传错误:', error);
    return NextResponse.json(
      { error: `批量上传失败: ${error.message}` },
      { status: 500 }
    );
  }
}