import NextImage from 'next/image';

type SafeNumber = number | `${number}`;
type ImageProps = Omit<
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

  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());

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
