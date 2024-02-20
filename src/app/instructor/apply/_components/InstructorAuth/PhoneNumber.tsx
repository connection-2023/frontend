import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Label from './Label';
import Button from '@/components/Button/Button';
import { Verification } from '@/types/types';

interface PhoneNumberProps {
  changeVerification: (key: keyof Verification, value: boolean) => void;
  verification: boolean;
  defaultValue?: string;
}

const PhoneNumber = ({
  changeVerification,
  verification,
  defaultValue,
}: PhoneNumberProps) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    if (defaultValue) {
      setValue('phoneNumber', defaultValue);
    }
  }, [defaultValue, setValue]);

  return (
    <li className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-0">
      <Label htmlFor="phoneNumber" isNormal={true}>
        휴대폰 번호
        <span className="text-sub-color1">*</span>
      </Label>
      <div className="flex w-full items-center">
        <input
          type="number"
          {...register('phoneNumber', {
            required: '휴대폰 번호',
            validate: {
              isVerified: () => {
                if (!verification) return '휴대폰 번호';
              },
            },
          })}
          id="phoneNumber"
          className={`h-8 w-full rounded-md px-2 py-1 outline outline-1 outline-gray-500 focus:outline-sub-color1
    sm:h-7`}
        />

        <div className="ml-4 w-40 whitespace-nowrap">
          <Button
            type="submit"
            color="secondary"
            disabled={verification}
            //추후 수정 예정
            onClick={() => changeVerification('phoneNumber', true)}
          >
            인증번호 전송
          </Button>
        </div>
      </div>
    </li>
  );
};

export default PhoneNumber;
