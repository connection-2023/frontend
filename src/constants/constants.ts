export const DOMAIN = 'http://localhost:3000'; // 변경 필요

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
  { id: 'introduction-section', label: 'introduction' },
  { id: 'work-experience-section', label: 'Work Experience' },
  { id: 'class-section', label: '강의' },
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
];

export const NO_HEADER_PATHS = ['/search'];

export const CATEGORY_LESSON_TYPE = ['개인(1:1)레슨', '그룹레슨'];

export const CATEGORY_PROGRESS_METHOD = ['원데이 레슨', '정기클래스'];

export const CATEGORY_DIFFICULTY_LEVEL = ['초급(입문)', '중급', '상급'];
