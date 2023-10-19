import { Fragment } from 'react';
import { WARD_LIST } from '@/constants/administrativeDistrict';
import { CloseSVG } from '@/icons/svg';

interface LocationListItemProps {
  locationKey: string;
  value: string[];
  selectLocation: (
    ward: string,
    isValueChecked: boolean,
    location?: string,
  ) => void;
}

const LocationListItem = ({
  locationKey,
  value,
  selectLocation,
}: LocationListItemProps) => {
  return (
    <Fragment key={locationKey}>
      {locationKey === '온라인' ? (
        value.length > 0 && (
          <li
            className="flex cursor-pointer items-center p-2 text-sm"
            onClick={() => selectLocation('온라인', false, locationKey)}
          >
            {locationKey}
            <CloseSVG className="ml-1 h-3 w-3 stroke-sub-color1" />
          </li>
        )
      ) : value.length === WARD_LIST[locationKey].length ? (
        <li
          className="flex cursor-pointer items-center p-2 text-sm"
          onClick={() => selectLocation('전지역', false, locationKey)}
        >
          {locationKey}
          {'>전지역'}
          <CloseSVG className="ml-1 h-3 w-3 stroke-sub-color1" />
        </li>
      ) : (
        value.map((item) => (
          <li
            key={item}
            className="flex cursor-pointer items-center p-2 text-sm"
            onClick={() => selectLocation(item, false, locationKey)}
          >
            {locationKey}
            {`>${item}`}
            <CloseSVG className="ml-1 h-3 w-3 stroke-sub-color1" />
          </li>
        ))
      )}
    </Fragment>
  );
};

export default LocationListItem;
