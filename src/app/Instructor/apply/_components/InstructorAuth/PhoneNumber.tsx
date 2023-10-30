import { useFormContext } from 'react-hook-form';
import Label from './Label';
import { Verification } from '@/types/types';

interface PhoneNumberProps {
  changeVerification: (key: keyof Verification, value: boolean) => void;
  verification: boolean;
}

const PhoneNumber = ({
  changeVerification,
  verification,
}: PhoneNumberProps) => {
  const { register } = useFormContext();

  return (
    <li className="flex items-center ">
      <Label htmlFor="phoneNumber" isNormal={true}>
        휴대폰 번호
        <span className="text-sub-color1">*</span>
      </Label>
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
        className={`h-7 w-full max-w-[24.75rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
focus:outline-sub-color1`}
      />
      <button
        className={`ml-4 flex h-7 w-28 items-center justify-center whitespace-nowrap rounded-[0.31rem] px-2 py-1 text-white ${
          verification ? 'bg-sub-color2' : 'bg-black'
        }`}
        disabled={verification}
      >
        인증번호 전송
      </button>
    </li>
  );
};

export default PhoneNumber;
