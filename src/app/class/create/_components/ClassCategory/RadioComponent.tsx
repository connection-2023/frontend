import React from 'react';
import { CheckMarkSVG } from '../../../../../../public/icons/svg';
import { useRecoilValue } from 'recoil';
import { hookForm } from '@/recoil/hookForm/atom';

interface RadioComponentProps {
  title: string;
  checkList: string[];
  changFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioComponent = ({
  title,
  checkList,
  changFunction,
}: RadioComponentProps) => {
  const formMethods = useRecoilValue(hookForm);

  if (!formMethods) {
    return null;
  }

  const { register, setValue } = formMethods;

  return (
    <>
      {checkList.map((element, index) => (
        <li key={element} className="flex items-center gap-1">
          <input
            {...register(title, {
              validate: (value) => !!value,
            })}
            id={element}
            type="radio"
            name={`${title}Group`}
            value={element}
            className="peer hidden"
            onChange={(e) =>
              changFunction ? changFunction(e) : setValue(title, e.target.value)
            }
          />
          <div className="relative h-[1.125rem] w-[1.125rem] cursor-pointer rounded-sm border border-solid border-gray-500 fill-none peer-checked:bg-sub-color1 peer-checked:fill-white">
            <CheckMarkSVG />
          </div>
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
    </>
  );
};

export default RadioComponent;
