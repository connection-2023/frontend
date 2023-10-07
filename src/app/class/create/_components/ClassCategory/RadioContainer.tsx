interface RadioGroupProps {
  title: string;
  children: React.ReactNode;
}

const RadioContainer = ({ title, children }: RadioGroupProps) => {
  return (
    <div className="mt-5 flex w-full">
      <h2 id={title} className="w-1/6 pt-1 text-lg font-bold">
        {title}
      </h2>
      <ul className="flex gap-4">{children}</ul>
    </div>
  );
};

export default RadioContainer;
