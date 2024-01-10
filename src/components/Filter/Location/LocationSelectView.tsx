import { WARD_LIST } from '@/constants/administrativeDistrict';
import { ArrowRightSVG, CloseSVG } from '@/icons/svg';
import { Regions } from '@/types/instructor';
import { CityList } from '@/types/types';

interface LocationSelectViewProps {
  filterList: Regions;
  deleteFilterCity: (city: CityList) => void;
  changeFilterList: (ward: string, city?: CityList) => void;
}

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
              <CloseButton
                onClick={() => changeFilterList(ward, city as CityList)}
              >
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

interface CloseButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const CloseButton = ({ onClick, children }: CloseButtonProps) => (
  <button className="flex items-center justify-center gap-1" onClick={onClick}>
    {children}
    <CloseSVG width="14" height="14" className="stroke-gray-300 stroke-2" />
  </button>
);
