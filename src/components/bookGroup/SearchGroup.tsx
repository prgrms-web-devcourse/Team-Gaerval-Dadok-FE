import { IconSearch } from '@public/icons';

interface SearchGroupInputProps {
  onClick?: () => void;
}

const SearchGroupInput = ({ onClick }: SearchGroupInputProps) => {
  return (
    <section className="flex">
      <div className="rounded-bl-[0.4rem] rounded-tl-[0.4rem] border-[0.1rem] border-r-[0rem] border-solid border-black-100 bg-white pl-[1rem] pt-[0.8rem]">
        <IconSearch className="fill-placeholder" />
      </div>
      <input
        id="groupSearching"
        className="h-[3.7rem] w-full rounded-br-[0.4rem] rounded-tr-[0.4rem] border-[0.1rem] border-l-[0rem] border-black-100 pl-[2rem] text-[1.4rem] leading-[1.6rem] placeholder:text-placeholder focus:outline-0 disabled:cursor-not-allowed disabled:bg-white"
        placeholder="모임을 검색해보세요"
        type="text"
        onClick={onClick}
        readOnly
      />
    </section>
  );
};

export default SearchGroupInput;
