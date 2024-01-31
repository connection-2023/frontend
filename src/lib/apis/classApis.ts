import {
  IUserReview,
  ReviewOrderType,
  ILecturerClassListResonse,
  ILecturerClassDetailResonse,
  IClassEditRequest,
  IClassSchedule,
  ILearner,
  IClassEditPageData,
  IScheduleLearnerList,
} from '@/types/class';
import { FetchError } from '@/types/types';

export const getClassReviews = async (
  id: string,
  order: ReviewOrderType,
): Promise<IUserReview[] | Error> => {
  try {
    const response = await fetch(
      `/api/post/class/review?id=${id}&orderBy=${order}`,
      {
        method: 'GET',
      },
    ).then((data) => data.json());

    return response.data.review;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};

export const getUserClass = async (
  displayCount: number,
  currentPage: number,
  targetPage: number,
  firstItemId: number,
  lastItemId: number,
  type: string,
) => {
  const query = `take=${displayCount}&currentPage=${currentPage}&targetPage=${targetPage}&firstItemId=${firstItemId}&lastItemId=${lastItemId}&enrollLectureType=${type}`;

  try {
    const response = await fetch(`/api/class/myclass/list?${query}`, {
      method: 'GET',
    }).then((data) => data.json());

    return response.data;
  } catch (error) {
    return new Error('유저 신청 내역 조회 에러!');
  }
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
): Promise<ILecturerClassListResonse[] | Error> => {
  try {
    const response = await fetch(
      `/api/class/myclass/lecturer?progressType=${progressType}`,
      {
        credentials: 'include',
        method: 'GET',
      },
    ).then((data) => data.json());

    return response.data.lectureProgress;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};

export const getLecturerClassDetail = async (
  id: string,
): Promise<ILecturerClassDetailResonse | Error> => {
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

    const { title, maxCapacity } = classInfoResponse.data.lecturePreview;
    const { schedule, holidayArr } = ScheduleResponse.data;
    const { notification, reservationComment, reservationDeadline } =
      classDetailReponse.data.lectureDetail;

    return {
      title,
      notification,
      reservationComment,
      maxCapacity,
      reservationDeadline,
      schedule,
      holidays: holidayArr,
    };
  } catch (error) {
    return new Error('강사 클래스 관리 상세 요청 에러!');
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
): Promise<IScheduleLearnerList[] | Error> => {
  const response = await fetch(
    `/api/class/myclass/learners?lectureId=${lectureId}&displayCount=${displayCount}&lastItemId=${lastItemId}`,
  ).then((data) => data.json());

  if (response.statusCode !== 200)
    throw Error('강사 클래스 관리 전체 수강생 조회 요청 오류!');

  return response.data.lectureLearnerList.map((item: ILearner) => {
    const { enrollmentCount, user } = item;
    return {
      enrollmentCount,
      nickname: user.nickname,
      userProfileImage: {
        userId: user.id,
        imageUrl: user.userProfileImage.imageUrl,
      },
    };
  });
};

export const getClassSchedules = async (
  id: string | number,
): Promise<IClassSchedule[] | Error> => {
  try {
    const response = await fetch(`/api/class/schedules?id=${id}`).then((data) =>
      data.json(),
    );

    return response.data.schedule;
  } catch (error) {
    return new Error('강의 스케쥴 조회 요청 오류!');
  }
};

export const getScheduleRegisterLists = async (
  scheduleId: number,
): Promise<IScheduleLearnerList[]> => {
  const response = await fetch(
    `/api/class/myclass/schedule-learners?scheduleId=${scheduleId}`,
  ).then((data) => data.json());

  if (response.statusCode !== 200)
    throw Error('강사 클래스 관리 - 수강생 요청 모달 조회 요청 오류!');

  return response.data.scheduleLearnerList;
};

export const getOriginalClassInfo = async (
  id: string,
): Promise<IClassEditPageData | Error> => {
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
    return new Error('클래스 수정 기본 정보 요청 에러!');
  }
};
