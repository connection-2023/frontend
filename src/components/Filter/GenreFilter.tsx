'use client';
import { useEffect, useState } from 'react';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import FilterModal from './FilterModal';
import { DANCE_GENRE, DANCE_GENRE_ENGLISH } from '../../constants/constants';

interface IGenreFilterProps {
  filterOption: string[];
}

const GenreFilter = ({ filterOption }: IGenreFilterProps) => {
  const [filterList, setFilterList] = useState<string[]>(filterOption);
  const { changeParams } = useChangeSearchParams();
  const label = '장르';

  const changeFilterList = (genre: string) => {
    setFilterList((prev) => {
      if (genre === '전체') {
        return [];
      }

      return prev.includes(genre)
        ? prev.filter((listGenre) => listGenre !== genre)
        : DANCE_GENRE.length - 2 > prev.length
          ? [...prev, genre]
          : [];
    });
  };

  useEffect(() => {
    setFilterList(filterOption);
  }, [filterOption]);

  const onReset = () => {
    setFilterList([]);
  };

  const onApply = () => {
    changeParams({ name: 'genre', value: filterList });
  };

  const onClose = () => {
    setFilterList(filterOption);
  };

  return (
    <FilterModal
      label={label}
      onReset={onReset}
      onApply={onApply}
      onClose={onClose}
    >
      <ul className="flex max-h-80 w-72 select-none flex-col gap-3 overflow-y-auto py-3 pr-2.5 scrollbar scrollbar-track-gray-900 scrollbar-thumb-gray-500  scrollbar-thumb-rounded-lg scrollbar-w-1">
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
    </FilterModal>
  );
};

export default GenreFilter;
