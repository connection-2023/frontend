import { Juso } from '@/types/address';
import { LocationSVG, SearchSVG } from '../../../../../../public/icons/svg';
import Map from '@/components/Map/Map';

interface ConfirmedLocationProps {
  location: Juso | null;
  openPopup: () => void;
}

const ConfirmedLocation = ({ location, openPopup }: ConfirmedLocationProps) => {
  return (
    <>
      <button
        onClick={openPopup}
        className="flex h-8 w-80 items-center justify-center gap-1 rounded-md shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]"
      >
        <SearchSVG className="mb-1 h-5 w-5 fill-sub-color1" /> 주소 검색하기
      </button>
      {location && (
        <section className="flex flex-col gap-3">
          <address className="flex">
            <LocationSVG />
            {location.roadAddr}
          </address>
          <input
            type="text"
            className="w-full border border-solid border-sub-color2 px-2 py-1 focus:outline-none"
            placeholder="상세주소를 입력해주세요."
          />
          <div className=" h-[18.25rem]">
            <Map address={location.roadAddr} studioName={location.bdNm} />
          </div>
        </section>
      )}
    </>
  );
};

export default ConfirmedLocation;
