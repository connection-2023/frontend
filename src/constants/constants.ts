import { InstagramSVG, LinkSVG, YoutubeSVG } from '../../public/icons/svg';
import { ConsentListType } from '@/types/auth';
import { day, ReviewOrderType } from '@/types/class';
import { TimeOfDay } from '@/types/types';

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
    'hover:bg-white hover:text-main-color group flex w-full items-center justify-center rounded-md border border-solid border-main-color bg-main-color text-white active:bg-white active:text-main-color',
  default:
    'hover:bg-sub-color1-transparent group flex w-full items-center justify-center rounded-md border border-solid border-sub-color1 bg-white text-sub-color1 active:bg-sub-color1 active:text-white',
  secondary:
    'group flex w-full items-center justify-center rounded-md border border-solid border-black bg-white text-black hover:bg-black/10 active:bg-black active:text-white',
};

export const CLASS_HSTYLE = {
  h2: 'mb-2 text-lg font-bold',
  h3: 'flex gap-1.5 text-sm',
};

export const CLASS_EDIT_STYLE = {
  border: 'border-b border-solid border-gray-700',
  h2: 'mb-4 flex items-center text-lg font-bold',
  h3: 'flex gap-1.5 text-sm',
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
  '전체',
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

export const FILTER_WEEK: day[] = ['월', '화', '수', '목', '금', '토', '일'];

export const FILTER_TIME: { label: string; value: TimeOfDay }[] = [
  { label: '오전(6시-11시)', value: 'MORNING' },
  { label: '오후(12시-17시)', value: 'AFTERNOON' },
  { label: '저녁(18시-23시)', value: 'NIGHT' },
  { label: '새벽(00시-05시)', value: 'DAWN' },
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
  { value: '39', label: '경남은행' },
  { value: '34', label: '광주은행' },
  { value: '12', label: '단위농협' },
  { value: '32', label: '부산은행' },
  { value: '45', label: '새마을금고' },
  { value: '64', label: '산림조합' },
  { value: '88', label: '신한은행' },
  { value: '48', label: '신협' },
  { value: '27', label: '씨티은행' },
  { value: '20', label: '우리은행' },
  { value: '71', label: '우체국예금보험' },
  { value: '50', label: '저축은행중앙회' },
  { value: '37', label: '전북은행' },
  { value: '35', label: '제주은행' },
  { value: '90', label: '카카오뱅크' },
  { value: '92', label: '토스뱅크' },
  { value: '81', label: '하나은행' },
  { value: '54', label: '홍콩상하이은행' },
  { value: '03', label: 'IBK기업은행' },
  { value: '06', label: 'KB국민은행' },
  { value: '31', label: 'DGB대구은행' },
  { value: '02', label: 'KDB산업은행' },
  { value: '11', label: 'NH농협은행' },
  { value: '23', label: 'SC제일은행' },
  { value: '07', label: 'Sh수협은행' },
  { value: 'S8', label: '교보증권' },
  { value: 'SE', label: '대신증권' },
  { value: 'SK', label: '메리츠증권' },
  { value: 'S5', label: '미래에셋증권' },
  { value: 'SM', label: '부국증권' },
  { value: 'S3', label: '삼성증권' },
  { value: 'SN', label: '신영증권' },
  { value: 'S2', label: '신한금융투자' },
  { value: 'S0', label: '유안타증권' },
  { value: 'SJ', label: '유진투자증권' },
  { value: 'SQ', label: '카카오페이증권' },
  { value: 'SB', label: '키움증권' },
  { value: '토스머니', label: '토스머니' },
  { value: 'ST', label: '토스증권' },
  { value: 'SR', label: '펀드온라인코리아' },
  { value: 'SH', label: '하나금융투자' },
  { value: 'S9', label: '하이투자증권' },
  { value: 'S6', label: '한국투자증권' },
  { value: 'SG', label: '한화투자증권' },
  { value: 'SA', label: '현대차증권' },
  { value: 'SI', label: 'DB금융투자' },
  { value: 'S4', label: 'KB증권' },
  { value: 'SP', label: 'KTB투자증권' },
  { value: 'SO', label: 'LIG투자증권' },
  { value: 'SL', label: 'NH투자증권' },
  { value: 'SD', label: 'SK증권' },
];

export const BANK_CODE_TO_NAME: { [key: string]: string } = {
  '39': '경남은행',
  '34': '광주은행',
  '12': '단위농협(지역농축협)',
  '32': '부산은행',
  '45': '새마을금고',
  '64': '산림조합',
  '88': '신한은행',
  '48': '신협',
  '27': '씨티은행',
  '20': '우리은행',
  '71': '우체국예금보험',
  '50': '저축은행중앙회',
  '37': '전북은행',
  '35': '제주은행',
  '90': '카카오뱅크',
  '92': '토스뱅크',
  '81': '하나은행',
  '54': '홍콩상하이은행',
  '03': 'IBK기업은행',
  '06': 'KB국민은행',
  '31': 'DGB대구은행',
  '02': 'KDB산업은행',
  '11': 'NH농협은행',
  '23': 'SC제일은행',
  '07': 'Sh수협은행',
  S8: '교보증권',
  SE: '대신증권',
  SK: '메리츠증권',
  S5: '미래에셋증권',
  SM: '부국증권',
  S3: '삼성증권',
  SN: '신영증권',
  S2: '신한금융투자',
  S0: '유안타증권',
  SJ: '유진투자증권',
  SQ: '카카오페이증권',
  SB: '키움증권',
  토스머니: '토스머니',
  ST: '토스증권',
  SR: '펀드온라인코리아(한국포스증권)',
  SH: '하나금융투자',
  S9: '하이투자증권',
  S6: '한국투자증권',
  SG: '한화투자증권',
  SA: '현대차증권',
  SI: 'DB금융투자',
  S4: 'KB증권',
  SP: 'KTB투자증권(다올투자증권)',
  SO: 'LIG투자증권',
  SL: 'NH투자증권',
  SD: 'SK증권',
};

export const LOGIN_REQUIRED_URLS = ['/class/create'];

export const LECTURER_NO_ACCESS = []; //new RegExp('^/class/[^/]+/apply$') 동적 라우터 있는 부분은 해당 방식으로 넣으면 됨

export const USER_NO_ACCESS = [];

export const NON_ACCESSIBLE_AFTER_LOGIN = ['/register', '/login'];

export const LECTURE_COUPON_TAKE = 8;

export const LECTURE_PASS_TAKE = 8;

export const USER_COUPON_CLASS_LIST_TAKE = 6;

export const INSTRUCTOR_TAKE = 12;

export const CLASS_TAKE = 30;

export const REGIONS_SELECT_MAX = 30;

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

export const PRICE_FILTER_MIN = 0;

export const PRICE_FILTER_MAX = 1000000;

export const GROUP_FILTER_LIST = ['그룹레슨', '프라이빗 레슨(1:1)'];

export const GROUP_FILTER_DEFAULT = '그룹레슨';

export const METHOD_FILTER_LIST = ['전체', '원데이 클래스', '정기 클래스'];

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

export const CATEGORY_PROGRESS_METHOD = ['원데이 레슨', '정기클래스'];

export const INSTRUCTOR_EDIT_SECTIONS = [
  { id: 'profileImageUrls', label: '사진, 지역, 카테고리 설정' },
  { id: '강사소개', label: '강사 소개글 작성' },
];

export enum MYPAGE_FILTER_OPTIONS {
  All = '전체',
  Class = '클래스',
  Pass = '패스권',
}

export const CLASS_EDIT_SECTIONS = [
  {
    id: 'intro',
    label: '클래스 소개',
  },
  {
    id: 'plan',
    label: '일정 및 시간',
  },
  {
    id: 'location',
    label: '진행 장소',
  },
  {
    id: 'price',
    label: '가격',
  },
];

export const ISSUER_CODE: Record<string, string> = {
  '3K': '기업비씨',
  '46': '광주',
  '71': '롯데',
  '30': '산업',
  '31': 'BC',
  '51': '삼성',
  '38': '새마을',
  '41': '신한',
  '62': '신협',
  '36': '씨티',
  '33': '우리',
  W1: '우리',
  '37': '우체국',
  '39': '저축',
  '35': '전북',
  '42': '제주',
  '15': '카카오뱅크',
  '3A': '케이뱅크',
  '24': '토스뱅크',
  '21': '하나',
  '61': '현대',
  '11': '국민',
  '91': '농협',
  '34': '수협',
};

export const RELOAD_TOAST_TIME = 10000;
