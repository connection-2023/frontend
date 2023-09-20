import { useEffect, useState } from 'react';
import FilterModal from './FilterModal';
import { DANCE_GENRE, DANCE_GENRE_ENGLISH } from '../../constants/constants';

interface IGenreFilterProps {
  updateFilterOption: (label: string, option: any) => void;
  filterOption: string[];
}

const GenreFilter = ({
  updateFilterOption,
  filterOption,
}: IGenreFilterProps) => {
  const [filterList, setFilterList] = useState<string[]>(filterOption);
  const label = '장르';

  const changeFilterList = (genre: string) => {
    setFilterList((prev) =>
      prev.includes(genre)
        ? prev.filter((listGenre) => listGenre !== genre)
        : [...prev, genre],
    );
  };

  useEffect(() => {
    setFilterList(filterOption);
  }, [filterOption]);

  const onReset = () => {
    setFilterList([]);
    updateFilterOption(label, []);
  };

  const onApply = () => {
    updateFilterOption(label, filterList);
  };

  return (
    <FilterModal label={label} onReset={onReset} onApply={onApply}>
      <ul className="flex max-h-80 w-72 select-none flex-col gap-3 overflow-y-auto py-3 pr-2.5 scrollbar scrollbar-track-[#F5F5F5] scrollbar-thumb-sub-color2  scrollbar-thumb-rounded-lg scrollbar-w-1">
        {DANCE_GENRE.map((genre, index) => {
          const isGenreIncluded = filterList.includes(genre);

          return (
            <li key={genre} className="ml-4">
              <label
                className={`flex cursor-pointer items-center
             ${isGenreIncluded && 'font font-bold text-sub-color1'}`}
              >
                <input
                  type="checkbox"
                  checked={isGenreIncluded}
                  onChange={() => changeFilterList(genre)}
                  className="mr-1 h-[1.12rem] w-[1.12rem] accent-sub-color1"
                />
                {genre + DANCE_GENRE_ENGLISH[index]}
              </label>
            </li>
          );
        })}
      </ul>
    </FilterModal>
  );
};

export default GenreFilter;
