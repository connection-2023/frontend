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
    <section className="mt-5 flex w-full">
      <h2
        id={id}
        className={`w-1/6 pt-1 text-lg font-bold
       ${errors[id] && 'animate-vibration text-main-color'}`}
      >
        {title}
      </h2>
      <ul className="flex gap-4">{children}</ul>
    </section>
  );
};

export default CategoryContainer;
