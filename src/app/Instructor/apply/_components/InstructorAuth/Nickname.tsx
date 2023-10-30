import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getCheckNickname } from '@/lib/apis/lecturersApi';
import Label from './Label';
import { Verification } from '@/types/types';

interface NicknameProps {
  changeVerification: (key: keyof Verification, value: boolean) => void;
  verification: boolean;
}

const Nickname = ({ changeVerification, verification }: NicknameProps) => {
  const { register, getValues, setFocus, clearErrors } = useFormContext();

  const nickNameOverlapping = async () => {
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

    if (await getCheckNickname(nickname)) {
      toast.success('사용가능한 닉네임 입니다.');
      changeVerification('nickname', true);
      clearErrors('nickname');
    } else {
      toast.error('중복된 닉네임 입니다.');
    }
  };

  return (
    <li className="flex items-center">
      <Label htmlFor="nickname" isNormal={true}>
        강사 닉네임
        <span className="text-sub-color1">*</span>
      </Label>
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
        className={`h-7 w-full max-w-[24.75rem] rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2
    focus:outline-sub-color1`}
      />
      <button
        className={`ml-4 flex h-7 w-28 items-center justify-center whitespace-nowrap rounded-[0.31rem] px-2 py-1 text-white  ${
          verification ? 'bg-sub-color2' : 'bg-black'
        } `}
        onClick={nickNameOverlapping}
        disabled={verification}
      >
        중복 확인
      </button>
    </li>
  );
};

export default Nickname;
