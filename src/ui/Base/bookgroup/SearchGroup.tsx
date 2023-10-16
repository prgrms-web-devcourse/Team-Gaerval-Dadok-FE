import { IconSearch } from '@public/icons';

interface SearchGroup {
  handler: () => void;
}

const SearchGroup = ({ handler }: SearchGroup) => {
  return (
    <div className="flex">
      <div className="rounded-bl-[0.4rem] rounded-tl-[0.4rem] border-[0.1rem] border-r-[0rem] border-solid border-black-100 bg-[#fffff] pl-[1rem] pt-[0.8rem]">
        <IconSearch fill="#AFAFAF" />
      </div>
      <input
        id="groupSearching"
        className="placeholder:text-Placeholder h-[3.7rem] w-full rounded-br-[0.4rem] rounded-tr-[0.4rem] border-[0.1rem] border-l-[0rem] border-black-100 pl-[2rem] text-[1.4rem] leading-[1.6rem] focus:outline-0"
        placeholder="모임을 검색해보세요"
        type="text"
        onClick={handler}
      />
    </div>
  );
};

export default SearchGroup;
