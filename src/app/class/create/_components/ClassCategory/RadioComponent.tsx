import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckMarkSVG } from '../../../../../../public/icons/svg';

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
  const formMethods = useFormContext();
  const { register, setValue, clearErrors } = formMethods;

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    title: string,
  ) => {
    if (changFunction) {
      changFunction(e);
    } else {
      setValue(title, e.target.value);
    }

    clearErrors(title);
  };

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
            onChange={(e) => handleRadioChange(e, title)}
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
    </>
  );
};

export default RadioComponent;
