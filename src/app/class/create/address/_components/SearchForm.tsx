import { FormEvent } from 'react';
import { SearchSVG } from '../../../../../../public/icons/svg';

const SearchForm = ({
  addressSearch,
}: {
  addressSearch: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
  return (
    <form className="relative" onSubmit={(e) => addressSearch(e)}>
      <input
        className="font- h-10 w-full border-b border-solid border-sub-color1 text-2xl font-semibold focus:outline-none"
        placeholder="도로명, 건물명, 지번 입력"
        name="inputAddress"
        type="text"
      />
      <button>
        <SearchSVG className="absolute right-0 top-1 h-7 w-7 fill-sub-color1" />
      </button>
    </form>
  );
};

export default SearchForm;
