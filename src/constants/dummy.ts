import { ClassCardType } from '@/types/class';
import { INotice, IPaymentList } from '@/types/types';

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
    {
      id: 48,
      lectureId: 18,
      startDateTime: '2023-10-05T11:00:00.000Z',
      numberOfParticipants: 12,
      team: null,
    },
    {
      id: 45,
      lectureId: 18,
      startDateTime: '2023-10-03T03:00:00.000Z',
      numberOfParticipants: 9,
      team: null,
    },
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
      id: 1,
      status: '모집중' as const,
      date: '08/04~09/25',
      title: '가비쌤과 함께하는 왁킹 클래스',
      location: ['서울 마포구'],
      genre: ['락킹', '락킹'],
      type: '단체레슨',
      time: ['오전', '오후'],
      review: { average: 4.5, count: 14 },
      price: 80000,
      profile: { src: null, nickname: 'nickname' },
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
      id: 2,
      status: '모집중' as const,
      date: '08/04~09/25',
      title: '가비쌤과 함께하는 왁킹 클래스',
      location: ['서울 마포구', '서울 동작구'],
      genre: ['락킹', '락킹'],
      type: '개인레슨',
      time: ['오전'],
      review: { average: 4.5, count: 14 },
      price: 80000,
      profile: { src: null, nickname: 'nickname' },
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
      id: 3,
      status: '마감' as const,
      date: '08/04~09/25',
      title: '가비쌤과 함께하는 왁킹 클래스',
      location: ['서울 마포구', '서울 성동구'],
      genre: ['락킹'],
      type: '개인레슨',
      time: ['오전'],
      review: { average: 4, count: 12 },
      price: 80000,
      profile: { src: null, nickname: 'nickname' },
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
      id: 3,
      status: '모집중',
      date: '2023-10-01',
      title: '요리 클래스',
      isLiked: false,
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['서울', '강남구'],
      genre: ['요리'],
      type: '오프라인',
      review: { average: 4.5, count: 20 },
      price: 50000,
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '요리사',
      },
      // selectedDates: [new Date('2023-10-01'), new Date('2023-10-02')],
    },
    {
      id: 4,
      status: '마감',
      date: '2023-10-03',
      title: '피아노 클래스',
      isLiked: false,
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['서울', '종로구'],
      genre: ['음악', '피아노'],
      type: '오프라인',
      //time: ['18시~20시'],
      review: { average: 4.7, count: 25 },
      price: 70000,
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '피아니스트',
      },
      // selectedDates: [new Date('2023-10-03'), new Date('2023-10-04')],
    },
    {
      id: 5,
      status: '마감',
      date: '2023-10-05',
      title: '미술 클래스 ',
      isLiked: true,
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['부산', '해운대구'],
      genre: ['미술'],
      type: '오프라인',
      //time: ['15시~17시'],
      review: { average: 4.9, count: 30 },
      price: 60000,
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '화가',
      },
      //selectedDates: [new Date('2023_10_05'), new Date('2023_10_06')],
    },
    {
      id: 6,
      status: '모집중',
      date: '2023_11_07',
      isLiked: true,
      title: '사진 촬영 클래스 ',
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['대전', '유성구'],
      genre: ['사진'],
      type: '오프라인',
      //  time: ['13시~15시'],
      review: { average: 4.6, count: 22 },
      price: 80000,
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '사진작가',
      },
      // selectedDates: [new Date('2023_11_07'), new Date('2023_11_08')],
    },
    {
      id: 6,
      status: '마감',
      date: '2023-12-10',
      title: '코딩 클래스 ',
      isLiked: true,
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['인천', '연수구'],
      genre: ['코딩'],
      type: '온라인',
      // time: ['20시~22시'],
      review: { average: 4.8, count: 27 },
      price: 90000,
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '개발자',
      },
      //  selectedDates: [new Date('2023-12-10'), new Date('2023-12-11')],
    },
    {
      id: 7,
      status: '모집중',
      date: '2024-01-15',
      isLiked: true,
      title: '영어회화 클래스',
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['광주', '서구'],
      genre: ['언어', '영어'],
      type: '오프라인',
      // time: ['16시~18시'],
      review: { average: 5.0, count: 32 },
      price: 100000,
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '영어강사',
      },
      // selectedDates: [new Date('2024-01-15'), new Date('2024-01-16')],
    },
    {
      id: 9,
      status: '모집중',
      date: '2024_02_20',
      isLiked: true,
      title: '체육 클래스',
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['울산', '남구'],
      genre: ['스포츠', '체육'],
      type: '오프라인',
      //time: ['09시~11시'],
      review: { average: 4.9, count: 33 },
      price: 110000,
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '운동선수',
      },
      //selectedDates: [new Date('2024_02_20'), new Date('2024_02_21')],
    },
    {
      id: 10,
      status: '모집중',
      date: '2024_03_25',
      isLiked: true,
      title: '과학 실험 클래스 ',
      imgURL: [
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      location: ['대구', '중구'],
      genre: ['과학'],
      type: '오프라인',
      review: { average: 5.0, count: 35 },
      price: 120000,
      profile: {
        src: 'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        nickname: '과학자',
      },
      //selectedDates: [new Date('2024_03_25'), new Date('2024_03_26')],
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

const dummyClasstableData = [
  {
    classInfo: '1회차',
    dateTime: '23.09.19 13:00-15:00',
    apply: {
      total: 6,
      current: 5,
    },
    duedate: '23.09.18 14:00',
  },
  {
    classInfo: '2회차',
    dateTime: '23.9.19 13:00-15:00',
    apply: {
      total: 6,
      current: 5,
    },
    duedate: '23.09.18 14:00',
  },
  {
    classInfo: '3회차',
    dateTime: '23.09.29 13:00-15:00',
    apply: {
      total: 6,
      current: 5,
    },
    duedate: '23.09.18 14:00',
  },
  {
    classInfo: '4회차',
    dateTime: '23.10.01 13:00-15:00',
    apply: {
      total: 6,
      current: 5,
    },
    duedate: '23.09.18 14:00',
  },
  {
    classInfo: '5회차',
    dateTime: '23.10.03 13:00-15:00',
    apply: {
      total: 6,
      current: 5,
    },
    duedate: '23.10.01 14:00',
  },
  {
    classInfo: '6회차',
    dateTime: '23.10.18 13:00-15:00',
    apply: {
      total: 6,
      current: 5,
    },
    duedate: '23.10.18 14:00',
  },
  {
    classInfo: '7회차',
    dateTime: '23.10.22 13:00-15:00',
    apply: {
      total: 6,
      current: 5,
    },
    duedate: '23.10.18 14:00',
  },
];

const dummyEnrollmentPerson = [
  {
    userId: 1,
    src: null,
    nickname: '닉네임',
    memo: '',
    request: `회원이 강사에게 전하는 요청사항 제가 실내용 신발이 없어서 그런데 따로 준비해 주실 수 있나요? 그리고 수업 시간보다 한 10분 정도 늦을 것 같아요 제가 그날 회사가 몇시에 끝날지 아직 몰라서... 일찍 갈 수도 있는데 어쨋든 최대한 노력해볼게요`,
  },
  {
    userId: 2,
    src: null,
    nickname: '닉네임2',
    memo: '',
    request: null,
  },
];

const dummyClassRoster = [
  {
    id: 1,
    src: null,
    nickname: '제이제이',
    applyCount: 3,
  },
  {
    id: 2,
    src: null,
    nickname: '구슬',
    applyCount: 1,
  },
  {
    id: 3,
    src: null,
    nickname: '제이제이',
    applyCount: 3,
  },
  {
    id: 4,
    src: null,
    nickname: '구슬',
    applyCount: 1,
  },
  {
    id: 5,
    src: null,
    nickname: '제이제이제이제이',
    applyCount: 3,
  },
  {
    id: 6,
    src: null,
    nickname: '구슬',
    applyCount: 1,
  },
  {
    id: 7,
    src: null,
    nickname: '제이제이',
    applyCount: 3,
  },
  {
    id: 8,
    src: null,
    nickname: '구슬',
    applyCount: 1,
  },
  {
    id: 9,
    src: null,
    nickname: '구슬',
    applyCount: 1,
  },
];

const dummyClassList = [
  {
    id: 1,
    status: '모집중',
    date: '23.08.03-23.09.28',
    title: '"원밀리언 댄스 스튜디오 with리아킴" 에게 배우는 댄스 입문',
    count: {
      current: 16,
      total: 20,
    },
  },
  {
    id: 2,
    status: '모집중',
    date: '23.08.03-23.09.28',
    title: '"원밀리언 댄스 스튜디오 with리아킴" 에게 배우는 댄스 입문',
    count: {
      current: 16,
      total: 20,
    },
  },
  {
    id: 3,
    status: '모집중',
    date: '23.08.03-23.09.28',
    title: '"원밀리언 댄스 스튜디오 with리아킴" 에게 배우는 댄스 입문',
    count: {
      current: 16,
      total: 20,
    },
  },
];

const dummyIncomeList = [
  {
    id: 1,
    name: '원밀리언의 리아킴과 함께하는 원밀리언의 리아킴과 함께하는 원밀리언의 리아킴과 함께하는',
    purchase: '가최대일곱글자',
    date: '23.10.29',
    price: '10000',
    status: '입금대기',
  },
  {
    id: 2,
    name: '가원밀리언의 리아킴과 함께하는',
    purchase: '최대일곱글자최대일곱글자',
    date: '23.10.19',
    price: '1000',
    status: '입금대기',
  },
  {
    id: 3,
    name: '나원밀리언의 리아킴과 함께하는',
    purchase: '라최대일곱글자',
    date: '23.10.09',
    price: '200,000',
    status: '입금대기',
  },
  {
    id: 4,
    name: '다원밀리언의 리아킴과 함께하는',
    purchase: 'ㅋ최대일곱글자',
    date: '23.10.29',
    price: '120,000',
    status: '입금대기',
  },
  {
    id: 5,
    name: '라원밀리언의 리아킴과 함께하는',
    purchase: 'ㅂ최대일곱글자',
    date: '23.10.29',
    price: '110,000',
    status: '결제완료',
  },
];

const dummyPaymentList: IPaymentList[] = [
  {
    date: '23.10.13',
    period: '23.08.10-23.09.10',
    amount: '250,000',
    status: '처리중',
  },

  {
    date: '23.10.13',
    period: '23.08.10-23.09.10',
    amount: '250,000',
    status: '입금완료',
  },
  {
    date: '23.10.13',
    period: '23.08.10-23.09.10',
    amount: '250,000',
    status: '입금완료',
  },
  {
    date: '23.10.13',
    period: '23.08.10-23.09.10',
    amount: '250,000',
    status: '입금완료',
  },
  {
    date: '23.10.13',
    period: '23.08.10-23.09.10',
    amount: '250,000',
    status: '입금완료',
  },
];

const dummyNotify: INotice[] = [
  {
    type: 'class',
    id: '2',
    date: '7시간 전',
    isRead: false,
    title:
      '어어엄청 긴 제목 완전 초보 댄스입문자를 위한 K-pop 클래스(스우파, 에스파, 뉴진스,방탄소년단 완전 초보 댄스입문자를 위한 K-pop 클래스(스우파, 에스파, 뉴진스,방탄소년단',
    contents: [
      {
        message: '내일 14:00 수업을 신청하셨습니다.',
        date: '7시간 전',
        isRead: true,
      },
      {
        message: '내일 12:00 수업을 신청하셨습니다.',
        date: '7시간 전',
        isRead: true,
      },
      {
        message: '내일 10:00 수업을 신청하셨습니다.',
        date: '7시간 전',
        isRead: false,
      },
    ],
  },
  {
    type: 'coupon',
    id: '2',
    date: '23.10.30',
    isRead: true,
    title: '리아킴의 10% 할인 쿠폰',
    contents: [
      {
        message: '쿠폰 만료일이 7일 남았습니다.',
        date: '23.10.30',
        isRead: false,
      },
    ],
  },
  {
    type: 'class',
    id: '2',
    date: '23.10.30',
    isRead: false,
    title: '원밀리언의 리아킴과 함께하는 댄스클래스',
    contents: [
      {
        message: '내일 14:00 수업을 신청하셨습니다.',
        date: '23.10.30',
        isRead: false,
      },
      {
        message: '공지사항이 수정되었습니다.',
        date: '23.10.30',
        isRead: false,
      },
      {
        message: '공지사항이 수정되었습니다.',
        date: '23.10.30',
        isRead: false,
      },
      {
        message: '클래스 신청이 완료되었습니다.',
        date: '23.10.30',
        isRead: false,
      },
      {
        message: '관심있는 클래스가 내일 마감됩니다.',
        date: '23.10.30',
        isRead: false,
      },
    ],
  },
  {
    type: 'instructor',
    id: '2',
    date: '23.10.29',
    isRead: false,
    title: '리아킴 강사',
    contents: [
      {
        message: '관심강사가 새로운 클래스를 개설했습니다.',
        date: '23.10.30',
        isRead: false,
      },
      {
        message: '관심강사가 새로운 클래스를 개설했습니다.',
        date: '23.10.30',
        isRead: false,
      },
    ],
  },
  {
    type: 'coupon',
    id: '2',
    date: '23.10.29',
    isRead: true,
    title: '리아킴의 5% 할인 쿠폰',
    contents: [
      {
        message: '쿠폰 만료일이 7일 남았습니다.',
        date: '23.10.30',
        isRead: false,
      },
    ],
  },
];

const dummyClassSelect = [{ label: 'asdasd', value: '18' }];

const dummyPassTableData = [
  {
    user: {
      nickname:
        '강사에게강사aaa게강사에게강사에게강사에게강사에게강사에게강사에게강사에게강사에게강사에게강사에게',
      img: 'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
    },
    classList: [
      '댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스',
      '댄스댄스댄스댄스댄스댄스댄스댄스댄스댄스',
    ],
    count: 3,
    purchase_date: 'Fri Dec 22 2023 10:07:09 GMT+0900 (한국 표준시)',
    expiration_date: 'Fri Dec 26 2023 10:07:09 GMT+0900 (한국 표준시)',
    expiration_date_sm: 'Fri Dec 26 2023 10:07:09 GMT+0900 (한국 표준시)',
  },
];

export {
  dummyPassTableData,
  dummyClassSelect,
  dummyNotify,
  dummyUserInfo,
  dummyMain,
  dummyClass,
  dummyUserInputSuggestion,
  dummySearchData,
  dummyImgURL,
  dummyInstructor,
  dummyClasstableData,
  dummyEnrollmentPerson,
  dummyClassRoster,
  dummyClassList,
  dummyIncomeList,
  dummyPaymentList,
};
