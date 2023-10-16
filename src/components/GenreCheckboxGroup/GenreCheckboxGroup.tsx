import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { classCreateState } from '@/recoil/Create/atoms';
import { useFormContext } from 'react-hook-form';
import GenreList from './GenreList';
import { toggleSelection } from '@/utils/toggleSelection';
import { DANCE_GENRE } from '@/constants/constants';

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
    setSelectGenreList((prevList) => [...prevList, value]);
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
      <GenreList
        genreList={genreList}
        selectGenreList={selectGenreList}
        changeSelectGenreList={changeSelectGenreList}
        addGenreList={addGenreList}
      />
    </div>
  );
};

export default GenreCheckboxGroup;
