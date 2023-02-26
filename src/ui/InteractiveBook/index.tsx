import InteractiveBookArticle from './InteractiveBookArticle';

type ImgSrcProps = {
  imgSrc: string;
};

const InteractiveBook = ({ imgSrc }: ImgSrcProps) => {
  return <InteractiveBookArticle src={imgSrc} />;
};

export default InteractiveBook;
