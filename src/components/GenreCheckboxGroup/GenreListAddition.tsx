import { FormEvent, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { PlusesSVG } from '../../../public/icons/svg';

const getWidthClass = (numColumns: number) => {
  switch (numColumns) {
    case 2:
      return 'w-1/2';
    case 3:
      return 'w-1/3';
    case 4:
      return 'w-1/4';
    case 5:
      return 'w-1/5';
    default:
      return '';
  }
};

interface GenreListAdditionProps {
  addGenreList: (value: string) => void;
  numColumns: number;
}

const GenreListAddition = ({
  addGenreList,
  numColumns,
}: GenreListAdditionProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef(null);
  const [showAddButton, setShowAddButton] = useState(false);

  useClickAway(formRef, () => {
    setShowAddButton(false);
  });

  const addSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current && inputRef.current.value) {
      addGenreList(inputRef.current.value);
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <form
      className={`relative mt-3 ${getWidthClass(numColumns)}`}
      onSubmit={(e) => addSubmit(e)}
      ref={formRef}
    >
      <input
        ref={inputRef}
        className="peer h-8 w-full cursor-pointer rounded-md border border-solid border-sub-color2 pl-2 pr-6 text-sm focus:outline-none"
        placeholder="+ 직접입력"
        required
        onFocus={() => {
          setShowAddButton(true);
        }}
      />
      {showAddButton && (
        <button className="absolute right-1 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-sub-color1">
          <PlusesSVG />
        </button>
      )}
    </form>
  );
};

export default GenreListAddition;
