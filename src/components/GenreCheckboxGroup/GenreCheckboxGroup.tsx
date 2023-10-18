import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import GenreList from './GenreList';
import { toggleSelection } from '@/utils/toggleSelection';
import { DANCE_GENRE } from '@/constants/constants';

interface GenreCheckboxGroupProps {
  onChange?: (data: string[]) => void;
  defaultValue?: string[];
}

const GenreCheckboxGroup = ({
  onChange,
  defaultValue = [],
}: GenreCheckboxGroupProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const [selectGenreList, setSelectGenreList] =
    useState<string[]>(defaultValue);
  const combinedArray = ['전체', ...DANCE_GENRE, ...defaultValue];
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
    <GenreList
      genreList={genreList}
      selectGenreList={selectGenreList}
      changeSelectGenreList={changeSelectGenreList}
      addGenreList={addGenreList}
    />
  );
};

export default GenreCheckboxGroup;
