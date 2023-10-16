import { useState } from 'react';
import IncomeTable from './IncomeTable';
import IncomeRange from './IncomeRange';

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
    <section className="w-full max-w-[40rem] rounded-[0.31rem] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
      <div className="flex flex-col gap-[0.69rem] whitespace-nowrap border-b border-solid border-[#D9D9D9] px-4 py-5">
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

      <div className="">
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
      className="h-7 w-full max-w-[24rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2 focus:outline-sub-color1"
    >
      <option value="" disabled className="text-sub-color2">
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
