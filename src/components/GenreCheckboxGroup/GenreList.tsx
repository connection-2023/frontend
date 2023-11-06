import React from 'react';
import { CheckMarkSVG } from '@/icons/svg';
import GenreListAddition from './GenreListAddition';

interface GenreListProps {
  genreList: string[];
  selectGenreList: string[];
  changeSelectGenreList: (genre: string, isChecked: boolean) => void;
  addGenreList: (value: string) => void;
}

const GenreList = ({
  genreList,
  selectGenreList,
  changeSelectGenreList,
  addGenreList,
}: GenreListProps) => {
  return (
    <ul className="flex w-full flex-wrap">
      {genreList.map((genre, index) => {
        const isSelected =
          genre !== '전체'
            ? selectGenreList.includes(genre)
            : genreList.length - 1 === selectGenreList.length;

        return (
          <li
            key={genre + index}
            className={`${
              isSelected
                ? 'select-shadow-border bg-gray-900 fill-sub-color1 font-bold'
                : 'shadow-border fill-gray-500 text-gray-500'
            } flex h-8 w-1/5 cursor-pointer items-center justify-center gap-1 text-sm`}
            onClick={() => changeSelectGenreList(genre, !isSelected)}
          >
            <div className="h-4 w-4 min-w-[16px]">
              <CheckMarkSVG />
            </div>
            <p className="max-w-[90%] truncate">{genre}</p>
          </li>
        );
      })}
      <GenreListAddition addGenreList={addGenreList} />
    </ul>
  );
};

export default GenreList;
