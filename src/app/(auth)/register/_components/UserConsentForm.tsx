import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { REGISTER_CONSENT_LIST } from '@/constants/constants';
import { CheckMarkSVG } from '@/icons/svg';
import StatusButton from '@/components/Button/StatusButton';
import { IMarketingConsent, IRegisterConsents } from '@/types/auth';

interface IUserConsentForm {
  updateUserRegistrationData: (data: IRegisterConsents) => void;
  handlePrev: () => void;
}

const UserConsentForm = ({
  updateUserRegistrationData,
  handlePrev,
}: IUserConsentForm) => {
  const { watch, handleSubmit, control, setValue, getValues, reset } = useForm({
    defaultValues: {
      termsOfService: true,
      talk: true,
      email: true,
      marketing: {
        marketingChannelTalk: true,
        marketingEmail: true,
      },
    },
    mode: 'onChange',
  });
  const consents = watch();

  const handleConsentChange = (optionId: keyof IRegisterConsents) => {
    setValue(optionId, !getValues(optionId));
  };

  const handleMarketingConsentChange = (
    subOptionId?: keyof IMarketingConsent,
  ) => {
    const mainOption = 'marketing';
    const marketingValues = getValues(mainOption);

    if (!subOptionId) {
      const newValue = !Object.values(marketingValues).some((value) => value);
      const newConsent = Object.keys(marketingValues).reduce(
        (result, key) => ({ ...result, [key]: newValue }),
        {} as IMarketingConsent,
      );

      setValue(mainOption, newConsent);
      return;
    }

    const newValue = !marketingValues[subOptionId];
    marketingValues[subOptionId] = newValue;

    setValue(mainOption, { ...marketingValues });
  };

  const handleSelectAll = () => {
    const newValue = !selectedAll;
    const formValues = getValues();

    const newConsent = Object.keys(formValues).reduce((result, key) => {
      if (key === 'marketing') {
        const marketingConsent = Object.keys(formValues[key]).reduce(
          (acc, subKey) => ({
            ...acc,
            [subKey]: newValue,
          }),
          {} as IMarketingConsent,
        );
        return { ...result, marketing: marketingConsent };
      } else {
        return { ...result, [key]: newValue };
      }
    }, {} as IRegisterConsents);

    reset(newConsent);
  };

  const selectedAll = useMemo(() => {
    const allConsents = Object.values(consents).flat();
    const allMarketingConsents = Object.values(consents.marketing);
    return (
      allConsents.every((consent) => consent) &&
      allMarketingConsents.every((consent) => consent)
    );
  }, [consents]);

  const areAllMarketingConsentsChecked = () => {
    const marketingValues = getValues('marketing');
    return (
      marketingValues && Object.values(marketingValues).some((value) => value)
    );
  };

  const onSubmit = (data: IRegisterConsents) => {
    if (!data.termsOfService) {
      toast.error('서비스 이용 약관에 동의해주세요.');
      return;
    }

    updateUserRegistrationData(data);
  };

  return (
    <section className="flex flex-col">
      <h1 className="mb-2.5 text-lg font-semibold">마지막 단계입니다!</h1>
      <h1 className="mb-4 text-sm font-medium">
        커넥션 서비스 이용을 위해 필수 약관에 동의해주세요.
      </h1>

      <div
        onClick={handleSelectAll}
        className="mb-5 flex cursor-pointer items-center gap-3 rounded-lg px-3.5 py-4 text-base text-black shadow-float"
      >
        <input
          type="checkbox"
          id="agreeAll"
          checked={selectedAll}
          onChange={handleSelectAll}
          className="h-[18px] w-[18px] cursor-pointer accent-black"
        />
        <label htmlFor="agreeAll" className="flex-1 cursor-pointer">
          전체동의
        </label>
      </div>

      <ul className="text-normal flex flex-col gap-6 px-3.5 text-base text-black">
        {Object.values(REGISTER_CONSENT_LIST).map((option) => (
          <li key={option.id}>
            <div
              onClick={() => {
                option.id === 'marketing'
                  ? handleMarketingConsentChange()
                  : handleConsentChange(option.id);
              }}
              className="flex cursor-pointer items-center gap-3"
            >
              <Controller
                name={option.id}
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    id={option.id}
                    checked={
                      option.id === 'marketing'
                        ? areAllMarketingConsentsChecked()
                        : !!field.value
                    }
                    onChange={() => {
                      option.id === 'marketing'
                        ? handleMarketingConsentChange()
                        : handleConsentChange(option.id);
                    }}
                    className="h-[18px] w-[18px] accent-black"
                  />
                )}
              />
              <label htmlFor={option.id} className="cursor-pointer">
                {option.title}
              </label>
            </div>

            {option.id === 'marketing' && (
              <ul className="mt-[1.12rem] flex flex-col gap-y-[0.87rem] pl-6 text-base">
                {option.subOptions.map((subOption) => (
                  <li
                    key={subOption.id}
                    onClick={() => handleMarketingConsentChange(subOption.id)}
                    className="flex w-full cursor-pointer items-center gap-3"
                  >
                    <Controller
                      name={`marketing.${subOption.id}`}
                      control={control}
                      render={({ field }) => (
                        <>
                          <CheckMarkSVG
                            width="20"
                            className={`cursor-pointer ${
                              watch(`marketing.${subOption.id}`)
                                ? 'fill-black'
                                : 'fill-gray-700'
                            }`}
                          />

                          <input
                            type="checkbox"
                            id={subOption.id}
                            checked={watch(`marketing.${subOption.id}`)}
                            onChange={(e) => {
                              handleMarketingConsentChange(subOption.id);
                              field.onChange(e);
                            }}
                            className="hidden h-[18px] w-[18px]"
                          />
                        </>
                      )}
                    />

                    <label
                      htmlFor={subOption.id}
                      className="w-full flex-grow cursor-pointer"
                    >
                      {subOption.title}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-[11.75rem] flex gap-3 md:mt-[3.35rem]">
        <StatusButton disabled={false} onClick={handlePrev}>
          이전
        </StatusButton>
        <StatusButton
          disabled={!consents.termsOfService}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          다음
        </StatusButton>
      </div>
    </section>
  );
};

export default UserConsentForm;
