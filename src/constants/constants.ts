import { InstagramSVG, LinkSVG, YoutubeSVG } from '@/../public/icons/svg';
import { ConsentListType } from '@/types/auth';
import { day, ReviewOrderType } from '@/types/class';

export const DOMAIN = 'http://localhost:3000'; // 변경 필요

export const ProfileImgSize = {
  xsmall: 22,
  small: 34,
  medium: 59,
  large: 101,
  xlarge: 176,
};

export const ButtonSizes = {
  xsmall: 22,
  small: 28,
  medium: 35,
  large: 45,
};

export const ButtonStyles = {
  primary:
    'hover:bg-main-color-transparent group flex w-full items-center justify-center rounded-md border border-solid border-main-color bg-white text-main-color active:bg-main-color active:text-white',
  default:
    'hover:bg-sub-color1-transparent group flex w-full items-center justify-center rounded-md border border-solid border-sub-color1 bg-white text-sub-color1 active:bg-sub-color1 active:text-white',
  secondary:
    'group flex w-full items-center justify-center rounded-md border border-solid border-black bg-white text-black hover:bg-black/10 active:bg-black active:text-white',
};

export const REGISTER_CONSENT_LIST: ConsentListType = [
  {
    id: 'termsOfService',
    title: '(필수) 서비스 이용 약관',
  },
  {
    id: 'talk',
    title: '(선택) 알림톡 수신 동의',
  },
  {
    id: 'email',
    title: '(선택) 이메일 수신 동의',
  },
  {
    id: 'marketing',
    title: '(선택) 마케팅 정보 수집 동의',
    subOptions: [
      { id: 'marketingChannelTalk', title: '채널톡 (카카오톡 채널)' },
      { id: 'marketingEmail', title: '이메일' },
    ],
  },
];

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

