export const DAY_MODIFIERS = {
  saturday: (date: Date) => date.getDay() === 6,
  sunday: (date: Date) => date.getDay() === 0,
};

export const DAY_MODIFIERS_CLASSNAMES = {
  saturday: 'saturday',
  sunday: 'sunday',
};

export const SCHEDULE_MODIFIERS_CLASSNAMES = {
  ...DAY_MODIFIERS_CLASSNAMES,
  selectableDays: 'selectableDays',
};

export const DEFAULT_ADDRESS = { X: 37.5666103, Y: 126.9783882 };

export const CLASS_SECTIONS = [
  { id: 'intro-section', label: '클래스 소개' },
  { id: 'date-section', label: '일정 및 시간' },
  { id: 'location-section', label: '진행 장소' },
  { id: 'review-section', label: '후기' },
];

export const DANCE_GENRE = [
  'K-pop',
  '브레이킹',
  '팝핑',
  '락킹',
  '왁킹',
  '힙합',
  '하우스',
  '크럼프',
  '보깅',
  '코레오그래피',
  '키즈댄스',
];

export const DANCE_GENRE_ENGLISH = [
  '',
  '(Breaking)',
  '(Popping)',
  '(Rocking)',
  '(Waaking)',
  '(Hiphop)',
  '(House)',
  '(Crump)',
  '(voguing)',
  '(choreography)',
  '(kids dance)',
];

export const PROGRESS_METHOD = [
  '개인(1:1)레슨',
  '그룹레슨',
  '원데이 레슨',
  '다회차',
];

export const FILTER_WEEK = ['월', '화', '수', '목', '금', '토', '일'];

export const FILTER_TIME = [
  '오전(6시-11시)',
  '오후(12시-17시)',
  '저녁(18시-23시)',
  '새벽(00시-05시)',
];
