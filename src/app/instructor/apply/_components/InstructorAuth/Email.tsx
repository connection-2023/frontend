import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Label from './Label';
import { Button } from '@/components/Button';
import { Verification } from '@/types/types';

interface EmailProps {
  changeVerification: (key: keyof Verification, value: boolean) => void;
  verification: boolean;
  defaultValue: string;
}

const Email = ({
  changeVerification,
  verification,
  defaultValue,
}: EmailProps) => {
  const { register, setValue } = useFormContext();
  const [emailFront, emailBack] = defaultValue.split('@');

  useEffect(() => {
    if (defaultValue) {
      setValue('emailFront', emailFront);
      setValue('emailBack', emailBack);
    }
  }, [defaultValue, setValue]);

  return (
    <li className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
      <Label htmlFor="emailFront" isNormal={true}>
        이메일
        <span className="text-sub-color1">*</span>
      </Label>
      <div className="flex w-full items-center">
        <input
          type="email"
          defaultValue={emailFront}
          {...register('emailFront', {
            required: '이메일',
            validate: {
              isVerified: () => {
                if (!verification) return '이메일';
              },
            },
          })}
          id="emailFront"
          className={`h-8 w-full rounded-md px-2 py-1 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-7
    sm:w-44`}
        />
        <span className="ml-4 w-40 sm:mx-2 sm:w-auto">@</span>
      </div>
      <div className="flex w-full items-center">
        <input
          type="email"
          defaultValue={emailBack}
          {...register('emailBack', {
            required: '이메일',
            validate: {
              isVerified: () => {
                if (!verification) return '이메일';
              },
            },
          })}
          id="emailBack"
          className={`h-8 w-full rounded-md px-2 py-1 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-7
    sm:w-44`}
        />
        <div className="ml-4 w-40 whitespace-nowrap sm:w-auto">
          <Button
            type="submit"
            color="secondary"
            disabled={verification}
            onClick={() => changeVerification('email', true)} //추후 수정 예정
          >
            이메일 변경
          </Button>
        </div>
      </div>
    </li>
  );
};

export default Email;
