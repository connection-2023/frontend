import { DOMAIN } from '@/constants/constants';

export const getCheckNickname = async (nickname: string) => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/lecturers/check-nickname?nickname=${encodeURIComponent(
        nickname,
      )}`,
    ).then((data) => data.json());

    return response.data.isAvailable;
  } catch (error) {
    console.error('닉네임 중복 검사 오류', error);
    throw error;
  }
};
