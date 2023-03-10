import type { NextApiRequest, NextApiResponse } from 'next';
import { Stream } from 'stream';

export default async function getBookImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query as { url: string };

  const readalbeStream = (await fetch(url).then(
    response => response.body
  )) as NodeJS.ReadableStream;

  if (!readalbeStream) {
    return res.status(500).json({ message: 'Internal server error' });
  }

  const passThrough = new Stream.PassThrough();

  Stream.pipeline(readalbeStream, passThrough, err => {
    if (err) return res.status(500).json({ message: 'Internal server error' });
  });

  passThrough.pipe(res);
}
