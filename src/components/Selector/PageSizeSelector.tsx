'use client';
interface PageSizeSelectorProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PageSizeSelector = ({ value, onChange }: PageSizeSelectorProps) => {
  return (
    <>
      <select
        value={value}
        onChange={onChange}
        className="h-7 w-[5.75rem] border border-solid border-gray-500"
      >
        {[5, 10, 15, 20].map((displayCount) => (
          <option key={displayCount} value={displayCount}>
            {displayCount}개
          </option>
        ))}
      </select>
    </>
  );
};

export default PageSizeSelector;
