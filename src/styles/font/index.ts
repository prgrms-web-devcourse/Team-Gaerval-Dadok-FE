import localFont from 'next/font/local';

export const LineSeedKR = localFont({
  src: [
    {
      path: './LINESeedKR-Th.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './LINESeedKR-Rg.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './LINESeedKR-Bd.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-lineseed',
});
