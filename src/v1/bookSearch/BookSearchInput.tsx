import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';

import { IconSearch } from '@public/icons';

type BookSearchInputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
} & ComponentPropsWithoutRef<'input'>;

const BookSearchInput = ({ onChange, ...props }: BookSearchInputProps) => {
  return (
    <div className="flex w-full items-center gap-[2rem] border-b-[0.05rem] border-black-900 p-[1rem] focus-within:border-main-900">
      <IconSearch className="fill-black h-[2.1rem] w-[2.1rem]" />
      <input
        className={`w-full appearance-none text-sm font-normal focus:outline-none`}
        placeholder="책 제목, 작가를 검색해보세요"
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default BookSearchInput;
