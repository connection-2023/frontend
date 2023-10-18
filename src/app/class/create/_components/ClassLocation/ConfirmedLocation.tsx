import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { LocationSVG, SearchSVG } from '@/icons/svg';
import Map from '@/components/Map/Map';
import { Juso } from '@/types/address';

interface ConfirmedLocationProps {
  location: Juso | null;
  openPopup: () => void;
  onChange?: (value: Juso | null) => void;
}

const ConfirmedLocation = ({
  location,
  openPopup,
  onChange,
}: ConfirmedLocationProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (onChange) {
      onChange(location);
    }
  }, [location]);

  return (
    <>
      <button
        onClick={openPopup}
        className={`shadow-float flex h-8 w-80 items-center justify-center gap-1 rounded-md ${
          errors.classConfirmedLocation && 'animate-vibration text-main-color'
        }`}
      >
        <SearchSVG className="mb-1 h-5 w-5 fill-sub-color1 " /> 주소 검색하기
      </button>
      {location && (
        <section className="flex flex-col gap-3">
          <address className="flex">
            <LocationSVG />
            {location.roadAddr}
          </address>
          <input
            type="text"
            className={`w-full border border-solid border-sub-color2 px-2 py-1 focus:outline-none  ${
              errors.classDetailAddress &&
              'animate-vibration placeholder:text-main-color'
            }`}
            placeholder="상세주소를 입력해주세요."
            {...register('classDetailAddress', {
              required: '상세주소',
            })}
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
