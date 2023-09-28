import { useTextInput } from '../../../../../utils/useTextInput';

interface TextAreaSectionProps {
  title: string;
  placeholder: string;
  valueKey: string;
  maxLength: number;
}

const scrollStyle =
  'scrollbar scrollbar-track-[#F5F5F5] scrollbar-thumb-sub-color2 scrollbar-thumb-rounded-lg scrollbar-w-2';

const TextAreaSection = ({
  title,
  placeholder,
  maxLength,
}: TextAreaSectionProps) => {
  const { value, length, handleChange } = useTextInput('', maxLength);

  return (
    <section className="relative mt-9 flex flex-col">
      <h2 className="text-lg font-bold">{title}</h2>
      <textarea
        className={`mt-3 h-24 resize-none rounded-md border border-sub-color2 p-3 ${scrollStyle}`}
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
