import { DANCE_GENRE, DANCE_GENRE_ENGLISH } from '@/constants/constants';

interface GenreFilter {
  filterList: string[];
  changeFilterList: (genre: string) => void;
}

const GenreFilter = ({ filterList, changeFilterList }: GenreFilter) => {
  return (
    <ul className="flex select-none flex-col gap-3 overflow-y-auto py-3 pr-2.5 scrollbar scrollbar-track-gray-900 scrollbar-thumb-gray-500 scrollbar-thumb-rounded-lg scrollbar-w-1  sm:max-h-80 sm:w-72">
      {DANCE_GENRE.map((genre, index) => {
        const isGenreIncluded =
          genre === '전체' ? !filterList.length : filterList.includes(genre);

        return (
          <li key={genre} className="ml-4 flex items-center">
            <input
              id={genre}
              type="checkbox"
              checked={isGenreIncluded}
              onChange={() => changeFilterList(genre)}
              className="mr-1 h-[1.12rem] w-[1.12rem] accent-sub-color1"
            />
            <label
              htmlFor={genre}
              className={`cursor-pointer
             ${isGenreIncluded && 'font font-bold text-sub-color1'}`}
            >
              {genre + DANCE_GENRE_ENGLISH[index]}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default GenreFilter;
