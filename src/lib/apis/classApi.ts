import {
  ApiResponse,
  IGetClassDraft,
  IGetClassDrafts,
  IUpdateClassDraft,
  LikedLecture,
} from '@/types/class';
import { FetchError } from '@/types/types';

export const getClassDraft = async (
  lectureId: number | string,
): Promise<IGetClassDraft> => {
  try {
    const response = await fetch(
      `/api/class/drafts/getDraft?lectureId=${encodeURIComponent(lectureId)}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
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
    const response = await fetch(`/api/class/drafts/createDraft`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
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
    const response = await fetch(`/api/class/drafts/getDrafts`, {
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
      `/api/class/drafts/deleteDraft?lectureId=${encodeURIComponent(
        lectureId,
      )}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
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
    const response = await fetch(`/api/class/drafts/updateDraft`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
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
    const response = await fetch(`/api/class/create`, {
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

    return res.data.newLecture.id;
  } catch (error) {
    console.error('강의생성 오류', error);
    throw error;
  }
};

export const getMyLecture = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`/api/class/myLecture`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('내 보유 강의 조회 오류', error);
    throw error;
  }
};

export const getLikesClassList = async (): Promise<LikedLecture[]> => {
  try {
    const response = await fetch(`/api/class/likes/get`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return resData.data.likedLecture;
  } catch (error) {
    console.error('좋아요 강의 목록 불러오기:', error);
    throw error;
  }
};
