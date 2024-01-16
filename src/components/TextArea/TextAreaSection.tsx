import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface TextAreaSectionProps {
  maxLength: number;
  dataName: string;
  title?: string;
  placeholder?: string;
  height?: string;
  isRequired?: boolean;
  defaultValue?: string;
  errorMessage?: string;
}

const TextAreaSection = ({
  maxLength,
  dataName,
  height = 'h-24',
  isRequired = false,
  title = '',
  placeholder = '',
  defaultValue = '',
  errorMessage = title || '',
}: TextAreaSectionProps) => {
  const [length, setLength] = useState(0);

  const {
    register,
    getValues,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();

  const textareaWatch = watch(dataName);

  useEffect(() => {
    setLength(getValues(dataName)?.length);
  }, [textareaWatch]);

  useEffect(() => {
    setValue(dataName, defaultValue);
  }, []);

  return (
    <section className="relative flex flex-col ">
      {title && (
        <h2
          id={dataName}
          className={`mb-3 text-lg font-bold ${
            errors[dataName] && 'animate-vibration text-main-color'
          }`}
        >
          {title}
        </h2>
      )}
      <textarea
        {...register(dataName, {
          ...(isRequired && { required: errorMessage }),
          maxLength,
        })}
        className={`${height} resize-none rounded-md border border-gray-500 p-3 focus:outline-sub-color1`}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <div className="absolute bottom-2 right-3 text-gray-500">
        ({length || 0} / {maxLength})
      </div>
    </section>
  );
};

export default TextAreaSection;
