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
  const isGif = src.endsWith('.gif');

  const getImageBuffer = async () => {
    if (src.startsWith('http://') || src.startsWith('https://')) {
      // 외부 이미지 URL 처리
      const response = await axios.get(src, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');

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

    // 이미지 리사이징
    if (widthInt || heightInt) {
      image.resize(widthInt, heightInt);
    }

    const optimizedImageBuffer = await image.toBuffer();

    // 응답 헤더 설정 및 최적화된 이미지 전송
    isGif
      ? res.setHeader('Content-Type', 'image/gif')
      : res.setHeader('Content-Type', 'image/webp');
    res.send(optimizedImageBuffer);
  } catch (error) {
    console.error('Error optimizing image:', error);
    res.status(500).send('Error optimizing image');
  }
};

export default optimizeImage;
