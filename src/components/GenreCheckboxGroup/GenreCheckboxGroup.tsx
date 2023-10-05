import { FormEvent, useEffect, useState } from 'react';
import GenreListAddition from './GenreListAddition';
import { DANCE_GENRE } from '@/constants/constants';
import { CheckMarkSVG } from '../../../public/icons/svg';

const GenreCheckboxGroup = () => {
  const [genreList, setGenreList] = useState(['전체', ...DANCE_GENRE]);
  const [numColumns, setNumColumns] = useState(5);

  const addGenreList = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;

    setGenreList([...genreList, input.value]);
    input.value = '';
  };

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

  return (
    <div className="grid grid-cols-8">
      <h2 className="text-lg font-bold">장르</h2>
      <div className="col-span-7 ">
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
                rows[rows.length - 1].push(
                  <td
                    key={genre}
                    className="border border-solid border-sub-color2"
                  >
                    <input id={genre} type="checkbox" className="hidden" />
                    <label
                      htmlFor={genre}
                      className="flex h-8 w-full cursor-pointer select-none items-center justify-center gap-1 fill-sub-color2 text-sm text-sub-color2"
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

// peer-checked:border-2 peer-checked:border-sub-color1 peer-checked:bg-[#F5F5F5]
//     peer-checked:fill-sub-color1 peer-checked:font-bold peer-checked:text-black
