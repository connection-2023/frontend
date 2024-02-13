import { Controller, useFormContext } from 'react-hook-form';
import { useClassCreateStore } from '@/store/classCreate';
import ConfirmedLocation from './ClassLocation/ConfirmedLocation';
import SelectLocation from '@/components/SelectLocation/SelectLocation';
import TextAreaSection from '@/components/TextArea/TextAreaSection';
import Tooltip from '@/components/Tooltip/Tooltip';
import { LocationDiscussionTooltip } from '@/components/Tooltip/TooltipMessages/TooltipMessages';

const ClassLocation = () => {
  const { classData } = useClassCreateStore((state) => ({
    classData: state.classData,
  }));

  const { control, watch } = useFormContext();

  const locationConsultativeDefaultValue =
    classData?.regions && Object.keys(classData?.regions).length > 0
      ? true
      : classData?.location?.roadAddr
      ? false
      : false;

  const isLocationSet = watch(
    'locationConsultative',
    locationConsultativeDefaultValue,
  );

  return (
    <section className="mt-6 flex flex-col gap-6 sm:mt-10">
      <h2 className="text-lg font-bold">수업이 진행되는 위치를 알려주세요.</h2>

      <Controller
        name="locationConsultative"
        control={control}
        defaultValue={locationConsultativeDefaultValue}
        render={({ field }) => (
          <div className="flex items-center gap-1">
            <input
              id="consultative"
              type="checkbox"
              className="h-[1.12rem] w-[1.12rem] accent-sub-color1"
              checked={field.value}
              onChange={() => field.onChange(!field.value)}
            />
            <label htmlFor="consultative" className="text-sm font-semibold">
              협의 후 결정
            </label>
            <Tooltip>
              <LocationDiscussionTooltip />
            </Tooltip>
          </div>
        )}
      />

      {!isLocationSet ? (
        <Controller
          key="address"
          name="address"
          control={control}
          defaultValue={classData?.location}
          rules={{
            validate: (value) => {
              if (!value || !value.roadAddr) {
                return '주소';
              }
            },
          }}
          render={({ field }) => (
            <ConfirmedLocation
              defaultValue={field.value}
              onChange={field.onChange}
            />
          )}
        />
      ) : (
        <Controller
          key="regions"
          name="regions"
          control={control}
          defaultValue={classData?.regions}
          rules={{
            validate: (value) => {
              if (!value || Object.keys(value).length === 0) {
                return '주소';
              }
            },
          }}
          render={({ field }) => (
            <SelectLocation
              defaultValue={field.value}
              onChange={field.onChange}
            />
          )}
        />
      )}

      <Controller
        name="locationDescription"
        control={control}
        defaultValue={classData?.locationDescription}
        render={({ field }) => (
          <TextAreaSection
            placeholder="수업장소까지 가는 방법, 추천 교통편, 주차시설 유무 등에 대한 정보를 입력해주세요."
            maxLength={500}
            dataName="locationDescription"
            defaultValue={field.value}
          />
        )}
      />
    </section>
  );
};

export default ClassLocation;
