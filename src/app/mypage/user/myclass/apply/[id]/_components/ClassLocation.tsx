import { LocationSVG } from '@/icons/svg';
import { formatLocationToString } from '@/utils/parseUtils';
import Map from '@/components/Map/Map';
import { IApplyDetailResponse } from '@/types/class';

const ClassLocation = (props: IApplyDetailResponse) => {
  const { lecture } = props;
  const { location, region, locationDescription } = lecture;

  return (
    <section className="mt-5 text-sm">
      <h2 className="textx-base mb-1.5 flex items-center font-semibold">
        <LocationSVG width={21} height={21} className="mr-1 fill-sub-color1" />
        진행 장소
      </h2>
      {location ? (
        <>
          <p className="mb-2.5">서울특별시 성동구 뚝섬</p>
          <div className="h-[18.25rem] max-w-[40rem] bg-slate-100">
            {/* <Map address={locationDetail} studioName={studioName} /> */}
          </div>
          {locationDescription && (
            <p className="mt-2 font-normal">{locationDescription}</p>
          )}
        </>
      ) : (
        region && <p>{formatLocationToString(region)}</p>
      )}
    </section>
  );
};

export default ClassLocation;
