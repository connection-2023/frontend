import { DOMAIN } from '@/constants/constants';
import {
  IUserReview,
  ReviewOrderType,
  ILecturerClassListResonse,
  ILecturerClassDetailResonse,
  IClassEditRequest,
  IRegisterLists,
} from '@/types/class';

export const getClassReviews = async (
  id: string,
  order: ReviewOrderType,
): Promise<IUserReview[] | Error> => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/post/class/review?id=${id}&orderBy=${order}`,
      {
        method: 'GET',
      },
    ).then((data) => data.json());

    return response.data.review;
  } catch (error) {
    return new Error('잘못된 요청입니다!');
  }
};

export const postClassLikes = async (id: string) => {
  try {
    const response = await fetch(`${DOMAIN}/api/class/likes/add?id=${id}`, {
      method: 'POST',
    });

    return response;
  } catch (error) {
    return new Error('클래스 좋아요 요청 오류!');
  }
};

export const deleteClassLikes = async (id: string) => {
  try {
    const response = await fetch(`${DOMAIN}/api/class/likes/delete?id=${id}`, {
      method: 'DELETE',
    });

    return response;
  } catch (error) {
    return new Error('클래스 좋아요 취소 요청 오류!');
  }
};

export const postReviewLikes = async (id: number) => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/post/review/likes/add?id=${id}`,
      {
        method: 'POST',
      },
    );

    return response;
  } catch (error) {
    return new Error('리뷰 좋아요 요청 오류!');
  }
};

export const deleteReviewLikes = async (id: number) => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/post/review/likes/delete?id=${id}`,
      {
        method: 'DELETE',
      },
    );

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
      `${DOMAIN}/api/class/myclass/lecturer?progressType=${progressType}`,
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
    const [classInfoResponse, ScheduleResponse] = await Promise.all([
      fetch(`${DOMAIN}/api/class/info?id=${id}`, {
        credentials: 'include',
        method: 'GET',
      }).then((data) => data.json()),
      fetch(`${DOMAIN}/api/class/schedules?id=${id}`, {
        method: 'GET',
      }).then((data) => data.json()),
    ]);

    const {
      title,
      lectureNotification,
      reservationComment,
      maxCapacity,
      reservationDeadline,
    } = classInfoResponse.data.lecture;
    const { schedule, holidayArr } = ScheduleResponse.data;

    return {
      title,
      notification: lectureNotification,
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
    const response = await fetch(`${DOMAIN}/api/class/edit?id=${id}`, {
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(data),
    }).then((data) => data.json());

    return response;
  } catch (error) {
    return new Error('클래스 수정 요청 오류!');
  }
};

export const getRegisterLists = async (lectureId: string, id: number) => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/class/myclass/registerLists?lectureId=${lectureId}&scheduleId=${id}`,
    ).then((data) => data.json());

    return response.data.participant.map(
      (item: { user: IRegisterLists }) => item.user,
    );
  } catch (error) {
    return new Error('강사 관리 클래스 수강생 조회 요청 오류!');
  }
};
