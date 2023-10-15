import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

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
  } = useFormContext();

  const textareaWatch = watch(dataName);

  useEffect(() => {
    setLength(getValues(dataName)?.length);
  }, [textareaWatch]);

  return (
    <section className="relative flex flex-col">
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
        className={`${height} resize-none rounded-md border border-sub-color2 p-3`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        maxLength={maxLength}
      />
      <div className="absolute bottom-2 right-3 text-sub-color2">
        ({length} / {maxLength})
      </div>
    </section>
  );
};

export default TextAreaSection;
