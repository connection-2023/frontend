'use client';
import { useEffect, useState } from 'react';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { usefilterStore } from '@/store';
import GenreFilter from './GenreFilter';
import { DANCE_GENRE } from '../../../constants/constants';
import FilterAccordion from '../FilterAccordion';
import FilterModal from '../FilterModal';

interface IGenreFilterContainerProps {
  filterOption: string[];
}

const GenreFilterContainer = ({ filterOption }: IGenreFilterContainerProps) => {
  const { isfilterModalOpen } = usefilterStore((state) => ({
    isfilterModalOpen: state.isfilterModalOpen,
  }));
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

  return isfilterModalOpen ? (
    <FilterAccordion label={label} filterList={filterList} onReset={onReset}>
      <GenreFilter
        filterList={filterList}
        changeFilterList={changeFilterList}
      />
    </FilterAccordion>
  ) : (
    <FilterModal
      label={label}
      onReset={onReset}
      onApply={onApply}
      onClose={onClose}
    >
      <GenreFilter
        filterList={filterList}
        changeFilterList={changeFilterList}
      />
    </FilterModal>
  );
};

export default GenreFilterContainer;
