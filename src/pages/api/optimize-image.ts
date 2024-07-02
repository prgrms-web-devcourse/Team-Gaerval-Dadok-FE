import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import axios from 'axios';

import fs from 'fs';
import path from 'path';

const optimizeImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { src } = req.query;

  if (!src || typeof src !== 'string') {
    res.status(400).send('Missing or invalid "src" query parameter');
    return;
  }

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

    // 이미지 최적화
    const optimizedImageBuffer = await sharp(imageBuffer).webp().toBuffer();

    // 응답 헤더 설정 및 최적화된 이미지 전송
    res.setHeader('Content-Type', 'image/webp');
    res.send(optimizedImageBuffer);
  } catch (error) {
    console.error('Error optimizing image:', error);
    res.status(500).send('Error optimizing image');
  }
};

export default optimizeImage;
