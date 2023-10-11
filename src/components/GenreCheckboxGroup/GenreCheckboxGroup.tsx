import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { classCreateState } from '@/recoil/Create/atoms';
import { useFormContext, useFormState } from 'react-hook-form';
import GenreListAddition from './GenreListAddition';
import { DANCE_GENRE } from '@/constants/constants';
import { toggleSelection } from '@/utils/toggleSelection';
import { CheckMarkSVG } from '../../../public/icons/svg';

const GenreCheckboxGroup = () => {
  const classData = useRecoilValue(classCreateState);
  const formMethods = useFormContext();
  const { setValue, clearErrors, register } = formMethods;
  const { errors } = useFormState({ control: formMethods.control });

  const [selectGenreList, setSelectGenreList] = useState<string[]>(
    classData['장르'],
  );
  const combinedArray = ['전체', ...DANCE_GENRE, ...classData['장르']];
  const [genreList, setGenreList] = useState<string[]>([
    ...new Set(combinedArray),
  ]);

  useEffect(() => {
    setValue('장르', selectGenreList);
    clearErrors('장르');
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
        id="장르"
        className={`w-1/6 text-lg font-bold ${
          errors.장르 && 'animate-heartbeat text-main-color'
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
              {...register('장르', {
                validate: (value) => value && value.length > 0,
              })}
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
