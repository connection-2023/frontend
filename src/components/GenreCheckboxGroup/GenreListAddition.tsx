import { FormEvent, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { PlusesSVG } from '@/icons/svg';

const GenreListAddition = ({
  addGenreList,
}: {
  addGenreList: (value: string) => void;
}) => {
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
    <div className="w-full">
      <form
        className="relative mt-3 w-28 sm:w-1/5"
        onSubmit={(e) => addSubmit(e)}
        ref={formRef}
      >
        <input
          ref={inputRef}
          className="peer h-8 w-full cursor-pointer rounded-md border border-solid border-gray-500 pl-2 pr-6 text-sm focus:outline-none"
          placeholder="+ 직접입력"
          required
          onFocus={() => {
            setShowAddButton(true);
          }}
        />
        {showAddButton && (
          <button className="absolute right-1 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-sub-color1">
            <PlusesSVG className="fill-white" />
          </button>
        )}
      </form>
    </div>
  );
};

export default GenreListAddition;
