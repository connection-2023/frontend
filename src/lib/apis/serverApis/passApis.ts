const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export const getLecturerPassList = async (lecturerId: string) => {
  try {
    const response = await fetch(
      `${END_POINT}/passes/lecturers/${lecturerId}`,
      {
        cache: 'no-store',
        method: 'GET',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error(`강사 패스권 목록 불러오기: ${response.status}`);
    }

    const resData = await response.json();

    return resData.data.passList;
  } catch (error) {
    console.error(error);
  }
};
