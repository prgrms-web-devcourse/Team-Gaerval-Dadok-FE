import { APIBook } from '@/types/book';
import {
  imgChatgptBook,
  imgFunctionalBook,
  imgJsDeepDiveBook,
  imgRefactoringBook,
} from '@public/images';

// 책장 정보 조회
// /api/bookshelves?userId=1
export const USERS_BOOKSHELF_INFO = {
  bookshelfId: 1,
  bookshelfName: '책장이름',
  isPublic: true,
  userId: 1,
  username: 'username',
  userNickname: 'userNickname',
  userProfileImage: 'http://dadok.com/images',
  job: {
    jobGroupKoreanName: '개발',
    jobGroupName: 'DEVELOPMENT',
    jobNameKoreanName: '백엔드 개발자',
    jobName: 'BACKEND_DEVELOPER',
    order: 5,
  },
};

// 책장 책 조회
// /api/bookshelves/3/books?type=READ&pageSize=10&bookCursorId=3&sortDirection=DESC
export const USERS_BOOKSHELF_BOOKLIST = {
  count: 7,
  books: [
    {
      bookId: 1,
      title: '미움받을 용기',
      author: '기시미 이치로, 고가 후미타케',
      isbn: '9788996991342',
      contents:
        '인간은 변할 수 있고, 누구나 행복해 질 수 있다. 단 그러기 위해서는 ‘용기’가 필요하다고 말한 철학자가 있다.',
      imageUrl:
        'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6291759',
      url: 'https://search.daum.net/search?w=bookpage&bookId=1467038&q=%EB%AF%B8%EC%9B%80%EB%B0%9B%EC%9D%84+%EC%9A%A9%EA%B8%B0',
      publisher: '인플루엔셜',
    },
    {
      bookId: 2,
      title: '미움받을 용기',
      author: '기시미 이치로, 고가 후미타케',
      isbn: '9788996991342',
      contents:
        '인간은 변할 수 있고, 누구나 행복해 질 수 있다. 단 그러기 위해서는 ‘용기’가 필요하다고 말한 철학자가 있다.',
      imageUrl:
        'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6052931%3Ftimestamp%3D20221011185513',
      url: 'https://search.daum.net/search?w=bookpage&bookId=1467038&q=%EB%AF%B8%EC%9B%80%EB%B0%9B%EC%9D%84+%EC%9A%A9%EA%B8%B0',
      publisher: '인플루엔셜',
    },
    {
      bookId: 3,
      title: '미움받을 용기',
      author: '기시미 이치로, 고가 후미타케',
      isbn: '9788996991342',
      contents:
        '인간은 변할 수 있고, 누구나 행복해 질 수 있다. 단 그러기 위해서는 ‘용기’가 필요하다고 말한 철학자가 있다.',
      imageUrl:
        'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5477653%3Ftimestamp%3D20221107233622',
      url: 'https://search.daum.net/search?w=bookpage&bookId=1467038&q=%EB%AF%B8%EC%9B%80%EB%B0%9B%EC%9D%84+%EC%9A%A9%EA%B8%B0',
      publisher: '인플루엔셜',
    },
    {
      bookId: 3,
      title: '미움받을 용기',
      author: '기시미 이치로, 고가 후미타케',
      isbn: '9788996991342',
      contents:
        '인간은 변할 수 있고, 누구나 행복해 질 수 있다. 단 그러기 위해서는 ‘용기’가 필요하다고 말한 철학자가 있다.',
      imageUrl:
        'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5326912%3Ftimestamp%3D20221231221935',
      url: 'https://search.daum.net/search?w=bookpage&bookId=1467038&q=%EB%AF%B8%EC%9B%80%EB%B0%9B%EC%9D%84+%EC%9A%A9%EA%B8%B0',
      publisher: '인플루엔셜',
    },
    {
      bookId: 3,
      title: '미움받을 용기',
      author: '기시미 이치로, 고가 후미타케',
      isbn: '9788996991342',
      contents:
        '인간은 변할 수 있고, 누구나 행복해 질 수 있다. 단 그러기 위해서는 ‘용기’가 필요하다고 말한 철학자가 있다.',
      imageUrl:
        'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1624084%3Ftimestamp%3D20230217231000',
      url: 'https://search.daum.net/search?w=bookpage&bookId=1467038&q=%EB%AF%B8%EC%9B%80%EB%B0%9B%EC%9D%84+%EC%9A%A9%EA%B8%B0',
      publisher: '인플루엔셜',
    },
    {
      bookId: 3,
      title: '미움받을 용기',
      author: '기시미 이치로, 고가 후미타케',
      isbn: '9788996991342',
      contents:
        '인간은 변할 수 있고, 누구나 행복해 질 수 있다. 단 그러기 위해서는 ‘용기’가 필요하다고 말한 철학자가 있다.',
      imageUrl:
        'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038',
      url: 'https://search.daum.net/search?w=bookpage&bookId=1467038&q=%EB%AF%B8%EC%9B%80%EB%B0%9B%EC%9D%84+%EC%9A%A9%EA%B8%B0',
      publisher: '인플루엔셜',
    },
    {
      bookId: 3,
      title: '미움받을 용기',
      author: '기시미 이치로, 고가 후미타케',
      isbn: '9788996991342',
      contents:
        '인간은 변할 수 있고, 누구나 행복해 질 수 있다. 단 그러기 위해서는 ‘용기’가 필요하다고 말한 철학자가 있다.',
      imageUrl:
        'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5140806%3Ftimestamp%3D20230217200817',
      url: 'https://search.daum.net/search?w=bookpage&bookId=1467038&q=%EB%AF%B8%EC%9B%80%EB%B0%9B%EC%9D%84+%EC%9A%A9%EA%B8%B0',
      publisher: '인플루엔셜',
    },
  ],
  empty: false,
  first: true,
  last: true,
};

