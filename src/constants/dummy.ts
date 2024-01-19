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

interface MainProps {
  suggestionClass: {
    title: string;
    image: string;
    range: string;
    review: string;
  }[];
}

const dummyMain: MainProps = {
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
};

const dummyUserInfo = {
  profileImg:
    'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
  name: '홍길동',
  alarmCount: 9,
  commentCount: 10,
};

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
  dummyNotify,
  dummyUserInfo,
  dummyMain,
  dummyClass,
  dummyUserInputSuggestion,
  dummySearchData,
  dummyEnrollmentPerson,
  dummyIncomeList,
  dummyPaymentList,
};
