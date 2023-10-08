import { useFormContext, useFormState } from 'react-hook-form';

interface RadioGroupProps {
  title: string;
  children: React.ReactNode;
}

const RadioContainer = ({ title, children }: RadioGroupProps) => {
  const formMethods = useFormContext();
  const { errors } = useFormState({ control: formMethods.control });

  return (
    <div className="mt-5 flex w-full">
      <h2
        id={title}
        className={`w-1/6 pt-1 text-lg font-bold
       ${errors[title] && 'animate-heartbeat text-main-color'}`}
      >
        {title}
      </h2>
      <ul className="flex gap-4">{children}</ul>
    </div>
  );
};

export default RadioContainer;
