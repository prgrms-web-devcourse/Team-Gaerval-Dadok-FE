import { forwardRef } from 'react';

import { IconSearch } from '@public/icons';

const BookSearchInput = () => {
  return (
    <div className="flex w-full items-center gap-[2rem] border-b-[0.05rem] border-black-900 p-[1rem] focus-within:border-main-900">
      <IconSearch className="fill-black h-[2.1rem] w-[2.1rem]" />
      <input
        className={`h-[1.6rem] w-full appearance-none text-sm font-normal focus:outline-none`}
        placeholder="책 제목, 작가를 검색해보세요"
      />
    </div>
  );
};

export default forwardRef(BookSearchInput);
