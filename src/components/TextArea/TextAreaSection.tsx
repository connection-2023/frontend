import { useFormContext } from 'react-hook-form';
import { useTextInput } from '@/utils/useTextInput';

interface TextAreaSectionProps {
  title?: string;
  placeholder: string;
  maxLength: number;
  dataName: string;
  height?: string;
  isRequired?: boolean;
  defaultValue?: string;
}

const TextAreaSection = ({
  title = '',
  placeholder,
  maxLength,
  dataName,
  height = 'h-24',
  isRequired = false,
  defaultValue = '',
}: TextAreaSectionProps) => {
  const { value, length, handleChange } = useTextInput(defaultValue, maxLength);
  const formMethods = useFormContext();
  const { register } = formMethods;

  return (
    <section className="relative flex flex-col">
      {title && (
        <h2 id={dataName} className="mb-3 text-lg font-bold">
          {title}
        </h2>
      )}
      <textarea
        {...register(dataName, {
          ...(isRequired && { required: '필수 입력 사항' }),
        })}
        className={`${height} resize-none rounded-md border border-sub-color2 p-3`}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        maxLength={maxLength}
      />
      <div className="absolute bottom-2 right-3 text-sub-color2">
        ({length} / {maxLength})
      </div>
    </section>
  );
};

export default TextAreaSection;
