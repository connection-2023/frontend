import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DANCE_GENRE } from '@/constants/constants';
import { toggleSelection } from '@/utils/toggleSelection';
import GenreList from './GenreList';

interface GenreCheckboxGroupProps {
  onChange?: (data: string[]) => void;
  defaultValue?: string[];
}

const GenreCheckboxGroup = ({
  onChange,
  defaultValue = [],
}: GenreCheckboxGroupProps) => {
  const [selectGenreList, setSelectGenreList] =
    useState<string[]>(defaultValue);
  const combinedArray = ['전체', ...DANCE_GENRE, ...defaultValue];
  const [genreList, setGenreList] = useState<string[]>([
    ...new Set(combinedArray),
  ]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

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

    if (onChange) {
      onChange(newList);
    }
  };

  const addGenreList = (value: string) => {
    const newList = [...new Set([...genreList, value])];
    setGenreList(newList);
    setSelectGenreList((prevList) => [...prevList, value]);
  };

  return (
    <GenreList
      genreList={genreList}
      selectGenreList={selectGenreList}
      changeSelectGenreList={changeSelectGenreList}
      addGenreList={addGenreList}
    />
  );
};

export default GenreCheckboxGroup;
