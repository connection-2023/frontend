import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { classCreateState } from '@/recoil/Create/atoms';
import { useFormContext } from 'react-hook-form';
import GenreListAddition from './GenreListAddition';
import { toggleSelection } from '@/utils/toggleSelection';
import { DANCE_GENRE } from '@/constants/constants';
import { CheckMarkSVG } from '../../../public/icons/svg';

const GenreCheckboxGroup = ({
  onChange,
}: {
  onChange?: (data: string[]) => void;
}) => {
  const classData = useRecoilValue(classCreateState);
  const {
    formState: { errors },
  } = useFormContext();

  const [selectGenreList, setSelectGenreList] = useState<string[]>(
    classData.classGenre,
  );
  const combinedArray = ['전체', ...DANCE_GENRE, ...classData.classGenre];
  const [genreList, setGenreList] = useState<string[]>([
    ...new Set(combinedArray),
  ]);

  useEffect(() => {
    if (onChange) {
      onChange(selectGenreList);
    }
  }, [selectGenreList]);

  const changeSelectGenreList = (genre: string, isChecked: boolean) => {
    const toggleData = {
      value: genre,
      allList: genreList,
      currentList: selectGenreList,
      selectAllName: '전체',
      isValueChecked: isChecked,
    };

    const newList = toggleSelection(toggleData);

    setSelectGenreList(newList);
  };

  const addGenreList = (value: string) => {
    const newList = [...new Set([...genreList, value])];
    setGenreList(newList);
    setSelectGenreList((currentList) => [...currentList, value]);
  };

  return (
    <div className="flex w-full">
      <h2
        id="classGenre"
        className={`w-1/6 text-lg font-bold ${
          errors.classGenre && 'animate-vibration text-main-color'
        }`}
      >
        장르
      </h2>
      <ul className="flex w-5/6 flex-wrap">
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
                  ? 'select-shadow-border bg-[#F5F5F5] fill-sub-color1 font-bold'
                  : 'shadow-border fill-sub-color2 text-sub-color2'
              } flex h-8 w-1/5 cursor-pointer items-center justify-center gap-1 text-sm`}
              onClick={() => changeSelectGenreList(genre, !isSelected)}
            >
              <CheckMarkSVG />
              <p className="max-w-[90%] truncate">{genre}</p>
            </li>
          );
        })}
        <GenreListAddition addGenreList={addGenreList} />
      </ul>
    </div>
  );
};

export default GenreCheckboxGroup;
