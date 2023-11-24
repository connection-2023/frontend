import { cookies } from 'next/headers';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getClassDrafts = async () => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(END_POINT + '/lecture-temporarily-save', {
    method: 'GET',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    throw new Error(`임시저장 목록 불러오기: ${response.status}`);
  }

  const data = await response.json();

  return data.data.temporaryLectures;
};

export const getClassDraft = async (lectureId: string | number) => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(
    END_POINT + '/lecture-temporarily-save/' + lectureId,
    {
      method: 'GET',
      credentials: 'include',
      headers,
    },
  );

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();

  return data.data;
};

export const createClassDraft = async () => {
  const cookieStore = cookies();
  const authorization = cookieStore.get('lecturerAccessToken')?.value;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${authorization}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(END_POINT + '/lecture-temporarily-save', {
    method: 'POST',
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
