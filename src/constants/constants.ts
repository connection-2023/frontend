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

export const CLASS_OPERATION_PLAN = `수업 목표(무엇을 배울 수 있나요, 무엇을 얻을 수 있나요),
2. 해당 클래스의 차별점(다른 댄스 수업과의 다른 점)
3. 추천 대상(이런 능력을 갖추고 싶은 분이 들으면 좋아요, 어느 정도의 수준을 갖춘 사람에게 추천해요)

위와 같은 사항을 포함하여 간략하게 클래스 소개를 해주세요:)`;

export const QUILL_MODULES_CONTAINER = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [
    'image',
    'video',
    { align: [] },
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    { list: 'ordered' },
    { list: 'bullet' },
    'link',
    {
      color: [
        '#000000',
        '#e60000',
        '#ff9900',
        '#ffff00',
        '#008a00',
        '#0066cc',
        '#9933ff',
        '#ffffff',
        '#facccc',
        '#ffebcc',
        '#ffffcc',
        '#cce8cc',
        '#cce0f5',
        '#ebd6ff',
        '#bbbbbb',
        '#f06666',
        '#ffc266',
        '#ffff66',
        '#66b966',
        '#66a3e0',
        '#c285ff',
        '#888888',
        '#a10000',
        '#b26b00',
        '#b2b200',
        '#006100',
        '#0047b2',
        '#6b24b2',
        '#444444',
        '#5c0000',
        '#663d00',
        '#666600',
        '#003700',
        '#002966',
        '#3d1466',
        'custom-color',
      ],
    },
    { background: [] },
    'clean',
  ],
];

export const QUILL_DEFAULT_VALUE = `
<p><strong>클래스가 어떤 방식으로 진행되는지 알려주세요.</strong></p><p><span style="color: rgb(136, 136, 136);">상단 문구는 지우고 원하는 방식으로 커리큘럼을 작성해보세요 :) </span></p><p><br></p><p>일정</p><p><br></p><p>수업시간 </p><p><br></p><p>장소 </p><p><br></p><p>회차 별 수강계획 </p><p>ex) 어느 곡/파트를 진행할 예정인지 </p><p><br></p><p>1회차 </p><p><br></p><p>2회차 </p><p><br></p><p>3회차 </p><p><br></p><p>4회차 </p><p><br></p><p>5회차 </p>
`;
