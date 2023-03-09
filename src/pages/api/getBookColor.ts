import type { NextApiRequest, NextApiResponse } from 'next';
import Vibrant from 'node-vibrant';

export default async function getThumbnailColor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { url },
    method,
  } = req;

  const palette = await Vibrant.from(url as string).getPalette();

  const colors = Object.values(palette).map(swatches => swatches?.hex || '');

  switch (method) {
    case 'GET':
      res.status(200).json({ colors });
      break;

    default:
      res.setHeader('Allow', ['GET']);
  }
}