export const INSTRUCTOR_SECTIONS = [
  { id: 'introduction-section', label: '소개' },
  { id: 'work-experience-section', label: '경력' },
  { id: 'class-section', label: '클래스/패스권' },
  { id: 'review-section', label: '클래스 리뷰' },
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

export const FILTER_WEEK: day[] = ['월', '화', '수', '목', '금', '토', '일'];

export const FILTER_TIME = [
  '오전(6시-11시)',
  '오후(12시-17시)',
  '저녁(18시-23시)',
  '새벽(00시-05시)',
];

export const ANNOUNCEMENT = `클래스 소개 페이지 가장 상단에 보여집니다.
수업별 최소 시작 인원 등 수강생이 꼭 숙지해야할 사항을 입력해주세요.`;

export const CLASS_OPERATION_PLAN = `1. 수업 목표(무엇을 배울 수 있나요, 무엇을 얻을 수 있나요),
2. 해당 클래스의 차별점(다른 댄스 수업과의 다른 점)
3. 추천 대상(이런 능력을 갖추고 싶은 분이 들으면 좋아요, 어느 정도의 수준을 갖춘 사람에게 추천해요)

위와 같은 사항을 포함하여 간략하게 클래스 소개를 해주세요:)`;

export const TOOLBAR = [
  ['undo', 'redo'],
  ['font', 'fontSize', 'formatBlock'],
  ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
  ['removeFormat'],
  '/',
  ['fontColor', 'hiliteColor'],
  ['outdent', 'indent'],
  ['align', 'horizontalRule', 'list', 'table'],
  ['link', 'image', 'video'],

  [
    '%480',
    [
      ['undo', 'redo'],
      [
        ':p-문장 스타일-default.more_paragraph',
        'font',
        'fontSize',
        'formatBlock',
        'paragraphStyle',
        'blockquote',
      ],
      [
        ':t-글꼴 스타일-default.more_text',
        'bold',
        'underline',
        'italic',
        'strike',
        'subscript',
        'superscript',
        'fontColor',
        'hiliteColor',
        'textStyle',
        'removeFormat',
      ],
      [
        ':e-정렬-default.more_horizontal',
        'outdent',
        'indent',
        'align',
        'horizontalRule',
        'list',
        'lineHeight',
      ],
      [
        ':r-미디어-default.more_plus',
        'table',
        'link',
        'image',
        'video',
        'audio',
        'math',
        'imageGallery',
      ],
    ],
  ],
];

export const QUILL_DEFAULT_VALUE = `
<p><strong>클래스가 어떤 방식으로 진행되는지 알려주세요.</strong></p><p><span style="color: rgb(136, 136, 136);">상단 문구는 지우고 원하는 방식으로 커리큘럼을 작성해보세요 :) </span></p><p><br></p><p>일정</p><p><br></p><p>수업시간 </p><p><br></p><p>장소 </p><p><br></p><p>회차 별 수강계획 </p><p>ex) 어느 곡/파트를 진행할 예정인지 </p><p><br></p><p>1회차 </p><p><br></p><p>2회차 </p><p><br></p><p>3회차
`;

export const NON_STICKY_HEADER_PATHS = [
  '/class/',
  '/instructor/',
  '/class/creat',
  '/my',
];

export const NO_HEADER_FOOTER_PATHS = [
  '/search',
  '/class/create/address',
  '/coupon',
];

export const CATEGORY_LESSON_TYPE = ['개인(1:1)레슨', '그룹레슨'];

export const CATEGORY_PROGRESS_METHOD = ['원데이 레슨', '정기클래스'];

export const CATEGORY_DIFFICULTY_LEVEL = ['초급(입문)', '중급', '상급'];

export const ADDRESS_DESCRIPTION = [
  {
    term: '도로명 + 건물번호',
    description: '예) 판교역로 235, 제주 첨단로 242',
  },
  {
    term: '지역명(동/리) + 번지',
    description: '예) 삼평동 681, 제주 영평동 2181',
  },
  {
    term: '지역명(동/리) + 건물명(아파트명)',
    description: '예) 분당 주공, 연수동 주공3차',
  },
];

export const COUPON_UNIT_LIST = ['원', '%'];

export const SNS_ITEMS = [
  {
    icon: InstagramSVG,
    title: '인스타그램',
    placeholder: '인스타그램 아이디',
    dataName: 'instagramUrl',
  },
  {
    icon: YoutubeSVG,
    title: '유튜브',
    placeholder: '유튜브 링크',
    dataName: 'youtubeUrl',
  },
  {
    icon: LinkSVG,
    title: '홈페이지',
    placeholder: '관련 홈페이지 링크',
    dataName: 'homepageUrl',
  },
];

export const BANK_LIST = [
  { value: 'KEB하나은행', label: 'KEB하나은행' },
  { value: 'SC제일은행', label: 'SC제일은행' },
  { value: '국민은행', label: '국민은행' },
  { value: '신한은행', label: '신한은행' },
  { value: '외환은행', label: '외환은행' },
  { value: '우리은행', label: '우리은행' },
  { value: '한국시티은행', label: '한국시티은행' },
  { value: '경남은행', label: '경남은행' },
  { value: '광주은행', label: '광주은행' },
  { value: '대구은행', label: '대구은행' },
  { value: '부산은행', label: '부산은행' },
  { value: '전북은행', label: '전북은행' },
  { value: '제주은행', label: '제주은행' },
  { value: '기업은행', label: '기업은행' },
  { value: '농협', label: '농협' },
  { value: '수협', label: '수협' },
  { value: '한국산업은행', label: '한국산업은행' },
  { value: '한국수출입은행', label: '한국수출입은행' },
];

export const LOGIN_REQUIRED_URLS = ['/instructor/apply', '/class/create'];

export const LECTURER_NO_ACCESS = ['/instructor/apply'];

export const USER_NO_ACCESS = ['/class/create'];

export const NON_ACCESSIBLE_AFTER_LOGIN = ['/register', '/login'];

export const LECTURE_COUPON_TAKE = 8;

export const LECTURE_PASS_TAKE = 8;

export const USER_COUPON_CLASS_LIST_TAKE = 6;

export const INITIAL_SCHEDULE_PROGRESS = [
  {
    text: '수업 완료',
    count: 0,
    color: 'text-main-color',
  },
  {
    text: '수업 예정',
    count: 0,
    color: 'text-sub-color1',
  },
  {
    text: '총 수업',
    count: 0,
    color: '',
  },
];

export const filterOption: ReviewOrderType[] = [
  '최신순',
  '좋아요순',
  '평점 높은순',
  '평점 낮은순',
];

export const PAYMENT_ORDER_LIST = [
  [
    '노쇼위약금 무통장 입금(없을 경우 생략)',
    '강사 입금 확인',
    '신청 승인',
    '신청 완료',
    '현장에서 차액 결제 (카드결제 여부는 강사에게 문의)',
  ],
  ['무통장 선입금', '강사 입금 확인', '신청 승인', '신청 완료'],
];
