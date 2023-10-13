import { useFormContext, useFormState } from 'react-hook-form';

interface CategoryProps {
  title: string;
  children: React.ReactNode;
}

const CategoryContainer = ({ title, children }: CategoryProps) => {
  const formMethods = useFormContext();
  const { errors } = useFormState({ control: formMethods.control });

  return (
    <section className="mt-5 flex w-full">
      <h2
        id={title}
        className={`w-1/6 pt-1 text-lg font-bold
       ${errors[title] && 'animate-vibration text-main-color'}`}
      >
        {title}
      </h2>
      <ul className="flex gap-4">{children}</ul>
    </section>
  );
};

export default CategoryContainer;
