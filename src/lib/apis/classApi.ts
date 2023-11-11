import { DOMAIN } from '@/constants/constants';
import {
  IGetClassDraft,
  IGetClassDrafts,
  IUpdateClassDraft,
} from '@/types/class';

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
    return data.data;
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

export const updateClassDraft = async (data: IUpdateClassDraft) => {
  try {
    const response = await fetch(`${DOMAIN}/api/class/drafts/updateDraft`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `임시저장 오류: ${errorData.message || ''}, status: ${response.status}`,
      );
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('임시저장 오류', error);
    throw error;
  }
};

export const createClass = async (data: any) => {
  try {
    const response = await fetch(`${DOMAIN}/api/class/create`, {
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
        `강의생성 오류: ${errorData.message || ''}, status: ${response.status}`,
      );
    }

    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error('강의생성 오류', error);
    throw error;
  }
};
