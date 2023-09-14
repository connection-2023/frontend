'use client';
import { DANCE_GENRE, DANCE_GENRE_ENGLISH } from '@/constants/constants';
import React, { useState } from 'react';

const GenreFilter = () => {
  const [filterList, setFilterList] = useState<string[]>([]);

  const changeFilterList = (genre: string) => {
    setFilterList((prev) =>
      prev.includes(genre)
        ? prev.filter((listGenre) => listGenre !== genre)
        : [...prev, genre],
    );
  };

  return (
    <ul className="scrollbar scrollbar-track-[#F5F5F5] scrollbar-thumb-[#B6B6B6] scrollbar-thumb-rounded-lg scrollbar-w-1 flex max-h-80 w-72 select-none flex-col gap-3 overflow-y-auto  py-3 pr-2.5">
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
  );
};

export default GenreFilter;
