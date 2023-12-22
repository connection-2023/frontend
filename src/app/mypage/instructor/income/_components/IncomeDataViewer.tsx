import { useState } from 'react';
import IncomeRange from './IncomeRange';
import IncomeTable from './IncomeTable';

enum filterOptions {
  All = '전체',
  Class = '클래스',
  Pass = '패스권',
}

const IncomeDataViewer = () => {
  const [selectedOption, setSelectedOption] = useState(filterOptions.All);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.id as filterOptions;

    if (Object.values(filterOptions).includes(option)) {
      setSelectedOption(option);
    }
  };

  return (
    <section className="w-full rounded-lg bg-white shadow-float lg:col-span-2">
      <div className="flex flex-col gap-2.5 whitespace-nowrap border-b border-solid border-gray-700 px-4 py-5">
        {/* 조회 기간 선택 */}
        <IncomeRange />

        {/* 전체, 클래스, 패스권 필터링 */}
        <div className="flex gap-4 text-sm">
          <ul className="flex gap-4 font-medium">
            {Object.values(filterOptions).map((option) => (
              <li key={option} className="flex items-center gap-[0.31rem]">
                <input
                  type="checkbox"
                  id={option}
                  checked={selectedOption === option}
                  onChange={handleCheckboxChange}
                  className="h-[18px] w-[18px] accent-sub-color1"
                />
                <label htmlFor={option}> {option}</label>
              </li>
            ))}
          </ul>

          {/* --- react-select 사용 예정 --- */}
          <Select options={['클래스 목록', '이나', '패스권 목록']} />
        </div>
      </div>

      <div className="w-full px-4">
        <IncomeTable selectedOption={selectedOption} />
      </div>
    </section>
  );
};

export default IncomeDataViewer;

interface SelectProps {
  options: string[];
}
const Select = ({ options }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <select
      id="bank"
      value={selectedOption}
      onChange={handleChange}
      className="h-7 w-full max-w-[24rem] rounded-md px-2 py-1 outline outline-1 outline-gray-500 focus:outline-sub-color1"
    >
      <option value="" disabled className="text-gray-500">
        클래스를 선택해주세요
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
