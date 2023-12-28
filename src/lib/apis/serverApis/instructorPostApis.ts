import { IClassPostResponse } from '@/types/class';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getInstructorClassLists = async (
  lecturerId: string,
): Promise<IClassPostResponse[] | Error> => {
  try {
    const response = await fetch(
      `${END_POINT}/lectures/lecturers/${lecturerId}/non-members`,
      {
        method: 'GET',
      },
    ).then((data) => data.json());

    return response.data.lecture;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};
