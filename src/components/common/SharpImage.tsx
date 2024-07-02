'use client';

import Image from 'next/image';

type SafeNumber = number | `${number}`;
type SharpImageProps = Omit<
  JSX.IntrinsicElements['img'],
  'src' | 'srcSet' | 'ref' | 'alt' | 'width' | 'height' | 'loading'
> & {
  src: string;
  alt: string;
  width?: SafeNumber | undefined;
  height?: SafeNumber | undefined;
  fill?: boolean;
  sizes?: string | undefined;
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
  fill = false,
  sizes,
  className,
  priority = false,
  loading = 'lazy',
  placeholder = 'empty',
  blurDataURL,
  ...props
}: SharpImageProps) => {
  const params = new URLSearchParams({ src });

  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());

  const optimizedSrc = `/api/optimize-image?${params.toString()}`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <Image
      unoptimized
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      sizes={sizes}
      priority={priority}
      loading={loading}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      className={className}
      {...props}
    />
  );
};

export default SharpImage;
