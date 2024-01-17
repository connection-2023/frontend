import { WARD_LIST } from '@/constants/administrativeDistrict';

interface WardListProps {
  focusLocation: string;
  selectLocationList: Record<string, string[]>;
  selectLocation: (
    ward: string,
    isValueChecked: boolean,
    location?: string,
  ) => void;
}

const WardList = ({
  focusLocation,
  selectLocationList,
  selectLocation,
}: WardListProps) => {
  return (
    <ul className="shadow-border flex flex-wrap gap-5 px-4 py-6 sm:gap-3">
      {['전지역', ...WARD_LIST[focusLocation]].map((ward) => {
        const isChecked =
          ward !== '전지역'
            ? selectLocationList[focusLocation]?.includes(ward)
            : selectLocationList[focusLocation]?.length ===
              WARD_LIST[focusLocation].length;

        return (
          <li key={ward} className="flex w-[5.5rem] gap-1 sm:w-24">
            <input
              id={ward}
              type="checkbox"
              className="peer h-[1.12rem] w-[1.12rem] accent-sub-color1"
              checked={isChecked || false}
              onChange={(e) => selectLocation(ward, e.target.checked)}
            />
            <label
              htmlFor={ward}
              className="cursor-pointer select-none text-sm font-semibold text-gray-500 peer-checked:text-black"
            >
              {ward}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default WardList;
