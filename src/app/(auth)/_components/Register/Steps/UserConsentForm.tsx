import { useMemo, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { REGISTER_CONSENT_LIST } from '@/constants/constants';
import { CheckMarkSVG } from '@/icons/svg';
import { Button } from '@/components/Button';
import { IMarketingConsent, IRegisterConsents } from '@/types/auth';

interface IUserConsentForm {
  // eslint-disable-next-line no-unused-vars
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

  const selectedAll = useMemo(() => {
    const allConsents = Object.values(consents).flat();
    const allMarketingConsents = Object.values(consents.marketing);
    return (
      allConsents.every((consent) => consent) &&
      allMarketingConsents.every((consent) => consent)
    );
  }, [consents]);

  const selectAllConsents = () => {
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

    if (newValue !== selectedAll) {
      reset(newConsent);
    }
  };

  const handleConsentChange = (optionId: keyof IRegisterConsents) => {
    setValue(optionId, !getValues(optionId));
  };

  const handleMarketingConsentChange = (
    subOptionId?: keyof IMarketingConsent,
  ) => {
    const mainOption = 'marketing';
    const marketingValues = getValues(mainOption);

    let newValue: boolean;
    let newConsent: IMarketingConsent;

    if (!subOptionId) {
      newValue = !Object.values(marketingValues).some((value) => value);

      newConsent = Object.keys(marketingValues).reduce(
        (result, key) => ({ ...result, [key]: newValue }),
        {} as IMarketingConsent,
      );
    } else {
      newValue = !marketingValues[subOptionId];
      newConsent = { ...marketingValues, [subOptionId]: newValue };
    }

    setValue(mainOption, newConsent);
  };

  const areAllMarketingConsentsSelected = () => {
    const marketingValues = getValues('marketing');

    return (
      marketingValues && Object.values(marketingValues).every((value) => value)
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
    <section className="flex h-full flex-col">
      <h1 className="mb-1 text-lg font-semibold">마지막 단계입니다!</h1>
      <h2 className="mb-4 text-sm font-medium text-gray-300">
        커넥션 서비스 이용을 위해 필수 약관에 동의해주세요.
      </h2>

      <div
        onClick={(e) => {
          e.stopPropagation();
          selectAllConsents();
        }}
        className="mb-5 flex cursor-pointer items-center gap-3 rounded-lg px-3.5 py-4 text-base text-black shadow-float"
      >
        <input
          type="checkbox"
          id="agreeAll"
          readOnly
          checked={selectedAll}
          className="h-[18px] w-[18px] cursor-pointer accent-black"
        />
        <label
          htmlFor="agreeAll"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 cursor-pointer"
        >
          전체동의
        </label>
      </div>

      <ul className="text-normal flex flex-col gap-6 px-3.5 text-base text-black">
        {Object.values(REGISTER_CONSENT_LIST).map((option) => (
          <li key={option.id}>
            <div
              onClick={(e) => {
                e.stopPropagation();

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
                  <>
                    <input
                      type="checkbox"
                      id={option.id}
                      checked={
                        option.id === 'marketing'
                          ? areAllMarketingConsentsSelected()
                          : !!field.value
                      }
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      className="h-[18px] w-[18px] cursor-pointer accent-black"
                    />
                    <label
                      htmlFor={option.id}
                      onClick={(e) => e.stopPropagation()}
                      className="cursor-pointer"
                    >
                      {option.title}
                    </label>
                  </>
                )}
              />
            </div>

            {option.id === 'marketing' && (
              <ul className="mt-[1.12rem] flex flex-col gap-y-3.5 pl-6 text-base">
                {option.subOptions.map((subOption) => (
                  <Fragment key={subOption.id}>
                    <Controller
                      name={`marketing.${subOption.id}`}
                      control={control}
                      render={({ field }) => (
                        <li
                          onClick={(e) => {
                            e.preventDefault();
                            handleMarketingConsentChange(subOption.id);
                          }}
                          className="flex w-full cursor-pointer items-center gap-3"
                        >
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
                              field.onChange(e);
                            }}
                            className="hidden"
                          />

                          <label
                            htmlFor={subOption.id}
                            className="w-full flex-grow cursor-pointer"
                          >
                            {subOption.title}
                          </label>
                        </li>
                      )}
                    />
                  </Fragment>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex gap-3">
        <Button color="secondary" disabled={false} onClick={handlePrev}>
          이전
        </Button>
        <Button
          color="secondary"
          disabled={!consents.termsOfService}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          다음
        </Button>
      </div>
    </section>
  );
};

export default UserConsentForm;
