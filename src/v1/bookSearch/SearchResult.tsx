import { DATA_URL } from '@/constants/dataUrl';
import Image from 'next/image';
// import BookCover from '../book/BookCover';

const SearchResult = () => {
  return (
    <ul className="grid grid-cols-3 gap-[0.6rem]">
      {results.map((item, idx) => (
        <SearchResultItem
          key={`${idx}-${item.isbn}`}
          src={item.imageUrl}
          title={item.title}
        />
      ))}
    </ul>
  );
};

export default SearchResult;

const SearchResultItem = ({ src, title }: { src: string; title: string }) => {
  return (
    <li className="flex w-full min-w-[10.26rem] max-w-[11.5rem] flex-col justify-center gap-[0.5rem] rounded-[0.4rem] bg-white px-[1.25rem] py-[1rem] shadow-searchResultItem">
      <div className="max-h-[12.6rem] max-w-[9rem]">
        <Image
          src={src}
          alt={title}
          blurDataURL={DATA_URL['placeholder']}
          className={`object-fit h-full w-full rounded-[0.5rem] shadow-bookcover`}
          width={90}
          height={126}
        />
      </div>
      <p className="max-w-[9rem] text-center text-sm font-normal text-black-900">
        {title}
      </p>
    </li>
  );
};

const results = [
  {
    title: '리팩터링 2판',
    author: '마틴 파울러',
    imageUrl: '/images/book-cover/book4.jpeg',
    bestRank: 1,
    isbn: '12387612874632',
  },
  {
    title: '리팩터링 2판',
    author: '마틴 파울러',
    imageUrl: '/images/book-cover/book4.jpeg',
    bestRank: 2,
    isbn: '19797835733841',
  },
  {
    title: '리팩터링 2판',
    author: '마틴 파울러',
    imageUrl: '/images/book-cover/book4.jpeg',
    bestRank: 3,
    isbn: '38785435924823',
  },
  {
    title: '리팩터링 2판',
    author: '마틴 파울러',
    imageUrl: '/images/book-cover/book4.jpeg',
    bestRank: 4,
    isbn: '98878454353534',
  },
];
