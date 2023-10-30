import { useFormContext } from 'react-hook-form';
import Label from './Label';
import { Verification } from '@/types/types';

interface EmailProps {
  changeVerification: (key: keyof Verification, value: boolean) => void;
  verification: boolean;
}

const Email = ({ changeVerification, verification }: EmailProps) => {
  const { register } = useFormContext();

  return (
    <li className="flex items-center">
      <Label htmlFor="email-front" isNormal={true}>
        이메일
        <span className="text-sub-color1">*</span>
      </Label>
      <input
        type="email"
        {...register('email-front', {
          required: '이메일',
          validate: {
            isVerified: () => {
              if (!verification) return '이메일';
            },
          },
        })}
        id="email-front"
        className={`h-7 w-full max-w-[11.4rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
focus:outline-sub-color1`}
      />
      <span className="mx-2">@</span>
      <input
        type="email"
        {...register('email-back', {
          required: '이메일',
          validate: {
            isVerified: () => {
              if (!verification) return '이메일';
            },
          },
        })}
        id="email-back"
        className={`h-7 w-full max-w-[11.4rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
focus:outline-sub-color1`}
      />

      <button
        className={`ml-4 flex h-7 w-28 items-center justify-center whitespace-nowrap rounded-[0.31rem] px-2 py-1 text-white ${
          verification ? 'bg-sub-color2' : 'bg-black'
        }`}
        disabled={verification}
      >
        이메일 변경
      </button>
    </li>
  );
};

export default Email;