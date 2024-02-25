import { useFormContext } from 'react-hook-form';

interface CategoryProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const CategoryContainer = ({ title, children, id }: CategoryProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <section className="mt-5 sm:flex sm:w-full sm:items-center">
      <h2
        id={id}
        className={`mb-3 font-bold sm:mb-0 sm:w-1/6
       ${errors[id] && 'animate-vibration text-main-color'}`}
      >
        {title}
      </h2>
      <ul className="grid-rows grid gap-y-3 sm:flex sm:gap-4 sm:gap-y-0">
        {children}
      </ul>
    </section>
  );
};

export default CategoryContainer;
