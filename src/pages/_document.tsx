import { LineSeed } from '@/styles/font';
import { Html, Main, Head, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="ko">
      <Head />
      <body className={LineSeed.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
