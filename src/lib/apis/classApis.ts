import {
  ILecturerClassListResonse,
  ILecturerClassDetailResonse,
  IClassEditRequest,
  IClassScheduleResponse,
  IClassEditPageData,
  IScheduleLearnerList,
  IMonthlyClassSchedules,
  IApplyListResponse,
} from '@/types/class';
import { FetchError } from '@/types/types';

export const getUserClass = async (
  type: '진행중/예정' | '수강 완료',
  displayCount: number,
  targetPage: number,
): Promise<IApplyListResponse> => {
  const reqType = type === '진행중/예정' ? '진행중' : '완료';
  const query = `type=${reqType}&pageSize=${displayCount}&page=${targetPage}`;

  const response = await fetch(`/api/class/myclass/list?${query}`);

  if (!response.ok) {
    throw new Error(
      `유저 신청 내역 목록 조회 에러: ${response.status}: ${response}`,
    );
  }

  const resData = await response.json();
  return resData.data;
};

export const postClassLikes = async (id: string) => {
  try {
    const response = await fetch(`/api/class/likes/add?id=${id}`, {
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

    return data;
  } catch (error) {
    console.error('클래스 좋아요 요청 오류', error);
    throw error;
  }
};

export const deleteClassLikes = async (id: string) => {
  try {
    const response = await fetch(`/api/class/likes/delete?id=${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('클래스 좋아요 취소 요청 오류', error);
    throw error;
  }
};

export const postReviewLikes = async (id: number) => {
  try {
    const response = await fetch(`/api/post/review/likes/add?id=${id}`, {
      method: 'POST',
    });

    return response;
  } catch (error) {
    return new Error('리뷰 좋아요 요청 오류!');
  }
};

export const deleteReviewLikes = async (id: number) => {
  try {
    const response = await fetch(`/api/post/review/likes/delete?id=${id}`, {
      method: 'DELETE',
    });

    return response;
  } catch (error) {
    return new Error('리뷰 좋아요 취소 요청 오류!');
  }
};

export const getLecturerClassList = async (
  progressType: string,
): Promise<ILecturerClassListResonse[]> => {
  const response = await fetch(
    `/api/class/myclass/lecturer?progressType=${progressType}`,
    {
      credentials: 'include',
      method: 'GET',
    },
  );

  if (!response.ok) {
    throw Error(`${progressType} 데이터 불러오기 오류`);
  }

  const resData = await response.json();

  return resData.data.lectureProgress;
};

export const getLecturerClassDetail = async (
  id: string,
): Promise<ILecturerClassDetailResonse> => {
  try {
    const [classInfoResponse, classDetailReponse, ScheduleResponse] =
      await Promise.all([
        fetch(`/api/class/info?id=${id}`, {
          credentials: 'include',
          method: 'GET',
        }).then((data) => data.json()),
        fetch(`/api/class/detail?id=${id}`, {
          credentials: 'include',
          method: 'GET',
        }).then((data) => data.json()),
        fetch(`/api/class/schedules?id=${id}`, {
          method: 'GET',
        }).then((data) => data.json()),
      ]);

    const { title, maxCapacity, duration } =
      classInfoResponse.data.lecturePreview;
    const { schedules, regularLectureStatus, holidays } = ScheduleResponse.data;
    const { notification, reservationComment, reservationDeadline } =
      classDetailReponse.data.lectureDetail;

    return {
      title,
      notification,
      reservationComment,
      duration,
      maxCapacity,
      reservationDeadline,
      schedules,
      regularLectureStatus,
      holidays,
    };
  } catch (error) {
    throw Error('강사 클래스 관리 상세 요청 에러!');
  }
};

export const updateClassData = async (id: string, data: IClassEditRequest) => {
  try {
    const response = await fetch(`/api/class/edit?id=${id}`, {
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return resData;
  } catch (error) {
    console.error('클래스 수정 오류', error);
    throw error;
  }
};

export const getAllRegisterLists = async (
  lectureId: string,
  displayCount: number,
  lastItemId: number,
): Promise<IScheduleLearnerList[]> => {
  const response = await fetch(
    `/api/class/myclass/learners?lectureId=${lectureId}&displayCount=${displayCount}&lastItemId=${lastItemId}`,
  ).then((data) => data.json());

  if (response.statusCode !== 200)
    throw Error('강사 클래스 관리 전체 수강생 조회 요청 오류!');

  return response.data.lectureLearnerList;
};

export const getClassSchedules = async (
  id: string | number,
): Promise<IClassScheduleResponse> => {
  const response = await fetch(`/api/class/schedules?id=${id}`).then((data) =>
    data.json(),
  );

  if (response.statusCode !== 200) {
    throw new Error('강의 스케쥴 조회 요청 오류!');
  }

  return response.data;
};

export const getScheduleRegisterLists = async (
  lectureId: number,
  scheduleId?: number,
): Promise<IScheduleLearnerList[]> => {
  if (!scheduleId) return [];

  const response = await fetch(
    `/api/class/myclass/schedule-learners?lectureId=${lectureId}&scheduleId=${scheduleId}`,
  ).then((data) => data.json());

  if (response.statusCode !== 200)
    throw Error('강사 클래스 관리 - 수강생 요청 모달 조회 요청 오류!');

  return response.data.scheduleLearnerList || [];
};

export const getOriginalClassInfo = async (
  id: string,
): Promise<IClassEditPageData> => {
  try {
    const [classInfoResponse, classDetailResponse, scheduleResponse] =
      await Promise.all([
        fetch(`/api/class/info?id=${id}`, {
          credentials: 'include',
          method: 'GET',
        }).then((data) => data.json()),
        fetch(`/api/class/detail?id=${id}`, {
          method: 'GET',
        }).then((data) => data.json()),
        fetch(`/api/class/schedules?id=${id}`, {
          method: 'GET',
        }).then((data) => data.json()),
      ]);
    const { schedule, holidayArr } = scheduleResponse.data;

    const formatHoliday = holidayArr.map(
      (holiday: string) => new Date(holiday),
    );

    return {
      ...classDetailResponse.data.lectureDetail,
      ...classInfoResponse.data.lecturePreview,
      ...scheduleResponse.data,
      schedule,
      holidayArr: formatHoliday,
    };
  } catch (error) {
    throw new Error('클래스 수정 기본 정보 요청 에러!');
  }
};

export const getUserSchedulesCalendar = async (
  year: number,
  month: number,
): Promise<IMonthlyClassSchedules[]> => {
  const response = await fetch(
    `/api/class/myclass/calendar?year=${year}&month=${month}`,
    {
      credentials: 'include',
      method: 'GET',
    },
  );

  if (!response.ok) {
    throw new Error(`유저 신청 내역 캘린더 조회 에러: ${response.status}`);
  }

  const resData = await response.json();

  return resData.data.enrollSchedules;
};
