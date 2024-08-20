import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const src = searchParams.get('src');
  // const width = searchParams.get('width');
  // const height = searchParams.get('height');

  if (!src || typeof src !== 'string') {
    return new NextResponse('Missing or invalid "src" query parameter', {
      status: 400,
    });
  }

  // const widthInt = width ? parseInt(width as string, 10) : null;
  // const heightInt = height ? parseInt(height as string, 10) : null;
  const isGif = src.endsWith('.gif');

  const getImageBuffer = async () => {
    if (src.startsWith('http://') || src.startsWith('https://')) {
      // 외부 이미지 URL 처리
      const response = await fetch(src, {
        next: { revalidate: 60 * 60 * 24 },
        headers: {
          responseType: 'arraybuffer',
        },
      });
      const imageBuffer = await response.arrayBuffer();

      return imageBuffer;
    } else {
      // 로컬 이미지 경로 처리
      const imagePath = path.join('./public', src);
      const imageBuffer = fs.readFileSync(imagePath);

      return imageBuffer;
    }
  };

  try {
    const imageBuffer = await getImageBuffer();

    // 이미지 최적화 작업
    const image = isGif
      ? sharp(imageBuffer, { animated: true }).gif()
      : sharp(imageBuffer).webp();

    // // 이미지 리사이징
    // if (widthInt || heightInt) {
    //   image.resize(widthInt, heightInt);
    // }

    const optimizedImageBuffer = await image.toBuffer();

    // 응답 헤더 설정
    const contentTypeHeader = isGif
      ? {
          'Content-Type': 'image/gif',
        }
      : {
          'Content-Type': 'image/webp',
        };

    // 최적화된 이미지 전송
    return new NextResponse(optimizedImageBuffer, {
      status: 200,
      headers: contentTypeHeader,
    });
  } catch (error) {
    console.error('Error optimizing image:', error);
    return new NextResponse('Error optimizing image', {
      status: 500,
    });
  }
}
