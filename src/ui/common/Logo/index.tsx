import Image from 'next/image';

const Logo = ({ width = 61 }: { width?: number }) => {
  const height = width * (60 / 61);
  return (
    <Image
      src="/images/logo.svg"
      alt="다독다독 로고"
      width={width}
      height={height}
      priority
    />
  );
};

export default Logo;
