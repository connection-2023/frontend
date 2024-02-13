import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { LocationSVG, SearchSVG } from '@/icons/svg';
import Map from '@/components/Map/Map';
import { Juso, ProcessedJuso } from '@/types/address';

interface ConfirmedLocationProps {
  onChange: (value: Juso | null) => void;
  defaultValue: ProcessedJuso | null;
}

const ConfirmedLocation = ({
  onChange,
  defaultValue,
}: ConfirmedLocationProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const newWindowRef = useRef<Window | null>(null);
  const [location, setLocation] = useState<Juso | null | ProcessedJuso>(
    defaultValue,
  );

  const openPopup = () => {
    newWindowRef.current = window.open(
      '/class/create/address',
      '_blank',
      'width=675,height=745',
    );
  };

  useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.origin ||
        event.data.source === 'react-devtools-content-script' ||
        event.data.source === 'react-devtools-backend-manager' ||
        event.data.source === 'react-devtools-bridge'
      )
        return;
      //추후 배포시 devtools 제거

      onChange(event.data);
      setLocation(event.data);
    };

    window.addEventListener('message', receiveMessage);

    return () => {
      if (newWindowRef.current) {
        newWindowRef.current.close();
      }

      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  return (
    <>
      <button
        onClick={openPopup}
        className={`flex h-8 w-full items-center justify-center gap-1 rounded-md shadow-float sm:w-80 ${
          errors.address && 'animate-vibration text-main-color'
        }`}
      >
        <SearchSVG className="mb-1 h-5 w-5 fill-sub-color1 " /> 주소 검색하기
      </button>
      {location?.roadAddr && (
        <section className="flex flex-col gap-3">
          <address className="flex">
            <LocationSVG width={21} height={21} className="fill-sub-color1" />
            {location.roadAddr}
          </address>
          <input
            type="text"
            className={`w-full border border-solid border-gray-500 px-2 py-1 focus:outline-none  ${
              errors.detail && 'animate-vibration placeholder:text-main-color'
            }`}
            defaultValue={location.detailAddress || ''}
            placeholder="상세주소를 입력해주세요."
            {...register('detail', {
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
