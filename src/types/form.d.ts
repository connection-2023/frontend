export interface ReportFormData {
  '허위 정보 기재': boolean;
  '저작권 불법 도용': boolean;
  '부적절한 사진 게시': boolean;
  '부적절한 내용': boolean;
  기타: boolean;
  reportDetail?: string;
}

export const reportTypes: Array<keyof ReportFormData> = [
  '허위 정보 기재',
  '저작권 불법 도용',
  '부적절한 사진 게시',
  '부적절한 내용',
  '기타',
];

export interface IRegisterForm {
  name: string;
  nickname: string;
  phoneNumber?: string;
}
