import { CheckSVG } from '@/icons/svg';

const dayTypeOpstion = ['요일별로 달라요', '특정 날짜에만 운영해요'];

interface ClassDayOptionsProps {
  isDisabled: boolean;
  selectedType: string;
  setSelectedType: (value: React.SetStateAction<string>) => void;
}

const ClassDayOptions = ({
  isDisabled,
  selectedType,
  setSelectedType,
}: ClassDayOptionsProps) => (
  <ul className="mb-4 flex gap-5">
    {dayTypeOpstion.map((label, index) => (
      <li key={index}>
        <label
          className={`flex cursor-pointer items-center whitespace-nowrap ${
            isDisabled ? 'text-gray-500' : ''
          }`}
        >
          <input
            type="radio"
            name="dayType"
            value={label}
            checked={selectedType === label}
            disabled={isDisabled}
            onChange={(e) => setSelectedType(e.target.value)}
            className="hidden" // 라디오 버튼 숨기기
          />
          <div
            className={`mr-2 h-[18px] w-[18px] rounded-[0.09rem] ${
              selectedType !== label &&
              'border border border-solid border-gray-500'
            }`}
          >
            {selectedType === label && (
              <CheckSVG className="centerInContainer" />
            )}
          </div>
          <span className={`${selectedType === label && 'font-bold'}`}>
            {label}
          </span>
        </label>
      </li>
    ))}
  </ul>
);

export default ClassDayOptions;
