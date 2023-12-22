export enum ReportType {
  FALSE_INFORMATION = '허위 정보 기재',
  COPYRIGHT_INFRINGEMENT = '저작권 불법 도용',
  INAPPROPRIATE_PHOTO = '부적절한 사진 게시',
  INAPPROPRIATE_CONTENT = '부적절한 내용',
  OTHER = '기타',
}

export type ReportFormData = {
  [key in ReportType]: boolean;
} & { reportDetail?: string };

export interface IReportRequest {
  reportTypes: ReportType[];
  targetUserId?: number;
  targetLecturerId?: number;
  lectureReviewId?: number;
  reason?: string;
}

export interface IUserReportResponse {
  id: number;
  targetUser: {
    nickname: string;
  } | null;
  targetLecturer: {
    nickname: string;
  } | null;
  reason: string;
  isAnswered: boolean;
  createdAt: string;
  updatedAt: string;
  userReportType: {
    reportType: {
      description: string;
    };
  }[];
  userReportResponse: {
    id: number;
    description: string;
  } | null;
}
