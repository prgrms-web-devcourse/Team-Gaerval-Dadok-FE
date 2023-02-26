import InteractiveBookArticle from './InteractiveBookArticle';
import InteractiveBookContainer from './InteractiveBookContainer';

type ImgSrcProps = {
  imgSrc: string;
};

const InteractiveBook = ({ imgSrc }: ImgSrcProps) => {
  return (
    <InteractiveBookContainer>
      <InteractiveBookArticle src={imgSrc} />
    </InteractiveBookContainer>
  );
};

export default InteractiveBook;
