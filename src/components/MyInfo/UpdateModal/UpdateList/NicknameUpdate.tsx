'use client';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getCheckNickname,
  patchInstructorNickname,
} from '@/lib/apis/instructorApi';
import {
  accessTokenReissuance,
  checkUserNickname,
  updateMyProfile,
} from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import UpdateModalContainer from '../UpdateModalContainer';
import Button from '@/components/Button/Button';
import { FetchError } from '@/types/types';

interface NicknameUpdateProps {
  closeModalHandler?: () => void;
  nickname: string;
}

const NicknameUpdate = ({
  nickname,
  closeModalHandler,
}: NicknameUpdateProps) => {
  const { setAuthUserField, userType } = useUserStore((state) => ({
    setAuthUserField: state.setAuthUserField,
    userType: state.userType,
  }));
  const [changeNickname, setChangeNickname] = useState('');
  const [validatedNickname, setValidatedNickname] = useState(false);

  const validateNickname = async () => {
    if (changeNickname.length > 11) {
      return toast.error('닉네임은 최대 11글자까지 가능합니다!');
    }

    if (changeNickname.length < 2 || changeNickname.length > 12) {
      return toast.error('닉네임은 2자 이상, 12자 이하로 작성 해주세요.');
    }

    const pattern = /^[가-힣a-zA-Z0-9]+$/;
    if (!pattern.test(changeNickname)) {
      return toast.error('올바른 닉네임을 작성 해주세요.');
    }

    try {
      if (userType === 'user') {
        await checkUserNickname(changeNickname);
      } else if (!(await getCheckNickname(changeNickname))) {
        throw new Error('중복');
      }
      toast.success('사용 가능한 닉네임 입니다!');
      setValidatedNickname(true);
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 403 || error.message === '중복') {
          toast.error('중복된 닉네임입니다!');
        } else {
          toast.error('잠시후 다시 시도해주세요!');
        }
      }
    }
  };

  const updateNickname = async () => {
    const changeNicknameAction = async () => {
      userType === 'lecturer'
        ? await patchInstructorNickname(changeNickname)
        : await updateMyProfile({ nickname: changeNickname });

      setAuthUserField('nickname', changeNickname);
      toast.success('닉네임 변경 완료');
      if (closeModalHandler) {
        closeModalHandler();
      }
    };

    try {
      await changeNicknameAction();
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await changeNicknameAction();
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }
  };

  const nincknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const changeNickname = event.target.value;

    setChangeNickname(changeNickname);

    if (changeNickname && validatedNickname) {
      setValidatedNickname(false);
    } else if (!changeNickname) {
      setValidatedNickname(false);
    }
  };

  return (
    <UpdateModalContainer
      title="닉네임 변경"
      disabled={!validatedNickname}
      updateEvent={updateNickname}
      closeEvent={closeModalHandler}
    >
      <section className="mx-auto flex h-[12rem] flex-grow flex-col gap-4 pt-7 sm:mx-0 sm:justify-center sm:px-8 sm:pt-0">
        <dl className="grid grid-rows-2 items-center gap-y-3 text-lg font-semibold sm:grid-cols-[7rem_1fr] sm:grid-rows-none sm:gap-y-0 sm:text-base">
          <dt>현재 닉네임</dt>
          <dd>{nickname}</dd>
        </dl>
        <div className="grid grid-rows-2 items-center sm:grid-cols-[7rem_1fr] sm:grid-rows-none">
          <label
            htmlFor="updateNickname"
            className="text-lg font-semibold sm:text-base"
          >
            변경할 닉네임
          </label>
          <div className="flex items-center gap-4">
            <input
              id="updateNickname"
              className="h-11 flex-grow rounded-md px-3 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-7"
              onChange={nincknameChangeHandler}
            />
            <div className="h-11 w-24 sm:h-7 sm:w-[8.625rem]">
              <Button
                size="full"
                color="secondary"
                onClick={validateNickname}
                disabled={validatedNickname || !changeNickname}
              >
                중복확인
              </Button>
            </div>
          </div>
        </div>
      </section>
    </UpdateModalContainer>
  );
};

export default NicknameUpdate;
