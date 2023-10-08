import { useTextInput } from '@/utils/useTextInput';

interface TextAreaSectionProps {
  title: string;
  placeholder: string;
  maxLength: number;
  height?: string;
}

const TextAreaSection = ({
  title,
  placeholder,
  maxLength,
  height = 'h-24',
}: TextAreaSectionProps) => {
  const { value, length, handleChange } = useTextInput('', maxLength);

  return (
    <section className="relative mt-9 flex flex-col">
      <h2 className="mb-3 text-lg font-bold">{title}</h2>
      <textarea
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
