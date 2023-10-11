import { Fragment, useState } from 'react';
import { CITY_LIST, WARD_LIST } from '@/constants/administrativeDistrict';
import { toggleSelection } from '@/utils/toggleSelection';
import { CloseSVG } from '../../../../../../public/icons/svg';

const selectList = ['온라인', ...CITY_LIST];

interface PendingLocationProps {
  selectLocationList: Record<string, string[]>;
  onChangePendingLocation: (locationList: Record<string, string[]>) => void;
}

const PendingLocation = ({
  selectLocationList,
  onChangePendingLocation,
}: PendingLocationProps) => {
  const [focusLocation, setFocusLocation] = useState<string | null>(null);

  const selectLocation = (
    ward: string,
    isValueChecked: boolean,
    location?: string,
  ) => {
    const targetLocation = location || focusLocation;

    if (!targetLocation) {
      return;
    }

    const toggleData = {
      value: ward,
      allList: WARD_LIST[targetLocation],
      currentList: selectLocationList[targetLocation] || [],
      selectAllName: '전지역',
      isValueChecked,
    };

    onChangePendingLocation({
      ...selectLocationList,
      [targetLocation]: toggleSelection(toggleData),
    });
  };

  const focusLocationHandler = (city: string) => {
    if (city === '온라인') {
      onChangePendingLocation({
        ...selectLocationList,
        온라인: ['온라인'],
      });
    }
    setFocusLocation(city);
  };

  return (
    <section>
      <ul className="flex flex-wrap">
        {selectList.map((city) => (
          <li
            key={city}
            className={`${
              focusLocation === city ||
              (selectLocationList[city] && selectLocationList[city].length > 0)
                ? 'select-shadow-border bg-[#F5F5F5] font-bold'
                : 'shadow-border text-sub-color2'
            } flex h-[1.75rem] w-[11.11%] cursor-pointer items-center justify-center`}
            onClick={() => focusLocationHandler(city)}
          >
            {city}
          </li>
        ))}
      </ul>

      {focusLocation && focusLocation !== '온라인' && (
        <ul className="shadow-border flex flex-wrap gap-3 px-4 py-6">
          {['전지역', ...WARD_LIST[focusLocation]].map((ward) => {
            const isChecked =
              ward !== '전지역'
                ? selectLocationList[focusLocation]?.includes(ward)
                : selectLocationList[focusLocation]?.length ===
                  WARD_LIST[focusLocation].length;

            return (
              <li key={ward} className="flex w-24 gap-1">
                <input
                  id={ward}
                  type="checkbox"
                  className="peer h-[1.12rem] w-[1.12rem] accent-sub-color1"
                  checked={isChecked || false}
                  onChange={(e) => selectLocation(ward, e.target.checked)}
                />
                <label
                  htmlFor={ward}
                  className="cursor-pointer select-none text-sm font-semibold text-sub-color2 peer-checked:text-black"
                >
                  {ward}
                </label>
              </li>
            );
          })}
        </ul>
      )}

      <ul className="shadow-border flex flex-wrap">
        {Object.entries(selectLocationList).map(([key, value]) => (
          <Fragment key={key}>
            {key === '온라인' ? (
              value.length > 0 && (
                <li
                  className="flex cursor-pointer items-center p-2 text-sm"
                  onClick={() => selectLocation('온라인', false, key)}
                >
                  <div>{key}</div>
                  <CloseSVG className="ml-1 h-3 w-3 stroke-sub-color1" />
                </li>
              )
            ) : value.length === WARD_LIST[key].length ? (
              <li
                className="flex cursor-pointer items-center p-2 text-sm"
                onClick={() => selectLocation('전지역', false, key)}
              >
                <div>{key}</div>
                <div>{'>전지역'}</div>
                <CloseSVG className="ml-1 h-3 w-3 stroke-sub-color1" />
              </li>
            ) : (
              value.map((item) => (
                <li
                  key={item}
                  className="flex cursor-pointer items-center p-2 text-sm"
                  onClick={() => selectLocation(item, false, key)}
                >
                  <div>{key}</div>
                  <div>{`>${item}`}</div>
                  <CloseSVG className="ml-1 h-3 w-3 stroke-sub-color1" />
                </li>
              ))
            )}
          </Fragment>
        ))}
      </ul>
    </section>
  );
};

export default PendingLocation;
