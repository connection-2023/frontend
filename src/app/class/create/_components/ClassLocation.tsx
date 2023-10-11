import { useEffect, useRef, useState } from 'react';
import TextAreaSection from '@/components/TextArea/TextAreaSection';
import PendingLocation from './ClassLocation/PendingLocation';
import ConfirmedLocation from './ClassLocation/ConfirmedLocation';
import { TooltipSVG } from '../../../../../public/icons/svg';
import { Juso } from '@/types/address';

const ClassLocation = () => {
  const [isLocationSet, setIsLocationSet] = useState(true);
  const [location, setLocation] = useState<Juso | null>(null);
  const newWindowRef = useRef<Window | null>(null);
  const [selectLocationList, setSelectLocationList] = useState<
    Record<string, string[]>
  >({});

  const onChangePendingLocation = (locationList: Record<string, string[]>) => {
    setSelectLocationList(locationList);
  };

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
    <section className="mt-10 flex flex-col gap-6">
      <h2 className="text-lg font-bold">수업이 진행되는 위치를 알려주세요.</h2>

      <div className="flex items-center gap-1">
        <input
          id="consultative"
          type="checkbox"
          className="h-[1.12rem] w-[1.12rem] accent-sub-color1"
          onChange={() => setIsLocationSet((prev) => !prev)}
        />
        <label htmlFor="consultative" className="text-sm font-semibold">
          협의 후 결정
        </label>
        <div className="group relative">
          <TooltipSVG />
          <div className="absolute left-6 top-0 z-10 hidden h-14 w-96 items-center justify-center border border-solid border-sub-color4 bg-white text-sm shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] group-hover:flex">
            수업장소가 특정하지 않을 경우(온라인, 방문수업 등)
            <br />
            가능한 지역을 선택 후 하단에 자세한 설명을 적어주세요.
          </div>
        </div>
      </div>

      {isLocationSet ? (
        <ConfirmedLocation location={location} openPopup={openPopup} />
      ) : (
        <PendingLocation
          selectLocationList={selectLocationList}
          onChangePendingLocation={onChangePendingLocation}
        />
      )}

      <TextAreaSection
        placeholder="수업장소까지 가는 방법, 추천 교통편, 주차시설 유무 등에 대한 정보를 입력해주세요."
        maxLength={500}
        dataName="유의사항"
      />
    </section>
  );
};

export default ClassLocation;
