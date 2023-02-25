import { NextPage } from 'next/types';
import InteractiveBookArticle from './InteractiveBookArticle';
import InteractiveBookContainer from './interactiveBookContainer';

type StaticImageData = {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
};

interface PropTypes {
  img: StaticImageData;
}

const InteractiveBook: NextPage<PropTypes> = props => {
  return (
    <InteractiveBookContainer>
      <InteractiveBookArticle imgSrc={props.img.src} />
    </InteractiveBookContainer>
  );
};

export default InteractiveBook;
