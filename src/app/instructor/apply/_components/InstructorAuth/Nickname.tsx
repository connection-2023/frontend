import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getCheckNickname } from '@/lib/apis/instructorApi';
import Label from './Label';
import Button from '@/components/Button/Button';
import { Verification } from '@/types/types';

interface NicknameProps {
  changeVerification: (key: keyof Verification, value: boolean) => void;
  verification: boolean;
}

const Nickname = ({ changeVerification, verification }: NicknameProps) => {
  const { register, getValues, setFocus, clearErrors } = useFormContext();

  const checkNicknameAvailability = async () => {
    const nickname = getValues('nickname');

    if (nickname.length < 2 || nickname.length > 12) {
      setFocus('nickname');
      return toast.error('닉네임은 2자 이상, 12자 이하로 작성 해주세요.');
    }

    const pattern = /^[가-힣a-zA-Z0-9]+$/;
    if (!pattern.test(nickname)) {
      setFocus('nickname');
      return toast.error('올바른 닉네임을 작성 해주세요.');
    }

    try {
      if (await getCheckNickname(nickname)) {
        toast.success('사용가능한 닉네임 입니다.');
        changeVerification('nickname', true);
        clearErrors('nickname');
      } else {
        toast.error('중복된 닉네임 입니다.');
      }
    } catch (error) {
      console.error('닉네임 중복 검사 중 에러 발생', error);

      toast.error(
        '닉네임 중복 검사 중 에러가 발생했습니다. 다시 시도해 주세요.',
      );
    }
  };

  return (
    <li className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-0">
      <Label htmlFor="nickname" isNormal={true}>
        강사 닉네임
        <span className="text-sub-color1">*</span>
      </Label>

      <div className="flex w-full items-center">
        <input
          type="text"
          {...register('nickname', {
            required: '닉네임',
            validate: {
              isVerified: () => {
                if (!verification) return '닉네임';
              },
            },
          })}
          id="nickname"
          className={`h-8 w-full rounded-md px-2 py-1 outline outline-1 outline-gray-500 focus:outline-sub-color1
    sm:h-7`}
        />
        <div className="ml-4 w-28">
          <Button
            type="submit"
            color="secondary"
            onClick={checkNicknameAvailability}
            disabled={verification}
          >
            중복 확인
          </Button>
        </div>
      </div>
    </li>
  );
};

export default Nickname;
