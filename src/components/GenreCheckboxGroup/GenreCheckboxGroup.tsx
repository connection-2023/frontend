import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { classCreateState } from '@/recoil/Create/atoms';
import { useFormContext, useFormState } from 'react-hook-form';
import GenreListAddition from './GenreListAddition';
import { DANCE_GENRE } from '@/constants/constants';
import { CheckMarkSVG } from '../../../public/icons/svg';

const GenreCheckboxGroup = () => {
  const classData = useRecoilValue(classCreateState);
  const [selectGenreList, setSelectGenreList] = useState<string[]>(
    classData['장르'],
  );
  const [genreList, setGenreList] = useState([
    '전체',
    ...DANCE_GENRE,
    ...classData['장르'],
  ]);
  const [numColumns, setNumColumns] = useState(5);
  const formMethods = useFormContext();
  const { errors } = useFormState({ control: formMethods.control });

  useEffect(() => {
    const updateNumColumns = () => {
      const width = window.innerWidth;

      if (width < 600) {
        setNumColumns(2);
      } else if (width < 900) {
        setNumColumns(3);
      } else if (width < 1200) {
        setNumColumns(4);
      } else {
        setNumColumns(5);
      }
    };

    window.addEventListener('resize', updateNumColumns);
    updateNumColumns();

    return () => {
      window.removeEventListener('resize', updateNumColumns);
    };
  }, []);

  const { register, setValue, clearErrors } = formMethods;

  const changeSelectGenreList = (genre: string, isChecked: boolean) => {
    setSelectGenreList((currentList) => {
      let newList: string[];
      const isAlreadyIncluded = currentList.includes(genre);

      if (genre === '전체') {
        if (isChecked) {
          newList = [...genreList.filter((g) => g !== '전체')];
        } else {
          newList = [];
        }
      } else if (isChecked && !isAlreadyIncluded) {
        newList = [...currentList, genre];
      } else if (!isChecked && isAlreadyIncluded) {
        newList = currentList.filter((g) => g !== genre);
      } else {
        return currentList;
      }

      setValue('장르', newList);

      return newList;
    });

    clearErrors('장르');
  };

  const addGenreList = (value: string) => {
    setGenreList((currentList) => [...currentList, value]);
    setSelectGenreList((currentList) => [...currentList, value]);
  };

  return (
    <div className="grid grid-cols-6">
      <h2
        id="장르"
        className={`text-lg font-bold ${
          errors.장르 && 'animate-heartbeat text-main-color'
        }`}
      >
        장르
      </h2>
      <div className="col-span-5">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            {Array.from({ length: numColumns }).map((_, index) => (
              <col key={index} className="w-1/5" />
            ))}
          </colgroup>
          <tbody>
            {genreList
              .reduce((rows: JSX.Element[][], genre, index) => {
                if (index % numColumns === 0) {
                  rows.push([]);
                }
                const isSelected =
                  genre !== '전체'
                    ? selectGenreList.includes(genre)
                    : genreList.length - 1 === selectGenreList.length;

                rows[rows.length - 1].push(
                  <td
                    key={genre + index}
                    className={`border-solid ${
                      isSelected
                        ? 'border-2 border-sub-color1 bg-[#F5F5F5]'
                        : 'border border-sub-color2'
                    }
                    `}
                  >
                    <input
                      {...register('장르', {
                        validate: (value) => value && value.length > 0,
                      })}
                      id={genre}
                      type="checkbox"
                      value={genre}
                      className="hidden"
                      checked={isSelected}
                      onChange={(e) => {
                        changeSelectGenreList(genre, e.target.checked);
                      }}
                    />
                    <label
                      htmlFor={genre}
                      className={`flex h-8 w-full cursor-pointer select-none items-center justify-center gap-1 text-sm 
                       ${
                         isSelected
                           ? 'fill-sub-color1 font-bold '
                           : 'fill-sub-color2 text-sub-color2'
                       }
                      `}
                    >
                      <CheckMarkSVG />
                      <p className="max-w-[80%] truncate">{genre}</p>
                    </label>
                  </td>,
                );

                return rows;
              }, [])
              .map((rowItems, rowIndex) => (
                <tr key={`row-${rowIndex}`}>{rowItems}</tr>
              ))}
          </tbody>
        </table>

        <GenreListAddition
          addGenreList={addGenreList}
          numColumns={numColumns}
        />
      </div>
    </div>
  );
};

export default GenreCheckboxGroup;