export const DUMMY_BOOKS: APIBook[] = [
  {
    bookId: 0,
    title: '챗지피티',
    author: '기시미 이치로, 고가 후미타케',
    contents: '뭘봐',
    isbn: '9788996991342',
    imageUrl: imgChatgptBook.src,
    url: 'https://search.daum.net/search?w=bookpage&bookId=1467038&q=%EB%AF%B8%EC%9B%80%EB%B0%9B%EC%9D%84+%EC%9A%A9%EA%B8%B0',
    publisher: '인플루엔셜',
  },
  {
    bookId: 1,
    title: '함수형 코딩',
    author: '기시미 이치로, 고가 후미타케',
    contents: '뭘봐',
    isbn: '9788996991342',
    imageUrl: imgFunctionalBook.src,
    url: 'https://search.daum.net/search?w=bookpage&bookId=1467038&q=%EB%AF%B8%EC%9B%80%EB%B0%9B%EC%9D%84+%EC%9A%A9%EA%B8%B0',
    publisher: '인플루엔셜',
  },
  {
    bookId: 2,
    title: '자바스크립트 딥다이브',
    author: '기시미 이치로, 고가 후미타케',
    contents: '뭘봐',
    isbn: '9788996991342',
    imageUrl: imgJsDeepDiveBook.src,
    url: 'https://search.daum.net/search?w=bookpage&bookId=1467038&q=%EB%AF%B8%EC%9B%80%EB%B0%9B%EC%9D%84+%EC%9A%A9%EA%B8%B0',
    publisher: '인플루엔셜',
  },
  {
    bookId: 3,
    title: '리팩터링 2판',
    author: '기시미 이치로, 고가 후미타케',
    contents: '뭘봐',
    isbn: '9788996991342',
    imageUrl: imgRefactoringBook.src,
    url: 'https://search.daum.net/search?w=bookpage&bookId=1467038&q=%EB%AF%B8%EC%9B%80%EB%B0%9B%EC%9D%84+%EC%9A%A9%EA%B8%B0',
    publisher: '인플루엔셜',
  },
  // {
  //   id: '4',
  //   src: imgChatgptBook.src,
  //   title: '챗지피티',
  // },
  // {
  //   id: '5',
  //   src: imgFunctionalBook.src,
  //   title: '함수형 코딩',
  // },
  // {
  //   id: '6',
  //   src: imgJsDeepDiveBook.src,
  //   title: '자바스크립트 딥다이브',
  // },
  // {
  //   id: '7',
  //   src: imgRefactoringBook.src,
  //   title: '리팩터링 2판',
  // },
];

export const RECOMMENDED_BOOKS = [
  {
    id: 292929,
    imageURL: 'https://image.yes24.com/goods/102124327/L',
    title: '이펙티브 타입스크립트',
  },
  {
    id: 34345,
    imageURL: 'https://image.yes24.com/goods/11681152/L',
    title: 'Clean Code',
  },
  {
    id: 292439,
    imageURL: 'https://image.yes24.com/goods/24259565/L',
    title: 'Java의 정석',
  },
  {
    id: 242439,
    imageURL: 'https://image.yes24.com/goods/78586788/L',
    title: '코어 자바스크립트',
  },
  {
    id: 2252439,
    imageURL: 'https://image.yes24.com/goods/108887922/L',
    title: '면접을 위한 CS 전공지식 노트',
  },
  {
    id: 345555345,
    imageURL: 'https://image.yes24.com/goods/115852769/L',
    title: '개발자 원칙',
  },
  {
    id: 29445442439,
    imageURL: 'https://image.yes24.com/goods/112028850/L',
    title: '머신러닝&딥러닝',
  },
  {
    id: 2422222439,
    imageURL: 'https://image.yes24.com/goods/79378905/L',
    title: '개발자의 글쓰기',
  },
  {
    id: 225444449,
    imageURL: 'https://image.yes24.com/goods/17926925/L',
    title: '유지보수하기 어렵게 코딩하는 방법',
  },
];
