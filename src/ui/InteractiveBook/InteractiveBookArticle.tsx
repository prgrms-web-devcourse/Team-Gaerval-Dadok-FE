'use client';

import { Box } from '@chakra-ui/react';
import { usePalette } from 'color-thief-react';
import Image from 'next/image';
import { NextPage } from 'next/types';

interface PropTypes {
  imgSrc: string;
}

const InteractiveBookArticle: NextPage<PropTypes> = props => {
  const { data, loading } = usePalette(props.imgSrc, 2, 'hex');

  if (loading) return;

  return (
    <Box
      width="6rem"
      height="9rem"
      position="relative"
      transform="rotateY(30deg)"
      transition="1s ease"
      style={{ transformStyle: 'preserve-3d' }}
      sx={{
        // 책 표지 스타일링
        '> img': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '6rem',
          height: '9rem',
          transform: 'translateZ(2.5rem)',
          borderRadius: '0 0.08rem 0.08rem 0',
          boxShadow: '0.2rem 0.1rem 0.2rem #666666',
        },
        // 책 옆면 스타일링
        '::before': {
          position: 'absolute',
          content: '""',
          backgroundColor: data[0],
          right: '0',
          top: '-0.21rem',
          width: '3rem',
          height: '9.4rem',
          transform: 'translateX(-3.56rem) rotateY(-105deg)',
        },
      }}
    >
      <Image
        width={128}
        height={128}
        src={props.imgSrc}
        alt=""
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  );
};

export default InteractiveBookArticle;
