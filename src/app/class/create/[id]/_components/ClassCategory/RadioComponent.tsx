import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckMarkSVG } from '@/icons/svg';

interface RadioComponentProps {
  title: string;
  message: string;
  checkList: string[];
  select?: string | null;
}

const RadioComponent = ({
  title,
  checkList,
  message,
  select = '',
}: RadioComponentProps) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    setValue(title, select);
  }, []);

  return (
    <div className="flex gap-4 gap-4">
      {checkList.map((element, index) => (
        <li
          key={element}
          className="flex items-center gap-1 self-start sm:self-auto"
        >
          <input
            {...register(title, {
              required: message,
            })}
            id={element}
            type="radio"
            value={element}
            className="peer hidden"
          />
          <label
            htmlFor={element}
            className="relative h-[1.125rem] w-[1.125rem] cursor-pointer rounded-sm border border-solid border-gray-500 fill-none peer-checked:bg-sub-color1 peer-checked:fill-white"
          >
            <CheckMarkSVG />
          </label>
          <label
            htmlFor={element}
            className="flex cursor-pointer 
                peer-checked:font-bold peer-checked:text-sub-color1
                "
          >
            <p
              className={`${index === 1 ? 'w-16 ' : 'w-24'} whitespace-nowrap`}
            >
              {element}
            </p>
          </label>
        </li>
      ))}
    </div>
  );
};

export default RadioComponent;
