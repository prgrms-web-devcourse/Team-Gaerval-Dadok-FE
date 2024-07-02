import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import axios from 'axios';

const optimizeImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { src } = req.query;

  if (!src || typeof src !== 'string') {
    res.status(400).send('Missing or invalid "src" query parameter');
    return;
  }

  try {
    // 외부 API로부터 이미지 가져오기
    const response = await axios.get(src, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

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
