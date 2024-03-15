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

export {
  dummyNotify,
  dummyUserInfo,
  dummyMain,
  dummyUserInputSuggestion,
  dummyPaymentList,
};
