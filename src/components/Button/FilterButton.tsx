import { ArrowUpSVG } from '@/icons/svg';

interface FilterButtonProps {
  label: string;
  onClick: () => void;
}

const FilterButton = ({ label, onClick }: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="group flex h-[42px] w-20 items-center justify-center rounded-lg border border-solid border-sub-color1 bg-white pl-2 text-sm font-medium text-black hover:bg-sub-color1-transparent"
    >
      {label}
      <ArrowUpSVG
        width="34"
        height="34"
        className="fill-sub-color1 group-active:rotate-180 group-active:fill-black"
      />
    </button>
  );
};

export default FilterButton;
