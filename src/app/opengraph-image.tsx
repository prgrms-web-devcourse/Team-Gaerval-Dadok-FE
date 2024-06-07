import { ImageResponse } from 'next/server';

// Route segment config
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const alt = 'About Acme';
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  // Font
  const lineSeedKR = fetch(
    new URL('../styles/font/LINESeedKR-Rg.woff2', import.meta.url)
  ).then(res => res.arrayBuffer());

  return new ImageResponse(
    (
      <div className="flex h-full w-full items-center justify-center bg-white text-2xl">
        다독다독
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'LINESeedKR',
          data: await lineSeedKR,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
