import { ClassCardType } from '@/types/class';
import { couponGET } from '@/types/coupon';

const dummyUserInputSuggestion = [
  '댄스',
  '댄스 영상',
  '댄서',
  '댄스팀',
  '레슨',
  '방송댄스',
  '폴댄스',
  '댄싱',
];

const dummySearchData = {
  popular: [
    '스트릿 우먼 파이터',
    '원데이 클래스',
    '커스틴',
    'K-pop',
    '원밀리언',
  ],
  suggestion: [
    'K-pop',
    '원데이 클래스',
    '스트릿 댄스',
    '댄스 초보 수업',
    '기본기 클래스',
  ],
  userKeywords: ['K-pop', '원데이 클래스', '스트릿 댄스'],
};

const dummyClass = {
  classImg: [],
  title: '원밀리언 댄스 스튜디오 with 리아킴에게 배우는 댄스 입문',
  review: {
    average: 4.17,
    count: '2,324',
    reviewer: [
      {
        nickname: 'nickname',
        average: 4,
        content: '후기 350자 제한, 답글은 안다는걸로, 사진은 없는걸로',
        src: null,
        date: '2023.07.11',
        title: '가비쌤과 함께하는 왁킹 클래스',
      },
      {
        nickname: 'nickname1',
        average: 4,
        content: '후기 350자 제한, 답글은 안다는걸로, 사진은 없는걸로',
        src: null,
        date: '2023.07.11',
        title: '가비쌤과 함께하는 왁킹 클래스',
      },
      {
        nickname: 'nickname2',
        average: 2,
        content: '후기 350자 제한, 답글은 안다는걸로, 사진은 없는걸로',
        src: null,
        date: '2023.07.11',
        title: '가비쌤과 함께하는 왁킹 클래스',
      },
      {
        nickname: 'nickname3',
        average: 3,
        content: '후기 350자 제한, 답글은 안다는걸로, 사진은 없는걸로',
        src: null,
        date: '2023.07.11',
        title: '가비쌤과 함께하는 왁킹 클래스',
      },
    ],
  },
  location: '서울시 마포구',
  locationDetail: '서울 특별시 성동구 뚝섬로 13길 33',
  studioName: '원밀리언 댄스 스튜디오',
  duration: '1시간',
  method: '그룹레슨(6인)',
  level: '초급',
  notice: {
    content: `* 수업별 최소 시작 인원은 2명입니다. * 개인, 그룹레슨은 아래 수업내용 참고 후 문의 주세요.`,
    lastDate: '2023-10-27',
  },
  profile: {
    src: null,
    nickname: '리아킴',
    id: 1,
  },

  intro:
    '원데이 단체, 개인레슨, 그룹레슨(친구와)으로 댄스를 맘껏 배워보고   개인소장 영상까지 간직할 수 있는 클래스입니다.몸쓰는 방법,  안무디테일 최대한 잡아드리며 알려드립니다. (초보자분들도 어려움없이  따라오실 수 있도록 도와드려요!) 개인, 그룹레슨 진행원하실 경우  문의바랍니다 :)',
  curriculum: '',
  schedule: {
    date: '08/30~09/25',
  },
  dateTimeData: {
    '09월 09일 (토)': {
      time: ['11:00-12:00', '14:00-15:00'],
    },
    '09월 11일 (월)': {
      time: ['10:00-11:00', '13:00-14:00'],
    },
  },
  lectureSchedule: [
    { date: '09.06(수) 13:00-15:00', space: { current: 0, total: 8 } },
    { date: '09.06(수) 16:00-17:00', space: { current: 2, total: 8 } },
    { date: '09.06(수) 17:00-18:00', space: { current: 8, total: 8 } },
  ],
  coupon: 2,
  price: {
    origin: '120,000',
    discount: '80,000',
  },
};

const dummyImgURL = [
  'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
  'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
  'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
  'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
  'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
];

