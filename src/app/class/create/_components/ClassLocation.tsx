import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ConfirmedLocation from './ClassLocation/ConfirmedLocation';
import PendingLocation from '../../../../components/SelectLocation/SelectLocation';
import TextAreaSection from '@/components/TextArea/TextAreaSection';
import Tooltip from '@/components/Tooltip/Tooltip';
import { LocationDiscussionTooltip } from '@/components/Tooltip/TooltipMessages/TooltipMessages';
import { Juso } from '@/types/address';

const ClassLocation = () => {
  const [isLocationSet, setIsLocationSet] = useState(true);
  const [location, setLocation] = useState<Juso | null>(null);
  const newWindowRef = useRef<Window | null>(null);
  const { register, control } = useFormContext();

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
          {...register('classLocationConsultative')}
          onChange={() => setIsLocationSet((prev) => !prev)}
        />
        <label htmlFor="consultative" className="text-sm font-semibold">
          협의 후 결정
        </label>
        <Tooltip>
          <LocationDiscussionTooltip />
        </Tooltip>
      </div>

      {isLocationSet ? (
        <Controller
          name="classConfirmedLocation"
          control={control}
          defaultValue=""
          rules={{
            required: '주소',
          }}
          render={({ field }) => (
            <ConfirmedLocation
              location={location}
              openPopup={openPopup}
              onChange={field.onChange}
            />
          )}
        />
      ) : (
        <Controller
          name="classPendingLocation"
          control={control}
          defaultValue={{}}
          rules={{
            validate: (value) => {
              if (Object.keys(value).length === 0) {
                return '주소';
              }
            },
          }}
          render={({ field }) => <PendingLocation onChange={field.onChange} />}
        />
      )}

      <TextAreaSection
        placeholder="수업장소까지 가는 방법, 추천 교통편, 주차시설 유무 등에 대한 정보를 입력해주세요."
        maxLength={500}
        dataName="classLocationCaution"
      />
    </section>
  );
};

export default ClassLocation;
