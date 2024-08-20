import NextImage from 'next/image';
import type { ComponentPropsWithRef } from 'react';

type ImageProps = Omit<ComponentPropsWithRef<typeof NextImage>, 'src'> & {
  src: string;
};

const Image = ({
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
}: ImageProps) => {
  const params = new URLSearchParams({ src });

  // if (width) params.append('width', width.toString());
  // if (height) params.append('height', height.toString());

  const optimizedSrc = `/api/imageOptimize?${params.toString()}`;

  return (
    <NextImage
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

export default Image;
