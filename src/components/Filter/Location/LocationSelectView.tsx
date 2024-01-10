import { WARD_LIST } from '@/constants/administrativeDistrict';
import { ArrowRightSVG, CloseSVG } from '@/icons/svg';
import { Regions } from '@/types/instructor';
import { CityList } from '@/types/locationFilter';

interface LocationSelectViewProps {
  filterList: Regions;
  deleteFilterCity: (city: CityList) => void;
  changeFilterList: (ward: string) => void;
}

// CloseSVG 컴포넌트를 재사용하기 위한 별도 컴포넌트
const CloseButton = ({ onClick, children }) => (
  <button className="flex items-center justify-center gap-1" onClick={onClick}>
    {children}
    <CloseSVG width="14" height="14" className="stroke-gray-300 stroke-2" />
  </button>
);

const LocationSelectView = ({
  filterList,
  deleteFilterCity,
  changeFilterList,
}: LocationSelectViewProps) => {
  const selectList = Object.entries(filterList);

  return selectList.map(([city, wards]: [string, string[]]) => (
    <dl key={city} className="mt-2 flex text-sm">
      <dt className="flex h-fit items-center">
        <div className="rounded-full border border-solid border-black bg-black/[0.1] px-3 py-2">
          <CloseButton onClick={() => deleteFilterCity(city as CityList)}>
            {city}
          </CloseButton>
        </div>
        <ArrowRightSVG className="h-[20px] w-[22px] stroke-gray-300" />
      </dt>

      <dd className="flex flex-wrap items-center gap-x-1 gap-y-2">
        {WARD_LIST[city].length === wards.length ? (
          <div className="rounded-full border border-solid border-black px-3 py-2">
            <CloseButton onClick={() => deleteFilterCity(city as CityList)}>
              전 지역
            </CloseButton>
          </div>
        ) : (
          wards.map((ward) => (
            <div
              key={`${city}-${ward}`}
              className="rounded-full border border-solid border-black px-3 py-2"
            >
              <CloseButton onClick={() => changeFilterList(ward, city)}>
                {ward}
              </CloseButton>
            </div>
          ))
        )}
      </dd>
    </dl>
  ));
};

export default LocationSelectView;
