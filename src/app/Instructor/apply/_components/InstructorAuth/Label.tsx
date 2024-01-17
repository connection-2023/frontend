import { useFormContext } from 'react-hook-form';

interface LabelProps {
  htmlFor: string;
  isNormal: boolean;
  children: React.ReactNode;
}

const Label = ({ htmlFor, isNormal, children }: LabelProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <label
      htmlFor={htmlFor !== 'bank' ? htmlFor : undefined}
      className={`mr-10 flex-shrink-0 whitespace-nowrap ${
        isNormal ? 'w-20 font-semibold' : 'w-14 font-normal'
      } ${errors[htmlFor] && 'animate-vibration text-main-color'}`}
    >
      {children}
    </label>
  );
};

export default Label;
