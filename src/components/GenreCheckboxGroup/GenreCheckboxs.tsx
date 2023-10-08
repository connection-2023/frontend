import { useFormContext } from 'react-hook-form';
import { CheckMarkSVG } from '../../../public/icons/svg';

interface GenreCheckboxProps {
  genre: string;
  isSelected: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenreCheckboxs = ({
  genre,
  isSelected,
  onChange,
}: GenreCheckboxProps) => {
  const formMethods = useFormContext();
  const { register } = formMethods;
  return (
    <td
      className={`border-solid ${
        isSelected
          ? 'border-2 border-sub-color1 bg-[#F5F5F5]'
          : 'border border-sub-color2'
      }`}
    >
      <input
        {...register('장르', {
          validate: (value) => value && value.length > 0,
        })}
        type="checkbox"
        value={genre}
        id={genre}
        className="hidden"
        checked={isSelected}
        onChange={onChange}
      />
      <label
        htmlFor={genre}
        className={`flex h-8 w-full cursor-pointer select-none items-center justify-center gap-1 text-sm 
          ${
            isSelected
              ? 'fill-sub-color1 font-bold'
              : 'fill-sub-color2 text-sub-color2'
          }
        `}
      >
        <CheckMarkSVG />
        <p className="max-w-[80%] truncate">{genre}</p>
      </label>
    </td>
  );
};

export default GenreCheckboxs;