const dummyInstructor = {
  imgURL: dummyImgURL,
  nickname: '리아킴',
  location: '서울시 마포구',
  like: false,
  genre: ['힙합', '스트릿댄스', '현대무용'],
  teamAffiliation: ['원밀리언', '프리랜서'],
  instagramID: '@Connection',
  youtubeURL: 'https://www.youtube.com/@Connection_dance',
  anyURL: 'https://www.Connection.com',
  instagrams: [
    'https://www.instagram.com/reel/CqDcjXEJQt_',
    'https://www.instagram.com/p/CtagBRcPETS',
    'https://www.instagram.com/p/CtvYoispwLg',
  ],
  classList: [
    {
      status: '모집중' as const,
      date: '08/04~09/25',
      title: '가비쌤과 함께하는 왁킹 클래스',
      location: ['서울 마포구'],
      genre: ['락킹', '락킹'],
      type: ['개인레슨', '단체레슨'],
      time: ['오전', '오후'],
      review: { average: 4.5, count: 14 },
      price: '80,000',
      profile: { src: undefined, nickname: 'nickname' },
      selectedDates: [
        new Date(2023, 8, 4),
        new Date(2023, 8, 6),
        new Date(2023, 8, 8),
      ],
      imgURL: [
        'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
    },
    {
      status: '마감임박' as const,
      date: '08/04~09/25',
      title: '가비쌤과 함께하는 왁킹 클래스',
      location: ['서울 마포구', '서울 동작구'],
      genre: ['락킹', '락킹'],
      type: ['개인레슨'],
      time: ['오전'],
      review: { average: 4.5, count: 14 },
      price: '80,000',
      profile: { src: undefined, nickname: 'nickname' },
      selectedDates: [new Date()],
      imgURL: [
        'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
    },
    {
      status: '마감' as const,
      date: '08/04~09/25',
      title: '가비쌤과 함께하는 왁킹 클래스',
      location: ['서울 마포구', '서울 성동구'],
      genre: ['락킹'],
      type: ['개인레슨', '단체레슨'],
      time: ['오전'],
      review: { average: 4, count: 12 },
      price: '80,000',
      profile: { src: undefined, nickname: 'nickname' },
      selectedDates: [new Date()],
      imgURL: [
        'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
    },
  ],
  review: {
    average: 4.17,
    count: '2,324',
    reviewer: [
      {
        nickname: 'nickname',
        average: 4,
        content: '후기 350자 제한, 답글은 안다는걸로, 사진은 없는걸로',
        src: null,
        date: '2023.07.11',
        title: '가비쌤과 함께하는 왁킹 클래스',
      },
      {
        nickname: 'nickname1',
        average: 4,
        content: '후기 350자 제한, 답글은 안다는걸로, 사진은 없는걸로',
        src: null,
        date: '2023.07.11',
        title: '가비쌤과 함께하는 왁킹 클래스',
      },
      {
        nickname: 'nickname2',
        average: 2,
        content: '후기 350자 제한, 답글은 안다는걸로, 사진은 없는걸로',
        src: null,
        date: '2023.07.11',
        title: '가비쌤과 함께하는 왁킹 클래스',
      },
      {
        nickname: 'nickname3',
        average: 3,
        content: '후기 350자 제한, 답글은 안다는걸로, 사진은 없는걸로',
        src: null,
        date: '2023.07.11',
        title: '가비쌤과 함께하는 왁킹 클래스',
      },
    ],
  },
};

interface MainProps {
  topInstructorList: {
    nickname: string;
    id: number;
    image: string;
  }[];
  suggestionClass: {
    title: string;
    image: string;
    range: string;
    review: string;
  }[];
  recentClass: ClassCardType[];
}
const dummyMain: MainProps = {
  topInstructorList: [
    {
      nickname: 'Harriet',
      id: 7,
      image:
        'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
    },
    {
      nickname: 'Wang',
      id: 4,
      image:
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
    },
    {
      nickname: 'Ignacia',
      id: 8,
      image:
        'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
    },
    {
      nickname: 'Lana',
      id: 10,
      image:
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
    },
    {
      nickname: 'Edward',
      id: 4,
      image:
        'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
    },
    {
      nickname: 'Walter',
      id: 9,
      image:
        'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
    },
    {
      nickname: 'Marah',
      id: 10,
      image:
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
    },
    {
      nickname: 'Alden',
      id: 8,
      image:
        'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
    },
  ],
  suggestionClass: [
    {
      title: '21년 최고매출, 22년 최다판매 친절한 쁨선생 케이팝',
      image:
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      range: '08/30-09/25',
      review: '5.0',
    },
    {
      title: 'Cost Accountant',
      image:
        'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
      range: '9/1/2023',
      review: '4.6',
    },
    {
      title: 'Research Assistant II',
      image:
        'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
      range: '11/16/2022',
      review: '1.8',
    },
    {
      title: 'Recruiting Manager',
      image:
        'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
      range: '4/4/2023',
      review: '2.6',
    },
  ],
  recentClass: [
    {
      status: '모집중',
      date: '2023-10-01',
      title: '요리 클래스',
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['서울', '강남구'],
      genre: ['요리'],
      type: ['오프라인'],
      time: ['14시~16시'],
      review: { average: 4.5, count: 20 },
      price: '50000',
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '요리사',
      },
      selectedDates: [new Date('2023-10-01'), new Date('2023-10-02')],
    },
    {
      status: '마감임박',
      date: '2023-10-03',
      title: '피아노 클래스',
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['서울', '종로구'],
      genre: ['음악', '피아노'],
      type: ['오프라인'],
      time: ['18시~20시'],
      review: { average: 4.7, count: 25 },
      price: '70000',
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '피아니스트',
      },
      selectedDates: [new Date('2023-10-03'), new Date('2023-10-04')],
    },
    {
      status: '마감임박',
      date: '2023-10-05',
      title: '미술 클래스 ',
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['부산', '해운대구'],
      genre: ['미술'],
      type: ['오프라인'],
      time: ['15시~17시'],
      review: { average: 4.9, count: 30 },
      price: '60000',
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '화가',
      },
      selectedDates: [new Date('2023_10_05'), new Date('2023_10_06')],
    },
    {
      status: '마감임박',
      date: '2023_11_07',
      title: '사진 촬영 클래스 ',
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['대전', '유성구'],
      genre: ['사진'],
      type: ['오프라인'],
      time: ['13시~15시'],
      review: { average: 4.6, count: 22 },
      price: '80000',
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '사진작가',
      },
      selectedDates: [new Date('2023_11_07'), new Date('2023_11_08')],
    },
    {
      status: '마감',
      date: '2023-12-10',
      title: '코딩 클래스 ',
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['인천', '연수구'],
      genre: ['코딩'],
      type: ['온라인'],
      time: ['20시~22시'],
      review: { average: 4.8, count: 27 },
      price: '90000',
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '개발자',
      },
      selectedDates: [new Date('2023-12-10'), new Date('2023-12-11')],
    },
    {
      status: '모집중',
      date: '2024-01-15',
      title: '영어회화 클래스',
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['광주', '서구'],
      genre: ['언어', '영어'],
      type: ['오프라인'],
      time: ['16시~18시'],
      review: { average: 5.0, count: 32 },
      price: '100000',
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '영어강사',
      },
      selectedDates: [new Date('2024-01-15'), new Date('2024-01-16')],
    },
    {
      status: '마감임박',
      date: '2024_02_20',
      title: '체육 클래스',
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['울산', '남구'],
      genre: ['스포츠', '체육'],
      type: ['오프라인'],
      time: ['09시~11시'],
      review: { average: 4.9, count: 33 },
      price: '110000',
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '운동선수',
      },
      selectedDates: [new Date('2024_02_20'), new Date('2024_02_21')],
    },
    {
      status: '마감임박',
      date: '2024_03_25',
      title: '과학 실험 클래스 ',
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['대구', '중구'],
      genre: ['과학'],
      type: ['오프라인'],
      time: ['10시~12시'],
      review: { average: 5.0, count: 35 },
      price: '120000',
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '과학자',
      },
      selectedDates: [new Date('2024_03_25'), new Date('2024_03_26')],
    },
  ],
};

const dummyUserInfo = {
  profileImg:
    'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
  name: '홍길동',
  alarmCount: 9,
  commentCount: 10,
};

const dummyCouponList: couponGET[] = [
  {
    discount: 1000,
    unit: '원',
    title: '초특가로 춤춰보자',
    startAt: '2023-01-19',
    endAt: '2024-01-19',
    isStackable: true,
  },
  {
    discount: 30,
    unit: '%',
    title: '지금까지 이런 쿠폰은 없었다.',
    startAt: '2023-01-19',
    endAt: '2024-01-19',
    isStackable: false,
  },
  {
    discount: 30,
    unit: '%',
    title: '지금까지 이런 쿠폰',
    startAt: '2023-01-19',
    endAt: '2024-01-19',
    isStackable: false,
  },
];

export {
  dummyCouponList,
  dummyUserInfo,
  dummyMain,
  dummyClass,
  dummyUserInputSuggestion,
  dummySearchData,
  dummyImgURL,
  dummyInstructor,
};
