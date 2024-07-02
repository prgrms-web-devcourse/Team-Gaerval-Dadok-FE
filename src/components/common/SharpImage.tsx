import { useMemo } from 'react';

type SafeNumber = number | `${number}`;
// type StaticImageData = {
//   src: string;
//   height: number;
//   width: number;
//   blurDataURL?: string;
//   blurWidth?: number;
//   blurHeight?: number;
// };
// type StaticRequire = {
//   default: StaticImageData;
// };
// type StaticImport = StaticRequire | StaticImageData;

type ImageProps = Omit<
  JSX.IntrinsicElements['img'],
  'src' | 'srcSet' | 'ref' | 'alt' | 'width' | 'height' | 'loading'
> & {
  // src: string | StaticImport;
  src: string;
  alt: string;
  width?: SafeNumber | undefined;
  height?: SafeNumber | undefined;
  fill?: boolean;
  // sizes?: string | undefined;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
};

const SharpImage = ({
  src,
  alt,
  width,
  height,
  // fill,
  // sizes,
  className,
}: // priority = false,
// loading = 'lazy',
// placeholder = 'blur',
// blurDataURL,
ImageProps) => {
  const optimizedSrc = `/api/optimize-image?src=${encodeURIComponent(src)}`;
  const sizeClasses = useMemo(() => {
    const widthClass = width ? `${Number(width) / 10}` : '';
    const heightClass = height ? `${Number(height) / 10}` : '';

    return [widthClass, heightClass].join(' ');
  }, [width, height]);

  console.log('size: ', sizeClasses);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={optimizedSrc}
      alt={alt}
      className={`${sizeClasses} ${className}`}
    />
  );
};

export default SharpImage;
