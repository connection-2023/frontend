import { DOMAIN } from '@/constants/constants';
import { IGetClassDrafts, IGetClassDraft } from '@/types/class';

export const getInstructorProfile = async () => {
  const response = await fetch(`${DOMAIN}/api/instructors/myProfile`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());
  if (!response.ok) new Error('강사 기본 프로필 조회 API 오류!');

  return response.data.lecturerBasicProfile;
};

export const getCheckNickname = async (nickname: string) => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/instructors/check-nickname?nickname=${encodeURIComponent(
        nickname,
      )}`,
    ).then((data) => data.json());

    return response.data.isAvailable;
  } catch (error) {
    console.error('닉네임 중복 검사 오류', error);
    throw error;
  }
};

interface InstructorRegister {
  profileImageUrls: string[];
  nickname: string;
  email: string;
  phoneNumber: string;
  profileCardImageUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  homepageUrl?: string;
  affiliation?: string;
  introduction: string;
  experience?: string;
  regions: string[];
  genres: string[];
  instagramPostUrls?: string[];
  etcGenres?: string[];
}

export const instructorRegister = async (data: InstructorRegister) => {
  try {
    const response = await fetch(`${DOMAIN}/api/instructors/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `강사 등록 오류: ${errorData.message || ''}, status: ${
          response.status
        }`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error('강사 등록 오류', error);
    throw error;
  }
};

export const getClassDraft = async (
  lectureId: number | string,
): Promise<IGetClassDraft> => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/class/drafts/getDraft?lectureId=${encodeURIComponent(
        lectureId,
      )}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '');
    }

    const data = await response.json();

    return data.data.temporaryLecture;
  } catch (error) {
    console.error('임시저장 목록 조회 오류', error);
    throw error;
  }
};

export const createClassDraft = async () => {
  try {
    const response = await fetch(`${DOMAIN}/api/class/drafts/createDraft`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `임시저장 생성 오류: ${errorData.message || ''}, status: ${
          response.status
        }`,
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('임시저장 생성 오류', error);
    throw error;
  }
};

export const getClassDrafts = async (): Promise<IGetClassDrafts[]> => {
  try {
    const response = await fetch(`${DOMAIN}/api/class/drafts/getDrafts`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `임시저장 목록 조회 오류: ${errorData.message || ''}, status: ${
          response.status
        }`,
      );
    }

    const data = await response.json();

    return data.data.temporaryLectures;
  } catch (error) {
    console.error('임시저장 목록 조회 오류', error);
    throw error;
  }
};

export const deleteClassDrafts = async (
  lectureId: string | number,
): Promise<IGetClassDrafts> => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/class/drafts/deleteDraft?lectureId=${encodeURIComponent(
        lectureId,
      )}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `임시저장 삭제 오류: ${errorData.message || ''}, status: ${
          response.status
        }`,
      );
    }

    const data = await response.json();

    return data.data.temporaryLectures;
  } catch (error) {
    console.error('임시저장 삭제 오류', error);
    throw error;
  }
};
