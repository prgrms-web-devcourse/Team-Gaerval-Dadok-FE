import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import axios from 'axios';

import fs from 'fs';
import path from 'path';

const optimizeImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { src, width, height } = req.query;

  if (!src || typeof src !== 'string') {
    res.status(400).send('Missing or invalid "src" query parameter');
    return;
  }

  const widthInt = width ? parseInt(width as string, 10) : null;
  const heightInt = height ? parseInt(height as string, 10) : null;

  try {
    let imageBuffer: Buffer;

    if (src.startsWith('http://') || src.startsWith('https://')) {
      // 외부 이미지 URL 처리
      const response = await axios.get(src, { responseType: 'arraybuffer' });
      imageBuffer = Buffer.from(response.data, 'binary');
    } else {
      // 로컬 이미지 경로 처리
      const imagePath = path.resolve('./public', src);
      imageBuffer = fs.readFileSync(imagePath);
    }

    // 이미지 최적화 및 크기 조정
    let image = sharp(imageBuffer).webp();
    if (widthInt || heightInt) {
      image = image.resize(widthInt, heightInt);
    }
    const optimizedImageBuffer = await image.toBuffer();

    // 응답 헤더 설정 및 최적화된 이미지 전송
    res.setHeader('Content-Type', 'image/webp');
    res.send(optimizedImageBuffer);
  } catch (error) {
    console.error('Error optimizing image:', error);
    res.status(500).send('Error optimizing image');
  }
};

export default optimizeImage;
