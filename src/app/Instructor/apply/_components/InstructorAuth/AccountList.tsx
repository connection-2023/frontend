import { Controller, useFormContext } from 'react-hook-form';
import BankSelect from './BankSelect';
import Label from './Label';
import { Verification } from '@/types/types';

interface AccountListProps {
  changeVerification: (key: keyof Verification, value: boolean) => void;
  verification: boolean;
}

const AccountList = ({
  changeVerification,
  verification,
}: AccountListProps) => {
  const { register, control } = useFormContext();

  return (
    <>
      <li className="flex items-center">
        <Label htmlFor="bankholder" isNormal={false}>
          예금주
        </Label>
        <input
          type="text"
          {...register('bankholder', { required: '예금주' })}
          id="bankholder"
          className={`h-7 w-full max-w-[10rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
    focus:outline-sub-color1`}
        />
      </li>

      <li className="flex items-center">
        <Label htmlFor="birth" isNormal={false}>
          생년월일
        </Label>
        <input
          type="number"
          {...register('birth', { required: '생년월일' })}
          id="birth"
          className={`h-7 w-full max-w-[10rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
    focus:outline-sub-color1`}
        />
      </li>

      <li className="flex items-center">
        <Label htmlFor="bank" isNormal={false}>
          은행
        </Label>
        <div className="w-full max-w-[10rem]">
          <Controller
            name="bank"
            control={control}
            rules={{
              required: '은행',
            }}
            render={({ field: { onChange } }) => (
              <BankSelect onChange={onChange} />
            )}
          />
        </div>
      </li>

      <li className="flex items-center">
        <Label htmlFor="accountNumber" isNormal={false}>
          계좌번호
        </Label>
        <input
          type="number"
          {...register('accountNumber', {
            required: '계좌번호',
            validate: {
              isVerified: () => {
                if (!verification) return '계좌번호';
              },
            },
          })}
          id="accountNumber"
          className={`h-7 w-full max-w-[24.75rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
    focus:outline-sub-color1`}
        />
        <button
          className={`ml-4 flex h-7 w-28 items-center justify-center whitespace-nowrap rounded-[0.31rem] bg-black px-2 py-1 text-white ${
            verification ? 'bg-sub-color2' : 'bg-black'
          }`}
          disabled={verification}
        >
          인증하기
        </button>
      </li>
    </>
  );
};

export default AccountList;
